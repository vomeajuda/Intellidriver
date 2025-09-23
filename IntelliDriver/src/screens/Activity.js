// Importações fundamentais do React para gerenciamento de estado e ciclo de vida
// useState: Hook para criação e gerenciamento de estados locais do componente
// useEffect: Hook para operações de ciclo de vida (carregamento de dados, cleanup)
import React, {useState, useEffect } from "react";
// Importações de componentes nativos do React Native para construção da interface
// SectionList: Componente avançado para listagem de dados com seções organizadas por categorias
// Text: Componente fundamental para exibição de textos estilizados
// View: Container universal para layout, estruturação e organização visual
// Image: Componente para renderização de imagens locais e personalizadas
import { SectionList, Text, View, Image } from "react-native";
// Importação do sistema de estilos otimizado do React Native
import { StyleSheet } from 'react-native';
// Importação do componente NavBar para navegação inferior consistente entre telas
import NavBar from "../components/Navbar";
// Importação do componente Header para cabeçalho com logo centralizada
import Header from "../components/Header";
// Importação da biblioteca de ícones Octicons para interface visual rica e consistente
import { Octicons } from '@expo/vector-icons';
// Importação completa do sistema de design centralizado com tokens visuais padronizados
// colors: Paleta de cores da aplicação incluindo estados de sucesso, erro e tema principal
// fonts: Configurações tipográficas com tamanhos, pesos e famílias de fontes
// spacing: Sistema de espaçamentos consistentes para margins, paddings e gaps
// borderRadius: Padrões de bordas arredondadas para elementos da interface
// shadows: Configurações de sombras para depth e hierarquia visual
import { colors, fonts, spacing, borderRadius, shadows } from '../constants/theme';
// Importação da função helper para mapeamento dinâmico de famílias de fontes
import { getFontFamily } from '../hooks/useFontLoader';

// Função utilitária para formatação de datas em português brasileiro
// Converte strings de data ISO para formato legível e localizado
const formatDate = (dateString) => {
  // Cria objeto Date a partir da string recebida
  const date = new Date(dateString);
  // Retorna data formatada em português brasileiro com dia, mês por extenso e ano
  // Exemplo: "20 de setembro de 2024"
  return date.toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });
};

// Componente funcional especializado para renderização de ícones de atividades
// Gerencia tanto ícones personalizados (EcoCoin) quanto ícones da biblioteca Octicons
// Parâmetros:
// - iconName: String que define o tipo de ícone a ser renderizado
// - size: Tamanho do ícone em pixels (padrão 24)
// - color: Cor do ícone para elementos Octicons
const ActivityIcon = ({ iconName, size = 24, color }) => {
  // Verificação específica para renderização do ícone customizado EcoCoin
  // Quando iconName é "ecocoin", renderiza imagem local em vez de Octicon
  if (iconName === "ecocoin") {
    return (
      // Componente Image para renderização do ícone EcoCoin personalizado
      <Image 
        // Carregamento da imagem local EcoCoin dos assets da aplicação
        source={require('../assets/EcoCoin.png')} 
        // Aplicação de dimensões dinâmicas baseadas no parâmetro size
        style={{ width: size, height: size }}
        // Modo contain garante que a imagem mantenha proporções dentro do container
        resizeMode="contain"
      />
    );
  }
  
  // Renderização padrão usando ícones Octicons para todos os outros tipos
  // Fallback para "dot-fill" caso iconName seja undefined ou null
  return (
    <Octicons 
      // Nome do ícone com fallback para dot-fill caso não seja especificado
      name={iconName || "dot-fill"} 
      // Tamanho dinâmico baseado no parâmetro recebido
      size={size} 
      // Cor dinâmica aplicada apenas aos ícones Octicons
      color={color} 
    />
  );
};

// Componente principal da tela de Atividades
// Responsável por exibir histórico cronológico de ações do usuário no aplicativo
// Inclui conquistas, ganhos/perdas de EcoCoins, alertas e otimizações de percursos
export default function Activity() {
  // Estado para armazenamento das atividades organizadas por data
  // Estrutura: Array de objetos com { title: "data", data: [atividades] }
  // Compatível com SectionList para renderização por seções
  const [atividades, setAtividades] = useState([]);
  
  // Estado para controle do carregamento inicial dos dados
  // Exibe indicador visual enquanto fetch está em andamento
  const [loading, setLoading] = useState(true);
  
  // Estado para monitoramento da conectividade com a API
  // Permite exibição de indicador offline e uso de dados fallback
  const [isOnline, setIsOnline] = useState(true);

  // Hook useEffect para carregamento inicial dos dados de atividades
  // Executa uma única vez na montagem do componente (dependency array vazio)
  useEffect(() => {
    // Função assíncrona para busca de dados da API com fallback offline
    // Implementa timeout, error handling e transformação de dados
    const fetchAtividades = async () => {
      try {
        // Implementação de AbortController para timeout da requisição
        // Evita travamento da interface em caso de API lenta ou indisponível
        const controller = new AbortController();
        // Timeout de 5 segundos para evitar espera indefinida
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        // Requisição HTTP para endpoint de atividades com configurações robustas
        const res = await fetch("http://localhost:3000/atividades", {
          // Signal do AbortController para cancelamento automático
          signal: controller.signal,
          // Headers para garantir compatibilidade e especificar formato JSON
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        
        // Limpeza do timeout após resposta bem-sucedida
        clearTimeout(timeoutId);
        
        // Verificação de status HTTP da resposta
        // Lança erro para códigos de status não-sucesso (4xx, 5xx)
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        
        // Parse da resposta JSON retornada pela API
        const data = await res.json();
        // Transformação dos dados recebidos para formato compatível com SectionList
        // Mapeia cada item para estrutura { title: data, data: array_atividades }
        const sectionsData = data.map(section => ({
          title: section.date,
          data: section.data
        }));
        // Atualização do estado com dados transformados da API
        setAtividades(sectionsData);
        // Marca aplicação como online após carregamento bem-sucedido
        setIsOnline(true);
        // Log de debug para acompanhamento do carregamento
        console.log("✅ Atividades carregadas da API:", sectionsData);
      } catch (error) {
        // Captura de erros de rede, timeout ou problemas de API
        // Log de warning com informações do erro para debug
        console.warn("⚠️ API não disponível, usando dados offline:", error.message);
        // Marca aplicação como offline para exibição de indicador visual
        setIsOnline(false);
        // Dados completos de fallback organizados por data para funcionamento offline
        // Estrutura baseada no db.json com atividades variadas dos últimos 3 dias
        // Cada seção representa um dia com múltiplas atividades categorizadas
        setAtividades([
          {
            // Seção mais recente: 20 de setembro de 2024
            title: "2024-09-20",
            data: [
              { 
                id: "1", 
                nome: "Novo percurso Casa-Trabalho adicionado", 
                icon: "location", // Ícone azul para novos percursos
                timestamp: "14:30",
                tipo: "percurso" // Categoria para organização
              },
              { 
                id: "2", 
                nome: "+75 EcoCoins por condução eco-eficiente", 
                icon: "ecocoin", // Ícone personalizado EcoCoin
                timestamp: "09:15",
                tipo: "ecoCoin" // Categoria para ganhos de pontos
              },
              { 
                id: "3", 
                nome: "Conquista: 1ª semana de condução perfeita!", 
                icon: "trophy", // Ícone dourado para conquistas
                timestamp: "08:45",
                tipo: "conquista" // Categoria para achievements
              }
            ]
          },
          {
            // Seção anterior: 19 de setembro de 2024
            title: "2024-09-19", 
            data: [
              { 
                id: "4", 
                nome: "Alerta: Frenagem brusca detectada 3x hoje", 
                icon: "alert", // Ícone laranja/vermelho para alertas
                timestamp: "18:22",
                tipo: "alerta" // Categoria para avisos importantes
              },
              { 
                id: "5", 
                nome: "+50 EcoCoins por velocidade adequada", 
                icon: "ecocoin", // Ícone EcoCoin para ganhos
                timestamp: "16:10",
                tipo: "ecoCoin" // Ganho de pontos por boa condução
              },
              { 
                id: "6", 
                nome: "Percurso Centro-Casa otimizado", 
                icon: "sync", // Ícone roxo para otimizações
                timestamp: "12:30",
                tipo: "otimizacao" // Categoria para melhorias automáticas
              },
              { 
                id: "7", 
                nome: "-30 EcoCoins por excesso de velocidade", 
                icon: "dash", // Ícone vermelho para penalizações
                timestamp: "11:45",
                tipo: "penalizacao" // Categoria para perdas de pontos
              }
            ]
          },
          {
            // Seção mais antiga: 18 de setembro de 2024
            title: "2024-09-18",
            data: [
              { 
                id: "8", 
                nome: "Regressão: Desempenho em curvas diminuiu 15%", 
                icon: "graph", // Ícone laranja para análises de regressão
                timestamp: "20:15",
                tipo: "regressao" // Categoria para alertas de piora de performance
              },
              { 
                id: "9", 
                nome: "Conquista: 500 EcoCoins acumulados!", 
                icon: "trophy", // Ícone dourado para marco importante
                timestamp: "17:30",
                tipo: "conquista" // Achievement por acúmulo de pontos
              },
              { 
                id: "10", 
                nome: "Novo percurso Supermercado salvo", 
                icon: "location", // Ícone azul para adição de local
                timestamp: "15:20",
                tipo: "percurso" // Categoria para novos destinos
              },
              { 
                id: "11", 
                nome: "+25 EcoCoins por uso de freio motor", 
                icon: "ecocoin", // Ícone EcoCoin para técnica eficiente
                timestamp: "14:10",
                tipo: "ecoCoin" // Ganho por técnica de condução avançada
              },
              { 
                id: "12", 
                nome: "Alerta: Aceleração agressiva recorrente", 
                icon: "alert", // Ícone de alerta para padrão perigoso
                timestamp: "09:30",
                tipo: "alerta" // Aviso sobre comportamento repetitivo
              }
            ]
          }
        ]);
      } finally {
        // Bloco finally garante que loading seja sempre definido como false
        // Independentemente de sucesso ou falha na requisição da API
        setLoading(false);
      }
    };

    // Chamada da função de carregamento na montagem do componente
    fetchAtividades();
  }, []); // Array de dependências vazio garante execução única

  // Função utilitária para mapeamento de cores baseado no tipo de ícone
  // Retorna cores específicas para cada categoria de atividade
  // Melhora a experiência visual e facilita identificação rápida
  const iconColor = (iconName) => {
    // Conquistas e achievements - cor dourada para destaque especial
    if (iconName === "trophy") return "#CDA34F";
    // EcoCoin personalizado - dourado específico para consistência visual
    if (iconName === "ecocoin") return "#F5A623";
    // Backup para ganhos de EcoCoins com ícone Octicons - verde de sucesso
    if (iconName === "dependabot") return "#4CAF50";
    // Perdas e penalizações - vermelho do tema para indicar problemas
    if (iconName === "dash") return colors.error;
    // Ganhos gerais - verde de sucesso do sistema de cores
    if (iconName === "plus-circle") return colors.success;
    // Perdas gerais - vermelho de erro do sistema de cores
    if (iconName === "x-circle") return colors.error;
    // Novos percursos e localizações - azul para informações geográficas
    if (iconName === "location") return "#2196F3";
    // Alertas e avisos importantes - laranja/vermelho para atenção
    if (iconName === "alert") return "#FF5722";
    // Otimizações e sincronizações - roxo para ações automáticas
    if (iconName === "sync") return "#9C27B0";
    // Análises e regressões - laranja para dados analíticos
    if (iconName === "graph") return "#FF9800";
    // Metas e checklists - verde primário do tema da aplicação
    if (iconName === "checklist") return colors.primary;
    // Cor padrão para ícones não mapeados - cinza secundário
    return colors.text.secondary;
  };

  // Renderização da interface principal da tela de Atividades
  return (
    // Container principal sem padding para header ocupar toda largura
    <View style={styles.mainContainer}>
      {/* Header com logo centralizada */}
      <Header />
      
      {/* Container interno com padding e estrutura de layout */}
      <View style={styles.container}>
        {/* Header da tela com título e indicador de status de conectividade */}
        <View style={styles.titleContainer}>
          {/* Título principal da tela de atividades */}
          <Text style={styles.title}>Atividade</Text>
          {/* Indicador visual exibido apenas quando aplicação está offline */}
          {!isOnline && (
            <View style={styles.offlineIndicator}>
              {/* Ícone de globo para representar conectividade */}
              <Octicons name="globe" size={16} color="#F57C00" />
              {/* Texto explicativo do status offline */}
              <Text style={styles.offlineText}>Offline</Text>
            </View>
          )}
        </View>

        {/* Renderização condicional baseada no estado de carregamento */}
        {loading ? (
          // Tela de carregamento exibida durante fetch inicial
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Carregando atividades...</Text>
          </View>
        ) : (
          // Lista principal de atividades organizadas por seções de data
          <SectionList
            // Dados organizados por seções com estrutura { title, data }
            sections={atividades}
            // Extrator de chave única para otimização de performance
            keyExtractor={(item) => item.id}
            // Renderização do cabeçalho de cada seção (data formatada)
            renderSectionHeader={({ section }) => (
              <Text style={styles.header}>{formatDate(section.title)}</Text>
            )}
            // Renderização de cada item individual da atividade
            renderItem={({ item }) => (
              <View style={styles.item}>
                {/* Container do ícone com fundo colorido baseado no tipo */}
                <View style={[styles.iconContainer, { backgroundColor: iconColor(item.icon) + '20' }]}>
                  {/* Componente personalizado para renderização do ícone */}
                  <ActivityIcon 
                    iconName={item.icon} 
                    size={40} 
                    color={iconColor(item.icon)} 
                  />
                </View>
                {/* Container das informações textuais da atividade */}
                <View style={styles.textContainer}>
                  {/* Descrição principal da atividade com verificação de segurança */}
                  <Text style={styles.itemText}>{item.nome || 'Atividade sem nome'}</Text>
                  {/* Categoria/tipo da atividade em formato uppercase com verificação de segurança */}
                  <Text style={styles.itemType}>{item.tipo || 'Tipo indefinido'}</Text>
                </View>
              </View>
            )}
            // Desabilita indicador de scroll vertical para interface mais limpa
            showsVerticalScrollIndicator={false}
            // Padding inferior para evitar sobreposição com NavBar
            contentContainerStyle={styles.listContent}
            // Desabilita fixação dos headers para scroll mais fluido
            stickySectionHeadersEnabled={false}
          />
        )}

        {/* Componente de navegação inferior fixo */}
        <NavBar />
      </View>
    </View>
  );
}

// Sistema de estilos da tela Activity usando StyleSheet otimizado
// Organizado por componentes e funcionalidades para melhor manutenção
const styles = StyleSheet.create({
  // Container principal sem padding para header ocupar toda largura
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  // Container interno com padding e espaçamento para conteúdo
  // Adiciona espaço para status bar e organização visual
  container: { 
    flex: 1, // Ocupa todo espaço do container pai
    paddingHorizontal: spacing.lg, // Padding lateral consistente
    paddingTop: spacing.sm, // Padding superior reduzido para ficar próximo do header
  },
  // Estilo do título principal da tela
  // Utiliza hierarquia tipográfica do sistema de design
  title: { 
    fontSize: fonts.sizes.title, // Tamanho de fonte para títulos principais
    fontWeight: 'bold', // Peso bold para destaque visual
    color: colors.text.primary, // Cor primária do texto
    flex: 1, // Ocupa espaço disponível no container flex
    marginTop: spacing.sm,
  },
  // Container flexível para título e indicadores de status
  // Organiza elementos horizontalmente com alinhamento central
  titleContainer: {
    flexDirection: 'row', // Layout horizontal
    alignItems: 'center', // Alinhamento vertical central
    
  },
  // Indicador visual para status offline da aplicação
  // Utiliza cor laranja para chamar atenção sem alarmar
  offlineIndicator: {
    flexDirection: 'row', // Layout horizontal para ícone + texto
    alignItems: 'center', // Alinhamento vertical central
    backgroundColor: '#F57C0020', // Fundo laranja com transparência
    paddingHorizontal: spacing.sm, // Padding horizontal pequeno
    paddingVertical: spacing.xs, // Padding vertical mínimo
    borderRadius: borderRadius.sm, // Bordas arredondadas pequenas
  },
  // Texto do indicador offline com fonte e cor específicas
  // Utiliza fonte Poppins Medium para legibilidade
  offlineText: {
    fontSize: fonts.sizes.sm, // Tamanho de fonte pequeno
    fontFamily: getFontFamily('Poppins', 'Medium'), // Fonte Poppins Medium
    color: '#F57C00', // Cor laranja consistente com o indicador
    marginLeft: spacing.xs, // Espaço entre ícone e texto
  },
  // Container centralizado para estado de carregamento
  // Ocupa todo espaço disponível com conteúdo centralizado
  loadingContainer: {
    flex: 1, // Ocupa todo espaço vertical disponível
    justifyContent: 'center', // Centralização vertical do conteúdo
    alignItems: 'center', // Centralização horizontal do conteúdo
  },
  // Texto do indicador de carregamento com estilo consistente
  // Utiliza cor secundária para não competir com conteúdo principal
  loadingText: {
    fontSize: fonts.sizes.md, // Tamanho de fonte médio
    fontFamily: getFontFamily('Poppins', 'Regular'), // Fonte Poppins Regular
    color: colors.text.secondary, // Cor secundária do texto
  },
  // Estilo dos headers de seção (datas formatadas)
  // Cria hierarquia visual clara entre seções e itens
  header: { 
    fontSize: fonts.sizes.lg, // Tamanho de fonte grande para destaque
    fontFamily: getFontFamily('Poppins', 'SemiBold'), // Fonte SemiBold para hierarquia
    color: colors.text.secondary, // Cor secundária para diferenciação
    marginTop: spacing.lg, // Margem superior para separação
    marginBottom: spacing.md, // Margem inferior para espaçamento
  },
  // Estilo individual de cada item de atividade
  // Inclui layout, cores, espaçamentos e efeitos visuais
  item: { 
    flexDirection: 'row', // Layout horizontal para ícone + texto
    alignItems: 'center', // Alinhamento vertical central
    backgroundColor: colors.surface, // Cor de fundo da superfície
    padding: spacing.md, // Padding interno consistente
    marginBottom: spacing.sm, // Margem inferior entre itens
    borderRadius: borderRadius.md, // Bordas arredondadas médias
    ...shadows.small, // Sombra pequena para depth visual
  },
  // Container do ícone com dimensões fixas e centralização
  // Background colorido aplicado dinamicamente baseado no tipo
  iconContainer: {
    width: 60, // Largura fixa para consistência visual
    height: 60, // Altura fixa para formato quadrado
    borderRadius: 0, // Sem bordas arredondadas no container
    justifyContent: 'center', // Centralização vertical do ícone
    alignItems: 'center', // Centralização horizontal do ícone
    marginRight: spacing.md, // Margem direita para separação do texto
  },
  // Container flexível para textos da atividade
  // Ocupa espaço restante após ícone
  textContainer: {
    flex: 1, // Ocupa todo espaço horizontal disponível
  },
  // Estilo do texto principal da atividade (descrição)
  // Utiliza cor primária e fonte regular para legibilidade
  itemText: {
    fontSize: fonts.sizes.md, // Tamanho de fonte médio
    fontFamily: getFontFamily('Poppins', 'Regular'), // Fonte Poppins Regular
    color: colors.text.primary, // Cor primária do texto
    marginBottom: spacing.xs, // Margem inferior pequena
  },
  // Estilo do texto de categoria/tipo da atividade
  // Utiliza transformações visuais para diferenciação
  itemType: {
    fontSize: fonts.sizes.xs, // Tamanho de fonte extra pequeno
    fontFamily: getFontFamily('Poppins', 'Medium'), // Fonte Medium para destaque sutil
    color: colors.text.secondary, // Cor secundária para hierarquia
    textTransform: 'uppercase', // Transformação para maiúsculas
    letterSpacing: 0.5, // Espaçamento entre letras para legibilidade
  },
  // Estilo do conteúdo da lista para padding inferior
  // Evita sobreposição com NavBar e melhora UX de scroll
  listContent: {
    paddingBottom: 120, // Padding inferior grande para área de navegação
  },
});

