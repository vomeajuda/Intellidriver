// Dados mock para CarsAnalytics - simulação de scanner OBD-II

export const mockData = {
  vehicleHealth: {
    overallStatus: 'WARNING',
    healthScore: 72,
    lastMaintenance: '15/08/2024',
    nextMaintenance: '15/10/2024',
    mileage: 45820
  },
  
  maintenanceAlerts: [
    {
      id: 1,                                    // Identificador único do alerta
      type: 'oil_change',                       // Tipo de manutenção (usado para ícones)
      priority: 'high',                         // Prioridade: 'high', 'medium', 'low'
      title: 'Troca de Óleo Vencida',         // Título do alerta
      description: 'Última troca há 8.000 km. Recomendado a cada 5.000 km.', // Descrição detalhada
      daysOverdue: 15,                         // Dias em atraso
      estimatedCost: 120,                      // Custo estimado em reais
      urgency: 'urgent'                        // Nível de urgência
    },
    {
      id: 2,
      type: 'brake_pads',
      priority: 'medium',
      title: 'Pastilhas de Freio',
      description: 'Desgaste detectado. Substituir em até 2.000 km.',
      remainingKm: 1800,                       // Quilômetros restantes antes da troca
      estimatedCost: 250,
      urgency: 'moderate'
    },
    {
      id: 3,
      type: 'air_filter',
      priority: 'low',
      title: 'Filtro de Ar Sujo',
      description: 'Filtro obstruído. Pode afetar performance e consumo.',
      efficiency: 65,                          // Porcentagem de eficiência atual
      estimatedCost: 45,
      urgency: 'low'
    },
    {
      id: 4,
      type: 'battery',
      priority: 'high',
      title: 'Bateria Fraca',
      description: 'Voltagem baixa detectada. Risco de falha.',
      voltage: 11.8,                           // Voltagem atual da bateria
      estimatedCost: 180,
      urgency: 'urgent'
    }
  ],

  // ========================================
  // SEÇÃO: ERROS ATIVOS DO OBD-II
  // ========================================
  
  /**
   * ARRAY activeErrors
   * 
   * Lista de códigos de erro ativos detectados pelo sistema OBD-II.
   * Cada erro contém código DTC, descrição, severidade, impacto
   * e ações recomendadas para correção.
   */
  activeErrors: [
    {
      code: 'P0171',                           // Código DTC (Diagnostic Trouble Code)
      description: 'Sistema muito pobre (Banco 1)', // Descrição do erro
      severity: 'medium',                      // Severidade: 'high', 'medium', 'low'
      impact: 'Aumento do consumo, possível dano ao catalisador', // Impacto no veículo
      recommendedAction: 'Verificar sensores de oxigênio e injetores', // Ação recomendada
      estimatedRepairCost: 350,               // Custo estimado do reparo
      detected: '18/09/2024'                  // Data de detecção do erro
    },
    {
      code: 'P0300',
      description: 'Falha aleatória de ignição',
      severity: 'high',
      impact: 'Perda de potência, tremores, danos ao motor',
      recommendedAction: 'Verificar velas, bobinas e cabos de ignição',
      estimatedRepairCost: 280,
      detected: '19/09/2024'
    }
  ],

  // ========================================
  // SEÇÃO: LEITURAS BÁSICAS OBD-II
  // ========================================
  
  /**
   * OBJETO basicReadings
   * 
   * Contém leituras em tempo real dos sensores do veículo,
   * organizadas por categoria (motor, combustível, elétrica, emissões).
   */
  basicReadings: {
    
    /**
     * SUB-OBJETO engine - Dados do motor
     */
    engine: {
      rpm: 850,           // Rotações por minuto (marcha lenta normal: 800-900)
      coolantTemp: 89,    // Temperatura do líquido de arrefecimento em °C
      oilTemp: 95,        // Temperatura do óleo do motor em °C
      engineLoad: 15      // Carga do motor em porcentagem
    },
    
    /**
     * SUB-OBJETO fuel - Dados do combustível
     */
    fuel: {
      level: 75,          // Nível de combustível em porcentagem
      consumption: 8.2,   // Consumo atual em km/l
      pressure: 3.8       // Pressão do combustível em bar
    },
    
    /**
     * SUB-OBJETO electrical - Sistema elétrico
     */
    electrical: {
      batteryVoltage: 11.8,      // Voltagem da bateria (normal: 12.6V)
      alternatorOutput: 14.2     // Saída do alternador em volts
    },
    
    /**
     * SUB-OBJETO emissions - Sistema de emissões
     */
    emissions: {
      lambdaSensor1: 0.98,       // Sensor lambda/oxigênio banco 1
      lambdaSensor2: 1.02,       // Sensor lambda/oxigênio banco 2
      catalystTemp: 520          // Temperatura do catalisador em °C
    }
  },

  // ========================================
  // SEÇÃO: MANUTENÇÕES PROGRAMADAS
  // ========================================
  
  /**
   * ARRAY scheduledMaintenance
   * 
   * Lista de manutenções programadas baseadas na quilometragem,
   * incluindo dias restantes e custos estimados.
   */
  scheduledMaintenance: [
    { 
      item: 'Revisão geral',                    // Nome da manutenção
      km: 50000,                                // Quilometragem para realizar
      daysRemaining: 25,                        // Dias restantes estimados
      cost: 450                                 // Custo estimado
    },
    { 
      item: 'Troca do filtro de combustível', 
      km: 48000, 
      daysRemaining: 45, 
      cost: 80 
    },
    { 
      item: 'Alinhamento e balanceamento', 
      km: 46000, 
      daysRemaining: 60, 
      cost: 120 
    }
  ]
};

// ========================================
// EXPORTAÇÃO DEFAULT
// ========================================

export default mockData;