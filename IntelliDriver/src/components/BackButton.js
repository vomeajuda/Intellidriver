// ========================================
// COMPONENTE DE NAVEGAÇÃO - BOTÃO VOLTAR
// ========================================

/**
 * IMPORTAÇÕES E DEPENDÊNCIAS
 * 
 * Este componente implementa um botão de retorno universal
 * que pode ser usado em qualquer tela para voltar à anterior.
 */

// Importação do React para criação do componente
import React from 'react';

// Importações dos componentes nativos do React Native
import { 
  TouchableOpacity,  // Botão tocável com feedback visual
  StyleSheet         // Sistema de estilos
} from 'react-native';

// Importação do hook de navegação do React Navigation
import { useNavigation } from '@react-navigation/native';

// Importação dos ícones AntDesign (seta para esquerda)
import AntDesign from '@expo/vector-icons/AntDesign';

// ========================================
// COMPONENTE PRINCIPAL - BACK BUTTON
// ========================================

/**
 * COMPONENTE BackButton
 * 
 * Botão de navegação para retornar à tela anterior.
 * Componente reutilizável que pode ser posicionado em qualquer tela.
 * 
 * Características:
 * - Posicionamento absoluto no canto superior esquerdo
 * - Design circular com sombra sutil
 * - Ícone de seta intuitivo
 * - Funcionalidade universal de retorno
 * - Z-index elevado para ficar sobre outros elementos
 * 
 * Casos de uso:
 * - Telas de detalhes
 * - Formulários
 * - Telas secundárias
 * - Modais em tela cheia
 * 
 * @returns {JSX.Element} - Botão de voltar renderizado
 */
export default function BackButton() {
  
  // ========================================
  // HOOK DE NAVEGAÇÃO
  // ========================================
  
  /**
   * ACESSO AO SISTEMA DE NAVEGAÇÃO
   * 
   * useNavigation fornece acesso às funções de navegação,
   * especialmente a função goBack() para retornar à tela anterior.
   * 
   * Funcionalidade principal:
   * - navigation.goBack() - volta para tela anterior na pilha
   * - Funciona automaticamente com histórico de navegação
   * - Não requer conhecimento da tela de origem
   */
  const navigation = useNavigation();

  // ========================================
  // RENDERIZAÇÃO DA INTERFACE
  // ========================================
  
  /**
   * ESTRUTURA DO BOTÃO
   * 
   * TouchableOpacity com ícone centralizado e função de retorno.
   * Posicionamento absoluto permite uso flexível em diferentes layouts.
   */
  return (
    <TouchableOpacity 
      style={styles.backButton} 
      onPress={() => navigation.goBack()}  // Função de retorno ao toque
    >
      {/* ========================================
          ÍCONE DE SETA PARA ESQUERDA
          ======================================== */}
      
      {/**
       * ÍCONE DE NAVEGAÇÃO
       * 
       * Seta apontando para esquerda, universalmente reconhecida
       * como símbolo de "voltar" ou "retornar".
       * 
       * Especificações:
       * - name: "left" - seta para esquerda
       * - size: 24 - tamanho médio, adequado para toque
       * - color: "#7F9170" - verde principal do tema
       */}
      <AntDesign name="left" size={24} color="#7F9170" />
    </TouchableOpacity>
  );
}

// ========================================
// ESTILOS DO COMPONENTE BACK BUTTON
// ========================================

/**
 * SISTEMA DE ESTILOS
 * 
 * Estilos para posicionamento e aparência do botão de retorno.
 * Design focado em usabilidade e integração visual.
 */
const styles = StyleSheet.create({
  
  // ========================================
  // ESTILO DO BOTÃO PRINCIPAL
  // ========================================
  
  /**
   * CONFIGURAÇÃO VISUAL DO BOTÃO
   * 
   * Design arredondado com posicionamento absoluto para máxima flexibilidade.
   * Combina acessibilidade com estética moderna.
   * 
   * Propriedades de Layout:
   * - position: 'absolute' - posicionamento independente do layout pai
   * - top: 64 - distância do topo da tela (considerando status bar iOS/Android)
   * - left: 16 - margem esquerda para afastamento da borda
   * - zIndex: 10 - prioridade visual sobre outros elementos
   * 
   * Propriedades de Dimensão:
   * - width: 44 - largura adequada para toque confortável
   * - height: 44 - altura seguindo guidelines de acessibilidade
   * - borderRadius: 12 - bordas arredondadas suaves
   * 
   * Propriedades de Aparência:
   * - backgroundColor: '#FFFFFF' - fundo branco para contraste
   * - shadowColor: 'rgba(42, 60, 26, 0.1)' - sombra com cor do tema principal
   * - shadowOffset: { width: 0, height: 2 } - sombra projetada para baixo
   * - shadowOpacity: 0.1 - sombra sutil, não invasiva
   * - shadowRadius: 4 - difusão suave da sombra
   * - elevation: 2 - sombra específica para Android
   * 
   * Propriedades de Alinhamento:
   * - justifyContent: 'center' - centralização vertical do ícone
   * - alignItems: 'center' - centralização horizontal do ícone
   * 
   * Considerações de Design:
   * - Tamanho mínimo de 44x44 seguindo Apple Human Interface Guidelines
   * - Contraste adequado para acessibilidade visual
   * - Sombra com cor do tema para coerência visual
   * - Posicionamento que respeita safe areas
   * - BorderRadius moderado para design moderno mas não excessivo
   */
  backButton: {
    position: 'absolute',                    // Posicionamento livre na tela
    top: 12,                                 // Distância do topo (considerando safe area)
    left: 16,                                // Margem esquerda padrão
    width: 44,                               // Largura adequada para toque
    height: 44,                              // Altura seguindo guidelines de acessibilidade
    borderRadius: 12,                        // Bordas arredondadas suaves
    backgroundColor: '#FFFFFF',              // Fundo branco para contraste
    justifyContent: 'center',                // Centralização vertical do conteúdo
    alignItems: 'center',                    // Centralização horizontal do conteúdo
    zIndex: 10,                             // Prioridade visual sobre outros elementos
    
    // ========================================
    // SISTEMA DE SOMBRAS MULTIPLATAFORMA
    // ========================================
    
    /**
     * CONFIGURAÇÃO DE SOMBRAS
     * 
     * Implementação de sombras que funciona tanto no iOS quanto Android,
     * criando sensação de profundidade e indicando interatividade.
     * Cor da sombra baseada no tema principal para coerência visual.
     */
    
    // Sombras para iOS (shadowColor, shadowOffset, shadowOpacity, shadowRadius)
    shadowColor: 'rgba(42, 60, 26, 0.1)',   // Sombra com cor do tema principal
    shadowOffset: { width: 0, height: 2 },   // Sombra projetada para baixo
    shadowOpacity: 0.1,                      // Transparência sutil da sombra
    shadowRadius: 4,                         // Difusão suave da sombra
    
    // Sombra para Android (elevation)
    elevation: 2,                            // Elevação moderada no Material Design
  },
});
