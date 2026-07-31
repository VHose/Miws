// ─── Enums ───────────────────────────────────────────────────────────────────

export type Language = 'ENGLISH' | 'INDONESIAN'

export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'

export type VocabStatus = 'SEEN' | 'LEARNING' | 'MASTERED' | 'WEAK'

export type RelationType = 'SIMILAR' | 'PREREQUISITE' | 'ADVANCED' | 'SAME_CATEGORY'

export type AchievementRarity = 'common' | 'rare' | 'epic' | 'legendary'

export type LearningGoal = 'IELTS' | 'TOEFL' | 'INTERVIEW' | 'DAILY' | 'BUSINESS' | 'TECH' | 'PUBLIC_SPEAKING'

// ─── Models ──────────────────────────────────────────────────────────────────

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  preferredLang: Language
  learningGoal?: LearningGoal
  createdAt: string
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  description: string
  color: string
  topicCount?: number
}

export interface Topic {
  id: string
  categoryId: string
  title: string
  slug: string
  explanation: string
  level: CEFRLevel
  discussionQs: string[]
  category?: Category
  vocabulary?: TopicVocabulary[]
}

export interface Vocabulary {
  id: string
  word: string
  definition: string
  phonetic?: string
  synonyms: string[]
  examples: string[]
  difficulty: number
}

export interface TopicVocabulary {
  topicId: string
  vocabularyId: string
  importance: number
  vocabulary: Vocabulary
}

export interface TopicRelation {
  fromTopicId: string
  toTopicId: string
  relationType: RelationType
  score: number
  toTopic?: Topic
}

// ─── Session & AI Analysis ────────────────────────────────────────────────────

export interface SpeechScores {
  pronunciation: number
  grammar: number
  fluency: number
  confidence: number
  vocabulary: number
  overall: number
}

export interface SpeechAnalysis {
  speakingSpeed: number
  uniqueWordCount: number
  totalWordCount: number
  fillerWords: Record<string, number>
  pauseCount: number
  repetitions: Record<string, number>
  level: CEFRLevel
}

export interface SpeechFeedback {
  narrative: string
  strengths: string[]
  improvements: string[]
  vocabularySuggestions: string[]
}

export interface Session {
  id: string
  userId: string
  topicId: string
  language: Language
  duration: number
  audioUrl: string
  transcript: string
  createdAt: string
  scores: SpeechScores
  analysis: SpeechAnalysis
  feedback: SpeechFeedback
  topic?: Topic
}

// ─── Progress ─────────────────────────────────────────────────────────────────

export interface ScoreHistoryEntry {
  month: string // "2025-01"
  avg: number
}

export interface UserProgress {
  id: string
  userId: string
  topicId?: string
  categoryId?: string
  totalSessions: number
  bestScore: number
  avgScore: number
  lastPracticed: string
  isCompleted: boolean
  scoreHistory: ScoreHistoryEntry[]
}

export interface UserVocabulary {
  userId: string
  vocabularyId: string
  status: VocabStatus
  timesUsed: number
  timesWeak: number
  lastSeen: string
  vocabulary?: Vocabulary
}

export interface Streak {
  userId: string
  current: number
  longest: number
  lastActivity: string
}

export interface ProgressOverview {
  totalWords: number
  totalTopics: number
  totalMinutes: number
  streak: Streak
  avgScores: {
    grammar: number
    pronunciation: number
    fluency: number
  }
  categoryProgress: Array<{
    category: Category
    percentage: number
    completed: number
    total: number
  }>
  weakVocabulary: UserVocabulary[]
  recentSessions: Session[]
  coachMessage?: string
}

// ─── Achievements ─────────────────────────────────────────────────────────────

export interface Achievement {
  id: string
  slug: string
  name: string
  description: string
  icon: string
  rarity: AchievementRarity
  condition: {
    type: 'streak' | 'sessions' | 'vocabulary' | 'score' | 'category'
    value: number
    extra?: string
  }
}

export interface UserAchievement {
  userId: string
  achievementId: string
  unlockedAt: string
  achievement: Achievement
}

// ─── Roadmap ──────────────────────────────────────────────────────────────────

export interface RoadmapNode {
  id: string
  roadmapId: string
  topicId: string
  order: number
  isOptional: boolean
  unlockAfter?: string
  topic?: Topic
  userProgress?: UserProgress
}

export interface LearningRoadmap {
  id: string
  name: string
  description: string
  goal: LearningGoal
  nodes: RoadmapNode[]
}

// ─── API Types ────────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface ApiError {
  statusCode: number
  message: string
  error?: string
}

export interface AnalyzeSpeechRequest {
  topicId: string
  language: Language
  duration: number
}

export interface AnalyzeSpeechResponse {
  session: Session
  isFirstSession: boolean
  achievementsUnlocked: Achievement[]
}

export interface SpinTopicRequest {
  categoryId?: string // undefined = random all
}

export interface SpinTopicResponse {
  topic: Topic
}
