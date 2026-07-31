import { Module } from '@nestjs/common'
import { SpeechController } from './speech.controller'
import { SpeechService } from './speech.service'
import { PrismaModule } from '../../prisma/prisma.module'
import { AuthModule } from '../auth/auth.module'
import { GeminiService } from '../../services/gemini.service'
import { AchievementsService } from '../achievements/achievements.service'

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [SpeechController],
  providers: [SpeechService, GeminiService, AchievementsService],
})
export class SpeechModule {}
