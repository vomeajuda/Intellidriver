import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import NavBar from '../components/Navbar';
import Header from '../components/Header';
import Calendario from '../components/Calendario';
import EcoCoinIcon from '../assets/ecocoin-icon';
import { getPercursosByDate, formatDateToString, getTodayString } from '../data/percursosData';

/**
 * Tela de Histórico - Exibe percursos realizados organizados por data
 * Permite alternar entre visualização semanal e mensal
 */
export default function Historico() {
  const navigation = useNavigation();
  
  // Estados para controle da interface
  const [isWeeklyView, setIsWeeklyView] = useState(true); // Controla tipo de visualização do calendário
  const [selectedDate, setSelectedDate] = useState(getTodayString()); // Data atualmente selecionada
  const [percursos, setPercursos] = useState(getPercursosByDate(getTodayString())); // Lista de percursos filtrados

  // Manipula seleção de data no calendário
  const handleDayPress = (day) => {
    const dateString = formatDateToString(day);
    if (dateString) {
      setSelectedDate(dateString);
      setPercursos(getPercursosByDate(dateString)); // Atualiza percursos para nova data
      console.log('Data selecionada:', dateString);
    }
  };

  const formatDisplayDate = (dateString) => {
    if (!dateString) return 'Selecione uma data';
    
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Navega para detalhes do percurso
  const handleItemPress = (item) => {
    navigation.navigate('PercursoDetalhes', { 
      percurso: { ...item, selectedDate } 
    });
  };

  // Renderiza cada item da lista de percursos
  const renderPercursoItem = ({ item, index }) => {
    const ecoCoins = item.ecoCoins || 0;
    const isNegative = ecoCoins < 0;
    const showTimeHeader = index === 0 || percursos[index - 1]?.horario !== item.horario;
    
    // Calcula horário de término a partir de horario (HH:MM) e duracao ('XX min')
    const calculateEndTime = (start, dur) => {
      if (!start || !dur) return null;
      try {
        const [h, m] = start.split(':').map(Number);
        const minutes = parseInt(String(dur).replace(/[^0-9]/g, ''), 10);
        const date = new Date();
        date.setHours(h || 0, m || 0, 0, 0);
        date.setMinutes(date.getMinutes() + (isNaN(minutes) ? 0 : minutes));
        return date.toTimeString().slice(0,5);
      } catch (e) {
        return null;
      }
    };
    const endTime = calculateEndTime(item.horario, item.duracao);

    return (
      <View>
        
        <TouchableOpacity style={styles.item} onPress={() => handleItemPress(item)}>
          {/* Use imagem local padrão quando item.img for o marcador 'imgPercurso.png' */}
          {item.img === 'imgPercurso.png' ? (
            <Image source={require('../assets/imgPercurso.png')} style={styles.img} />
          ) : (
            <Image source={{ uri: item.img }} style={styles.img} />
          )}
          <View style={styles.itemContent}>
            <View style={styles.itemTopRow}>
              <Text style={styles.itemText}>{item.horario}{endTime ? ` – ${endTime}` : ''}</Text>
              <Text style={styles.itemDistance}>{item.distancia}</Text>
            </View>
            {/* EcoCoins com estilização baseada em ganho/perda */}
            <View style={[
              styles.ecoCoinsContainer,
              isNegative ? styles.ecoCoinsContainerNegative : styles.ecoCoinsContainerPositive
            ]}>
              <EcoCoinIcon size={16} style={styles.ecoCoinsIconStyle} />
              <Text style={[
                styles.ecoCoinsText,
                isNegative ? styles.ecoCoinsTextNegative : styles.ecoCoinsTextPositive
              ]}>
                {isNegative ? ecoCoins : `+${ecoCoins}`} EcoCoins
              </Text>
            </View>
            <View style={styles.viewMoreContainer}>
              <Text style={styles.viewMoreText}>Toque para ver detalhes ›</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  // Componente de cabeçalho da lista com calendário e estados vazios
  const ListHeaderComponent = () => (
    <View style={styles.listHeader}>
      {/* Calendário exibido apenas na visualização mensal */}
      {!isWeeklyView && (
        <View style={styles.calendarInHeader}>
          <Calendario 
            onDayPress={handleDayPress}
            isWeeklyView={isWeeklyView}
            selectedDate={selectedDate}
          />
        </View>
      )}
      <View style={styles.divider} />
      {/* Mensagem quando não há percursos */}
      {percursos.length === 0 && (
        <Text style={styles.noDataText}>
          Nenhum percurso encontrado para esta data
        </Text>
      )}
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <Header />
      
      <View style={styles.container}>
        <Text style={styles.title}>Histórico</Text>
      
      {/* Botões para alternar entre visualização semanal/mensal */}
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

      {/* Calendário fixo para visualização semanal */}
      {isWeeklyView && (
        <View style={styles.calendarContainer}>
          <Calendario 
            onDayPress={handleDayPress}
            isWeeklyView={isWeeklyView}
            selectedDate={selectedDate}
          />
        </View>
      )}

      {/* Lista principal de percursos */}
      <FlatList
        data={percursos}
        keyExtractor={(item) => item.id}
        renderItem={renderPercursoItem}
        ListHeaderComponent={ListHeaderComponent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        style={styles.flatList}
      />
      <NavBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F8F9F7',
  },

  container: { 
    flex: 1, 
    backgroundColor: '#F8F9F7',
    paddingHorizontal: 24,
  },

  title: { 
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2A3C1A',
    marginTop: 16,
    marginBottom: 24,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 4,
    marginBottom: 8,
    shadowColor: 'rgba(42, 60, 26, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftButton: {
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  rightButton: {
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  activeButton: {
    backgroundColor: '#7F9170',
  },
  toggleText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#51663E',
  },
  activeText: {
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
    marginBottom: 8,
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