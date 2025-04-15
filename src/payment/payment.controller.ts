import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ApiParam } from '@nestjs/swagger';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('check/:application_id')
  @ApiParam({
    name: 'application_id',
    required: true,
    description: 'Application ID',
    type: String,
  })
  async check(@Param('application_id') application_id: string) {
    return this.paymentService.checkOrderStatus(application_id);
  }

  @Post('callback')
  async callBack(@Body() body: any) {
    return this.paymentService.callback(body);
  }
}
