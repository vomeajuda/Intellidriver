// ========================================
// TELA DE AUTENTICAÇÃO - LOGIN
// ========================================

/**
 * IMPORTAÇÕES E DEPENDÊNCIAS
 * 
 * Tela de login responsável pela autenticação de usuários
 * no aplicativo IntelliDriver. Implementa formulário completo
 * com validação, opções sociais e funcionalidades auxiliares.
 */

// Importação do React e hooks para estado
import React, { useState } from 'react';

// Importações dos componentes nativos do React Native
import { 
  StyleSheet,       // Sistema de estilos
  Text,             // Componente de texto
  TouchableOpacity, // Botão tocável
  View,             // Container flexível
  Image,            // Componente de imagem
  TextInput         // Campo de entrada de texto
} from 'react-native';

// Importação do componente de navegação
import BackButton from '../components/BackButton';

// Importação do componente Header para cabeçalho com logo centralizada
import Header from '../components/Header';

// Importação do componente Checkbox da biblioteca Paper
import { Checkbox } from 'react-native-paper';

// Importações do sistema de design centralizado
import { colors, fonts, spacing, borderRadius, shadows } from '../constants/theme';

// Importação da função helper para fontes
import { getFontFamily } from '../hooks/useFontLoader';

// ========================================
// COMPONENTE PRINCIPAL - LOGIN
// ========================================

/**
 * COMPONENTE Login
 * 
 * Tela de autenticação completa do aplicativo IntelliDriver.
 * Implementa fluxo de login tradicional com opções modernas.
 * 
 * Funcionalidades principais:
 * 1. Formulário de login (email/senha)
 * 2. Validação de credenciais mock
 * 3. Opção "Lembrar senha"
 * 4. Link "Esqueci minha senha"
 * 5. Botões de ação (Acessar/Cadastrar)
 * 6. Login social (Google/Facebook)
 * 7. Navegação de retorno
 * 
 * Características de UX:
 * - Design limpo e profissional
 * - Feedback visual imediato
 * - Acessibilidade integrada
 * - Responsividade garantida
 * - Integração com sistema de design
 * 
 * Estados gerenciados:
 * - Campos de formulário (username, password)
 * - Estado do checkbox "Lembrar senha"
 * 
 * @returns {JSX.Element} - Tela de login renderizada
 */
export default function Login() {
  
  // ========================================
  // ESTADOS LOCAIS DO COMPONENTE
  // ========================================
  
  /**
   * ESTADO DO NOME DE USUÁRIO/EMAIL
   * 
   * Controla o valor do campo de email/usuário.
   * Usado tanto para exibição quanto validação.
   * 
   * Tipo: string
   * Valor inicial: string vazia
   * Atualizado via: onChangeText do TextInput
   */
  const [username, setUsername] = useState('');
  
  /**
   * ESTADO DA SENHA
   * 
   * Controla o valor do campo de senha.
   * Campo seguro com texto oculto.
   * 
   * Tipo: string
   * Valor inicial: string vazia
   * Atualizado via: onChangeText do TextInput
   * Característica: secureTextEntry ativo
   */
  const [password, setPassword] = useState('');

  /**
   * ESTADO DO CHECKBOX "LEMBRAR SENHA"
   * 
   * Controla se a opção de lembrar senha está ativada.
   * Usado para persistência de credenciais (futuro).
   * 
   * Tipo: boolean
   * Valor inicial: false (não marcado)
   * Atualizado via: onPress do Checkbox
   */
  const [isChecked, setIsChecked] = useState(false);

  // ========================================
  // FUNÇÕES DE NEGÓCIO
  // ========================================
  
  /**
   * FUNÇÃO DE VALIDAÇÃO E LOGIN
   * 
   * Processa a tentativa de login do usuário comparando
   * as credenciais inseridas com valores mock válidos.
   * 
   * Credenciais válidas (mock):
   * - Usuário: 'rafa'
   * - Senha: '1234'
   * 
   * Fluxo de validação:
   * 1. Comparar username inserido com valor válido
   * 2. Comparar password inserido com valor válido
   * 3. Exibir feedback apropriado via alert
   * 
   * Feedback de sucesso:
   * - Alert: "Login bem-sucedido!"
   * - Futuro: Redirecionamento para dashboard
   * 
   * Feedback de erro:
   * - Alert: "Usuário ou senha inválidos."
   * - Futuro: Destacar campos com erro
   * 
   * Expansões futuras:
   * - Integração com API de autenticação
   * - Validação de formato de email
   * - Critérios de segurança de senha
   * - Bloqueio por tentativas excessivas
   * - Autenticação biométrica
   * - Remember me persistente
   */
  const handleLogin = () => {
    // Credenciais válidas para demonstração
    const validUsername = 'rafa';
    const validPassword = '1234';

    // Validação simples de credenciais
    if (username === validUsername && password === validPassword) {
      alert('Login bem-sucedido!');
      // TODO: Implementar navegação para dashboard
      // TODO: Armazenar estado de autenticação
      // TODO: Gerenciar tokens de sessão
    } else {
      alert('Usuário ou senha inválidos.');
      // TODO: Destacar campos com erro
      // TODO: Log de tentativas de acesso
      // TODO: Implementar rate limiting
    }
  };

  // ========================================
  // RENDERIZAÇÃO DA INTERFACE
  // ========================================
  
  /**
   * ESTRUTURA PRINCIPAL DA TELA DE LOGIN
   * 
   * Layout vertical centrado com todos os elementos de autenticação:
   * 1. Botão de retorno (posicionamento absoluto)
   * 2. Cabeçalho com título e subtítulo
   * 3. Formulário de credenciais
   * 4. Opções auxiliares (lembrar senha / esqueci senha)
   * 5. Botões de ação principais
   * 6. Separador visual
   * 7. Opções de login social
   */
  return (
    <View style={styles.container}>

      {/* ========================================
          HEADER COM LOGO CENTRALIZADA
          ======================================== */}
      <Header />

      {/* ========================================
          HEADER DE NAVEGAÇÃO E TÍTULO
          ======================================== */}
      
      <View style={styles.navigationHeader}>
        <BackButton />
        <Text style={styles.navigationTitle}>Login</Text>
        <View style={styles.placeholder} />
      </View>
      
      {/* ========================================
          CABEÇALHO DA TELA
          ======================================== */}
      
      {/**
       * TÍTULO PRINCIPAL
       * 
       * "Acesse" em fonte heroica para impacto visual.
       * Primeira informação que chama atenção do usuário.
       * Fonte grande e negrito seguindo hierarquia visual.
       */}
      <Text style={styles.title}>Acesse</Text>

      {/**
       * SUBTÍTULO EXPLICATIVO
       * 
       * "com E-mail e senha" complementa o título principal.
       * Esclarece o método de autenticação disponível.
       * Fonte menor e peso regular para hierarquia secundária.
       */}
      <Text style={styles.subtitle}>com E-mail e senha</Text>

      {/* ========================================
          FORMULÁRIO DE CREDENCIAIS
          ======================================== */}
      
      {/**
       * SEÇÃO DE EMAIL/USUÁRIO
       * 
       * Label + campo de entrada para identificação do usuário.
       * Aceita tanto email quanto username conforme validação.
       */
      
      /**
       * LABEL DO CAMPO EMAIL
       * 
       * Texto descritivo acima do campo de entrada.
       * Fonte pequena/média com peso médio para legibilidade.
       */}
      <Text style={styles.inputText}>E-mail</Text>
      
      {/**
       * CAMPO DE ENTRADA - EMAIL/USUÁRIO
       * 
       * TextInput controlado para captura do identificador.
       * 
       * Características:
       * - Valor controlado pelo estado 'username'
       * - Placeholder orientativo
       * - Cor de placeholder temática
       * - Atualização em tempo real via onChangeText
       * 
       * Funcionalidades futuras:
       * - Validação de formato de email
       * - Autocomplete de usuários anteriores
       * - Verificação de existência em tempo real
       */}
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Digite seu E-mail"
        placeholderTextColor={colors.text.placeholder}
      />

      {/**
       * SEÇÃO DE SENHA
       * 
       * Label + campo seguro para senha do usuário.
       * Campo oculto com opção de revelação (futuro).
       */
      
      /**
       * LABEL DO CAMPO SENHA
       * 
       * Texto descritivo para o campo de senha.
       * Mesmo estilo do label de email para consistência.
       */}
      <Text style={styles.inputText}>Senha</Text>
      
      {/**
       * CAMPO DE ENTRADA - SENHA
       * 
       * TextInput seguro para captura da senha.
       * 
       * Características especiais:
       * - secureTextEntry: oculta texto digitado
       * - Valor controlado pelo estado 'password'
       * - Placeholder orientativo
       * - Cor de placeholder temática
       * 
       * Funcionalidades futuras:
       * - Botão de mostrar/ocultar senha
       * - Indicador de força da senha
       * - Validação de critérios de segurança
       * - Autocomplete desabilitado por segurança
       */}
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Digite sua senha"
        placeholderTextColor={colors.text.placeholder}
        secureTextEntry
      />

      {/* ========================================
          OPÇÕES AUXILIARES
          ======================================== */}
      
      {/**
       * LINHA DE OPÇÕES
       * 
       * Container horizontal que organiza:
       * - Checkbox "Lembrar senha" (esquerda)
       * - Link "Esqueci minha senha" (direita)
       * 
       * Layout flexível com justificação space-between.
       */}
      <View style={styles.optionsRow}>
        
        {/* ========================================
            OPÇÃO LEMBRAR SENHA
            ======================================== */}
        
        {/**
         * CONTAINER DO CHECKBOX
         * 
         * Agrupa checkbox e texto em layout horizontal.
         * Flex 1 para ocupar espaço disponível do lado esquerdo.
         */}
        <View style={styles.checkboxContainer}>

          {/**
           * CHECKBOX LEMBRAR SENHA
           * 
           * Componente da biblioteca React Native Paper.
           * 
           * Estados:
           * - 'checked': quando isChecked = true
           * - 'unchecked': quando isChecked = false
           * 
           * Funcionalidade:
           * - onPress alterna o estado booleano
           * - Cor temática primary quando ativo
           * 
           * Implementação futura:
           * - Persistir estado no AsyncStorage
           * - Integrar com sistema de keychain
           * - Considerar políticas de segurança
           */}
          <Checkbox
            status={isChecked ? 'checked' : 'unchecked'}
            onPress={() => setIsChecked(!isChecked)}
            color={colors.primary}
          />

          {/**
           * TEXTO DO CHECKBOX
           * 
           * Label explicativo ao lado do checkbox.
           * Fonte pequena com cor secundária.
           * Margem esquerda para espaçamento do checkbox.
           */}
          <Text style={styles.checkboxText}>Lembrar senha</Text>
        </View>
        
        {/* ========================================
            LINK ESQUECI SENHA
            ======================================== */}

        {/**
         * BOTÃO ESQUECI SENHA
         * 
         * TouchableOpacity para navegação para recuperação.
         * 
         * Características:
         * - Texto em cor primary para destaque
         * - Fonte média para legibilidade
         * - Alinhado à direita da linha
         * 
         * Funcionalidade futura:
         * - Navegar para tela de recuperação
         * - Modal de inserção de email
         * - Envio de email de reset
         * - Validação de código de verificação
         */}
        <TouchableOpacity>
          <Text style={styles.forgot}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </View>

      {/* ========================================
          BOTÕES DE AÇÃO PRINCIPAIS
          ======================================== */}
      
      {/**
       * LINHA DE BOTÕES
       * 
       * Container horizontal com os dois botões principais:
       * - Acessar (primary): efetua login
       * - Cadastrar (secondary): navega para registro
       * 
       * Layout flexível com gap uniforme entre botões.
       */}
      <View style={styles.buttonRow}>
        
        {/**
         * BOTÃO ACESSAR (PRIMARY)
         * 
         * Botão principal que executa a função de login.
         * 
         * Características visuais:
         * - Fundo verde (cor primary)
         * - Texto branco para contraste
         * - Sombra média para elevação
         * - Bordas arredondadas
         * - Flex 1 para ocupar metade do espaço
         * 
         * Funcionalidade:
         * - onPress executa handleLogin
         * - Valida credenciais inseridas
         * - Feedback via alert (temporário)
         * 
         * Melhorias futuras:
         * - Loading state durante validação
         * - Desabilitar durante processamento
         * - Animação de feedback
         * - Haptic feedback
         */}
        <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
          <Text style={styles.primaryButtonText}>Acessar</Text>
        </TouchableOpacity>

        {/**
         * BOTÃO CADASTRAR (SECONDARY)
         * 
         * Botão secundário para navegação para registro.
         * 
         * Características visuais:
         * - Fundo branco com borda verde
         * - Texto verde (cor primary)
         * - Sem sombra (mais sutil)
         * - Bordas arredondadas
         * - Flex 1 para ocupar metade do espaço
         * 
         * Funcionalidade futura:
         * - Navegar para tela de registro
         * - Preservar dados já inseridos
         * - Pré-preencher email se válido
         */}
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>

      {/* ========================================
          SEPARADOR VISUAL
          ======================================== */}
      
      {/**
       * SEPARADOR "OU CONTINUE COM"
       * 
       * Elemento visual que divide login tradicional de social.
       * 
       * Estrutura:
       * - Linha esquerda (flex)
       * - Texto central
       * - Linha direita (flex)
       * 
       * Design elegante comum em telas de autenticação.
       */}
      <View style={styles.separator}>
        <View style={styles.line} />
        <Text style={styles.separatorText}>Ou continue com</Text>
        <View style={styles.line} />
      </View>

      {/* ========================================
          LOGIN SOCIAL
          ======================================== */}
      
      {/**
       * LINHA DE BOTÕES SOCIAIS
       * 
       * Container horizontal centralizado com botões de:
       * - Google
       * - Facebook
       * 
       * Layout com gap uniforme entre botões.
       * Justificação central para simetria visual.
       */}
      <View style={styles.socialRow}>

        {/**
         * BOTÃO GOOGLE
         * 
         * Botão quadrado com logo do Google.
         * 
         * Características:
         * - Dimensões fixas (60x60)
         * - Fundo branco com borda sutil
         * - Logo oficial do Google
         * - Sombra pequena para elevação
         * 
         * Funcionalidade futura:
         * - Integração com Google Sign-In
         * - Gerenciamento de tokens OAuth
         * - Sincronização de dados do perfil
         */}
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require('../assets/Google.png')}
            style={styles.socialIcon}
          />
        </TouchableOpacity>

        {/**
         * BOTÃO FACEBOOK
         * 
         * Botão quadrado com logo do Facebook.
         * 
         * Características:
         * - Dimensões fixas (60x60)
         * - Fundo branco com borda sutil
         * - Logo oficial do Facebook
         * - Sombra pequena para elevação
         * 
         * Funcionalidade futura:
         * - Integração com Facebook Login
         * - Gerenciamento de permissões
         * - Importação de dados básicos
         */}
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require('../assets/Facebook.png')}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ========================================
// ESTILOS DA TELA DE LOGIN
// ========================================

/**
 * SISTEMA DE ESTILOS COMPLETO
 * 
 * Estilos organizados por funcionalidade da tela de Login:
 * 1. Layout principal e containers
 * 2. Tipografia e textos
 * 3. Campos de formulário
 * 4. Botões e elementos interativos
 * 5. Separadores e elementos visuais
 * 6. Login social
 * 
 * Características do design:
 * - Integração total com sistema de design
 * - Responsividade e acessibilidade
 * - Hierarquia visual clara
 * - Feedback visual apropriado
 * - Consistência com outras telas
 */
const styles = StyleSheet.create({
  
  // ========================================
  // LAYOUT PRINCIPAL
  // ========================================
  
  /**
   * CONTAINER RAIZ DA TELA
   * 
   * Estilo base que define o layout principal da tela de Login.
   * 
   * Características:
   * - Ocupação total da altura disponível
   * - Fundo neutro do tema
   * - Padding horizontal para margem lateral
   * - Padding top para safe area e espaçamento
   * 
   * Layout:
   * - Flex 1 para altura completa
   * - Padding lateral generous para respiração
   * - Padding superior considerando status bar
   */
  container: {
    flex: 1,                                  // Altura total disponível
    backgroundColor: colors.background,       // Fundo neutro do tema
    paddingHorizontal: spacing.lg,            // Margem lateral generous
    paddingTop: spacing.xxl,                  // Safe area + espaçamento
  },
  
  // ========================================
  // HEADER DE NAVEGAÇÃO
  // ========================================
  
  // Header secundário com navegação e título
  navigationHeader: {
    paddingHorizontal: spacing.lg, // Padding lateral consistente
    paddingVertical: spacing.md, // Padding vertical para separação
    backgroundColor: colors.surface, // Fundo branco limpo
    flexDirection: 'row', // Layout horizontal
    justifyContent: 'space-between', // Distribui espaço entre elementos
    alignItems: 'center', // Alinha elementos verticalmente no centro
    marginHorizontal: -spacing.lg, // Compensa padding do container
    shadowColor: 'rgba(0, 0, 0, 0.1)', // Sombra sutil
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  // Título do header de navegação
  navigationTitle: {
    fontSize: fonts.sizes.lg, // Tamanho de fonte médio-grande
    fontFamily: 'Poppins-SemiBold', // Peso semi-bold
    color: colors.text.primary, // Cor primária do texto
    flex: 1, // Ocupa espaço disponível
    textAlign: 'center', // Centraliza o texto
  },
  
  // Placeholder para manter layout simétrico
  placeholder: {
    width: 40, // Mesma largura do BackButton
  },
  
  // ========================================
  // TIPOGRAFIA E CABEÇALHO
  // ========================================
  
  /**
   * TÍTULO PRINCIPAL
   * 
   * "Acesse" em fonte heroica para máximo impacto visual.
   * 
   * Características:
   * - Tamanho heroico para hierarquia máxima
   * - Negrito para peso visual
   * - Cor primária do texto
   * - Margem superior generous para posicionamento
   * 
   * Posicionamento:
   * - Margem top extra para compensar BackButton
   * - Espaçamento calculado para harmonia visual
   */
  title: {
    fontSize: fonts.sizes.hero,               // Tamanho heroico
    fontWeight: 'bold',                       // Negrito para impacto
    color: colors.text.primary,               // Cor primária do texto
    marginTop: spacing.xxl + spacing.md,      // Posicionamento calculado
  },
  
  /**
   * SUBTÍTULO EXPLICATIVO
   * 
   * "com E-mail e senha" complementando o título principal.
   * 
   * Características:
   * - Tamanho médio para hierarquia secundária
   * - Fonte Poppins Regular para leveza
   * - Cor secundária para menor destaque
   * - Margem inferior generous para separação do formulário
   */
  subtitle: {
    fontSize: fonts.sizes.md,                 // Tamanho médio
    fontFamily: getFontFamily('Poppins', 'Regular'), // Fonte regular
    color: colors.text.secondary,             // Cor secundária
    marginBottom: spacing.xl,                 // Separação do formulário
  },
  
  // ========================================
  // LABELS DOS CAMPOS
  // ========================================
  
  /**
   * TEXTO DOS LABELS
   * 
   * Labels descritivos acima dos campos de entrada.
   * 
   * Características:
   * - Tamanho pequeno para não competir com campos
   * - Fonte Montserrat Medium para distinção
   * - Cor primária para legibilidade
   * - Margem inferior pequena para proximidade do campo
   */
  inputText: {
    fontSize: fonts.sizes.sm,                 // Tamanho pequeno/médio
    fontFamily: getFontFamily('Montserrat', 'Medium'), // Fonte Montserrat
    color: colors.text.primary,               // Cor primária
    marginBottom: spacing.xs,                 // Proximidade do campo
  },
  
  // ========================================
  // CAMPOS DE FORMULÁRIO
  // ========================================
  
  /**
   * ESTILO DOS CAMPOS DE ENTRADA
   * 
   * TextInputs para email e senha com design unificado.
   * 
   * Características visuais:
   * - Fundo branco (surface) para destaque
   * - Bordas levemente arredondadas
   * - Padding generous para área de toque
   * - Borda sutil colorida
   * - Sombra pequena para elevação
   * 
   * Características funcionais:
   * - Fonte média para legibilidade
   * - Fonte Poppins Regular para uniformidade
   * - Margem inferior para espaçamento entre campos
   * 
   * Estados futuros:
   * - Focus state com borda destacada
   * - Error state com borda vermelha
   * - Success state com borda verde
   */
  input: {
    backgroundColor: colors.surface,          // Fundo branco para destaque
    borderRadius: borderRadius.sm,            // Bordas levemente arredondadas
    padding: spacing.lg,                      // Área de toque generous
    fontSize: fonts.sizes.md,                 // Tamanho legível
    fontFamily: getFontFamily('Poppins', 'Regular'), // Fonte regular
    marginBottom: spacing.lg,                 // Espaçamento entre campos
    borderWidth: 1,                           // Borda sutil
    borderColor: colors.accent,               // Cor de borda temática
    ...shadows.small,                         // Sombra pequena para elevação
  },
  
  // ========================================
  // LINHA DE OPÇÕES
  // ========================================
  
  /**
   * CONTAINER DA LINHA DE OPÇÕES
   * 
   * Layout horizontal que organiza checkbox e link de recuperação.
   * 
   * Características:
   * - Layout flexbox horizontal
   * - Justificação space-between para extremidades
   * - Alinhamento vertical central
   * - Margem inferior para separação dos botões
   */
  optionsRow: {
    flexDirection: 'row',                     // Layout horizontal
    justifyContent: 'space-between',          // Elementos nas extremidades
    alignItems: 'center',                     // Alinhamento vertical central
    marginBottom: spacing.xl,                 // Separação dos botões
  },
  
  /**
   * CONTAINER DO CHECKBOX
   * 
   * Agrupa checkbox e seu texto em layout horizontal.
   * 
   * Características:
   * - Layout flexbox horizontal
   * - Alinhamento vertical central
   * - Flex 1 para ocupar espaço disponível
   */
  checkboxContainer: {
    flexDirection: 'row',                     // Layout horizontal
    alignItems: 'center',                     // Alinhamento vertical central
    flex: 1,                                  // Ocupar espaço disponível
  },
  
  /**
   * TEXTO DO CHECKBOX
   * 
   * Label explicativo ao lado do checkbox "Lembrar senha".
   * 
   * Características:
   * - Tamanho pequeno para não dominar visualmente
   * - Fonte Poppins Regular para consistência
   * - Cor secundária para menor destaque
   * - Margem esquerda para espaçamento do checkbox
   */
  checkboxText: {
    fontSize: fonts.sizes.sm,                 // Tamanho pequeno
    fontFamily: getFontFamily('Poppins', 'Regular'), // Fonte regular
    color: colors.text.secondary,             // Cor secundária
    marginLeft: spacing.xs,                   // Espaçamento do checkbox
  },
  
  /**
   * LINK ESQUECI SENHA
   * 
   * Texto clicável para recuperação de senha.
   * 
   * Características:
   * - Tamanho pequeno harmonioso
   * - Fonte Poppins Medium para destaque sutil
   * - Cor primary para indicar interatividade
   * 
   * Estados futuros:
   * - Hover/pressed state com cor mais escura
   * - Sublinhado on press
   */
  forgot: {
    fontSize: fonts.sizes.sm,                 // Tamanho pequeno
    fontFamily: getFontFamily('Poppins', 'Medium'), // Peso médio
    color: colors.primary,                    // Cor primary para destaque
  },
  
  // ========================================
  // BOTÕES DE AÇÃO
  // ========================================
  
  /**
   * LINHA DOS BOTÕES PRINCIPAIS
   * 
   * Container horizontal para botões Acessar e Cadastrar.
   * 
   * Características:
   * - Layout flexbox horizontal
   * - Justificação space-between para distribuição
   * - Margem inferior para separação do separador
   * - Gap uniforme entre botões
   */
  buttonRow: {
    flexDirection: 'row',                     // Layout horizontal
    justifyContent: 'space-between',          // Distribuição uniforme
    marginBottom: spacing.xl,                 // Separação do separador
    gap: spacing.md,                          // Espaçamento entre botões
  },
  
  /**
   * BOTÃO PRIMARY (ACESSAR)
   * 
   * Botão principal de ação com destaque máximo.
   * 
   * Características visuais:
   * - Flex 1 para ocupar metade do espaço
   * - Fundo verde (cor primary)
   * - Padding vertical generous para área de toque
   * - Bordas arredondadas médias
   * - Centralização do texto
   * - Sombra média para elevação prominente
   * 
   * Estados futuros:
   * - Loading state com spinner
   * - Disabled state com opacidade reduzida
   * - Pressed state com cor mais escura
   */
  primaryButton: {
    flex: 1,                                  // Metade do espaço disponível
    backgroundColor: colors.primary,          // Fundo verde primary
    paddingVertical: spacing.lg,              // Área de toque generous
    borderRadius: borderRadius.md,            // Bordas arredondadas
    alignItems: 'center',                     // Centralização do texto
    ...shadows.medium,                        // Sombra média para elevação
  },
  
  /**
   * TEXTO DO BOTÃO PRIMARY
   * 
   * Estilo do texto dentro do botão Acessar.
   * 
   * Características:
   * - Cor branca para contraste com fundo verde
   * - Tamanho médio para legibilidade
   * - Fonte Poppins SemiBold para destaque
   */
  primaryButtonText: {
    color: colors.surface,                    // Branco para contraste
    fontSize: fonts.sizes.md,                 // Tamanho médio
    fontFamily: getFontFamily('Poppins', 'SemiBold'), // Semi-negrito
  },
  
  /**
   * BOTÃO SECONDARY (CADASTRAR)
   * 
   * Botão secundário com destaque mais sutil.
   * 
   * Características visuais:
   * - Flex 1 para ocupar metade do espaço
   * - Borda verde com espessura destacada
   * - Fundo branco (surface)
   * - Padding vertical generous para área de toque
   * - Bordas arredondadas médias
   * - Centralização do texto
   * - Sem sombra para menor destaque
   */
  secondaryButton: {
    flex: 1,                                  // Metade do espaço disponível
    borderColor: colors.primary,              // Borda verde
    borderWidth: 2,                           // Espessura destacada
    paddingVertical: spacing.lg,              // Área de toque generous
    borderRadius: borderRadius.md,            // Bordas arredondadas
    alignItems: 'center',                     // Centralização do texto
    backgroundColor: colors.surface,          // Fundo branco
  },
  
  /**
   * TEXTO DO BOTÃO SECONDARY
   * 
   * Estilo do texto dentro do botão Cadastrar.
   * 
   * Características:
   * - Cor verde para harmonizar com borda
   * - Tamanho médio para legibilidade
   * - Fonte Poppins SemiBold para destaque
   */
  secondaryButtonText: {
    color: colors.primary,                    // Verde para harmonizar
    fontSize: fonts.sizes.md,                 // Tamanho médio
    fontFamily: getFontFamily('Poppins', 'SemiBold'), // Semi-negrito
  },
  
  // ========================================
  // SEPARADOR VISUAL
  // ========================================
  
  /**
   * CONTAINER DO SEPARADOR
   * 
   * Layout horizontal que cria o efeito "--- Ou continue com ---".
   * 
   * Características:
   * - Layout flexbox horizontal
   * - Alinhamento vertical central
   * - Margem inferior para separação do login social
   */
  separator: {
    flexDirection: 'row',                     // Layout horizontal
    alignItems: 'center',                     // Alinhamento vertical central
    marginBottom: spacing.xl,                 // Separação do login social
  },
  
  /**
   * LINHAS DO SEPARADOR
   * 
   * Elementos visuais que criam as linhas laterais.
   * 
   * Características:
   * - Flex 1 para ocupar espaço disponível
   * - Altura mínima (1px) para linha sutil
   * - Cor accent para harmonia com tema
   */
  line: {
    flex: 1,                                  // Ocupar espaço disponível
    height: 1,                                // Linha sutil
    backgroundColor: colors.accent,           // Cor temática
  },
  
  /**
   * TEXTO DO SEPARADOR
   * 
   * "Ou continue com" centralizado entre as linhas.
   * 
   * Características:
   * - Margem horizontal para espaçamento das linhas
   * - Tamanho pequeno para não dominar visualmente
   * - Fonte Montserrat Regular para distinção
   * - Cor light para menor destaque
   */
  separatorText: {
    marginHorizontal: spacing.md,             // Espaçamento das linhas
    fontSize: fonts.sizes.sm,                 // Tamanho pequeno
    fontFamily: getFontFamily('Montserrat', 'Regular'), // Fonte Montserrat
    color: colors.text.light,                 // Cor light para sutileza
  },
  
  // ========================================
  // LOGIN SOCIAL
  // ========================================
  
  /**
   * LINHA DOS BOTÕES SOCIAIS
   * 
   * Container horizontal centralizado para botões Google e Facebook.
   * 
   * Características:
   * - Layout flexbox horizontal
   * - Justificação central para simetria
   * - Gap uniforme entre botões
   */
  socialRow: {
    flexDirection: 'row',                     // Layout horizontal
    justifyContent: 'center',                 // Centralização
    gap: spacing.lg,                          // Espaçamento uniforme
  },
  
  /**
   * BOTÕES SOCIAIS INDIVIDUAIS
   * 
   * Estilo base para botões Google e Facebook.
   * 
   * Características visuais:
   * - Dimensões fixas quadradas (60x60)
   * - Bordas arredondadas médias
   * - Fundo branco (surface)
   * - Borda sutil colorida
   * - Centralização do ícone
   * - Sombra pequena para elevação sutil
   * 
   * Design:
   * - Tamanho adequado para toque confortável
   * - Aspecto profissional e limpo
   * - Harmonia com resto da interface
   */
  socialButton: {
    width: 60,                                // Largura fixa
    height: 60,                               // Altura fixa (quadrado)
    borderRadius: borderRadius.md,            // Bordas arredondadas
    backgroundColor: colors.surface,          // Fundo branco
    borderColor: colors.accent,               // Borda sutil
    borderWidth: 1,                           // Espessura da borda
    justifyContent: 'center',                 // Centralização vertical
    alignItems: 'center',                     // Centralização horizontal
    ...shadows.small,                         // Sombra pequena
  },
  
  /**
   * ÍCONES SOCIAIS
   * 
   * Logos do Google e Facebook dentro dos botões.
   * 
   * Características:
   * - Dimensões proporcionais (30x30)
   * - Modo de redimensionamento 'contain'
   * - Preservação da proporção original
   * 
   * Assets:
   * - Google.png: Logo oficial do Google
   * - Facebook.png: Logo oficial do Facebook
   */
  socialIcon: {
    width: 30,                                // Largura proporcional
    height: 30,                               // Altura proporcional
    resizeMode: 'contain',                    // Preservar proporção
  },
});
