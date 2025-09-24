import React, { useState, useEffect } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  TouchableOpacity, 
  ScrollView,
  Image,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import NavBar from '../components/Navbar';
import Header from '../components/Header';
import { colors, fonts, spacing, borderRadius, shadows } from '../constants/theme';
import { getFontFamily } from '../hooks/useFontLoader';
import {
  performanceMetrics,
  monthlyChallenges,
  drivingTips,
  currentConditions,
  recentAchievements,
  topUsers
} from '../data/homeData';
// ========================================

export default function Home({ navigation }) {
  
  // ========================================
  // ESTADOS DO COMPONENTE
  // ========================================
  
  const [modalVisible, setModalVisible] = useState(false);
  const [tripInProgress, setTripInProgress] = useState(false);
  const [tripStartTime, setTripStartTime] = useState(null);
  const [tripDurationDisplay, setTripDurationDisplay] = useState('00:00');
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    date: '',
    time: '',
    distance: '',
    fuelType: 'Gasolina'
  });

  // Atualizar duração do percurso a cada minuto
  useEffect(() => {
    let interval;
    if (tripInProgress && tripStartTime) {
      interval = setInterval(() => {
        setTripDurationDisplay(formatTripDuration());
      }, 60000); // Atualiza a cada minuto
      
      // Atualização inicial
      setTripDurationDisplay(formatTripDuration());
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [tripInProgress, tripStartTime]);
  
  // ========================================
  // FUNÇÕES HELPER
  // ========================================
  
  const getGreeting = () => {
    return 'Bem-vindo de volta';
  };

  const getGreetingMessage = () => {
    const hour = new Date().getHours();
    if (hour < 6) return 'Que tal começar o dia com uma direção eficiente?';
    if (hour < 12) return 'Pronto para uma condução inteligente?';
    if (hour < 18) return 'Vamos continuar economizando combustível?';
    if (hour < 22) return 'Finalizando o dia com direção responsável?';
    return 'Dirija com segurança na madrugada!';
  };

  const getUserName = () => {
    return 'João'; // Mock - em produção viria do contexto/estado global
  };

  // ========================================
  // FUNÇÕES DO PERCURSO
  // ========================================

  const startTrip = () => {
    const startTime = new Date();
    setTripInProgress(true);
    setTripStartTime(startTime);
    setTripDurationDisplay('00:00');
    // Aqui iniciaria a conexão Bluetooth
    Alert.alert(
      'Percurso Iniciado',
      'Conexão Bluetooth ativada. Boa viagem!',
      [{ text: 'OK' }]
    );
  };

  const endTrip = () => {
    Alert.alert(
      'Encerrar Percurso',
      'Deseja realmente encerrar o percurso em andamento?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Encerrar',
          style: 'destructive',
          onPress: () => {
            setTripInProgress(false);
            setTripStartTime(null);
            setTripDurationDisplay('00:00');
            // Aqui salvaria os dados e desligaria o Bluetooth
            Alert.alert(
              'Percurso Encerrado',
              'Dados salvos com sucesso. Conexão Bluetooth desativada.',
              [{ text: 'OK' }]
            );
          }
        }
      ]
    );
  };

  const formatTripDuration = () => {
    if (!tripStartTime) return '00:00';
    const now = new Date();
    const diff = now - tripStartTime;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  // ========================================
  // FUNÇÕES DO MODAL
  // ========================================
  
  const openAddTripModal = () => {
    setModalVisible(true);
  };

  const closeAddTripModal = () => {
    setModalVisible(false);
    // Limpar formulário ao fechar
    setFormData({
      origin: '',
      destination: '',
      date: '',
      time: '',
      distance: '',
      fuelType: 'Gasolina'
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateAndSubmit = () => {
    // Validação dos campos obrigatórios
    if (!formData.date || !formData.time) {
      Alert.alert(
        'Campos Obrigatórios', 
        'Por favor, preencha a data e horário do percurso.'
      );
      return;
    }

    // Validação adicional de formato de data (opcional)
    if (formData.date && !/^\d{2}\/\d{2}\/\d{4}$/.test(formData.date)) {
      Alert.alert(
        'Data Inválida', 
        'Por favor, use o formato DD/MM/AAAA para a data.'
      );
      return;
    }

    // Validação adicional de formato de horário (opcional)
    if (formData.time && !/^\d{2}:\d{2}$/.test(formData.time)) {
      Alert.alert(
        'Horário Inválido', 
        'Por favor, use o formato HH:MM para o horário.'
      );
      return;
    }

    // Simular salvamento do percurso
    Alert.alert(
      'Percurso Adicionado!', 
      `Percurso de ${formData.origin || 'Origem'} para ${formData.destination || 'Destino'} em ${formData.date} às ${formData.time} foi salvo com sucesso.`,
      [{ text: 'OK', onPress: closeAddTripModal }]
    );
  };

  // ========================================
  // FUNÇÕES DE RENDERIZAÇÃO MODERNAS
  // ========================================
  
  /**
   * CARD DE DESAFIO MENSAL
   */
  const renderChallenge = (challenge) => (
    <View key={challenge.id} style={[styles.challengeCard, challenge.completed && styles.challengeCompleted]}>
      <View style={styles.challengeHeader}>
        <View style={[styles.challengeIcon, { backgroundColor: challenge.color + '20' }]}>
          <Ionicons name={challenge.icon} size={20} color={challenge.color} />
        </View>
        <View style={styles.challengeInfo}>
          <Text style={styles.challengeTitle}>{challenge.title}</Text>
          <Text style={styles.challengeDescription}>{challenge.description}</Text>
        </View>
        {challenge.completed && (
          <View style={styles.completedBadge}>
            <Ionicons name="checkmark" size={16} color={colors.surface} />
          </View>
        )}
      </View>
      
      <View style={styles.challengeProgress}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${(challenge.progress / challenge.target) * 100}%`,
                backgroundColor: challenge.color 
              }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {challenge.progress}/{challenge.target} • {challenge.points} pts
        </Text>
      </View>
    </View>
  );

  /**
   * CARD DE DICA DE CONDUÇÃO
   */
  const renderDrivingTip = (tip) => (
    <View key={tip.id} style={styles.tipCard}>
      <View style={styles.tipHeader}>
        <View style={styles.tipIcon}>
          <Ionicons name={tip.icon} size={20} color={colors.primary} />
        </View>
        <View style={styles.tipCategory}>
          <Text style={styles.tipCategoryText}>{tip.category}</Text>
        </View>
      </View>
      <Text style={styles.tipTitle}>{tip.title}</Text>
      <Text style={styles.tipDescription}>{tip.description}</Text>
    </View>
  );

  /**
   * WIDGET DE CONDIÇÕES ATUAIS
   */
  const renderConditionsWidget = () => (
    <View style={styles.conditionsWidget}>
      <Text style={styles.widgetTitle}>Condições Atuais</Text>
      
      <View style={styles.conditionsGrid}>
        {/* Clima */}
        <View style={styles.conditionItem}>
          <Ionicons 
            name={currentConditions.weather.condition === 'sunny' ? 'sunny' : 'cloudy'} 
            size={24} 
            color="#FFA726" 
          />
          <Text style={styles.conditionValue}>{currentConditions.weather.temperature}°C</Text>
          <Text style={styles.conditionLabel}>{currentConditions.weather.description}</Text>
        </View>

        {/* Etanol */}
        <View style={styles.conditionItem}>
          <Ionicons name="water" size={24} color="#66BB6A" />
          <Text style={styles.conditionValue}>R$ {currentConditions.ethanolPrice.price}</Text>
          <Text style={styles.conditionLabel}>{currentConditions.ethanolPrice.description}</Text>
        </View>

        {/* Combustível */}
        <View style={styles.conditionItem}>
          <Ionicons name="water" size={24} color="#66BB6A" />
          <Text style={styles.conditionValue}>R$ {currentConditions.fuelPrice.gasoline}</Text>
          <Text style={styles.conditionLabel}>Gasolina</Text>
        </View>
      </View>
    </View>
  );

  /**
   * CARD DE CONQUISTA RECENTE
   */
  const renderAchievement = (achievement) => (
    <View key={achievement.id} style={[styles.achievementCard, achievement.isNew && styles.newAchievement]}>
      <View style={[styles.achievementIcon, { backgroundColor: achievement.color + '20' }]}>
        <Ionicons name={achievement.icon} size={24} color={achievement.color} />
      </View>
      <View style={styles.achievementContent}>
        <View style={styles.achievementHeader}>
          <Text style={styles.achievementTitle}>{achievement.title}</Text>
          {achievement.isNew && (
            <View style={styles.newBadge}>
              <Text style={styles.newBadgeText}>NOVO</Text>
            </View>
          )}
        </View>
        <Text style={styles.achievementDescription}>{achievement.description}</Text>
      </View>
    </View>
  );

  /**
   * USUÁRIO DO TOP 3 (DESIGN SIMPLIFICADO)
   */
  const renderTopUser = (user) => (
    <View key={user.id} style={styles.topUserItem}>
      {/* Imagem PNG user_rankeado */}
      <Image 
        source={require('../assets/user_rankeado.png')}
        style={styles.rankingIcon}
      />
      <View style={styles.topUserInfo}>
        <Text style={styles.topUserName}>{user.name}</Text>
        <Text style={styles.topUserPoints}>{user.points.toLocaleString()} pts</Text>
      </View>
    </View>
  );

  // ========================================
  // MODAL DE ADICIONAR PERCURSO
  // ========================================
  
  const renderAddTripModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeAddTripModal}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header do Modal */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Adicionar Percurso</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={closeAddTripModal}
              >
                <Ionicons name="close" size={24} color={colors.text.secondary} />
              </TouchableOpacity>
            </View>

            {/* Campos do Formulário */}
            <View style={styles.formContainer}>
              
              {/* Origem */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Origem</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Ex: Casa, Trabalho, Shopping..."
                  placeholderTextColor={colors.text.placeholder}
                  value={formData.origin}
                  onChangeText={(value) => handleInputChange('origin', value)}
                />
              </View>

              {/* Destino */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Destino</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Ex: Trabalho, Casa, Faculdade..."
                  placeholderTextColor={colors.text.placeholder}
                  value={formData.destination}
                  onChangeText={(value) => handleInputChange('destination', value)}
                />
              </View>

              {/* Data (Obrigatório) */}
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, styles.requiredField]}>
                  Data *
                </Text>
                <TextInput
                  style={[styles.textInput, styles.requiredInput]}
                  placeholder="DD/MM/AAAA"
                  placeholderTextColor={colors.text.placeholder}
                  value={formData.date}
                  onChangeText={(value) => handleInputChange('date', value)}
                  maxLength={10}
                  keyboardType="numeric"
                />
              </View>

              {/* Horário (Obrigatório) */}
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, styles.requiredField]}>
                  Horário *
                </Text>
                <TextInput
                  style={[styles.textInput, styles.requiredInput]}
                  placeholder="HH:MM"
                  placeholderTextColor={colors.text.placeholder}
                  value={formData.time}
                  onChangeText={(value) => handleInputChange('time', value)}
                  maxLength={5}
                  keyboardType="numeric"
                />
              </View>

              {/* Distância */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Distância (km)</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Ex: 15.5"
                  placeholderTextColor={colors.text.placeholder}
                  value={formData.distance}
                  onChangeText={(value) => handleInputChange('distance', value)}
                  keyboardType="numeric"
                />
              </View>

              {/* Tipo de Combustível */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Tipo de Combustível</Text>
                <View style={styles.fuelTypeContainer}>
                  {['Gasolina', 'Etanol'].map((fuel) => (
                    <TouchableOpacity
                      key={fuel}
                      style={[
                        styles.fuelTypeButton,
                        formData.fuelType === fuel && styles.fuelTypeButtonActive
                      ]}
                      onPress={() => handleInputChange('fuelType', fuel)}
                    >
                      <Text style={[
                        styles.fuelTypeText,
                        formData.fuelType === fuel && styles.fuelTypeTextActive
                      ]}>
                        {fuel}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Nota sobre campos obrigatórios */}
              <Text style={styles.requiredNote}>
                * Campos obrigatórios
              </Text>
            </View>

            {/* Botões de Ação */}
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={closeAddTripModal}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.saveButton}
                onPress={validateAndSubmit}
              >
                <LinearGradient
                  colors={[colors.secondary, '#45A049']}
                  style={styles.saveButtonGradient}
                >
                  <Text style={styles.saveButtonText}>Salvar Percurso</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  // ========================================
  // RENDERIZAÇÃO DA INTERFACE
  // ========================================
  
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* ========================================
            HEADER COM LOGO CENTRALIZADA
            ======================================== */}
        
        <Header />

        {/* ========================================
            SEÇÃO DE SAUDAÇÃO PERSONALIZADA
            ======================================== */}
        
        <View style={styles.greetingSection}>
          <Text style={styles.greetingTime}>{getGreeting()},</Text>
          <Text style={styles.greetingName}>{getUserName()}!</Text>
          <Text style={styles.greetingSubtitle}>{getGreetingMessage()}</Text>
        </View>

        {/* ========================================
            BOTÃO DE INICIAR/ENCERRAR PERCURSO
            ======================================== */}
        
        <View style={styles.tripControlSection}>
          {!tripInProgress ? (
            <TouchableOpacity 
              style={styles.startTripButton}
              onPress={startTrip}
            >
              <LinearGradient
                colors={['#4CAF50', '#45A049']}
                style={styles.startTripGradient}
              >
                <Ionicons name="play-circle" size={24} color={colors.surface} />
                <Text style={styles.startTripText}>Iniciar Percurso</Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <View style={styles.tripInProgressContainer}>
              <View style={styles.tripStatusCard}>
                <View style={styles.tripStatusHeader}>
                  <View style={styles.tripStatusIndicator}>
                    <View style={styles.pulsingDot} />
                  </View>
                  <Text style={styles.tripStatusTitle}>Percurso em Andamento</Text>
                  <Ionicons name="bluetooth" size={20} color={colors.primary} />
                </View>
                
                <Text style={styles.tripDuration}>Duração: {tripDurationDisplay}</Text>
                
                <TouchableOpacity 
                  style={styles.endTripButton}
                  onPress={endTrip}
                >
                  <Ionicons name="stop-circle" size={20} color={colors.error} />
                  <Text style={styles.endTripText}>Encerrar Percurso</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* ========================================
            WIDGET DE CONDIÇÕES ATUAIS
            ======================================== */}
        
        <View style={styles.conditionsSection}>
          {renderConditionsWidget()}
        </View>

        {/* ========================================
            IMPACTO AMBIENTAL
            ======================================== */}
        
        <View style={styles.statsSection}>
          {/* Destaque de Impacto Ambiental */}
          <View style={styles.impactHighlight}>
            <LinearGradient
              colors={['#4CAF50', '#45A049']}
              style={styles.impactGradient}
            >
              <View style={styles.impactContent}>
                <Ionicons name="earth" size={32} color="white" />
                <View style={styles.impactText}>
                  <Text style={styles.impactTitle}>Seu Impacto Ambiental</Text>
                  <Text style={styles.impactValue}>{performanceMetrics.co2Impact.current}kg CO₂ economizado</Text>
                  <View style={styles.impactChange}>
                    <Ionicons name="trending-up" size={14} color="white" />
                    <Text style={styles.impactChangeText}>+{performanceMetrics.co2Impact.change.toFixed(1)}% esta semana</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </View>
          
        </View>

        {/* ========================================
            DESAFIOS MENSAIS
            ======================================== */}
        
        <View style={styles.challengesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Desafios Mensais</Text>
          </View>
          <View style={styles.challengesList}>
            {monthlyChallenges.map(renderChallenge)}
          </View>
        </View>

        {/* ========================================
            CONQUISTAS RECENTES
            ======================================== */}
        
        <View style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>Conquistas Recentes</Text>
          <View style={styles.achievementsList}>
            {recentAchievements.map(renderAchievement)}
          </View>
        </View>

        {/* ========================================
            DICAS DE CONDUÇÃO
            ======================================== */}
        
        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>Dica do Dia</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.tipsScroll}
          >
            {drivingTips.map(renderDrivingTip)}
          </ScrollView>
        </View>

        
        {/* ========================================
            RANKING SIMPLIFICADO
            ======================================== */}

        <View style={styles.rankingSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top 3 do Mês</Text>
          </View>
          <View style={styles.topUsersList}>
            {topUsers.map(renderTopUser)}
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
      
      <NavBar />
      
      {/* Botão Flutuante Adicionar Percurso */}
      <TouchableOpacity 
        style={styles.floatingButton}
        onPress={openAddTripModal}
      >
        <LinearGradient
          colors={[colors.secondary, '#45A049']}
          style={styles.floatingButtonGradient}
        >
          <Ionicons name="add" size={28} color={colors.surface} />
        </LinearGradient>
      </TouchableOpacity>
      
      {/* Modal de Adicionar Percurso */}
      {renderAddTripModal()}
    </View>
  );
}

// ========================================
// ESTILOS DA TELA HOME REFORMULADA
// ========================================

const styles = StyleSheet.create({
  
  // LAYOUT PRINCIPAL
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  // SEÇÃO DE SAUDAÇÃO
  greetingSection: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    
    marginHorizontal: spacing.sm,
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
    
  },
  
  greetingTime: {
    fontSize: fonts.sizes.lg,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.primary,
  },
  
  greetingName: {
    fontSize: fonts.sizes.title,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  
  greetingSubtitle: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.secondary,
  },
  
  // SEÇÃO DE CONTROLE DO PERCURSO
  tripControlSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  
  startTripButton: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.medium,
  },
  
  startTripGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  
  startTripText: {
    fontSize: fonts.sizes.lg,
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
    color: colors.surface,
  },
  
  tripInProgressContainer: {
    marginHorizontal: spacing.xs,
  },
  
  tripStatusCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: colors.primary + '30',
    ...shadows.small,
  },
  
  tripStatusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  
  tripStatusIndicator: {
    position: 'relative',
  },
  
  pulsingDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
  },
  
  tripStatusTitle: {
    flex: 1,
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
    color: colors.text.primary,
  },
  
  tripDuration: {
    fontSize: fonts.sizes.xl,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.primary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  
  endTripButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.error,
    backgroundColor: colors.error + '10',
    gap: spacing.sm,
  },
  
  endTripText: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Medium'),
    color: colors.error,
  },
  
  // BOTÃO FLUTUANTE
  floatingButton: {
    position: 'absolute',
    bottom: 115, // Acima da navbar
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    ...shadows.large,
    elevation: 8, // Para Android
    zIndex: 1000,
  },
  
  floatingButtonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  
  // SEÇÕES GERAIS
  statsSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  
  recentTripsSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  
  rankingSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  
  sectionTitle: {
    fontSize: fonts.sizes.xl,
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
  
  sectionLink: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Medium'),
    color: colors.primary,
  },
  
  // CARDS DE ESTATÍSTICAS
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  
  statCard: {
    flex: 1,
    minWidth: 150,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderLeftWidth: 4,
    ...shadows.small,
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  
  statContent: {
    flex: 1,
  },
  
  statValue: {
    fontSize: fonts.sizes.lg,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.text.primary,
  },
  
  statTitle: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.secondary,
  },
  
  // PERCURSOS RECENTES
  recentTripsList: {
    gap: spacing.md,
  },
  
  tripCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.small,
  },
  
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  
  tripRoute: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: spacing.xs,
  },
  
  tripOrigin: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Medium'),
    color: colors.text.primary,
  },
  
  tripDestination: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Medium'),
    color: colors.text.primary,
  },
  
  tripDate: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.placeholder,
  },
  
  tripStats: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  
  tripStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  
  tripStatText: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Medium'),
    color: colors.text.secondary,
  },
  
  // RANKING SIMPLIFICADO
  topUsersList: {
    gap: spacing.sm,
  },
  
  topUserItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    ...shadows.small,
  },
  
  rankingIcon: {
    width: 50,
    height: 50,
    marginRight: spacing.md,
    resizeMode: 'contain',
  },
  
  topUserInfo: {
    flex: 1,
  },
  
  topUserName: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Medium'),
    color: colors.text.primary,
  },
  
  topUserPoints: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.secondary,
  },
  
  // ========================================
  // ESTILOS MODERNOS ADICIONAIS
  // ========================================
  
  statCardGradient: {
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  statSubtitle: {
    fontSize: fonts.sizes.xs,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.placeholder,
    marginTop: spacing.xs / 2,
  },
  
  // ESTILOS DO IMPACTO AMBIENTAL
  impactHighlight: {
    marginBottom: spacing.lg,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.medium,
  },
  
  impactGradient: {
    padding: spacing.lg,
  },
  
  impactContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  
  impactText: {
    flex: 1,
  },
  
  impactTitle: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
    color: 'white',
    marginBottom: spacing.xs,
  },
  
  impactValue: {
    fontSize: fonts.sizes.lg,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: 'white',
    marginBottom: spacing.xs,
  },
  
  impactChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs / 2,
  },
  
  impactChangeText: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Medium'),
    color: 'white',
    opacity: 0.9,
  },
  
  achievementsRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  
  achievementCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    ...shadows.small,
  },
  
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.round,
    backgroundColor: colors.background.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  
  achievementNumber: {
    fontSize: fonts.sizes.xl,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  
  achievementLabel: {
    fontSize: fonts.sizes.xs,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  
  achievementTrend: {
    fontSize: fonts.sizes.xs,
    fontFamily: getFontFamily('Poppins', 'Medium'),
    color: '#4CAF50',
    textAlign: 'center',
  },
  
  performanceSummary: {
    marginTop: spacing.xl,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.small,
  },
  
  summaryTitle: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  
  performanceGrid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  
  performanceCard: {
    flex: 1,
    backgroundColor: colors.background.light,
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  
  performanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.xs,
  },
  
  performanceLabel: {
    fontSize: fonts.sizes.xs,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.secondary,
  },
  
  performanceValue: {
    fontSize: fonts.sizes.lg,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  
  performanceChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs / 2,
  },
  
  performanceChangeText: {
    fontSize: fonts.sizes.xs,
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
  },
  
  // Widget de condições
  conditionsSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  
  conditionsWidget: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.small,
  },
  
  widgetTitle: {
    fontSize: fonts.sizes.lg,
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  
  conditionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  
  conditionItem: {
    alignItems: 'center',
    flex: 1,
  },
  
  conditionValue: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.text.primary,
    marginTop: spacing.xs,
  },
  
  conditionLabel: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.secondary,
    textAlign: 'center',
  },
  
  // Seção de desafios
  challengesSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  
  challengesList: {
    gap: spacing.md,
  },
  
  challengeCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.small,
  },
  
  challengeCompleted: {
    backgroundColor: '#F1F8E9',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  
  challengeIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  
  challengeInfo: {
    flex: 1,
  },
  
  challengeTitle: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
    color: colors.text.primary,
  },
  
  challengeDescription: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.secondary,
    marginTop: spacing.xs / 2,
  },
  
  completedBadge: {
    width: 24,
    height: 24,
    borderRadius: borderRadius.round,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  challengeProgress: {
    marginTop: spacing.sm,
  },
  
  progressBar: {
    height: 6,
    backgroundColor: colors.text.placeholder + '20',
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
    marginBottom: spacing.xs,
  },
  
  progressFill: {
    height: '100%',
    borderRadius: borderRadius.sm,
  },
  
  progressText: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Medium'),
    color: colors.text.secondary,
    textAlign: 'right',
  },
  
  // Seção de conquistas
  achievementsSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  
  achievementsList: {
    gap: spacing.sm,
  },
  
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.small,
  },
  
  newAchievement: {
    borderWidth: 2,
    borderColor: '#FFD700',
    backgroundColor: '#FFFBF0',
  },
  
  achievementIcon: {
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
  
  achievementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  achievementTitle: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
    color: colors.text.primary,
  },
  
  achievementDescription: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.secondary,
    marginTop: spacing.xs / 2,
  },
  
  newBadge: {
    backgroundColor: '#FF5722',
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xs / 2,
    borderRadius: borderRadius.sm,
  },
  
  newBadgeText: {
    fontSize: fonts.sizes.xs,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.surface,
  },
  
  // Seção de dicas
  tipsSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  
  tipsScroll: {
    marginTop: spacing.sm,
  },
  
  tipCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginRight: spacing.md,
    width: 280,
    ...shadows.small,
  },
  
  tipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  
  tipIcon: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  tipCategory: {
    backgroundColor: colors.secondary + '20',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: borderRadius.sm,
  },
  
  tipCategoryText: {
    fontSize: fonts.sizes.xs,
    fontFamily: getFontFamily('Poppins', 'Medium'),
    color: colors.secondary,
  },
  
  tipTitle: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  
  tipDescription: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.secondary,
    lineHeight: fonts.sizes.sm * 1.4,
  },

  // ========================================
  // ESTILOS DO MODAL
  // ========================================
  
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  modalContainer: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    margin: spacing.lg,
    maxHeight: '90%',
    width: '90%',
    ...shadows.large,
  },
  
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.text.placeholder + '20',
  },
  
  modalTitle: {
    fontSize: fonts.sizes.xl,
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
    color: colors.text.primary,
  },
  
  closeButton: {
    padding: spacing.xs,
  },
  
  formContainer: {
    padding: spacing.lg,
  },
  
  inputGroup: {
    marginBottom: spacing.lg,
  },
  
  inputLabel: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Medium'),
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  
  requiredField: {
    color: colors.primary,
  },
  
  textInput: {
    borderWidth: 1,
    borderColor: colors.text.placeholder + '30',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.primary,
    backgroundColor: colors.background,
  },
  
  requiredInput: {
    borderColor: colors.primary + '50',
    borderWidth: 2,
  },
  
  fuelTypeContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  
  fuelTypeButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.text.placeholder + '30',
    alignItems: 'center',
  },
  
  fuelTypeButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  
  fuelTypeText: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Medium'),
    color: colors.text.secondary,
  },
  
  fuelTypeTextActive: {
    color: colors.surface,
  },
  
  requiredNote: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.placeholder,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: spacing.md,
  },
  
  modalActions: {
    flexDirection: 'row',
    padding: spacing.lg,
    gap: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.text.placeholder + '20',
  },
  
  cancelButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.text.placeholder + '50',
    alignItems: 'center',
  },
  
  cancelButtonText: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Medium'),
    color: colors.text.secondary,
  },
  
  saveButton: {
    flex: 2,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  
  saveButtonGradient: {
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  
  saveButtonText: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
    color: colors.surface,
  },
});