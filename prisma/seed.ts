import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";
const hashed = await bcrypt.hash("admin123", 10);

const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      username: "admin",
      password: hashed,
      full_name: "Administrator"
    }
  })
}

main()
  .then(() => console.log("Seed selesai"))
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect())
