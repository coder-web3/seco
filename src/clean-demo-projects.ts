import { prisma } from './lib/prisma';

async function main() {
  const result = await prisma.project.deleteMany({});
  console.log(`Deleted ${result.count} project records from database.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
