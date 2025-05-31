import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  const userId = 1;

  // Ensure user exists
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new Error('User with ID 1 does not exist.');
  }

  // Create 5 random counterparties
  const counterparties = await Promise.all(
    Array.from({ length: 5 }).map(() =>
      prisma.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
        },
      })
    )
  );

  // Pots
  await prisma.pot.createMany({
    data: Array.from({ length: 4 }).map(() => ({
      name: faker.word.words(2),
      amount: Number(faker.finance.amount({ min: 10, max: 500, dec: 2 })),
      userId,
    })),
  });

  // Budgets
  await prisma.budget.createMany({
    data: Array.from({ length: 4 }).map(() => ({
      category: faker.commerce.department(),
      amount: Number(faker.finance.amount({ min: 50, max: 500, dec: 2 })),
      userId,
    })),
  });

  // Bills
  await prisma.bill.createMany({
    data: Array.from({ length: 3 }).map(() => ({
      status: faker.helpers.arrayElement(['PAID', 'DUE', 'UPCOMING']),
      amount: Number(faker.finance.amount({ min: 20, max: 200, dec: 2 })),
      userId,
    })),
  });

  // Transactions
  await Promise.all(
    Array.from({ length: 10 }).map(() => {
      const counterparty = faker.helpers.arrayElement(counterparties);
      const isOutgoing = faker.datatype.boolean();
      return prisma.transaction.create({
        data: {
          userId,
          counterpartyId: counterparty.id,
          amount: Number(faker.finance.amount({ min: 10, max: 150, dec: 2 })) * (isOutgoing ? -1 : 1),
          date: faker.date.recent({ days: 30 }),
          description: faker.lorem.sentence(),
          type: isOutgoing ? 'OUTGOING' : 'INCOMING',
        },
      });
    })
  );

  console.log('🌱 Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
