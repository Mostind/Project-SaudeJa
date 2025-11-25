/**
 * Script para criar usuários manualmente
 * 
 * Uso:
 * npx ts-node scripts/create-user.ts <cpf> <senha>
 * 
 * Exemplo:
 * npx ts-node scripts/create-user.ts 12345678909 minhasenha
 */
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createUser(cpf: string, password: string) {
  try {
    // Remove formatação do CPF
    const cleanCPF = cpf.replace(/\D/g, '');
    
    // Valida CPF
    if (cleanCPF.length !== 11) {
      console.error('❌ Erro: CPF deve ter 11 dígitos');
      process.exit(1);
    }
    
    // Valida senha
    if (password.length < 4) {
      console.error('❌ Erro: Senha deve ter no mínimo 4 caracteres');
      process.exit(1);
    }
    
    // Verifica se usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: { cpf: cleanCPF },
    });
    
    if (existingUser) {
      console.error(`❌ Erro: Usuário com CPF ${cleanCPF} já existe`);
      process.exit(1);
    }
    
    // Gera hash da senha
    console.log('🔐 Gerando hash da senha...');
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Cria usuário
    console.log('👤 Criando usuário...');
    const user = await prisma.user.create({
      data: {
        cpf: cleanCPF,
        password: hashedPassword,
      },
    });
    
    console.log('');
    console.log('✅ Usuário criado com sucesso!');
    console.log('');
    console.log('📋 Detalhes:');
    console.log(`   ID: ${user.id}`);
    console.log(`   CPF: ${cleanCPF}`);
    console.log(`   CPF Formatado: ${cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}`);
    console.log(`   Senha: ${password}`);
    console.log('');
    
  } catch (error) {
    console.error('❌ Erro ao criar usuário:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Processa argumentos da linha de comando
const args = process.argv.slice(2);

if (args.length !== 2) {
  console.log('');
  console.log('📖 Uso: npx ts-node scripts/create-user.ts <cpf> <senha>');
  console.log('');
  console.log('Exemplos:');
  console.log('  npx ts-node scripts/create-user.ts 12345678909 1234');
  console.log('  npx ts-node scripts/create-user.ts 123.456.789-09 minhasenha');
  console.log('');
  process.exit(1);
}

const [cpf, password] = args;
createUser(cpf, password);
