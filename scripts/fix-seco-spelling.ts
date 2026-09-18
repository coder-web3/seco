import { prisma } from '../src/lib/prisma';

async function main() {
  console.log('Fixing Seko -> SECO LINE spelling in database...');

  // 1. Site Settings
  await prisma.siteSetting.updateMany({
    data: {
      siteName: 'SECO LINE',
      contactEmail: 'info@secoline.sa',
      footerText: '© 2026 SECO LINE. All rights reserved.',
    },
  });

  // 2. SEO Settings
  const seoRecords = await prisma.seoSetting.findMany();
  for (const record of seoRecords) {
    const newTitle = record.metaTitle.replace(/Seko Agency|Seko/gi, 'SECO LINE');
    const newDesc = record.metaDescription ? record.metaDescription.replace(/Seko Agency|Seko/gi, 'SECO LINE') : record.metaDescription;
    await prisma.seoSetting.update({
      where: { id: record.id },
      data: { metaTitle: newTitle, metaDescription: newDesc },
    });
  }

  // 3. Admin Users
  const adminUser = await prisma.adminUser.findFirst({ where: { email: 'admin@seko.com' } });
  if (adminUser) {
    await prisma.adminUser.update({
      where: { id: adminUser.id },
      data: { email: 'admin@seco.com' },
    });
  }

  // 4. Testimonials
  const testimonials = await prisma.testimonial.findMany();
  for (const t of testimonials) {
    if (t.content.includes('Seko')) {
      await prisma.testimonial.update({
        where: { id: t.id },
        data: { content: t.content.replace(/Seko/g, 'SECO LINE') },
      });
    }
  }

  // 5. About Page
  const about = await prisma.aboutPage.findFirst();
  if (about && about.story && about.story.includes('Seko')) {
    await prisma.aboutPage.update({
      where: { id: about.id },
      data: { story: about.story.replace(/Seko/g, 'SECO LINE') },
    });
  }

  console.log('Spelling update complete!');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
