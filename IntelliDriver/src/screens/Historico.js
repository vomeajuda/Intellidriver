// Importações de componentes nativos do React Native para construção da interface de histórico
// StyleSheet: Sistema de estilos otimizado para definição de aparência
// Text: Componente fundamental para exibição de textos estilizados
// View: Container universal para layout e estruturação visual
// FlatList: Componente de lista performática para grandes volumes de dados
// Image: Componente para renderização de imagens dos percursos
// TouchableOpacity: Botão interativo com feedback visual de opacidade
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
// Importação do hook useState para gerenciamento de estados locais do componente
import { useState } from 'react';
// Importação do hook de navegação para transição entre telas
import { useNavigation } from '@react-navigation/native';
// Importação do componente NavBar para navegação inferior consistente
import NavBar from '../components/Navbar';
// Importação do componente Header para cabeçalho com logo centralizada
import Header from '../components/Header';
// Importação do componente Calendario para seleção de datas e visualização temporal
import Calendario from '../components/Calendario';
// Importação do ícone personalizado EcoCoin para exibição de pontuação
import EcoCoinIcon from '../assets/ecocoin-icon';
// Importações de funções utilitárias para manipulação de dados de percursos
// getPercursosByDate: busca percursos filtrados por data específica
// formatDateToString: converte objetos de data para string no formato adequado
// getTodayString: retorna string da data atual para inicialização
// getTodayString: retorna string da data atual para inicialização
import { getPercursosByDate, formatDateToString, getTodayString } from '../data/percursosData';

// Componente funcional principal Historico que gerencia visualização de percursos históricos
// Permite alternância entre visualização semanal e mensal com filtros por data
export default function Historico() {
  // Hook de navegação para transição para tela de detalhes de percurso
  const navigation = useNavigation();
  // Estado para controlar tipo de visualização do calendário (semanal vs mensal)
  // true = visualização semanal (padrão), false = visualização mensal
  const [isWeeklyView, setIsWeeklyView] = useState(true); // Inicia com visualização semanal
  // Estado para armazenar data selecionada pelo usuário, inicializa com data atual
  const [selectedDate, setSelectedDate] = useState(getTodayString()); // Data selecionada (hoje por padrão)
  // Estado para armazenar lista de percursos filtrados pela data selecionada
  // Estado para armazenar lista de percursos filtrados pela data selecionada
  const [percursos, setPercursos] = useState(getPercursosByDate(getTodayString())); // Percursos da data selecionada

  // Função para manipular seleção de dia no calendário
  // Atualiza data selecionada e carrega percursos correspondentes
  const handleDayPress = (day) => {
    // Converte objeto de data para string no formato adequado
    const dateString = formatDateToString(day);
    if (dateString) {
      // Atualiza estado da data selecionada
      setSelectedDate(dateString);
      // Busca e atualiza percursos para a nova data
      setPercursos(getPercursosByDate(dateString));
      console.log('Data selecionada:', dateString);
    }
  };

  // Função para formatação de data para exibição amigável ao usuário
  // Converte string de data em formato legível em português brasileiro
  const formatDisplayDate = (dateString) => {
    // Retorna mensagem padrão se não há data selecionada
    if (!dateString) return 'Selecione uma data';
    
    // Cria objeto Date adicionando horário para evitar problemas de timezone
    const date = new Date(dateString + 'T00:00:00');
    // Retorna data formatada com dia da semana, dia, mês e ano por extenso
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Função para navegação para tela de detalhes do percurso
  // Passa dados do percurso e data selecionada como parâmetros
  const handleItemPress = (item) => {
    navigation.navigate('PercursoDetalhes', { 
      // Combina dados do item com data selecionada para contexto completo
      percurso: { ...item, selectedDate } 
    });
  };

  // Função de renderização para cada item de percurso na lista
  // Cria layout completo com agrupamento por horário e informações detalhadas
  const renderPercursoItem = ({ item, index }) => {
    // Extrai valor de EcoCoins com fallback para 0
    const ecoCoins = item.ecoCoins || 0;
    // Determina se valor é negativo para estilização diferenciada
    const isNegative = ecoCoins < 0;
    // Verifica se deve exibir header de horário (primeiro item ou mudança de horário)
    // Verifica se deve exibir header de horário (primeiro item ou mudança de horário)
    const showTimeHeader = index === 0 || percursos[index - 1]?.horario !== item.horario;
    
    return (
      <View>
        {/* Divisor de horário para agrupamento visual de percursos */}
        {showTimeHeader && (
          <View style={[styles.timeHeader, index === 0 && styles.firstTimeHeader]}>
            <Text style={styles.timeHeaderText}>{item.horario}</Text>
          </View>
        )}
        
        {/* Item principal do percurso com informações completas */}
        <TouchableOpacity style={styles.item} onPress={() => handleItemPress(item)}>
          {/* Imagem representativa do percurso */}
          <Image source={{ uri: item.img }} style={styles.img} />
          <View style={styles.itemContent}>
            {/* Linha superior com nome e distância */}
            <View style={styles.itemTopRow}>
              <Text style={styles.itemText}>{item.nome}</Text>
              <Text style={styles.itemDistance}>{item.distancia}</Text>
            </View>
            {/* Container de EcoCoins com estilização baseada em valor positivo/negativo */}
            <View style={[
              styles.ecoCoinsContainer,
              isNegative ? styles.ecoCoinsContainerNegative : styles.ecoCoinsContainerPositive
            ]}>
              <EcoCoinIcon size={16} style={styles.ecoCoinsIconStyle} />
              <Text style={[
                styles.ecoCoinsText,
                isNegative ? styles.ecoCoinsTextNegative : styles.ecoCoinsTextPositive
              ]}>
                {/* Formatação de valor com sinal + para positivos */}
                {isNegative ? ecoCoins : `+${ecoCoins}`} EcoCoins
              </Text>
            </View>
            {/* Indicador visual para ação de toque */}
            <View style={styles.viewMoreContainer}>
              <Text style={styles.viewMoreText}>Toque para ver detalhes ›</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  // Componente de cabeçalho da lista com calendário condicional e estados vazios
  const ListHeaderComponent = () => (
    <View style={styles.listHeader}>
      {/* Calendário exibido apenas em visualização mensal */}
      {!isWeeklyView && (
        <View style={styles.calendarInHeader}>
          <Calendario 
            onDayPress={handleDayPress}
            isWeeklyView={isWeeklyView}
            selectedDate={selectedDate}
          />
        </View>
      )}
      {/* Divisor visual para separação do conteúdo */}
      <View style={styles.divider} />
      {/* Mensagem de estado vazio quando não há percursos */}
      {percursos.length === 0 && (
        <Text style={styles.noDataText}>
          Nenhum percurso encontrado para esta data
        </Text>
      )}
    </View>
  );

  // Estrutura principal da tela de histórico
  return (
    <View style={styles.mainContainer}>
      {/* Header com logo centralizada - ocupando toda a largura */}
      <Header />
      
      <View style={styles.container}>
        {/* Título principal da tela */}
        <Text style={styles.title}>Histórico</Text>
      
      {/* Botões alternadores para visualização semanal/mensal */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, styles.leftButton, isWeeklyView && styles.activeButton]}
          onPress={() => setIsWeeklyView(true)}
        >
          <Text style={[styles.toggleText, isWeeklyView && styles.activeText]}>Semanal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, styles.rightButton, !isWeeklyView && styles.activeButton]}
          onPress={() => setIsWeeklyView(false)}
        >
          <Text style={[styles.toggleText, !isWeeklyView && styles.activeText]}>Mensal</Text>
        </TouchableOpacity>
      </View>

      {/* Calendário fixo exibido apenas para visualização semanal */}
      {isWeeklyView && (
        <View style={styles.calendarContainer}>
          <Calendario 
            onDayPress={handleDayPress}
            isWeeklyView={isWeeklyView}
            selectedDate={selectedDate}
          />
        </View>
      )}

      {/* Lista principal de percursos com configurações de performance */}
      <FlatList
        // Dados dos percursos filtrados por data
        data={percursos}
        // Chave única para otimização de renderização
        keyExtractor={(item) => item.id}
        // Função de renderização de cada item
        renderItem={renderPercursoItem}
        // Componente de cabeçalho com calendário condicional
        ListHeaderComponent={ListHeaderComponent}
        // Remove indicador de scroll para interface mais limpa
        showsVerticalScrollIndicator={false}
        // Estilos do container do conteúdo
        contentContainerStyle={styles.listContent}
        // Estilo da FlatList
        style={styles.flatList}
      />
      {/* Navegação inferior fixa */}
      <NavBar />
      </View>
    </View>
  );
}

// Definição de estilos usando StyleSheet para otimização de performance
// Centraliza todos os estilos do componente Historico com tema verde eco-friendly
const styles = StyleSheet.create({
  // Container principal sem padding para header ocupar toda largura
  mainContainer: {
    flex: 1,
    backgroundColor: '#F8F9F7',
  },

  // Container principal ocupando toda a tela com fundo claro
  container: { 
    flex: 1, 
    // Cor de fundo suave em tom verde claro para identidade visual
    backgroundColor: '#F8F9F7',
    // Padding horizontal padrão para margens laterais
    paddingHorizontal: 24,
  },

  // Estilo do título principal "Histórico"
  title: { 
    // Tamanho grande para título principal
    fontSize: 32,
    // Peso bold para destaque e hierarquia
    fontWeight: 'bold',
    // Cor verde escura para identidade da marca
    color: '#2A3C1A',
    // Margem superior para espaçamento do header
    marginTop: 16,
    // Margem inferior para espaçamento do conteúdo
    marginBottom: 24,
  },
  // Container dos botões de alternância semanal/mensal
  toggleContainer: {
    // Layout horizontal para os dois botões
    flexDirection: 'row',
    // Fundo branco para contraste
    backgroundColor: '#FFFFFF',
    // Bordas bem arredondadas para aparência moderna
    borderRadius: 25,
    // Padding interno para espaçamento dos botões
    padding: 4,
    // Margem inferior para separação do calendário
    marginBottom: 8,
    // Configurações de sombra para elevação sutil
    shadowColor: 'rgba(42, 60, 26, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  // Estilo base para botões de alternância
  toggleButton: {
    // Ocupa metade do espaço disponível
    flex: 1,
    // Padding vertical para área de toque adequada
    paddingVertical: 8,
    // Padding horizontal para espaçamento do texto
    paddingHorizontal: 16,
    // Centraliza conteúdo horizontalmente
    alignItems: 'center',
    // Centraliza conteúdo verticalmente
    justifyContent: 'center',
  },
  // Bordas arredondadas específicas para botão esquerdo
  leftButton: {
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  // Bordas arredondadas específicas para botão direito
  rightButton: {
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  // Estilo para botão ativo/selecionado
  activeButton: {
    // Fundo verde para indicar seleção
    backgroundColor: '#7F9170',
  },
  // Texto dos botões de alternância
  toggleText: {
    // Tamanho pequeno para texto de botão
    fontSize: 12,
    // Peso medium para legibilidade
    fontWeight: '500',
    // Cor verde escura para texto não selecionado
    color: '#51663E',
  },
  // Texto do botão ativo
  activeText: {
    // Cor branca para contraste com fundo verde
    color: '#FFFFFF',
  },
  calendarContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 6,
    marginBottom: 16,
    shadowColor: 'rgba(42, 60, 26, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: { 
    fontSize: 16,
    fontWeight: '600',
    color: '#51663E',
    marginTop: 24,
    marginBottom: 16,
  },
  flatList: {
    flex: 1,
  },
  listHeader: {
    paddingVertical: 8,
  },
  calendarInHeader: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 6,
    marginBottom: 16,
    shadowColor: 'rgba(42, 60, 26, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  selectedDateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2A3C1A',
    textAlign: 'center',
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  noDataText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 20,
  },
  item: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 2,
    borderRadius: 12,
    shadowColor: 'rgba(42, 60, 26, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  img: { 
    width: 50, 
    height: 50, 
    marginRight: 16, 
    borderRadius: 8,
  },
  itemContent: {
    flex: 1,
  },
  itemTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  itemText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2A3C1A',
    flex: 1,
    marginRight: 8,
  },
  itemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeHeader: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: '#F8F9F7',
    borderLeftWidth: 1,
    borderLeftColor: '#7F9170',
    marginBottom: 4,
    marginTop: 8,
  },
  firstTimeHeader: {
    marginTop: 0,
  },
  timeHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#51663E',
  },
  itemDistance: {
    fontSize: 12,
    color: '#7F9170',
    fontWeight: '500',
    minWidth: 50,
    textAlign: 'right',
  },
  ecoCoinsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  ecoCoinsContainerPositive: {
    backgroundColor: '#BFE59E',
  },
  ecoCoinsContainerNegative: {
    backgroundColor: '#FFE5E5',
  },
  ecoCoinsIconStyle: {
    marginRight: 4,
  },
  ecoCoinsText: {
    fontSize: 11,
    fontWeight: '600',
  },
  ecoCoinsTextPositive: {
    color: '#2A3C1A',
  },
  ecoCoinsTextNegative: {
    color: '#D32F2F',
  },
  viewMoreContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
  viewMoreText: {
    fontSize: 11,
    color: '#7F9170',
    fontWeight: '500',
  },
  listContent: {
    paddingBottom: 120,
  },
});