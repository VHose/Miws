import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common'
import { RoadmapService } from './roadmap.service'
import { AuthGuard } from '../auth/auth.guard'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'

@ApiTags('roadmap')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('roadmap')
export class RoadmapController {
  constructor(private roadmapService: RoadmapService) {}

  @Get()
  getRoadmaps(@Req() req: any, @Query('goal') goal: string) {
    return this.roadmapService.getRoadmapForUser(req.user.id, goal)
  }

  @Get('graph')
  getGraph() {
    return this.roadmapService.getKnowledgeGraph()
  }
}
