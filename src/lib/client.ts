import { PrismaClient } from "@prisma/client";

const globalForPrima = globalThis as unknown as { prisma: PrismaClient };

const prisma = globalForPrima.prisma || new PrismaClient();
export default prisma;
if (process.env.NODE_ENV !== "production") globalForPrima.prisma = prisma;
