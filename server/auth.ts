import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from './prismaClient';
import { JWT_SECRET } from './config';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: false,
  sameSite: 'lax' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: '/'
};

export const register = async (req: Request, res: Response) => {
  const { email, password, full_name } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await prisma.$transaction(async (tx) => {
      return await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          profile: { create: { fullName: full_name } }
        },
        include: { profile: true }
      });
    });

    const token = jwt.sign({ userId: result.id }, JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, COOKIE_OPTIONS);
    res.status(201).json({ user: { id: result.id, email: result.email, full_name: result.profile?.fullName } });
  } catch (err) {
    res.status(500).json({ error: 'User already exists' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email }, include: { profile: true } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, COOKIE_OPTIONS);
    res.json({ user: { id: user.id, email: user.email, ...user.profile } });
  } catch (err) {
    res.status(500).send();
  }
};
