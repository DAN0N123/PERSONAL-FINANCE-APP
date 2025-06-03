import { Controller, Request, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/getData')
  @UseGuards(JwtAuthGuard)
  async getData(@Request() req) {
    const userId = req.user.id;
    return this.userService.getData(userId);
  }

  @Get('/getUser')
  @UseGuards(JwtAuthGuard)
  async getUser(@Request() req) {
    const userId = req.user.id;
    return this.userService.getUser(userId);
  }
}
