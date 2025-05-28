import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes config available in all modules without importing
    }),
    AuthModule,
    PrismaModule,
    // your custom module
    // Add other modules here
  ],
})
export class AppModule {}
