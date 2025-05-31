import { Injectable, NotFoundException} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TransactionsService {
    constructor(private prisma: PrismaService) {} 

    async getTransactions(userId: number) {
        const user = await this.prisma.user.findUnique({where: {id: userId}, select: {
            transactions: {
                include: {
                  user: {
                    select: { id: true, name: true },
                  },
                  counterparty: {
                    select: { id: true, name: true },
                  },
                },
              },
        }});
        if (!user) throw new NotFoundException(`User with id: ${userId} couldn't be found`);
        
        return user.transactions;
    }
}
