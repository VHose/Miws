import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class TopicsService {
  constructor(private prisma: PrismaService) {}

  async getCategories() {
    const categories = await this.prisma.category.findMany({
      orderBy: { order: 'asc' },
      include: {
        _count: { select: { topics: true } },
      },
    })
    return categories.map((c) => ({
      ...c,
      topicCount: c._count.topics,
    }))
  }

  async spinTopic(categorySlug?: string, userId?: string) {
    let where: any = {}

    if (categorySlug && categorySlug !== 'random') {
      const category = await this.prisma.category.findUnique({
        where: { slug: categorySlug },
      })
      if (category) where.categoryId = category.id
    }

    // Get topics user hasn't done recently
    const recentTopicIds = userId
      ? (
          await this.prisma.userProgress.findMany({
            where: { userId, topicId: { not: null } },
            orderBy: { lastPracticed: 'desc' },
            take: 5,
            select: { topicId: true },
          })
        ).map((p) => p.topicId)
      : []

    const topics = await this.prisma.topic.findMany({
      where: {
        ...where,
        id: recentTopicIds.length > 0 ? { notIn: recentTopicIds } : undefined,
      },
      include: {
        category: true,
        vocabulary: {
          include: { vocabulary: true },
          orderBy: { importance: 'desc' },
        },
      },
    })

    if (topics.length === 0) {
      // Fallback: get any topic
      const allTopics = await this.prisma.topic.findMany({
        where,
        include: {
          category: true,
          vocabulary: {
            include: { vocabulary: true },
            orderBy: { importance: 'desc' },
          },
        },
      })
      if (allTopics.length === 0) return null
      return allTopics[Math.floor(Math.random() * allTopics.length)]
    }

    return topics[Math.floor(Math.random() * topics.length)]
  }

  async getTopicBySlug(slug: string) {
    return this.prisma.topic.findUnique({
      where: { slug },
      include: {
        category: true,
        vocabulary: {
          include: { vocabulary: true },
          orderBy: { importance: 'desc' },
        },
      },
    })
  }

  async getRelatedTopics(topicId: string, limit = 4) {
    const relations = await this.prisma.topicRelation.findMany({
      where: { fromTopicId: topicId },
      orderBy: { score: 'desc' },
      take: limit,
      include: {
        toTopic: {
          include: { category: true },
        },
      },
    })
    return relations.map((r) => r.toTopic)
  }
}
