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
      balance: 123500.21,
      income: 13640,
      expenses: 9752.52,
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
          balance: 0,
          income: 0,
          expenses: 0,
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

  // Budgets (replaced with fixed values and upsert logic)
  const budgets = [
    { id: 1, category: 'Entertainment', amount: 750, userId: 1 },
    { id: 2, category: 'Bills', amount: 750, userId: 1 },
    { id: 3, category: 'Groceries', amount: 75, userId: 1 },
    { id: 4, category: 'Dining Out', amount: 75, userId: 1 },
    { id: 5, category: 'Personal Care', amount: 100, userId: 1 },
    { id: 6, category: 'Transportation', amount: 120, userId: 1 },
  ];

  for (const budget of budgets) {
    await prisma.budget.upsert({
      where: { id: budget.id },
      update: budget,
      create: budget,
    });
  }

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
            'Entertainment',
            'Bills',
            'Groceries',
            'Dining Out',
            'Transportation',
            'Personal Care',
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
