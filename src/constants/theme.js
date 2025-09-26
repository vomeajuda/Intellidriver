export const colors = {
  // Cores principais
  primary: '#7F9170',
  secondary: '#BFE59E',
  accent: '#ADBBA0',
  dark: '#51663E',
  darker: '#2A3C1A',
  logo: '#2c6c28',

  // Cores de interface
  background: '#F8F9F7',
  surface: '#FFFFFF',
  
  text: {
    primary: '#2A3C1A',
    secondary: '#51663E',
    light: '#7F9170',
    placeholder: '#ADBBA0'
  },
  
  // Cores de estado
  success: '#BFE59E',
  warning: '#ADBBA0',
  error: '#D32F2F',
  
  // Overlays
  overlay: 'rgba(42, 60, 26, 0.5)',
  shadow: 'rgba(42, 60, 26, 0.1)'
};

export const fonts = {
  
  // ========================================
  // FAMÍLIAS DE FONTES
  // ========================================
  
  /**
   * HIERARQUIA DE FONTES
   * Fontes escolhidas para legibilidade e modernidade
   */
  primary: 'Poppins',      // Fonte principal - moderna, legível, versátil
  secondary: 'Montserrat', // Fonte secundária - geométrica, para títulos
  
  // ========================================
  // ESCALA DE TAMANHOS
  // ========================================
  
  /**
   * TAMANHOS TIPOGRÁFICOS
   * Escala modular que garante harmonia visual
   * Baseada em progressão matemática para consistência
   */
  sizes: {
    xs: 10,      // Extra pequeno - labels, badges, informações mínimas
    sm: 12,      // Pequeno - textos auxiliares, legendas
    md: 14,      // Médio - texto corpo padrão, parágrafos
    lg: 16,      // Grande - textos importantes, subtítulos
    xl: 18,      // Extra grande - títulos de seção
    xxl: 24,     // Extra extra grande - títulos principais
    title: 32,   // Título - títulos de página, headers
    hero: 45     // Heroico - números grandes, estatísticas destacadas
  },
  
  // ========================================
  // PESOS DAS FONTES
  // ========================================
  
  /**
   * HIERARQUIA DE PESOS
   * Diferentes intensidades para criar contraste visual
   */
  weights: {
    light: '300',     // Leve - textos delicados, informações secundárias
    regular: '400',   // Regular - texto corpo padrão
    medium: '500',    // Médio - subtítulos, informações importantes
    semibold: '600',  // Semi-negrito - títulos de seção
    bold: '700'       // Negrito - títulos principais, call-to-actions
  }
};

// ========================================
// SISTEMA DE ESPAÇAMENTOS
// ========================================

/**
 * OBJETO spacing - ESCALA DE ESPAÇAMENTOS
 * 
 * Sistema baseado em múltiplos de 4px (unidade base do design),
 * garantindo alinhamento consistente e ritmo visual harmônico.
 * 
 * Progressão: 4, 8, 16, 24, 32, 48 (base 4 multiplicada)
 */
export const spacing = {
  xs: 4,       // Extra pequeno - espaçamentos mínimos, detalhes
  sm: 8,       // Pequeno - espaçamentos internos, padding pequeno
  md: 16,      // Médio - espaçamento padrão entre elementos
  lg: 24,      // Grande - espaçamentos importantes, seções
  xl: 32,      // Extra grande - separação de blocos principais
  xxl: 48      // Extra extra grande - espaçamentos máximos, margens de página
};

// ========================================
// SISTEMA DE BORDAS E RAIOS
// ========================================

/**
 * OBJETO borderRadius - RAIOS DE BORDA
 * 
 * Define diferentes níveis de arredondamento para criar
 * hierarquia visual e modernidade nos componentes.
 * 
 * Progressão suave do quadrado ao circular
 */
export const borderRadius = {
  xs: 4,       // Extra pequeno - bordas sutis, botões pequenos
  sm: 8,       // Pequeno - cards pequenos, badges
  md: 12,      // Médio - cards padrão, inputs
  lg: 16,      // Grande - cards principais, containers importantes
  xl: 24,      // Extra grande - elementos destacados
  round: 50    // Circular - avatars, botões redondos, ícones circulares
};

// ========================================
// SISTEMA DE SOMBRAS E ELEVAÇÃO
// ========================================

/**
 * OBJETO shadows - SISTEMA DE ELEVAÇÃO
 * 
 * Define diferentes níveis de sombra para criar profundidade
 * e hierarquia visual, seguindo Material Design principles.
 * 
 * Cada nível tem:
 * - shadowColor: cor da sombra
 * - shadowOffset: deslocamento x,y da sombra
 * - shadowOpacity: transparência da sombra
 * - shadowRadius: desfoque da sombra
 * - elevation: elevação para Android
 */
export const shadows = {
  
  /**
   * SOMBRA PEQUENA
   * Para elementos sutis: cards pequenos, botões
   */
  small: {
    shadowColor: colors.shadow,           // Cor base da sombra
    shadowOffset: { width: 0, height: 2 }, // Deslocamento: 0px horizontal, 2px vertical
    shadowOpacity: 0.1,                   // 10% de opacidade
    shadowRadius: 4,                      // 4px de desfoque
    elevation: 2                          // Elevação Android nível 2
  },
  
  /**
   * SOMBRA MÉDIA
   * Para elementos importantes: cards principais, modais
   */
  medium: {
    shadowColor: colors.shadow,           // Cor base da sombra
    shadowOffset: { width: 0, height: 4 }, // Deslocamento: 0px horizontal, 4px vertical
    shadowOpacity: 0.15,                  // 15% de opacidade
    shadowRadius: 8,                      // 8px de desfoque
    elevation: 4                          // Elevação Android nível 4
  },
  
  /**
   * SOMBRA GRANDE
   * Para elementos de destaque: FABs, elementos flutuantes
   */
  large: {
    shadowColor: colors.shadow,           // Cor base da sombra
    shadowOffset: { width: 0, height: 8 }, // Deslocamento: 0px horizontal, 8px vertical
    shadowOpacity: 0.2,                   // 20% de opacidade
    shadowRadius: 16,                     // 16px de desfoque
    elevation: 8                          // Elevação Android nível 8
  }
};