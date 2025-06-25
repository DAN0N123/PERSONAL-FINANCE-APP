import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

type BudgetData = {
  id?: number;
  category: string;
  color: string;
  amount: number;
  userId: number;
};

@Injectable()
export class BudgetsService {
  constructor(private prisma: PrismaService) {}

  async getBudgets(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { budgets: true },
    });
    if (!user)
      throw new NotFoundException(`User with id: ${userId} couldn't be found`);
    return user.budgets;
  }

  async addBudget(data: BudgetData) {
    const newBudget = await this.prisma.budget.create({
      data: {
        category: data.category,
        color: data.color,
        amount: data.amount,
        user: {
          connect: { id: data.userId },
        },
      },
    });
    return newBudget;
  }

  async editBudget(data: BudgetData) {
    const budget = await this.prisma.budget.update({
      where: { id: data.id },
      data: {
        category: data.category,
        color: data.color,
        amount: data.amount,
        user: {
          connect: { id: data.userId },
        },
      },
    });
    return budget;
  }

  async deleteBudget(id: number) {
    const budgetId = Number(id);
    const budget = await this.prisma.budget.delete({ where: { id: budgetId } });
    return budget;
  }
}
