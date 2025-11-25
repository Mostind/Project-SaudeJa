import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_CPF_KEY = '@saudeja_user_cpf';
const USER_LOGGED_KEY = '@saudeja_logged';

export const saveUserLogin = async (cpf: string): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(USER_CPF_KEY, cpf);
    await AsyncStorage.setItem(USER_LOGGED_KEY, 'true');
    return true;
  } catch (error) {
    console.error('Erro ao salvar login:', error);
    return false;
  }
};

export const isUserLoggedIn = async (): Promise<boolean> => {
  try {
    const logged = await AsyncStorage.getItem(USER_LOGGED_KEY);
    return logged === 'true';
  } catch (error) {
    console.error('Erro ao verificar login:', error);
    return false;
  }
};

export const getUserCPF = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(USER_CPF_KEY);
  } catch (error) {
    console.error('Erro ao obter CPF:', error);
    return null;
  }
};

export const logout = async (): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(USER_CPF_KEY);
    await AsyncStorage.removeItem(USER_LOGGED_KEY);
    return true;
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    return false;
  }
};
