import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class RoadmapService {
  constructor(private prisma: PrismaService) {}

  async getAllRoadmaps() {
    return this.prisma.learningRoadmap.findMany({
      orderBy: { order: 'asc' },
      include: {
        nodes: {
          orderBy: { order: 'asc' },
          include: { topic: { include: { category: true } } },
        },
      },
    })
  }

  async getRoadmapForUser(userId: string, goal?: string) {
    const where = goal ? { goal } : {}
    const roadmaps = await this.prisma.learningRoadmap.findMany({
      where,
      orderBy: { order: 'asc' },
      include: {
        nodes: {
          orderBy: { order: 'asc' },
          include: { topic: { include: { category: true } } },
        },
      },
    })

    // Attach user progress to each node
    const enriched = await Promise.all(
      roadmaps.map(async (roadmap) => ({
        ...roadmap,
        nodes: await Promise.all(
          roadmap.nodes.map(async (node) => {
            const progress = await this.prisma.userProgress.findUnique({
              where: { userId_topicId: { userId, topicId: node.topicId } },
            })
            return { ...node, userProgress: progress }
          }),
        ),
      })),
    )

    return enriched
  }

  async getKnowledgeGraph() {
    const topics = await this.prisma.topic.findMany({
      include: {
        category: true,
        relationsFrom: {
          include: { toTopic: true },
          where: { score: { gte: 0.5 } },
          take: 5,
        },
      },
    })

    return {
      nodes: topics.map((t) => ({
        id: t.id,
        label: t.title,
        category: t.category.name,
        categoryColor: t.category.color,
        level: t.level,
      })),
      edges: topics.flatMap((t) =>
        t.relationsFrom.map((r) => ({
          from: r.fromTopicId,
          to: r.toTopicId,
          type: r.relationType,
          score: r.score,
        })),
      ),
    }
  }
}
