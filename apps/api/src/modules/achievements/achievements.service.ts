import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class AchievementsService {
  constructor(private prisma: PrismaService) {}

  async getUserAchievements(userId: string) {
    const allAchievements = await this.prisma.achievement.findMany()
    const userAchievements = await this.prisma.userAchievement.findMany({
      where: { userId },
      include: { achievement: true },
    })

    const unlockedIds = new Set(userAchievements.map((ua) => ua.achievementId))

    return allAchievements.map((ach) => ({
      ...ach,
      unlocked: unlockedIds.has(ach.id),
      unlockedAt: userAchievements.find((ua) => ua.achievementId === ach.id)?.unlockedAt,
    }))
  }

  async checkAndUnlock(userId: string, session: any) {
    const newlyUnlocked: any[] = []
    const allAchievements = await this.prisma.achievement.findMany()
    const userAchievements = await this.prisma.userAchievement.findMany({ where: { userId } })
    const unlockedIds = new Set(userAchievements.map((ua) => ua.achievementId))

    const [totalSessions, streak, vocabCount] = await Promise.all([
      this.prisma.session.count({ where: { userId } }),
      this.prisma.streak.findUnique({ where: { userId } }),
      this.prisma.userVocabulary.count({ where: { userId, status: 'MASTERED' } }),
    ])

    for (const ach of allAchievements) {
      if (unlockedIds.has(ach.id)) continue

      const cond = ach.condition as any
      let shouldUnlock = false

      switch (cond.type) {
        case 'sessions':
          if (!cond.extra) shouldUnlock = totalSessions >= cond.value
          else if (cond.extra === 'duration_300') shouldUnlock = session.duration >= 300
          else if (cond.extra === 'bilingual') {
            const langs = await this.prisma.session.groupBy({
              by: ['language'],
              where: { userId },
            })
            shouldUnlock = langs.length >= 2
          }
          break
        case 'streak':
          shouldUnlock = (streak?.current || 0) >= cond.value
          break
        case 'vocabulary':
          shouldUnlock = vocabCount >= cond.value
          break
        case 'score':
          if (!cond.extra) shouldUnlock = session.overallScore >= cond.value
          break
      }

      if (shouldUnlock) {
        await this.prisma.userAchievement.create({
          data: { userId, achievementId: ach.id },
        })
        newlyUnlocked.push(ach)
      }
    }

    return newlyUnlocked
  }
}
