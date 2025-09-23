// ========================================
// HOOK PERSONALIZADO - CARREGADOR DE FONTES
// ========================================

/**
 * IMPORTAÇÕES DAS BIBLIOTECAS DE FONTES
 * 
 * Este arquivo centraliza o carregamento de todas as fontes
 * personalizadas utilizadas na aplicação IntelliDriver.
 */

// Importação do hook useFonts do Expo para carregamento de fontes
import { useFonts } from 'expo-font';

// ========================================
// IMPORTAÇÕES DA FAMÍLIA POPPINS
// ========================================

/**
 * FONTE POPPINS - FAMÍLIA PRINCIPAL
 * 
 * Poppins é uma fonte geométrica moderna e limpa, ideal para interfaces digitais.
 * Características:
 * - Excelente legibilidade em telas
 * - Design moderno e amigável
 * - Boa performance em diferentes tamanhos
 * - Suporte completo a caracteres latinos
 * 
 * Importamos 5 pesos diferentes para criar hierarquia visual:
 */
import {
  Poppins_300Light,     // Peso 300 - para textos delicados e secundários
  Poppins_400Regular,   // Peso 400 - texto corpo padrão, parágrafos
  Poppins_500Medium,    // Peso 500 - subtítulos e informações importantes
  Poppins_600SemiBold,  // Peso 600 - títulos de seção, destaques
  Poppins_700Bold,      // Peso 700 - títulos principais, call-to-actions
} from '@expo-google-fonts/poppins';

// ========================================
// IMPORTAÇÕES DA FAMÍLIA MONTSERRAT
// ========================================

/**
 * FONTE MONTSERRAT - FAMÍLIA SECUNDÁRIA
 * 
 * Montserrat é uma fonte geométrica inspirada na tipografia urbana de Buenos Aires.
 * Características:
 * - Personalidade forte e distintiva
 * - Ideal para títulos e elementos de destaque
 * - Boa legibilidade em tamanhos grandes
 * - Complementa bem a Poppins
 * 
 * Mesmos 5 pesos para manter consistência:
 */
import {
  Montserrat_300Light,     // Peso 300 - variação delicada para títulos especiais
  Montserrat_400Regular,   // Peso 400 - títulos regulares
  Montserrat_500Medium,    // Peso 500 - títulos médios com destaque
  Montserrat_600SemiBold,  // Peso 600 - títulos importantes
  Montserrat_700Bold,      // Peso 700 - títulos principais e logotipos
} from '@expo-google-fonts/montserrat';

// ========================================
// HOOK PRINCIPAL - useFontLoader
// ========================================

/**
 * FUNÇÃO useFontLoader - HOOK PERSONALIZADO
 * 
 * Este hook customizado é responsável por carregar todas as fontes
 * personalizadas da aplicação de forma assíncrona e gerenciar
 * seu estado de carregamento.
 * 
 * Funcionalidades:
 * 1. Carrega todas as fontes necessárias em paralelo
 * 2. Retorna boolean indicando se carregamento foi concluído
 * 3. Mapeia nomes amigáveis para as fontes importadas
 * 4. Garante que fontes estejam disponíveis antes da renderização
 * 
 * @returns {boolean} fontsLoaded - true quando todas as fontes estão carregadas
 */
export function useFontLoader() {
  
  /**
   * HOOK useFonts - CARREGAMENTO DAS FONTES
   * 
   * O hook useFonts do Expo:
   * - Carrega fontes de forma assíncrona
   * - Retorna array com [fontsLoaded, error]
   * - Utiliza destructuring para pegar apenas fontsLoaded
   * - Mapeia nomes personalizados para as fontes importadas
   * 
   * Mapeamento de nomes:
   * - Nome amigável -> Fonte importada
   * - Facilita uso posterior com getFontFamily()
   */
  const [fontsLoaded] = useFonts({
    
    // ========================================
    // MAPEAMENTO FAMÍLIA POPPINS
    // ========================================
    'Poppins-Light': Poppins_300Light,       // 'Poppins-Light' -> Poppins peso 300
    'Poppins-Regular': Poppins_400Regular,   // 'Poppins-Regular' -> Poppins peso 400
    'Poppins-Medium': Poppins_500Medium,     // 'Poppins-Medium' -> Poppins peso 500
    'Poppins-SemiBold': Poppins_600SemiBold, // 'Poppins-SemiBold' -> Poppins peso 600
    'Poppins-Bold': Poppins_700Bold,         // 'Poppins-Bold' -> Poppins peso 700
    
    // ========================================
    // MAPEAMENTO FAMÍLIA MONTSERRAT
    // ========================================
    'Montserrat-Light': Montserrat_300Light,       // 'Montserrat-Light' -> Montserrat peso 300
    'Montserrat-Regular': Montserrat_400Regular,   // 'Montserrat-Regular' -> Montserrat peso 400
    'Montserrat-Medium': Montserrat_500Medium,     // 'Montserrat-Medium' -> Montserrat peso 500
    'Montserrat-SemiBold': Montserrat_600SemiBold, // 'Montserrat-SemiBold' -> Montserrat peso 600
    'Montserrat-Bold': Montserrat_700Bold,         // 'Montserrat-Bold' -> Montserrat peso 700
  });

  /**
   * RETORNO DO HOOK
   * 
   * Retorna o estado de carregamento das fontes:
   * - true: todas as fontes foram carregadas com sucesso
   * - false: ainda carregando ou houve erro no carregamento
   */
  return fontsLoaded;
}

// ========================================
// FUNÇÃO HELPER - getFontFamily
// ========================================

/**
 * FUNÇÃO getFontFamily - GERADOR DE NOMES DE FONTE
 * 
 * Função utilitária que gera o nome correto da fonte baseado
 * na família e peso desejados. Facilita o uso das fontes
 * carregadas em toda a aplicação.
 * 
 * Benefícios:
 * - Padronização de nomes de fonte
 * - Verificação de segurança contra valores undefined
 * - Fallback para fonte do sistema em caso de erro
 * - Interface simples e consistente
 * 
 * @param {string} fontFamily - Nome da família da fonte ('Poppins' ou 'Montserrat')
 * @param {string} weight - Peso da fonte ('Light', 'Regular', 'Medium', 'SemiBold', 'Bold')
 * @returns {string} - Nome completo da fonte no formato 'Família-Peso' ou 'System' como fallback
 * 
 * Exemplos de uso:
 * - getFontFamily('Poppins', 'Bold') → 'Poppins-Bold'
 * - getFontFamily('Montserrat', 'Medium') → 'Montserrat-Medium'
 * - getFontFamily() → 'Poppins-Regular' (valores padrão)
 */
export const getFontFamily = (fontFamily = 'Poppins', weight = 'Regular') => {
  
  // ========================================
  // VERIFICAÇÃO DE SEGURANÇA
  // ========================================
  
  /**
   * VALIDAÇÃO DE PARÂMETROS
   * 
   * Verifica se os parâmetros foram fornecidos corretamente.
   * Evita erros de runtime caso algum valor seja undefined ou null.
   */
  if (!fontFamily || !weight) {
    return 'System'; // Retorna fonte padrão do sistema como fallback seguro
  }
  
  // ========================================
  // GERAÇÃO DO NOME DA FONTE
  // ========================================
  
  /**
   * CONSTRUÇÃO DO NOME
   * 
   * Tenta construir o nome da fonte no formato esperado.
   * Utiliza try-catch para capturar qualquer erro inesperado
   * durante a concatenação ou processamento dos strings.
   */
  try {
    /**
     * FORMATAÇÃO DO NOME
     * 
     * Concatena família e peso com hífen no meio:
     * - 'Poppins' + '-' + 'Bold' = 'Poppins-Bold'
     * - 'Montserrat' + '-' + 'Light' = 'Montserrat-Light'
     * 
     * Este formato corresponde exatamente aos nomes mapeados
     * no objeto passado para useFonts().
     */
    return `${fontFamily}-${weight}`;
    
  } catch (error) {
    // ========================================
    // TRATAMENTO DE ERRO
    // ========================================
    
    /**
     * LOG DE ERRO
     * 
     * Registra o erro no console para debug, mas não quebra a aplicação.
     * Em produção, pode ser substituído por sistema de logging mais robusto.
     */
    console.warn('Erro ao gerar nome da fonte:', error);
    
    /**
     * FALLBACK SEGURO
     * 
     * Retorna fonte do sistema para garantir que o texto seja exibido,
     * mesmo que com fonte padrão, ao invés de quebrar a interface.
     */
    return 'System';
  }
};