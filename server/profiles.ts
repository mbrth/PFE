import { Response } from 'express';
import prisma from './prismaClient';
import { AuthenticatedRequest } from './index';

export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const profile = await prisma.profile.findUnique({ where: { id: req.userId } });
    if (!profile) return res.status(404).send();
    res.json(profile);
  } catch (err) { res.status(500).send(); }
};

export const updateProfile = async (req: AuthenticatedRequest, res: Response) => {
  const { full_name, persona } = req.body;
  try {
    const profile = await prisma.profile.update({
      where: { id: req.userId },
      data: { fullName: full_name, persona: persona }
    });
    res.json(profile);
  } catch (err) { res.status(500).send(); }
};
