import { Module } from '@nestjs/common'
import { RoadmapController } from './roadmap.controller'
import { RoadmapService } from './roadmap.service'
import { PrismaModule } from '../../prisma/prisma.module'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [RoadmapController],
  providers: [RoadmapService],
})
export class RoadmapModule {}
