 require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

prisma.$connect()
  .then(() => console.log('✅ Connected!'))
  .catch(err => console.error(err))
  .finally(() => prisma.$disconnect());
