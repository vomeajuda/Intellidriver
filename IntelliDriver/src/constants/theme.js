// ========================================
// SISTEMA DE TEMA - INTELLIDRIVER
// ========================================

/**
 * ARQUIVO DE CONFIGURAÇÃO DE TEMA
 * 
 * Este arquivo centraliza todas as constantes visuais da aplicação,
 * garantindo consistência de design e facilidade de manutenção.
 * 
 * Benefícios da centralização:
 * - Consistência visual em toda a aplicação
 * - Facilidade para alterar tema globalmente
 * - Reutilização de valores padronizados
 * - Manutenção simplificada do design system
 * - Possibilidade de implementar temas diferentes (claro/escuro)
 */

// ========================================
// PALETA DE CORES - IDENTIDADE VISUAL
// ========================================

/**
 * OBJETO colors - SISTEMA DE CORES
 * 
 * Define toda a paleta de cores baseada na identidade visual IntelliDriver.
 * Utiliza tons de verde como cor principal, transmitindo:
 * - Sustentabilidade (tema eco-friendly)
 * - Tecnologia verde (eco-driving)
 * - Natureza e meio ambiente
 * - Eficiência energética
 */
export const colors = {
  
  // ========================================
  // CORES PRINCIPAIS DA MARCA
  // ========================================
  
  /**
   * CORES PRIMÁRIAS
   * Hierarquia de verdes que define a personalidade visual da marca
   */
  primary: '#7F9170',      // Verde principal - cor dominante da interface
  secondary: '#BFE59E',    // Verde claro - elementos secundários e highlights
  accent: '#ADBBA0',       // Verde acinzentado - detalhes e elementos neutros
  dark: '#51663E',         // Verde escuro - textos e elementos importantes
  darker: '#2A3C1A',       // Verde mais escuro - títulos e contrastes máximos

  // ========================================
  // CORES AUXILIARES DE INTERFACE
  // ========================================
  
  /**
   * CORES DE FUNDO E SUPERFÍCIE
   * Cores neutras para criação de hierarquia visual
   */
  background: '#F8F9F7',   // Fundo claro - cor de fundo principal da app
  surface: '#FFFFFF',      // Superfície branca - cards, modais, containers
  
  /**
   * SISTEMA DE CORES DE TEXTO
   * Hierarquia de cores para diferentes tipos de texto
   */
  text: {
    primary: '#2A3C1A',    // Texto principal - títulos e informações importantes
    secondary: '#51663E',  // Texto secundário - subtítulos e informações auxiliares
    light: '#7F9170',      // Texto claro - informações menos importantes
    placeholder: '#ADBBA0' // Placeholder - textos de exemplo em inputs
  },
  
  // ========================================
  // CORES DE ESTADO E FEEDBACK
  // ========================================
  
  /**
   * CORES SEMÂNTICAS
   * Cores que comunicam estados e ações ao usuário
   */
  success: '#BFE59E',      // Verde claro - sucesso, confirmação, economia de combustível
  warning: '#ADBBA0',      // Verde neutro - atenção, informações importantes
  error: '#D32F2F',        // Vermelho - erros, alertas críticos, problemas
  
  // ========================================
  // CORES COM TRANSPARÊNCIA
  // ========================================
  
  /**
   * OVERLAYS E SOMBRAS
   * Cores semi-transparentes para sobreposições e efeitos
   */
  overlay: 'rgba(42, 60, 26, 0.5)',    // Overlay escuro - modais e sobreposições
  shadow: 'rgba(42, 60, 26, 0.1)'      // Sombra sutil - cards e elevação
};

// ========================================
// SISTEMA TIPOGRÁFICO
// ========================================

/**
 * OBJETO fonts - CONFIGURAÇÃO DE FONTES
 * 
 * Define hierarquia tipográfica completa com:
 * - Famílias de fontes (primária e secundária)
 * - Tamanhos padronizados (do menor ao maior)
 * - Pesos disponíveis (light ao bold)
 */
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