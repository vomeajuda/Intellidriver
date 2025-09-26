import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import BackButton from '../components/BackButton';
import Header from '../components/Header';
import EcoCoinIcon from '../assets/ecocoin-icon';

/**
 * Tela de Detalhes do Percurso - Exibe informações completas de uma viagem
 * Recebe dados via navigation params da tela de Histórico
 */
export default function PercursoDetalhes() {
  const navigation = useNavigation();
  const route = useRoute();
  const { percurso } = route.params || {}; // Extrai dados do percurso dos parâmetros de navegação

  // Validação de segurança - exibe erro se não há dados
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

  // Formata data para exibição em português
  const formatDisplayDate = (dateString) => {
    if (!dateString) return 'Data não disponível';
    
    const date = new Date(dateString + 'T00:00:00');
    
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Componente reutilizável para exibir informações em formato label-valor
  const DetailRow = ({ label, value, style }) => (
    <View style={styles.detailRow}>

      <Text style={styles.detailLabel}>{label}</Text>

      <Text style={[styles.detailValue, style]}>{value || 'N/A'}</Text>
    </View>
  );


  return (
    <View style={styles.container}>
      <Header />
      
      {/* Header de navegação com título */}
      <View style={styles.navigationHeader}>
        <BackButton />
        <Text style={styles.navigationTitle}>Detalhes do Percurso</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Seção principal com imagem e informações básicas */}
        <View style={styles.header}>
          <Image source={{ uri: percurso.img }} style={styles.headerImage} />
          <View style={styles.headerInfo}>
            <Text style={styles.title}>{percurso.nome}</Text>
            <Text style={styles.date}>{formatDisplayDate(percurso.selectedDate)}</Text>
            <Text style={styles.time}>{percurso.horario}</Text>
          </View>
        </View>


        {/* Seção com dados técnicos do percurso */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações da Viagem</Text>
          <DetailRow label="Distância" value={percurso.distancia} />
          <DetailRow label="Duração" value={percurso.duracao} />
          <DetailRow label="Velocidade Média" value={percurso.velocidadeMedia} />
          <DetailRow label="Combustível Gasto" value={percurso.combustivel} />
          <DetailRow 
            label="Custo Estimado" 
            value={percurso.custo} 
            style={styles.costValue} 
          />
        </View>

        {/* Seção destacada dos EcoCoins ganhos/perdidos */}
        <View style={styles.ecoCoinsSection}>
          {/* Header dos EcoCoins com ícone e título */}
          <View style={styles.ecoCoinsHeader}>
            <EcoCoinIcon size={24} style={styles.ecoCoinsHeaderIcon} />

            <Text style={styles.ecoCoinsTitle}>
              {(percurso.ecoCoins || 0) >= 0 ? 'EcoCoins Ganhos' : 'EcoCoins Perdidos'}
            </Text>
          </View>

          <View style={[
            styles.ecoCoinsCard,
          
            (percurso.ecoCoins || 0) < 0 ? styles.ecoCoinsCardNegative : styles.ecoCoinsCardPositive
          ]}>

            <Text style={[
              styles.ecoCoinsAmount,
            
              (percurso.ecoCoins || 0) < 0 ? styles.ecoCoinsAmountNegative : styles.ecoCoinsAmountPositive
            ]}>

              {(percurso.ecoCoins || 0) >= 0 ? `+${percurso.ecoCoins || 0}` : percurso.ecoCoins || 0}
            </Text>

            <Text style={[
              styles.ecoCoinsLabel,
              (percurso.ecoCoins || 0) < 0 ? styles.ecoCoinsLabelNegative : styles.ecoCoinsLabelPositive
            ]}>
              EcoCoins
            </Text>

            <Text style={styles.ecoCoinsDescription}>
              {(percurso.ecoCoins || 0) >= 0 
                ? 'Baseado na eficiência da sua condução' 
                : 'Condução ineficiente resulta em perda de EcoCoins'
              }
            </Text>
          </View>
        </View>



        {percurso.rota && (
          <View style={styles.section}>

            <Text style={styles.sectionTitle}>Rota Utilizada</Text>

            <Text style={styles.routeText}>{percurso.rota}</Text>
          </View>
        )}



        {percurso.observacoes && (
          <View style={styles.section}>

            <Text style={styles.sectionTitle}>Observações</Text>

            <Text style={styles.observationText}>{percurso.observacoes}</Text>
          </View>
        )}



        <View style={styles.section}>

          <Text style={styles.sectionTitle}>Estatísticas</Text>
          

          <View style={styles.statsContainer}>

            <View style={styles.statBox}>

              <Text style={styles.statValue}>{percurso.distancia?.replace(' km', '') || '0'}</Text>

              <Text style={styles.statLabel}>Quilômetros</Text>
            </View>
            

            <View style={styles.statBox}>

              <Text style={styles.statValue}>{percurso.duracao?.replace(' min', '') || '0'}</Text>

              <Text style={styles.statLabel}>Minutos</Text>
            </View>
            

            <View style={styles.statBox}>

              <Text style={styles.statValue}>{percurso.combustivel?.replace('L', '') || '0'}</Text>

              <Text style={styles.statLabel}>Litros</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}



const styles = StyleSheet.create({


  container: {
    flex: 1, 
    backgroundColor: '#F8F9F7', 
  },

  navigationHeader: {
    paddingHorizontal: 24, 
    paddingVertical: 16, 
    backgroundColor: '#FFFFFF', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    shadowColor: 'rgba(42, 60, 26, 0.1)', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  navigationTitle: {
    fontSize: 18, 
    fontWeight: '600', 
    color: '#2A3C1A', 
    flex: 1, 
    textAlign: 'center', 
  },

  placeholder: {
    width: 40, 
  },


  content: {
    flex: 1, 
    paddingHorizontal: 24, 
  },


  header: {
    flexDirection: 'row', 
    backgroundColor: '#FFFFFF', 
    borderRadius: 12, 
    padding: 16, 
    marginBottom: 24, 
  
    shadowColor: 'rgba(42, 60, 26, 0.1)', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    elevation: 2, 
  },


  headerImage: {
    width: 80, 
    height: 80, 
    borderRadius: 12, 
    marginRight: 16, 
  },


  headerInfo: {
    flex: 1, 
    justifyContent: 'center', 
  },


  title: {
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#2A3C1A', 
    marginBottom: 4, 
  },


  date: {
    fontSize: 14, 
    color: '#7F9170', 
    marginBottom: 2, 
    textTransform: 'capitalize', 
  },


  time: {
    fontSize: 16, 
    fontWeight: '600', 
    color: '#51663E', 
  },


  section: {
    backgroundColor: '#FFFFFF', 
    borderRadius: 12, 
    padding: 16, 
    marginBottom: 16, 
  
    shadowColor: 'rgba(42, 60, 26, 0.1)', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    elevation: 2, 
  },


  sectionTitle: {
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#2A3C1A', 
    marginBottom: 12, 
  },


  detailRow: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 8, 
    borderBottomWidth: 1, 
    borderBottomColor: '#f0f0f0', 
  },


  detailLabel: {
    fontSize: 14, 
    color: '#666', 
    fontWeight: '500', 
  },


  detailValue: {
    fontSize: 14, 
    color: '#2A3C1A', 
    fontWeight: '600', 
  },


  costValue: {
    color: '#7F9170', 
    fontSize: 16, 
  },


  routeText: {
    fontSize: 14, 
    color: '#51663E', 
    lineHeight: 20, 
    fontStyle: 'italic', 
  },


  observationText: {
    fontSize: 14, 
    color: '#7F9170', 
    lineHeight: 20, 
  },


  ecoCoinsSection: {
    backgroundColor: '#FFFFFF', 
    borderRadius: 12, 
    padding: 16, 
    marginBottom: 16, 
  
    shadowColor: 'rgba(42, 60, 26, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },


  ecoCoinsHeader: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 12, 
  },


  ecoCoinsHeaderIcon: {
    marginRight: 8, 
  },


  ecoCoinsTitle: {
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#2A3C1A', 
  },


  ecoCoinsCard: {
    borderRadius: 12, 
    padding: 20, 
    alignItems: 'center', 
  },


  ecoCoinsCardPositive: {
    backgroundColor: '#BFE59E', 
  },


  ecoCoinsCardNegative: {
    backgroundColor: '#FFE5E5', 
  },


  ecoCoinsAmount: {
    fontSize: 32, 
    fontWeight: 'bold', 
    marginBottom: 4, 
  },


  ecoCoinsAmountPositive: {
    color: '#2A3C1A', 
  },


  ecoCoinsAmountNegative: {
    color: '#D32F2F', 
  },


  ecoCoinsLabel: {
    fontSize: 16, 
    fontWeight: '600', 
    marginBottom: 8, 
  },


  ecoCoinsLabelPositive: {
    color: '#51663E', 
  },


  ecoCoinsLabelNegative: {
    color: '#B71C1C', 
  },


  ecoCoinsDescription: {
    fontSize: 12, 
    color: '#7F9170', 
    textAlign: 'center', 
    fontStyle: 'italic', 
  },


  statsContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-around', 
  },


  statBox: {
    alignItems: 'center', 
    flex: 1, 
  },


  statValue: {
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#7F9170', 
  },


  statLabel: {
    fontSize: 12, 
    color: '#666', 
    marginTop: 4, 
  },
});
