// Importação do React para criação de componente funcional
// Não usa hooks de estado pois dados vêm via navigation params
import React from 'react';
// Importações de componentes essenciais do React Native para interface de detalhes
// StyleSheet: Sistema de estilos otimizado para performance
// Text: Componente fundamental para renderização de textos formatados
// View: Container universal para estruturação e layout de elementos
// Image: Componente para exibição de imagens de header dos percursos
// ScrollView: Container scrollável para conteúdo extenso com múltiplas seções
// TouchableOpacity: Componente interativo para elementos clicáveis (futuras implementações)
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
// Importações dos hooks de navegação do React Navigation
// useNavigation: Hook para acesso ao objeto de navegação e métodos de transição
// useRoute: Hook para acesso aos parâmetros passados entre telas
import { useNavigation, useRoute } from '@react-navigation/native';
// Importação do componente de botão de retorno universal
// Componente reutilizável para navegação de volta em telas internas
import BackButton from '../components/BackButton';
// Importação do componente Header para cabeçalho com logo centralizada
import Header from '../components/Header';
// Importação do ícone personalizado EcoCoin para seção de pontuação
// Componente SVG customizado para representação visual da moeda virtual
import EcoCoinIcon from '../assets/ecocoin-icon';

// Componente principal para visualização detalhada de percursos específicos
// Exibe informações completas sobre viagens realizadas incluindo métricas, custos e EcoCoins
// Recebe dados via navigation params vindos da tela de histórico ou listagem
export default function PercursoDetalhes() {
  // Hook de navegação para futuros casos de navegação interna
  // Preparado para implementação de funcionalidades como edição ou compartilhamento
  const navigation = useNavigation();
  
  // Hook para acesso aos parâmetros da rota atual
  // Extrai objeto 'percurso' passado pela tela anterior via navigation.navigate
  const route = useRoute();
  const { percurso } = route.params || {};

  // Verificação de segurança para parâmetros obrigatórios
  // Se não houver dados do percurso, exibe tela de erro
  if (!percurso) {
    return (
      <View style={styles.container}>
        <BackButton />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, color: '#666', textAlign: 'center' }}>
            Erro: Dados do percurso não encontrados.{'\n'}
            Por favor, volte e tente novamente.
          </Text>
        </View>
      </View>
    );
  }

  // Função utilitária para formatação completa de datas em português brasileiro
  // Converte strings de data para formato legível com dia da semana, mês e ano
  // Parâmetro: dateString - string de data no formato ISO ou compatível
  // Retorna: string formatada em português com capitalização adequada
  const formatDisplayDate = (dateString) => {
    // Validação de entrada para evitar erros com datas inválidas ou undefined
    if (!dateString) return 'Data não disponível';
    
    // Criação de objeto Date com horário fixo para evitar problemas de timezone
    // Adiciona 'T00:00:00' para garantir horário consistente
    const date = new Date(dateString + 'T00:00:00');
    // Formatação completa em português brasileiro incluindo:
    // - weekday: dia da semana por extenso
    // - year: ano completo (4 dígitos)
    // - month: mês por extenso
    // - day: dia do mês numérico
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Componente de linha de detalhes reutilizável para informações estruturadas
  // Cria layout consistente de label-valor para dados do percurso
  // Parâmetros: label (string), value (string), style (objeto de estilo opcional)
  const DetailRow = ({ label, value, style }) => (
    <View style={styles.detailRow}>
      {/* Label da informação com estilo padronizado */}
      <Text style={styles.detailLabel}>{label}</Text>
      {/* Valor com fallback para 'N/A' e estilo personalizável */}
      <Text style={[styles.detailValue, style]}>{value || 'N/A'}</Text>
    </View>
  );

  // Renderização da interface de detalhes do percurso
  return (
    // Container principal com fundo consistente do tema eco-friendly
    <View style={styles.container}>
      {/* Header com logo centralizada */}
      <Header />
      
      {/* Header secundário com navegação e título */}
      <View style={styles.navigationHeader}>
        <BackButton />
        <Text style={styles.navigationTitle}>Detalhes do Percurso</Text>
        <View style={styles.placeholder} />
      </View>
      
      {/* ScrollView para conteúdo extenso com múltiplas seções informativas */}
      {/* Permite rolagem vertical suave sem indicador visual para interface limpa */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Seção de header com imagem representativa e informações principais */}
        <View style={styles.header}>
          {/* Imagem do percurso/destino carregada via URI remota */}
          <Image source={{ uri: percurso.img }} style={styles.headerImage} />
          {/* Container das informações principais do header */}
          <View style={styles.headerInfo}>
            {/* Nome/título do percurso com destaque tipográfico */}
            <Text style={styles.title}>{percurso.nome}</Text>
            {/* Data formatada com capitalização para apresentação formal */}
            <Text style={styles.date}>{formatDisplayDate(percurso.selectedDate)}</Text>
            {/* Horário da viagem com peso visual médio */}
            <Text style={styles.time}>{percurso.horario}</Text>
          </View>
        </View>

        {/* Seção de informações principais da viagem com métricas detalhadas */}
        <View style={styles.section}>
          {/* Título da seção com hierarquia tipográfica clara */}
          <Text style={styles.sectionTitle}>Informações da Viagem</Text>
          
          {/* Lista de métricas usando componente DetailRow reutilizável */}
          {/* Cada linha apresenta label-valor com formatação consistente */}
          
          {/* Distância percorrida durante a viagem */}
          <DetailRow label="Distância" value={percurso.distancia} />
          {/* Tempo total de duração da viagem */}
          <DetailRow label="Duração" value={percurso.duracao} />
          {/* Velocidade média mantida durante o percurso */}
          <DetailRow label="Velocidade Média" value={percurso.velocidadeMedia} />
          {/* Quantidade de combustível consumido */}
          <DetailRow label="Combustível Gasto" value={percurso.combustivel} />
          {/* Custo total estimado com estilo personalizado para destaque */}
          <DetailRow 
            label="Custo Estimado" 
            value={percurso.custo} 
            style={styles.costValue} 
          />
        </View>

        {/* Seção dedicada aos EcoCoins ganhos ou perdidos na viagem */}
        {/* Sistema de gamificação que recompensa condução eco-eficiente */}
        <View style={styles.ecoCoinsSection}>
          {/* Header da seção com ícone EcoCoin e título dinâmico */}
          <View style={styles.ecoCoinsHeader}>
            {/* Ícone personalizado EcoCoin para identificação visual */}
            <EcoCoinIcon size={24} style={styles.ecoCoinsHeaderIcon} />
            {/* Título dinâmico baseado em ganho ou perda de pontos */}
            <Text style={styles.ecoCoinsTitle}>
              {(percurso.ecoCoins || 0) >= 0 ? 'EcoCoins Ganhos' : 'EcoCoins Perdidos'}
            </Text>
          </View>
          {/* Card principal dos EcoCoins com estilização baseada em ganho/perda */}
          <View style={[
            styles.ecoCoinsCard,
            // Estilo condicional: vermelho para perda, verde para ganho
            (percurso.ecoCoins || 0) < 0 ? styles.ecoCoinsCardNegative : styles.ecoCoinsCardPositive
          ]}>
            {/* Valor numérico dos EcoCoins com formatação de sinal */}
            <Text style={[
              styles.ecoCoinsAmount,
              // Cor do texto baseada em ganho (verde) ou perda (vermelho)
              (percurso.ecoCoins || 0) < 0 ? styles.ecoCoinsAmountNegative : styles.ecoCoinsAmountPositive
            ]}>
              {/* Formatação com sinal '+' para valores positivos */}
              {(percurso.ecoCoins || 0) >= 0 ? `+${percurso.ecoCoins || 0}` : percurso.ecoCoins || 0}
            </Text>
            {/* Label 'EcoCoins' com estilo consistente ao valor */}
            <Text style={[
              styles.ecoCoinsLabel,
              (percurso.ecoCoins || 0) < 0 ? styles.ecoCoinsLabelNegative : styles.ecoCoinsLabelPositive
            ]}>
              EcoCoins
            </Text>
            {/* Descrição educativa sobre o sistema de pontuação */}
            <Text style={styles.ecoCoinsDescription}>
              {(percurso.ecoCoins || 0) >= 0 
                ? 'Baseado na eficiência da sua condução' 
                : 'Condução ineficiente resulta em perda de EcoCoins'
              }
            </Text>
          </View>
        </View>

        {/* Seção condicional da rota utilizada */}
        {/* Exibida apenas quando dados de rota estão disponíveis */}
        {percurso.rota && (
          <View style={styles.section}>
            {/* Título da seção de informações de rota */}
            <Text style={styles.sectionTitle}>Rota Utilizada</Text>
            {/* Descrição da rota em texto itálico para diferenciação visual */}
            <Text style={styles.routeText}>{percurso.rota}</Text>
          </View>
        )}

        {/* Seção condicional de observações do usuário */}
        {/* Renderizada apenas quando existem observações registradas */}
        {percurso.observacoes && (
          <View style={styles.section}>
            {/* Título da seção de notas e observações */}
            <Text style={styles.sectionTitle}>Observações</Text>
            {/* Texto das observações com formatação específica */}
            <Text style={styles.observationText}>{percurso.observacoes}</Text>
          </View>
        )}

        {/* Seção de estatísticas visuais em formato de cards */}
        {/* Apresenta métricas principais em layout horizontal para comparação rápida */}
        <View style={styles.section}>
          {/* Título da seção de estatísticas resumidas */}
          <Text style={styles.sectionTitle}>Estatísticas</Text>
          
          {/* Container flexível para distribuição horizontal dos cards de estatísticas */}
          <View style={styles.statsContainer}>
            {/* Card de distância com processamento de string para exibição numérica */}
            <View style={styles.statBox}>
              {/* Valor numérico extraído removendo unidade ' km' para apresentação limpa */}
              <Text style={styles.statValue}>{percurso.distancia?.replace(' km', '') || '0'}</Text>
              {/* Label descritiva da métrica */}
              <Text style={styles.statLabel}>Quilômetros</Text>
            </View>
            
            {/* Card de duração com processamento similar para minutos */}
            <View style={styles.statBox}>
              {/* Valor de tempo extraído removendo unidade ' min' */}
              <Text style={styles.statValue}>{percurso.duracao?.replace(' min', '') || '0'}</Text>
              {/* Label temporal */}
              <Text style={styles.statLabel}>Minutos</Text>
            </View>
            
            {/* Card de combustível com extração da unidade litros */}
            <View style={styles.statBox}>
              {/* Valor de combustível sem unidade 'L' para apresentação numérica */}
              <Text style={styles.statValue}>{percurso.combustivel?.replace('L', '') || '0'}</Text>
              {/* Label de volume */}
              <Text style={styles.statLabel}>Litros</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

// Sistema de estilos da tela PercursoDetalhes com tema eco-friendly
// Utiliza paleta de verdes naturais e design minimalista para apresentação de dados
const styles = StyleSheet.create({
  // Container principal que ocupa toda a tela com fundo eco-friendly
  // Cor de fundo verde claro (#F8F9F7) para atmosfera natural e relaxante
  container: {
    flex: 1, // Ocupa todo espaço vertical disponível
    backgroundColor: '#F8F9F7', // Verde muito claro para fundo principal
  },
  // Header secundário com navegação e título
  navigationHeader: {
    paddingHorizontal: 24, // Padding lateral consistente
    paddingVertical: 16, // Padding vertical para separação
    backgroundColor: '#FFFFFF', // Fundo branco limpo
    flexDirection: 'row', // Layout horizontal
    justifyContent: 'space-between', // Distribui espaço entre elementos
    alignItems: 'center', // Alinha elementos verticalmente no centro
    shadowColor: 'rgba(42, 60, 26, 0.1)', // Sombra sutil
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  // Título do header de navegação
  navigationTitle: {
    fontSize: 18, // Tamanho de fonte médio-grande
    fontWeight: '600', // Peso semi-bold
    color: '#2A3C1A', // Verde escuro para contraste
    flex: 1, // Ocupa espaço disponível
    textAlign: 'center', // Centraliza o texto
  },
  // Placeholder para manter layout simétrico
  placeholder: {
    width: 40, // Mesma largura do BackButton
  },
  // Container do conteúdo scrollável com padding lateral consistente
  // Permite organização visual com respiro lateral adequado
  content: {
    flex: 1, // Ocupa espaço vertical disponível
    paddingHorizontal: 24, // Padding lateral generoso para legibilidade
  },
  // Estilo do header principal com imagem e informações básicas
  // Card elevado com sombra sutil para hierarquia visual clara
  header: {
    flexDirection: 'row', // Layout horizontal para imagem + informações
    backgroundColor: '#FFFFFF', // Fundo branco para contraste e limpeza
    borderRadius: 12, // Bordas arredondadas médias para suavidade
    padding: 16, // Padding interno generoso para respiração
    marginBottom: 24, // Margem inferior para separação de seções
    // Sistema de sombras consistente para depth visual
    shadowColor: 'rgba(42, 60, 26, 0.1)', // Sombra verde escura com transparência
    shadowOffset: { width: 0, height: 2 }, // Offset vertical para naturalidade
    shadowOpacity: 0.1, // Opacidade sutil para elegância
    shadowRadius: 4, // Raio de desfoque suave
    elevation: 2, // Elevação para Android
  },
  // Estilo da imagem de header com dimensões fixas e bordas arredondadas
  // Proporção quadrada para consistência visual em diferentes conteúdos
  headerImage: {
    width: 80, // Largura fixa otimizada para visualização
    height: 80, // Altura quadrada para harmonia
    borderRadius: 12, // Bordas arredondadas consistentes com o container
    marginRight: 16, // Margem direita para separação do texto
  },
  // Container flexível para informações textuais do header
  // Ocupa espaço restante e centraliza conteúdo verticalmente
  headerInfo: {
    flex: 1, // Ocupa espaço horizontal disponível
    justifyContent: 'center', // Centralização vertical do conteúdo
  },
  // Estilo do título principal do percurso com hierarquia tipográfica clara
  // Verde escuro (#2A3C1A) para máximo contraste e legibilidade
  title: {
    fontSize: 20, // Tamanho grande para hierarquia de título principal
    fontWeight: 'bold', // Peso bold para destaque e importância
    color: '#2A3C1A', // Verde escuro do tema para consistência
    marginBottom: 4, // Margem inferior pequena para proximidade
  },
  // Estilo da data formatada com cor secundária e transformação visual
  // Apresentação elegante com capitalização para formalidade
  date: {
    fontSize: 14, // Tamanho médio-pequeno para informação secundária
    color: '#7F9170', // Verde médio para hierarquia visual
    marginBottom: 2, // Margem mínima para agrupamento visual
    textTransform: 'capitalize', // Capitalização da primeira letra de cada palavra
  },
  // Estilo do horário com peso visual intermediário
  // Balanceamento entre título e data na hierarquia de informações
  time: {
    fontSize: 16, // Tamanho médio para informação importante mas secundária
    fontWeight: '600', // Peso semi-bold para destaque moderado
    color: '#51663E', // Verde escuro médio para consistência do tema
  },
  // Estilo base para seções de conteúdo com card design consistente
  // Reutilizado em múltiplas seções para uniformidade visual
  section: {
    backgroundColor: '#FFFFFF', // Fundo branco para contraste e limpeza
    borderRadius: 12, // Bordas arredondadas consistentes
    padding: 16, // Padding interno para respiração do conteúdo
    marginBottom: 16, // Margem inferior para separação entre seções
    // Sistema de sombras idêntico ao header para consistência
    shadowColor: 'rgba(42, 60, 26, 0.1)', // Sombra verde com transparência
    shadowOffset: { width: 0, height: 2 }, // Offset vertical natural
    shadowOpacity: 0.1, // Opacidade sutil
    shadowRadius: 4, // Desfoque suave
    elevation: 2, // Elevação Android
  },
  // Estilo dos títulos de seção com hierarquia clara
  // Verde escuro para consistência e peso bold para estruturação
  sectionTitle: {
    fontSize: 18, // Tamanho grande para hierarquia de seção
    fontWeight: 'bold', // Peso bold para organização visual
    color: '#2A3C1A', // Verde escuro consistente com título principal
    marginBottom: 12, // Margem inferior para separação do conteúdo
  },
  // Estilo das linhas de detalhes para layout label-valor consistente
  // Layout horizontal com separação visual através de borda inferior
  detailRow: {
    flexDirection: 'row', // Layout horizontal para label e valor
    justifyContent: 'space-between', // Distribuição nas extremidades
    alignItems: 'center', // Alinhamento vertical central
    paddingVertical: 8, // Padding vertical para área de toque adequada
    borderBottomWidth: 1, // Borda inferior sutil para separação
    borderBottomColor: '#f0f0f0', // Cor cinza muito clara para divisão discreta
  },
  // Estilo dos labels (rótulos) das informações
  // Cor neutra e peso médio para hierarquia visual adequada
  detailLabel: {
    fontSize: 14, // Tamanho padrão para labels informativos
    color: '#666', // Cinza médio para informação secundária
    fontWeight: '500', // Peso médio para legibilidade sem concorrer com valores
  },
  // Estilo dos valores das informações com destaque visual
  // Verde escuro e peso maior para dados principais
  detailValue: {
    fontSize: 14, // Tamanho consistente com labels
    color: '#2A3C1A', // Verde escuro para destaque e importância
    fontWeight: '600', // Peso semi-bold para valores importantes
  },
  // Estilo específico para valores de custo com cor diferenciada
  // Verde médio e tamanho maior para destaque financeiro
  costValue: {
    color: '#7F9170', // Verde médio para informação financeira
    fontSize: 16, // Tamanho maior para destaque do custo
  },
  // Estilo do texto de rota com formatação itálica distintiva
  // Diferenciação visual para informações de navegação
  routeText: {
    fontSize: 14, // Tamanho padrão para conteúdo de seção
    color: '#51663E', // Verde escuro médio para legibilidade
    lineHeight: 20, // Altura de linha otimizada para leitura
    fontStyle: 'italic', // Itálico para diferenciação de texto descritivo
  },
  // Estilo do texto de observações com tom mais suave
  // Verde claro para notas e comentários secundários
  observationText: {
    fontSize: 14, // Tamanho consistente com outros textos de seção
    color: '#7F9170', // Verde médio para informação complementar
    lineHeight: 20, // Altura de linha para conforto de leitura
  },
  // Estilo da seção dedicada aos EcoCoins com design card consistente
  // Reutiliza estrutura base das seções mas com propósito específico de gamificação
  ecoCoinsSection: {
    backgroundColor: '#FFFFFF', // Fundo branco para destaque
    borderRadius: 12, // Bordas arredondadas consistentes
    padding: 16, // Padding interno generoso
    marginBottom: 16, // Margem inferior para separação
    // Sistema de sombras idêntico para consistência visual
    shadowColor: 'rgba(42, 60, 26, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  // Header da seção EcoCoins com ícone e título em layout horizontal
  // Combinação visual para identificação rápida da funcionalidade
  ecoCoinsHeader: {
    flexDirection: 'row', // Layout horizontal para ícone + texto
    alignItems: 'center', // Alinhamento vertical central
    marginBottom: 12, // Margem inferior para separação do conteúdo
  },
  // Estilo do ícone no header da seção EcoCoins
  // Margem direita para espaçamento adequado do texto
  ecoCoinsHeaderIcon: {
    marginRight: 8, // Espaçamento entre ícone e título
  },
  // Estilo do título da seção EcoCoins com hierarquia clara
  // Consistente com outros títulos de seção
  ecoCoinsTitle: {
    fontSize: 18, // Tamanho de título de seção
    fontWeight: 'bold', // Peso bold para hierarquia
    color: '#2A3C1A', // Verde escuro consistente
  },
  // Card principal dos EcoCoins com centralização de conteúdo
  // Base para aplicação de cores condicionais baseadas em ganho/perda
  ecoCoinsCard: {
    borderRadius: 12, // Bordas arredondadas para suavidade
    padding: 20, // Padding generoso para destaque do conteúdo
    alignItems: 'center', // Centralização horizontal de todos os elementos
  },
  // Estilo do card para EcoCoins positivos (ganhos)
  // Verde claro (#BFE59E) para representar sucesso e recompensa
  ecoCoinsCardPositive: {
    backgroundColor: '#BFE59E', // Verde claro para ganhos
  },
  // Estilo do card para EcoCoins negativos (perdas)
  // Rosa claro (#FFE5E5) para representar perda sem alarmar excessivamente
  ecoCoinsCardNegative: {
    backgroundColor: '#FFE5E5', // Rosa claro para perdas
  },
  // Estilo base do valor numérico dos EcoCoins com destaque tipográfico
  // Tamanho grande e peso bold para máximo impacto visual
  ecoCoinsAmount: {
    fontSize: 32, // Tamanho extra grande para destaque principal
    fontWeight: 'bold', // Peso bold para importância máxima
    marginBottom: 4, // Margem inferior pequena para proximidade com label
  },
  // Estilo para valores positivos de EcoCoins (ganhos)
  // Verde escuro consistente com tema da aplicação
  ecoCoinsAmountPositive: {
    color: '#2A3C1A', // Verde escuro para ganhos positivos
  },
  // Estilo para valores negativos de EcoCoins (perdas)
  // Vermelho escuro para indicar claramente a perda
  ecoCoinsAmountNegative: {
    color: '#D32F2F', // Vermelho escuro para perdas
  },
  // Estilo base do label "EcoCoins" com peso intermediário
  // Complementa o valor numérico sem competir visualmente
  ecoCoinsLabel: {
    fontSize: 16, // Tamanho médio para label identificativo
    fontWeight: '600', // Peso semi-bold para destaque moderado
    marginBottom: 8, // Margem inferior para separação da descrição
  },
  // Label positivo para ganhos de EcoCoins
  // Verde médio consistente com tema eco-friendly
  ecoCoinsLabelPositive: {
    color: '#51663E', // Verde médio para labels positivos
  },
  // Label negativo para perdas de EcoCoins
  // Vermelho mais escuro para consistência com o valor
  ecoCoinsLabelNegative: {
    color: '#B71C1C', // Vermelho escuro para labels negativos
  },
  // Estilo da descrição educativa dos EcoCoins
  // Texto explicativo em tamanho pequeno e estilo itálico
  ecoCoinsDescription: {
    fontSize: 12, // Tamanho pequeno para texto explicativo
    color: '#7F9170', // Verde médio para informação secundária
    textAlign: 'center', // Centralização para harmonia com o card
    fontStyle: 'italic', // Itálico para diferenciação de texto descritivo
  },
  // Container horizontal para distribuição uniforme dos cards de estatísticas
  // Layout flexível que distribui igualmente os três cards principais
  statsContainer: {
    flexDirection: 'row', // Layout horizontal para cards lado a lado
    justifyContent: 'space-around', // Distribuição uniforme com espaçamento automático
  },
  // Estilo individual de cada card de estatística
  // Centralização de conteúdo e ocupação flexível do espaço
  statBox: {
    alignItems: 'center', // Centralização horizontal do conteúdo
    flex: 1, // Ocupação igual do espaço disponível entre os três cards
  },
  // Estilo do valor numérico das estatísticas com destaque visual
  // Verde médio para consistência temática e tamanho grande para legibilidade
  statValue: {
    fontSize: 24, // Tamanho grande para destaque dos valores principais
    fontWeight: 'bold', // Peso bold para importância visual
    color: '#7F9170', // Verde médio consistente com tema da aplicação
  },
  // Estilo dos labels das estatísticas com hierarquia inferior
  // Tamanho pequeno e cor neutra para informação complementar
  statLabel: {
    fontSize: 12, // Tamanho pequeno para labels descritivos
    color: '#666', // Cinza médio para hierarquia visual adequada
    marginTop: 4, // Margem superior pequena para separação do valor
  },
});