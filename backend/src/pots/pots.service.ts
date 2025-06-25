import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

export type PotData = {
  id?: number;
  name: string;
  color: string;
  amount?: number;
  target: number;
  userId: number;
};

@Injectable()
export class PotsService {
  constructor(private prisma: PrismaService) {}

  async getPots(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { pots: true },
    });
    if (!user)
      throw new NotFoundException(`User with id: ${userId} couldn't be found`);
    return user.pots;
  }

  async addPot(data: PotData) {
    const newPot = await this.prisma.pot.create({
      data: {
        name: data.name,
        color: data.color,
        amount: 0,
        target: data.target,
        user: {
          connect: { id: data.userId },
        },
      },
    });
    return newPot;
  }

  async addToPot(data: Pick<PotData, 'id' | 'amount'>) {
    console.log(data.amount);
    const newPot = await this.prisma.pot.update({
      where: { id: data.id },
      data: {
        amount: {
          increment: data.amount,
        },
      },
    });
    return newPot;
  }

  async withdrawPot(data: Pick<PotData, 'id' | 'amount'>) {
    const newPot = await this.prisma.pot.update({
      where: { id: data.id },
      data: {
        amount: {
          decrement: data.amount,
        },
      },
    });
    return newPot;
  }

  async editPot(data: PotData) {
    const pot = await this.prisma.pot.update({
      where: { id: data.id },
      data: {
        name: data.name,
        color: data.color,
        target: data.target,
        user: {
          connect: { id: data.userId },
        },
      },
    });
    return pot;
  }

  async deletePot(id: number) {
    const potId = Number(id);
    const pot = await this.prisma.pot.delete({ where: { id: potId } });
    console.log(pot);
    return pot;
  }
}
