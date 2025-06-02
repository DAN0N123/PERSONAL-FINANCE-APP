import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async getData(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        balance: true,
        income: true,
        expenses: true,
      },
    });
    if (!user)
      throw new NotFoundException(`User with id: ${userId} couldn't be found`);
    const data = {
      balance: user.balance,
      income: user.income,
      expenses: user.expenses,
    };
    return data;
  }
}
