import { Body, Controller, Get, Param, Patch, Query, Req, UseGuards } from '@nestjs/common'
import { VocabularyService } from './vocabulary.service'
import { AuthGuard } from '../auth/auth.guard'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'

@ApiTags('vocabulary')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('vocabulary')
export class VocabularyController {
  constructor(private vocabService: VocabularyService) {}

  @Get('user')
  getUserVocab(@Req() req: any, @Query('status') status: string) {
    return this.vocabService.getUserVocabulary(req.user.id, status)
  }

  @Get('weak')
  getWeak(@Req() req: any) {
    return this.vocabService.getWeakVocabulary(req.user.id)
  }

  @Get('stats')
  getStats(@Req() req: any) {
    return this.vocabService.getStats(req.user.id)
  }

  @Patch(':id/mark')
  mark(@Req() req: any, @Param('id') id: string, @Body('status') status: string) {
    return this.vocabService.markVocabulary(req.user.id, id, status)
  }
}
