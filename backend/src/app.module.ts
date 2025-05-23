import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes config available in all modules without importing
    }),
    UsersModule, // your custom module
    // Add other modules here
  ],
})
export class AppModule {}
