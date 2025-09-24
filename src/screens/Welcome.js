import React from 'react';
import { 
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import { colors, fonts, spacing, borderRadius, shadows } from '../constants/theme';
import { getFontFamily } from '../hooks/useFontLoader';

export default function Welcome({ navigation }) {
  const goToLogin = () => {
    navigation.navigate('Login');
  };

  const goToRegister = () => {
    navigation.navigate('Cadastro');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.welcomeSection}>
          <Text style={styles.title}>Bem-vindo ao</Text>
          <Text style={styles.appName}>IntelliDriver</Text>
          <Text style={styles.subtitle}>
            Sua experiência de direção consciente começa aqui
          </Text>
        </View>

        <View style={styles.iconSection}>
          <Image
            source={require('../assets/icon.png')}
            style={styles.appIcon}
          />
        </View>

        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.primaryButton} onPress={goToLogin}>
            <Text style={styles.primaryButtonText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={goToRegister}>
            <Text style={styles.secondaryButtonText}>Criar Conta</Text>
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
    paddingTop: spacing.xl,
    justifyContent: 'space-between',
  },
  
  welcomeSection: {
    alignItems: 'center',
    marginTop: spacing.xxl,
  },

  title: {
    fontSize: fonts.sizes.xl,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.primary,
    textAlign: 'center',
  },

  appName: {
    fontSize: fonts.sizes.hero,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.logo,
    textAlign: 'center',
    marginBottom: spacing.md,
  },

  subtitle: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: spacing.lg,
  },
  
  iconSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  appIcon: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
  },
  
  buttonSection: {
    marginBottom: spacing.xxl,
    gap: spacing.md,
  },

  primaryButton: {
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