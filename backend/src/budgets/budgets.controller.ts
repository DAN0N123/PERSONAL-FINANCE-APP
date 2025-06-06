import {
  Controller,
  Get,
  Request,
  UseGuards,
  Post,
  Body,
} from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

interface BudgetData {
  category: string;
  color: string;
  amount: number;
  userId: number;
}

@Controller('budgets')
export class BudgetsController {
  constructor(private budgetsService: BudgetsService) {}

  @Get('/get')
  @UseGuards(JwtAuthGuard)
  async getBudgets(@Request() req) {
    const userId = req.user.id;
    const budgets = await this.budgetsService.getBudgets(userId);
    return budgets;
  }

  @Post('/add')
  @UseGuards(JwtAuthGuard)
  async addBudget(@Request() req, @Body() reqData: BudgetData) {
    const userId = req.user.id;
    const data = { ...reqData, userId };

    const newBudget = await this.budgetsService.addBudget(data);
    return { ok: true, newBudget };
  }
}
