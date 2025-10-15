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
import BackButton from '../components/BackButton';
import Header from '../components/Header';
import { colors, fonts, spacing, borderRadius, shadows } from '../constants/theme';
import { getFontFamily } from '../hooks/useFontLoader';

// Tela de dados pessoais do usuário com funcionalidades de visualização e edição
export default function DadosPessoais({ navigation }) {
  // Estado para controlar modo de edição
  const [isEditing, setIsEditing] = useState(false);
  
  // Dados do perfil do usuário
  const [profileData, setProfileData] = useState({
    username: 'leogodoy',
    fullname: 'Leonardo Godoy',
    email: 'leo.godoy@email.com',
    phone: '(11) 99999-9999',
    birthDate: '15/03/1990',
    cnh: '12345678900',
    marcaVeiculo: 'Toyota',
    modeloVeiculo: 'Corolla',
    anoVeiculo: '2020',
    placaVeiculo: 'ABC-1234',
    profileImage: null
  });

  // Dados temporários para edição (evita alteração direta dos dados principais)
  const [tempData, setTempData] = useState({ ...profileData });
  
  // Modal para adicionar veículo
  const [addVehicleModalVisible, setAddVehicleModalVisible] = useState(false);
  const [newVehicle, setNewVehicle] = useState({ marca: '', modelo: '', ano: '', placa: '' });


  // Inicia modo de edição
  const handleEdit = () => {
    setTempData({ ...profileData });
    setIsEditing(true);
  };

  // Salva alterações com validação dos dados
  const handleSave = () => {
    if (!tempData.name.trim()) {
      Alert.alert('Erro', 'Nome é obrigatório');
      return;
    }
    
    if (!tempData.email.trim()) {
      Alert.alert('Erro', 'Email é obrigatório');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(tempData.email)) {
      Alert.alert('Erro', 'Email inválido');
      return;
    }

    setProfileData({ ...tempData });
    setIsEditing(false);
    Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
  };

  // Cancela edição e restaura dados originais
  const handleCancel = () => {
    setTempData({ ...profileData });
    setIsEditing(false);
  };

  // Função para seleção de imagem (temporariamente desabilitada)
  const pickImage = async (source) => {
    Alert.alert('Funcionalidade Desabilitada', 'A seleção de imagem foi temporariamente desabilitada.');
  };
  
  // Renderiza campo de dados (editável ou somente leitura)
  const renderField = (label, value, key, keyboardType = 'default', editable = true) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {isEditing && editable ? (
        <TextInput
          style={styles.fieldInput}
          value={tempData[key]}
          onChangeText={(text) => setTempData(prev => ({ ...prev, [key]: text }))}
          keyboardType={keyboardType}
          placeholder={`Digite seu ${label.toLowerCase()}`}
          placeholderTextColor={colors.text.placeholder}
        />
      ) : (
        <Text style={styles.fieldValue}>{value}</Text>
      )}
    </View>
  );

  
  // Abre modal de adicionar veículo
  const openAddVehicleModal = () => {
    setNewVehicle({ marca: '', modelo: '', ano: '', placa: '' });
    setAddVehicleModalVisible(true);
  };

  const closeAddVehicleModal = () => {
    setAddVehicleModalVisible(false);
  };

  const handleAddVehicle = () => {
    const { marca, modelo, ano, placa } = newVehicle;

    if (!marca.trim() || !modelo.trim() || !ano.trim() || !placa.trim()) {
      Alert.alert('Erro', 'Todos os campos do veículo são obrigatórios');
      return;
    }

    // Atualiza tanto profileData quanto tempData
    const updated = {
      ...profileData,
      marcaVeiculo: marca,
      modeloVeiculo: modelo,
      anoVeiculo: ano,
      placaVeiculo: placa,
    };

    setProfileData(updated);
    setTempData(updated);
    setAddVehicleModalVisible(false);
    Alert.alert('Sucesso', 'Veículo adicionado com sucesso');
  };


  return (
    <View style={styles.container}>
      <Header />
      
      {/* Header com botão voltar, título e botão editar */}
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerTitle}>Dados Pessoais</Text>
        
        {!isEditing && (
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Ionicons name="pencil" size={20} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Seção da imagem de perfil com opção de troca */}
        <View style={styles.profileImageContainer}>
          <View style={styles.profileImageWrapper}>
            {(tempData.profileImage || profileData.profileImage) ? (
              <Image
                source={{ uri: tempData.profileImage || profileData.profileImage }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <Ionicons name="person" size={60} color={colors.text.placeholder} />
              </View>
            )}
            
            {isEditing && (
              <TouchableOpacity
                style={styles.changeImageButton}
                onPress={() => Alert.alert('Funcionalidade Desabilitada', 'A troca de imagem foi temporariamente desabilitada.')}
              >
                <Ionicons name="camera" size={20} color={colors.surface} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Seção de informações pessoais básicas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações Pessoais</Text>
          {renderField('Usuário', profileData.username, 'username')}

          {renderField('Nome', profileData.fullname, 'fullname')}

          {renderField('Email', profileData.email, 'email', 'email-address')}

          {renderField('Telefone', profileData.phone, 'phone', 'phone-pad')}

          {renderField('Data de Nascimento', profileData.birthDate, 'birthDate')}

          {renderField('Número da CNH', profileData.cnh, 'cnh', 'default')}
        </View>

        {/* Seção de informações relacionadas ao veículo */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações do Veículo</Text>

          {renderField('Marca do Veículo', profileData.marcaVeiculo, 'marcaVeiculo')}

          {renderField('Modelo do Veículo', profileData.modeloVeiculo, 'modeloVeiculo')}

          {renderField('Ano do Veículo', profileData.anoVeiculo, 'anoVeiculo')}

          {renderField('Placa do Veículo', profileData.placaVeiculo, 'placaVeiculo')}

          {/* Botão para adicionar veículo (aparece quando não em edição) */}
          {!isEditing && (
            <TouchableOpacity style={styles.addVehicleButton} onPress={openAddVehicleModal}>
              <Text style={styles.addVehicleText}>Adicionar Veículo</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Botões de ação no modo de edição */}
        {isEditing && (
          <View style={styles.buttonContainer}>

            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Salvar Alterações</Text>
            </TouchableOpacity>
          </View>
        )}


        <View style={{ height: 100 }} />
      </ScrollView>

        
      {/* Modal de adicionar veículo */}
      <Modal
        visible={addVehicleModalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeAddVehicleModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar Veículo</Text>

            <Text style={styles.fieldLabel}>Marca</Text>
            <TextInput
              style={styles.fieldInput}
              value={newVehicle.marca}
              onChangeText={(text) => setNewVehicle(prev => ({ ...prev, marca: text }))}
              placeholder="Marca do veículo"
              placeholderTextColor={colors.text.placeholder}
            />

            <Text style={[styles.fieldLabel, { marginTop: spacing.sm }]}>Modelo</Text>
            <TextInput
              style={styles.fieldInput}
              value={newVehicle.modelo}
              onChangeText={(text) => setNewVehicle(prev => ({ ...prev, modelo: text }))}
              placeholder="Modelo do veículo"
              placeholderTextColor={colors.text.placeholder}
            />

            <Text style={[styles.fieldLabel, { marginTop: spacing.sm }]}>Ano</Text>
            <TextInput
              style={styles.fieldInput}
              value={newVehicle.ano}
              onChangeText={(text) => setNewVehicle(prev => ({ ...prev, ano: text }))}
              placeholder="Ano"
              keyboardType="numeric"
              placeholderTextColor={colors.text.placeholder}
            />

            <Text style={[styles.fieldLabel, { marginTop: spacing.sm }]}>Placa</Text>
            <TextInput
              style={styles.fieldInput}
              value={newVehicle.placa}
              onChangeText={(text) => setNewVehicle(prev => ({ ...prev, placa: text }))}
              placeholder="Placa"
              placeholderTextColor={colors.text.placeholder}
            />

            <View style={{ flexDirection: 'row', marginTop: spacing.lg, gap: spacing.md }}>
              <TouchableOpacity style={styles.cancelButton} onPress={closeAddVehicleModal}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveButton} onPress={handleAddVehicle}>
                  <Text style={styles.saveButtonText}>Adicionar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...shadows.small,
  },
  headerTitle: {
    fontSize: fonts.sizes.lg,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.text.primary,
    flex: 1,
    textAlign: 'center',
  },

  editButton: {
    width: 40,
    height: 40,
  
    borderRadius: borderRadius.round,
  
    backgroundColor: 'transparent',
  
    justifyContent: 'center',
  
    alignItems: 'center',
  
    borderWidth: 1,
    borderColor: colors.primary,
  },

  content: {
  
    flex: 1,
  
    padding: spacing.lg,
  
    backgroundColor: 'transparent',
  },

  profileImageContainer: {
  
    alignItems: 'center',
  
    marginBottom: spacing.xl,
  },

  profileImageWrapper: {
  
    position: 'relative',
  },

  profileImage: {
  
    width: 120,
    height: 120,
  
    borderRadius: borderRadius.round,
  
    borderWidth: 4,
    borderColor: colors.primary,
  },

  profileImagePlaceholder: {
  
    width: 120,
    height: 120,
  
    borderRadius: borderRadius.round,
  
    backgroundColor: colors.secondary,
  
    justifyContent: 'center',
  
    alignItems: 'center',
  
    borderWidth: 4,
    borderColor: colors.primary,
  },

  changeImageButton: {
  
    position: 'absolute',
  
    bottom: 0,
  
    right: 0,
  
    width: 36,
    height: 36,
  
    borderRadius: borderRadius.round,
  
    backgroundColor: colors.primary,
  
    justifyContent: 'center',
  
    alignItems: 'center',
  
    borderWidth: 2,
    borderColor: colors.surface,
  },

  section: {
  
    marginBottom: spacing.xl,
  
    backgroundColor: colors.surface,
  
    borderRadius: borderRadius.lg,
  
    padding: spacing.lg,
  
    ...shadows.medium,
  },

  sectionTitle: {
  
    fontSize: fonts.sizes.lg,
  
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
  
    color: colors.text.secondary,
  
    marginBottom: spacing.md,
  },

  fieldContainer: {
  
    marginBottom: spacing.md,
  },

  fieldLabel: {
  
    fontSize: fonts.sizes.sm,
  
    fontFamily: getFontFamily('Poppins', 'Medium'),
  
    color: colors.text.secondary,
  
    marginBottom: spacing.xs,
  },

  fieldValue: {
  
    fontSize: fonts.sizes.md,
  
    fontFamily: getFontFamily('Poppins', 'Regular'),
  
    color: colors.text.primary,
  
    paddingVertical: spacing.md,
  
    paddingHorizontal: spacing.md,
  
    backgroundColor: colors.surface,
  
    borderRadius: borderRadius.md,
  
    borderWidth: 1,
    borderColor: colors.secondary,
  },

  fieldInput: {
  
    fontSize: fonts.sizes.md,
  
    fontFamily: getFontFamily('Poppins', 'Regular'),
  
    color: colors.text.primary,
  
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
  
    borderWidth: 2,
    borderColor: colors.primary,
  
    ...shadows.small,
  },

  buttonContainer: {
  
    flexDirection: 'row',
  
    justifyContent: 'space-between',
  
    marginTop: spacing.lg,
  
    gap: spacing.md,
  },

  cancelButton: {
  
    flex: 1,
  
    paddingVertical: spacing.md,
  
    borderRadius: borderRadius.md,
  
    borderWidth: 2,
    borderColor: colors.primary,
  
    alignItems: 'center',
  },

  cancelButtonText: {
  
    fontSize: fonts.sizes.md,
  
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
  
    color: colors.primary,
  },

  saveButton: {
  
    flex: 1.5,
    padding: spacing.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    borderRadius: borderRadius.md,
  
    overflow: 'hidden',
  
    ...shadows.medium,
  },

  saveButtonText: {
  
    fontSize: fonts.sizes.md,
  
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
  
    color: colors.surface,
  },

  /* Estilos para o botão de adicionar veículo */
  addVehicleButton: {
    marginTop: spacing.md,
    alignSelf: 'stretch',
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    backgroundColor: colors.primary,
    padding: spacing.md,
    alignItems: 'center',
    ...shadows.medium,
  },

  addVehicleText: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
    color: colors.surface,
  },

  modalOverlay: {
  
    flex: 1,
  
    backgroundColor: colors.overlay,
  
    justifyContent: 'center',
  
    alignItems: 'center',
  },

  modalContent: {
  
    backgroundColor: colors.surface,
  
    borderRadius: borderRadius.lg,
  
    padding: spacing.lg,

    marginHorizontal: spacing.lg,

    minWidth: 320,

    ...shadows.large,
  },

  modalTitle: {
  
    fontSize: fonts.sizes.lg,
  
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
  
    color: colors.text.primary,
  
    textAlign: 'center',
  
    marginBottom: spacing.lg,
  },

  modalOption: {
  
    flexDirection: 'row',
  
    alignItems: 'center',
  
    paddingVertical: spacing.md,
  
    paddingHorizontal: spacing.sm,
  
    marginBottom: spacing.sm,
  },

  modalOptionText: {
  
    fontSize: fonts.sizes.md,
  
    fontFamily: getFontFamily('Poppins', 'Regular'),
  
    color: colors.text.primary,
  
    marginLeft: spacing.md,
  },

  modalCancel: {
  
    paddingVertical: spacing.md,
  
    marginTop: spacing.md,
  
    borderTopWidth: 1,
    borderTopColor: colors.secondary,
  },

  modalCancelText: {
  
    fontSize: fonts.sizes.md,
  
    fontFamily: getFontFamily('Poppins', 'Medium'),
  
    color: colors.text.secondary,
  
    textAlign: 'center',
  },
});
