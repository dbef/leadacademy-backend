import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import axios from 'axios';
import * as qs from 'qs';
import { PrismaService } from '../prisma/prisma.service';
import { OrderDto } from './dto/order-details.dto';
import { ApplicationsService } from '../admin/applications/applications.service';
import { PaymentCallbackResponseDto } from './dto/payment-request.dto';
import { Response } from 'express';

@Injectable()
export class PaymentService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => ApplicationsService))
    private applicationService: ApplicationsService,
  ) {}

  async getAccessToken(): Promise<{
    access_token: string;
    expires_in: number;
    token_type: string;
  }> {
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;

    const url =
      'https://oauth2.bog.ge/auth/realms/bog/protocol/openid-connect/token';

    const data = qs.stringify({
      grant_type: 'client_credentials',
    });

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const response = await axios.post(url, data, {
      headers: {
        ...headers,
        Authorization: `Basic ${auth}`,
      },
    });

    return response.data;
  }

  async requestOrder(
    application_id: string,
  ): Promise<PaymentCallbackResponseDto> {
    const foundedApplication = await this.prisma.application.findUnique({
      where: {
        application_id: application_id,
      },
      include: {
        course: {
          include: {
            course_media: true,
            _count: {
              select: {
                application: {
                  where: {
                    OR: [
                      {
                        status: 'approved',
                      },
                      {
                        status: 'pending-payment',
                      },
                    ],
                    application_id: {
                      not: application_id,
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!foundedApplication) {
      throw new NotFoundException('Application not found');
    }

    if (foundedApplication.status === 'approved') {
      throw new ConflictException('Application already approved');
    }

    if (foundedApplication.course.start_date < new Date()) {
      throw new NotFoundException('Course already started');
    }

    if (foundedApplication.status !== 'pending-payment') {
      throw new NotFoundException('Application is not pending payment');
    }

    if (
      foundedApplication.course.max_students <=
      foundedApplication.course._count.application
    ) {
      throw new NotFoundException('Course is full');
    }

    const { access_token } = await this.getAccessToken();

    const url = 'https://api.bog.ge/payments/v1/ecommerce/orders';

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    };

    const body = {
      callback_url: process.env.PAYMENT_CALLBACK_URL,
      external_order_id: foundedApplication.application_id,
      purchase_units: {
        currency: 'GEL',
        total_amount: 0,
        basket: [
          {
            quantity: 1,
            unit_price: 0,
            product_id: foundedApplication.application_id,
            image: foundedApplication.course?.course_media[0]?.media_url,
            description: foundedApplication.course.title_en,
          },
        ],
      },
      redirect_urls: {
        fail: `${process.env.SUCCESS_REDIRECT}/${foundedApplication.application_id}`,
        success: `${process.env.FAIL_REDIRECT}/${foundedApplication.application_id}`,
      },
    };

    const response = await axios.post(url, body, {
      headers: headers,
    });

    const foundedOrder = await this.prisma.order.findUnique({
      where: {
        application_id: foundedApplication.application_id,
      },
    });

    if (foundedOrder) {
      await this.prisma.order.update({
        where: {
          application_id: foundedApplication.application_id,
        },
        data: {
          order_id: response.data.id,
        },
      });
    }

    return response.data as PaymentCallbackResponseDto;
  }

  async redirectToPayment(application_id: string, res: Response) {
    const response = await this.requestOrder(application_id);

    return res.redirect(response._links.redirect.href);
  }

  async checkOrderStatus(application_id: string) {
    const foundedOrder = await this.prisma.order.findUnique({
      where: {
        application_id: application_id,
      },
    });

    if (!foundedOrder) {
      throw new NotFoundException('Order not found');
    }

    const url = `https://api.bog.ge/payments/v1/receipt/${foundedOrder.order_id}`;

    const { access_token } = await this.getAccessToken();

    const headers = {
      Authorization: `Bearer ${access_token}`,
    };

    const response = await axios.get(url, {
      headers: headers,
    });

    if (response.data) {
      await this.callback({
        body: response.data,
      });
    }

    return 'Order has been checked';
  }

  async callback(body: any) {
    const data = body.body as OrderDto;

    if (
      data.order_status.key === 'completed' &&
      data.order_status.value === 'Performed'
    ) {
      const foundedApplication = await this.prisma.application.findUnique({
        where: {
          application_id: data.external_order_id,
        },
      });

      if (foundedApplication) {
        if (foundedApplication.status === 'pending-payment') {
          await this.prisma.application.update({
            where: {
              application_id: data.external_order_id,
            },
            data: {
              status: 'approved',
            },
          });

          await this.applicationService.update(data.external_order_id, {
            status: 'approved',
          });
        }
      }
    }
  }
}
