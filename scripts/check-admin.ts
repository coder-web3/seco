import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function updateAllAdmins() {
  const hash = await bcrypt.hash('Admin@123456', 10);

  const users = await prisma.adminUser.findMany();
  for (const user of users) {
    await prisma.adminUser.update({
      where: { id: user.id },
      data: {
        passwordHash: hash,
        isActive: true,
      },
    });
    console.log(`Updated password for ${user.email} (ID: ${user.id}) to: Admin@123456`);
  }
}

updateAllAdmins().catch(console.error).finally(() => prisma.$disconnect());
