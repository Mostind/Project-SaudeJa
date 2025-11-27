/**
 * Script para testar conexão com Supabase via Pooler
 * 
 * Uso:
 * npx ts-node scripts/test-connection.ts
 */

import 'dotenv/config';
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

const prisma = new PrismaClient({
  adapter, // Passa o adaptador para o construtor
  log: ['query', 'info', 'warn', 'error'],
});

async function testConnection() {
  console.log('');
  console.log('🔌 Testando conexão com Supabase...');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');

  try {
    // Teste 1: Query simples
    console.log('📊 Teste 1: Query simples');
    const result = await prisma.$queryRaw`SELECT 1 as test, NOW() as current_time`;
    console.log('   ✅ Sucesso:', result);
    console.log('');

    // Teste 2: Verificar tabelas existentes
    console.log('📋 Teste 2: Verificar tabelas');
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;
    console.log('   ✅ Tabelas encontradas:', tables);
    console.log('');

    // Teste 3: Contar usuários
    console.log('👤 Teste 3: Contar usuários');
    try {
      const userCount = await prisma.user.count();
      console.log(`   ✅ Total de usuários: ${userCount}`);
    } catch (error: any) {
      console.log('   ⚠️  Tabela "users" não existe ainda. Execute: npx prisma db push');
    }
    console.log('');

    // Teste 4: Contar vacinas
    console.log('💉 Teste 4: Contar vacinas');
    try {
      const vaccineCount = await prisma.vaccine.count();
      console.log(`   ✅ Total de vacinas: ${vaccineCount}`);
    } catch (error: any) {
      console.log('   ⚠️  Tabela "vaccines" não existe ainda. Execute: npx prisma db push');
    }
    console.log('');

    // Teste 5: Contar postos de saúde
    console.log('🏥 Teste 5: Contar postos de saúde');
    try {
      const postCount = await prisma.healthPost.count();
      console.log(`   ✅ Total de postos: ${postCount}`);
    } catch (error: any) {
      console.log('   ⚠️  Tabela "health_posts" não existe ainda. Execute: npx prisma db push');
    }
    console.log('');

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ CONEXÃO COM SUPABASE FUNCIONANDO!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('📝 Próximos passos:');
    console.log('   1. Execute: npx prisma db push');
    console.log('   2. Execute: npx prisma db seed');
    console.log('   3. Teste o login no app');
    console.log('');

  } catch (error: any) {
    console.log('');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('❌ ERRO NA CONEXÃO COM SUPABASE');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('Erro:', error.message);
    console.log('');
    console.log('🔧 Possíveis soluções:');
    console.log('');
    console.log('1. Verifique o arquivo .env:');
    console.log('   - Senha está correta?');
    console.log('   - URL está completa?');
    console.log('   - Tem os parâmetros pgbouncer=true&connection_limit=1?');
    console.log('');
    console.log('2. Verifique no Supabase:');
    console.log('   - Projeto está ativo (não pausado)?');
    console.log('   - Connection string está correta?');
    console.log('');
    console.log('3. Teste a connection string:');
    console.log('   - Acesse Settings → Database no Supabase');
    console.log('   - Copie a Transaction Pooler string');
    console.log('   - Cole no .env e substitua [YOUR-PASSWORD]');
    console.log('');

    
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
