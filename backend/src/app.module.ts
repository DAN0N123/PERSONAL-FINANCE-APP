import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { BudgetsModule } from './budgets/budgets.module';
import { TransactionsController } from './transactions/transactions.controller';
import { TransactionsService } from './transactions/transactions.service';
import { TransactionsModule } from './transactions/transactions.module';
import { BillsModule } from './bills/bills.module';
import { PotsModule } from './pots/pots.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes config available in all modules without importing
    }),
    AuthModule,
    PrismaModule,
    BudgetsModule,
    TransactionsModule,
    BillsModule,
    PotsModule,
    UserModule,
    // your custom module
    // Add other modules here
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class AppModule {}
