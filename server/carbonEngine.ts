import prisma from './prismaClient';

interface CarbonStats {
  consumed: number;
  saved: number;
  requests: number;
  data: number;
}

const CONSTANTS = {
  ECO_ORIENT_AI_G_CO2: 0.15,
  STANDARD_LLM_G_CO2: 0.50,
  CO2_PER_MB: 0.06,
  STANDARD_PLATFORM_CHAPTER_CO2: 12.0,
  ECO_ORIENT_CHAPTER_CO2: 0.2
};

const buffer = new Map<string, CarbonStats>();

export const carbonEngine = {
  async flush() {
    if (buffer.size === 0) return;
    for (const [userId, stats] of buffer.entries()) {
      try {
        await prisma.userCarbonStats.upsert({
          where: { userId },
          update: {
            totalConsumed: { increment: stats.consumed },
            totalSaved: { increment: stats.saved },
            aiRequestsCount: { increment: stats.requests },
            dataTransferred: { increment: stats.data }
          },
          create: {
            userId,
            totalConsumed: stats.consumed,
            totalSaved: stats.saved,
            aiRequestsCount: stats.requests,
            dataTransferred: stats.data
          }
        });
        buffer.delete(userId);
      } catch (err) {}
    }
  },

  async logAiInteraction(userId: string) {
    const consumed = CONSTANTS.ECO_ORIENT_AI_G_CO2;
    const saved = CONSTANTS.STANDARD_LLM_G_CO2 - consumed;
    const current = buffer.get(userId) || { consumed: 0, saved: 0, requests: 0, data: 0 };
    buffer.set(userId, {
      ...current,
      consumed: current.consumed + consumed,
      saved: current.saved + saved,
      requests: current.requests + 1
    });
    if ((buffer.get(userId)?.requests || 0) >= 5) this.flush();
  },

  async logLessonView(userId: string, contentSizeMB = 0.1) {
    const totalConsumed = (contentSizeMB * CONSTANTS.CO2_PER_MB) + CONSTANTS.ECO_ORIENT_CHAPTER_CO2;
    const saved = CONSTANTS.STANDARD_PLATFORM_CHAPTER_CO2 - totalConsumed;
    const current = buffer.get(userId) || { consumed: 0, saved: 0, requests: 0, data: 0 };
    buffer.set(userId, {
      ...current,
      consumed: current.consumed + totalConsumed,
      saved: current.saved + saved,
      data: current.data + contentSizeMB
    });
    if ((buffer.get(userId)?.data || 0) >= 1.0) this.flush();
  }
};

setInterval(() => carbonEngine.flush(), 5 * 60 * 1000);
