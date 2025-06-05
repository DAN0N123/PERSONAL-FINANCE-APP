import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const userId = 1; // Ensure this user exists!

  const budgets = [
    { id: 1, category: 'Entertainment', amount: 750, userId },
    { id: 2, category: 'Bills', amount: 750, userId },
    { id: 3, category: 'Groceries', amount: 75, userId },
    { id: 4, category: 'Dining Out', amount: 75, userId },
    { id: 5, category: 'Personal Care', amount: 100, userId },
    { id: 6, category: 'Transportation', amount: 120, userId },
  ];

  for (const budget of budgets) {
    await prisma.budget.upsert({
      where: { id: budget.id },
      update: budget,
      create: budget,
    });
  }

  console.log('Budgets seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
