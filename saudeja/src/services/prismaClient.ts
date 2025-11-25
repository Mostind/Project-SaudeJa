import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// A URL do banco de dados deve ser lida do .env
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL não está definida no ambiente.');
}

// Cria o pool de conexões do driver pg
const pool = new Pool({ connectionString });

// Cria o adaptador do Prisma para o driver pg
const adapter = new PrismaPg(pool);

// Singleton para evitar múltiplas instâncias do Prisma Client
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter, // Passa o adaptador para o construtor
    log: ['error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;

