import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class VocabularyService {
  constructor(private prisma: PrismaService) {}

  async getUserVocabulary(userId: string, status?: string) {
    return this.prisma.userVocabulary.findMany({
      where: {
        userId,
        status: status as any || undefined,
      },
      include: { vocabulary: true },
      orderBy: { lastSeen: 'desc' },
    })
  }

  async getWeakVocabulary(userId: string) {
    return this.prisma.userVocabulary.findMany({
      where: { userId, status: 'WEAK' },
      include: { vocabulary: true },
      orderBy: { timesWeak: 'desc' },
      take: 20,
    })
  }

  async markVocabulary(userId: string, vocabularyId: string, status: string) {
    return this.prisma.userVocabulary.upsert({
      where: { userId_vocabularyId: { userId, vocabularyId } },
      update: { status: status as any },
      create: { userId, vocabularyId, status: status as any },
    })
  }

  async getStats(userId: string) {
    const [total, mastered, learning, weak, seen] = await Promise.all([
      this.prisma.userVocabulary.count({ where: { userId } }),
      this.prisma.userVocabulary.count({ where: { userId, status: 'MASTERED' } }),
      this.prisma.userVocabulary.count({ where: { userId, status: 'LEARNING' } }),
      this.prisma.userVocabulary.count({ where: { userId, status: 'WEAK' } }),
      this.prisma.userVocabulary.count({ where: { userId, status: 'SEEN' } }),
    ])
    return { total, mastered, learning, weak, seen }
  }
}
