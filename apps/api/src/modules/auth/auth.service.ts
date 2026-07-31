import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../../prisma/prisma.service'
import { createClient } from '@supabase/supabase-js'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  private supabase: any

  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {
    this.supabase = createClient(
      config.get('SUPABASE_URL'),
      config.get('SUPABASE_SERVICE_ROLE_KEY'),
    )
  }

  async verifySupabaseToken(token: string) {
    const { data, error } = await this.supabase.auth.getUser(token)
    if (error || !data.user) throw new UnauthorizedException('Invalid token')
    return data.user
  }

  async getOrCreateUser(supabaseUser: any) {
    let user = await this.prisma.user.findUnique({
      where: { email: supabaseUser.email },
    })

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email: supabaseUser.email,
          name: supabaseUser.user_metadata?.full_name || supabaseUser.email.split('@')[0],
          avatar: supabaseUser.user_metadata?.avatar_url,
          streak: { create: {} },
        },
      })
    }

    const token = this.jwt.sign({ sub: user.id, email: user.email })
    return { user, token }
  }

  async updateProfile(userId: string, data: { name?: string; preferredLang?: 'ENGLISH' | 'INDONESIAN'; learningGoal?: string }) {
    return this.prisma.user.update({
      where: { id: userId },
      data,
    })
  }
}
