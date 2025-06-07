import {
  Controller,
  Get,
  Request,
  UseGuards,
  Post,
  Body,
  Put,
  Param,
  Delete,
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

  @Put('/edit')
  @UseGuards(JwtAuthGuard)
  async editBudget(@Request() req, @Body() reqData: BudgetData) {
    const userId = req.user.id;
    const data = { ...reqData, userId };

    const budget = await this.budgetsService.editBudget(data);
    return { ok: true, budget };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteBudget(@Param('id') id: number) {
    await this.budgetsService.deleteBudget(id);

    return { ok: true };
  }
}
