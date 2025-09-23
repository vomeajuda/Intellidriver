// ========================================
// IMPORTAÇÕES E DEPENDÊNCIAS - APP PRINCIPAL
// ========================================

// Importação do React - biblioteca principal para criação de interfaces
import * as React from 'react';

import { enableScreens } from 'react-native-screens';
enableScreens();


// Importações do React Navigation - sistema de navegação entre telas
import { NavigationContainer } from '@react-navigation/native';    // Container principal de navegação
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Criador de navegação em pilha nativa

// Importações de componentes básicos do React Native
import { View, Text } from 'react-native';

// Importação do hook personalizado para carregamento de fontes
import { useFontLoader } from './hooks/useFontLoader';

// ========================================
// IMPORTAÇÕES DAS TELAS (SCREENS)
// ========================================

// Importação de todas as telas da aplicação que serão navegáveis
import Home from './screens/Home';                      // Tela inicial/dashboard
import Activity from './screens/Activity';              // Tela de atividades/percursos
import Historico from './screens/Historico';            // Tela de histórico de viagens
import Login from './screens/Login';                    // Tela de autenticação
import PercursoDetalhes from './screens/PercursoDetalhes'; // Tela de detalhes de um percurso específico
import CarsAnalytics from './screens/CarsAnalytics';    // Tela de diagnóstico do veículo
import DadosPessoais from './screens/DadosPessoais';    // Tela de dados pessoais do usuário
import ProfileStats from './screens/ProfileStats';      // Tela de estatísticas do perfil

// ========================================
// CRIAÇÃO DO NAVEGADOR - STACK NAVIGATOR
// ========================================

/**
 * CRIAÇÃO DA INSTÂNCIA DO STACK NAVIGATOR
 * 
 * createNativeStackNavigator() cria um navegador em pilha nativo que:
 * - Gerencia uma pilha de telas onde novas telas são empilhadas sobre as anteriores
 * - Utiliza animações nativas do sistema operacional (iOS/Android)
 * - Permite navegação para frente (push) e para trás (pop)
 * - Mantém histórico de navegação automaticamente
 * 
 * O navegador retorna um objeto com:
 * - Navigator: componente container das telas
 * - Screen: componente para definir cada tela individual
 */
const Stack = createNativeStackNavigator();

// ========================================
// COMPONENTE PRINCIPAL DA APLICAÇÃO
// ========================================

/**
 * FUNÇÃO PRINCIPAL - APP
 * 
 * Este é o componente raiz de toda a aplicação React Native.
 * Responsabilidades:
 * 1. Gerenciar carregamento de fontes personalizadas
 * 2. Configurar sistema de navegação entre telas
 * 3. Definir estrutura de rotas da aplicação
 * 4. Mostrar tela de carregamento enquanto recursos são preparados
 * 
 * @returns {JSX.Element} - Elemento JSX que representa toda a aplicação
 */
export default function App() {
  
  // ========================================
  // HOOK PERSONALIZADO - CARREGAMENTO DE FONTES
  // ========================================
  
  /**
   * CARREGAMENTO DE FONTES PERSONALIZADAS
   * 
   * useFontLoader é um hook customizado que:
   * - Carrega fontes da família Poppins em diferentes pesos
   * - Retorna true quando todas as fontes estão prontas para uso
   * - Retorna false enquanto as fontes ainda estão sendo carregadas
   * 
   * Isso evita problemas de renderização com fontes não carregadas
   */
  const fontsLoaded = useFontLoader();

  // ========================================
  // RENDERIZAÇÃO CONDICIONAL - TELA DE CARREGAMENTO
  // ========================================
  
  /**
   * VERIFICAÇÃO DE FONTES CARREGADAS
   * 
   * Se as fontes ainda não foram carregadas (!fontsLoaded = true):
   * - Renderiza uma tela de carregamento simples
   * - Evita problemas de layout com fontes não disponíveis
   * - Melhora a experiência do usuário com feedback visual
   * 
   * Early return: se esta condição for verdadeira, 
   * a função para aqui e não executa o resto do código
   */
  if (!fontsLoaded) {
    return (
      <View style={{ 
        flex: 1,                          // Ocupa toda a tela
        justifyContent: 'center',         // Centraliza verticalmente
        alignItems: 'center'              // Centraliza horizontalmente
      }}>
        <Text>Carregando fontes...</Text>
      </View>
    );
  }

  // ========================================
  // RENDERIZAÇÃO PRINCIPAL - NAVEGAÇÃO
  // ========================================
  
  /**
   * ESTRUTURA DE NAVEGAÇÃO DA APLICAÇÃO
   * 
   * NavigationContainer:
   * - Container raiz obrigatório para todo sistema de navegação
   * - Gerencia estado global de navegação
   * - Fornece contexto para todos os componentes filhos
   * 
   * Stack.Navigator:
   * - Define o tipo de navegação (pilha/stack)
   * - Configura comportamento geral da navegação
   * 
   * Stack.Screen:
   * - Define cada tela individual navegável
   * - Associa nome da rota com componente correspondente
   */
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"           // Tela inicial quando app abre
        screenOptions={{ headerShown: false }}  // Remove header nativo de todas as telas
      >
        
        {/* ========================================
            DEFINIÇÃO DE TODAS AS ROTAS/TELAS
            ======================================== */}
        
        {/* Tela principal/dashboard da aplicação */}
        <Stack.Screen name="Home" component={Home} />
        
        {/* Tela de atividades e percursos realizados */}
        <Stack.Screen name="Activity" component={Activity} />
        
        {/* Tela de histórico de viagens do usuário */}
        <Stack.Screen name="Historico" component={Historico} />
        
        {/* Tela de login e autenticação */}
        <Stack.Screen name="Login" component={Login} />
        
        {/* Tela de detalhes específicos de um percurso */}
        <Stack.Screen name="PercursoDetalhes" component={PercursoDetalhes} />
        
        {/* Tela de diagnóstico e análise do veículo */}
        <Stack.Screen name="CarsAnalytics" component={CarsAnalytics} />
        
        {/* Tela de dados pessoais e configurações do usuário */}
        <Stack.Screen name="DadosPessoais" component={DadosPessoais} />
        
        {/* Tela de estatísticas detalhadas do perfil */}
        <Stack.Screen name="ProfileStats" component={ProfileStats} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}