import { Module } from '@nestjs/common';
import { BillsService } from './bills.service';
import { BillsController } from './bills.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule],
  providers: [BillsService],
  controllers: [BillsController]
})
export class BillsModule {}
