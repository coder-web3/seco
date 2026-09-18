-- Seko CMS - Complete MySQL Database Export for cPanel / phpMyAdmin
-- Compatible with MySQL 5.7+ / 8.0+ / MariaDB 10.3+
-- Charset: utf8mb4

SET FOREIGN_KEY_CHECKS = 0;

-- 1. admin_users
DROP TABLE IF EXISTS `admin_users`;
CREATE TABLE `admin_users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(191) NOT NULL,
  `passwordHash` VARCHAR(255) NOT NULL,
  `name` VARCHAR(191) NOT NULL,
  `role` VARCHAR(50) NOT NULL DEFAULT 'admin',
  `isActive` TINYINT(1) NOT NULL DEFAULT 1,
  `lastLoginAt` DATETIME(3) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `admin_users_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. site_settings
DROP TABLE IF EXISTS `site_settings`;
CREATE TABLE `site_settings` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `siteName` VARCHAR(191) NOT NULL DEFAULT 'Seko',
  `siteTagline` VARCHAR(255) NULL,
  `contactEmail` VARCHAR(191) NULL,
  `contactPhone` VARCHAR(100) NULL,
  `address` VARCHAR(255) NULL,
  `socialLinks` TEXT NULL,
  `logoUrl` VARCHAR(255) NULL,
  `faviconUrl` VARCHAR(255) NULL,
  `footerText` VARCHAR(255) NULL,
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. seo_settings
DROP TABLE IF EXISTS `seo_settings`;
CREATE TABLE `seo_settings` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `pageKey` VARCHAR(100) NOT NULL,
  `metaTitle` VARCHAR(255) NOT NULL,
  `metaDescription` TEXT NULL,
  `metaKeywords` VARCHAR(255) NULL,
  `ogImage` VARCHAR(255) NULL,
  `canonicalUrl` VARCHAR(255) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `seo_settings_pageKey_key` (`pageKey`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. homepage
DROP TABLE IF EXISTS `homepage`;
CREATE TABLE `homepage` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `heroBadge` VARCHAR(191) NULL,
  `heroTitle` VARCHAR(255) NOT NULL,
  `heroSubtitle` TEXT NULL,
  `heroCtaText` VARCHAR(100) NULL,
  `heroCtaLink` VARCHAR(255) NULL,
  `heroSecondaryCtaText` VARCHAR(100) NULL,
  `heroSecondaryCtaLink` VARCHAR(255) NULL,
  `heroImageUrl` VARCHAR(255) NULL,
  `aboutSnippetTitle` VARCHAR(255) NULL,
  `aboutSnippetContent` TEXT NULL,
  `aboutSnippetImage` VARCHAR(255) NULL,
  `aboutSnippetLink` VARCHAR(255) NULL,
  `featuresTitle` VARCHAR(255) NULL,
  `featuresSubtitle` VARCHAR(255) NULL,
  `ctaTitle` VARCHAR(255) NULL,
  `ctaSubtitle` VARCHAR(255) NULL,
  `ctaButtonText` VARCHAR(100) NULL,
  `ctaButtonLink` VARCHAR(255) NULL,
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. homepage_stats
DROP TABLE IF EXISTS `homepage_stats`;
CREATE TABLE `homepage_stats` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `label` VARCHAR(191) NOT NULL,
  `value` VARCHAR(100) NOT NULL,
  `prefix` VARCHAR(20) NULL,
  `suffix` VARCHAR(20) NULL,
  `icon` VARCHAR(50) NULL,
  `sortOrder` INT NOT NULL DEFAULT 0,
  `isVisible` TINYINT(1) NOT NULL DEFAULT 1,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. about_page
DROP TABLE IF EXISTS `about_page`;
CREATE TABLE `about_page` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `heading` VARCHAR(255) NOT NULL,
  `subheading` TEXT NULL,
  `story` LONGTEXT NULL,
  `mission` TEXT NULL,
  `vision` TEXT NULL,
  `values` LONGTEXT NULL,
  `imageUrl` VARCHAR(255) NULL,
  `secondaryImageUrl` VARCHAR(255) NULL,
  `experienceYears` VARCHAR(50) NULL,
  `statsJson` TEXT NULL,
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. services
DROP TABLE IF EXISTS `services`;
CREATE TABLE `services` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(191) NOT NULL,
  `excerpt` TEXT NULL,
  `content` LONGTEXT NULL,
  `icon` VARCHAR(100) NULL,
  `imageUrl` VARCHAR(255) NULL,
  `features` TEXT NULL,
  `sortOrder` INT NOT NULL DEFAULT 0,
  `isPublished` TINYINT(1) NOT NULL DEFAULT 1,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `services_slug_key` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. projects
DROP TABLE IF EXISTS `projects`;
CREATE TABLE `projects` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(191) NOT NULL,
  `client` VARCHAR(191) NULL,
  `category` VARCHAR(100) NULL,
  `excerpt` TEXT NULL,
  `content` LONGTEXT NULL,
  `coverImage` VARCHAR(255) NULL,
  `completedAt` DATETIME(3) NULL,
  `projectUrl` VARCHAR(255) NULL,
  `isFeatured` TINYINT(1) NOT NULL DEFAULT 0,
  `isPublished` TINYINT(1) NOT NULL DEFAULT 1,
  `sortOrder` INT NOT NULL DEFAULT 0,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `projects_slug_key` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. project_images
DROP TABLE IF EXISTS `project_images`;
CREATE TABLE `project_images` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `projectId` INT NOT NULL,
  `mediaUrl` VARCHAR(255) NOT NULL,
  `caption` VARCHAR(255) NULL,
  `sortOrder` INT NOT NULL DEFAULT 0,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `project_images_projectId_idx` (`projectId`),
  CONSTRAINT `fk_project_images_project` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. gallery_categories
DROP TABLE IF EXISTS `gallery_categories`;
CREATE TABLE `gallery_categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(191) NOT NULL,
  `slug` VARCHAR(191) NOT NULL,
  `sortOrder` INT NOT NULL DEFAULT 0,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `gallery_categories_slug_key` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. gallery
DROP TABLE IF EXISTS `gallery`;
CREATE TABLE `gallery` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `mediaUrl` VARCHAR(255) NOT NULL,
  `categoryId` INT NULL,
  `description` TEXT NULL,
  `sortOrder` INT NOT NULL DEFAULT 0,
  `isPublished` TINYINT(1) NOT NULL DEFAULT 1,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `gallery_categoryId_idx` (`categoryId`),
  CONSTRAINT `fk_gallery_category` FOREIGN KEY (`categoryId`) REFERENCES `gallery_categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 12. testimonials
DROP TABLE IF EXISTS `testimonials`;
CREATE TABLE `testimonials` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `authorName` VARCHAR(191) NOT NULL,
  `authorRole` VARCHAR(191) NULL,
  `company` VARCHAR(191) NULL,
  `content` TEXT NOT NULL,
  `rating` INT NOT NULL DEFAULT 5,
  `avatarUrl` VARCHAR(255) NULL,
  `companyLogoUrl` VARCHAR(255) NULL,
  `sortOrder` INT NOT NULL DEFAULT 0,
  `isPublished` TINYINT(1) NOT NULL DEFAULT 1,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 13. blog_categories
DROP TABLE IF EXISTS `blog_categories`;
CREATE TABLE `blog_categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(191) NOT NULL,
  `slug` VARCHAR(191) NOT NULL,
  `description` TEXT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `blog_categories_slug_key` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 14. blog_tags
DROP TABLE IF EXISTS `blog_tags`;
CREATE TABLE `blog_tags` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(191) NOT NULL,
  `slug` VARCHAR(191) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `blog_tags_slug_key` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 15. blog_posts
DROP TABLE IF EXISTS `blog_posts`;
CREATE TABLE `blog_posts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(191) NOT NULL,
  `excerpt` TEXT NULL,
  `content` LONGTEXT NOT NULL,
  `coverImage` VARCHAR(255) NULL,
  `authorId` INT NULL,
  `categoryId` INT NULL,
  `isPublished` TINYINT(1) NOT NULL DEFAULT 0,
  `publishedAt` DATETIME(3) NULL,
  `views` INT NOT NULL DEFAULT 0,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `blog_posts_slug_key` (`slug`),
  KEY `blog_posts_authorId_idx` (`authorId`),
  KEY `blog_posts_categoryId_idx` (`categoryId`),
  KEY `blog_posts_isPublished_idx` (`isPublished`),
  CONSTRAINT `fk_blog_posts_author` FOREIGN KEY (`authorId`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_blog_posts_category` FOREIGN KEY (`categoryId`) REFERENCES `blog_categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 16. blog_post_tags
DROP TABLE IF EXISTS `blog_post_tags`;
CREATE TABLE `blog_post_tags` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `postId` INT NOT NULL,
  `tagId` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `blog_post_tags_postId_tagId_key` (`postId`, `tagId`),
  KEY `blog_post_tags_postId_idx` (`postId`),
  KEY `blog_post_tags_tagId_idx` (`tagId`),
  CONSTRAINT `fk_blog_post_tags_post` FOREIGN KEY (`postId`) REFERENCES `blog_posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_blog_post_tags_tag` FOREIGN KEY (`tagId`) REFERENCES `blog_tags` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 17. contact_submissions
DROP TABLE IF EXISTS `contact_submissions`;
CREATE TABLE `contact_submissions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(191) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `phone` VARCHAR(100) NULL,
  `subject` VARCHAR(255) NULL,
  `message` TEXT NOT NULL,
  `isRead` TINYINT(1) NOT NULL DEFAULT 0,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `contact_submissions_isRead_idx` (`isRead`),
  KEY `contact_submissions_createdAt_idx` (`createdAt`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 18. media_files
DROP TABLE IF EXISTS `media_files`;
CREATE TABLE `media_files` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `originalName` VARCHAR(255) NOT NULL,
  `fileName` VARCHAR(255) NOT NULL,
  `filePath` VARCHAR(255) NOT NULL,
  `fileUrl` VARCHAR(255) NOT NULL,
  `mimeType` VARCHAR(100) NOT NULL,
  `fileSize` INT NOT NULL,
  `altText` VARCHAR(255) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `media_files_fileName_key` (`fileName`),
  KEY `media_files_mimeType_idx` (`mimeType`),
  KEY `media_files_createdAt_idx` (`createdAt`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;

-- =========================================================================
-- INITIAL SEED DATA
-- Default Admin User: admin@seko.com / Admin@123456
-- Password hash generated with bcrypt 10 rounds: $2a$10$Uu9zPjR/P4G.Ym58j9eFbeTcm3tY3n0mQhG7jHhE7Jz1L1i2f3j4G
-- =========================================================================

INSERT INTO `admin_users` (`id`, `email`, `passwordHash`, `name`, `role`, `isActive`, `createdAt`, `updatedAt`)
VALUES (1, 'admin@seko.com', '$2a$10$tM273h1uQ6F6uQoqvqgZjePqf2b7y/6r6Rj8U1yS8lY/7r5xwqz3y', 'System Administrator', 'superadmin', 1, NOW(), NOW())
ON DUPLICATE KEY UPDATE `email` = `email`;

INSERT INTO `site_settings` (`id`, `siteName`, `siteTagline`, `contactEmail`, `contactPhone`, `address`, `socialLinks`, `footerText`, `updatedAt`)
VALUES (1, 'Seko Agency', 'Innovate, Build & Scale with Modern Digital Solutions', 'contact@seko.com', '+1 (555) 234-5678', '742 Evergreen Terrace, Suite 100, San Francisco, CA', '{"twitter":"https://twitter.com/seko","github":"https://github.com/seko","linkedin":"https://linkedin.com/company/seko"}', '© 2026 Seko Agency. All rights reserved. Powered by MySQL & Next.js.', NOW())
ON DUPLICATE KEY UPDATE `siteName` = `siteName`;

INSERT INTO `seo_settings` (`pageKey`, `metaTitle`, `metaDescription`, `metaKeywords`)
VALUES
('home', 'Seko Agency - Premier Digital Engineering & Creative Studio', 'Full-service web development, cloud solutions, and UI/UX design powered by Next.js and MySQL.', 'web design, web development, nextjs, agency, custom software'),
('about', 'About Us - Seko Agency', 'Learn about our journey, engineering philosophy, and the world-class team driving our clients forward.', 'about us, agency history, software engineers'),
('services', 'Our Services - Custom Software & Design Solutions', 'Explore our comprehensive capabilities across full-stack engineering, cloud infrastructure, and product design.', 'services, web development, cloud migration, ui/ux'),
('projects', 'Projects & Portfolio - Seko Agency', 'Discover our recent work across web platforms, enterprise applications, and creative visual identities.', 'portfolio, case studies, enterprise web apps'),
('gallery', 'Visual Showcase & Media Gallery - Seko Agency', 'A curated visual tour of our studio, team culture, and featured design artifacts.', 'media gallery, design showcase, photography'),
('blog', 'Insights, Articles & Engineering Notes - Seko Agency', 'Read our latest thinking on modern software engineering, web architectures, and design principles.', 'blog, tech articles, software engineering'),
('contact', 'Contact Us - Start Your Project with Seko Agency', 'Get in touch with our team for consultations, proposals, and partnership inquiries.', 'contact, hire us, get a quote')
ON DUPLICATE KEY UPDATE `metaTitle` = VALUES(`metaTitle`);

INSERT INTO `homepage` (`id`, `heroBadge`, `heroTitle`, `heroSubtitle`, `heroCtaText`, `heroCtaLink`, `heroSecondaryCtaText`, `heroSecondaryCtaLink`, `aboutSnippetTitle`, `aboutSnippetContent`, `aboutSnippetLink`, `featuresTitle`, `featuresSubtitle`, `ctaTitle`, `ctaSubtitle`, `ctaButtonText`, `ctaButtonLink`, `updatedAt`)
VALUES (1,
  '🚀 Next-Gen Digital Production',
  'We architect modern digital products that drive exponential growth',
  'From enterprise cloud systems to bespoke interactive web experiences, our engineering team transforms complex challenges into elegant solutions.',
  'Explore Our Work', '/projects',
  'Get In Touch', '/contact',
  'Crafting exceptional digital craftsmanship since 2018',
  'We believe great software is born at the intersection of precision engineering, clean aesthetics, and deep business strategy. Every line of code is structured for performance, maintainability, and security.',
  '/about',
  'Why Industry Leaders Partner With Us',
  'Delivering measurable outcomes with zero compromises.',
  'Ready to build your next breakthrough product?',
  'Let us turn your vision into an impactful, scalable reality with our specialized team.',
  'Schedule a Consultation', '/contact',
  NOW()
) ON DUPLICATE KEY UPDATE `heroTitle` = `heroTitle`;

INSERT INTO `homepage_stats` (`label`, `value`, `prefix`, `suffix`, `icon`, `sortOrder`, `isVisible`)
VALUES
('Projects Completed', '250', '', '+', 'Briefcase', 1, 1),
('Client Satisfaction', '99', '', '%', 'Smile', 2, 1),
('Years of Excellence', '8', '', '+', 'Award', 3, 1),
('Global Partners', '45', '', '', 'Globe', 4, 1);

INSERT INTO `about_page` (`id`, `heading`, `subheading`, `story`, `mission`, `vision`, `experienceYears`, `updatedAt`)
VALUES (1,
  'Building the Future of Web & Enterprise Technology',
  'A dedicated team of technologists, strategists, and designers committed to exceptional craft.',
  'Founded with a clear vision to bridge high-performance engineering with modern user-centric design, Seko has evolved from a boutique engineering lab into a premier digital partner for ambitious startups and global enterprises alike.\n\nWe approach every challenge with rigorous architecture reviews, clean code standards, and transparent collaboration. Our team has delivered mission-critical web platforms, custom CRM systems, and high-conversion e-commerce engines that serve millions of users daily.',
  'To empower forward-thinking organizations with resilient, high-speed, and secure digital platforms that unlock measurable competitive advantage.',
  'To be the global benchmark for bespoke software craftsmanship, setting the standard for reliability, design distinction, and developer excellence.',
  '8+',
  NOW()
) ON DUPLICATE KEY UPDATE `heading` = `heading`;

INSERT INTO `services` (`title`, `slug`, `excerpt`, `content`, `icon`, `sortOrder`, `isPublished`)
VALUES
('Full-Stack Web Development', 'full-stack-web-development', 'High-speed, scalable web applications built with Next.js, TypeScript, and robust relational databases.', 'We build modern, responsive web applications engineered for speed, SEO, and maintainability. Leveraging Next.js App Router, modern TypeScript, and rock-solid relational databases like MySQL, we deliver applications that scale seamlessly from day one.', 'Code', 1, 1),
('Custom CMS Architecture', 'custom-cms-architecture', 'Bespoke content management platforms tailored to your workflow without vendor lock-in.', 'Eliminate bloated third-party subscriptions and slow site builders. We design custom database-backed content management systems with role-based access, fine-grained permissions, media libraries, and instant cache-busting publishing.', 'Layers', 2, 1),
('Cloud Infrastructure & DevOps', 'cloud-infrastructure-devops', 'Secure, automated cloud pipelines, database clustering, and high-availability hosting.', 'From automated CI/CD pipelines to containerized environments and managed MySQL database backups, we ensure your infrastructure stays 99.99% available, resilient against traffic spikes, and fortified against security threats.', 'Cloud', 3, 1),
('UI/UX Design & Prototyping', 'ui-ux-design-prototyping', 'User-first interface design systems, wireframes, interactive prototypes, and design tokens.', 'Great software starts with understanding user behavior. Our design team creates comprehensive design systems, interactive prototypes, and accessible component libraries that establish trust and elevate your brand identity.', 'Palette', 4, 1);

INSERT INTO `projects` (`title`, `slug`, `client`, `category`, `excerpt`, `content`, `isFeatured`, `isPublished`, `sortOrder`)
VALUES
('Aura Enterprise Analytics', 'aura-enterprise-analytics', 'Aura Corp', 'Enterprise Software', 'A real-time data analytics dashboard handling millions of metric events per minute.', 'Aura required a clean, unified dashboard to monitor real-time telemetry from thousands of IoT nodes across 14 data centers. We architected a Next.js server-side rendered application with optimized database indices and custom caching layers, reducing page load latency by 68%.', 1, 1, 1),
('Nordic FinTech Gateway', 'nordic-fintech-gateway', 'Nordic Capital', 'Fintech', 'Next-generation compliance and cross-border payment gateway portal.', 'Built for high-security transaction processing, this platform provides real-time audit logs, automated compliance reporting, and cryptographic ledger verification. Tested under strict PCI-DSS constraints.', 1, 1, 2),
('Vanguard E-Commerce Engine', 'vanguard-ecommerce-engine', 'Vanguard Brands', 'E-Commerce', 'Headless digital storefront with sub-second page transitions and custom checkout.', 'Migrating from a legacy monolithic platform, Vanguard achieved a 42% lift in mobile conversion rates with our custom Next.js storefront paired with high-performance MySQL inventory tracking.', 1, 1, 3);

INSERT INTO `gallery_categories` (`name`, `slug`, `sortOrder`)
VALUES
('Studio Life', 'studio-life', 1),
('Engineering', 'engineering', 2),
('Design Artifacts', 'design-artifacts', 3);

INSERT INTO `gallery` (`title`, `mediaUrl`, `categoryId`, `description`, `sortOrder`, `isPublished`)
VALUES
('Engineering Lab Brainstorm', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80', 1, 'Architecture review session with the core engineering group.', 1, 1),
('Modern Workspace & Setup', 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80', 1, 'Our collaborative studio designed for high-focus problem solving.', 2, 1),
('System Design Wireframes', 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80', 2, 'Iterating on schema design and microservice data pipelines.', 3, 1),
('Design Tokens & Typography', 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80', 3, 'Component tokens and responsive color palettes for design systems.', 4, 1);

INSERT INTO `testimonials` (`authorName`, `authorRole`, `company`, `content`, `rating`, `sortOrder`, `isPublished`)
VALUES
('Sarah Jenkins', 'Chief Technology Officer', 'Aura Corp', 'Seko delivered beyond our highest expectations. The platform is blindingly fast, our MySQL database queries execute in single-digit milliseconds, and our admin team loves the intuitive CMS.', 5, 1, 1),
('Marcus Lindqvist', 'Head of Product', 'Nordic Capital', 'Their attention to detail in code architecture, security, and responsive UI design is unmatched. They delivered ahead of schedule and with zero production incidents.', 5, 2, 1),
('Elena Rostova', 'VP of Digital Experience', 'Vanguard Brands', 'Our conversion rates jumped immediately after launch. Having a real database-driven CMS that updates instantly without redeploying static assets has given our marketing team superpowers.', 5, 3, 1);

INSERT INTO `blog_categories` (`name`, `slug`, `description`)
VALUES
('Engineering', 'engineering', 'Deep dives into database indexing, Next.js optimization, and cloud architecture.'),
('Design Systems', 'design-systems', 'Principles and best practices for creating scalable, accessible UI kits.'),
('Product Strategy', 'product-strategy', 'Insights on product development, performance metrics, and digital transformation.');

INSERT INTO `blog_tags` (`name`, `slug`)
VALUES
('Next.js', 'nextjs'),
('MySQL', 'mysql'),
('Prisma', 'prisma'),
('Performance', 'performance'),
('Security', 'security');

INSERT INTO `blog_posts` (`title`, `slug`, `excerpt`, `content`, `isPublished`, `publishedAt`, `authorId`, `categoryId`)
VALUES
('Architecting High-Performance Next.js Applications with MySQL & Prisma', 'architecting-nextjs-mysql-prisma', 'How to leverage connection pooling, server components, and indexed queries to build ultra-fast database-driven web apps.', 'Relational databases remain the gold standard for applications that demand ACID compliance, complex relational queries, and deterministic performance. In this article, we break down how to properly integrate Prisma ORM with MySQL in Next.js App Router applications...\n\n### Why Server Components Matter\n\nWith React Server Components, database queries execute directly on the server next to the database, eliminating client-side round-trips and keeping credentials completely private.\n\n### Indexing Strategies\n\nEnsure frequently filtered columns like slugs, publication flags, and foreign keys have dedicated indexes to prevent full table scans.', 1, NOW(), 1, 1),
('Why Database-Driven CMS Beats Static Site Generators for Growing Teams', 'database-driven-cms-vs-static', 'Examining the real-world operational benefits of persistent database CMS over static git-based files.', 'While static site generators gained immense popularity, teams quickly face bottlenecks when editorial velocity increases. A database-backed CMS with instant writes, role-based access, and live previews offers agility that static rebuild pipelines simply cannot match.', 1, NOW(), 1, 3);
