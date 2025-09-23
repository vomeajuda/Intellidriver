// ========================================
// COMPONENTE DE NAVEGAÇÃO - NAVBAR
// ========================================

/**
 * IMPORTAÇÕES E DEPENDÊNCIAS
 * 
 * Este componente implementa a barra de navegação inferior
 * (bottom navigation) da aplicação IntelliDriver.
 */

// Importação do React para criação do componente
import React from 'react';

// Importações dos componentes nativos do React Native
import { 
  View,           // Container básico
  TouchableOpacity, // Botão tocável
  Text,           // Componente de texto (não usado neste componente)
  StyleSheet      // Sistema de estilos
} from 'react-native';

// Importação do hook de navegação do React Navigation
import { useNavigation } from '@react-navigation/native';

// Importação dos ícones Octicons (GitHub style icons)
import Octicons from '@expo/vector-icons/Octicons';

// Importação das constantes de tema
import { colors, spacing, borderRadius, shadows } from '../constants/theme';

// ========================================
// COMPONENTE PRINCIPAL - NAVBAR
// ========================================

/**
 * COMPONENTE NavBar
 * 
 * Barra de navegação inferior fixa que permite acesso rápido
 * às principais seções da aplicação IntelliDriver.
 * 
 * Características:
 * - Posicionamento fixo na parte inferior da tela
 * - 5 botões de navegação principais
 * - Design flutuante com sombra
 * - Ícones intuitivos e consistentes
 * - Responsivo e acessível
 * 
 * Estrutura de navegação:
 * 1. Histórico - Lista de viagens anteriores
 * 2. Diagnóstico - Análise do veículo
 * 3. Home - Tela principal/dashboard
 * 4. Atividade - Percursos e notificações
 * 5. Perfil - Estatísticas do usuário
 * 
 * @returns {JSX.Element} - Barra de navegação renderizada
 */
export default function NavBar() {
  
  // ========================================
  // HOOK DE NAVEGAÇÃO
  // ========================================
  
  /**
   * ACESSO AO SISTEMA DE NAVEGAÇÃO
   * 
   * useNavigation é um hook que fornece acesso ao objeto de navegação
   * do React Navigation, permitindo navegar entre telas programaticamente.
   * 
   * Funcionalidades disponíveis:
   * - navigation.navigate() - navegar para tela específica
   * - navigation.goBack() - voltar para tela anterior
   * - navigation.replace() - substituir tela atual
   * - E muitas outras funções de navegação
   */
  const navigation = useNavigation();

  // ========================================
  // RENDERIZAÇÃO DA INTERFACE
  // ========================================
  
  /**
   * ESTRUTURA DA BARRA DE NAVEGAÇÃO
   * 
   * Container principal com 5 botões organizados horizontalmente,
   * cada um com ícone específico e função de navegação.
   */
  return (
    <View style={styles.container}>
      
      {/* ========================================
          BOTÃO 1: HISTÓRICO DE VIAGENS
          ======================================== */}
      
      {/**
       * NAVEGAÇÃO PARA HISTÓRICO
       * 
       * Permite visualizar o histórico completo de viagens realizadas,
       * organizadas por data com detalhes de cada percurso.
       * 
       * Ícone: "history" - relógio/histórico
       * Destino: tela "Historico"
       */}
      <TouchableOpacity 
        style={styles.iconWrapper} 
        onPress={() => navigation.navigate('Historico')}
      >
        <Octicons style={styles.item} size={28} name="history"/>
      </TouchableOpacity>
      
      {/* ========================================
          BOTÃO 2: DIAGNÓSTICO DO CARRO
          ======================================== */}
      
      {/**
       * NAVEGAÇÃO PARA ANÁLISE VEICULAR
       * 
       * Acessa tela de diagnóstico com informações do OBD-II,
       * alertas de manutenção e análises do veículo.
       * 
       * Ícone: "tools" - ferramentas/diagnóstico
       * Destino: tela "CarsAnalytics"
       */}
      <TouchableOpacity 
        style={styles.iconWrapper} 
        onPress={() => navigation.navigate('CarsAnalytics')}
      >
        <Octicons style={styles.item} size={28} name="tools"/>
      </TouchableOpacity>
      
      {/* ========================================
          BOTÃO 3: HOME/DASHBOARD (CENTRAL)
          ======================================== */}
      
      {/**
       * NAVEGAÇÃO PARA TELA PRINCIPAL
       * 
       * Botão central que leva à tela principal/dashboard,
       * com visão geral das informações mais importantes.
       * 
       * Ícone: "home" - casa/início
       * Destino: tela "Home"
       * Posição: central (destaque visual)
       */}
      <TouchableOpacity 
        style={styles.iconWrapper} 
        onPress={() => navigation.navigate('Home')}
      >
        <Octicons style={styles.item} size={28} name="home"/>
      </TouchableOpacity>
      
      {/* ========================================
          BOTÃO 4: ATIVIDADES E PERCURSOS
          ======================================== */}

      {/**
       * NAVEGAÇÃO PARA ATIVIDADES
       * 
       * Acessa tela com percursos ativos, notificações
       * e atividades recentes do usuário.
       * 
       * Ícone: "bell" - sino/notificações
       * Destino: tela "Activity"
       */}
      <TouchableOpacity 
        style={styles.iconWrapper} 
        onPress={() => navigation.navigate('Activity')}
      >
        <Octicons style={styles.item} size={28} name="bell"/>
      </TouchableOpacity>
      
      {/* ========================================
          BOTÃO 5: PERFIL E ESTATÍSTICAS
          ======================================== */}

      {/**
       * NAVEGAÇÃO PARA PERFIL
       * 
       * Acessa perfil do usuário com estatísticas detalhadas,
       * configurações e informações pessoais.
       * 
       * Ícone: "person" - pessoa/usuário
       * Destino: tela "ProfileStats"
       */}
      <TouchableOpacity 
        style={styles.iconWrapper} 
        onPress={() => navigation.navigate('ProfileStats')}
      >
        <Octicons style={styles.item} size={28} name="person"/>
      </TouchableOpacity>
    </View>
  );
}

// ========================================
// FOLHA DE ESTILOS - NAVBAR
// ========================================

/**
 * ESTILOS DO COMPONENTE NAVBAR
 * 
 * Define a aparência visual da barra de navegação,
 * incluindo posicionamento, cores, espaçamentos e efeitos.
 */
const styles = StyleSheet.create({
  
  // ========================================
  // CONTAINER PRINCIPAL
  // ========================================
  
  /**
   * ESTILO container
   * 
   * Define o posicionamento e aparência do container principal
   * da barra de navegação.
   * 
   * Características do layout:
   * - Posicionamento absoluto fixo na parte inferior
   * - Centralizado horizontalmente com margens laterais
   * - Fundo branco com bordas arredondadas
   * - Sombra para efeito de elevação
   * - Layout horizontal com distribuição uniforme
   */
  container: {
    position: 'absolute',              // Posicionamento absoluto para fixar na tela
    bottom: spacing.xl,                // Distância da borda inferior (32px)
    left: spacing.md,                  // Margem esquerda (16px)
    right: spacing.md,                 // Margem direita (16px)
    backgroundColor: colors.surface,    // Fundo branco/claro
    borderRadius: borderRadius.xl,     // Bordas muito arredondadas (24px)
    flexDirection: 'row',              // Layout horizontal (ícones lado a lado)
    justifyContent: 'space-around',    // Distribui espaço uniformemente entre ícones
    alignItems: 'center',              // Centraliza ícones verticalmente
    height: 70,                        // Altura fixa da barra
    ...shadows.large,                  // Aplica sombra grande (spread operator)
  },
  
  // ========================================
  // ESTILOS DOS ÍCONES
  // ========================================
  
  /**
   * ESTILO item
   * 
   * Define a aparência dos ícones individuais.
   * Aplica cor consistente do tema.
   */
  item: {   
    color: colors.primary              // Cor verde principal dos ícones
  },
  
  // ========================================
  // WRAPPER DOS ÍCONES
  // ========================================
  
  /**
   * ESTILO iconWrapper
   * 
   * Container individual para cada botão/ícone,
   * definindo área tocável e alinhamento.
   * 
   * Características:
   * - Ocupa espaço igual (flex: 1)
   * - Centraliza ícone horizontal e verticalmente
   * - Área tocável vertical para melhor UX
   */
  iconWrapper: {
    flex: 1,                           // Distribui espaço igualmente entre os 5 ícones
    alignItems: 'center',              // Centraliza ícone horizontalmente
    paddingVertical: spacing.md,       // Padding vertical para área tocável (16px)
  },
  
  // ========================================
  // ESTILO PARA ESTADO ATIVO (NÃO USADO ATUALMENTE)
  // ========================================
  
  /**
   * ESTILO activeCircle
   * 
   * Estilo preparado para destacar o ícone da tela ativa.
   * Atualmente não implementado, mas disponível para futuras melhorias.
   * 
   * Funcionalidade planejada:
   * - Círculo colorido atrás do ícone ativo
   * - Elevação visual do botão selecionado
   * - Feedback visual de localização atual
   */
  activeCircle: {
    backgroundColor: colors.secondary,  // Fundo verde claro
    padding: spacing.md,               // Padding interno
    borderRadius: borderRadius.round,  // Totalmente circular
    marginTop: -spacing.lg,            // Elevação visual negativa
    ...shadows.medium,                 // Sombra média
  },
});