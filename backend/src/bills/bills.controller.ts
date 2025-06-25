import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { BillsService } from './bills.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('bills')
export class BillsController {
  constructor(private billsService: BillsService) {}

  @Get('/get')
  @UseGuards(JwtAuthGuard)
  async getBills(@Request() req: { user: { id: number } }) {
    const userId = req.user.id;
    const bills = await this.billsService.getBills(userId);
    return { ok: true, result: bills };
  }
}
