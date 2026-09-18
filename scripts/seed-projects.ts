import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedConstructionProjects() {
  console.log('Seeding / updating SECO LINE construction projects in MySQL...');

  const projectsData = [
    {
      title: 'Al Narjis Villas',
      slug: 'al-narjis-villas',
      client: 'Al Narjis Development',
      category: 'Residential',
      excerpt: 'Bespoke luxury villa compound with modern architectural finishes in Riyadh.',
      content: 'SECO LINE delivered complete residential construction and civil contracting for the Al Narjis Villas compound in Riyadh, ensuring premium build quality, sustainable materials, and precise execution.',
      coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      isFeatured: true,
      isPublished: true,
      sortOrder: 1,
    },
    {
      title: 'Riyadh Business Park',
      slug: 'riyadh-business-park',
      client: 'Riyadh Commercial Real Estate',
      category: 'Commercial',
      excerpt: 'State-of-the-art commercial complex and corporate office towers.',
      content: 'A landmark commercial development featuring multi-story corporate towers, integrated HVAC and electrical systems, and modern interior fit-outs.',
      coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      isFeatured: true,
      isPublished: true,
      sortOrder: 2,
    },
    {
      title: 'Industrial Facility',
      slug: 'industrial-facility',
      client: 'Saudi Industrial Logistics Co.',
      category: 'Industrial',
      excerpt: 'High-capacity manufacturing and logistics facility engineered for heavy operations.',
      content: 'Turnkey industrial engineering, steel structural work, heavy foundation pouring, and mechanical piping for a high-efficiency logistics center.',
      coverImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
      isFeatured: true,
      isPublished: true,
      sortOrder: 3,
    },
    {
      title: 'King Abdullah Road Upgrade',
      slug: 'king-abdullah-road',
      client: 'Ministry of Transportation & Infrastructure',
      category: 'Infrastructure',
      excerpt: 'Major urban arterial road expansion, utility upgrades, and infrastructure landscaping.',
      content: 'Civil infrastructure works, asphalt paving, underground utility trenching, and traffic management systems delivered to enhance city connectivity.',
      coverImage: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1000&q=80',
      isFeatured: true,
      isPublished: true,
      sortOrder: 4,
    },
  ];

  for (const item of projectsData) {
    await prisma.project.upsert({
      where: { slug: item.slug },
      update: item,
      create: item,
    });
    console.log(`- Project synced: ${item.title} (${item.category})`);
  }

  console.log('Construction projects seeded successfully!');
}

seedConstructionProjects()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
