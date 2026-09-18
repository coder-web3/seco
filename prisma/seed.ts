import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Seko CMS database...');

  // 1. Admin User
  const hashedPassword = await bcrypt.hash('Admin@123456', 10);
  const admin = await prisma.adminUser.upsert({
    where: { email: 'admin@seko.com' },
    update: {},
    create: {
      email: 'admin@seko.com',
      passwordHash: hashedPassword,
      name: 'System Administrator',
      role: 'superadmin',
      isActive: true,
    },
  });
  console.log('Admin user ready:', admin.email);

  // 2. Site Settings
  await prisma.siteSetting.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      siteName: 'Seko Agency',
      siteTagline: 'Innovate, Build & Scale with Modern Digital Solutions',
      contactEmail: 'contact@seko.com',
      contactPhone: '+1 (555) 234-5678',
      address: '742 Evergreen Terrace, Suite 100, San Francisco, CA',
      socialLinks: JSON.stringify({
        twitter: 'https://twitter.com/seko',
        github: 'https://github.com/seko',
        linkedin: 'https://linkedin.com/company/seko',
      }),
      footerText: '© 2026 SECO LINE. All rights reserved.',
    },
  });

  // 3. SEO Settings
  const pages = [
    { pageKey: 'home', metaTitle: 'Seko Agency - Premier Digital Engineering & Creative Studio', metaDescription: 'Full-service web development, cloud solutions, and UI/UX design powered by Next.js and MySQL.' },
    { pageKey: 'about', metaTitle: 'About Us - Seko Agency', metaDescription: 'Learn about our journey, engineering philosophy, and the world-class team driving our clients forward.' },
    { pageKey: 'services', metaTitle: 'Our Services - Custom Software & Design Solutions', metaDescription: 'Explore our comprehensive capabilities across full-stack engineering, cloud infrastructure, and product design.' },
    { pageKey: 'projects', metaTitle: 'Projects & Portfolio - Seko Agency', metaDescription: 'Discover our recent work across web platforms, enterprise applications, and creative visual identities.' },
    { pageKey: 'gallery', metaTitle: 'Visual Showcase & Media Gallery - Seko Agency', metaDescription: 'A curated visual tour of our studio, team culture, and featured design artifacts.' },
    { pageKey: 'blog', metaTitle: 'Insights, Articles & Engineering Notes - Seko Agency', metaDescription: 'Read our latest thinking on modern software engineering, web architectures, and design principles.' },
    { pageKey: 'contact', metaTitle: 'Contact Us - Start Your Project with Seko Agency', metaDescription: 'Get in touch with our team for consultations, proposals, and partnership inquiries.' },
  ];

  for (const p of pages) {
    await prisma.seoSetting.upsert({
      where: { pageKey: p.pageKey },
      update: {},
      create: p,
    });
  }

  // 4. Homepage
  await prisma.homepage.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      heroBadge: '🚀 Next-Gen Digital Production',
      heroTitle: 'We architect modern digital products that drive exponential growth',
      heroSubtitle: 'From enterprise cloud systems to bespoke interactive web experiences, our engineering team transforms complex challenges into elegant solutions.',
      heroCtaText: 'Explore Our Work',
      heroCtaLink: '/projects',
      heroSecondaryCtaText: 'Get In Touch',
      heroSecondaryCtaLink: '/contact',
      aboutSnippetTitle: 'Crafting exceptional digital craftsmanship since 2018',
      aboutSnippetContent: 'We believe great software is born at the intersection of precision engineering, clean aesthetics, and deep business strategy. Every line of code is structured for performance, maintainability, and security.',
      aboutSnippetLink: '/about',
      featuresTitle: 'Why Industry Leaders Partner With Us',
      featuresSubtitle: 'Delivering measurable outcomes with zero compromises.',
      ctaTitle: 'Ready to build your next breakthrough product?',
      ctaSubtitle: 'Let us turn your vision into an impactful, scalable reality with our specialized team.',
      ctaButtonText: 'Schedule a Consultation',
      ctaButtonLink: '/contact',
    },
  });

  // 5. Homepage Stats
  const statsCount = await prisma.homepageStat.count();
  if (statsCount === 0) {
    await prisma.homepageStat.createMany({
      data: [
        { label: 'Projects Completed', value: '250', prefix: '', suffix: '+', icon: 'Briefcase', sortOrder: 1, isVisible: true },
        { label: 'Client Satisfaction', value: '99', prefix: '', suffix: '%', icon: 'Smile', sortOrder: 2, isVisible: true },
        { label: 'Years of Excellence', value: '8', prefix: '', suffix: '+', icon: 'Award', sortOrder: 3, isVisible: true },
        { label: 'Global Partners', value: '45', prefix: '', suffix: '', icon: 'Globe', sortOrder: 4, isVisible: true },
      ],
    });
  }

  // 6. About Page
  await prisma.aboutPage.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      heading: 'Building the Future of Web & Enterprise Technology',
      subheading: 'A dedicated team of technologists, strategists, and designers committed to exceptional craft.',
      story: 'Founded with a clear vision to bridge high-performance engineering with modern user-centric design, Seko has evolved from a boutique engineering lab into a premier digital partner for ambitious startups and global enterprises alike.\n\nWe approach every challenge with rigorous architecture reviews, clean code standards, and transparent collaboration.',
      mission: 'To empower forward-thinking organizations with resilient, high-speed, and secure digital platforms that unlock measurable competitive advantage.',
      vision: 'To be the global benchmark for bespoke software craftsmanship, setting the standard for reliability, design distinction, and developer excellence.',
      experienceYears: '8+',
    },
  });

  // 7. Services
  const services = [
    { title: 'Full-Stack Web Development', slug: 'full-stack-web-development', excerpt: 'High-speed, scalable web applications built with Next.js, TypeScript, and robust relational databases.', content: 'We build modern, responsive web applications engineered for speed, SEO, and maintainability. Leveraging Next.js App Router, modern TypeScript, and rock-solid relational databases like MySQL, we deliver applications that scale seamlessly from day one.', icon: 'Code', sortOrder: 1, isPublished: true },
    { title: 'Custom CMS Architecture', slug: 'custom-cms-architecture', excerpt: 'Bespoke content management platforms tailored to your workflow without vendor lock-in.', content: 'Eliminate bloated third-party subscriptions and slow site builders. We design custom database-backed content management systems with role-based access, fine-grained permissions, media libraries, and instant cache-busting publishing.', icon: 'Layers', sortOrder: 2, isPublished: true },
    { title: 'Cloud Infrastructure & DevOps', slug: 'cloud-infrastructure-devops', excerpt: 'Secure, automated cloud pipelines, database clustering, and high-availability hosting.', content: 'From automated CI/CD pipelines to containerized environments and managed MySQL database backups, we ensure your infrastructure stays 99.99% available, resilient against traffic spikes, and fortified against security threats.', icon: 'Cloud', sortOrder: 3, isPublished: true },
    { title: 'UI/UX Design & Prototyping', slug: 'ui-ux-design-prototyping', excerpt: 'User-first interface design systems, wireframes, interactive prototypes, and design tokens.', content: 'Great software starts with understanding user behavior. Our design team creates comprehensive design systems, interactive prototypes, and accessible component libraries that establish trust and elevate your brand identity.', icon: 'Palette', sortOrder: 4, isPublished: true },
  ];

  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {},
      create: s,
    });
  }

  // 8. Projects
  const projects = [
    { title: 'Aura Enterprise Analytics', slug: 'aura-enterprise-analytics', client: 'Aura Corp', category: 'Enterprise Software', excerpt: 'A real-time data analytics dashboard handling millions of metric events per minute.', content: 'Aura required a clean, unified dashboard to monitor real-time telemetry from thousands of IoT nodes across 14 data centers. We architected a Next.js server-side rendered application with optimized database indices and custom caching layers, reducing page load latency by 68%.', isFeatured: true, isPublished: true, sortOrder: 1 },
    { title: 'Nordic FinTech Gateway', slug: 'nordic-fintech-gateway', client: 'Nordic Capital', category: 'Fintech', excerpt: 'Next-generation compliance and cross-border payment gateway portal.', content: 'Built for high-security transaction processing, this platform provides real-time audit logs, automated compliance reporting, and cryptographic ledger verification. Tested under strict PCI-DSS constraints.', isFeatured: true, isPublished: true, sortOrder: 2 },
    { title: 'Vanguard E-Commerce Engine', slug: 'vanguard-ecommerce-engine', client: 'Vanguard Brands', category: 'E-Commerce', excerpt: 'Headless digital storefront with sub-second page transitions and custom checkout.', content: 'Migrating from a legacy monolithic platform, Vanguard achieved a 42% lift in mobile conversion rates with our custom Next.js storefront paired with high-performance MySQL inventory tracking.', isFeatured: true, isPublished: true, sortOrder: 3 },
  ];

  for (const p of projects) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    });
  }

  // 9. Gallery
  const cat1 = await prisma.galleryCategory.upsert({
    where: { slug: 'studio-life' },
    update: {},
    create: { name: 'Studio Life', slug: 'studio-life', sortOrder: 1 },
  });

  const cat2 = await prisma.galleryCategory.upsert({
    where: { slug: 'design-artifacts' },
    update: {},
    create: { name: 'Design Artifacts', slug: 'design-artifacts', sortOrder: 2 },
  });

  const galleryItems = [
    { title: 'Engineering Lab Brainstorm', mediaUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80', categoryId: cat1.id, description: 'Architecture review session with the core engineering group.', sortOrder: 1, isPublished: true },
    { title: 'Modern Workspace & Setup', mediaUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80', categoryId: cat1.id, description: 'Our collaborative studio designed for high-focus problem solving.', sortOrder: 2, isPublished: true },
    { title: 'Design Tokens & Typography', mediaUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80', categoryId: cat2.id, description: 'Component tokens and responsive color palettes for design systems.', sortOrder: 3, isPublished: true },
  ];

  for (const item of galleryItems) {
    const existing = await prisma.galleryItem.findFirst({ where: { title: item.title } });
    if (!existing) {
      await prisma.galleryItem.create({ data: item });
    }
  }

  // 10. Testimonials
  const testimonials = [
    { authorName: 'Sarah Jenkins', authorRole: 'Chief Technology Officer', company: 'Aura Corp', content: 'Seko delivered beyond our highest expectations. The platform is blindingly fast, our MySQL database queries execute in single-digit milliseconds, and our admin team loves the intuitive CMS.', rating: 5, sortOrder: 1, isPublished: true },
    { authorName: 'Marcus Lindqvist', authorRole: 'Head of Product', company: 'Nordic Capital', content: 'Their attention to detail in code architecture, security, and responsive UI design is unmatched. They delivered ahead of schedule and with zero production incidents.', rating: 5, sortOrder: 2, isPublished: true },
    { authorName: 'Elena Rostova', authorRole: 'VP of Digital Experience', company: 'Vanguard Brands', content: 'Our conversion rates jumped immediately after launch. Having a real database-driven CMS that updates instantly without redeploying static assets has given our marketing team superpowers.', rating: 5, sortOrder: 3, isPublished: true },
  ];

  for (const t of testimonials) {
    const existing = await prisma.testimonial.findFirst({ where: { authorName: t.authorName } });
    if (!existing) {
      await prisma.testimonial.create({ data: t });
    }
  }

  // 11. Blog Categories & Posts
  const engCat = await prisma.blogCategory.upsert({
    where: { slug: 'engineering' },
    update: {},
    create: { name: 'Engineering', slug: 'engineering', description: 'Deep dives into database indexing, Next.js optimization, and cloud architecture.' },
  });

  await prisma.blogPost.upsert({
    where: { slug: 'architecting-nextjs-mysql-prisma' },
    update: {},
    create: {
      title: 'Architecting High-Performance Next.js Applications with MySQL & Prisma',
      slug: 'architecting-nextjs-mysql-prisma',
      excerpt: 'How to leverage connection pooling, server components, and indexed queries to build ultra-fast database-driven web apps.',
      content: 'Relational databases remain the gold standard for applications that demand ACID compliance, complex relational queries, and deterministic performance. In this article, we break down how to properly integrate Prisma ORM with MySQL in Next.js App Router applications...\n\n### Why Server Components Matter\n\nWith React Server Components, database queries execute directly on the server next to the database, eliminating client-side round-trips and keeping credentials completely private.\n\n### Indexing Strategies\n\nEnsure frequently filtered columns like slugs, publication flags, and foreign keys have dedicated indexes to prevent full table scans.',
      isPublished: true,
      publishedAt: new Date(),
      authorId: admin.id,
      categoryId: engCat.id,
    },
  });

  console.log('Database seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
