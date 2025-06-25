import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Body,
  Delete,
  Put,
  Param,
} from '@nestjs/common';
import { PotsService } from './pots.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PotData } from './pots.service';
@Controller('pots')
export class PotsController {
  constructor(private potsService: PotsService) {}

  @Get('/get')
  @UseGuards(JwtAuthGuard)
  async getPots(@Request() req: { user: { id: number } }) {
    const userId = req.user.id;
    const pots = await this.potsService.getPots(userId);
    return { ok: true, result: pots };
  }

  @Post('/add')
  @UseGuards(JwtAuthGuard)
  async addPot(
    @Request() req: { user: { id: number } },
    @Body() reqData: PotData,
  ) {
    const userId = req.user.id;
    const data = { ...reqData, userId: userId };
    const pot = await this.potsService.addPot(data);
    return { ok: true, result: pot };
  }

  @Put('/edit')
  @UseGuards(JwtAuthGuard)
  async editPot(
    @Request() req: { user: { id: number } },
    @Body() reqData: PotData,
  ) {
    const userId = req.user.id;
    const data = { ...reqData, userId };

    const pot = await this.potsService.editPot(data);
    return { ok: true, result: pot };
  }

  @Put('/addToPot')
  @UseGuards(JwtAuthGuard)
  async addToPot(@Body() reqData: Pick<PotData, 'id' | 'amount'>) {
    const pot = await this.potsService.addToPot(reqData);
    return { ok: true, result: pot };
  }

  @Put('/withdrawPot')
  @UseGuards(JwtAuthGuard)
  async withdrawPot(@Body() reqData: Pick<PotData, 'id' | 'amount'>) {
    const pot = await this.potsService.withdrawPot(reqData);
    return { ok: true, result: pot };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deletePot(@Param('id') id: number) {
    const potId = id;
    const pot = await this.potsService.deletePot(potId);
    return { ok: true, result: pot };
  }
}
