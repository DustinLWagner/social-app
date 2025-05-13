const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function main() {
    const users = await prisma.user.findMany();
    console.log(users);
    await prisma.$disconnect();
}

main();