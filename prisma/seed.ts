import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  const password = process.env.ADMIN_PASSWORD || '12345678';

  const hashedPassword = await argon2.hash(password);

  await prisma.admin.create({
    data: {
      username: 'admin',
      password: hashedPassword,
    },
  });
}

main()
  .catch((error) => {
    console.log(error);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect;
  });
