// ========================================
// TELA DE DADOS PESSOAIS - INTELLIDRIVER
// ========================================

/**
 * IMPORTAÇÕES E DEPENDÊNCIAS
 * 
 * Tela de dados pessoais do aplicativo IntelliDriver.
 * Focada exclusivamente na edição de informações pessoais e do veículo.
 */

import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  TextInput,
  Alert,
  Modal
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import BackButton from '../components/BackButton';
import Header from '../components/Header';
import { colors, fonts, spacing, borderRadius, shadows } from '../constants/theme';
import { getFontFamily } from '../hooks/useFontLoader';

// ========================================
// COMPONENTE PRINCIPAL - DADOS PESSOAIS
// ========================================

export default function DadosPessoais({ navigation }) {
  // Estado para controlar modo de edição do perfil (visualização vs edição)
  // Permite alternar entre modo de leitura e modo de edição dos dados do usuário
  const [isEditing, setIsEditing] = useState(false);
  
  // Estado para controlar visibilidade do modal de seleção de imagem
  // Gerencia a exibição do picker de imagem (câmera ou galeria)
  const [showImagePicker, setShowImagePicker] = useState(false);
  
  // Estado principal contendo todos os dados do perfil do usuário
  // Centraliza informações pessoais, preferências e configurações do usuário
  const [profileData, setProfileData] = useState({
    // Nome completo do usuário exibido no perfil e utilizado em toda aplicação
    name: 'João Silva',
    // Endereço de email para comunicações, notificações e autenticação
    email: 'joao.silva@email.com',
    // Número de telefone para contato e verificações de segurança
    phone: '(11) 99999-9999',
    // Data de nascimento para cálculos de idade e validações legais
    birthDate: '15/03/1990',
    // Categoria da carteira de habilitação (A, B, AB, C, D, E) para validações de veículos
    license: 'AB',
    // Placa do veículo principal para identificação e histórico de viagens
    licensePlate: 'ABC-1234',
    // URI da imagem de perfil selecionada pelo usuário (null = imagem padrão)
    profileImage: null
  });

  // Estado temporário para armazenar dados durante edição antes de confirmação
  // Permite cancelamento de edição sem perder dados originais do perfil
  const [tempData, setTempData] = useState({ ...profileData });

  // Função para iniciar modo de edição do perfil
  // Copia dados atuais para estado temporário e ativa interface de edição
  const handleEdit = () => {
    // Clona dados atuais para estado temporário permitindo edição sem afetar dados originais
    setTempData({ ...profileData });
    // Ativa modo de edição transformando campos de texto em inputs editáveis
    setIsEditing(true);
  };

  // Função para salvar alterações do perfil com validação completa
  // Valida dados, aplica alterações e retorna ao modo de visualização
  const handleSave = () => {
    // Validação obrigatória: nome não pode estar vazio ou apenas espaços
    if (!tempData.name.trim()) {
      Alert.alert('Erro', 'Nome é obrigatório');
      return;
    }
    
    // Validação obrigatória: email não pode estar vazio ou apenas espaços
    if (!tempData.email.trim()) {
      Alert.alert('Erro', 'Email é obrigatório');
      return;
    }

    // Validação de formato de email usando expressão regular robusta
    // Verifica presença de @ e domínio válido com pelo menos um ponto
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(tempData.email)) {
      // Alerta de erro para email com formato inválido
      Alert.alert('Erro', 'Email inválido');
      return;
    }

    // Salva dados temporários como dados oficiais do perfil
    setProfileData({ ...tempData });
    // Desativa modo de edição retornando à visualização normal
    setIsEditing(false);
    // Feedback visual de sucesso para o usuário
    Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
  };

  // Função para cancelar edição e descartar alterações
  // Restaura dados originais descartando modificações temporárias
  const handleCancel = () => {
    // Restaura dados originais descartando todas as alterações temporárias
    setTempData({ ...profileData });
    // Desativa modo de edição sem salvar alterações
    setIsEditing(false);
  };

  // Função assíncrona para seleção de imagem de perfil
  // Gerencia permissões e lançamento da câmera ou galeria
  const pickImage = async (source) => {
    try {
      let result;
      
      // Fluxo para captura de imagem via câmera do dispositivo
      if (source === 'camera') {
        // Solicita permissão para acessar câmera do dispositivo
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
          Alert.alert('Erro', 'Permissão para acessar a câmera é necessária');
          return;
        }
        // Lança interface da câmera com configurações específicas para perfil
        result = await ImagePicker.launchCameraAsync({
          // Restringe seleção apenas para imagens
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          // Permite edição/crop da imagem capturada
          allowsEditing: true,
          // Define proporção quadrada 1:1 ideal para fotos de perfil
          aspect: [1, 1],
          // Define qualidade de compressão (0.8 = 80% para otimizar tamanho)
          quality: 0.8,
        });
      } else {
        // Fluxo para seleção de imagem da galeria/biblioteca de mídia
        // Solicita permissão para acessar galeria de fotos do dispositivo
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
          Alert.alert('Erro', 'Permissão para acessar a galeria é necessária');
          return;
        }
        // Lança interface da galeria com mesmas configurações da câmera
        result = await ImagePicker.launchImageLibraryAsync({
          // Restringe seleção apenas para imagens
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          // Permite edição/crop da imagem selecionada
          allowsEditing: true,
          // Define proporção quadrada 1:1 ideal para fotos de perfil
          aspect: [1, 1],
          // Define qualidade de compressão para otimização
          quality: 0.8,
        });
      }

      // Processa resultado da seleção de imagem se não foi cancelada
      if (!result.canceled) {
        // Atualiza estado temporário com URI da imagem selecionada
        // Preserva outros dados do perfil e atualiza apenas a imagem
        setTempData(prev => ({ ...prev, profileImage: result.assets[0].uri }));
      }
    } catch (error) {
      // Tratamento de erro genérico para falhas na seleção de imagem
      Alert.alert('Erro', 'Erro ao selecionar imagem');
    }
    // Fecha modal de seleção independente do resultado
    setShowImagePicker(false);
  };

  // Função helper para renderização consistente de campos do perfil
  // Permite alternar entre modo de visualização e edição com validação
  // label: rótulo do campo, value: valor atual, key: chave no estado, keyboardType: tipo de teclado, editable: se é editável
  const renderField = (label, value, key, keyboardType = 'default', editable = true) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {isEditing && editable ? (
        // Campo de entrada de texto quando em modo de edição
        <TextInput
          style={styles.fieldInput}
          // Valor atual do campo sendo editado do estado temporário
          value={tempData[key]}
          // Atualiza estado temporário quando texto é alterado
          // Preserva outros campos e atualiza apenas o campo específico
          onChangeText={(text) => setTempData(prev => ({ ...prev, [key]: text }))}
          // Define tipo de teclado apropriado (default, email, numeric, phone)
          keyboardType={keyboardType}
          // Placeholder dinâmico baseado no label do campo
          placeholder={`Digite seu ${label.toLowerCase()}`}
          // Cor do placeholder usando token do sistema de design
          placeholderTextColor={colors.text.placeholder}
        />
      ) : (
        // Texto simples quando em modo de visualização
        <Text style={styles.fieldValue}>{value}</Text>
      )}
    </View>
  );

  // Estrutura principal da tela de perfil
  return (
    <View style={styles.container}>
      {/* Header com logo centralizada */}
      <Header />
      
      {/* Header simples com título e botão de voltar */}
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerTitle}>Dados Pessoais</Text>
        
        {/* Botão de edição visível apenas quando não está editando */}
        {!isEditing && (
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Ionicons name="pencil" size={20} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Container principal rolável para todo conteúdo do perfil */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Seção da foto de perfil com funcionalidade de alteração */}
        <View style={styles.profileImageContainer}>
          <View style={styles.profileImageWrapper}>
            {/* Renderização condicional da imagem de perfil */}
            {(tempData.profileImage || profileData.profileImage) ? (
              // Exibe imagem personalizada se disponível (temporária ou salva)
              <Image
                source={{ uri: tempData.profileImage || profileData.profileImage }}
                style={styles.profileImage}
              />
            ) : (
              // Placeholder com ícone quando não há imagem personalizada
              <View style={styles.profileImagePlaceholder}>
                <Ionicons name="person" size={60} color={colors.text.placeholder} />
              </View>
            )}
            
            {/* Botão para alterar imagem visível apenas em modo de edição */}
            {isEditing && (
              <TouchableOpacity
                style={styles.changeImageButton}
                // Abre modal de seleção de imagem (câmera ou galeria)
                onPress={() => setShowImagePicker(true)}
              >
                {/* Ícone de câmera indicando possibilidade de alterar foto */}
                <Ionicons name="camera" size={20} color={colors.surface} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Seção de informações pessoais básicas do usuário */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações Pessoais</Text>
          
          {/* Campo nome com validação obrigatória */}
          {renderField('Nome', profileData.name, 'name')}
          {/* Campo email com teclado específico e validação de formato */}
          {renderField('Email', profileData.email, 'email', 'email-address')}
          {/* Campo telefone com teclado numérico para facilitar entrada */}
          {renderField('Telefone', profileData.phone, 'phone', 'phone-pad')}
          {/* Campo data de nascimento com formatação específica */}
          {renderField('Data de Nascimento', profileData.birthDate, 'birthDate')}
        </View>

        {/* Seção de informações relacionadas ao veículo do usuário */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações do Veículo</Text>
          
          {/* Categoria da carteira de habilitação para validações legais */}
          {renderField('Categoria da CNH', profileData.license, 'license')}
          {/* Placa do veículo principal para identificação e histórico */}
          {renderField('Placa do Veículo', profileData.licensePlate, 'licensePlate')}
        </View>

        {/* Botões de ação para salvar ou cancelar edição */}
        {isEditing && (
          <View style={styles.buttonContainer}>
            {/* Botão cancelar que descarta alterações e retorna ao modo visualização */}
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            
            {/* Botão salvar que valida e aplica alterações */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <LinearGradient
                colors={[colors.primary, '#45A049']}
                style={styles.saveButtonGradient}
              >
                <Text style={styles.saveButtonText}>Salvar Alterações</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}

        {/* Espaçamento inferior para evitar sobreposição com elementos flutuantes */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Modal para seleção da fonte da imagem de perfil */}
      <Modal
        // Animação de slide para entrada suave do modal
        animationType="slide"
        // Fundo transparente para overlay escuro
        transparent={true}
        // Controle de visibilidade baseado no estado
        visible={showImagePicker}
        // Função para fechar modal quando usuário pressiona botão voltar (Android)
        onRequestClose={() => setShowImagePicker(false)}
      >
        {/* Overlay escuro semitransparente cobrindo toda a tela */}
        <View style={styles.modalOverlay}>
          {/* Container principal do conteúdo do modal */}
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Escolher Foto</Text>
            
            {/* Botão para capturar foto usando câmera do dispositivo */}
            <TouchableOpacity
              style={styles.modalOption}
              // Chama função pickImage com parâmetro 'camera' para abrir câmera
              onPress={() => pickImage('camera')}
            >
              <Ionicons name="camera" size={24} color={colors.primary} />
              <Text style={styles.modalOptionText}>Tirar Foto</Text>
            </TouchableOpacity>
            
            {/* Botão para selecionar foto da galeria/biblioteca de mídia */}
            <TouchableOpacity
              style={styles.modalOption}
              // Chama função pickImage com parâmetro 'gallery' para abrir galeria
              onPress={() => pickImage('gallery')}
            >
              <Ionicons name="images" size={24} color={colors.primary} />
              <Text style={styles.modalOptionText}>Escolher da Galeria</Text>
            </TouchableOpacity>
            
            {/* Botão de cancelar que fecha modal sem ação */}
            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => setShowImagePicker(false)}
            >
              <Text style={styles.modalCancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Definição de estilos usando StyleSheet para otimização de performance
// Centraliza todos os estilos do componente Profile seguindo o sistema de design
const styles = StyleSheet.create({
  // Container principal ocupando toda a tela com fundo limpo
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  // Header secundário simples com navegação e título
  header: {
    // Padding horizontal padrão para alinhamento com design system
    paddingHorizontal: spacing.lg,
    // Padding vertical para separação do conteúdo
    paddingVertical: spacing.md,
    // Fundo branco limpo
    backgroundColor: colors.surface,
    // Layout horizontal para organizar elementos
    flexDirection: 'row',
    // Distribui espaço entre back button, título e botão de edição
    justifyContent: 'space-between',
    // Alinha elementos verticalmente no centro
    alignItems: 'center',
    // Sombra sutil para separação
    ...shadows.small,
  },
  // Estilo do título principal "Dados Pessoais" no header
  headerTitle: {
    // Tamanho de fonte grande para hierarquia visual
    fontSize: fonts.sizes.lg,
    // Fonte Poppins Bold para destaque e importância
    fontFamily: getFontFamily('Poppins', 'Bold'),
    // Cor do texto primário
    color: colors.text.primary,
    // Ocupa espaço flexível para centralização
    flex: 1,
    // Centraliza o texto horizontalmente
    textAlign: 'center',
  },
  // Botão circular de edição no header com estilo simples
  editButton: {
    width: 40,
    height: 40,
    // Bordas completamente arredondadas para criar círculo perfeito
    borderRadius: borderRadius.round,
    // Fundo transparente para estilo minimalista
    backgroundColor: 'transparent',
    // Centraliza ícone horizontalmente
    justifyContent: 'center',
    // Centraliza ícone verticalmente
    alignItems: 'center',
    // Borda sutil com cor primária
    borderWidth: 1,
    borderColor: colors.primary,
  },
  // Container principal do conteúdo rolável com estilo aprimorado
  content: {
    // Ocupa todo espaço restante da tela
    flex: 1,
    // Padding uniforme seguindo tokens do design system
    padding: spacing.lg,
    // Background sutil para separação visual
    backgroundColor: 'transparent',
  },
  // Container centralizador da seção de imagem de perfil
  profileImageContainer: {
    // Centraliza horizontalmente a imagem
    alignItems: 'center',
    // Margem inferior para separação das seções seguintes
    marginBottom: spacing.xl,
  },
  // Wrapper da imagem com posicionamento relativo para botão de alteração
  profileImageWrapper: {
    // Permite posicionamento absoluto de elementos filhos
    position: 'relative',
  },
  // Estilo da imagem de perfil personalizada do usuário
  profileImage: {
    // Dimensões quadradas para foto de perfil padrão
    width: 120,
    height: 120,
    // Bordas completamente arredondadas criando círculo perfeito
    borderRadius: borderRadius.round,
    // Borda verde para destacar imagem e criar consistência visual
    borderWidth: 4,
    borderColor: colors.primary,
  },
  // Placeholder exibido quando não há imagem personalizada
  profileImagePlaceholder: {
    // Mesmas dimensões da imagem real para consistência
    width: 120,
    height: 120,
    // Bordas arredondadas mantendo formato circular
    borderRadius: borderRadius.round,
    // Fundo secundário sutil para o ícone placeholder
    backgroundColor: colors.secondary,
    // Centraliza ícone de pessoa horizontalmente
    justifyContent: 'center',
    // Centraliza ícone de pessoa verticalmente
    alignItems: 'center',
    // Borda consistente com imagem real
    borderWidth: 4,
    borderColor: colors.primary,
  },
  // Botão pequeno para alteração da imagem posicionado no canto inferior direito
  changeImageButton: {
    // Posicionamento absoluto para sobrepor imagem
    position: 'absolute',
    // Posiciona na parte inferior da imagem
    bottom: 0,
    // Posiciona no canto direito da imagem
    right: 0,
    // Dimensões compactas para botão discreto mas acessível
    width: 36,
    height: 36,
    // Bordas arredondadas para formato circular
    borderRadius: borderRadius.round,
    // Fundo verde principal para destacar ação
    backgroundColor: colors.primary,
    // Centraliza ícone de câmera horizontalmente
    justifyContent: 'center',
    // Centraliza ícone de câmera verticalmente
    alignItems: 'center',
    // Borda branca para separar do fundo da imagem
    borderWidth: 2,
    borderColor: colors.surface,
  },
  // Container para cada seção de conteúdo com design de card limpo
  section: {
    // Margem inferior para espaçamento entre seções
    marginBottom: spacing.xl,
    // Fundo branco sólido
    backgroundColor: colors.surface,
    // Bordas arredondadas para design moderno
    borderRadius: borderRadius.lg,
    // Padding interno generoso
    padding: spacing.lg,
    // Sombra suave para depth visual
    ...shadows.medium,
  },
  // Título de cada seção (Informações Pessoais, etc.)
  sectionTitle: {
    // Tamanho de fonte grande para hierarquia de títulos
    fontSize: fonts.sizes.lg,
    // Fonte semi-bold para destaque sem exagero
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
    // Cor secundária mais suave que o texto principal
    color: colors.text.secondary,
    // Margem inferior para espaçamento dos campos
    marginBottom: spacing.md,
  },
  // Container individual para cada campo de dados do perfil
  fieldContainer: {
    // Margem inferior entre campos para organização visual
    marginBottom: spacing.md,
  },
  // Label/rótulo de cada campo (Nome, Email, etc.)
  fieldLabel: {
    // Tamanho pequeno para informação secundária
    fontSize: fonts.sizes.sm,
    // Fonte medium para legibilidade sem muito destaque
    fontFamily: getFontFamily('Poppins', 'Medium'),
    // Cor secundária para hierarquia visual clara
    color: colors.text.secondary,
    // Margem pequena entre label e campo
    marginBottom: spacing.xs,
  },
  // Estilo para valores de campo em modo de visualização
  fieldValue: {
    // Tamanho médio para boa legibilidade do conteúdo
    fontSize: fonts.sizes.md,
    // Fonte regular para texto de dados
    fontFamily: getFontFamily('Poppins', 'Regular'),
    // Cor principal para destaque do conteúdo importante
    color: colors.text.primary,
    // Padding vertical para altura adequada de toque
    paddingVertical: spacing.md,
    // Padding horizontal para espaçamento interno
    paddingHorizontal: spacing.md,
    // Fundo branco/superfície para contraste
    backgroundColor: colors.surface,
    // Bordas arredondadas médias para suavidade
    borderRadius: borderRadius.md,
    // Borda sutil para definir limites do campo
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  // Estilo para campos de entrada em modo de edição
  fieldInput: {
    // Mesmo tamanho do texto de visualização para consistência
    fontSize: fonts.sizes.md,
    // Mesma fonte para manter continuidade visual
    fontFamily: getFontFamily('Poppins', 'Regular'),
    // Mesma cor de texto para consistência
    color: colors.text.primary,
    // Mesmo padding para manter dimensões
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    // Mesmo fundo para continuidade
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    // Borda mais espessa e colorida para indicar estado de edição
    borderWidth: 2,
    borderColor: colors.primary,
    // Sombra para indicar interatividade e estado ativo
    ...shadows.small,
  },
  // Container horizontal para botões de cancelar e salvar
  buttonContainer: {
    // Layout horizontal para botões lado a lado
    flexDirection: 'row',
    // Distribui espaço igualmente entre os botões
    justifyContent: 'space-between',
    // Margem superior para separação do conteúdo
    marginTop: spacing.lg,
    // Espaçamento entre os botões
    gap: spacing.md,
  },
  // Botão de cancelar com estilo outline/borda
  cancelButton: {
    // Ocupa metade do espaço disponível
    flex: 1,
    // Altura adequada para toque confortável
    paddingVertical: spacing.md,
    // Bordas arredondadas para suavidade
    borderRadius: borderRadius.md,
    // Borda verde para consistência visual
    borderWidth: 2,
    borderColor: colors.primary,
    // Centraliza texto horizontalmente
    alignItems: 'center',
  },
  // Texto do botão cancelar
  cancelButtonText: {
    // Tamanho médio para boa legibilidade
    fontSize: fonts.sizes.md,
    // Fonte semi-bold para destaque da ação
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
    // Cor verde para consistência com borda
    color: colors.primary,
  },
  // Botão de salvar com gradiente
  saveButton: {
    // Ocupa maior parte do espaço disponível
    flex: 2,
    // Bordas arredondadas consistentes
    borderRadius: borderRadius.md,
    // Overflow hidden para gradiente
    overflow: 'hidden',
    // Sombra para elevar botão principal
    ...shadows.medium,
  },
  
  // Gradiente do botão salvar
  saveButtonGradient: {
    // Mesma altura do botão cancelar para alinhamento
    paddingVertical: spacing.md,
    // Centraliza texto horizontalmente
    alignItems: 'center',
  },
  
  // Texto do botão salvar
  saveButtonText: {
    // Mesmo tamanho para consistência
    fontSize: fonts.sizes.md,
    // Mesma fonte para uniformidade
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
    // Cor branca para contraste com gradiente
    color: colors.surface,
  },
  // Overlay escuro semitransparente que cobre toda a tela durante modal
  modalOverlay: {
    // Ocupa toda a altura e largura da tela
    flex: 1,
    // Fundo escuro translúcido para foco no modal
    backgroundColor: colors.overlay,
    // Centraliza modal verticalmente
    justifyContent: 'center',
    // Centraliza modal horizontalmente
    alignItems: 'center',
  },
  // Container principal do conteúdo do modal
  modalContent: {
    // Fundo branco/superfície para contraste com overlay
    backgroundColor: colors.surface,
    // Bordas bem arredondadas para aparência moderna
    borderRadius: borderRadius.lg,
    // Padding generoso para respiro visual interno
    padding: spacing.xl,
    // Margem externa para evitar tocar bordas da tela
    margin: spacing.lg,
    // Largura mínima para garantir usabilidade em diversos dispositivos
    minWidth: 280,
    // Sombra grande para máxima elevação e destaque
    ...shadows.large,
  },
  // Título do modal "Escolher Foto"
  modalTitle: {
    // Tamanho grande para hierarquia visual clara
    fontSize: fonts.sizes.lg,
    // Fonte semi-bold para destaque do título
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
    // Cor principal para importância
    color: colors.text.primary,
    // Alinhamento central para simetria
    textAlign: 'center',
    // Margem inferior para separação das opções
    marginBottom: spacing.lg,
  },
  // Botão de opção no modal (Tirar Foto, Escolher da Galeria)
  modalOption: {
    // Layout horizontal para ícone + texto
    flexDirection: 'row',
    // Alinha ícone e texto verticalmente
    alignItems: 'center',
    // Padding vertical para área de toque confortável
    paddingVertical: spacing.md,
    // Padding horizontal menor para aproveitamento do espaço
    paddingHorizontal: spacing.sm,
    // Margem entre opções para separação visual
    marginBottom: spacing.sm,
  },
  // Texto das opções do modal
  modalOptionText: {
    // Tamanho médio para boa legibilidade
    fontSize: fonts.sizes.md,
    // Fonte regular para texto de opções
    fontFamily: getFontFamily('Poppins', 'Regular'),
    // Cor principal para importância das opções
    color: colors.text.primary,
    // Margem esquerda para espaçamento do ícone
    marginLeft: spacing.md,
  },
  // Botão de cancelar no modal com separação visual
  modalCancel: {
    // Padding vertical para área de toque adequada
    paddingVertical: spacing.md,
    // Margem superior para separação das opções principais
    marginTop: spacing.md,
    // Linha separadora na parte superior
    borderTopWidth: 1,
    borderTopColor: colors.secondary,
  },
  // Texto do botão cancelar no modal
  modalCancelText: {
    // Tamanho médio consistente com outras opções
    fontSize: fonts.sizes.md,
    // Fonte medium para distinção sutil do cancelar
    fontFamily: getFontFamily('Poppins', 'Medium'),
    // Cor secundária para indicar ação menos importante
    color: colors.text.secondary,
    // Alinhamento central para simetria
    textAlign: 'center',
  },
});