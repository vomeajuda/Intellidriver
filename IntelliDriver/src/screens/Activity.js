import React, {useState, useEffect } from "react";
import { SectionList, Text, View, Image } from "react-native";
import { StyleSheet } from 'react-native';
import NavBar from "../components/Navbar";
import Header from "../components/Header";
import { Octicons } from '@expo/vector-icons';
import { colors, fonts, spacing, borderRadius, shadows } from '../constants/theme';
import { getFontFamily } from '../hooks/useFontLoader';

// Função para formatação de datas
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });
};

const ActivityIcon = ({ iconName, size = 24, color }) => {
  if (iconName === "ecocoin") {
    return (
      <Image 
        source={require('../assets/EcoCoin.png')} 
        style={{ width: size, height: size }}
        resizeMode="contain"
      />
    );
  }
  
  return (
    <Octicons 
      name={iconName || "dot-fill"} 
      size={size} 
      color={color} 
    />
  );
};

export default function Activity() {
  const [atividades, setAtividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const fetchAtividades = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const res = await fetch("http://localhost:3000/atividades", {
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        
        clearTimeout(timeoutId);
        
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        
        const data = await res.json();
        const sectionsData = data.map(section => ({
          title: section.date,
          data: section.data
        }));
        setAtividades(sectionsData);
        setIsOnline(true);
        console.log("✅ Atividades carregadas da API:", sectionsData);
      } catch (error) {
        console.warn("⚠️ API não disponível, usando dados offline:", error.message);
        setIsOnline(false);
        setAtividades([
          {
            title: "2024-09-20",
            data: [
              { 
                id: "1", 
                nome: "Novo percurso Casa-Trabalho adicionado", 
                icon: "location",
                timestamp: "14:30",
                tipo: "percurso"
              },
              { 
                id: "2", 
                nome: "+75 EcoCoins por condução eco-eficiente", 
                icon: "ecocoin",
                timestamp: "09:15",
                tipo: "ecoCoin"
              },
              { 
                id: "3", 
                nome: "Conquista: 1ª semana de condução perfeita!", 
                icon: "trophy",
                timestamp: "08:45",
                tipo: "conquista"
              }
            ]
          },
          {
            title: "2024-09-19", 
            data: [
              { 
                id: "4", 
                nome: "Alerta: Frenagem brusca detectada 3x hoje", 
                icon: "alert",
                timestamp: "18:22",
                tipo: "alerta"
              },
              { 
                id: "5", 
                nome: "+50 EcoCoins por velocidade adequada", 
                icon: "ecocoin",
                timestamp: "16:10",
                tipo: "ecoCoin"
              },
              { 
                id: "6", 
                nome: "Percurso Centro-Casa otimizado", 
                icon: "sync",
                timestamp: "12:30",
                tipo: "otimizacao"
              },
              { 
                id: "7", 
                nome: "-30 EcoCoins por excesso de velocidade", 
                icon: "dash",
                timestamp: "11:45",
                tipo: "penalizacao"
              }
            ]
          },
          {
            title: "2024-09-18",
            data: [
              { 
                id: "8", 
                nome: "Regressão: Desempenho em curvas diminuiu 15%", 
                icon: "graph",
                timestamp: "20:15",
                tipo: "regressao"
              },
              { 
                id: "9", 
                nome: "Conquista: 500 EcoCoins acumulados!", 
                icon: "trophy",
                timestamp: "17:30",
                tipo: "conquista"
              },
              { 
                id: "10", 
                nome: "Novo percurso Supermercado salvo", 
                icon: "location",
                timestamp: "15:20",
                tipo: "percurso"
              },
              { 
                id: "11", 
                nome: "+25 EcoCoins por uso de freio motor", 
                icon: "ecocoin",
                timestamp: "14:10",
                tipo: "ecoCoin"
              },
              { 
                id: "12", 
                nome: "Alerta: Aceleração agressiva recorrente", 
                icon: "alert",
                timestamp: "09:30",
                tipo: "alerta"
              }
            ]
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchAtividades();
  }, []);

  const iconColor = (iconName) => {
    if (iconName === "trophy") return "#CDA34F";
    if (iconName === "ecocoin") return "#F5A623";
    if (iconName === "dependabot") return "#4CAF50";
    if (iconName === "dash") return colors.error;
    if (iconName === "plus-circle") return colors.success;
    if (iconName === "x-circle") return colors.error;
    if (iconName === "location") return "#2196F3";
    if (iconName === "alert") return "#FF5722";
    if (iconName === "sync") return "#9C27B0";
    if (iconName === "graph") return "#FF9800";
    if (iconName === "checklist") return colors.primary;
    return colors.text.secondary;
  };

  return (
    <View style={styles.mainContainer}>
      <Header />
      
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Atividade</Text>
          {!isOnline && (
            <View style={styles.offlineIndicator}>
              <Octicons name="globe" size={16} color="#F57C00" />
              <Text style={styles.offlineText}>Offline</Text>
            </View>
          )}
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Carregando atividades...</Text>
          </View>
        ) : (
          <SectionList
            sections={atividades}
            keyExtractor={(item) => item.id}
            renderSectionHeader={({ section }) => (
              <Text style={styles.header}>{formatDate(section.title)}</Text>
            )}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <View style={[styles.iconContainer, { backgroundColor: iconColor(item.icon) + '20' }]}>
                  <ActivityIcon 
                    iconName={item.icon} 
                    size={40} 
                    color={iconColor(item.icon)} 
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.itemText}>{item.nome || 'Atividade sem nome'}</Text>
                  <Text style={styles.itemType}>{item.tipo || 'Tipo indefinido'}</Text>
                </View>
              </View>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            stickySectionHeadersEnabled={false}
          />
        )}

        <NavBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  container: { 
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  
  title: { 
    fontSize: fonts.sizes.title,
    fontWeight: 'bold',
    color: colors.text.primary,
    flex: 1,
    marginTop: spacing.sm,
  },
  
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  offlineIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F57C0020',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  
  offlineText: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Medium'),
    color: '#F57C00',
    marginLeft: spacing.xs,
  },
  
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  loadingText: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.secondary,
  },
  
  header: { 
    fontSize: fonts.sizes.lg,
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
    color: colors.text.secondary,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  
  item: { 
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderRadius: borderRadius.md,
    ...shadows.small,
  },
  
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  
  textContainer: {
    flex: 1,
  },
  
  itemText: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  
  itemType: {
    fontSize: fonts.sizes.xs,
    fontFamily: getFontFamily('Poppins', 'Medium'),
    color: colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  
  listContent: {
    paddingBottom: 120,
  },
});

