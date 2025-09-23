// ========================================
// COMPONENTE HEADER REUTILIZÁVEL
// ========================================

/**
 * Header comum para todas as telas do aplicativo IntelliDriver
 * Contém a logo centralizada com gradiente de fundo
 */

import React from 'react';
import { 
  StyleSheet,
  View,
  Image,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, borderRadius } from '../constants/theme';

// ========================================
// COMPONENTE HEADER
// ========================================

export default function Header() {
  return (
    <LinearGradient
      colors={[colors.primary, colors.dark]}
      style={styles.headerContainer}
    >
      <View style={styles.headerContent}>
        <Image 
          source={require('../assets/logo.png')} 
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>
    </LinearGradient>
  );
}

// ========================================
// ESTILOS DO HEADER
// ========================================

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: spacing.lg + 8,
    paddingHorizontal: 0, // Remove padding horizontal para ocupar toda largura
    paddingBottom: spacing.sm,
    width: '100%', // Garante que ocupe toda a largura
  },
  
  headerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg, // Padding interno apenas para o conteúdo
  },
  
  logoImage: {
    width: 100,
    height: 70,
  },
});