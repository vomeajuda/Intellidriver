import React, { useState, useEffect } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert
} from 'react-native';
import Header from '../components/Header';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import NavBar from '../components/Navbar';
import { colors, fonts, spacing, borderRadius, shadows } from '../constants/theme';
import { getFontFamily } from '../hooks/useFontLoader';
import { useBluetooth } from '../hooks/useBluetooth';
import { mockData } from '../data/carsAnalyticsData';

export default function CarsAnalytics({ navigation }) {
  
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [maintenanceModalVisible, setMaintenanceModalVisible] = useState(false);
  const [maintenanceFormData, setMaintenanceFormData] = useState({
    type: '',
    description: '',
    maintenanceDate: '',
    nextMaintenanceDate: '',
    priority: 'medium',
    notes: ''
  });
  
  const {
    bluetoothConnected,
    connecting,
    handleBluetoothConnection,
    connectionStatus,
    isDeviceReady
  } = useBluetooth();

  // Simula carregamento de dados de 1 segundo
  useEffect(() => {
    setTimeout(() => {
      setAnalyticsData(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  // Funções do modal de manutenção
  const openMaintenanceModal = () => {
    setMaintenanceModalVisible(true);
  };

  const closeMaintenanceModal = () => {
    setMaintenanceModalVisible(false);
    setMaintenanceFormData({
      type: '',
      description: '',
      maintenanceDate: '',
      nextMaintenanceDate: '',
      priority: 'medium',
      notes: ''
    });
  };

  const handleMaintenanceInputChange = (field, value) => {
    setMaintenanceFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateAndSubmitMaintenance = () => {
    if (!maintenanceFormData.type || !maintenanceFormData.maintenanceDate || !maintenanceFormData.nextMaintenanceDate) {
      Alert.alert(
        'Campos Obrigatórios',
        'Por favor, preencha todos os campos obrigatórios: tipo de manutenção, data da manutenção e próxima manutenção.'
      );
      return;
    }

    Alert.alert(
      'Manutenção Adicionada!',
      `Manutenção "${maintenanceFormData.type}" realizada em ${maintenanceFormData.maintenanceDate} foi cadastrada com sucesso.`,
      [{ text: 'OK', onPress: closeMaintenanceModal }]
    );
  };

  // Componente do cartão de saúde do veículo
  const HealthScoreCard = ({ score, status }) => {
    const getStatusColor = () => {
      if (score >= 80) return colors.success;
      if (score >= 60) return colors.warning;
      return colors.error;
    };

    return (
      <LinearGradient
        colors={[getStatusColor(), getStatusColor() + '80']}
        style={styles.healthCard}
      >
        <View style={styles.healthHeader}>
          <Ionicons 
            name="car-sport"
            size={32}
            color={colors.surface}
          />
          <Text style={styles.healthTitle}>Saúde do Veículo</Text>
        </View>
        
        <View style={styles.healthScore}>
          <Text style={styles.scoreValue}>{score}</Text>
          <Text style={styles.scoreLabel}>/100</Text>
        </View>
        
        <Text style={styles.statusText}>
          {status === 'OK' ? 'Excelente' :
           status === 'WARNING' ? 'Atenção Necessária' : 'Crítico'}
        </Text>
      </LinearGradient>
    );
  };

  // Componente do alerta de manutenção
  const MaintenanceAlert = ({ alert }) => {
    const getPriorityColor = () => {
      switch (alert.priority) {
        case 'high': return colors.error;
        case 'medium': return colors.warning;
        case 'low': return colors.accent;
        default: return colors.text.secondary;
      }
    };

    const getIcon = () => {
      switch (alert.type) {
        case 'oil_change': return 'water';
        case 'brake_pads': return 'hand-left';
        case 'air_filter': return 'leaf';
        case 'battery': return 'battery-charging';
        default: return 'construct';
      }
    };

    return (
      <View style={styles.alertCard}>
        <View style={[styles.alertPriority, { backgroundColor: getPriorityColor() }]} />
        
        <View style={[styles.alertIcon, { backgroundColor: getPriorityColor() + '20' }]}>
          <Ionicons 
            name={getIcon()}
            size={24}
            color={getPriorityColor()}
          />
        </View>
        
        <View style={styles.alertContent}>
          <Text style={styles.alertTitle}>{alert.title}</Text>
          <Text style={styles.alertDescription}>{alert.description}</Text>
          
          <View style={styles.alertFooter}>
            <Text style={styles.alertCost}>Custo: R$ {alert.estimatedCost}</Text>
            
            {alert.urgency === 'urgent' && (
              <View style={styles.urgentBadge}>
                <Text style={styles.urgentText}>URGENTE</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };

  // Componente do cartão de erro OBD-II
  const ErrorCard = ({ error }) => {
    const getSeverityColor = () => {
      switch (error.severity) {
        case 'high': return colors.error;
        case 'medium': return colors.warning;
        case 'low': return colors.accent;
        default: return colors.text.secondary;
      }
    };

    return (
      <View style={styles.errorCard}>
        <View style={styles.errorHeader}>
          <View style={[styles.errorCodeBadge, { backgroundColor: getSeverityColor() }]}>
            <Text style={styles.errorCodeText}>{error.code}</Text>
          </View>
          
          <View style={styles.errorInfo}>
            <Text style={styles.errorTitle}>{error.description}</Text>
            <Text style={styles.errorImpact}>{error.impact}</Text>
          </View>
        </View>
        
        <Text style={styles.errorAction}>💡 {error.recommendedAction}</Text>
        
        <View style={styles.errorFooter}>
          <Text style={styles.errorCost}>Reparo: R$ {error.estimatedRepairCost}</Text>
          <Text style={styles.errorDate}>Detectado: {error.detected}</Text>
        </View>
      </View>
    );
  };

  // Componente de leitura básica OBD-II
  const BasicReading = ({ icon, label, value, unit, status = 'normal' }) => {
    const getStatusColor = () => {
      switch (status) {
        case 'warning': return colors.warning;
        case 'error': return colors.error;
        case 'good': return colors.success;
        default: return colors.primary;
      }
    };

    return (
      <View style={styles.readingCard}>
        <View style={[styles.readingIcon, { backgroundColor: getStatusColor() + '20' }]}>
          <Ionicons 
            name={icon}
            size={20}
            color={getStatusColor()}
          />
        </View>
        
        <Text style={styles.readingLabel}>{label}</Text>
        
        <View style={styles.readingValue}>
          <Text style={[styles.readingNumber, { color: getStatusColor() }]}>
            {value}
          </Text>
          
          {unit && (
            <Text style={styles.readingUnit}>{unit}</Text>
          )}
        </View>
      </View>
    );
  };

  if (loading || !analyticsData) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Diagnóstico do Carro</Text>
        
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando diagnóstico...</Text>
        </View>
        
        <NavBar />
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <Header />
      
      <View style={styles.container}>
      <Text style={styles.title}>Diagnóstico do Carro</Text>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        
        {/* Botão de conexão Bluetooth */}
        <View style={styles.bluetoothContainer}>
          <TouchableOpacity 
            style={[
              styles.bluetoothButton,
              bluetoothConnected ?
                styles.bluetoothConnected :
                styles.bluetoothDisconnected
            ]}
            onPress={handleBluetoothConnection}
            disabled={connecting}
          >
            <Ionicons 
              name={bluetoothConnected ? "bluetooth" : "bluetooth-outline"} 
              size={20} 
              color={bluetoothConnected ? colors.surface : colors.primary} 
            />
            
            <Text style={[
              styles.bluetoothText,
              bluetoothConnected ?
                styles.bluetoothTextConnected :
                styles.bluetoothTextDisconnected
            ]}>
              {connectionStatus}
            </Text>
            
            {bluetoothConnected && (
              <View style={styles.statusIndicator} />
            )}
          </TouchableOpacity>
        </View>
        
        {/* Seção: Saúde geral do veículo */}
        <View style={styles.section}>
          <HealthScoreCard 
            score={analyticsData?.vehicleHealth?.healthScore || 0}
            status={analyticsData?.vehicleHealth?.overallStatus || 'OK'}
          />
          
          <View style={styles.healthInfo}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Última Manutenção</Text>
              <Text style={styles.infoValue}>{analyticsData?.vehicleHealth?.lastMaintenance || 'N/A'}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Próxima Manutenção</Text>
              <Text style={styles.infoValue}>{analyticsData?.vehicleHealth?.nextMaintenance || 'N/A'}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Quilometragem</Text>
              <Text style={styles.infoValue}>
                {analyticsData?.vehicleHealth?.mileage?.toLocaleString() || '0'} km
              </Text>
            </View>
          </View>

          {/* Botão Adicionar Manutenção */}
          <TouchableOpacity 
            style={styles.addMaintenanceButton}
            onPress={openMaintenanceModal}
          >
            <View style={styles.addButtonContent}>
              <Ionicons name="add-circle" size={24} color={colors.primary} />
              <Text style={styles.addButtonText}>Adicionar Manutenção</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Seção: Alertas de manutenção */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🚨 Manutenção Necessária</Text>
          
          {(analyticsData?.maintenanceAlerts || []).map((alert) => (
            <MaintenanceAlert 
              key={alert.id}
              alert={alert}
            />
          ))}
        </View>

        {/* Seção: Erros encontrados (condicional) */}
        {(analyticsData?.activeErrors?.length || 0) > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>⚠️ Erros Detectados (OBD-II)</Text>
            
            {(analyticsData?.activeErrors || []).map((error, index) => (
              <ErrorCard 
                key={index}
                error={error}
              />
            ))}
          </View>
        )}

        {/* Seção: Leituras básicas OBD-II */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Leituras Básicas OBD-II</Text>
          
          <View style={styles.readingsGrid}>
            <BasicReading
              icon="speedometer"
              label="RPM"
              value={analyticsData?.basicReadings?.engine?.rpm || 0}
              unit="rpm"
              status="normal"
            />
            
            <BasicReading
              icon="thermometer"
              label="Temp. Motor"
              value={analyticsData?.basicReadings?.engine?.coolantTemp || 0}
              unit="°C"
              status={
                (analyticsData?.basicReadings?.engine?.coolantTemp || 0) > 95 ? 
                'warning' : 'normal'
              }
            />
            
            <BasicReading
              icon="water"
              label="Temp. Óleo"
              value={analyticsData?.basicReadings?.engine?.oilTemp || 0}
              unit="°C"
              status={
                (analyticsData?.basicReadings?.engine?.oilTemp || 0) > 100 ? 
                'warning' : 'normal'
              }
            />
            
            <BasicReading
              icon="pulse"
              label="Carga Motor"
              value={analyticsData?.basicReadings?.engine?.engineLoad || 0}
              unit="%"
              status="normal"
            />
            
            <BasicReading
              icon="car"
              label="Combustível"
              value={analyticsData?.basicReadings?.fuel?.level || 0}
              unit="%"
              status={
                (analyticsData?.basicReadings?.fuel?.level || 0) < 20 ? 
                'warning' : 'normal'
              }
            />
            
            <BasicReading
              icon="battery-charging"
              label="Bateria"
              value={analyticsData?.basicReadings?.electrical?.batteryVoltage || 0}
              unit="V"
              status={
                (analyticsData?.basicReadings?.electrical?.batteryVoltage || 0) < 12.0 ? 
                'error' : 'normal'
              }
            />
            
            <BasicReading
              icon="flash"
              label="Alternador"
              value={analyticsData?.basicReadings?.electrical?.alternatorOutput || 0}
              unit="V"
              status="normal"
            />
            
            <BasicReading
              icon="leaf"
              label="Lambda 1"
              value={analyticsData?.basicReadings?.emissions?.lambdaSensor1 || 0}
              unit="λ"
              status={
                Math.abs((analyticsData?.basicReadings?.emissions?.lambdaSensor1 || 1.0) - 1.0) > 0.1 ? 
                'warning' : 'good'
              }
            />
          </View>
        </View>

        {/* Seção: Próximas manutenções programadas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📅 Próximas Manutenções</Text>
          
          <View style={styles.scheduledContainer}>
            {(analyticsData?.scheduledMaintenance || []).map((item, index) => (
              <View key={index} style={styles.scheduledItem}>
                <View style={styles.scheduledInfo}>
                  <Text style={styles.scheduledTitle}>{item?.item || 'Manutenção'}</Text>
                  <Text style={styles.scheduledDetails}>
                    {item?.km?.toLocaleString() || '0'} km • {item?.daysRemaining || '0'} dias
                  </Text>
                </View>
                
                <Text style={styles.scheduledCost}>R$ {item?.cost || '0'}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <NavBar />
      </View>

      {/* Modal de Adicionar Manutenção */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={maintenanceModalVisible}
        onRequestClose={closeMaintenanceModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              
              {/* Header do Modal */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Nova Manutenção</Text>
                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={closeMaintenanceModal}
                >
                  <Ionicons name="close" size={24} color={colors.text.secondary} />
                </TouchableOpacity>
              </View>

              {/* Formulário */}
              <View style={styles.formContainer}>
                
                {/* Tipo de Manutenção */}
                <View style={styles.inputGroup}>
                  <Text style={[styles.inputLabel, styles.requiredField]}>Tipo de Manutenção *</Text>
                  <TextInput
                    style={[styles.textInput, styles.requiredInput]}
                    placeholder="Ex: Troca de óleo, Pastilhas de freio..."
                    placeholderTextColor={colors.text.placeholder}
                    value={maintenanceFormData.type}
                    onChangeText={(value) => handleMaintenanceInputChange('type', value)}
                  />
                </View>

                {/* Descrição */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Descrição</Text>
                  <TextInput
                    style={[styles.textInput, { height: 80 }]}
                    placeholder="Descreva os detalhes da manutenção..."
                    placeholderTextColor={colors.text.placeholder}
                    value={maintenanceFormData.description}
                    onChangeText={(value) => handleMaintenanceInputChange('description', value)}
                    multiline={true}
                    textAlignVertical="top"
                  />
                </View>

                {/* Data da Manutenção */}
                <View style={styles.inputGroup}>
                  <Text style={[styles.inputLabel, styles.requiredField]}>Data da Manutenção *</Text>
                  <TextInput
                    style={[styles.textInput, styles.requiredInput]}
                    placeholder="DD/MM/AAAA"
                    placeholderTextColor={colors.text.placeholder}
                    value={maintenanceFormData.maintenanceDate}
                    onChangeText={(value) => handleMaintenanceInputChange('maintenanceDate', value)}
                    maxLength={10}
                    keyboardType="numeric"
                  />
                </View>

                {/* Próxima Manutenção */}
                <View style={styles.inputGroup}>
                  <Text style={[styles.inputLabel, styles.requiredField]}>Próxima Manutenção *</Text>
                  <TextInput
                    style={[styles.textInput, styles.requiredInput]}
                    placeholder="DD/MM/AAAA"
                    placeholderTextColor={colors.text.placeholder}
                    value={maintenanceFormData.nextMaintenanceDate}
                    onChangeText={(value) => handleMaintenanceInputChange('nextMaintenanceDate', value)}
                    maxLength={10}
                    keyboardType="numeric"
                  />
                </View>

                {/* Prioridade */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Prioridade</Text>
                  <View style={styles.priorityContainer}>
                    {['low', 'medium', 'high'].map((priority) => (
                      <TouchableOpacity
                        key={priority}
                        style={[
                          styles.priorityButton,
                          maintenanceFormData.priority === priority && styles.priorityButtonActive
                        ]}
                        onPress={() => handleMaintenanceInputChange('priority', priority)}
                      >
                        <Text style={[
                          styles.priorityText,
                          maintenanceFormData.priority === priority && styles.priorityTextActive
                        ]}>
                          {priority === 'low' ? 'Baixa' : priority === 'medium' ? 'Média' : 'Alta'}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {/* Observações */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Observações</Text>
                  <TextInput
                    style={[styles.textInput, { height: 80 }]}
                    placeholder="Observações adicionais..."
                    placeholderTextColor={colors.text.placeholder}
                    value={maintenanceFormData.notes}
                    onChangeText={(value) => handleMaintenanceInputChange('notes', value)}
                    multiline={true}
                    textAlignVertical="top"
                  />
                </View>

                <Text style={styles.requiredNote}>* Campos obrigatórios</Text>
              </View>

              {/* Botões de Ação */}
              <View style={styles.modalActions}>
                <TouchableOpacity 
                  style={styles.cancelButton}
                  onPress={closeMaintenanceModal}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.saveButton}
                  onPress={validateAndSubmitMaintenance}
                >
                  <LinearGradient
                    colors={['#4CAF50', '#45A049']}
                    style={styles.saveButtonGradient}
                  >
                    <Text style={styles.saveButtonText}>Salvar Manutenção</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  // Estilos gerais
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginTop: 16,
    marginBottom: 20,
    paddingHorizontal: spacing.lg,
  },
  
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  loadingText: {
    fontSize: fonts.sizes.md,
    fontWeight: '400',
    color: colors.text.secondary,
  },
  
  section: {
    marginBottom: spacing.xl,
  },
  
  sectionTitle: {
    fontSize: fonts.sizes.xl,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  
  // Estilos do cartão de saúde
  healthCard: {
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.medium,
  },
  
  healthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  
  healthTitle: {
    fontSize: fonts.sizes.xl,
    fontWeight: 'bold',
    color: colors.surface,
    marginLeft: spacing.md,
  },
  
  healthScore: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  
  scoreValue: {
    fontSize: fonts.sizes.hero,
    fontWeight: 'bold',
    color: colors.surface,
  },
  
  scoreLabel: {
    fontSize: fonts.sizes.xl,
    fontWeight: '400',
    color: colors.surface,
    opacity: 0.8,
  },
  
  statusText: {
    fontSize: fonts.sizes.lg,
    fontWeight: '500',
    color: colors.surface,
    textAlign: 'center',
  },
  
  healthInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    ...shadows.small,
  },
  
  infoItem: {
    alignItems: 'center',
    flex: 1,
  },
  
  infoLabel: {
    fontSize: fonts.sizes.xs,
    fontFamily: getFontFamily('Poppins', 'Medium'),
    color: colors.text.secondary,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  
  infoValue: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.text.primary,
    textAlign: 'center',
  },

  // Estilos dos alertas de manutenção
  alertCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.small,
  },
  
  alertPriority: {
    width: 4,
    height: '100%',
    borderRadius: borderRadius.xs,
    marginRight: spacing.md,
  },
  
  alertIcon: {
    width: 50,
    height: 50,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  
  alertContent: {
    flex: 1,
  },
  
  alertTitle: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  
  alertDescription: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  
  alertFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  alertCost: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.text.primary,
  },
  
  urgentBadge: {
    backgroundColor: colors.error,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  
  urgentText: {
    fontSize: fonts.sizes.xs,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.surface,
  },

  // Estilos dos cartões de erro
  errorCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadows.small,
  },
  
  errorHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  
  errorCodeBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    marginRight: spacing.md,
  },
  
  errorCodeText: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.surface,
  },
  
  errorInfo: {
    flex: 1,
  },
  
  errorTitle: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  
  errorImpact: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.secondary,
  },
  
  errorAction: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.primary,
    marginBottom: spacing.sm,
    fontStyle: 'italic',
  },
  
  errorFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  errorCost: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.primary,
  },
  
  errorDate: {
    fontSize: fonts.sizes.xs,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.secondary,
  },

  // Estilos das leituras básicas
  readingsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  
  readingCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    alignItems: 'center',
    ...shadows.small,
  },
  
  readingIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  
  readingLabel: {
    fontSize: fonts.sizes.xs,
    fontFamily: getFontFamily('Poppins', 'Medium'),
    color: colors.text.secondary,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  
  readingValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  
  readingNumber: {
    fontSize: fonts.sizes.lg,
    fontFamily: getFontFamily('Poppins', 'Bold'),
  },
  
  readingUnit: {
    fontSize: fonts.sizes.xs,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.secondary,
    marginLeft: spacing.xs,
  },

  // Estilos das manutenções agendadas
  scheduledContainer: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    ...shadows.small,
  },
  
  scheduledItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  },
  
  scheduledInfo: {
    flex: 1,
  },
  
  scheduledTitle: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Medium'),
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  
  scheduledDetails: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.secondary,
  },
  
  scheduledCost: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.primary,
  },

  // Estilos da interface Bluetooth
  bluetoothContainer: {
    marginBottom: spacing.md,
  },
  
  bluetoothButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    ...shadows.small,
  },
  
  bluetoothConnected: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  
  bluetoothDisconnected: {
    backgroundColor: colors.surface,
    borderColor: colors.primary,
  },
  
  bluetoothText: {
    fontSize: fonts.sizes.md,
    fontWeight: '600',
    marginLeft: spacing.sm,
  },
  
  bluetoothTextConnected: {
    color: colors.surface,
  },
  
  bluetoothTextDisconnected: {
    color: colors.primary,
  },
  
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.surface,
    marginLeft: spacing.sm,
  },

  // Estilos do botão adicionar manutenção
  addMaintenanceButton: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginTop: spacing.md,
    borderWidth: 2,
    borderColor: colors.primary + '30',
    borderStyle: 'dashed',
    ...shadows.small,
  },

  addButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },

  addButtonText: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Medium'),
    color: colors.primary,
  },

  // Estilos do modal
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

  priorityContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
  },

  priorityButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.text.placeholder + '30',
    alignItems: 'center',
  },

  priorityButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  priorityText: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Medium'),
    color: colors.text.secondary,
  },

  priorityTextActive: {
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