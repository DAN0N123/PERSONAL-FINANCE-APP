import { Controller, Post, Body, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos/RegisterUser.dto';
import { Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterUserDto) {
    return this.authService.register(dto.name, dto.email, dto.password);
  }

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, token } = await this.authService.login(body.email, body.password);

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false, // set to true in production (HTTPS)
      maxAge: 1000 * 60 * 60 * 8, // 8 hours
    });

    return { message: 'Login successful', user };
  }
}
