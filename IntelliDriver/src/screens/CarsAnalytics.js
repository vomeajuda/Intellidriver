// ========================================
// IMPORTAÇÕES E DEPENDÊNCIAS
// ========================================

// Importação do React e hooks fundamentais para gerenciamento de estado e efeitos
import React, { useState, useEffect } from 'react';

// Importação de componentes nativos do React Native para construção da interface
import { 
  StyleSheet,      // Para criação de estilos CSS-like
  Text,           // Componente para exibição de texto
  View,           // Container básico (equivalente ao div no HTML)
  ScrollView,     // Container com scroll vertical/horizontal
  TouchableOpacity // Componente tocável que responde ao toque do usuário
} from 'react-native';

// Importação do componente Header para cabeçalho com logo centralizada
import Header from '../components/Header';

// Importação do LinearGradient do Expo para criar gradientes de cores
import { LinearGradient } from 'expo-linear-gradient';

// Importação de ícones vetoriais da biblioteca Ionicons
import { Ionicons } from '@expo/vector-icons';

// Importação do componente de navegação personalizado
import NavBar from '../components/Navbar';

// Importação de constantes de tema (cores, fontes, espaçamentos, etc.)
import { colors, fonts, spacing, borderRadius, shadows } from '../constants/theme';

// Importação do hook personalizado para carregamento de fontes
import { getFontFamily } from '../hooks/useFontLoader';

// Importação do hook personalizado para gerenciamento de Bluetooth
import { useBluetooth } from '../hooks/useBluetooth';

// Importação dos dados mock de diagnóstico do veículo
import { mockData } from '../data/carsAnalyticsData';

// ========================================
// COMPONENTE PRINCIPAL - CARSANALYTICS
// ========================================

/**
 * FUNÇÃO PRINCIPAL DO COMPONENTE
 * 
 * Este é o componente funcional principal que representa a tela de análise de carros.
 * Recebe props de navegação do React Navigation para permitir navegação entre telas.
 * 
 * @param {Object} navigation - Objeto de navegação do React Navigation
 * @returns {JSX.Element} - Retorna o JSX que será renderizado na tela
 */
export default function CarsAnalytics({ navigation }) {
  
  // ========================================
  // HOOKS DE ESTADO (useState)
  // ========================================
  
  /**
   * HOOK useState - DADOS DE ANÁLISE
   * 
   * Gerencia o estado dos dados de análise do veículo.
   * - Estado inicial: null (vazio)
   * - Será preenchido com dados mock ou dados reais da API
   * - Contém informações sobre saúde do veículo, alertas, erros, etc.
   */
  const [analyticsData, setAnalyticsData] = useState(null);
  
  /**
   * HOOK useState - ESTADO DE CARREGAMENTO
   * 
   * Controla se a tela está em estado de carregamento.
   * - Estado inicial: true (carregando)
   * - Muda para false após os dados serem carregados
   * - Usado para mostrar indicador de carregamento
   */
  const [loading, setLoading] = useState(true);
  
  /**
   * HOOK PERSONALIZADO - GERENCIAMENTO BLUETOOTH
   * 
   * Usa o hook customizado para gerenciar toda a lógica de conexão Bluetooth.
   * Retorna estados e funções necessários para controlar dispositivos OBD-II.
   */
  const {
    bluetoothConnected,
    connecting,
    handleBluetoothConnection,
    connectionStatus,
    isDeviceReady
  } = useBluetooth();

  // ========================================
  // HOOK useEffect - CARREGAMENTO INICIAL
  // ========================================
  
  /**
   * HOOK useEffect - SIMULAÇÃO DE CARREGAMENTO DE DADOS
   * 
   * Este hook é executado apenas uma vez quando o componente é montado (array de dependências vazio []).
   * Simula o carregamento de dados que, em uma aplicação real, viria de:
   * - API REST
   * - Conexão direta com OBD-II
   * - Banco de dados local
   * - Cache de dados anteriores
   * 
   * Processo:
   * 1. Aguarda 1 segundo (simulando requisição de rede)
   * 2. Define os dados mock no estado analyticsData
   * 3. Remove o estado de carregamento
   */
  useEffect(() => {
    // Simular carregamento de dados com setTimeout
    setTimeout(() => {
      setAnalyticsData(mockData);  // Define os dados no estado
      setLoading(false);           // Remove o estado de carregamento
    }, 1000); // Aguarda 1000ms (1 segundo)
  }, []); // Array vazio = executa apenas uma vez ao montar o componente

  // ========================================
  // COMPONENTE FUNCIONAL - CARTÃO DE SAÚDE DO VEÍCULO
  // ========================================
  
  /**
   * COMPONENTE HealthScoreCard
   * 
   * Componente funcional que renderiza um cartão visual mostrando
   * a pontuação geral de saúde do veículo com gradiente colorido.
   * 
   * @param {number} score - Pontuação de 0-100 da saúde do veículo
   * @param {string} status - Status geral: 'OK', 'WARNING', 'CRITICAL'
   * @returns {JSX.Element} - Cartão com gradiente e informações de saúde
   * 
   * Funcionalidades:
   * - Gradiente de cor baseado na pontuação
   * - Ícone de carro
   * - Pontuação grande e destacada
   * - Texto de status traduzido
   */
  const HealthScoreCard = ({ score, status }) => {
    
    /**
     * FUNÇÃO getStatusColor
     * 
     * Função interna que determina a cor baseada na pontuação de saúde.
     * Utiliza sistema de semáforo: verde (bom), amarelo (atenção), vermelho (crítico)
     * 
     * @returns {string} - Código hexadecimal da cor
     */
    const getStatusColor = () => {
      if (score >= 80) return colors.success;    // Verde: 80-100 pontos
      if (score >= 60) return colors.warning;    // Amarelo: 60-79 pontos
      return colors.error;                       // Vermelho: 0-59 pontos
    };

    // ========================================
    // RENDERIZAÇÃO DO COMPONENTE
    // ========================================
    return (
      <LinearGradient
        colors={[getStatusColor(), getStatusColor() + '80']} // Gradiente: cor sólida + cor com 50% transparência
        style={styles.healthCard} // Aplica estilos do cartão
      >
        {/* ========================================
            CABEÇALHO: ÍCONE + TÍTULO
            ======================================== */}
        <View style={styles.healthHeader}>
          <Ionicons 
            name="car-sport"              // Ícone de carro esportivo
            size={32}                     // Tamanho do ícone
            color={colors.surface}        // Cor branca/clara
          />
          <Text style={styles.healthTitle}>Saúde do Veículo</Text>
        </View>
        
        {/* ========================================
            PONTUAÇÃO PRINCIPAL
            ======================================== */}
        <View style={styles.healthScore}>
          <Text style={styles.scoreValue}>{score}</Text>      {/* Número grande */}
          <Text style={styles.scoreLabel}>/100</Text>          {/* Label "/100" */}
        </View>
        
        {/* ========================================
            TEXTO DE STATUS TRADUZIDO
            ======================================== */}
        <Text style={styles.statusText}>
          {status === 'OK' ? 'Excelente' :                    // Tradução de 'OK'
           status === 'WARNING' ? 'Atenção Necessária' : 'Crítico'}
        </Text>
      </LinearGradient>
    );
  };

  // ========================================
  // COMPONENTE FUNCIONAL - ALERTA DE MANUTENÇÃO
  // ========================================
  
  /**
   * COMPONENTE MaintenanceAlert
   * 
   * Componente que renderiza um cartão individual para cada alerta de manutenção.
   * Exibe informações visuais como prioridade, ícone, descrição e custos.
   * 
   * @param {Object} alert - Objeto contendo dados do alerta de manutenção
   * @param {number} alert.id - Identificador único
   * @param {string} alert.type - Tipo de manutenção (oil_change, brake_pads, etc.)
   * @param {string} alert.priority - Prioridade: 'high', 'medium', 'low'
   * @param {string} alert.title - Título do alerta
   * @param {string} alert.description - Descrição detalhada
   * @param {number} alert.estimatedCost - Custo estimado em reais
   * @param {string} alert.urgency - Nível de urgência
   * @returns {JSX.Element} - Cartão de alerta renderizado
   */
  const MaintenanceAlert = ({ alert }) => {
    
    /**
     * FUNÇÃO getPriorityColor
     * 
     * Determina a cor do alerta baseada na prioridade.
     * Sistema de cores:
     * - Vermelho: alta prioridade (urgent)
     * - Amarelo: média prioridade (moderate) 
     * - Azul: baixa prioridade (low)
     * 
     * @returns {string} - Código de cor hexadecimal
     */
    const getPriorityColor = () => {
      switch (alert.priority) {
        case 'high': return colors.error;        // Vermelho para alta prioridade
        case 'medium': return colors.warning;    // Amarelo para média prioridade
        case 'low': return colors.accent;        // Azul para baixa prioridade
        default: return colors.text.secondary;   // Cinza como fallback
      }
    };

    /**
     * FUNÇÃO getIcon
     * 
     * Seleciona o ícone apropriado baseado no tipo de manutenção.
     * Cada tipo de manutenção tem um ícone específico para melhor identificação visual.
     * 
     * @returns {string} - Nome do ícone Ionicons
     */
    const getIcon = () => {
      switch (alert.type) {
        case 'oil_change': return 'water';        // Gota d'água para óleo
        case 'brake_pads': return 'hand-left';    // Mão para freios
        case 'air_filter': return 'leaf';         // Folha para filtro de ar
        case 'battery': return 'battery-charging'; // Bateria para sistema elétrico
        default: return 'construct';              // Ferramenta como padrão
      }
    };

    // ========================================
    // RENDERIZAÇÃO DO COMPONENTE
    // ========================================
    return (
      <View style={styles.alertCard}>
        
        {/* ========================================
            BARRA LATERAL DE PRIORIDADE
            ======================================== */}
        {/* Barra colorida na lateral esquerda indicando prioridade */}
        <View style={[styles.alertPriority, { backgroundColor: getPriorityColor() }]} />
        
        {/* ========================================
            ÍCONE DO TIPO DE MANUTENÇÃO
            ======================================== */}
        <View style={[styles.alertIcon, { backgroundColor: getPriorityColor() + '20' }]}>
          <Ionicons 
            name={getIcon()}              // Ícone baseado no tipo
            size={24}                     // Tamanho do ícone
            color={getPriorityColor()}    // Cor baseada na prioridade
          />
        </View>
        
        {/* ========================================
            CONTEÚDO PRINCIPAL DO ALERTA
            ======================================== */}
        <View style={styles.alertContent}>
          
          {/* Título do alerta */}
          <Text style={styles.alertTitle}>{alert.title}</Text>
          
          {/* Descrição detalhada */}
          <Text style={styles.alertDescription}>{alert.description}</Text>
          
          {/* ========================================
              RODAPÉ: CUSTO + BADGE DE URGÊNCIA
              ======================================== */}
          <View style={styles.alertFooter}>
            
            {/* Custo estimado formatado */}
            <Text style={styles.alertCost}>Custo: R$ {alert.estimatedCost}</Text>
            
            {/* Badge "URGENTE" - só aparece se urgency === 'urgent' */}
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

  // ========================================
  // COMPONENTE FUNCIONAL - CARTÃO DE ERRO OBD-II
  // ========================================
  
  /**
   * COMPONENTE ErrorCard
   * 
   * Componente que renderiza informações detalhadas sobre erros detectados
   * pelo sistema OBD-II do veículo. Cada erro possui código DTC, descrição,
   * severidade, impacto e ações recomendadas.
   * 
   * @param {Object} error - Objeto contendo dados do erro OBD-II
   * @param {string} error.code - Código DTC (ex: P0171, P0300)
   * @param {string} error.description - Descrição do erro
   * @param {string} error.severity - Severidade: 'high', 'medium', 'low'
   * @param {string} error.impact - Impacto no funcionamento do veículo
   * @param {string} error.recommendedAction - Ação recomendada para correção
   * @param {number} error.estimatedRepairCost - Custo estimado do reparo
   * @param {string} error.detected - Data de detecção do erro
   * @returns {JSX.Element} - Cartão de erro renderizado
   */
  const ErrorCard = ({ error }) => {
    
    /**
     * FUNÇÃO getSeverityColor
     * 
     * Determina a cor baseada na severidade do erro.
     * Sistema de cores para indicar urgência:
     * - Vermelho: severidade alta (risco de dano ao motor)
     * - Amarelo: severidade média (perda de performance)
     * - Azul: severidade baixa (monitoramento)
     * 
     * @returns {string} - Código de cor hexadecimal
     */
    const getSeverityColor = () => {
      switch (error.severity) {
        case 'high': return colors.error;        // Vermelho - atenção imediata
        case 'medium': return colors.warning;    // Amarelo - atenção moderada
        case 'low': return colors.accent;        // Azul - monitoramento
        default: return colors.text.secondary;   // Cinza - fallback
      }
    };

    // ========================================
    // RENDERIZAÇÃO DO COMPONENTE
    // ========================================
    return (
      <View style={styles.errorCard}>
        
        {/* ========================================
            CABEÇALHO: CÓDIGO DTC + INFORMAÇÕES
            ======================================== */}
        <View style={styles.errorHeader}>
          
          {/* Badge com código DTC colorido */}
          <View style={[styles.errorCodeBadge, { backgroundColor: getSeverityColor() }]}>
            <Text style={styles.errorCodeText}>{error.code}</Text>
          </View>
          
          {/* Informações principais do erro */}
          <View style={styles.errorInfo}>
            {/* Descrição técnica do erro */}
            <Text style={styles.errorTitle}>{error.description}</Text>
            
            {/* Impacto no funcionamento do veículo */}
            <Text style={styles.errorImpact}>{error.impact}</Text>
          </View>
        </View>
        
        {/* ========================================
            AÇÃO RECOMENDADA (com ícone de lâmpada)
            ======================================== */}
        <Text style={styles.errorAction}>💡 {error.recommendedAction}</Text>
        
        {/* ========================================
            RODAPÉ: CUSTO DE REPARO + DATA
            ======================================== */}
        <View style={styles.errorFooter}>
          
          {/* Custo estimado do reparo */}
          <Text style={styles.errorCost}>Reparo: R$ {error.estimatedRepairCost}</Text>
          
          {/* Data em que o erro foi detectado */}
          <Text style={styles.errorDate}>Detectado: {error.detected}</Text>
        </View>
      </View>
    );
  };

  // ========================================
  // COMPONENTE FUNCIONAL - LEITURA BÁSICA OBD-II
  // ========================================
  
  /**
   * COMPONENTE BasicReading
   * 
   * Componente reutilizável que exibe uma leitura individual de sensor OBD-II
   * em formato de cartão compacto. Usado para mostrar dados como RPM,
   * temperatura, voltagem, etc.
   * 
   * @param {string} icon - Nome do ícone Ionicons a ser exibido
   * @param {string} label - Rótulo descritivo da leitura (ex: "RPM", "Temp. Motor")
   * @param {number|string} value - Valor atual da leitura
   * @param {string} unit - Unidade de medida (ex: "rpm", "°C", "V")
   * @param {string} status - Status da leitura: 'normal', 'warning', 'error', 'good'
   * @returns {JSX.Element} - Cartão de leitura renderizado
   * 
   * Exemplos de uso:
   * - RPM do motor: icon="speedometer", value=850, unit="rpm"
   * - Temperatura: icon="thermometer", value=89, unit="°C"
   * - Bateria: icon="battery-charging", value=12.6, unit="V"
   */
  const BasicReading = ({ icon, label, value, unit, status = 'normal' }) => {
    
    /**
     * FUNÇÃO getStatusColor
     * 
     * Determina a cor baseada no status da leitura.
     * Sistema de cores para indicar condição do sensor:
     * - Verde: leitura boa/ideal
     * - Amarelo: atenção/monitoramento  
     * - Vermelho: problema/crítico
     * - Azul: normal/padrão
     * 
     * @returns {string} - Código de cor hexadecimal
     */
    const getStatusColor = () => {
      switch (status) {
        case 'warning': return colors.warning;    // Amarelo - atenção necessária
        case 'error': return colors.error;        // Vermelho - problema crítico
        case 'good': return colors.success;       // Verde - condição ideal
        default: return colors.primary;           // Azul - condição normal
      }
    };

    // ========================================
    // RENDERIZAÇÃO DO COMPONENTE
    // ========================================
    return (
      <View style={styles.readingCard}>
        
        {/* ========================================
            ÍCONE DO SENSOR/PARÂMETRO
            ======================================== */}
        {/* Container do ícone com fundo colorido baseado no status */}
        <View style={[styles.readingIcon, { backgroundColor: getStatusColor() + '20' }]}>
          <Ionicons 
            name={icon}                   // Ícone específico do parâmetro
            size={20}                     // Tamanho padrão do ícone
            color={getStatusColor()}      // Cor baseada no status
          />
        </View>
        
        {/* ========================================
            RÓTULO DESCRITIVO
            ======================================== */}
        {/* Nome/descrição do parâmetro sendo medido */}
        <Text style={styles.readingLabel}>{label}</Text>
        
        {/* ========================================
            VALOR + UNIDADE DE MEDIDA
            ======================================== */}
        <View style={styles.readingValue}>
          
          {/* Valor principal da leitura (número grande) */}
          <Text style={[styles.readingNumber, { color: getStatusColor() }]}>
            {value}
          </Text>
          
          {/* Unidade de medida (menor, opcional) */}
          {unit && (
            <Text style={styles.readingUnit}>{unit}</Text>
          )}
        </View>
      </View>
    );
  };

  // ========================================
  // RENDERIZAÇÃO CONDICIONAL - ESTADO DE CARREGAMENTO
  // ========================================
  
  /**
   * VERIFICAÇÃO DE ESTADO DE CARREGAMENTO E DADOS
   * 
   * Se a variável loading for true ou analyticsData for null, renderiza uma tela de carregamento
   * simples com texto informativo. Esta tela é exibida durante o tempo
   * em que os dados estão sendo carregados (simulado pelo setTimeout).
   * 
   * Estrutura da tela de carregamento:
   * - Container principal
   * - Título da tela
   * - Texto de carregamento centralizado
   * - Barra de navegação inferior
   * 
   * return early: Se esta condição for verdadeira, a função para aqui
   * e não executa o resto do código (renderização principal).
   */
  if (loading || !analyticsData) {
    return (
      <View style={styles.container}>
        {/* Título fixo da tela */}
        <Text style={styles.title}>Diagnóstico do Carro</Text>
        
        {/* Container centralizado para texto de carregamento */}
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando diagnóstico...</Text>
        </View>
        
        {/* Barra de navegação inferior (sempre presente) */}
        <NavBar />
      </View>
    );
  }

  // ========================================
  // RENDERIZAÇÃO PRINCIPAL - TELA COMPLETA DE DIAGNÓSTICO
  // ========================================
  
  /**
   * RENDERIZAÇÃO DA INTERFACE PRINCIPAL
   * 
   * Esta é a renderização principal do componente quando os dados
   * já foram carregados (loading = false). Contém toda a interface
   * de diagnóstico do veículo organizada em seções.
   * 
   * Estrutura da tela:
   * 1. Container principal
   * 2. Título da tela
   * 3. ScrollView com todo o conteúdo
   * 4. Barra de navegação inferior
   */
  return (
    <View style={styles.mainContainer}>
      
      {/* ========================================
          HEADER COM LOGO CENTRALIZADA
          ======================================== */}
      <Header />
      
      <View style={styles.container}>
      {/* ========================================
          TÍTULO FIXO DA TELA
          ======================================== */}
      <Text style={styles.title}>Diagnóstico do Carro</Text>

      {/* ========================================
          ÁREA ROLÁVEL COM TODO O CONTEÚDO
          ======================================== */}
      {/* 
        ScrollView permite rolar verticalmente quando o conteúdo
        é maior que a altura da tela. showsVerticalScrollIndicator={false}
        remove a barra de rolagem visual.
      */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        
        {/* ========================================
            SEÇÃO: BOTÃO DE CONEXÃO BLUETOOTH
            ======================================== */}
        <View style={styles.bluetoothContainer}>
          <TouchableOpacity 
            style={[
              styles.bluetoothButton,                               // Estilo base do botão
              bluetoothConnected ?                                  // Operador ternário para estilo condicional
                styles.bluetoothConnected :                         // Se conectado: estilo verde
                styles.bluetoothDisconnected                        // Se desconectado: estilo azul/branco
            ]}
            onPress={handleBluetoothConnection}                     // Função chamada ao tocar
            disabled={connecting}                                   // Desabilita botão durante conexão
          >
            {/* Ícone do Bluetooth (sólido se conectado, outline se não) */}
            <Ionicons 
              name={bluetoothConnected ? "bluetooth" : "bluetooth-outline"} 
              size={20} 
              color={bluetoothConnected ? colors.surface : colors.primary} 
            />
            
            {/* Texto do botão com estados diferentes */}
            <Text style={[
              styles.bluetoothText,                                 // Estilo base do texto
              bluetoothConnected ?                                  // Estilo condicional da cor
                styles.bluetoothTextConnected :                     // Texto branco se conectado
                styles.bluetoothTextDisconnected                    // Texto azul se desconectado
            ]}>
              {connectionStatus}
            </Text>
            
            {/* Indicador visual de conexão ativa (bolinha verde) */}
            {bluetoothConnected && (
              <View style={styles.statusIndicator} />
            )}
          </TouchableOpacity>
        </View>
        
        {/* ========================================
            SEÇÃO: SAÚDE GERAL DO VEÍCULO
            ======================================== */}
        <View style={styles.section}>
          
          {/* Componente do cartão de saúde com pontuação e status */}
          <HealthScoreCard 
            score={analyticsData?.vehicleHealth?.healthScore || 0}        // Pontuação 0-100
            status={analyticsData?.vehicleHealth?.overallStatus || 'OK'}     // Status: OK/WARNING/CRITICAL
          />
          
          {/* Informações adicionais de manutenção */}
          <View style={styles.healthInfo}>
            
            {/* Data da última manutenção */}
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Última Manutenção</Text>
              <Text style={styles.infoValue}>{analyticsData?.vehicleHealth?.lastMaintenance || 'N/A'}</Text>
            </View>
            
            {/* Data da próxima manutenção */}
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Próxima Manutenção</Text>
              <Text style={styles.infoValue}>{analyticsData?.vehicleHealth?.nextMaintenance || 'N/A'}</Text>
            </View>
            
            {/* Quilometragem atual formatada */}
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Quilometragem</Text>
              <Text style={styles.infoValue}>
                {analyticsData?.vehicleHealth?.mileage?.toLocaleString() || '0'} km
              </Text>
            </View>
          </View>
        </View>

        {/* ========================================
            SEÇÃO: ALERTAS DE MANUTENÇÃO URGENTE
            ======================================== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🚨 Manutenção Necessária</Text>
          
          {/* 
            Mapeia array de alertas para renderizar um componente para cada alerta.
            .map() itera sobre cada item do array e retorna um JSX element.
          */}
          {(analyticsData?.maintenanceAlerts || []).map((alert) => (
            <MaintenanceAlert 
              key={alert.id}                                        // Key única para React
              alert={alert}                                         // Passa objeto completo do alerta
            />
          ))}
        </View>

        {/* ========================================
            SEÇÃO: ERROS ENCONTRADOS (CONDICIONAL)
            ======================================== */}
        {/* 
          Renderização condicional: só mostra seção se houver erros ativos.
          && é um operador de curto-circuito: se length > 0 for true,
          renderiza o JSX que vem depois.
        */}
        {(analyticsData?.activeErrors?.length || 0) > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>⚠️ Erros Detectados (OBD-II)</Text>
            
            {/* Mapeia array de erros para renderizar cada cartão de erro */}
            {(analyticsData?.activeErrors || []).map((error, index) => (
              <ErrorCard 
                key={index}                                         // Key baseada no índice
                error={error}                                       // Passa objeto completo do erro
              />
            ))}
          </View>
        )}

        {/* ========================================
            SEÇÃO: LEITURAS BÁSICAS OBD-II
            ======================================== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Leituras Básicas OBD-II</Text>
          
          {/* 
            Grid de leituras em formato 2 colunas.
            Cada BasicReading é um cartão individual com um parâmetro do veículo.
          */}
          <View style={styles.readingsGrid}>
            
            {/* RPM do motor */}
            <BasicReading
              icon="speedometer"                                    // Ícone de velocímetro
              label="RPM"                                           // Rótulo
              value={analyticsData?.basicReadings?.engine?.rpm || 0}       // Valor atual
              unit="rpm"                                            // Unidade
              status="normal"                                       // Status normal
            />
            
            {/* Temperatura do motor com lógica condicional */}
            <BasicReading
              icon="thermometer"
              label="Temp. Motor"
              value={analyticsData?.basicReadings?.engine?.coolantTemp || 0}
              unit="°C"
              status={
                (analyticsData?.basicReadings?.engine?.coolantTemp || 0) > 95 ? 
                'warning' : 'normal'                                // Se > 95°C: warning, senão: normal
              }
            />
            
            {/* Temperatura do óleo com lógica condicional */}
            <BasicReading
              icon="water"
              label="Temp. Óleo"
              value={analyticsData?.basicReadings?.engine?.oilTemp || 0}
              unit="°C"
              status={
                (analyticsData?.basicReadings?.engine?.oilTemp || 0) > 100 ? 
                'warning' : 'normal'                                // Se > 100°C: warning, senão: normal
              }
            />
            
            {/* Carga do motor */}
            <BasicReading
              icon="pulse"
              label="Carga Motor"
              value={analyticsData?.basicReadings?.engine?.engineLoad || 0}
              unit="%"
              status="normal"
            />
            
            {/* Nível de combustível com lógica condicional */}
            <BasicReading
              icon="car"
              label="Combustível"
              value={analyticsData?.basicReadings?.fuel?.level || 0}
              unit="%"
              status={
                (analyticsData?.basicReadings?.fuel?.level || 0) < 20 ? 
                'warning' : 'normal'                                // Se < 20%: warning, senão: normal
              }
            />
            
            {/* Voltagem da bateria com lógica condicional */}
            <BasicReading
              icon="battery-charging"
              label="Bateria"
              value={analyticsData?.basicReadings?.electrical?.batteryVoltage || 0}
              unit="V"
              status={
                (analyticsData?.basicReadings?.electrical?.batteryVoltage || 0) < 12.0 ? 
                'error' : 'normal'                                  // Se < 12V: error, senão: normal
              }
            />
            
            {/* Saída do alternador */}
            <BasicReading
              icon="flash"
              label="Alternador"
              value={analyticsData?.basicReadings?.electrical?.alternatorOutput || 0}
              unit="V"
              status="normal"
            />
            
            {/* Sensor lambda 1 com cálculo de status complexo */}
            <BasicReading
              icon="leaf"
              label="Lambda 1"
              value={analyticsData?.basicReadings?.emissions?.lambdaSensor1 || 0}
              unit="λ"
              status={
                Math.abs((analyticsData?.basicReadings?.emissions?.lambdaSensor1 || 1.0) - 1.0) > 0.1 ? 
                'warning' : 'good'                                  // Se distância de 1.0 > 0.1: warning, senão: good
              }
            />
          </View>
        </View>

        {/* ========================================
            SEÇÃO: PRÓXIMAS MANUTENÇÕES PROGRAMADAS
            ======================================== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📅 Próximas Manutenções</Text>
          
          <View style={styles.scheduledContainer}>
            {/* Mapeia manutenções programadas */}
            {(analyticsData?.scheduledMaintenance || []).map((item, index) => (
              <View key={index} style={styles.scheduledItem}>
                
                {/* Informações da manutenção */}
                <View style={styles.scheduledInfo}>
                  <Text style={styles.scheduledTitle}>{item?.item || 'Manutenção'}</Text>
                  <Text style={styles.scheduledDetails}>
                    {item?.km?.toLocaleString() || '0'} km • {item?.daysRemaining || '0'} dias
                  </Text>
                </View>
                
                {/* Custo da manutenção */}
                <Text style={styles.scheduledCost}>R$ {item?.cost || '0'}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ========================================
            ESPAÇAMENTO INFERIOR
            ======================================== */}
        {/* 
          View vazia com altura fixa para garantir que o último
          conteúdo não fique escondido atrás da barra de navegação.
        */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* ========================================
          BARRA DE NAVEGAÇÃO INFERIOR (FIXA)
          ======================================== */}
      <NavBar />
      </View>
    </View>
  );
// ========================================
// FECHAMENTO DO COMPONENTE PRINCIPAL
// ========================================
}

// ========================================
// FOLHA DE ESTILOS - StyleSheet.create()
// ========================================

/**
 * OBJETO DE ESTILOS
 * 
 * StyleSheet.create() é uma função do React Native que otimiza
 * e valida estilos CSS-like para componentes nativos.
 * 
 * Benefícios:
 * - Validação de propriedades em tempo de desenvolvimento
 * - Otimização de performance 
 * - Reutilização de estilos
 * - Organização e manutenibilidade
 * 
 * Estrutura organizada por seções funcionais:
 * 1. Estilos gerais (container, título, loading)
 * 2. Cartão de saúde do veículo
 * 3. Alertas de manutenção
 * 4. Cartões de erro
 * 5. Leituras básicas
 * 6. Manutenções agendadas
 * 7. Interface Bluetooth
 */
const styles = StyleSheet.create({
  
  // ========================================
  // ESTILOS GERAIS E LAYOUT PRINCIPAL
  // ========================================
  
  /**
   * CONTAINER PRINCIPAL SEM PADDING
   * Para o header ocupar toda a largura da tela
   */
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  /**
   * CONTAINER PRINCIPAL
   * Estilo do View mais externo que ocupa toda a tela
   */
  container: {
    flex: 1,                          // Ocupa todo espaço disponível
    backgroundColor: colors.background, // Cor de fundo do tema
  },
  
  /**
   * TÍTULO DA TELA
   * Estilo do texto principal no topo
   */
  title: {
    fontSize: 32,                     // Tamanho grande para destaque
    fontWeight: 'bold',               // Peso da fonte em negrito
    color: colors.text.primary,       // Cor primária do texto do tema
    marginTop: 16,                    // Margem superior para espaçamento do header
    marginBottom: 20,                 // Margem inferior
    paddingHorizontal: spacing.lg,    // Padding horizontal das laterais
  },
  
  /**
   * ÁREA DE CONTEÚDO ROLÁVEL
   * Estilo do ScrollView principal
   */
  content: {
    flex: 1,                          // Ocupa espaço restante
    paddingHorizontal: spacing.lg,    // Padding lateral interno
  },
  
  /**
   * CONTAINER DE CARREGAMENTO
   * Para centralizar o texto "Carregando..."
   */
  loadingContainer: {
    flex: 1,                          // Ocupa todo espaço disponível
    justifyContent: 'center',         // Centraliza verticalmente
    alignItems: 'center',             // Centraliza horizontalmente
  },
  
  /**
   * TEXTO DE CARREGAMENTO
   */
  loadingText: {
    fontSize: fonts.sizes.md,         // Tamanho médio da fonte
    fontWeight: '400',                // Peso normal da fonte
    color: colors.text.secondary,     // Cor secundária (mais clara)
  },
  
  /**
   * SEÇÃO GENÉRICA
   * Usado para agrupar blocos de conteúdo
   */
  section: {
    marginBottom: spacing.xl,         // Espaçamento grande entre seções
  },
  
  /**
   * TÍTULO DE SEÇÃO
   * Para títulos como "🚨 Manutenção Necessária"
   */
  sectionTitle: {
    fontSize: fonts.sizes.xl,         // Tamanho extra grande
    fontWeight: '600',                // Peso semi-negrito
    color: colors.text.primary,       // Cor primária do texto
    marginBottom: spacing.md,         // Margem inferior média
  },
  
  // ========================================
  // ESTILOS DO CARTÃO DE SAÚDE DO VEÍCULO
  // ========================================
  
  /**
   * CARTÃO PRINCIPAL DE SAÚDE
   * Container do LinearGradient com pontuação
   */
  healthCard: {
    borderRadius: borderRadius.lg,    // Bordas arredondadas grandes
    padding: spacing.lg,              // Padding interno grande
    marginBottom: spacing.md,         // Margem inferior média
    ...shadows.medium,                // Sombra média (spread operator)
  },
  
  /**
   * CABEÇALHO DO CARTÃO DE SAÚDE
   * Linha com ícone + título
   */
  healthHeader: {
    flexDirection: 'row',             // Disposição horizontal
    alignItems: 'center',             // Alinhamento vertical centralizado
    marginBottom: spacing.md,         // Margem inferior
  },
  
  /**
   * TÍTULO DO CARTÃO DE SAÚDE
   */
  healthTitle: {
    fontSize: fonts.sizes.xl,         // Tamanho extra grande
    fontWeight: 'bold',               // Negrito
    color: colors.surface,            // Cor clara (branco/off-white)
    marginLeft: spacing.md,           // Margem esquerda para separar do ícone
  },
  
  /**
   * CONTAINER DA PONTUAÇÃO
   * Para o número grande "72/100"
   */
  healthScore: {
    flexDirection: 'row',             // Disposição horizontal
    alignItems: 'baseline',           // Alinha pela linha de base do texto
    justifyContent: 'center',         // Centraliza horizontalmente
    marginBottom: spacing.sm,         // Margem inferior pequena
  },
  
  /**
   * VALOR PRINCIPAL DA PONTUAÇÃO
   * O número grande (ex: "72")
   */
  scoreValue: {
    fontSize: fonts.sizes.hero,       // Tamanho heroico (muito grande)
    fontWeight: 'bold',               // Negrito
    color: colors.surface,            // Cor clara
  },
  
  /**
   * LABEL DA PONTUAÇÃO
   * O texto "/100"
   */
  scoreLabel: {
    fontSize: fonts.sizes.xl,         // Tamanho extra grande (menor que o valor)
    fontWeight: '400',                // Peso normal
    color: colors.surface,            // Cor clara
    opacity: 0.8,                     // Transparência para diminuir destaque
  },
  
  /**
   * TEXTO DE STATUS
   * "Excelente", "Atenção Necessária", "Crítico"
   */
  statusText: {
    fontSize: fonts.sizes.lg,         // Tamanho grande
    fontWeight: '500',                // Peso médio
    color: colors.surface,            // Cor clara
    textAlign: 'center',              // Centralizado
  },
  
  /**
   * INFORMAÇÕES ADICIONAIS DE SAÚDE
   * Container para datas e quilometragem
   */
  healthInfo: {
    flexDirection: 'row',             // Disposição horizontal
    justifyContent: 'space-between',  // Distribui espaço entre itens
    backgroundColor: colors.surface,   // Fundo claro
    borderRadius: borderRadius.md,    // Bordas arredondadas médias
    padding: spacing.md,              // Padding interno
    ...shadows.small,                 // Sombra pequena
  },
  
  /**
   * ITEM INDIVIDUAL DE INFORMAÇÃO
   * Para cada coluna (última manutenção, próxima, km)
   */
  infoItem: {
    alignItems: 'center',             // Centraliza conteúdo
    flex: 1,                          // Distribui espaço igualmente
  },
  
  /**
   * LABEL DE INFORMAÇÃO
   * Texto pequeno descritivo
   */
  infoLabel: {
    fontSize: fonts.sizes.xs,         // Tamanho extra pequeno
    fontFamily: getFontFamily('Poppins', 'Medium'), // Fonte Poppins média
    color: colors.text.secondary,     // Cor secundária
    marginBottom: spacing.xs,         // Margem inferior pequena
    textAlign: 'center',              // Centralizado
  },
  
  /**
   * VALOR DE INFORMAÇÃO
   * Texto principal de cada informação
   */
  infoValue: {
    fontSize: fonts.sizes.sm,         // Tamanho pequeno
    fontFamily: getFontFamily('Poppins', 'Bold'), // Fonte Poppins negrito
    color: colors.text.primary,       // Cor primária
    textAlign: 'center',              // Centralizado
  },

  // ========================================
  // ESTILOS DOS ALERTAS DE MANUTENÇÃO
  // ========================================
  
  /**
   * CARTÃO DE ALERTA
   * Container principal de cada alerta
   */
  alertCard: {
    backgroundColor: colors.surface,   // Fundo claro
    borderRadius: borderRadius.md,    // Bordas arredondadas
    padding: spacing.md,              // Padding interno
    marginBottom: spacing.sm,         // Margem inferior pequena
    flexDirection: 'row',             // Disposição horizontal
    alignItems: 'center',             // Alinhamento vertical central
    ...shadows.small,                 // Sombra pequena
  },
  
  /**
   * BARRA DE PRIORIDADE
   * Barra colorida lateral esquerda
   */
  alertPriority: {
    width: 4,                         // Largura da barra
    height: '100%',                   // Altura total do container
    borderRadius: borderRadius.xs,    // Bordas levemente arredondadas
    marginRight: spacing.md,          // Margem direita
  },
  
  /**
   * ÍCONE DO ALERTA
   * Container circular com ícone
   */
  alertIcon: {
    width: 50,                        // Largura fixa
    height: 50,                       // Altura fixa (quadrado)
    borderRadius: borderRadius.md,    // Bordas arredondadas
    justifyContent: 'center',         // Centraliza ícone verticalmente
    alignItems: 'center',             // Centraliza ícone horizontalmente
    marginRight: spacing.md,          // Margem direita
  },
  
  /**
   * CONTEÚDO DO ALERTA
   * Área principal com textos
   */
  alertContent: {
    flex: 1,                          // Ocupa espaço restante
  },
  
  /**
   * TÍTULO DO ALERTA
   */
  alertTitle: {
    fontSize: fonts.sizes.md,         // Tamanho médio
    fontFamily: getFontFamily('Poppins', 'Bold'), // Fonte Poppins negrito
    color: colors.text.primary,       // Cor primária
    marginBottom: spacing.xs,         // Margem inferior pequena
  },
  
  /**
   * DESCRIÇÃO DO ALERTA
   */
  alertDescription: {
    fontSize: fonts.sizes.sm,         // Tamanho pequeno
    fontFamily: getFontFamily('Poppins', 'Regular'), // Fonte Poppins normal
    color: colors.text.secondary,     // Cor secundária
    marginBottom: spacing.sm,         // Margem inferior
  },
  
  /**
   * RODAPÉ DO ALERTA
   * Container para custo e badge de urgência
   */
  alertFooter: {
    flexDirection: 'row',             // Disposição horizontal
    justifyContent: 'space-between',  // Distribui espaço
    alignItems: 'center',             // Alinhamento vertical central
  },
  
  /**
   * CUSTO DO ALERTA
   */
  alertCost: {
    fontSize: fonts.sizes.sm,         // Tamanho pequeno
    fontFamily: getFontFamily('Poppins', 'Bold'), // Fonte Poppins negrito
    color: colors.text.primary,       // Cor primária
  },
  
  /**
   * BADGE DE URGÊNCIA
   * Container vermelho para "URGENTE"
   */
  urgentBadge: {
    backgroundColor: colors.error,     // Fundo vermelho
    paddingHorizontal: spacing.sm,    // Padding horizontal
    paddingVertical: spacing.xs,      // Padding vertical
    borderRadius: borderRadius.sm,    // Bordas arredondadas pequenas
  },
  
  /**
   * TEXTO DE URGÊNCIA
   */
  urgentText: {
    fontSize: fonts.sizes.xs,         // Tamanho extra pequeno
    fontFamily: getFontFamily('Poppins', 'Bold'), // Fonte Poppins negrito
    color: colors.surface,            // Cor clara (branco)
  },

  // ========================================
  // ESTILOS DOS CARTÕES DE ERRO
  // ========================================
  
  /**
   * CARTÃO DE ERRO
   * Container principal para erros OBD-II
   */
  errorCard: {
    backgroundColor: colors.surface,   // Fundo claro
    borderRadius: borderRadius.md,    // Bordas arredondadas
    padding: spacing.md,              // Padding interno
    marginBottom: spacing.sm,         // Margem inferior
    ...shadows.small,                 // Sombra pequena
  },
  
  /**
   * CABEÇALHO DO ERRO
   * Linha com código DTC + informações
   */
  errorHeader: {
    flexDirection: 'row',             // Disposição horizontal
    alignItems: 'flex-start',         // Alinhamento no topo
    marginBottom: spacing.sm,         // Margem inferior
  },
  
  /**
   * BADGE DO CÓDIGO DTC
   * Container colorido para código (ex: P0171)
   */
  errorCodeBadge: {
    paddingHorizontal: spacing.sm,    // Padding horizontal
    paddingVertical: spacing.xs,      // Padding vertical
    borderRadius: borderRadius.sm,    // Bordas arredondadas
    marginRight: spacing.md,          // Margem direita
  },
  
  /**
   * TEXTO DO CÓDIGO DTC
   */
  errorCodeText: {
    fontSize: fonts.sizes.sm,         // Tamanho pequeno
    fontFamily: getFontFamily('Poppins', 'Bold'), // Fonte Poppins negrito
    color: colors.surface,            // Cor clara
  },
  
  /**
   * INFORMAÇÕES DO ERRO
   * Container para título e impacto
   */
  errorInfo: {
    flex: 1,                          // Ocupa espaço restante
  },
  
  /**
   * TÍTULO DO ERRO
   */
  errorTitle: {
    fontSize: fonts.sizes.md,         // Tamanho médio
    fontFamily: getFontFamily('Poppins', 'Bold'), // Fonte Poppins negrito
    color: colors.text.primary,       // Cor primária
    marginBottom: spacing.xs,         // Margem inferior
  },
  
  /**
   * IMPACTO DO ERRO
   */
  errorImpact: {
    fontSize: fonts.sizes.sm,         // Tamanho pequeno
    fontFamily: getFontFamily('Poppins', 'Regular'), // Fonte Poppins normal
    color: colors.text.secondary,     // Cor secundária
  },
  
  /**
   * AÇÃO RECOMENDADA
   * Com ícone de lâmpada (💡)
   */
  errorAction: {
    fontSize: fonts.sizes.sm,         // Tamanho pequeno
    fontFamily: getFontFamily('Poppins', 'Regular'), // Fonte Poppins normal
    color: colors.text.primary,       // Cor primária
    marginBottom: spacing.sm,         // Margem inferior
    fontStyle: 'italic',              // Texto em itálico
  },
  
  /**
   * RODAPÉ DO ERRO
   * Container para custo e data
   */
  errorFooter: {
    flexDirection: 'row',             // Disposição horizontal
    justifyContent: 'space-between',  // Distribui espaço
  },
  
  /**
   * CUSTO DO ERRO
   */
  errorCost: {
    fontSize: fonts.sizes.sm,         // Tamanho pequeno
    fontFamily: getFontFamily('Poppins', 'Bold'), // Fonte Poppins negrito
    color: colors.primary,            // Cor primária do tema
  },
  
  /**
   * DATA DO ERRO
   */
  errorDate: {
    fontSize: fonts.sizes.xs,         // Tamanho extra pequeno
    fontFamily: getFontFamily('Poppins', 'Regular'), // Fonte Poppins normal
    color: colors.text.secondary,     // Cor secundária
  },

  // ========================================
  // ESTILOS DAS LEITURAS BÁSICAS
  // ========================================
  
  /**
   * GRID DAS LEITURAS
   * Container que organiza leituras em 2 colunas
   */
  readingsGrid: {
    flexDirection: 'row',             // Disposição horizontal
    flexWrap: 'wrap',                 // Permite quebra de linha
    justifyContent: 'space-between',  // Distribui espaço entre colunas
  },
  
  /**
   * CARTÃO DE LEITURA
   * Cada cartão individual (RPM, temperatura, etc.)
   */
  readingCard: {
    width: '48%',                     // Largura para 2 colunas (48% + 4% gap)
    backgroundColor: colors.surface,   // Fundo claro
    borderRadius: borderRadius.md,    // Bordas arredondadas
    padding: spacing.sm,              // Padding interno pequeno
    marginBottom: spacing.sm,         // Margem inferior
    alignItems: 'center',             // Centraliza conteúdo
    ...shadows.small,                 // Sombra pequena
  },
  
  /**
   * ÍCONE DA LEITURA
   * Container circular para ícone do parâmetro
   */
  readingIcon: {
    width: 40,                        // Largura fixa
    height: 40,                       // Altura fixa
    borderRadius: borderRadius.md,    // Bordas arredondadas
    justifyContent: 'center',         // Centraliza ícone verticalmente
    alignItems: 'center',             // Centraliza ícone horizontalmente
    marginBottom: spacing.sm,         // Margem inferior
  },
  
  /**
   * LABEL DA LEITURA
   * Nome do parâmetro (ex: "RPM", "Temp. Motor")
   */
  readingLabel: {
    fontSize: fonts.sizes.xs,         // Tamanho extra pequeno
    fontFamily: getFontFamily('Poppins', 'Medium'), // Fonte Poppins média
    color: colors.text.secondary,     // Cor secundária
    marginBottom: spacing.xs,         // Margem inferior
    textAlign: 'center',              // Centralizado
  },
  
  /**
   * CONTAINER DO VALOR
   * Para número + unidade na mesma linha
   */
  readingValue: {
    flexDirection: 'row',             // Disposição horizontal
    alignItems: 'baseline',           // Alinha pela linha de base
  },
  
  /**
   * NÚMERO DA LEITURA
   * Valor principal (ex: "850", "89", "12.6")
   */
  readingNumber: {
    fontSize: fonts.sizes.lg,         // Tamanho grande
    fontFamily: getFontFamily('Poppins', 'Bold'), // Fonte Poppins negrito
  },
  
  /**
   * UNIDADE DA LEITURA
   * Texto pequeno com unidade (ex: "rpm", "°C", "V")
   */
  readingUnit: {
    fontSize: fonts.sizes.xs,         // Tamanho extra pequeno
    fontFamily: getFontFamily('Poppins', 'Regular'), // Fonte Poppins normal
    color: colors.text.secondary,     // Cor secundária
    marginLeft: spacing.xs,           // Margem esquerda pequena
  },

  // ========================================
  // ESTILOS DAS MANUTENÇÕES AGENDADAS
  // ========================================
  
  /**
   * CONTAINER DAS MANUTENÇÕES
   * Container principal para lista de manutenções
   */
  scheduledContainer: {
    backgroundColor: colors.surface,   // Fundo claro
    borderRadius: borderRadius.md,    // Bordas arredondadas
    padding: spacing.md,              // Padding interno
    ...shadows.small,                 // Sombra pequena
  },
  
  /**
   * ITEM DE MANUTENÇÃO
   * Cada linha da lista de manutenções
   */
  scheduledItem: {
    flexDirection: 'row',             // Disposição horizontal
    justifyContent: 'space-between',  // Distribui espaço
    alignItems: 'center',             // Alinhamento vertical central
    paddingVertical: spacing.sm,      // Padding vertical
    borderBottomWidth: 1,             // Linha divisória inferior
    borderBottomColor: colors.secondary, // Cor da linha divisória
  },
  
  /**
   * INFORMAÇÕES DA MANUTENÇÃO
   * Container para nome e detalhes
   */
  scheduledInfo: {
    flex: 1,                          // Ocupa espaço disponível
  },
  
  /**
   * TÍTULO DA MANUTENÇÃO
   */
  scheduledTitle: {
    fontSize: fonts.sizes.md,         // Tamanho médio
    fontFamily: getFontFamily('Poppins', 'Medium'), // Fonte Poppins média
    color: colors.text.primary,       // Cor primária
    marginBottom: spacing.xs,         // Margem inferior
  },
  
  /**
   * DETALHES DA MANUTENÇÃO
   * Quilometragem e dias restantes
   */
  scheduledDetails: {
    fontSize: fonts.sizes.sm,         // Tamanho pequeno
    fontFamily: getFontFamily('Poppins', 'Regular'), // Fonte Poppins normal
    color: colors.text.secondary,     // Cor secundária
  },
  
  /**
   * CUSTO DA MANUTENÇÃO
   */
  scheduledCost: {
    fontSize: fonts.sizes.md,         // Tamanho médio
    fontFamily: getFontFamily('Poppins', 'Bold'), // Fonte Poppins negrito
    color: colors.primary,            // Cor primária do tema
  },

  // ========================================
  // ESTILOS DA INTERFACE BLUETOOTH
  // ========================================
  
  /**
   * CONTAINER DO BLUETOOTH
   * Container principal do botão de conexão
   */
  bluetoothContainer: {
    marginBottom: spacing.md,         // Margem inferior
  },
  
  /**
   * BOTÃO DE BLUETOOTH
   * Estilo base do botão de conexão
   */
  bluetoothButton: {
    flexDirection: 'row',             // Disposição horizontal
    alignItems: 'center',             // Alinhamento vertical central
    justifyContent: 'center',         // Centraliza conteúdo
    paddingVertical: spacing.md,      // Padding vertical
    paddingHorizontal: spacing.lg,    // Padding horizontal
    borderRadius: borderRadius.lg,    // Bordas arredondadas grandes
    borderWidth: 2,                   // Largura da borda
    ...shadows.small,                 // Sombra pequena
  },
  
  /**
   * BOTÃO CONECTADO
   * Estilo quando Bluetooth está conectado
   */
  bluetoothConnected: {
    backgroundColor: colors.success,   // Fundo verde
    borderColor: colors.success,      // Borda verde
  },
  
  /**
   * BOTÃO DESCONECTADO
   * Estilo quando Bluetooth está desconectado
   */
  bluetoothDisconnected: {
    backgroundColor: colors.surface,   // Fundo claro
    borderColor: colors.primary,      // Borda azul
  },
  
  /**
   * TEXTO DO BLUETOOTH
   * Estilo base do texto do botão
   */
  bluetoothText: {
    fontSize: fonts.sizes.md,         // Tamanho médio
    fontWeight: '600',                // Peso semi-negrito
    marginLeft: spacing.sm,           // Margem esquerda
  },
  
  /**
   * TEXTO CONECTADO
   * Cor do texto quando conectado
   */
  bluetoothTextConnected: {
    color: colors.surface,            // Cor clara (branco)
  },
  
  /**
   * TEXTO DESCONECTADO
   * Cor do texto quando desconectado
   */
  bluetoothTextDisconnected: {
    color: colors.primary,            // Cor primária (azul)
  },
  
  /**
   * INDICADOR DE STATUS
   * Bolinha verde que indica conexão ativa
   */
  statusIndicator: {
    width: 8,                         // Largura pequena
    height: 8,                        // Altura pequena (círculo)
    borderRadius: 4,                  // Bordas totalmente arredondadas
    backgroundColor: colors.surface,   // Cor clara
    marginLeft: spacing.sm,           // Margem esquerda
  },
});