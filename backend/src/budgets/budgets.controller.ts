import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('budgets')
export class BudgetsController {
    constructor(private budgetsService: BudgetsService) {}

    @Get('/get')
    @UseGuards(JwtAuthGuard)
    async getBills(@Request() req) {
        const userId = req.user.id;
        const budgets = await this.budgetsService.getBudgets(userId);
        return budgets;
    }
}
