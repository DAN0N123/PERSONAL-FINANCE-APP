import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('adminadmin', 10);
  await prisma.user.create({
    data: {
      name: 'admin',
      email: 'admin@wp.pl',
      password: hashedPassword,
    },
  });

  // Create 10 random counterparties
  const counterparties = await Promise.all(
    Array.from({ length: 10 }).map(() =>
      prisma.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
        },
      }),
    ),
  );

  // Pots
  await prisma.pot.createMany({
    data: Array.from({ length: 50 }).map(() => ({
      name: faker.word.words(2),
      amount: Number(faker.finance.amount({ min: 10, max: 500, dec: 2 })),
      userId: 1,
    })),
  });

  // Budgets
  await prisma.budget.createMany({
    data: Array.from({ length: 50 }).map(() => ({
      category: faker.commerce.department(),
      amount: Number(faker.finance.amount({ min: 50, max: 500, dec: 2 })),
      userId: 1,
    })),
  });

  // Bills
  await prisma.bill.createMany({
    data: Array.from({ length: 50 }).map(() => ({
      status: faker.helpers.arrayElement(['PAID', 'DUE', 'UPCOMING']),
      amount: Number(faker.finance.amount({ min: 20, max: 200, dec: 2 })),
      userId: 1,
    })),
  });

  // Transactions
  await Promise.all(
    Array.from({ length: 100 }).map(() => {
      const counterparty = faker.helpers.arrayElement(counterparties);
      const isOutgoing = faker.datatype.boolean();
      return prisma.transaction.create({
        data: {
          userId: 1,
          counterpartyId: counterparty.id,
          category: faker.helpers.arrayElement([
            'Bills',
            'Lifestyle',
            'Personal Care',
            'General',
            'Transportation',
          ]),
          amount:
            Number(faker.finance.amount({ min: 10, max: 150, dec: 2 })) *
            (isOutgoing ? -1 : 1),
          date: faker.date.recent({ days: 30 }),
          description: faker.lorem.sentence(),
          type: isOutgoing ? 'OUTGOING' : 'INCOMING',
        },
      });
    }),
  );

  console.log('🌱 Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
