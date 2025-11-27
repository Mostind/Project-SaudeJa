import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

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
  adapter,
});

async function main() {
  console.log('---- Iniciando seed do banco de dados ----');

  // Limpar dados existentes (opcional - cuidado em produção!)
  console.log('🗑️  Limpando dados existentes...');
  await prisma.healthPostVaccine.deleteMany();
  await prisma.vaccine.deleteMany();
  await prisma.healthPost.deleteMany();
  await prisma.user.deleteMany();

  // 1. Criar usuários de teste
  console.log('👤 Criando usuários de teste...');
  
  const users = [
    { cpf: '12345678909', password: '1234' },
    { cpf: '98765432100', password: 'senha123' },
    { cpf: '11122233344', password: 'admin' },
  ];

  for (const userData of users) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    await prisma.user.create({
      data: {
        cpf: userData.cpf,
        password: hashedPassword,
      },
    });
    console.log(`  OK - Usuário criado: CPF ${userData.cpf}`);
  }

  console.log('Criando vacinas...OK');

  const vaccines = [
    {
      name: 'HEPATITE B',
      description: 'Vacina contra Hepatite B',
      age_range: '0 a 49 anos',
      target_audience: 'Crianças, adolescentes e adultos não vacinados',
      prevented_diseases: 'Hepatite B, cirrose hepática e câncer de fígado',
      details:
        'A vacina contra hepatite B protege contra a infecção pelo vírus da hepatite B (HBV), que pode causar danos graves ao fígado. A vacinação é essencial para prevenir a transmissão do vírus, que pode ocorrer através do contato com sangue ou fluidos corporais infectados. O esquema vacinal completo consiste em três doses, sendo a primeira dose ao nascer, a segunda com 1 mês e a terceira com 6 meses de idade.',
    },
    {
      name: 'FEBRE AMARELA',
      description: 'Vacina contra Febre Amarela',
      age_range: '9 meses em diante',
      target_audience: 'Pessoas que vivem ou viajam para áreas de risco',
      prevented_diseases: 'Febre amarela',
      details:
        'A vacina contra febre amarela protege contra uma doença viral grave transmitida por mosquitos. A febre amarela pode causar sintomas como febre alta, dores musculares, náuseas e, em casos graves, insuficiência hepática e renal. A vacina é altamente eficaz e uma única dose confere proteção por toda a vida na maioria dos casos. É especialmente recomendada para pessoas que vivem ou viajam para áreas endêmicas.',
    },
    {
      name: 'TRÍPLICE VIRAL',
      description: 'Vacina contra Sarampo, Caxumba e Rubéola',
      age_range: '12 meses a 29 anos',
      target_audience: 'Crianças, adolescentes e adultos jovens',
      prevented_diseases: 'Sarampo, caxumba e rubéola',
      details:
        'A vacina tríplice viral protege contra três doenças virais: sarampo, caxumba e rubéola. O sarampo é altamente contagioso e pode causar complicações graves como pneumonia e encefalite. A caxumba pode causar meningite e inflamação dos testículos ou ovários. A rubéola é especialmente perigosa para gestantes, pois pode causar malformações congênitas no feto. O esquema vacinal consiste em duas doses, sendo a primeira aos 12 meses e a segunda aos 15 meses de idade.',
    },
    {
      name: 'PNEUMOCÓCICA',
      description: 'Vacina contra Pneumococo',
      age_range: '2 meses a 5 anos e idosos acima de 60 anos',
      target_audience: 'Crianças pequenas e idosos',
      prevented_diseases: 'Pneumonia, meningite, otite e sinusite causadas por pneumococo',
      details:
        'A vacina pneumocócica protege contra infecções causadas pela bactéria Streptococcus pneumoniae (pneumococo), que pode causar doenças graves como pneumonia, meningite, sepse e otite média. A vacina é especialmente importante para crianças pequenas e idosos, que têm maior risco de desenvolver complicações graves.',
    },
    {
      name: 'VARICELA',
      description: 'Vacina contra Catapora',
      age_range: '12 meses a 6 anos',
      target_audience: 'Crianças e adolescentes não vacinados',
      prevented_diseases: 'Varicela (catapora) e suas complicações',
      details:
        'A vacina contra varicela protege contra a catapora. Pode causar complicações graves como infecções bacterianas, pneumonia e encefalite.',
    },
    {
      name: 'SARAMPO',
      description: 'Vacina contra Sarampo',
      age_range: '6 meses a 29 anos',
      target_audience: 'Crianças, adolescentes e adultos jovens não vacinados',
      prevented_diseases: 'Sarampo e suas complicações',
      details:
        'A vacina contra sarampo protege contra uma das doenças mais contagiosas.',
    },
    {
      name: 'INFLUENZA',
      description: 'Vacina contra Gripe',
      age_range: 'Todas as idades',
      target_audience: 'Crianças, idosos, gestantes, profissionais de saúde e grupos de risco',
      prevented_diseases: 'Influenza (gripe) e suas complicações',
      details:
        'A vacina contra influenza protege contra os vírus da gripe que circulam a cada ano.',
    },
    {
      name: 'TÉTANO',
      description: 'Vacina contra Tétano',
      age_range: 'Todas as idades',
      target_audience: 'Toda a população',
      prevented_diseases: 'Tétano',
      details:
        'A vacina contra tétano protege contra contraturas musculares graves causadas pela toxina Clostridium tetani.',
    },
  ];

  const createdVaccines = [];

  for (const vaccine of vaccines) {
    const created = await prisma.vaccine.create({ data: vaccine });
    createdVaccines.push(created);
    console.log(` OK - Vacina criada: ${vaccine.name}`);
  }

  console.log('🏥 Criando postos de saúde...');

  const healthPosts = [
    {
      name: 'UAPS Oliveira Pombo',
      address: 'Rua Oliveira Pombo, 150 - Aldeota',
      latitude: -3.735,
      longitude: -38.51,
    },
    {
      name: 'UAPS Messejana',
      address: 'Rua São José, 789 - Messejana',
      latitude: -3.83,
      longitude: -38.49,
    },
    {
      name: 'UAPS Barra do Ceará',
      address: 'Av. Presidente Castelo Branco - Barra do Ceará',
      latitude: -3.695,
      longitude: -38.58,
    },
    {
      name: 'UAPS Parangaba',
      address: 'Rua Betel, 1677 - Parangaba',
      latitude: -3.775,
      longitude: -38.565,
    },
    {
      name: 'UAPS Maraponga',
      address: 'Rua Coronel Jucá - Maraponga',
      latitude: -3.79,
      longitude: -38.57,
    },
    {
      name: 'UAPS Mondubim',
      address: 'Rua Irmã Bazet, 531 - Mondubim',
      latitude: -3.81,
      longitude: -38.59,
    },
    {
      name: 'UAPS José Walter',
      address: 'Rua 16 - José Walter',
      latitude: -3.82,
      longitude: -38.53,
    },
    {
      name: 'UAPS Conjunto Ceará',
      address: 'Rua 510 - Conjunto Ceará',
      latitude: -3.78,
      longitude: -38.61,
    },
    {
      name: 'UAPS Bom Jardim',
      address: 'Rua Coronel Estevão, 500 - Bom Jardim',
      latitude: -3.795,
      longitude: -38.6,
    },
    {
      name: 'UAPS Jangurussu',
      address: 'Rua Castelo de Castro, 2391 - Jangurussu',
      latitude: -3.835,
      longitude: -38.52,
    },
    {
      name: 'UAPS Centro',
      address: 'Rua Barão do Rio Branco - Centro',
      latitude: -3.7319,
      longitude: -38.5267,
    },
    {
      name: 'UAPS Praia de Iracema',
      address: 'Rua dos Tabajaras - Praia de Iracema',
      latitude: -3.72,
      longitude: -38.515,
    },
  ];

  const createdPosts = [];

  for (const post of healthPosts) {
    const created = await prisma.healthPost.create({ data: post });
    createdPosts.push(created);
    console.log(`  OK - Posto criado: ${post.name}`);
  }

  console.log('🔗 Associando vacinas aos postos de saúde...');
  
  const postVaccineAssociations = [
    { postId: 1, vaccineIds: [1, 2, 3, 4, 5, 6, 7, 8] },
    { postId: 2, vaccineIds: [1, 2, 3, 4, 6, 7, 8] },
    { postId: 3, vaccineIds: [1, 2, 4, 5, 6, 7, 8] },
    { postId: 4, vaccineIds: [1, 2, 3, 5, 7, 8] },
    { postId: 5, vaccineIds: [1, 3, 4, 5, 6, 7, 8] },
    { postId: 6, vaccineIds: [1, 2, 3, 4, 7, 8] },
    { postId: 7, vaccineIds: [1, 2, 5, 6, 7, 8] },
    { postId: 8, vaccineIds: [1, 3, 4, 5, 6, 7, 8] },
    { postId: 9, vaccineIds: [1, 2, 3, 6, 7, 8] },
    { postId: 10, vaccineIds: [1, 2, 4, 5, 7, 8] },
    { postId: 11, vaccineIds: [1, 2, 3, 4, 5, 6, 7, 8] },
    { postId: 12, vaccineIds: [1, 3, 5, 6, 7, 8] },
  ];

  for (const association of postVaccineAssociations) {
    const post = createdPosts[association.postId - 1]; 

    for (const vaccineId of association.vaccineIds) {
      const vaccine = createdVaccines[vaccineId - 1];

      await prisma.healthPostVaccine.create({
        data: {
          health_post_id: post.id,
          vaccine_id: vaccine.id,
          available: true,
        },
      });
    }

    console.log(`  OK - Vacinas associadas ao posto: ${post.name}`);
  }

  console.log('\n✨ Seed concluído com sucesso!\n');
  console.log('📋 Resumo:');
  console.log(`   - ${users.length} usuários criados`);
  console.log(`   - ${vaccines.length} vacinas criadas`);
  console.log(`   - ${healthPosts.length} postos de saúde criados`);
  console.log('');
  console.log('🔑 Credenciais de teste:');
  console.log('   CPF: 123.456.789-09 | Senha: 1234');
  console.log('   CPF: 987.654.321-00 | Senha: senha123');
  console.log('   CPF: 111.222.333-44 | Senha: admin');
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });