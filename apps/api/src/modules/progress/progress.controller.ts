import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { ProgressService } from './progress.service'
import { AuthGuard } from '../auth/auth.guard'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'

@ApiTags('progress')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('progress')
export class ProgressController {
  constructor(private progressService: ProgressService) {}

  @Get('overview')
  getOverview(@Req() req: any) {
    return this.progressService.getOverview(req.user.id)
  }

  @Get('timeline')
  getTimeline(@Req() req: any) {
    return this.progressService.getTimeline(req.user.id)
  }

  @Get('categories')
  getCategories(@Req() req: any) {
    return this.progressService.getCategoryProgress(req.user.id)
  }

  @Get('coach')
  getCoach(@Req() req: any) {
    return this.progressService.getCoachMessage(req.user.id)
  }
}
