import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { GeminiService } from '../../services/gemini.service'

@Injectable()
export class ProgressService {
  constructor(
    private prisma: PrismaService,
    private gemini: GeminiService,
  ) {}

  async getOverview(userId: string) {
    const [sessions, streak, categoryProgress, weakVocab] = await Promise.all([
      this.prisma.session.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: { topic: { include: { category: true } } },
      }),
      this.prisma.streak.findUnique({ where: { userId } }),
      this.getCategoryProgress(userId),
      this.prisma.userVocabulary.findMany({
        where: { userId, status: 'WEAK' },
        include: { vocabulary: true },
        take: 10,
      }),
    ])

    const totalSessions = await this.prisma.session.count({ where: { userId } })
    const totalMinutes = sessions.reduce((sum, s) => sum + Math.floor(s.duration / 60), 0)
    const totalWords = await this.prisma.userVocabulary.count({ where: { userId } })
    const totalTopics = await this.prisma.userProgress.count({
      where: { userId, topicId: { not: null }, isCompleted: true },
    })

    const avgGrammar = sessions.length > 0 ? sessions.reduce((s, sess) => s + sess.grammarScore, 0) / sessions.length : 0
    const avgPron = sessions.length > 0 ? sessions.reduce((s, sess) => s + sess.pronunciationScore, 0) / sessions.length : 0
    const avgFluency = sessions.length > 0 ? sessions.reduce((s, sess) => s + sess.fluencyScore, 0) / sessions.length : 0

    return {
      totalWords,
      totalTopics,
      totalMinutes,
      totalSessions,
      streak: streak || { current: 0, longest: 0 },
      avgScores: {
        grammar: Math.round(avgGrammar),
        pronunciation: Math.round(avgPron),
        fluency: Math.round(avgFluency),
      },
      categoryProgress,
      weakVocabulary: weakVocab,
      recentSessions: sessions,
    }
  }

  async getTimeline(userId: string) {
    const sessions = await this.prisma.session.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
      select: {
        createdAt: true,
        overallScore: true,
        grammarScore: true,
        pronunciationScore: true,
        fluencyScore: true,
      },
    })

    // Group by month
    const monthlyData: Record<string, { grammar: number[]; pronunciation: number[]; fluency: number[]; overall: number[] }> = {}
    for (const s of sessions) {
      const month = s.createdAt.toISOString().substring(0, 7)
      if (!monthlyData[month]) monthlyData[month] = { grammar: [], pronunciation: [], fluency: [], overall: [] }
      monthlyData[month].grammar.push(s.grammarScore)
      monthlyData[month].pronunciation.push(s.pronunciationScore)
      monthlyData[month].fluency.push(s.fluencyScore)
      monthlyData[month].overall.push(s.overallScore)
    }

    return Object.entries(monthlyData).map(([month, data]) => ({
      month,
      grammar: Math.round(data.grammar.reduce((a, b) => a + b, 0) / data.grammar.length),
      pronunciation: Math.round(data.pronunciation.reduce((a, b) => a + b, 0) / data.pronunciation.length),
      fluency: Math.round(data.fluency.reduce((a, b) => a + b, 0) / data.fluency.length),
      overall: Math.round(data.overall.reduce((a, b) => a + b, 0) / data.overall.length),
      sessions: data.overall.length,
    }))
  }

  async getCategoryProgress(userId: string) {
    const categories = await this.prisma.category.findMany({
      where: { slug: { not: 'random' } },
      include: { _count: { select: { topics: true } } },
    })

    const results = await Promise.all(
      categories.map(async (cat) => {
        const completed = await this.prisma.userProgress.count({
          where: { userId, categoryId: cat.id, isCompleted: true },
        })
        const total = cat._count.topics
        return {
          category: cat,
          completed,
          total,
          percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
        }
      }),
    )

    return results
  }

  async getCoachMessage(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } })
    const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)

    const recentSessions = await this.prisma.session.findMany({
      where: { userId, createdAt: { gte: twoWeeksAgo } },
      select: {
        grammarScore: true,
        pronunciationScore: true,
        fluencyScore: true,
        fillerWords: true,
        overallScore: true,
      },
    })

    if (recentSessions.length === 0) {
      return 'Mulai latihan pertamamu hari ini! Setiap perjalanan dimulai dengan satu langkah. Pilih topik yang menarik bagimu dan rekam suaramu — aku siap memberikan feedback yang detail.'
    }

    const avgGrammar = Math.round(recentSessions.reduce((s, x) => s + x.grammarScore, 0) / recentSessions.length)
    const avgPron = Math.round(recentSessions.reduce((s, x) => s + x.pronunciationScore, 0) / recentSessions.length)
    const avgFluency = Math.round(recentSessions.reduce((s, x) => s + x.fluencyScore, 0) / recentSessions.length)

    // Aggregate filler words
    const allFillers: Record<string, number> = {}
    for (const s of recentSessions) {
      const fw = s.fillerWords as Record<string, number>
      for (const [word, count] of Object.entries(fw)) {
        allFillers[word] = (allFillers[word] || 0) + count
      }
    }
    const topFillers = Object.entries(allFillers)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([w]) => w)

    const weakVocab = await this.prisma.userVocabulary.findMany({
      where: { userId, status: 'WEAK' },
      include: { vocabulary: true },
      take: 5,
    })

    const prevSessions = await this.prisma.session.findMany({
      where: { userId, createdAt: { lt: twoWeeksAgo } },
      select: { overallScore: true },
      orderBy: { createdAt: 'desc' },
      take: 5,
    })

    const prevAvg = prevSessions.length > 0 ? prevSessions.reduce((s, x) => s + x.overallScore, 0) / prevSessions.length : 0
    const currAvg = recentSessions.reduce((s, x) => s + x.overallScore, 0) / recentSessions.length
    const trend = currAvg > prevAvg + 3 ? 'improving' : currAvg < prevAvg - 3 ? 'declining' : 'stable'

    return this.gemini.generateCoachMessage({
      userName: user?.name || 'Kamu',
      recentSessions: recentSessions.length,
      avgGrammar,
      avgPronunciation: avgPron,
      avgFluency,
      topFillerWords: topFillers,
      weakVocabulary: weakVocab.map((v) => v.vocabulary.word),
      topCategories: [],
      improvementTrend: trend as any,
    })
  }
}
