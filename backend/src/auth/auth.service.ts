import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service'; // adjust path as needed
@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private prisma: PrismaService,
  ) {}

  generateToken(user: { id: number; email: string }) {
    return {
      access_token: this.jwt.sign({
        sub: user.id,
        email: user.email,
      }),
    };
  }

  async register(name: string, email: string, plainPassword: string) {
    const hash = await bcrypt.hash(plainPassword, 10);

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hash,
      },
    });

    return { id: user.id, email: user.email, name: user.name };
  }

  async login(email: string, plainPassword: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(plainPassword, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    return this.generateToken(user);
  }
}
