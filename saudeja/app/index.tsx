import React, { useState, useEffect } from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,Image,KeyboardAvoidingView,Platform,Alert,ActivityIndicator} from 'react-native';
import { router } from 'expo-router';
import { saveUserLogin, isUserLoggedIn, getUserCPF } from '../src/services/storage';
import { authenticateUser } from '../src/services/dataService';
import { formatCPF, validateCPF, validatePassword } from '../src/utils/validators';

const LoginScreen: React.FC = () => {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const loggedIn = await isUserLoggedIn();
      if (loggedIn) {
        const savedCPF = await getUserCPF();
        if (savedCPF) {
          router.replace('/map');
        }
      }
    } catch (error) {
      console.error('Erro ao verificar login:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCPFChange = (text: string) => {
    const formatted = formatCPF(text);
    setCpf(formatted);
  };

  const handleLogin = async () => {
    if (!validateCPF(cpf)) {
      Alert.alert('Erro', 'Por favor, insira um CPF válido.');
      return;
    }

    if (!validatePassword(senha)) {
      Alert.alert('Erro', 'Por favor, insira uma senha válida (mínimo 4 caracteres).');
      return;
    }

    const isAuthenticated = await authenticateUser(cpf, senha);

    if (isAuthenticated) {
      const saved = await saveUserLogin(cpf);
      if (saved) {
        router.replace('/map');
      } else {
        Alert.alert('Erro', 'Não foi possível salvar os dados de login.');
      }
    } else {
      Alert.alert('Erro', 'CPF ou senha inválidos.');
    }
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Esqueci Senha',
      'Entre em contato com a Secretaria Municipal de Saúde para recuperar sua senha.',
      [{ text: 'OK' }]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00A896" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <Image
          source={require('../assets/brasao.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Prefeitura de</Text>
        <Text style={styles.cityName}>Fortaleza</Text>
        <Text style={styles.subtitle}>Secretaria Municipal de Saúde</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Image
            source={require('../assets/user-icon.png')}
            style={styles.inputIcon}
            resizeMode="contain"
          />
          <TextInput
            style={styles.input}
            placeholder="CPF"
            placeholderTextColor="#999"
            value={cpf}
            onChangeText={handleCPFChange}
            keyboardType="numeric"
            maxLength={14}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image
            source={require('../assets/lock-icon.png')}
            style={styles.inputIcon}
            resizeMode="contain"
          />
          <TextInput
            style={styles.input}
            placeholder="SENHA"
            placeholderTextColor="#999"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Text style={styles.eyeText}>{showPassword ? '👁️' : '🔒'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>ACESSAR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotPassword} onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordText}>ESQUECI SENHA</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2C2C',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  header: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 15,
  },
  title: {
    fontSize: 16,
    color: '#333',
    fontWeight: '400',
  },
  cityName: {
    fontSize: 32,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#D6DBDE',
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    marginBottom: 20,
    paddingHorizontal: 20,
    height: 50,
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  eyeIcon: {
    padding: 5,
  },
  eyeText: {
    fontSize: 18,
  },
  button: {
    backgroundColor: '#00A896',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: 20,
  },
  forgotPasswordText: {
    color: '#FFFFFF',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
