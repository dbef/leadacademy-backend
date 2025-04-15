import { Controller, Post, Param, Body, Get, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ApiParam } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('redirect/:application_id')
  @ApiParam({
    name: 'application_id',
    description: 'ID of the application to create a payment for',
    required: true,
  })
  getAccessToken(
    @Param('application_id') applicationId: string,
    @Res() res: Response,
  ) {
    return this.paymentService.redirectToPayment(applicationId, res);
  }

  @Post(':application_id')
  @ApiParam({
    name: 'application_id',
    description: 'ID of the application to create a payment for',
    required: true,
  })
  create(@Param('application_id') applicationId: string) {
    return this.paymentService.checkOrderStatus(applicationId);
  }

  @Post('callback')
  async callBack(@Body() body: any) {
    return this.paymentService.callback(body);
  }
}
