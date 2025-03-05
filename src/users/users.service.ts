import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as argon2 from 'argon2';
import { UserDto } from './dto/user.dto';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

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
