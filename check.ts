import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  console.log('Roles:', await prisma.role.findMany());
  console.log('Users:', await prisma.user.findMany({ include: { role: true } }));
}
main().then(() => prisma.$disconnect());
