import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Makes PrismaService available app-wide without needing to re-import
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
