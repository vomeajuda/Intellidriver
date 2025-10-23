import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing } from '../constants/theme';

export default function Header() {
  return (
    <LinearGradient
      colors={[colors.dark, colors.primary]}
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

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 0,
    paddingVertical: spacing.sm,
    width: '100%',
  },
  
  headerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  
  logoImage: {
    width: 100,
    height: 70,
  },
});