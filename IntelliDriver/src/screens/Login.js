import React, { useState } from 'react';
import { 
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput
} from 'react-native';
import BackButton from '../components/BackButton';
import Header from '../components/Header';
import { colors, fonts, spacing, borderRadius, shadows } from '../constants/theme';
import { getFontFamily } from '../hooks/useFontLoader';

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Função de validação de credenciais mock
  const handleLogin = () => {
    const validUsername = 'rafa';
    const validPassword = '1234';

    if (username === validUsername && password === validPassword) {
      alert('Login bem-sucedido!');
      navigation.navigate('Home');
    } else {
      alert('Usuário ou senha inválidos.');
    }
  };

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.navigationHeader}>
        <BackButton />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>Acesse</Text>
        <Text style={styles.subtitle}>com nome de usuário e senha</Text>

        <Text style={styles.inputText}>Nome de Usuário</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Digite seu nome de usuário"
          placeholderTextColor={colors.text.placeholder}
        />

        <Text style={styles.inputText}>Senha</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Digite sua senha"
          placeholderTextColor={colors.text.placeholder}
          secureTextEntry
        />

        <View style={styles.forgotContainer}>
          <TouchableOpacity>
            <Text style={styles.forgot}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
            <Text style={styles.primaryButtonText}>Acessar</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Cadastro')}
          >
            <Text style={styles.secondaryButtonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  
  navigationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  title: {
    fontSize: fonts.sizes.hero,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginTop: spacing.xxl + spacing.md,
  },
  
  subtitle: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.secondary,
    marginBottom: spacing.xl,
  },
  
  inputText: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Montserrat', 'Medium'),
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  
  input: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.sm,
    padding: spacing.lg,
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.accent,
    ...shadows.small,
  },
  
  forgotContainer: {
    alignItems: 'flex-end',
    marginBottom: spacing.xl,
    marginTop: spacing.sm,
  },
  
  forgot: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Medium'),
    color: colors.primary,
  },
  
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  
  primaryButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    ...shadows.medium,
  },
  
  primaryButtonText: {
    color: colors.surface,
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
  },
  
  secondaryButton: {
    flex: 1,
    borderColor: colors.primary,
    borderWidth: 2,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  
  secondaryButtonText: {
    color: colors.primary,
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
  },
});
