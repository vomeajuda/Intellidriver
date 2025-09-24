// ========================================
// IMPORTAÇÕES E DEPENDÊNCIAS - APP PRINCIPAL
// ========================================

import * as React from 'react';

// react-native-screens optimization
import { enableScreens } from 'react-native-screens';
enableScreens();

// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Safe area handling
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// React Native components
import { View, Text, StatusBar, Platform } from 'react-native';

// Custom font loader
import { useFontLoader } from './hooks/useFontLoader';

// Screens
import Home from './screens/Home';
import Activity from './screens/Activity';
import Historico from './screens/Historico';
import Login from './screens/Login';
import PercursoDetalhes from './screens/PercursoDetalhes';
import CarsAnalytics from './screens/CarsAnalytics';
import DadosPessoais from './screens/DadosPessoais';
import ProfileStats from './screens/ProfileStats';
import Cadastro from './screens/Cadastro';
import Welcome from './screens/Welcome';

const Stack = createNativeStackNavigator();

export default function App() {
  const fontsLoaded = useFontLoader();

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Carregando fontes...</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      {/* Controla a cor/visibilidade da status bar */}
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        backgroundColor="transparent"
        translucent
      />

      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{ headerShown: false }}
          > 
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Cadastro" component={Cadastro} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Activity" component={Activity} />
            <Stack.Screen name="Historico" component={Historico} />
            <Stack.Screen name="PercursoDetalhes" component={PercursoDetalhes} />
            <Stack.Screen name="CarsAnalytics" component={CarsAnalytics} />
            <Stack.Screen name="DadosPessoais" component={DadosPessoais} />
            <Stack.Screen name="ProfileStats" component={ProfileStats} />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}