import { Injectable, NotFoundException} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class BillsService {
    constructor(private prisma: PrismaService) {} 

    async getBills(userId: number) {
        const user = await this.prisma.user.findUnique({where: {id: userId}, select: {bills: true, }});
        if (!user) throw new NotFoundException(`User with id: ${userId} couldn't be found`);
        
        return user.bills;
    }
}
