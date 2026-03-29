import { Request, Response } from 'express';
import prisma from './prismaClient';
import { AuthenticatedRequest } from './index';

export const getCourses = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { role } = req.query;
    const userId = req.userId;

    let where: any = { OR: [{ isValidated: true }] };

    if (role === 'admin') {
      where = {}; 
    } else if (userId) {
      where.OR.push({ AND: [{ isValidated: false }, { authorId: userId }] });
    }

    const courses = await prisma.course.findMany({ where, orderBy: { createdAt: 'desc' } });
    res.json(courses);
  } catch (err) { res.status(500).send(); }
};

export const getCourseById = async (req: Request, res: Response) => {
  try {
    const course = await prisma.course.findUnique({ where: { id: req.params.id } });
    if (!course) return res.status(404).send();
    res.json(course);
  } catch (err) { res.status(500).send(); }
};

export const createCourse = async (req: AuthenticatedRequest, res: Response) => {
  const { title, provider, category, duration, level, description, skills, ecoScore, sovereignty, modules } = req.body;
  try {
    const course = await prisma.course.create({
      data: {
        title, provider, category, duration, level, description, skills,
        ecoScore, sovereignty, modules: modules || [],
        authorId: req.userId,
        isValidated: false
      }
    });
    res.status(201).json(course);
  } catch (err) { res.status(500).send(); }
};

export const validateCourse = async (req: Request, res: Response) => {
  try {
    const course = await prisma.course.update({ where: { id: req.params.id }, data: { isValidated: true } });
    res.json(course);
  } catch (err) { res.status(500).send(); }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    await prisma.course.delete({ where: { id: req.params.id } });
    res.sendStatus(204);
  } catch (err) { res.status(500).send(); }
};
