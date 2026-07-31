import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { AchievementsService } from './achievements.service'
import { AuthGuard } from '../auth/auth.guard'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'

@ApiTags('achievements')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('achievements')
export class AchievementsController {
  constructor(private achievementsService: AchievementsService) {}

  @Get()
  getAll(@Req() req: any) {
    return this.achievementsService.getUserAchievements(req.user.id)
  }
}
