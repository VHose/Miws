import { Injectable, BadRequestException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { GeminiService } from '../../services/gemini.service'
import { AchievementsService } from '../achievements/achievements.service'
import { createClient } from '@supabase/supabase-js'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class SpeechService {
  private supabase: any

  constructor(
    private prisma: PrismaService,
    private gemini: GeminiService,
    private achievements: AchievementsService,
    private config: ConfigService,
  ) {
    this.supabase = createClient(
      config.get('SUPABASE_URL'),
      config.get('SUPABASE_SERVICE_ROLE_KEY'),
    )
  }

  async analyzeSpeech(params: {
    userId: string
    topicId: string
    language: 'ENGLISH' | 'INDONESIAN'
    duration: number
    audioBuffer: Buffer
    mimeType: string
  }) {
    // 1. Get topic info
    const topic = await this.prisma.topic.findUnique({
      where: { id: params.topicId },
      include: { vocabulary: { include: { vocabulary: true } } },
    })
    if (!topic) throw new BadRequestException('Topic not found')

    // 2. Upload audio to Supabase Storage
    const fileName = `${params.userId}/${params.topicId}-${Date.now()}.webm`
    const { data: uploadData, error: uploadError } = await this.supabase.storage
      .from('recordings')
      .upload(fileName, params.audioBuffer, {
        contentType: params.mimeType,
        upsert: false,
      })

    if (uploadError) throw new BadRequestException('Failed to upload audio')

    const { data: urlData } = this.supabase.storage
      .from('recordings')
      .getPublicUrl(fileName)
    const audioUrl = urlData.publicUrl

    // 3. Analyze with Gemini (send audio directly)
    const audioBase64 = params.audioBuffer.toString('base64')
    const analysis = await this.gemini.analyzeSpeech({
      audioBase64,
      mimeType: params.mimeType,
      topicTitle: topic.title,
      topicExplanation: topic.explanation,
      language: params.language,
      duration: params.duration,
    })

    // 4. Track vocabulary used
    const transcriptLower = analysis.transcript.toLowerCase()
    const topicVocabWords = topic.vocabulary.map((tv) => tv.vocabulary.word.toLowerCase())
    const vocabUsed = topicVocabWords.filter((word) => transcriptLower.includes(word))

    // 5. Save session
    const session = await this.prisma.session.create({
      data: {
        userId: params.userId,
        topicId: params.topicId,
        language: params.language,
        duration: params.duration,
        audioUrl,
        transcript: analysis.transcript,
        pronunciationScore: analysis.scores.pronunciation,
        grammarScore: analysis.scores.grammar,
        fluencyScore: analysis.scores.fluency,
        confidenceScore: analysis.scores.confidence,
        vocabularyScore: analysis.scores.vocabulary,
        overallScore: analysis.scores.overall,
        speakingSpeed: analysis.analysis.speakingSpeed,
        fillerWords: analysis.analysis.fillerWords,
        pauseCount: analysis.analysis.pauseCount,
        uniqueWordCount: analysis.analysis.uniqueWordCount,
        totalWordCount: analysis.analysis.totalWordCount,
        repetitions: analysis.analysis.repetitions,
        aiFeedback: analysis.feedback.narrative,
        strengths: analysis.feedback.strengths,
        improvements: analysis.feedback.improvements,
        vocabularyUsed: vocabUsed,
      },
      include: { topic: { include: { category: true } } },
    })

    // 6. Update progress
    await this.updateProgress(params.userId, params.topicId, topic.categoryId, analysis.scores.overall)

    // 7. Update vocabulary records
    await this.updateVocabularyRecords(params.userId, topic, vocabUsed)

    // 8. Update streak
    await this.updateStreak(params.userId)

    // 9. Check achievements
    const newAchievements = await this.achievements.checkAndUnlock(params.userId, session)

    const isFirstSession = (await this.prisma.session.count({ where: { userId: params.userId } })) === 1

    return { session, isFirstSession, achievementsUnlocked: newAchievements }
  }

  private async updateProgress(userId: string, topicId: string, categoryId: string, score: number) {
    // Update topic progress
    const existing = await this.prisma.userProgress.findUnique({
      where: { userId_topicId: { userId, topicId } },
    })

    if (existing) {
      const newAvg = (existing.avgScore * existing.totalSessions + score) / (existing.totalSessions + 1)
      await this.prisma.userProgress.update({
        where: { userId_topicId: { userId, topicId } },
        data: {
          totalSessions: { increment: 1 },
          bestScore: Math.max(existing.bestScore, score),
          avgScore: newAvg,
          lastPracticed: new Date(),
          isCompleted: score >= 70,
        },
      })
    } else {
      await this.prisma.userProgress.create({
        data: {
          userId,
          topicId,
          totalSessions: 1,
          bestScore: score,
          avgScore: score,
          isCompleted: score >= 70,
        },
      })
    }

    // Update category progress
    const catExisting = await this.prisma.userProgress.findUnique({
      where: { userId_categoryId: { userId, categoryId } },
    })

    if (catExisting) {
      await this.prisma.userProgress.update({
        where: { userId_categoryId: { userId, categoryId } },
        data: {
          totalSessions: { increment: 1 },
          lastPracticed: new Date(),
        },
      })
    } else {
      await this.prisma.userProgress.create({
        data: { userId, categoryId, totalSessions: 1 },
      })
    }
  }

  private async updateVocabularyRecords(userId: string, topic: any, usedWords: string[]) {
    for (const tv of topic.vocabulary) {
      const word = tv.vocabulary.word.toLowerCase()
      const wasUsed = usedWords.includes(word)

      const existing = await this.prisma.userVocabulary.findUnique({
        where: { userId_vocabularyId: { userId, vocabularyId: tv.vocabularyId } },
      })

      if (existing) {
        await this.prisma.userVocabulary.update({
          where: { userId_vocabularyId: { userId, vocabularyId: tv.vocabularyId } },
          data: {
            timesUsed: wasUsed ? { increment: 1 } : undefined,
            timesWeak: !wasUsed ? { increment: 1 } : undefined,
            status: wasUsed && existing.timesUsed >= 3 ? 'MASTERED' : !wasUsed && existing.timesWeak >= 3 ? 'WEAK' : existing.status,
            lastSeen: new Date(),
          },
        })
      } else {
        await this.prisma.userVocabulary.create({
          data: {
            userId,
            vocabularyId: tv.vocabularyId,
            status: wasUsed ? 'LEARNING' : 'SEEN',
            timesUsed: wasUsed ? 1 : 0,
            lastSeen: new Date(),
          },
        })
      }
    }
  }

  private async updateStreak(userId: string) {
    const streak = await this.prisma.streak.findUnique({ where: { userId } })
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    if (!streak) {
      await this.prisma.streak.create({
        data: { userId, current: 1, longest: 1, lastActivity: now },
      })
      return
    }

    const lastActivity = new Date(streak.lastActivity)
    const lastDate = new Date(lastActivity.getFullYear(), lastActivity.getMonth(), lastActivity.getDate())
    const diffDays = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return // Already practiced today
    if (diffDays === 1) {
      // Consecutive day
      const newCurrent = streak.current + 1
      await this.prisma.streak.update({
        where: { userId },
        data: {
          current: newCurrent,
          longest: Math.max(streak.longest, newCurrent),
          lastActivity: now,
        },
      })
    } else {
      // Streak broken
      await this.prisma.streak.update({
        where: { userId },
        data: { current: 1, lastActivity: now },
      })
    }
  }
}
