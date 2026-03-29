import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import pg from 'pg';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import Groq from "groq-sdk";
import { PrismaClient } from '@prisma/client';
import { JWT_SECRET, PORT, GROQ_API_KEY } from './config';
import * as auth from './auth';
import * as courses from './courses';
import * as profiles from './profiles';
import { carbonEngine } from './carbonEngine';

const prisma = new PrismaClient();

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());

const initDb = async () => {
  const dbName = process.env.PGDATABASE || 'ecoorient';
  const tempClient = new pg.Client({
    host: process.env.PGHOST || 'localhost',
    user: process.env.PGUSER || 'postgres',
    password: String(process.env.PGPASSWORD || ''),
    port: parseInt(process.env.PGPORT || '5432'),
    database: 'postgres'
  });
  try {
    await tempClient.connect();
    const checkDb = await tempClient.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [dbName]);
    if (checkDb.rowCount === 0) { await tempClient.query(`CREATE DATABASE ${dbName}`); }
    await tempClient.end();
  } catch (err) {}
};
initDb();

const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'No token' });
  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.status(403).json({ error: 'Forbidden' });
    req.userId = user.userId;
    next();
  });
};

const optionalAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) return next();
  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (!err) req.userId = user.userId;
    next();
  });
};

const isAdmin = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const profile = await prisma.profile.findUnique({ where: { id: req.userId } });
    if (profile?.role !== 'admin') return res.status(403).send();
    next();
  } catch (err) { res.status(500).send(); }
};

const isInstructorOrAdmin = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const profile = await prisma.profile.findUnique({ where: { id: req.userId } });
    if (profile?.role !== 'admin' && profile?.role !== 'instructor') return res.status(403).send();
    next();
  } catch (err) { res.status(500).send(); }
};

app.post('/api/auth/register', auth.register);
app.post('/api/auth/login', auth.login);
app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('token', { path: '/' });
  res.sendStatus(204);
});

app.get('/api/courses', optionalAuth as any, courses.getCourses);
app.post('/api/courses', authenticateToken as any, isInstructorOrAdmin as any, courses.createCourse);
app.get('/api/courses/:id', courses.getCourseById);
app.patch('/api/courses/:id/validate', authenticateToken as any, isAdmin as any, courses.validateCourse);
app.delete('/api/courses/:id', authenticateToken as any, isAdmin as any, courses.deleteCourse);

app.get('/api/progress/:courseId', authenticateToken as any, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const progress = await prisma.userProgress.findMany({ where: { userId: req.userId, courseId: req.params.courseId } });
    res.json(progress);
  } catch (err) { res.status(500).send(); }
});

app.post('/api/progress', authenticateToken as any, async (req: AuthenticatedRequest, res: Response) => {
  const { courseId, lessonId } = req.body;
  try {
    await prisma.userProgress.upsert({
      where: { userId_courseId_lessonId: { userId: req.userId!, courseId, lessonId } },
      update: { updatedAt: new Date() },
      create: { userId: req.userId!, courseId, lessonId }
    });
    res.sendStatus(204);
  } catch (err: any) { res.status(500).json({ error: 'Failed' }); }
});

/**
 * REAL SKILLS ANALYTICS
 * Calculates mastery levels based on actual UserProgress records.
 */
app.get('/api/analytics/skills', authenticateToken as any, async (req: AuthenticatedRequest, res: Response) => {
  try {
    // 1. Get all user progress
    const userProgress = await prisma.userProgress.findMany({ where: { userId: req.userId } });
    
    // 2. Get course categories to map progress
    const courses = await prisma.course.findMany({ select: { id: true, category: true } });
    
    const stats: Record<string, number> = {
      'Développement': 0,
      'IA & Data': 0,
      'Cloud Computing': 0,
      'Cybersécurité': 0,
      'Design': 0,
      'Autre': 0
    };

    userProgress.forEach(p => {
      const course = courses.find(c => c.id === p.courseId);
      const cat = course?.category || 'Autre';
      if (stats[cat] !== undefined) stats[cat] += 10; // 10 points per lesson
    });

    const formatted = Object.keys(stats).map(key => ({
      subject: key,
      A: Math.min(stats[key], 100), // Cap at 100%
      full: 100
    }));

    res.json(formatted);
  } catch (err) { res.status(500).send(); }
});

app.get('/api/profile', authenticateToken as any, profiles.getProfile);
app.put('/api/profile', authenticateToken as any, profiles.updateProfile);

app.get('/api/carbon-stats', authenticateToken as any, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const stats = await prisma.userCarbonStats.findUnique({ where: { userId: req.userId } });
    res.json(stats || { totalConsumed: 0, totalSaved: 0, aiRequestsCount: 0 });
  } catch (err: any) { res.status(500).send(); }
});

app.post('/api/courses/log-view', authenticateToken as any, async (req: AuthenticatedRequest, res: Response) => {
  try {
    await carbonEngine.logLessonView(req.userId!);
    res.sendStatus(204);
  } catch (err) { res.status(500).send(); }
});

const groq = GROQ_API_KEY ? new Groq({ apiKey: GROQ_API_KEY }) : null;

async function generateWithFallback(prompt: string, history: any[] = [], systemInstruction = "") {
  const modelsToTry = ["llama-3.1-8b-instant", "llama3-70b-8192"];
  if (!groq) throw new Error("Groq not configured");
  for (const modelName of modelsToTry) {
    try {
      const completion = await groq.chat.completions.create({
        messages: [{ role: "system", content: systemInstruction }, ...history, { role: "user", content: prompt }],
        model: modelName,
      });
      return completion.choices[0]?.message?.content || "";
    } catch (err) {}
  }
  return "Indisponible.";
}

app.post('/api/gemini', optionalAuth as any, async (req: AuthenticatedRequest, res: Response) => {
  if (!groq) return res.status(500).send();
  if (req.userId) carbonEngine.logAiInteraction(req.userId).catch(() => {});
  try {
    const { prompt, history, context } = req.body;
    const systemInstruction = context ? `Tu es le Mentor. Aide sur : "${context}"` : "Tu es le Mentor.";
    const formattedHistory = (history || []).map((msg: any) => ({
      role: msg.role === 'assistant' ? 'assistant' : 'user',
      content: msg.content
    })).filter((m: any, i: number) => i > 0 || m.role === 'user');
    const text = await generateWithFallback(prompt, formattedHistory, systemInstruction);
    res.json({ text });
  } catch (err) { res.status(500).send(); }
});

app.listen(PORT, () => { console.log(`Server listening on http://localhost:${PORT}`); });
