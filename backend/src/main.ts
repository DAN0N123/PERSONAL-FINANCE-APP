import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClient } from '@prisma/client';
import * as cookieParser from "cookie-parser"

async function bootstrap() {
  const prisma = new PrismaClient();
  await prisma.$connect();
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
