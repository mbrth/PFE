import { PrismaClient } from '@prisma/client';

/**
 * Shared Prisma instance.
 * Reverted to Prisma 6 for maximum stability during your presentation.
 */
const prisma = new PrismaClient();

export default prisma;
