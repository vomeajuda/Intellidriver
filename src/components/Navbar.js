import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Octicons from '@expo/vector-icons/Octicons';
import { colors, spacing, borderRadius, shadows } from '../constants/theme';

/**
 * Barra de navegação inferior fixa com 5 botões principais:
 * Histórico, Diagnóstico, Home, Atividade e Perfil
 */
export default function NavBar() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.iconWrapper} 
        onPress={() => navigation.navigate('Historico')}
      >
        <Octicons style={styles.item} size={28} name="history"/>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.iconWrapper} 
        onPress={() => navigation.navigate('CarsAnalytics')}
      >
        <Octicons style={styles.item} size={28} name="tools"/>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.iconWrapper} 
        onPress={() => navigation.navigate('Home')}
      >
        <Octicons style={styles.item} size={28} name="home"/>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.iconWrapper} 
        onPress={() => navigation.navigate('Activity')}
      >
        <Octicons style={styles.item} size={28} name="bell"/>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.iconWrapper} 
        onPress={() => navigation.navigate('ProfileStats')}
      >
        <Octicons style={styles.item} size={28} name="person"/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: spacing.lg,
    left: spacing.md,
    right: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
    ...shadows.large,
  },
  
  item: {   
    color: colors.primary
  },
  
  iconWrapper: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  
  // Para futuras implementações de estado ativo
  activeCircle: {
    backgroundColor: colors.secondary,
    padding: spacing.md,
    borderRadius: borderRadius.round,
    marginTop: -spacing.lg,
    ...shadows.medium,
  },
});