import { prisma } from '../src/lib/prisma';

async function main() {
  await prisma.siteSetting.updateMany({
    data: {
      footerText: '© 2026 SECO LINE. All rights reserved.',
    },
  });
  console.log('SiteSettings updated successfully');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
