import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './prisma/prisma.module'
import { AuthModule } from './modules/auth/auth.module'
import { TopicsModule } from './modules/topics/topics.module'
import { VocabularyModule } from './modules/vocabulary/vocabulary.module'
import { SpeechModule } from './modules/speech/speech.module'
import { ProgressModule } from './modules/progress/progress.module'
import { AchievementsModule } from './modules/achievements/achievements.module'
import { RoadmapModule } from './modules/roadmap/roadmap.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule,
    TopicsModule,
    VocabularyModule,
    SpeechModule,
    ProgressModule,
    AchievementsModule,
    RoadmapModule,
  ],
})
export class AppModule {}
