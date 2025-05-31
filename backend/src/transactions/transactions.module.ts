import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [PassportModule],
    controllers: [TransactionsController],
    providers: [TransactionsService]
})
export class TransactionsModule {
}
