import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables from apps/api/.env, packages/database/.env, or root .env
dotenv.config({ path: path.resolve(__dirname, '../.env') })
dotenv.config({ path: path.resolve(__dirname, '../../apps/api/.env') })
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

import { categories } from './categories'
import { topicsRaw } from './topics'
import { achievements } from './achievements'
import { roadmaps } from './roadmaps'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding Miws database...')

  // Clear in order (FK constraints)
  console.log('🧹 Clearing existing data...')
  await prisma.userAchievement.deleteMany()
  await prisma.userVocabulary.deleteMany()
  await prisma.userProgress.deleteMany()
  await prisma.streak.deleteMany()
  await prisma.session.deleteMany()
  await prisma.topicRelation.deleteMany()
  await prisma.roadmapNode.deleteMany()
  await prisma.learningRoadmap.deleteMany()
  await prisma.topicVocabulary.deleteMany()
  await prisma.vocabulary.deleteMany()
  await prisma.topic.deleteMany()
  await prisma.category.deleteMany()
  await prisma.achievement.deleteMany()

  // Seed categories
  console.log('📂 Seeding 11 categories...')
  const createdCategories: Record<string, any> = {}
  for (const cat of categories) {
    const created = await prisma.category.create({ data: cat })
    createdCategories[cat.slug] = created
  }

  // Seed topics + vocabulary
  console.log('📚 Seeding topics and vocabulary...')
  const createdTopics: Record<string, any> = {}

  for (const item of topicsRaw) {
    const { categorySlug, vocabularyList, ...topicData } = item

    // Resolve category
    const category = createdCategories[categorySlug]
    if (!category) {
      console.warn(`⚠️  Category not found: ${categorySlug}`)
      continue
    }

    const topic = await prisma.topic.create({
      data: {
        ...topicData,
        categoryId: category.id,
      },
    })
    createdTopics[topic.slug] = topic

    for (const vocab of vocabularyList) {
      const { importance, ...vocabData } = vocab

      const v = await prisma.vocabulary.upsert({
        where: { word: vocabData.word },
        update: {},
        create: vocabData,
      })

      await prisma.topicVocabulary.create({
        data: {
          topicId: topic.id,
          vocabularyId: v.id,
          importance,
        },
      })
    }
  }

  // Build knowledge graph (same category = related)
  console.log('🕸️  Building knowledge graph...')
  const allTopics = await prisma.topic.findMany()
  const relations: any[] = []

  for (let i = 0; i < allTopics.length; i++) {
    for (let j = i + 1; j < allTopics.length; j++) {
      const a = allTopics[i]
      const b = allTopics[j]
      if (a.categoryId === b.categoryId) {
        relations.push({ fromTopicId: a.id, toTopicId: b.id, relationType: 'SAME_CATEGORY', score: 0.7 })
        relations.push({ fromTopicId: b.id, toTopicId: a.id, relationType: 'SAME_CATEGORY', score: 0.7 })
      }
    }
  }

  if (relations.length > 0) {
    await prisma.topicRelation.createMany({ data: relations, skipDuplicates: true })
    console.log(`   Created ${relations.length} knowledge graph edges`)
  }

  // Seed achievements
  console.log('🏆 Seeding achievements...')
  for (const ach of achievements) {
    await prisma.achievement.create({ data: ach })
  }

  // Seed roadmaps
  console.log('🗺️  Seeding roadmaps...')
  for (const roadmap of roadmaps) {
    const { nodes, ...roadmapData } = roadmap
    const created = await prisma.learningRoadmap.create({ data: roadmapData })

    for (const node of nodes) {
      const topic = createdTopics[node.topicSlug]
      if (topic) {
        await prisma.roadmapNode.create({
          data: {
            roadmapId: created.id,
            topicId: topic.id,
            order: node.order,
            isOptional: node.isOptional ?? false,
          },
        })
      } else {
        console.warn(`⚠️  Topic not found for roadmap node: ${node.topicSlug}`)
      }
    }
  }

  const topicCount = await prisma.topic.count()
  const vocabCount = await prisma.vocabulary.count()
  const achCount = await prisma.achievement.count()
  const roadmapCount = await prisma.learningRoadmap.count()

  console.log('\n✅ Database seeded successfully!')
  console.log(`   📂 ${Object.keys(createdCategories).length} categories`)
  console.log(`   📖 ${topicCount} topics`)
  console.log(`   📚 ${vocabCount} vocabulary words`)
  console.log(`   🏆 ${achCount} achievements`)
  console.log(`   🗺️  ${roadmapCount} roadmaps`)
  console.log(`   🕸️  ${relations.length} knowledge graph connections`)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
