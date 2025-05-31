import { Controller, Get, UseGuards, Request} from '@nestjs/common';
import { PotsService } from './pots.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('pots')
export class PotsController {

    constructor(private potsService: PotsService) {}

    @Get('/get')
    @UseGuards(JwtAuthGuard)
    async getPots(@Request() req) {
        const userId = req.user.id;
        const pots = await this.potsService.getPots(userId)
        return pots;
    }
}
