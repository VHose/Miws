import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common'
import { TopicsService } from './topics.service'
import { AuthGuard } from '../auth/auth.guard'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'

@ApiTags('topics')
@Controller('topics')
export class TopicsController {
  constructor(private topicsService: TopicsService) {}

  @Get('categories')
  getCategories() {
    return this.topicsService.getCategories()
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('spin')
  spin(@Query('category') category: string, @Req() req: any) {
    return this.topicsService.spinTopic(category, req.user?.id)
  }

  @Get(':slug')
  getBySlug(@Param('slug') slug: string) {
    return this.topicsService.getTopicBySlug(slug)
  }

  @Get(':id/related')
  getRelated(@Param('id') id: string) {
    return this.topicsService.getRelatedTopics(id)
  }
}
