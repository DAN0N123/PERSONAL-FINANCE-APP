import { Controller, UseGuards, Request, Get } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Get('/get')
  @UseGuards(JwtAuthGuard)
  async getTransactions(@Request() req: { user: { id: number } }) {
    const userId = req.user.id;
    const transactions = await this.transactionsService.getTransactions(userId);
    return { ok: true, result: transactions };
  }
}
