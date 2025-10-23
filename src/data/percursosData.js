// ========================================
// DADOS MOCK - PERCURSOS E VIAGENS
// ========================================

/**
 * ARQUIVO DE DADOS DOS PERCURSOS
 * 
 * Este arquivo contém dados simulados de percursos/viagens realizadas
 * pelo usuário, organizados por data. Em uma aplicação real, estes
 * dados viriam de:
 * - API backend
 * - Banco de dados local (SQLite)
 * - Sistema de GPS/tracking
 * - Integração com sensores do veículo
 * 
 * Estrutura dos dados:
 * - Chave: data no formato 'YYYY-MM-DD'
 * - Valor: array de percursos realizados naquela data
 * 
 * Cada percurso contém informações detalhadas sobre:
 * - Identificação (id, nome, imagem)
 * - Tempo (horário de saída)
 * - Distância e duração
 * - Performance (velocidade média, combustível)
 * - Custo financeiro
 * - Rota detalhada
 * - Observações do motorista
 * - Pontuação ecológica (ecoCoins)
 */

// ========================================
// OBJETO PRINCIPAL - DADOS DOS PERCURSOS
// ========================================

/**
 * ESTRUTURA percursosData
 * 
 * Objeto JavaScript onde cada propriedade representa uma data
 * e seu valor é um array de percursos realizados naquele dia.
 * 
 * Formato da chave: 'YYYY-MM-DD' (ISO 8601)
 * Formato do valor: Array<PercursoObject>
 */
export const percursosData = {
  
  // ========================================
  // PERCURSOS DE 20/09/2025 (SEXTA-FEIRA)
  // ========================================
  
  /**
   * DIA COMPLETO COM TRÊS PERCURSOS
   * 
   * Simula um dia típico de trabalho com:
   * 1. Ida ao trabalho (manhã)
   * 2. Ida à academia (noite)
   * 3. Volta para casa (noite)
   */
  '2025-09-20': [
    
    /**
     * PERCURSO 1: CASA → TRABALHO
     * 
     * Percurso matinal típico no horário de pico.
     * Características:
     * - Distância média para trabalho urbano
     * - Velocidade reduzida devido ao trânsito
     * - EcoCoins positivos (direção econômica)
     * - Rota bem definida com observações de trânsito
     */
    { 
      id: '1',                                           // Identificador único do percurso
      img: 'https://picsum.photos/200/200?20',          // Imagem ilustrativa (placeholder)
      horario: '08:30',                                 // Horário de início
      distancia: '12.5 km',                             // Distância total percorrida
      duracao: '25 min',                                // Tempo total de viagem
      velocidadeMedia: '30 km/h',                       // Velocidade média calculada
      combustivel: '1.2L',                              // Consumo de combustível
      custo: 'R$ 6,50',                                 // Custo estimado da viagem
      rota: 'Av. Principal → Rua das Flores → Centro',  // Rota detalhada
      observacoes: 'Trânsito moderado no horário de pico', // Observações do motorista
      ecoCoins: 45                                      // Pontuação ecológica positiva
    },
    
    /**
     * PERCURSO 2: TRABALHO → ACADEMIA
     * 
     * Percurso noturno curto e eficiente.
     * Características:
     * - Distância curta (3.2 km)
     * - Boa velocidade média sem trânsito
     * - Baixo consumo de combustível
     * - EcoCoins moderados
     */
    { 
      id: '2', 
      img: 'https://picsum.photos/200/200?21', 
      horario: '18:45', 
      distancia: '3.2 km',
      duracao: '8 min',
      velocidadeMedia: '24 km/h',
      combustivel: '0.3L',
      custo: 'R$ 1,65',
      rota: 'Centro → Av. Esportiva',
      observacoes: 'Caminho sem trânsito',
      ecoCoins: 28
    },
    
    /**
     * PERCURSO 3: ACADEMIA → CASA
     * 
     * Percurso de retorno com maior distância.
     * Características:
     * - Rota alternativa mais longa
     * - Uso de rodovia (velocidade maior)
     * - Maior pontuação ecoCoins
     * - Trânsito leve no período noturno
     */
    { 
      id: '3', 
      img: 'https://picsum.photos/200/200?22', 
      horario: '20:15', 
      distancia: '15.1 km',
      duracao: '32 min',
      velocidadeMedia: '28 km/h',
      combustivel: '1.4L',
      custo: 'R$ 7,35',
      rota: 'Av. Esportiva → Rodovia → Av. Principal',
      observacoes: 'Trânsito leve no retorno',
      ecoCoins: 52
    },
  ],
  // ========================================
  // PERCURSOS DE 19/09/2025 (QUINTA-FEIRA)
  // ========================================
  
  /**
   * DIA DE COMPRAS E LAZER
   * 
   * Simula um dia com atividades de compras, incluindo:
   * 1. Ida ao shopping (tarde)
   * 2. Compras no supermercado
   * 3. Retorno com trânsito intenso (EcoCoins negativos)
   */
  '2025-09-19': [
    
    /**
     * PERCURSO: CASA → SHOPPING
     * 
     * Saída para atividades de lazer no período da tarde.
     * Características:
     * - Horário fora do pico (14:20)
     * - Trânsito fluindo bem
     * - Boa pontuação ecológica
     */
    { 
      id: '4', 
      img: 'https://picsum.photos/200/200?23', 
      horario: '14:20', 
      distancia: '8.7 km',
      duracao: '18 min',
      velocidadeMedia: '29 km/h',
      combustivel: '0.8L',
      custo: 'R$ 4,20',
      rota: 'Av. Principal → Shopping Center',
      observacoes: 'Trânsito fluindo bem',
      ecoCoins: 38
    },
    
    /**
     * PERCURSO: SHOPPING → SUPERMERCADO
     * 
     * Percurso curto entre estabelecimentos comerciais.
     * Características:
     * - Distância muito curta (2.1 km)
     * - Velocidade baixa (área comercial)
     * - Consumo mínimo de combustível
     */
    { 
      id: '5', 
      img: 'https://picsum.photos/200/200?24', 
      horario: '16:30', 
      distancia: '2.1 km',
      duracao: '6 min',
      velocidadeMedia: '21 km/h',
      combustivel: '0.2L',
      custo: 'R$ 1,05',
      rota: 'Via comercial direta',
      observacoes: 'Percurso rápido',
      ecoCoins: 22
    },
    
    /**
     * PERCURSO: SUPERMERCADO → CASA
     * 
     * Retorno no horário de pico com trânsito intenso.
     * Características:
     * - EcoCoins negativos (-15) - direção ineficiente
     * - Trânsito intenso no fim de tarde
     * - Velocidade baixa devido ao congestionamento
     * - Maior consumo devido às paradas e acelerações
     */
    { 
      id: '6', 
      img: 'https://picsum.photos/200/200?25', 
      horario: '17:45', 
      distancia: '9.3 km',
      duracao: '22 min',
      velocidadeMedia: '25 km/h',
      combustivel: '0.9L',
      custo: 'R$ 4,70',
      rota: 'Via residencial → Av. Principal',
      observacoes: 'Trânsito intenso no fim de tarde',
      ecoCoins: -15    // Pontuação negativa - direção menos ecológica
    },
  ],
  // ========================================
  // PERCURSOS DOS DIAS ANTERIORES
  // ========================================
  
  /**
   * PERCURSOS DE 18/09/2025 (QUARTA-FEIRA)
   * 
   * Dia focado em atividades educacionais.
   * Padrão: Casa → Escola → Biblioteca → Casa
   * 
   * Nota: Dados resumidos para demonstração.
   * Em implementação real, teriam mesma estrutura detalhada.
   */
  '2025-09-18': [
    { 
      id: '7', 
      img: 'https://picsum.photos/200/200?26', 
      horario: '07:15', 
      distancia: '6.8 km', 
      duracao: '18 min',
      velocidadeMedia: '22 km/h',
      combustivel: '0.9L',
      ecoCoins: 31 
    },
    { 
      id: '8', 
      img: 'https://picsum.photos/200/200?27', 
      horario: '16:00', 
      distancia: '1.5 km', 
      duracao: '6 min',
      velocidadeMedia: '15 km/h',
      combustivel: '0.1L',
      ecoCoins: 18 
    },
    { 
      id: '9', 
      img: 'https://picsum.photos/200/200?28', 
      horario: '18:30', 
      distancia: '7.9 km', 
      duracao: '20 min',
      velocidadeMedia: '24 km/h',
      combustivel: '1.1L',
      ecoCoins: 35 
    },
  ],
  
  /**
   * PERCURSOS DE 17/09/2025 (TERÇA-FEIRA)
   * 
   * Dia com atividades de saúde.
   * Padrão: Casa → Hospital → Farmácia → Casa
   * 
   * Características:
   * - Percursos relacionados à saúde
   * - Distâncias variadas
   * - Boa pontuação ecológica geral
   */
  '2025-09-17': [
    { 
      id: '10', 
      img: 'https://picsum.photos/200/200?29', 
      horario: '09:00', 
      distancia: '11.2 km', 
      duracao: '25 min',
      velocidadeMedia: '27 km/h',
      combustivel: '1.3L',
      ecoCoins: 48 
    },
    { 
      id: '11', 
      img: 'https://picsum.photos/200/200?30', 
      horario: '11:30', 
      distancia: '0.8 km', 
      duracao: '4 min',
      velocidadeMedia: '12 km/h',
      combustivel: '0.05L',
      ecoCoins: 12 
    },
    { 
      id: '12', 
      img: 'https://picsum.photos/200/200?31', 
      horario: '12:15', 
      distancia: '11.7 km', 
      duracao: '28 min',
      velocidadeMedia: '25 km/h',
      combustivel: '1.5L',
      ecoCoins: 50 
    },
  ],
  
  
  /**
   * PERCURSOS DE 15/09/2025 (DOMINGO)
   * 
   * Dia de lazer com atividades matinais.
   * Padrão: Casa → Parque → Padaria → Casa
   */
  '2025-09-15': [
    { 
      id: '17', 
      img: 'https://picsum.photos/200/200?36', 
      horario: '06:30', 
      distancia: '4.2 km', 
      duracao: '12 min',
      velocidadeMedia: '21 km/h',
      combustivel: '0.5L',
      ecoCoins: 26 
    },
    { 
      id: '18', 
      img: 'https://picsum.photos/200/200?37', 
      horario: '08:15', 
      distance: '1.8 km', 
      distancia: '1.8 km', 
      duracao: '5 min',
      velocidadeMedia: '18 km/h',
      combustivel: '0.08L',
      ecoCoins: 20 
    },
    { 
      id: '19', 
      img: 'https://picsum.photos/200/200?38', 
      horario: '09:00', 
      distancia: '5.1 km', 
      duracao: '14 min',
      velocidadeMedia: '22 km/h',
      combustivel: '0.7L',
      ecoCoins: 28 
    },
  ],
  
  /**
   * PERCURSOS DE 14/09/2025 (SÁBADO)
   * 
   * Dia de viagem - percursos para aeroporto e hotel.
   * 
   * Características:
   * - Percurso muito longo para aeroporto (35.2 km)
   * - Horário muito cedo (05:30)
   * - Chegada muito tarde (22:45)
   * - Sem dados de ecoCoins (viagem especial)
   */
  '2025-09-14': [
    { 
      id: '20', 
      img: 'https://picsum.photos/200/200?39', 
      horario: '05:30', 
      distancia: '35.2 km',
      duracao: '45 min',
      velocidadeMedia: '47 km/h',
      combustivel: '4.5L'
    },
    { 
      id: '21', 
      img: 'https://picsum.photos/200/200?40', 
      horario: '22:45', 
      distancia: '12.1 km',
      duracao: '22 min',
      velocidadeMedia: '33 km/h',
      combustivel: '1.6L'
    },
  ],
  
  /**
   * PERCURSOS DE 13/09/2025 (SEXTA-FEIRA)
   * 
   * Dia dedicado a cuidados com animais de estimação.
   * Padrão: Casa → Veterinária → Pet Shop → Casa
   */
  '2025-09-13': [
    { 
      id: '22', 
      img: 'https://picsum.photos/200/200?41', 
      horario: '10:00', 
      distancia: '7.5 km',
      duracao: '16 min',
      velocidadeMedia: '28 km/h',
      combustivel: '0.9L'
    },
    { 
      id: '23', 
      img: 'https://picsum.photos/200/200?42', 
      horario: '11:30', 
      distancia: '2.3 km', 
      duracao: '7 min',
      velocidadeMedia: '20 km/h',
      combustivel: '0.12L',
      ecoCoins: 10
    },
    { 
      id: '24', 
      img: 'https://picsum.photos/200/200?43', 
      horario: '12:45', 
      distancia: '8.9 km',
      duracao: '20 min',
      velocidadeMedia: '26 km/h',
      combustivel: '1.0L'
    },
  ],
  '2025-09-12': [
    { 
      id: '25', 
      img: 'https://picsum.photos/200/200?44', 
      horario: '08:30', 
      distancia: '12.5 km',
      duracao: '25 min',
      velocidadeMedia: '30 km/h',
      combustivel: '1.2L'
    },
    { 
      id: '26', 
      img: 'https://picsum.photos/200/200?45', 
      horario: '18:30', 
      distancia: '5.7 km',
      duracao: '12 min',
      velocidadeMedia: '28 km/h',
      combustivel: '0.6L'
    },
    { 
      id: '27', 
      img: 'https://picsum.photos/200/200?46', 
      horario: '19:45', 
      distancia: '14.2 km',
      duracao: '30 min',
      velocidadeMedia: '28 km/h',
      combustivel: '1.6L'
    },
  ],
  
  /**
   * PERCURSOS DE 11/09/2025 (QUARTA-FEIRA)
   * 
   * Dia com academia antes do trabalho.
   * Padrão: Casa → Academia → Trabalho → Casa
   * 
   * Características:
   * - Academia muito cedo (06:00)
   * - Otimização de rota academia-trabalho
   */
  '2025-09-11': [
    { 
      id: '28', 
      img: 'https://picsum.photos/200/200?47', 
      horario: '06:00', 
      distancia: '3.2 km',
      duracao: '9 min',
      velocidadeMedia: '21 km/h',
      combustivel: '0.25L'
    },
    { 
      id: '29', 
      img: 'https://picsum.photos/200/200?48', 
      horario: '07:30', 
      distancia: '9.8 km',
      duracao: '22 min',
      velocidadeMedia: '27 km/h',
      combustivel: '1.0L'
    },
    { 
      id: '30', 
      img: 'https://picsum.photos/200/200?49', 
      horario: '17:30', 
      distancia: '12.5 km',
      duracao: '28 min',
      velocidadeMedia: '26 km/h',
      combustivel: '1.5L'
    },
  ],
  
  /**
   * PERCURSOS DE 10/09/2025 (TERÇA-FEIRA)
   * 
   * Dia escolar com ida ao centro.
   * Padrão: Casa → Escola → Centro → Casa
   * 
   * Características:
   * - Rota escola-centro (11.5 km)
   * - Retorno direto centro-casa (18.3 km)
   */
  '2025-09-10': [
    { 
      id: '31', 
      img: 'https://picsum.photos/200/200?50', 
      horario: '07:15', 
      distancia: '6.8 km',
      duracao: '18 min',
      velocidadeMedia: '22 km/h',
      combustivel: '0.9L'
    },
    { 
      id: '32', 
      img: 'https://picsum.photos/200/200?51', 
      horario: '16:00', 
      distancia: '11.5 km',
      duracao: '30 min',
      velocidadeMedia: '23 km/h',
      combustivel: '1.6L'
    },
    { 
      id: '33', 
      img: 'https://picsum.photos/200/200?52', 
      horario: '18:30', 
      distancia: '18.3 km',
      duracao: '42 min',
      velocidadeMedia: '26 km/h',
      combustivel: '2.1L'
    },
  ],
};

// ========================================
// FUNÇÕES HELPER - UTILITÁRIOS DE DATA
// ========================================

/**
 * FUNÇÃO getPercursosByDate
 * 
 * Função utilitária que retorna os percursos de uma data específica.
 * Funciona como um "getter" seguro que nunca quebra a aplicação.
 * 
 * Funcionalidades:
 * - Busca percursos por string de data
 * - Retorna array vazio se data não existir
 * - Evita erros de propriedade undefined
 * - Interface simples e consistente
 * 
 * @param {string} dateString - Data no formato 'YYYY-MM-DD'
 * @returns {Array} - Array de percursos ou array vazio
 * 
 * Exemplos de uso:
 * - getPercursosByDate('2025-09-20') → [percurso1, percurso2, ...]
 * - getPercursosByDate('2025-12-25') → [] (data não existe)
 * - getPercursosByDate(null) → [] (parâmetro inválido)
 */
// Imagem padrão para todos os percursos (arquivo local em src/assets/imgPercurso.png)
export const defaultPercursoImg = 'imgPercurso.png';

export const getPercursosByDate = (dateString) => {
  /**
   * OPERADOR DE COALESCÊNCIA NULA
   * 
   * Utiliza o operador ?? que funciona assim:
   * - Se percursosData[dateString] existir: retorna o array
   * - Se for undefined ou null: retorna array vazio []
   * 
   * Aqui garantimos também que a imagem inicial de cada percurso
   * seja a imagem padrão local, evitando imagens aleatórias.
   */
  const list = percursosData[dateString] || [];
  return list.map(p => ({ ...p, img: defaultPercursoImg }));
};

// ========================================
// FUNÇÃO formatDateToString
// ========================================

/**
 * FUNÇÃO formatDateToString
 * 
 * Função versátil que converte diferentes tipos de data
 * para string no formato ISO (YYYY-MM-DD).
 * 
 * Suporta múltiplos formatos de entrada:
 * - String já formatada
 * - Objeto de calendário com propriedade dateString
 * - Objeto Date nativo do JavaScript
 * - Valores null/undefined
 * 
 * @param {string|Object|Date|null} date - Data em qualquer formato aceito
 * @returns {string|null} - Data formatada ou null se inválida
 * 
 * Casos de uso:
 * - Normalizar datas vindas de diferentes componentes
 * - Converter seleções de calendário
 * - Processar datas de APIs
 * - Validar formatos de data
 */
export const formatDateToString = (date) => {
  
  // ========================================
  // VALIDAÇÃO INICIAL
  // ========================================
  
  /**
   * VERIFICAÇÃO DE EXISTÊNCIA
   * 
   * Se date for null, undefined, ou falsy, retorna null imediatamente.
   * Evita erros de processamento em valores inválidos.
   */
  if (!date) return null;
  
  // ========================================
  // PROCESSAMENTO POR TIPO
  // ========================================
  
  /**
   * CASO 1: JÁ É STRING
   * 
   * Se a data já for uma string, assume que está no formato correto
   * e retorna diretamente. Útil para datas que já vêm formatadas.
   */
  if (typeof date === 'string') {
    return date;
  }
  
  /**
   * CASO 2: OBJETO DE CALENDÁRIO
   * 
   * Muitos componentes de calendário retornam objetos com a propriedade
   * dateString já formatada. Ex: { dateString: '2025-09-20', ... }
   */
  if (date.dateString) {
    return date.dateString;
  }
  
  /**
   * CASO 3: OBJETO DATE NATIVO
   * 
   * Se for um objeto Date do JavaScript, converte para string ISO.
   * 
   * Processo:
   * 1. date.toISOString() → '2025-09-20T10:30:00.000Z'
   * 2. .split('T')[0] → ['2025-09-20', '10:30:00.000Z']
   * 3. [0] → '2025-09-20'
   */
  if (date instanceof Date) {
    return date.toISOString().split('T')[0];
  }
  
  /**
   * CASO 4: FORMATO NÃO RECONHECIDO
   * 
   * Se nenhum dos casos acima se aplicar, retorna null
   * para indicar que o formato não é suportado.
   */
  return null;
};

// ========================================
// FUNÇÃO getTodayString
// ========================================

/**
 * FUNÇÃO getTodayString
 * 
 * Função utilitária que retorna a data de hoje
 * no formato string ISO (YYYY-MM-DD).
 * 
 * Funcionalidades:
 * - Sempre retorna data atual do sistema
 * - Formato consistente com resto da aplicação
 * - Útil para comparações e filtragens
 * - Considera timezone local do dispositivo
 * 
 * @returns {string} - Data de hoje no formato 'YYYY-MM-DD'
 * 
 * Exemplos de uso:
 * - Destacar percursos de hoje
 * - Filtrar dados recentes
 * - Validar datas futuras
 * - Definir valores padrão em calendários
 */
export const getTodayString = () => {
  /**
   * CRIAÇÃO E FORMATAÇÃO DA DATA
   * 
   * 1. new Date() → cria objeto Date com data/hora atual
   * 2. .toISOString() → converte para string ISO completa
   * 3. .split('T')[0] → extrai apenas a parte da data
   * 
   * Resultado: '2025-09-22' (exemplo para hoje)
   */
  const today = new Date();
  return today.toISOString().split('T')[0];
};