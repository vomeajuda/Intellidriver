// ========================================
// DADOS MOCK - PROFILE STATS - INTELLIDRIVER
// ========================================

/**
 * Dados mock centralizados para a tela de ProfileStats
 * Inclui informações do usuário, estatísticas completas e conquistas
 */

// ========================================
// DADOS PRINCIPAIS DO USUÁRIO
// ========================================

export const userData = {
  name: 'Leonardo Godoy',
  profileImage: null,
  ecocoins: 1850,
  memberSince: 'Janeiro 2024',
  
  // ========================================
  // ESTATÍSTICAS COMPLETAS
  // ========================================
  
  stats: {
    totalTrips: 124,
    totalDistance: '2,840 km',
    co2Saved: '45.2 kg',
    fuelSaved: '186 L',
    points: 1850,
    ranking: 23,
    avgEcoScore: 85,
    bestMonth: 'Agosto',
    avgSpeed: '48.5 km/h',
    safetyScore: 92
  },
  
  // ========================================
  // CONQUISTAS EXPANDIDAS
  // ========================================
  
  achievements: [
    { 
      id: 1, 
      icon: 'leaf', 
      title: 'Eco Warrior', 
      description: 'Economizou 50kg de CO²', 
      unlocked: true,
      category: 'Sustentabilidade',
      earnedDate: '15/08/2024'
    },
    { 
      id: 2, 
      icon: 'speedometer', 
      title: 'Speed Master', 
      description: 'Manteve velocidade ideal por 1000km', 
      unlocked: true,
      category: 'Performance',
      earnedDate: '22/07/2024'
    },
    { 
      id: 3, 
      icon: 'trophy', 
      title: 'Top Driver', 
      description: 'Entre os 50 melhores motoristas', 
      unlocked: true,
      category: 'Ranking',
      earnedDate: '05/09/2024'
    },
    { 
      id: 4, 
      icon: 'star', 
      title: 'Consistent', 
      description: '30 dias consecutivos de condução eficiente', 
      unlocked: true,
      category: 'Consistência',
      earnedDate: '12/08/2024'
    },
    { 
      id: 5, 
      icon: 'flame', 
      title: 'Hot Streak', 
      description: '10 viagens perfeitas seguidas', 
      unlocked: false,
      category: 'Performance',
      earnedDate: null
    },
    { 
      id: 6, 
      icon: 'diamond', 
      title: 'Diamond Elite', 
      description: 'Atingir 5000 pontos totais', 
      unlocked: false,
      category: 'Elite',
      earnedDate: null
    },
    { 
      id: 7, 
      icon: 'shield-checkmark', 
      title: 'Safety Champion', 
      description: '100 viagens sem infrações', 
      unlocked: true,
      category: 'Segurança',
      earnedDate: '28/08/2024'
    },
    { 
      id: 8, 
      icon: 'map', 
      title: 'Explorer', 
      description: 'Visitou 20 cidades diferentes', 
      unlocked: false,
      category: 'Exploração',
      earnedDate: null
    },
    { 
      id: 9, 
      icon: 'time', 
      title: 'Early Bird', 
      description: '50 viagens antes das 7h', 
      unlocked: true,
      category: 'Hábitos',
      earnedDate: '10/07/2024'
    },
    { 
      id: 10, 
      icon: 'thunderstorm', 
      title: 'Weather Master', 
      description: 'Condução segura em condições adversas', 
      unlocked: false,
      category: 'Habilidade',
      earnedDate: null
    },
    { 
      id: 11, 
      icon: 'heart', 
      title: 'Community Hero', 
      description: 'Ajudou 10 motoristas iniciantes', 
      unlocked: true,
      category: 'Comunidade',
      earnedDate: '03/09/2024'
    },
    { 
      id: 12, 
      icon: 'rocket', 
      title: 'Efficiency Pro', 
      description: 'Consumo abaixo de 6L/100km por 1 mês', 
      unlocked: false,
      category: 'Eficiência',
      earnedDate: null
    }
  ]
};

// ========================================
// EXPORTAÇÃO PADRÃO
// ========================================

export default userData;