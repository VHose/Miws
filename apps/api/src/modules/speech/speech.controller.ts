import { Controller, Post, Req, UseGuards, UseInterceptors, UploadedFile, Body } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { SpeechService } from './speech.service'
import { AuthGuard } from '../auth/auth.guard'
import { ApiTags, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger'

@ApiTags('speech')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('speech')
export class SpeechController {
  constructor(private speechService: SpeechService) {}

  @Post('analyze')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('audio', { limits: { fileSize: 50 * 1024 * 1024 } }))
  async analyze(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { topicId: string; language: string; duration: string },
    @Req() req: any,
  ) {
    return this.speechService.analyzeSpeech({
      userId: req.user.id,
      topicId: body.topicId,
      language: body.language as 'ENGLISH' | 'INDONESIAN',
      duration: parseInt(body.duration),
      audioBuffer: file.buffer,
      mimeType: file.mimetype,
    })
  }
}
