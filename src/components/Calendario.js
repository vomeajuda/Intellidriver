// ========================================
// COMPONENTE DE CALENDÁRIO MULTIPROPÓSITO
// ========================================

/**
 * IMPORTAÇÕES E DEPENDÊNCIAS
 * 
 * Este componente implementa um sistema de calendário avançado
 * com suporte para visualização mensal e semanal, marcação de datas
 * com eventos, e integração com dados de percursos.
 */

// Importação do React e hooks para estado
import React, { useState } from 'react';

// Importação da biblioteca de calendário do React Native
import { Calendar, LocaleConfig } from 'react-native-calendars';

// Importações dos componentes nativos do React Native
import { 
  View,           // Container flexível
  Text,           // Componente de texto
  TouchableOpacity, // Botão tocável
  StyleSheet      // Sistema de estilos
} from 'react-native';

// Importação dos dados de percursos para integração
import { percursosData } from '../data/percursosData';

// Importação do sistema de cores do tema
import { colors } from '../constants/theme';

// ========================================
// CONFIGURAÇÃO DE LOCALIZAÇÃO
// ========================================

/**
 * CONFIGURAÇÃO DE IDIOMA PORTUGUÊS
 * 
 * Personalização completa da biblioteca react-native-calendars
 * para exibir todas as informações em português brasileiro.
 * 
 * Configurações incluem:
 * - Nomes completos dos meses
 * - Abreviações dos meses
 * - Nomes completos dos dias da semana
 * - Abreviações dos dias da semana
 * - Texto para "hoje"
 */

// Configuração dos textos em português
LocaleConfig.locales['pt'] = {
  // ========================================
  // NOMES DOS MESES COMPLETOS
  // ========================================
  
  /**
   * Array com nomes completos dos meses em português.
   * Usado em cabeçalhos de calendário e navegação mensal.
   */
  monthNames: [
    'Janeiro',      // Mês 1 - Verão
    'Fevereiro',    // Mês 2 - Verão/Outono
    'Março',        // Mês 3 - Outono
    'Abril',        // Mês 4 - Outono
    'Maio',         // Mês 5 - Outono/Inverno
    'Junho',        // Mês 6 - Inverno
    'Julho',        // Mês 7 - Inverno
    'Agosto',       // Mês 8 - Inverno/Primavera
    'Setembro',     // Mês 9 - Primavera
    'Outubro',      // Mês 10 - Primavera
    'Novembro',     // Mês 11 - Primavera/Verão
    'Dezembro'      // Mês 12 - Verão
  ],
  
  // ========================================
  // ABREVIAÇÕES DOS MESES
  // ========================================
  
  /**
   * Array com abreviações dos meses para espaços limitados.
   * Usado em visualizações compactas e navegação rápida.
   */
  monthNamesShort: [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ],
  
  // ========================================
  // NOMES DOS DIAS DA SEMANA COMPLETOS
  // ========================================
  
  /**
   * Array com nomes completos dos dias da semana.
   * Usado em tooltips e informações detalhadas.
   */
  dayNames: [
    'Domingo',         // Dia 0 - Fim de semana
    'Segunda-feira',   // Dia 1 - Início da semana útil
    'Terça-feira',     // Dia 2 - Meio da semana
    'Quarta-feira',    // Dia 3 - Meio da semana
    'Quinta-feira',    // Dia 4 - Meio da semana
    'Sexta-feira',     // Dia 5 - Fim da semana útil
    'Sábado'          // Dia 6 - Fim de semana
  ],
  
  // ========================================
  // ABREVIAÇÕES DOS DIAS DA SEMANA
  // ========================================
  
  /**
   * Array com abreviações de uma letra para os dias.
   * Usado em cabeçalhos de calendário e visualização compacta.
   * Formato: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
   */
  dayNamesShort: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
  
  // ========================================
  // TEXTO PARA DIA ATUAL
  // ========================================
  
  /**
   * Texto usado para referenciar o dia atual.
   * Exibido em botões de navegação e indicadores.
   */
  today: 'Hoje'
};

// Definir português como idioma padrão da biblioteca
LocaleConfig.defaultLocale = 'pt';

// ========================================
// COMPONENTE PRINCIPAL - CALENDÁRIO
// ========================================

/**
 * COMPONENTE Calendario
 * 
 * Sistema de calendário avançado com duas visualizações:
 * 1. Visualização Mensal - Calendário completo tradicional
 * 2. Visualização Semanal - Navegação semanal compacta
 * 
 * Funcionalidades principais:
 * - Seleção de datas com callback personalizado
 * - Marcação visual de dias com percursos/eventos
 * - Indicação visual do dia atual
 * - Navegação entre semanas (modo semanal)
 * - Integração com dados de percursos
 * - Suporte completo ao português brasileiro
 * - Temas personalizáveis
 * 
 * Props recebidas:
 * @param {function} onDayPress - Callback executado ao selecionar uma data
 * @param {boolean} isWeeklyView - Define se deve exibir modo semanal (false = mensal)
 * @param {string} selectedDate - Data atualmente selecionada (formato YYYY-MM-DD)
 * 
 * Casos de uso:
 * - Seleção de datas em formulários
 * - Visualização de histórico de atividades
 * - Navegação por períodos de tempo
 * - Marcação de eventos importantes
 * 
 * @returns {JSX.Element} - Componente de calendário renderizado
 */
export default function Calendario({ onDayPress, isWeeklyView = false, selectedDate = null }) {
  
  // ========================================
  // ESTADO LOCAL DO COMPONENTE
  // ========================================
  
  /**
   * ESTADO DA SEMANA ATUAL
   * 
   * Array com os 7 dias da semana atual para modo de visualização semanal.
   * Inicializado com a semana que contém o dia atual.
   * 
   * Estrutura: Array<Date> - Array de objetos Date representando cada dia
   * Ordem: [Segunda, Terça, Quarta, Quinta, Sexta, Sábado, Domingo]
   */
  const [currentWeek, setCurrentWeek] = useState(getCurrentWeek());

  // ========================================
  // FUNÇÕES UTILITÁRIAS
  // ========================================
  
  /**
   * OBTER SEMANA ATUAL
   * 
   * Calcula os 7 dias da semana que contém a data atual,
   * sempre começando na segunda-feira e terminando no domingo.
   * 
   * Lógica de cálculo:
   * 1. Obtém o dia atual da semana (0=domingo, 1=segunda, etc.)
   * 2. Calcula quantos dias subtrair para chegar à segunda-feira
   * 3. Gera array com os 7 dias consecutivos
   * 
   * Tratamento especial:
   * - Se hoje é domingo (0), voltar 6 dias para pegar a segunda
   * - Caso contrário, voltar (dia atual - 1) dias
   * 
   * @returns {Array<Date>} - Array com os 7 dias da semana
   */
  function getCurrentWeek() {
    const today = new Date();                    // Data atual
    const currentDay = today.getDay();           // Dia da semana (0-6)
    const startOfWeek = new Date(today);         // Cópia da data atual
    
    // ========================================
    // CÁLCULO DO INÍCIO DA SEMANA
    // ========================================
    
    /**
     * AJUSTE PARA SEGUNDA-FEIRA
     * 
     * Calcula quantos dias subtrair para chegar à segunda-feira.
     * domingo (0) -> subtrair 6 dias
     * segunda (1) -> subtrair 0 dias
     * terça (2) -> subtrair 1 dia
     * ... e assim por diante
     */
    const daysToSubtract = currentDay === 0 ? 6 : currentDay - 1;
    startOfWeek.setDate(today.getDate() - daysToSubtract);

    // ========================================
    // GERAÇÃO DOS 7 DIAS DA SEMANA
    // ========================================
    
    /**
     * CONSTRUÇÃO DO ARRAY DA SEMANA
     * 
     * Loop que gera os 7 dias consecutivos começando na segunda-feira.
     * Cada iteração adiciona um dia ao startOfWeek.
     */
    const week = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);         // Cópia da data base
      day.setDate(startOfWeek.getDate() + i);   // Adicionar i dias
      week.push(day);                           // Adicionar ao array
    }
    return week;
  }

  // ========================================
  // NAVEGAÇÃO ENTRE SEMANAS
  // ========================================
  
  /**
   * NAVEGAR PARA SEMANA ANTERIOR
   * 
   * Move a visualização semanal para os 7 dias anteriores.
   * Recalcula todos os dias da semana subtraindo 7 dias de cada um.
   * 
   * Processo:
   * 1. Mapear cada dia da semana atual
   * 2. Subtrair 7 dias de cada data
   * 3. Atualizar o estado com a nova semana
   * 
   * Uso: Botão "anterior" na navegação semanal
   */
  function goToPreviousWeek() {
    const newWeek = currentWeek.map(day => {
      const newDay = new Date(day);              // Cópia da data
      newDay.setDate(day.getDate() - 7);         // Subtrair 7 dias
      return newDay;
    });
    setCurrentWeek(newWeek);                     // Atualizar estado
  }

  /**
   * NAVEGAR PARA PRÓXIMA SEMANA
   * 
   * Move a visualização semanal para os 7 dias seguintes.
   * Recalcula todos os dias da semana adicionando 7 dias a cada um.
   * 
   * Processo:
   * 1. Mapear cada dia da semana atual
   * 2. Adicionar 7 dias a cada data
   * 3. Atualizar o estado com a nova semana
   * 
   * Uso: Botão "próximo" na navegação semanal
   */
  function goToNextWeek() {
    const newWeek = currentWeek.map(day => {
      const newDay = new Date(day);              // Cópia da data
      newDay.setDate(day.getDate() + 7);         // Adicionar 7 dias
      return newDay;
    });
    setCurrentWeek(newWeek);                     // Atualizar estado
  }

  // ========================================
  // FUNÇÕES DE FORMATAÇÃO E VERIFICAÇÃO
  // ========================================
  
  /**
   * FORMATAR DATA PARA STRING
   * 
   * Converte um objeto Date para string no formato ISO (YYYY-MM-DD).
   * Formato padrão usado em todo o sistema para comparações e armazenamento.
   * 
   * @param {Date} date - Objeto Date para formatar
   * @returns {string} - Data formatada como "2024-01-15"
   * 
   * Processo:
   * 1. Converte Date para ISO string completa
   * 2. Divide no 'T' para separar data e hora
   * 3. Retorna apenas a parte da data
   */
  function formatDate(date) {
    return date.toISOString().split('T')[0];
  }

  /**
   * VERIFICAR SE É DIA ATUAL
   * 
   * Compara uma data específica com a data atual para determinar
   * se é o dia de hoje. Usado para destacar visualmente o dia atual.
   * 
   * @param {Date} date - Data para verificar
   * @returns {boolean} - True se for o dia atual, false caso contrário
   * 
   * Comparação:
   * - Usa toDateString() para comparar apenas a data (ignora hora)
   * - Compara com new Date() que representa agora
   */
  function isToday(date) {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  /**
   * VERIFICAR SE DATA ESTÁ SELECIONADA
   * 
   * Compara uma data específica com a data atualmente selecionada
   * para aplicar estilos visuais de seleção.
   * 
   * @param {Date} date - Data para verificar
   * @returns {boolean} - True se estiver selecionada, false caso contrário
   * 
   * Validações:
   * 1. Verifica se existe uma data selecionada
   * 2. Formata ambas as datas para o formato padrão
   * 3. Compara as strings formatadas
   */
  function isSelected(date) {
    if (!selectedDate) return false;             // Sem seleção ativa
    return formatDate(date) === selectedDate;    // Comparar formatadas
  }

  /**
   * VERIFICAR SE DATA TEM PERCURSOS
   * 
   * Verifica se uma data específica possui dados de percursos
   * registrados, usado para marcação visual no calendário.
   * 
   * @param {Date} date - Data para verificar
   * @returns {boolean} - True se tem percursos, false caso contrário
   * 
   * Processo:
   * 1. Formatar data para string no formato padrão
   * 2. Verificar se existe entrada nos dados de percursos
   * 3. Verificar se a entrada contém pelo menos um percurso
   */
  function hasPercursos(date) {
    const dateString = formatDate(date);
    return percursosData[dateString] && percursosData[dateString].length > 0;
  }

  // ========================================
  // CONFIGURAÇÕES E CONSTANTES
  // ========================================
  
  /**
   * ABREVIAÇÕES DOS DIAS DA SEMANA
   * 
   * Array com abreviações de 3 letras para os dias da semana,
   * usado na visualização semanal compacta.
   * 
   * Ordem: Segunda a Domingo (padrão brasileiro)
   * Formato: Maiúsculas para melhor legibilidade
   */
  const dayNames = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM'];

  // ========================================
  // HANDLER DE SELEÇÃO DE DATA
  // ========================================
  
  /**
   * MANIPULAR SELEÇÃO DE DATA
   * 
   * Função chamada quando o usuário toca em um dia no calendário.
   * Processa a data selecionada e executa callback fornecido pelo componente pai.
   * 
   * @param {Date} date - Objeto Date do dia selecionado
   * 
   * Funcionalidades:
   * 1. Log para debugging e monitoramento
   * 2. Validação da existência e tipo do callback
   * 3. Formatação da data para objeto estruturado
   * 4. Execução do callback com dados padronizados
   * 
   * Formato do objeto enviado:
   * {
   *   dateString: "2024-01-15",  // String formatada ISO
   *   day: 15,                   // Dia do mês (1-31)
   *   month: 1,                  // Mês (1-12)
   *   year: 2024                 // Ano completo
   * }
   */
  const handleDayPress = (date) => {
    // Log para debugging e monitoramento de interações
    console.log('Day pressed:', formatDate(date));
    
    // Verificação de segurança para callback válido
    if (onDayPress && typeof onDayPress === 'function') {
      // Executar callback com objeto de data estruturado
      onDayPress({
        dateString: formatDate(date),            // Data no formato ISO
        day: date.getDate(),                     // Dia do mês
        month: date.getMonth() + 1,              // Mês (ajustado para 1-12)
        year: date.getFullYear(),                // Ano completo
      });
    }
  };

  // ========================================
  // RENDERIZAÇÃO CONDICIONAL - MODO SEMANAL
  // ========================================
  
  /**
   * VISUALIZAÇÃO SEMANAL
   * 
   * Renderiza um calendário compacto mostrando apenas 7 dias da semana atual.
   * Ativado quando isWeeklyView = true.
   * 
   * Características:
   * - Header com navegação entre semanas
   * - Exibição horizontal dos 7 dias
   * - Indicadores visuais para: dia atual, dia selecionado, dias com percursos
   * - Navegação com botões anterior/próximo
   * - Design compacto para economizar espaço vertical
   * 
   * Casos de uso:
   * - Interfaces com espaço limitado
   * - Navegação rápida entre semanas
   * - Foco na semana atual
   */
  if (isWeeklyView) {
    return (
      <View style={weekStyles.container}>
        
        {/* ========================================
            CABEÇALHO COM NAVEGAÇÃO SEMANAL
            ======================================== */}
        
        {/**
         * HEADER DE NAVEGAÇÃO
         * 
         * Barra superior com botões de navegação e indicador do mês/ano.
         * Layout horizontal com espaçamento distribuído.
         * 
         * Elementos:
         * - Botão anterior (seta esquerda)
         * - Indicador do mês e ano atual
         * - Botão próximo (seta direita)
         */}
        <View style={weekStyles.header}>
          
          {/* ========================================
              BOTÃO NAVEGAR SEMANA ANTERIOR
              ======================================== */}

          {/**
           * BOTÃO DE NAVEGAÇÃO ANTERIOR
           * 
           * TouchableOpacity que executa goToPreviousWeek ao ser pressionado.
           * Estilo circular com fundo diferenciado e símbolo de seta.
           */}
          <TouchableOpacity onPress={goToPreviousWeek} style={weekStyles.navButton}>
            <Text style={weekStyles.navButtonText}>‹</Text>
          </TouchableOpacity>
          
          {/* ========================================
              INDICADOR DO MÊS E ANO
              ======================================== */}

          {/**
           * TEXTO DO PERÍODO ATUAL
           * 
           * Exibe o mês e ano da semana sendo visualizada.
           * Usa o primeiro dia da semana como referência.
           * 
           * Formatação:
           * - toLocaleDateString com locale pt-BR
           * - Mostra apenas mês e ano
           * - Formato: "janeiro de 2024"
           */}
          <Text style={weekStyles.monthYear}>
            {currentWeek[0].toLocaleDateString('pt-BR', { 
              month: 'long',          // Nome completo do mês
              year: 'numeric'         // Ano com 4 dígitos
            }).replace(' de ', ' de ')}
          </Text>
          
          {/* ========================================
              BOTÃO NAVEGAR PRÓXIMA SEMANA
              ======================================== */}

          {/**
           * BOTÃO DE NAVEGAÇÃO POSTERIOR
           * 
           * TouchableOpacity que executa goToNextWeek ao ser pressionado.
           * Espelhamento do botão anterior com seta apontando para direita.
           */}
          <TouchableOpacity onPress={goToNextWeek} style={weekStyles.navButton}>
            <Text style={weekStyles.navButtonText}>›</Text>
          </TouchableOpacity>
        </View>

        {/* ========================================
            CONTAINER DOS DIAS DA SEMANA
            ======================================== */}

        {/**
         * VISUALIZAÇÃO DOS 7 DIAS
         * 
         * Container horizontal que exibe todos os dias da semana atual.
         * Cada dia é renderizado como um botão individual com informações
         * sobre o nome do dia, número do dia, e indicadores visuais.
         */}
        <View style={weekStyles.weekContainer}>
          {currentWeek.map((date, index) => {
            
            // ========================================
            // CÁLCULO DOS ESTADOS VISUAIS
            // ========================================
            
            /**
             * DETERMINAÇÃO DE ESTADOS DO DIA
             * 
             * Calcula os diferentes estados visuais que um dia pode ter:
             * - isTodayDate: Se é o dia atual
             * - isSelectedDate: Se está selecionado pelo usuário
             * - isTodayAndSelected: Se é hoje E está selecionado (estado especial)
             * 
             * Estes estados determinam qual estilo aplicar ao container.
             */
            const isTodayDate = isToday(date);
            const isSelectedDate = isSelected(date);
            const isTodayAndSelected = isTodayDate && isSelectedDate;
            
            return (
              /* ========================================
                 CONTAINER INDIVIDUAL DO DIA
                 ======================================== */
              
              /**
               * BOTÃO DO DIA
               * 
               * TouchableOpacity que representa um dia específico da semana.
               * Aplica estilos condicionais baseados no estado do dia.
               * 
               * Estilos aplicados condicionalmente:
               * - todayContainer: Fundo especial para o dia atual
               * - selectedContainer: Fundo especial para dia selecionado
               * - todaySelectedContainer: Combinação especial para dia atual selecionado
               */
              <TouchableOpacity
                key={index}
                style={[
                  weekStyles.dayContainer,                                    // Estilo base
                  isTodayDate && !isSelectedDate && weekStyles.todayContainer, // Só hoje
                  isSelectedDate && !isTodayDate && weekStyles.selectedContainer, // Só selecionado
                  isTodayAndSelected && weekStyles.todaySelectedContainer      // Hoje e selecionado
                ]}
                onPress={() => handleDayPress(date)}
              >
                
                {/* ========================================
                    ABREVIAÇÃO DO DIA DA SEMANA
                    ======================================== */}

                {/**
                 * NOME DO DIA ABREVIADO
                 * 
                 * Texto com a abreviação do dia da semana (SEG, TER, etc.).
                 * Estilo condicional para destacar quando é dia atual ou selecionado.
                 */}
                <Text style={[
                  weekStyles.dayName,                                         // Estilo base
                  (isTodayDate || isSelectedDate) && weekStyles.highlightText // Destaque condicional
                ]}>
                  {dayNames[index]}
                </Text>
                
                {/* ========================================
                    NÚMERO DO DIA DO MÊS
                    ======================================== */}

                {/**
                 * NÚMERO DO DIA
                 * 
                 * Texto com o número do dia do mês (1-31).
                 * Elemento principal visual do dia, com destaque condicional.
                 */}
                <Text style={[
                  weekStyles.dayNumber,                                       // Estilo base
                  (isTodayDate || isSelectedDate) && weekStyles.highlightText // Destaque condicional
                ]}>
                  {date.getDate()}
                </Text>
                
                {/* ========================================
                    INDICADOR DE PERCURSOS/EVENTOS
                    ======================================== */}

                {/**
                 * INDICADOR VISUAL DE EVENTOS
                 * 
                 * Pequeno ponto circular que aparece quando o dia tem
                 * percursos registrados nos dados.
                 * 
                 * Renderização condicional:
                 * - Só aparece se hasPercursos(date) retornar true
                 * - Cor de destaque do tema (accent)
                 */}
                {hasPercursos(date) && (
                  <View style={weekStyles.dotIndicator} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }

  // ========================================
  // RENDERIZAÇÃO - MODO MENSAL COMPLETO
  // ========================================
  
  /**
   * VISUALIZAÇÃO MENSAL (CALENDÁRIO TRADICIONAL)
   * 
   * Renderiza um calendário completo usando a biblioteca react-native-calendars.
   * Modo padrão quando isWeeklyView = false.
   * 
   * Funcionalidades avançadas:
   * - Marcação personalizada de datas selecionadas
   * - Indicação visual do dia atual
   * - Marcação de dias com percursos/eventos
   * - Tema personalizado com cores do sistema
   * - Tratamento de erros com fallback
   * - Configuração de primeiro dia da semana
   * 
   * Sistema de marcação:
   * - customStyles para controle total da aparência
   * - marked com pontos para indicar eventos
   * - Combinação de estados (atual + selecionado)
   */
  
  // Bloco try-catch para tratamento de erros da biblioteca
  try {
    
    // ========================================
    // CONFIGURAÇÃO DE TEMA DO CALENDÁRIO
    // ========================================
    
    /**
     * TEMA PERSONALIZADO
     * 
     * Objeto de configuração que define toda a aparência do calendário
     * mensal, integrando com o sistema de cores do aplicativo.
     * 
     * Categorias de customização:
     * 1. Cores de fundo e containers
     * 2. Cores de texto e elementos
     * 3. Cores de seleção e destaque
     * 4. Tamanhos de fonte
     * 5. Cores de navegação e indicadores
     */
    const calendarTheme = {
      // ========================================
      // CORES DE FUNDO E CONTAINERS
      // ========================================
      backgroundColor: colors.surface,        // Fundo geral do calendário
      calendarBackground: colors.surface,     // Fundo específico da grade
      
      // ========================================
      // CORES DE TEXTO E SEÇÕES
      // ========================================
      textSectionTitleColor: colors.primary,     // Cor dos cabeçalhos dos dias (S T Q Q S S D)
      dayTextColor: colors.text.primary,         // Cor dos números dos dias
      monthTextColor: colors.text.primary,       // Cor do nome do mês no header
      
      // ========================================
      // CORES DE SELEÇÃO E ESTADOS
      // ========================================
      selectedDayBackgroundColor: colors.secondary,  // Fundo do dia selecionado
      selectedDayTextColor: colors.darker,           // Texto do dia selecionado
      todayBackgroundColor: colors.primary,          // Fundo do dia atual
      todayTextColor: colors.surface,                // Texto do dia atual
      
      // ========================================
      // CORES DE NAVEGAÇÃO E INDICADORES
      // ========================================
      arrowColor: colors.primary,             // Cor das setas de navegação
      indicatorColor: colors.primary,         // Cor dos indicadores gerais
      dotColor: colors.accent,               // Cor dos pontos de marcação
      selectedDotColor: colors.darker,       // Cor dos pontos quando dia está selecionado
      
      // ========================================
      // CONFIGURAÇÕES DE TIPOGRAFIA
      // ========================================
      textDayFontSize: 14,                   // Tamanho da fonte dos números dos dias
      textMonthFontSize: 13,                 // Tamanho da fonte do nome do mês
      textDayHeaderFontSize: 12,             // Tamanho da fonte dos cabeçalhos (S T Q...)
    };

    // ========================================
    // SISTEMA DE MARCAÇÃO DINÂMICA
    // ========================================
    
    /**
     * CRIAÇÃO DO OBJETO markedDates
     * 
     * Sistema complexo que determina como cada dia será exibido
     * no calendário, combinando múltiplos estados e indicadores.
     * 
     * Estados possíveis:
     * 1. Dia atual (hoje)
     * 2. Dia selecionado pelo usuário
     * 3. Dia atual + selecionado (combinação especial)
     * 4. Dias com percursos (marcação com ponto)
     * 5. Combinações de seleção + percursos
     */
    const markedDates = {};
    const today = new Date().toISOString().split('T')[0];  // Data atual formatada
    
    // ========================================
    // MARCAÇÃO DA DATA SELECIONADA
    // ========================================
    
    /**
     * PROCESSAMENTO DA DATA SELECIONADA
     * 
     * Lógica condicional que aplica estilos diferentes dependendo
     * se a data selecionada é também o dia atual.
     */
    if (selectedDate) {
      if (selectedDate === today) {
        // ========================================
        // CASO ESPECIAL: DIA ATUAL + SELECIONADO
        // ========================================
        
        /**
         * ESTILO COMBINADO
         * 
         * Quando o dia selecionado é também hoje, aplicamos
         * um estilo especial que combina os dois estados:
         * - Fundo da cor de seleção (secondary)
         * - Borda da cor do dia atual (primary)
         * - Texto destacado
         */
        markedDates[selectedDate] = { 
          customStyles: {
            container: {
              backgroundColor: colors.secondary,     // Fundo verde claro (selecionado)
              borderWidth: 2,                        // Borda para indicar dia atual
              borderColor: colors.primary,          // Borda verde principal
              borderRadius: 16,                      // Bordas arredondadas
            },
            text: {
              color: colors.darker,                  // Texto escuro para contraste
              fontWeight: 'bold',                    // Peso da fonte em negrito
            },
          }
        };
      } else {
        // ========================================
        // CASO: APENAS DIA SELECIONADO
        // ========================================
        
        /**
         * ESTILO DE SELEÇÃO PADRÃO
         * 
         * Para dias selecionados que não são hoje,
         * aplicamos apenas o estilo de seleção.
         */
        markedDates[selectedDate] = { 
          customStyles: {
            container: {
              backgroundColor: colors.secondary,     // Fundo verde claro
              borderRadius: 16,                      // Bordas arredondadas
            },
            text: {
              color: colors.darker,                  // Texto escuro
              fontWeight: 'bold',                    // Negrito
            },
          }
        };
      }
    } else if (today) {
      // ========================================
      // CASO: APENAS DIA ATUAL (SEM SELEÇÃO)
      // ========================================
      
      /**
       * ESTILO DO DIA ATUAL
       * 
       * Quando não há seleção ativa, mas queremos
       * destacar o dia atual no calendário.
       */
      markedDates[today] = {
        customStyles: {
          container: {
            backgroundColor: colors.primary,         // Fundo verde principal
            borderRadius: 16,                        // Bordas arredondadas
          },
          text: {
            color: colors.surface,                   // Texto claro para contraste
            fontWeight: 'bold',                      // Negrito
          },
        }
      };
    }
    
    // ========================================
    // MARCAÇÃO DE DIAS COM PERCURSOS
    // ========================================
    
    /**
     * PROCESSAMENTO DE DIAS COM EVENTOS
     * 
     * Itera sobre todos os dados de percursos para marcar
     * visualmente os dias que possuem eventos registrados.
     * 
     * Lógica de combinação:
     * - Se o dia já está marcado (atual/selecionado), adiciona indicador
     * - Se não está marcado, cria nova marcação apenas com indicador
     */
    Object.keys(percursosData).forEach(dateString => {
      if (percursosData[dateString] && percursosData[dateString].length > 0) {
        if (markedDates[dateString]) {
          // ========================================
          // DIA JÁ MARCADO + TEM PERCURSOS
          // ========================================
          
          /**
           * ADIÇÃO DE INDICADOR A ESTILO EXISTENTE
           * 
           * Quando um dia já tem estilo (atual/selecionado)
           * e também tem percursos, adicionamos o indicador
           * sem alterar o estilo existente.
           */
          markedDates[dateString].marked = true;
          markedDates[dateString].dotColor = colors.accent;
        } else {
          // ========================================
          // APENAS DIA COM PERCURSOS
          // ========================================
          
          /**
           * MARCAÇÃO SIMPLES COM INDICADOR
           * 
           * Para dias que só têm percursos (não são hoje nem selecionados),
           * aplicamos apenas o indicador visual.
           */
          markedDates[dateString] = { 
            marked: true,                           // Ativar marcação
            dotColor: colors.accent,               // Cor do ponto indicador
            customStyles: {
              container: {},                        // Container padrão
              text: {
                color: colors.text.primary,        // Texto padrão
              },
            }
          };
        }
      }
    });

    // ========================================
    // RENDERIZAÇÃO DO CALENDÁRIO MENSAL
    // ========================================
    
    /**
     * COMPONENTE CALENDAR
     * 
     * Renderização final do calendário mensal com todas as
     * configurações, temas e marcações aplicadas.
     * 
     * Props principais:
     * - onDayPress: Callback para seleção de dias
     * - markedDates: Objeto com todas as marcações
     * - markingType: "custom" para usar customStyles
     * - theme: Objeto com tema personalizado
     * - firstDay: 1 = segunda-feira como primeiro dia
     */
    return (
      <Calendar
        onDayPress={onDayPress}                  // Callback de seleção
        markedDates={markedDates}               // Objeto de marcações
        markingType="custom"                    // Usar estilos customizados
        theme={calendarTheme}                   // Tema personalizado
        firstDay={1}                           // Segunda-feira como primeiro dia
      />
    );
  } catch (error) {
    // ========================================
    // TRATAMENTO DE ERROS
    // ========================================
    
    /**
     * FALLBACK PARA ERROS
     * 
     * Se houver qualquer erro na renderização do calendário
     * (biblioteca não carregada, configuração inválida, etc.),
     * exibimos uma mensagem de erro amigável.
     */
    console.error('Erro no componente Calendario:', error);
    return (
      <View style={{ padding: 20, backgroundColor: '#f0f0f0', borderRadius: 10 }}>
        <Text style={{ textAlign: 'center', color: '#666' }}>
          Erro ao carregar calendário
        </Text>
      </View>
    );
  }
}

// ========================================
// ESTILOS PARA VISUALIZAÇÃO SEMANAL
// ========================================

/**
 * SISTEMA DE ESTILOS SEMANAL
 * 
 * Conjunto completo de estilos para a visualização semanal do calendário.
 * Design focado em compactação, usabilidade e feedback visual claro.
 * 
 * Características do design:
 * - Layout horizontal responsivo
 * - Estados visuais distintos para diferentes condições
 * - Navegação intuitiva com botões circulares
 * - Indicadores visuais para eventos
 * - Harmonia com o sistema de cores do tema
 */
const weekStyles = StyleSheet.create({
  
  // ========================================
  // CONTAINER PRINCIPAL
  // ========================================
  
  /**
   * ESTILO DO CONTAINER PRINCIPAL
   * 
   * Container raiz da visualização semanal.
   * Fundo baseado na cor de superfície do tema.
   */
  container: {
    backgroundColor: colors.surface,           // Fundo neutro do tema
  },
  
  // ========================================
  // CABEÇALHO COM NAVEGAÇÃO
  // ========================================
  
  /**
   * ESTILO DO HEADER DE NAVEGAÇÃO
   * 
   * Barra superior que contém os controles de navegação entre semanas
   * e o indicador do período atual.
   * 
   * Layout:
   * - Flexbox horizontal com espaçamento distribuído
   * - Padding interno para respiração visual
   * - Borda inferior sutil para separação
   * - Alinhamento vertical centralizado
   */
  header: {
    flexDirection: 'row',                      // Layout horizontal
    justifyContent: 'space-between',           // Espaçamento distribuído (botões nas bordas)
    alignItems: 'center',                      // Centralização vertical
    paddingHorizontal: 8,                      // Padding horizontal interno
    paddingVertical: 2,                        // Padding vertical mínimo
    borderBottomWidth: 1,                      // Borda inferior para separação
    borderBottomColor: '#f0f0f0',             // Cor sutil da borda
  },
  
  // ========================================
  // BOTÕES DE NAVEGAÇÃO
  // ========================================
  
  /**
   * ESTILO DOS BOTÕES DE NAVEGAÇÃO
   * 
   * Botões circulares para navegar entre semanas (anterior/próximo).
   * 
   * Design:
   * - Formato circular com padding adequado para toque
   * - Fundo diferenciado para destaque
   * - Bordas arredondadas
   * - Área de toque confortável
   */
  navButton: {
    padding: 8,                                // Área de toque adequada
    borderRadius: 20,                          // Formato circular
    backgroundColor: colors.background,        // Fundo diferenciado
  },
  
  /**
   * ESTILO DO TEXTO DOS BOTÕES DE NAVEGAÇÃO
   * 
   * Estilização dos símbolos de seta (‹ e ›) nos botões.
   * 
   * Características:
   * - Tamanho grande para boa visibilidade
   * - Cor do tema principal
   * - Peso em negrito para destaque
   */
  navButtonText: {
    fontSize: 18,                              // Tamanho legível e tocável
    color: colors.primary,                     // Cor principal do tema
    fontWeight: 'bold',                        // Negrito para destaque
  },
  
  // ========================================
  // INDICADOR DO PERÍODO
  // ========================================
  
  /**
   * ESTILO DO TEXTO MÊS/ANO
   * 
   * Indicador textual do período (mês e ano) da semana atual.
   * 
   * Design minimalista:
   * - Tamanho compacto para não competir com elementos principais
   * - Cor secundária para hierarquia visual
   * - Sem transformação de texto (mantém formatação original)
   */
  monthYear: {
    fontSize: 12,                              // Tamanho compacto
    fontWeight: '400',                         // Peso normal
    color: colors.text.secondary,              // Cor secundária do texto
    textTransform: 'none',                     // Sem transformação automática
  },
  
  // ========================================
  // CONTAINER DOS DIAS
  // ========================================
  
  /**
   * ESTILO DO CONTAINER DA SEMANA
   * 
   * Container horizontal que organiza os 7 dias da semana.
   * 
   * Layout:
   * - Flexbox horizontal
   * - Padding mínimo para respiração
   * - Distribuição igual do espaço entre dias
   */
  weekContainer: {
    flexDirection: 'row',                      // Layout horizontal dos dias
    padding: 2,                                // Padding mínimo
  },
  
  // ========================================
  // CONTAINERS INDIVIDUAIS DOS DIAS
  // ========================================
  
  /**
   * ESTILO BASE DO CONTAINER DO DIA
   * 
   * Estilo base aplicado a cada dia individual na visualização semanal.
   * 
   * Layout e dimensões:
   * - Flex 1 para distribuição igual do espaço
   * - Centralização de conteúdo vertical e horizontal
   * - Padding vertical para área de toque adequada
   * - Margins horizontais para separação entre dias
   * - Bordas arredondadas suaves
   */
  dayContainer: {
    flex: 1,                                   // Distribuição igual do espaço horizontal
    alignItems: 'center',                      // Centralização horizontal do conteúdo
    paddingVertical: 12,                       // Padding vertical para área de toque
    paddingHorizontal: 3,                      // Padding horizontal mínimo
    borderRadius: 8,                           // Bordas arredondadas suaves
    marginHorizontal: 2,                       // Separação entre dias
  },
  
  /**
   * ESTILO PARA DIA ATUAL (NÃO SELECIONADO)
   * 
   * Modificador visual aplicado quando o dia é hoje,
   * mas não está selecionado pelo usuário.
   */
  todayContainer: {
    backgroundColor: colors.primary,           // Fundo verde principal
  },
  
  /**
   * ESTILO PARA DIA SELECIONADO (NÃO É HOJE)
   * 
   * Modificador visual aplicado quando o dia está selecionado,
   * mas não é o dia atual.
   */
  selectedContainer: {
    backgroundColor: colors.secondary,         // Fundo verde claro
  },
  
  /**
   * ESTILO PARA DIA ATUAL + SELECIONADO
   * 
   * Modificador especial aplicado quando o dia é simultaneamente
   * o dia atual E está selecionado pelo usuário.
   * 
   * Combina elementos visuais:
   * - Fundo da seleção (secondary)
   * - Borda do dia atual (primary)
   */
  todaySelectedContainer: {
    backgroundColor: colors.secondary,         // Fundo de seleção
    borderWidth: 2,                           // Borda para indicar dia atual
    borderColor: colors.primary,              // Cor da borda (dia atual)
  },
  
  // ========================================
  // TEXTOS DOS DIAS
  // ========================================
  
  /**
   * ESTILO DO NOME DO DIA (ABREVIAÇÃO)
   * 
   * Estilo para as abreviações dos dias da semana (SEG, TER, etc.).
   * 
   * Características:
   * - Tamanho pequeno para não competir com o número
   * - Peso médio para legibilidade
   * - Cor neutra
   * - Margem inferior para separação do número
   */
  dayName: {
    fontSize: 10,                              // Tamanho compacto
    fontWeight: '500',                         // Peso médio
    color: '#666',                             // Cor neutra
    marginBottom: 4,                           // Separação do número do dia
  },
  
  /**
   * ESTILO DO NÚMERO DO DIA
   * 
   * Estilo para o número do dia do mês (elemento principal visual).
   * 
   * Características:
   * - Tamanho destacado para ser o foco principal
   * - Peso semi-negrito para destaque
   * - Cor do texto principal do tema
   * - Margem inferior para separação do indicador
   */
  dayNumber: {
    fontSize: 16,                              // Tamanho destacado
    fontWeight: '600',                         // Peso semi-negrito
    color: colors.text.primary,               // Cor principal do texto
    marginBottom: 2,                           // Separação do indicador
  },
  
  /**
   * ESTILO DE DESTAQUE PARA TEXTOS
   * 
   * Modificador aplicado aos textos quando o dia está em estado
   * especial (hoje ou selecionado), mudando a cor para contraste.
   */
  highlightText: {
    color: colors.surface,                     // Cor clara para contraste com fundos escuros
  },
  
  // ========================================
  // INDICADORES VISUAIS
  // ========================================
  
  /**
   * ESTILO DO INDICADOR DE EVENTOS/PERCURSOS
   * 
   * Pequeno ponto circular que indica a presença de eventos
   * ou percursos registrados no dia.
   * 
   * Design:
   * - Círculo pequeno e discreto
   * - Cor de destaque do tema
   * - Posicionado abaixo do número do dia
   */
  dotIndicator: {
    width: 6,                                  // Largura do ponto
    height: 6,                                 // Altura do ponto
    borderRadius: 3,                           // Formato circular (metade da largura/altura)
    backgroundColor: colors.accent,            // Cor de destaque
    marginTop: 2,                              // Separação do número do dia
  },
  
  /**
   * ESTILO PARA TEXTO SELECIONADO (NÃO USADO ATUALMENTE)
   * 
   * Estilo adicional que pode ser usado para destacar texto
   * de dias selecionados. Mantido para futura expansão.
   */
  selectedText: {
    color: colors.text.primary,               // Cor principal
    fontWeight: 'bold',                        // Negrito
  },
});