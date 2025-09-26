import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity, 
  ScrollView,
  Dimensions,
  FlatList
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import NavBar from '../components/Navbar';
import Header from '../components/Header';
import EcoCoinIcon from '../assets/ecocoin-icon';
import { colors, fonts, spacing, borderRadius, shadows } from '../constants/theme';
import { getFontFamily } from '../hooks/useFontLoader';
import userData from '../data/profileStatsData';

const { width } = Dimensions.get('window');

export default function ProfileStats() {
  const navigation = useNavigation();
  
  const StatCard = ({ icon, value, label, color = colors.primary, subtitle = null }) => (
    <View style={styles.statCard}>
      <LinearGradient
        colors={[color + '20', color + '05']}
        style={styles.statCardGradient}
      >
        <View style={[styles.statIcon, { backgroundColor: color + '15' }]}>
          <Ionicons name={icon} size={20} color={color} />
        </View>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
        {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
      </LinearGradient>
    </View>
  );

  const renderAchievement = ({ item: achievement }) => (
    <TouchableOpacity 
      style={[styles.achievementCard, !achievement.unlocked && styles.achievementLocked]}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={achievement.unlocked 
          ? [colors.primary + '15', colors.primary + '05'] 
          : [colors.text.placeholder + '10', colors.text.placeholder + '05']
        }
        style={styles.achievementGradient}
      >
        <View style={[
          styles.achievementIconContainer, 
          { backgroundColor: achievement.unlocked ? colors.primary : colors.text.placeholder }
        ]}>
          <Ionicons 
            name={achievement.icon} 
            size={24} 
            color={colors.surface} 
          />
        </View>
        <View style={styles.achievementContent}>
          <Text style={[
            styles.achievementTitle, 
            !achievement.unlocked && styles.achievementTitleLocked
          ]}>
            {achievement.title}
          </Text>
          <Text style={[
            styles.achievementDescription, 
            !achievement.unlocked && styles.achievementDescriptionLocked
          ]}>
            {achievement.description}
          </Text>
          <View style={styles.achievementMeta}>
            <Text style={styles.achievementCategory}>{achievement.category}</Text>
            {achievement.unlocked && achievement.earnedDate && (
              <Text style={styles.achievementDate}>Conquistado em {achievement.earnedDate}</Text>
            )}
          </View>
        </View>
        {achievement.unlocked && (
          <View style={styles.achievementBadge}>
            <Ionicons name="checkmark-circle" size={20} color={colors.success} />
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );

  // ========================================
  // RENDERIZAÇÃO DA INTERFACE REDESENHADA
  // ========================================
  
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* ========================================
            HEADER COM LOGO CENTRALIZADA
            ======================================== */}
        
        <Header />

        {/* ========================================
            SEÇÃO DO PERFIL PRINCIPAL
            ======================================== */}
        
        <LinearGradient
          colors={[colors.primary, '#45A049']}
          style={styles.profileHeader}
        >
          <View style={styles.profileSection}>
            <TouchableOpacity 
              style={styles.profileImageContainer}
              onPress={() => navigation.navigate('DadosPessoais')}
              activeOpacity={0.8}
            >
              {userData.profileImage ? (
                <Image
                  source={{ uri: userData.profileImage }}
                  style={styles.profileImage}
                />
              ) : (
                <View style={styles.profileImagePlaceholder}>
                  <Ionicons name="person" size={50} color="white" />
                </View>
              )}
              <View style={styles.editIndicator}>
                <Ionicons name="pencil" size={12} color={colors.surface} />
              </View>
            </TouchableOpacity>

            <View style={styles.userInfo}>
              <Text style={styles.userName}>{userData.name}</Text>
              <Text style={styles.userLevel}>{userData.level}</Text>
              <Text style={styles.memberSince}>Membro desde {userData.memberSince}</Text>
            </View>

            {/* EcoCoins Section */}
            <View style={styles.ecocoinsContainer}>
              <View style={styles.ecocoinIcon}>
                <EcoCoinIcon size={24} />
              </View>
              <Text style={styles.ecocoinsValue}>{userData.ecocoins.toLocaleString()}</Text>
              <Text style={styles.ecocoinsLabel}>EcoCoins</Text>
            </View>
          </View>
        </LinearGradient>

        {/* ========================================
            BOTÃO DE ACESSO A DADOS PESSOAIS
            ======================================== */}
        
        <View style={styles.accessSection}>
          <TouchableOpacity 
            style={styles.personalDataButton}
            onPress={() => navigation.navigate('DadosPessoais')}
          >
            <LinearGradient
              colors={[colors.secondary, '#45A049']}
              style={styles.personalDataGradient}
            >
              <Ionicons name="person-circle" size={24} color="white" />
              <View style={styles.personalDataText}>
                <Text style={styles.personalDataTitle}>Dados Pessoais</Text>
                <Text style={styles.personalDataSubtitle}>Editar informações do perfil</Text>
              </View>
              <Ionicons name="arrow-forward" size={20} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* ========================================
            ESTATÍSTICAS EXPANDIDAS
            ======================================== */}
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Suas Estatísticas</Text>
          
          <View style={styles.statsGrid}>
            <StatCard 
              icon="car" 
              value={userData.stats.totalTrips} 
              label="Viagens" 
              subtitle="Total realizadas com IntelliDriver"
              color={colors.primary}
            />
            <StatCard 
              icon="speedometer" 
              value={userData.stats.totalDistance} 
              label="Distância" 
              subtitle="Quilômetros percorridos"
              color="#2196F3"
            />
          </View>

          <View style={styles.statsGrid}>
            <StatCard 
              icon="leaf" 
              value={userData.stats.co2Saved} 
              label="CO² Economizado" 
              subtitle="Impacto ambiental"
              color="#4CAF50"
            />
            <StatCard 
              icon="water" 
              value={userData.stats.fuelSaved} 
              label="Combustível Poupado" 
              subtitle="Litros economizados"
              color="#FF9800"
            />
          </View>
        </View>

        {/* ========================================
            RANKING E PERFORMANCE
            ======================================== */}
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ranking e Performance</Text>
          
          <View style={styles.rankingCard}>
            <LinearGradient
              colors={['#FFD700', '#FFA000']}
              style={styles.rankingGradient}
            >
              <View style={styles.rankingContent}>
                <Ionicons name="trophy" size={32} color="white" />
                <View style={styles.rankingInfo}>
                  <Text style={styles.rankingPosition}>#{userData.stats.ranking}</Text>
                  <Text style={styles.rankingLabel}>Posição Global</Text>
                  <Text style={styles.rankingPoints}>{userData.stats.points} pontos</Text>
                </View>
              </View>
            </LinearGradient>
          </View>

          <TouchableOpacity 
            style={styles.performanceSummary}
            onPress={() => navigation.navigate('CarsAnalytics')}
          >
            <LinearGradient
              colors={[colors.accent, colors.secondary]}
              style={styles.performanceSummaryGradient}
            >
              <View style={styles.performanceSummaryHeader}>
                <Ionicons name="analytics" size={24} color={colors.dark} />
                <Text style={styles.performanceSummaryTitle}>Análise Detalhada</Text>
                <Ionicons name="arrow-forward" size={20} color={colors.dark} />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* ========================================
            TODAS AS CONQUISTAS
            ======================================== */}
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Todas as Conquistas</Text>
            <Text style={styles.achievementCount}>
              {userData.achievements.filter(a => a.unlocked).length} de {userData.achievements.length}
            </Text>
          </View>
          
          <FlatList
            data={userData.achievements}
            renderItem={renderAchievement}
            keyExtractor={(item) => item.id.toString()}
            numColumns={1}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.achievementsList}
          />
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
      
      <NavBar />
    </View>
  );
}

// ========================================
// ESTILOS DA TELA REDESENHADA - PROFILE STATS
// ========================================

const styles = StyleSheet.create({
  
  // LAYOUT PRINCIPAL
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  // HEADER DO PERFIL
  profileHeader: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    borderBottomLeftRadius: borderRadius.xl,
    borderBottomRightRadius: borderRadius.xl,
  },
  
  profileSection: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  
  profileImageContainer: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: borderRadius.round,
    borderWidth: 4,
    borderColor: 'white',
  },
  
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: borderRadius.round,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'white',
  },
  
  editIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: borderRadius.round,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  
  userInfo: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  
  userName: {
    fontSize: fonts.sizes.xl,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: 'white',
    marginBottom: spacing.xs,
  },
  
  userLevel: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
    color: 'white',
    opacity: 0.9,
  },
  
  memberSince: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: 'white',
    opacity: 0.8,
  },
  
  // ECOCOINS
  ecocoinsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    ...shadows.medium,
  },
  
  ecocoinIcon: {
    marginRight: spacing.sm,
  },
  
  ecocoinsValue: {
    fontSize: fonts.sizes.lg,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.text.primary,
    marginRight: spacing.xs,
  },
  
  ecocoinsLabel: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Medium'),
    color: colors.text.secondary,
  },
  
  // SEÇÃO DE ACESSO
  accessSection: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  
  personalDataButton: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.medium,
  },
  
  personalDataGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  
  personalDataText: {
    flex: 1,
    marginLeft: spacing.md,
  },
  
  personalDataTitle: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
    color: 'white',
  },
  
  personalDataSubtitle: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: 'white',
    opacity: 0.9,
  },
  
  // SEÇÕES GERAIS
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  
  sectionTitle: {
    fontSize: fonts.sizes.lg,
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
    color: colors.text.primary,
    marginBottom: spacing.lg,
  },
  
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  
  achievementCount: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Medium'),
    color: colors.primary,
  },
  
  // ESTATÍSTICAS
  statsGrid: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  
  statCard: {
    flex: 1,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.small,
  },
  
  statCardGradient: {
    padding: spacing.md,
    alignItems: 'center',
  },
  
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  
  statValue: {
    fontSize: fonts.sizes.lg,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  
  statLabel: {
    fontSize: fonts.sizes.xs,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.secondary,
    textAlign: 'center',
  },
  
  statSubtitle: {
    fontSize: fonts.sizes.xs,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.placeholder,
    textAlign: 'center',
    marginTop: spacing.xs / 2,
  },
  
  // RANKING
  rankingCard: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.medium,
    marginBottom: spacing.lg,
  },
  
  rankingGradient: {
    padding: spacing.lg,
  },
  
  rankingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  
  rankingInfo: {
    flex: 1,
  },
  
  rankingPosition: {
    fontSize: fonts.sizes.xxl,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: 'white',
  },
  
  rankingLabel: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: 'white',
    opacity: 0.9,
  },
  
  rankingPoints: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Medium'),
    color: 'white',
    opacity: 0.8,
  },
  
  // PERFORMANCE SUMMARY
  performanceSummary: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.medium,
  },
  
  performanceSummaryGradient: {
    padding: spacing.lg,
  },
  
  performanceSummaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  performanceSummaryTitle: {
    fontSize: fonts.sizes.lg,
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
    color: colors.dark,
    flex: 1,
    marginLeft: spacing.sm,
  },
  
  // CONQUISTAS
  achievementsList: {
    gap: spacing.md,
  },
  
  achievementCard: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.small,
    marginBottom: spacing.sm,
  },
  
  achievementLocked: {
    opacity: 0.6,
  },
  
  achievementGradient: {
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  achievementIconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  
  achievementContent: {
    flex: 1,
  },
  
  achievementTitle: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  
  achievementTitleLocked: {
    color: colors.text.placeholder,
  },
  
  achievementDescription: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  
  achievementDescriptionLocked: {
    color: colors.text.placeholder,
  },
  
  achievementMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  achievementCategory: {
    fontSize: fonts.sizes.xs,
    fontFamily: getFontFamily('Poppins', 'Medium'),
    color: colors.primary,
    backgroundColor: colors.primary + '15',
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xs / 2,
    borderRadius: borderRadius.sm,
  },
  
  achievementDate: {
    fontSize: fonts.sizes.xs,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.placeholder,
  },
  
  achievementBadge: {
    marginLeft: spacing.sm,
  },
});