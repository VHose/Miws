import { Injectable } from '@nestjs/common'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class GeminiService {
  private genAI: GoogleGenerativeAI
  private model: any
  private embeddingModel: any

  constructor(private config: ConfigService) {
    this.genAI = new GoogleGenerativeAI(config.get('GEMINI_API_KEY'))
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
    this.embeddingModel = this.genAI.getGenerativeModel({ model: 'text-embedding-004' })
  }

  async analyzeSpeech(params: {
    audioBase64: string
    mimeType: string
    topicTitle: string
    topicExplanation: string
    language: 'ENGLISH' | 'INDONESIAN'
    duration: number
  }): Promise<{
    transcript: string
    scores: {
      pronunciation: number
      grammar: number
      fluency: number
      confidence: number
      vocabulary: number
      overall: number
    }
    analysis: {
      speakingSpeed: number
      uniqueWordCount: number
      totalWordCount: number
      fillerWords: Record<string, number>
      pauseCount: number
      repetitions: Record<string, number>
      level: string
    }
    feedback: {
      narrative: string
      strengths: string[]
      improvements: string[]
      vocabularySuggestions: string[]
    }
  }> {
    const langLabel = params.language === 'ENGLISH' ? 'English' : 'Bahasa Indonesia'

    const prompt = `You are an expert AI speech coach for "Miws", an English speaking practice platform.

The user just recorded a speaking session with these details:
- Speaking Language: ${langLabel}
- Topic: "${params.topicTitle}"
- Topic context: "${params.topicExplanation.substring(0, 200)}..."
- Recording duration: ${params.duration} seconds

Please analyze the audio recording comprehensively and return ONLY a valid JSON object (no markdown, no code blocks) with this exact structure:

{
  "transcript": "full transcription of what was said",
  "scores": {
    "pronunciation": <0-100>,
    "grammar": <0-100>,
    "fluency": <0-100>,
    "confidence": <0-100>,
    "vocabulary": <0-100>,
    "overall": <0-100>
  },
  "analysis": {
    "speakingSpeed": <estimated words per minute>,
    "uniqueWordCount": <number of unique words>,
    "totalWordCount": <total words spoken>,
    "fillerWords": {"umm": <count>, "uh": <count>, "like": <count>, "you know": <count>, "actually": <count>, "basically": <count>, "eee": <count>},
    "pauseCount": <number of pauses longer than 2 seconds>,
    "repetitions": {"word": <count if repeated 3+ times>},
    "level": "<estimated CEFR: A1/A2/B1/B2/C1/C2>"
  },
  "feedback": {
    "narrative": "A detailed, encouraging 2-3 paragraph feedback in Bahasa Indonesia. Be specific about what was good, what needs improvement, and reference actual words or phrases from the transcript. Be a supportive coach.",
    "strengths": ["strength 1 in Bahasa Indonesia", "strength 2 in Bahasa Indonesia"],
    "improvements": ["improvement area 1 in Bahasa Indonesia", "improvement area 2 in Bahasa Indonesia"],
    "vocabularySuggestions": ["alternative word 1", "alternative word 2", "alternative word 3"]
  }
}

Scoring guidelines:
- Pronunciation: clarity of individual sounds and words
- Grammar: correctness of sentence structure
- Fluency: smoothness of speech, minimal hesitation
- Confidence: assertive tone, no excessive apologizing or uncertainty markers  
- Vocabulary: variety and sophistication of words used
- Overall: weighted average (pronunciation 20%, grammar 25%, fluency 25%, confidence 15%, vocabulary 15%)`

    const result = await this.model.generateContent([
      {
        inlineData: {
          data: params.audioBase64,
          mimeType: params.mimeType as any,
        },
      },
      { text: prompt },
    ])

    const responseText = result.response.text().trim()

    // Remove markdown code blocks if present
    const cleanJson = responseText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim()

    return JSON.parse(cleanJson)
  }

  async generateCoachMessage(params: {
    userName: string
    recentSessions: number
    avgGrammar: number
    avgPronunciation: number
    avgFluency: number
    topFillerWords: string[]
    weakVocabulary: string[]
    topCategories: string[]
    improvementTrend: 'improving' | 'stable' | 'declining'
  }): Promise<string> {
    const prompt = `You are the personal AI speech coach for "${params.userName}" on Miws, an English speaking practice platform.

Here is their data from the last 2 weeks:
- Sessions completed: ${params.recentSessions}
- Average scores: Grammar ${params.avgGrammar}/100, Pronunciation ${params.avgPronunciation}/100, Fluency ${params.avgFluency}/100
- Most frequent filler words: ${params.topFillerWords.join(', ') || 'none detected'}
- Vocabulary that needs work: ${params.weakVocabulary.join(', ') || 'none identified yet'}
- Most practiced categories: ${params.topCategories.join(', ') || 'various'}
- Overall trend: ${params.improvementTrend}

Write a personal, encouraging coach message in Bahasa Indonesia. Maximum 3 short paragraphs. Be specific about their actual numbers and progress. Give concrete, actionable next steps. Sound like a supportive human mentor, not a robot.`

    const result = await this.model.generateContent(prompt)
    return result.response.text()
  }

  async embedText(text: string): Promise<number[]> {
    const result = await this.embeddingModel.embedContent(text)
    return result.embedding.values
  }
}
