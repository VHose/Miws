import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthGuard } from './auth.guard'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { supabaseToken: string }) {
    const supabaseUser = await this.authService.verifySupabaseToken(body.supabaseToken)
    return this.authService.getOrCreateUser(supabaseUser)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('me')
  async me(@Req() req: any) {
    return req.user
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('profile')
  async updateProfile(@Req() req: any, @Body() body: any) {
    return this.authService.updateProfile(req.user.id, body)
  }
}
