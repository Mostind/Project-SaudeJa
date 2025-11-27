import { Vaccine, HealthPost } from '../types';
import bcrypt from 'bcryptjs';
import { supabase } from './supabaseClient'; 
import { vaccinesData, healthPostsData } from './mockData';


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

/*
  Busca todos os postos de saúde com suas vacinas disponíveis
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

export const authenticateUser = async (cpf: string, password: string): Promise<boolean> => {
  try {

    
    const cleanCPF = cpf.replace(/\D/g, '');
    
    const { data: user, error } = await supabase
      .from('users')
      .select('password')
      .eq('cpf', cleanCPF)
      .single() as unknown as { password: string } | null;

    if (error || !user) {
      console.log('Usuário não encontrado ou erro:', error);
      return false;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      return true;
    }

    console.log('Senha inválida para o CPF:', cleanCPF);
    return false;
    
  } catch (error) {
    console.error('Erro ao autenticar usuário:', error);
    return false;
  }
};

