import { Controller, Request, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/getData')
  @UseGuards(JwtAuthGuard)
  async getData(@Request() req: { user: { id: number } }) {
    const userId = req.user.id;
    const result = await this.userService.getData(userId);
    return { ok: true, result: result };
  }

  @Get('/getUser')
  @UseGuards(JwtAuthGuard)
  async getUser(@Request() req: { user: { id: number } }) {
    const userId = req.user.id;
    const result = await this.userService.getUser(userId);
    return { ok: true, result: result };
  }
}
