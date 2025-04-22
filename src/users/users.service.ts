import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as argon2 from 'argon2';
import { UserDto } from './dto/user.dto';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import * as qs from 'qs';
import axios from 'axios';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const { email, password } = createUserDto;

    const foundedUser = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (foundedUser) {
      throw new ConflictException('User already exists');
    }

    const hash = await this.hashData(password);

    const newUser = await this.prisma.user.create({
      data: {
        email,
        password: hash,
      },
      select: {
        email: true,
        id: true,
      },
    });

    return newUser;
  }

  async getAccessToken(): Promise<{
    access_token: string;
    expires_in: number;
    token_type: string;
  }> {
    const clientId = '10000999';
    const clientSecret = 'EwIocgGuN9i5';

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

  async requestOrder() {
    const accessToken = await this.getAccessToken();

    const url = 'https://api.bog.ge/payments/v1/ecommerce/orders';

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken.access_token}`,
    };

    const body = {
      callback_url: 'https://staging.sabado.edu.ge',
      external_order_id: 'id123',
      purchase_units: {
        currency: 'GEL',
        total_amount: 0,
        basket: [
          {
            quantity: 1,
            unit_price: 0,
            product_id: 'product123',
          },
        ],
      },
      redirect_urls: {
        fail: 'https://example.com/fail',
        success: 'https://example.com/success',
      },
    };

    const response = await axios.post(url, body, {
      headers: headers,
    });
    return response.data;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  }

  async findUserById(id: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });
  }
  hashData(data: string) {
    return argon2.hash(data);
  }
}
