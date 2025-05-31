import { Module } from '@nestjs/common';
import { PotsController } from './pots.controller';
import { PotsService } from './pots.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule],
  controllers: [PotsController],
  providers: [PotsService]
})
export class PotsModule {}
