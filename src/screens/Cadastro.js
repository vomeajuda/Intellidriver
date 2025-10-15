import React, { useState } from 'react';
import { 
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Alert
} from 'react-native';

import BackButton from '../components/BackButton';
import Header from '../components/Header';
import { colors, fonts, spacing, borderRadius, shadows } from '../constants/theme';
import { getFontFamily } from '../hooks/useFontLoader';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  scrollContainer: {
    flex: 1,
  },
  
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  
  navigationHeader: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  navigationTitle: {
    fontSize: fonts.sizes.lg,
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
    color: colors.text.primary,
    flex: 1,
    textAlign: 'center',
  },
  
  placeholder: {
    width: 40,
  },
  
  headerBackButton: {
    position: 'relative',
    top: 0,
    left: 0,
    margin: 0,
  },
  
  // Indicador de Progresso
  progressContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.accent,
  },
  
  progressText: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Medium'),
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: colors.accent,
    borderRadius: 3,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
  },
  
  step: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.accent,
  },
  
  stepActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  
  stepText: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.text.secondary,
  },
  
  stepTextActive: {
    color: colors.surface,
  },
  
  // Formulário
  formContainer: {
    marginTop: spacing.lg,
  },
  
  title: {
    fontSize: fonts.sizes.xxl,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.text.primary,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  
  subtitle: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.secondary,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  
  inputGroup: {
    marginBottom: spacing.lg,
  },
  
  label: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Medium'),
    color: 'rgba(0, 0, 0, 0.7)',
    marginBottom: spacing.xs,
    letterSpacing: 0.3,
  },
  
  input: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
    color: colors.text.primary,
    minHeight: 52,
  },
  
  // Botões
  buttonContainer: {
    marginTop: spacing.xl,
    gap: spacing.md,
  },
  
  primaryButton: {
    width: '100%',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 0,
    shadowOpacity: 0,
  },
  
  primaryButtonText: {
    color: colors.surface,
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
    letterSpacing: 0.5,
  },
  
  disabledButton: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  
  disabledButtonText: {
    color: 'rgba(0, 0, 0, 0.35)',
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Medium'),
    letterSpacing: 0.5,
  },
  
  linkButton: {
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  
  linkButtonText: {
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    letterSpacing: 0.3,
  },
});

// ========================================
// COMPONENTES AUXILIARES
// ========================================

const ProgressIndicator = ({ passoAtual }) => (
  <View style={styles.progressContainer}>
    <Text style={styles.progressText}>Passo {passoAtual} de 3</Text>
    
    <View style={styles.progressBar}>
      <View style={[styles.progressFill, { width: `${(passoAtual / 3) * 100}%` }]} />
    </View>
    
    <View style={styles.stepsContainer}>
      {[1, 2, 3].map(step => (
        <View key={step} style={[styles.step, passoAtual >= step && styles.stepActive]}>
          <Text style={[styles.stepText, passoAtual >= step && styles.stepTextActive]}>
            {step}
          </Text>
        </View>
      ))}
    </View>
  </View>
);

const Passo1 = ({ nomeUsuario, setNomeUsuario, email, setEmail, senha, setSenha, confirmarSenha, setConfirmarSenha }) => (
  <View style={styles.formContainer}>
    <Text style={styles.title}>Dados da Conta</Text>
    <Text style={styles.subtitle}>Crie suas credenciais de acesso</Text>
    
    <View style={styles.inputGroup}>
      <Text style={styles.label}>Nome de usuário</Text>
      <TextInput
        style={styles.input}
        value={nomeUsuario}
        onChangeText={setNomeUsuario}
        placeholder="Como gostaria de ser chamado?"
        placeholderTextColor="rgba(0, 0, 0, 0.4)"
      />
    </View>
    
    <View style={styles.inputGroup}>
      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Seu e-mail de contato"
        placeholderTextColor="rgba(0, 0, 0, 0.4)"
        keyboardType="email-address"
        autoCapitalize="none"
      />
    </View>

    <View style={styles.inputGroup}>
      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
        placeholder="Crie uma senha segura"
        placeholderTextColor="rgba(0, 0, 0, 0.4)"
        secureTextEntry
      />
    </View>

    <View style={styles.inputGroup}>
      <Text style={styles.label}>Confirmar Senha</Text>
      <TextInput
        style={styles.input}
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        placeholder="Confirme sua senha"
        placeholderTextColor="rgba(0, 0, 0, 0.4)"
        secureTextEntry
      />
    </View>
  </View>
);

const Passo2 = ({ nomeCompleto, setNomeCompleto, telefone, setTelefone, dataNascimento, setDataNascimento, cnh, setCnh }) => (
  <View style={styles.formContainer}>
    <Text style={styles.title}>Dados Pessoais</Text>
    <Text style={styles.subtitle}>Conte-nos mais sobre você</Text>
    
    <View style={styles.inputGroup}>
      <Text style={styles.label}>Nome Completo</Text>
      <TextInput
        style={styles.input}
        value={nomeCompleto}
        onChangeText={setNomeCompleto}
        placeholder="Seu nome completo"
        placeholderTextColor="rgba(0, 0, 0, 0.4)"
      />
    </View>

    <View style={styles.inputGroup}>
      <Text style={styles.label}>Telefone</Text>
      <TextInput
        style={styles.input}
        value={telefone}
        onChangeText={setTelefone}
        placeholder="(00) 00000-0000"
        placeholderTextColor="rgba(0, 0, 0, 0.4)"
        keyboardType="phone-pad"
      />
    </View>

    <View style={styles.inputGroup}>
      <Text style={styles.label}>Data de Nascimento</Text>
      <TextInput
        style={styles.input}
        value={dataNascimento}
        onChangeText={setDataNascimento}
        placeholder="DD/MM/AAAA"
        placeholderTextColor="rgba(0, 0, 0, 0.4)"
      />
    </View>

    <View style={styles.inputGroup}>
      <Text style={styles.label}>CNH</Text>
      <TextInput
        style={styles.input}
        value={cnh}
        onChangeText={setCnh}
        placeholder="Número da habilitação"
        placeholderTextColor="rgba(0, 0, 0, 0.4)"
        keyboardType="numeric"
      />
    </View>
  </View>
);

const Passo3 = ({ marcaVeiculo, setMarcaVeiculo, modeloVeiculo, setModeloVeiculo, anoVeiculo, setAnoVeiculo, placaVeiculo, setPlacaVeiculo }) => (
  <View style={styles.formContainer}>
    <Text style={styles.title}>Dados do Veículo</Text>
    <Text style={styles.subtitle}>Informações sobre seu carro</Text>
    
    <View style={styles.inputGroup}>
      <Text style={styles.label}>Marca</Text>
      <TextInput
        style={styles.input}
        value={marcaVeiculo}
        onChangeText={setMarcaVeiculo}
        placeholder="Ex: Toyota, Honda, Ford"
        placeholderTextColor="rgba(0, 0, 0, 0.4)"
      />
    </View>

    <View style={styles.inputGroup}>
      <Text style={styles.label}>Modelo</Text>
      <TextInput
        style={styles.input}
        value={modeloVeiculo}
        onChangeText={setModeloVeiculo}
        placeholder="Ex: Corolla, Civic, Focus"
        placeholderTextColor="rgba(0, 0, 0, 0.4)"
      />
    </View>

    <View style={styles.inputGroup}>
      <Text style={styles.label}>Ano</Text>
      <TextInput
        style={styles.input}
        value={anoVeiculo}
        onChangeText={setAnoVeiculo}
        placeholder="Ex: 2020"
        placeholderTextColor="rgba(0, 0, 0, 0.4)"
        keyboardType="numeric"
      />
    </View>

    <View style={styles.inputGroup}>
      <Text style={styles.label}>Placa</Text>
      <TextInput
        style={styles.input}
        value={placaVeiculo}
        onChangeText={setPlacaVeiculo}
        placeholder="ABC-1234"
        placeholderTextColor="rgba(0, 0, 0, 0.4)"
        autoCapitalize="characters"
      />
    </View>
  </View>
);

// ========================================
// COMPONENTE PRINCIPAL - CADASTRO
// ========================================

export default function Cadastro({ navigation }) {
  
  // ========================================
  // ESTADOS
  // ========================================
  
  const [passoAtual, setPassoAtual] = useState(1);
  
  // Passo 1 - Dados da Conta
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  
  // Passo 2 - Dados Pessoais
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [cnh, setCnh] = useState('');
  
  // Passo 3 - Dados do Veículo
  const [marcaVeiculo, setMarcaVeiculo] = useState('');
  const [modeloVeiculo, setModeloVeiculo] = useState('');
  const [anoVeiculo, setAnoVeiculo] = useState('');
  const [placaVeiculo, setPlacaVeiculo] = useState('');

  // ========================================
  // VALIDAÇÕES
  // ========================================
  
  const validarPasso1 = () => {
    // Verificação simplificada - pelo menos nome de usuário e email
    return nomeUsuario.trim().length > 0 && email.trim().length > 0 && senha.trim().length > 0;
  };

  const senhaValida = () => {
    if (senha === confirmarSenha) {
      return avancarPasso();
    } else {
      Alert.alert('Atenção', 'As senhas não coincidem.');
      return false;
    }
  };

  const validarPasso2 = () => {
    return nomeCompleto.trim().length > 0;
  };
  
  const validarPasso3 = () => {
    return marcaVeiculo.trim().length > 0;
  };
  
  const podeAvancar = () => {
    switch (passoAtual) {
      case 1: return validarPasso1()
      case 2: return validarPasso2();
      case 3: return validarPasso3();
      default: return false;
    }
  };

  // ========================================
  // NAVEGAÇÃO
  // ========================================
  
  const avancarPasso = () => {
    if (passoAtual < 3) {
      setPassoAtual(passoAtual + 1);
    } else {
      finalizarCadastro();
    }
  };
  
  const voltarPasso = () => {
    if (passoAtual > 1) {
      setPassoAtual(passoAtual - 1);
    } else {
      navigation.goBack();
    }
  };
  
  const finalizarCadastro = () => {
    Alert.alert(
      'Sucesso',
      'Cadastro realizado com sucesso!',
      [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
    );
  };

  // ========================================
  // RENDERIZAÇÃO PRINCIPAL
  // ========================================
  
  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.navigationHeader}>
        <BackButton 
          onPress={voltarPasso} 
          style={styles.headerBackButton}
        />
        <Text style={styles.navigationTitle}>Cadastro</Text>
        <View style={styles.placeholder} />
      </View>

      <ProgressIndicator passoAtual={passoAtual} />

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {passoAtual === 1 && (
          <Passo1 
            nomeUsuario={nomeUsuario}
            setNomeUsuario={setNomeUsuario}
            email={email}
            setEmail={setEmail}
            senha={senha}
            setSenha={setSenha}
            confirmarSenha={confirmarSenha}
            setConfirmarSenha={setConfirmarSenha}
          />
        )}
        {passoAtual === 2 && (
          <Passo2 
            nomeCompleto={nomeCompleto}
            setNomeCompleto={setNomeCompleto}
            telefone={telefone}
            setTelefone={setTelefone}
            dataNascimento={dataNascimento}
            setDataNascimento={setDataNascimento}
            cnh={cnh}
            setCnh={setCnh}
          />
        )}
        {passoAtual === 3 && (
          <Passo3 
            marcaVeiculo={marcaVeiculo}
            setMarcaVeiculo={setMarcaVeiculo}
            modeloVeiculo={modeloVeiculo}
            setModeloVeiculo={setModeloVeiculo}
            anoVeiculo={anoVeiculo}
            setAnoVeiculo={setAnoVeiculo}
            placaVeiculo={placaVeiculo}
            setPlacaVeiculo={setPlacaVeiculo}
          />
        )}

        <View style={styles.buttonContainer}>
          {/* BOTÃO PRINCIPAL ÚNICO */}
          <TouchableOpacity 
            style={podeAvancar() ? styles.primaryButton : styles.disabledButton} 
            onPress={() => {
              if (passoAtual === 1) {
                senhaValida();
              } else if (podeAvancar()) {
                avancarPasso();
              } else {
                Alert.alert('Atenção', 'Preencha todos os campos obrigatórios para continuar.');
              }
            }}
          >
            <Text style={podeAvancar() ? styles.primaryButtonText : styles.disabledButtonText}>
              {passoAtual === 3 ? 'Criar Conta' : 'Avançar'}
            </Text>
          </TouchableOpacity>

          {/* BOTÃO JÁ TENHO CONTA - APENAS NO PRIMEIRO PASSO */}
          {passoAtual === 1 && (
            <TouchableOpacity 
              style={styles.linkButton} 
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.linkButtonText}>Já tenho uma conta</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
}