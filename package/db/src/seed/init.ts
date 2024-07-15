import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const usersCount = await prisma.user.count();

  console.log("Current users count: ", usersCount);

  if (usersCount === 0) {
    await prisma.user.create({
      data: {
        username: "admin",
        email: "admin@admin.com",
        password: "admin@admin.com",
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
