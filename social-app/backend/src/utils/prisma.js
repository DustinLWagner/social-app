//use   require('../utils/prisma')   anywhere

//src/utils/prisma.js
const { PrismaClient } = require('../../generated/prisma');

//prevent multiple instances
const globalForPrisma = global;

//check for prisma stored locally, if yes reuse if no create new. "This is called the singleton pattern — only one shared instance across your app."
const prisma = globalForPrisma.prisma || new PrismaClient();

//stores the prisma instance in global only in development
if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
};

//export shared instance
module.exports = prisma;