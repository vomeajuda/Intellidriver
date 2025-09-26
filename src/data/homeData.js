// Dados mock para Home Dashboard

export const performanceMetrics = {
  co2Impact: {
    current: 27.4,
    previous: 31.8,
    change: +13.8,
    trend: 'up',
    description: 'CO₂ Economizado'
  }
};

export const monthlyChallenges = [
  {
    id: 1,
    title: 'Eco Master',
    description: 'Complete 50 viagens com economia de combustível',
    progress: 32,
    target: 50,
    points: 500,
    icon: 'leaf',
    color: '#4CAF50',
    completed: false
  },
  {
    id: 2,
    title: 'Velocidade Constante',
    description: 'Mantenha velocidade ideal por 1000 km',
    progress: 847,
    target: 1000,
    points: 400,
    icon: 'speedometer',
    color: '#2196F3',
    completed: false
  },
  {
    id: 3,
    title: 'Condutor Seguro',
    description: 'Complete 30 dias sem infrações de trânsito',
    progress: 23,
    target: 30,
    points: 750,
    icon: 'shield-checkmark',
    color: '#FF9800',
    completed: false
  },
  {
    id: 4,
    title: 'Explorador',
    description: 'Visite 15 locais diferentes este mês',
    progress: 15,
    target: 15,
    points: 300,
    icon: 'map',
    color: '#9C27B0',
    completed: true
  }
];

// ========================================
// DADOS MOCK - DICAS DE CONDUÇÃO
// ========================================

export const drivingTips = [
  {
    id: 1,
    title: 'Acelere Gradualmente',
    description: 'Acelerar suavemente pode economizar até 20% de combustível',
    icon: 'trending-up',
    category: 'Economia'
  },
  {
    id: 2,
    title: 'Mantenha Distância',
    description: 'Manter distância segura reduz frenagens bruscas',
    icon: 'resize',
    category: 'Segurança'
  },
  {
    id: 3,
    title: 'Velocidade Constante',
    description: 'Velocidade constante melhora eficiência do motor',
    icon: 'speedometer',
    category: 'Performance'
  },
  {
    id: 4,
    title: 'Planeje sua Rota',
    description: 'Rotas bem planejadas evitam trânsito e economizam tempo',
    icon: 'map',
    category: 'Planejamento'
  }
];

// ========================================
// DADOS MOCK - CONDIÇÕES ATUAIS
// ========================================

export const currentConditions = {
  weather: {
    condition: 'sunny',
    temperature: 24,
    description: 'Ensolarado'
  },
  ethanolPrice: {
    price: 4.12,
    description: 'Etanol',
    trend: 'stable' // up, down, stable
  },
  fuelPrice: {
    gasoline: 5.89,
    ethanol: 4.12,
    trend: 'stable' // up, down, stable
  }
};

// ========================================
// DADOS MOCK - CONQUISTAS RECENTES
// ========================================

export const recentAchievements = [
  {
    id: 1,
    title: 'Eco Master',
    description: 'Economizou 100L de combustível',
    icon: 'trophy',
    color: '#FFD700',
    dateEarned: '2025-09-20',
    isNew: true
  },
  {
    id: 2,
    title: 'Consistência',
    description: '7 dias seguidos dirigindo com eficiência',
    icon: 'checkmark-circle',
    color: '#4CAF50',
    dateEarned: '2025-09-18',
    isNew: false
  }
];

// ========================================
// DADOS MOCK - TOP 3 USUÁRIOS (SIMPLIFICADO)
// ========================================

export const topUsers = [
  { id: 1, name: 'Ana Silva', points: 65321, position: 1 },
  { id: 2, name: 'Carlos Mendes', points: 50000, position: 2 },
  { id: 3, name: 'Maria Santos', points: 45321, position: 3 }
];

// ========================================
// EXPORTAÇÃO DEFAULT COMBINADA
// ========================================

const homeData = {
  performanceMetrics,
  monthlyChallenges,
  drivingTips,
  currentConditions,
  recentAchievements,
  topUsers
};

export default homeData;