import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common'
import { SubscriptionService } from './subscription.service'
import { AuthGuard } from '../auth/auth.guard'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { RedeemVoucherRequest, CheckoutRequest } from '@miws/types'

@ApiTags('subscription')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('subscription')
export class SubscriptionController {
  constructor(private subscriptionService: SubscriptionService) {}

  @Get('status')
  async getStatus(@Req() req: any) {
    return this.subscriptionService.getStatus(req.user.id)
  }

  @Post('redeem')
  async redeemVoucher(@Req() req: any, @Body() body: RedeemVoucherRequest) {
    return this.subscriptionService.redeemVoucher(req.user.id, body.code)
  }

  @Post('checkout')
  async checkout(@Req() req: any, @Body() body: CheckoutRequest) {
    return this.subscriptionService.checkout(req.user.id, body)
  }
}
