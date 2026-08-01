import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { SubscriptionStatus, CheckoutRequest, CheckoutResponse } from '@miws/types'

@Injectable()
export class SubscriptionService {
  constructor(private prisma: PrismaService) {}

  async getStatus(userId: string): Promise<SubscriptionStatus> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    const now = new Date()
    let currentTier = user.subscriptionTier
    let expiresAt = user.subscriptionExpiresAt

    // Check if subscription expired
    if (expiresAt && new Date(expiresAt) < now && currentTier !== 'FREE') {
      currentTier = 'FREE'
      expiresAt = null
      await this.prisma.user.update({
        where: { id: userId },
        data: { subscriptionTier: 'FREE', subscriptionExpiresAt: null },
      })
    }

    // Check if daily count needs reset (if last session was on a different date)
    const lastReset = new Date(user.lastSessionResetDate)
    const isDifferentDay =
      lastReset.getUTCFullYear() !== now.getUTCFullYear() ||
      lastReset.getUTCMonth() !== now.getUTCMonth() ||
      lastReset.getUTCDate() !== now.getUTCDate()

    let dailyCount = user.dailySessionCount
    if (isDifferentDay) {
      dailyCount = 0
      await this.prisma.user.update({
        where: { id: userId },
        data: { dailySessionCount: 0, lastSessionResetDate: now },
      })
    }

    const isPro = currentTier === 'PRO' || currentTier === 'ENTERPRISE'
    const dailyLimit = isPro ? 999 : 3
    const remainingSessions = Math.max(0, dailyLimit - dailyCount)

    return {
      tier: currentTier,
      isPro,
      dailyCount,
      dailyLimit,
      remainingSessions,
      expiresAt: expiresAt ? expiresAt.toISOString() : null,
    }
  }

  async redeemVoucher(userId: string, code: string): Promise<SubscriptionStatus> {
    const cleanCode = code.trim().toUpperCase()
    let daysToGrant = 0

    if (cleanCode === 'PRO100' || cleanCode === 'MIWSPRO' || cleanCode === 'PRO30') {
      daysToGrant = 30
    } else if (cleanCode === 'PASS7DAYS' || cleanCode === 'PRO7') {
      daysToGrant = 7
    } else if (cleanCode === 'PROYEAR') {
      daysToGrant = 365
    } else {
      throw new BadRequestException('Kode voucher tidak valid')
    }

    const now = new Date()
    const expiresAt = new Date(now.getTime() + daysToGrant * 24 * 60 * 60 * 1000)

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        subscriptionTier: 'PRO',
        subscriptionExpiresAt: expiresAt,
      },
    })

    return this.getStatus(userId)
  }

  async checkout(userId: string, dto: CheckoutRequest): Promise<CheckoutResponse> {
    let days = 30
    let planName = 'Pro Monthly'

    if (dto.planId === 'YEARLY') {
      days = 365
      planName = 'Pro Yearly'
    } else if (dto.planId === 'PASS_7DAYS') {
      days = 7
      planName = '7-Day Emergency Pass'
    }

    const now = new Date()
    const expiresAt = new Date(now.getTime() + days * 24 * 60 * 60 * 1000)

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        subscriptionTier: 'PRO',
        subscriptionExpiresAt: expiresAt,
      },
    })

    const updatedStatus = await this.getStatus(userId)

    return {
      success: true,
      invoiceUrl: `https://checkout.miws.app/inv/simulated-${Date.now()}`,
      qrisPayload: '00020101021226680016ID.CO.MIWS.WWW01189360091400000000005204581253033605802ID5911MIWS PRO SAAS6007JAKARTA61051219062070703A016304E1A2',
      message: `Berhasil mengaktifkan paket ${planName}!`,
      subscription: updatedStatus,
    }
  }
}
