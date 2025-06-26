import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  //DONT KNOW WHATS GOING ON WILL CHECK OUT LATER
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const hashedPassword: string = await bcrypt.hash('adminadmin', 10);
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

  const pots = [
    {
      name: 'Savings',
      amount: 159,
      target: 2000,
      userId: 1,
      color: 'green',
    },
    {
      name: 'Concert Ticket',
      amount: 110,
      target: 150,
      userId: 1,
      color: 'yellow',
    },
    { name: 'Gift', amount: 40, target: 60, userId: 1, color: 'cyan' },
    { name: 'New Laptop', amount: 10, target: 1000, userId: 1, color: 'navy' },
    { name: 'Holiday', amount: 531, target: 1440, userId: 1, color: 'red' },
  ];

  await prisma.pot.createMany({
    data: pots,
    skipDuplicates: true,
  });

  // Budgets (replaced with fixed values and upsert logic)
  const budgets = [
    {
      category: 'Entertainment',
      amount: 750,
      userId: 1,
      color: 'green',
    },
    { category: 'Bills', amount: 750, userId: 1, color: 'yellow' },
    { category: 'Groceries', amount: 75, userId: 1, color: 'cyan' },
    { category: 'Dining Out', amount: 75, userId: 1, color: 'navy' },
    { category: 'Personal Care', amount: 100, userId: 1, color: 'red' },
    {
      category: 'Transportation',
      amount: 120,
      userId: 1,
      color: 'purple',
    },
  ];

  await prisma.budget.createMany({
    data: budgets, // no `id` fields!
    skipDuplicates: true, // avoids inserting if exact same record exists (on unique fields only)
  });

  // Bills

  await prisma.bill.createMany({
    data: Array.from({ length: 50 }).map(() => {
      const type = faker.helpers.arrayElement(['MONTHLY', 'ONETIME']);
      const payees = [
        'Netflix',
        'Spotify',
        'Amazon',
        'AT&T',
        'Verizon',
        'Apple',
        'Google',
        faker.company.name(),
        faker.company.name(),
      ];
      return {
        status: faker.helpers.arrayElement(['PAID', 'DUE', 'UPCOMING']),
        type,
        amount: Number(faker.finance.amount({ min: 20, max: 200, dec: 2 })),
        payee: faker.helpers.arrayElement(payees),
        dueDay:
          type === 'MONTHLY' ? faker.number.int({ min: 1, max: 28 }) : null,
        dueExactDate:
          type === 'ONETIME' ? faker.date.future({ years: 1 }) : null,
        userId: 1,
      };
    }),
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
  .finally(() => {
    prisma.$disconnect();
  });
