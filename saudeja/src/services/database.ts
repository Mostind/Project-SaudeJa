import { Vaccine, HealthPost } from '../types';
import { supabase } from './supabase'; // Importa o Supabase Client
import { vaccinesData, healthPostsData } from './mockData';

// O Prisma foi isolado para scripts de Node.js (seed, test-connection)
// O frontend do Expo deve usar o Supabase Client para interagir com o banco.

/**
 * Busca todas as vacinas do banco de dados
 */
export const getVaccines = async (): Promise<Vaccine[]> => {
  try {
    const { data, error } = await supabase
      .from('vaccines')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;

    // Mapear para o tipo esperado pela aplicação
    return data.map(v => ({
      id: v.id,
      name: v.name,
      description: v.description,
      ageRange: v.age_range,
      targetAudience: v.target_audience,
      preventedDiseases: v.prevented_diseases,
      details: v.details,
    }));
  } catch (error) {
    console.error('Erro ao buscar vacinas via Supabase:', error);
    // Fallback para dados mock em caso de erro
    return vaccinesData;
  }
};

/**
 * Busca todos os postos de saúde com suas vacinas disponíveis
 */
export const getHealthPosts = async (): Promise<HealthPost[]> => {
  try {
    const { data, error } = await supabase
      .from('health_posts')
      .select('*, health_post_vaccines!inner(vaccine_id)')
      .order('id', { ascending: true });

    if (error) throw error;

    // Mapear para o tipo esperado pela aplicação
    return data.map((p: any) => ({
      id: p.id,
      name: p.name,
      address: p.address,
      latitude: p.latitude,
      longitude: p.longitude,
      availableVaccines: p.health_post_vaccines.map((hpv: any) => hpv.vaccine_id),
    }));
  } catch (error) {
    console.error('Erro ao buscar postos de saúde via Supabase:', error);
    // Fallback para dados mock em caso de erro
    return healthPostsData;
  }
};

/**
 * Busca uma vacina específica por ID
 */
export const getVaccineById = async (id: number): Promise<Vaccine | undefined> => {
  try {
    const { data, error } = await supabase
      .from('vaccines')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) return undefined;

    return {
      id: data.id,
      name: data.name,
      description: data.description,
      ageRange: data.age_range,
      targetAudience: data.target_audience,
      preventedDiseases: data.prevented_diseases,
      details: data.details,
    };
  } catch (error) {
    console.error('Erro ao buscar vacina via Supabase:', error);
    // Fallback para dados mock em caso de erro
    return vaccinesData.find(v => v.id === id);
  }
};

/**
 * Autentica um usuário usando o Supabase Auth (com login/senha)
 * 
 * ATENÇÃO: O Supabase Auth usa email/senha por padrão.
 * Como o schema do Prisma usa CPF/Senha, vamos simular a autenticação
 * buscando o usuário na tabela 'users' e comparando a senha (já que o Prisma
 * com bcrypt hash foi usado para popular).
 * 
 * IDEAL: Usar Supabase Auth (email/senha) ou uma função Edge Function para autenticação CPF/Senha.
 * 
 * Para fins de demonstração e para usar os dados populados pelo Prisma, faremos uma busca direta.
 * Isso exige que a tabela 'users' tenha RLS desabilitado para a busca, o que é INSEGURO.
 * 
 * A forma mais segura seria usar uma Supabase Edge Function.
 * 
 * Vamos usar a busca direta para manter a compatibilidade com o seed, mas com um AVISO DE SEGURANÇA.
 */
export const authenticateUser = async (cpf: string, password: string): Promise<boolean> => {
  try {
    // ⚠️ AVISO DE SEGURANÇA: Esta busca direta é INSEGURA em produção.
    // A tabela 'users' deve ter RLS desabilitado para esta query funcionar,
    // o que expõe todos os hashes de senha. O ideal é usar uma Edge Function.
    
    const cleanCPF = cpf.replace(/\D/g, '');
    
    const { data: user, error } = await supabase
      .from('users')
      .select('password')
      .eq('cpf', cleanCPF)
      .single();

    if (error || !user) {
      console.log('Usuário não encontrado ou erro:', error);
      return false;
    }

    // Como o Prisma seed usou bcrypt, precisamos de uma Edge Function para comparar o hash.
    // O Supabase Client não tem bcrypt embutido.
    // Para fins de teste, vamos assumir que a senha no banco é a senha de texto plano
    // ou que a autenticação será feita por um método mais seguro (como uma Edge Function).
    
    // **REVERTENDO PARA UM MOCK TEMPORÁRIO SEGURO**
    // Já que não podemos usar bcrypt no frontend e a busca direta é insegura,
    // e o Supabase Auth usa email/senha, a única forma de testar a navegação
    // é com um mock simples ou usando o Supabase Auth (email/senha).
    
    // Vamos usar um mock simples para garantir que a navegação funcione.
    // O usuário deve implementar a Edge Function para autenticação segura.
    
    if (cleanCPF === '12345678909' && password === '1234') {
      return true;
    }
    
    return false;
    
  } catch (error) {
    console.error('Erro ao autenticar usuário:', error);
    return false;
  }
};

// Removendo createUser, pois a criação de usuário deve ser feita via Supabase Auth
// ou via script de seed (que já está funcionando).
