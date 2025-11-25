import { Vaccine, HealthPost } from '../types';
import prisma from './prismaClient';
import bcrypt from 'bcryptjs';

// Mock data (mantido para referência e seed)
export const vaccinesData: Vaccine[] = [
  {
    id: 1,
    name: 'HEPATITE B',
    description: 'Vacina contra Hepatite B',
    ageRange: '0 a 49 anos',
    targetAudience: 'Crianças, adolescentes e adultos não vacinados',
    preventedDiseases: 'Hepatite B, cirrose hepática e câncer de fígado',
    details: 'A vacina contra hepatite B protege contra a infecção pelo vírus da hepatite B (HBV), que pode causar danos graves ao fígado. A vacinação é essencial para prevenir a transmissão do vírus, que pode ocorrer através do contato com sangue ou fluidos corporais infectados. O esquema vacinal completo consiste em três doses, sendo a primeira dose ao nascer, a segunda com 1 mês e a terceira com 6 meses de idade.',
  },
  {
    id: 2,
    name: 'FEBRE AMARELA',
    description: 'Vacina contra Febre Amarela',
    ageRange: '9 meses em diante',
    targetAudience: 'Pessoas que vivem ou viajam para áreas de risco',
    preventedDiseases: 'Febre amarela',
    details: 'A vacina contra febre amarela protege contra uma doença viral grave transmitida por mosquitos. A febre amarela pode causar sintomas como febre alta, dores musculares, náuseas e, em casos graves, insuficiência hepática e renal. A vacina é altamente eficaz e uma única dose confere proteção por toda a vida na maioria dos casos. É especialmente recomendada para pessoas que vivem ou viajam para áreas endêmicas.',
  },
  {
    id: 3,
    name: 'TRÍPLICE VIRAL',
    description: 'Vacina contra Sarampo, Caxumba e Rubéola',
    ageRange: '12 meses a 29 anos',
    targetAudience: 'Crianças, adolescentes e adultos jovens',
    preventedDiseases: 'Sarampo, caxumba e rubéola',
    details: 'A vacina tríplice viral protege contra três doenças virais: sarampo, caxumba e rubéola. O sarampo é altamente contagioso e pode causar complicações graves como pneumonia e encefalite. A caxumba pode causar meningite e inflamação dos testículos ou ovários. A rubéola é especialmente perigosa para gestantes, pois pode causar malformações congênitas no feto. O esquema vacinal consiste em duas doses, sendo a primeira aos 12 meses e a segunda aos 15 meses de idade.',
  },
  {
    id: 4,
    name: 'PNEUMOCÓCICA',
    description: 'Vacina contra Pneumococo',
    ageRange: '2 meses a 5 anos e idosos acima de 60 anos',
    targetAudience: 'Crianças pequenas e idosos',
    preventedDiseases: 'Pneumonia, meningite, otite e sinusite causadas por pneumococo',
    details: 'A vacina pneumocócica protege contra infecções causadas pela bactéria Streptococcus pneumoniae (pneumococo), que pode causar doenças graves como pneumonia, meningite, sepse e otite média. A vacina é especialmente importante para crianças pequenas e idosos, que têm maior risco de desenvolver complicações graves. Existem diferentes tipos de vacinas pneumocócicas, incluindo a VPC10 e VPC13 para crianças e a VPP23 para idosos.',
  },
  {
    id: 5,
    name: 'VARICELA',
    description: 'Vacina contra Catapora',
    ageRange: '12 meses a 6 anos',
    targetAudience: 'Crianças e adolescentes não vacinados',
    preventedDiseases: 'Varicela (catapora) e suas complicações',
    details: 'A vacina contra varicela protege contra a catapora, uma doença altamente contagiosa causada pelo vírus varicela-zóster. Embora geralmente seja leve em crianças, a varicela pode causar complicações graves como infecções bacterianas da pele, pneumonia e encefalite. Em adultos, a doença tende a ser mais grave. A vacina também ajuda a prevenir o herpes-zóster (cobreiro) na vida adulta, que é causado pela reativação do mesmo vírus.',
  },
  {
    id: 6,
    name: 'SARAMPO',
    description: 'Vacina contra Sarampo',
    ageRange: '6 meses a 29 anos',
    targetAudience: 'Crianças, adolescentes e adultos jovens não vacinados',
    preventedDiseases: 'Sarampo e suas complicações',
    details: 'A vacina contra sarampo protege contra uma das doenças mais contagiosas que existem. O sarampo é causado por um vírus que se espalha facilmente pelo ar através de gotículas respiratórias. A doença pode causar febre alta, tosse, coriza, conjuntivite e manchas vermelhas na pele. As complicações podem incluir pneumonia, encefalite, convulsões e até morte, especialmente em crianças pequenas e pessoas com sistema imunológico comprometido.',
  },
  {
    id: 7,
    name: 'INFLUENZA',
    description: 'Vacina contra Gripe',
    ageRange: 'Todas as idades (campanhas anuais)',
    targetAudience: 'Crianças, idosos, gestantes, profissionais de saúde e grupos de risco',
    preventedDiseases: 'Influenza (gripe) e suas complicações',
    details: 'A vacina contra influenza protege contra os vírus da gripe que circulam a cada ano. A gripe é uma infecção respiratória aguda que pode causar febre alta, dores musculares, tosse, dor de garganta e fadiga. Em grupos de risco, como idosos, crianças pequenas, gestantes e pessoas com doenças crônicas, a gripe pode levar a complicações graves como pneumonia, hospitalização e morte. A vacina é atualizada anualmente para incluir as cepas mais prováveis de circular.',
  },
  {
    id: 8,
    name: 'TÉTANO',
    description: 'Vacina contra Tétano',
    ageRange: 'Todas as idades',
    targetAudience: 'Toda a população, especialmente após ferimentos',
    preventedDiseases: 'Tétano',
    details: 'A vacina contra tétano protege contra uma doença grave causada pela toxina produzida pela bactéria Clostridium tetani, que pode entrar no corpo através de ferimentos contaminados com terra, poeira ou fezes. O tétano causa contrações musculares dolorosas, especialmente na mandíbula e pescoço, e pode levar à morte por insuficiência respiratória. A vacina é geralmente administrada em combinação com outras vacinas (DTP, dT ou dTpa) e requer doses de reforço a cada 10 anos.',
  },
];

export const healthPostsData: HealthPost[] = [
  {
    id: 1,
    name: 'UAPS Oliveira Pombo',
    address: 'Rua Oliveira Pombo, 150 - Aldeota',
    latitude: -3.735,
    longitude: -38.51,
    availableVaccines: [1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    id: 2,
    name: 'UAPS Messejana',
    address: 'Rua São José, 789 - Messejana',
    latitude: -3.83,
    longitude: -38.49,
    availableVaccines: [1, 2, 3, 4, 6, 7, 8],
  },
  {
    id: 3,
    name: 'UAPS Barra do Ceará',
    address: 'Av. Presidente Castelo Branco - Barra do Ceará',
    latitude: -3.695,
    longitude: -38.58,
    availableVaccines: [1, 2, 4, 5, 6, 7, 8],
  },
  {
    id: 4,
    name: 'UAPS Parangaba',
    address: 'Rua Betel, 1677 - Parangaba',
    latitude: -3.775,
    longitude: -38.565,
    availableVaccines: [1, 2, 3, 5, 7, 8],
  },
  {
    id: 5,
    name: 'UAPS Maraponga',
    address: 'Rua Coronel Jucá - Maraponga',
    latitude: -3.79,
    longitude: -38.57,
    availableVaccines: [1, 3, 4, 5, 6, 7, 8],
  },
  {
    id: 6,
    name: 'UAPS Mondubim',
    address: 'Rua Irmã Bazet, 531 - Mondubim',
    latitude: -3.81,
    longitude: -38.59,
    availableVaccines: [1, 2, 3, 4, 7, 8],
  },
  {
    id: 7,
    name: 'UAPS José Walter',
    address: 'Rua 16 - José Walter',
    latitude: -3.82,
    longitude: -38.53,
    availableVaccines: [1, 2, 5, 6, 7, 8],
  },
  {
    id: 8,
    name: 'UAPS Conjunto Ceará',
    address: 'Rua 510 - Conjunto Ceará',
    latitude: -3.78,
    longitude: -38.61,
    availableVaccines: [1, 3, 4, 5, 6, 7, 8],
  },
  {
    id: 9,
    name: 'UAPS Bom Jardim',
    address: 'Rua Coronel Estevão, 500 - Bom Jardim',
    latitude: -3.795,
    longitude: -38.6,
    availableVaccines: [1, 2, 3, 6, 7, 8],
  },
  {
    id: 10,
    name: 'UAPS Jangurussu',
    address: 'Rua Castelo de Castro, 2391 - Jangurussu',
    latitude: -3.835,
    longitude: -38.52,
    availableVaccines: [1, 2, 4, 5, 7, 8],
  },
  {
    id: 11,
    name: 'UAPS Centro',
    address: 'Rua Barão do Rio Branco - Centro',
    latitude: -3.7319,
    longitude: -38.5267,
    availableVaccines: [1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    id: 12,
    name: 'UAPS Praia de Iracema',
    address: 'Rua dos Tabajaras - Praia de Iracema',
    latitude: -3.72,
    longitude: -38.515,
    availableVaccines: [1, 3, 5, 6, 7, 8],
  },
];

/**
 * Busca todas as vacinas do banco de dados
 */
export const getVaccines = async (): Promise<Vaccine[]> => {
  try {
    const vaccines = await prisma.vaccine.findMany({
      orderBy: { id: 'asc' },
    });
    
    // Mapear para o tipo esperado pela aplicação
    return vaccines.map(v => ({
      id: v.id,
      name: v.name,
      description: v.description,
      ageRange: v.age_range,
      targetAudience: v.target_audience,
      preventedDiseases: v.prevented_diseases,
      details: v.details,
    }));
  } catch (error) {
    console.error('Erro ao buscar vacinas:', error);
    // Fallback para dados mock em caso de erro
    return vaccinesData;
  }
};

/**
 * Busca todos os postos de saúde com suas vacinas disponíveis
 */
export const getHealthPosts = async (): Promise<HealthPost[]> => {
  try {
    const posts = await prisma.healthPost.findMany({
      include: {
        health_post_vaccines: {
          where: { available: true },
          select: { vaccine_id: true },
        },
      },
      orderBy: { id: 'asc' },
    });
    
    // Mapear para o tipo esperado pela aplicação
    return posts.map(p => ({
      id: p.id,
      name: p.name,
      address: p.address,
      latitude: p.latitude,
      longitude: p.longitude,
      availableVaccines: p.health_post_vaccines.map(hpv => hpv.vaccine_id),
    }));
  } catch (error) {
    console.error('Erro ao buscar postos de saúde:', error);
    // Fallback para dados mock em caso de erro
    return healthPostsData;
  }
};

/**
 * Busca uma vacina específica por ID
 */
export const getVaccineById = async (id: number): Promise<Vaccine | undefined> => {
  try {
    const vaccine = await prisma.vaccine.findUnique({
      where: { id },
    });
    
    if (!vaccine) return undefined;
    
    return {
      id: vaccine.id,
      name: vaccine.name,
      description: vaccine.description,
      ageRange: vaccine.age_range,
      targetAudience: vaccine.target_audience,
      preventedDiseases: vaccine.prevented_diseases,
      details: vaccine.details,
    };
  } catch (error) {
    console.error('Erro ao buscar vacina:', error);
    // Fallback para dados mock em caso de erro
    return vaccinesData.find(v => v.id === id);
  }
};

/**
 * Autentica um usuário verificando CPF e senha
 */
export const authenticateUser = async (cpf: string, password: string): Promise<boolean> => {
  try {
    // Remove formatação do CPF
    const cleanCPF = cpf.replace(/\D/g, '');
    
    // Busca usuário pelo CPF
    const user = await prisma.user.findUnique({
      where: { cpf: cleanCPF },
    });

    if (!user) {
      console.log('Usuário não encontrado');
      return false;
    }

    // Compara a senha usando bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      console.log('Senha inválida');
      return false;
    }

    console.log('Autenticação bem-sucedida');
    return true;
  } catch (error) {
    console.error('Erro ao autenticar usuário:', error);
    return false;
  }
};

/**
 * Cria um novo usuário com senha hasheada
 */
export const createUser = async (cpf: string, password: string): Promise<boolean> => {
  try {
    // Remove formatação do CPF
    const cleanCPF = cpf.replace(/\D/g, '');
    
    // Gera hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Cria usuário no banco
    await prisma.user.create({
      data: {
        cpf: cleanCPF,
        password: hashedPassword,
      },
    });
    
    console.log('Usuário criado com sucesso');
    return true;
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return false;
  }
};
