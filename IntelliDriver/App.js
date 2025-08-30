import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  ScrollView,
} from 'react-native';
import RNBluetoothClassic from 'react-native-bluetooth-classic';

const App = () => {
  const [devices, setDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    let cleanup;
    if (connectedDevice) {
      cleanup = connectToDevice(connectedDevice);
    }

    return () => {
      if (cleanup) cleanup();
      if (isConnected) {
        RNBluetoothClassic.disconnect();
      }
    };
  }, [isConnected]);


  const addLog = (msg) => {
    console.log(msg);
    setLogs((prev) => [...prev, msg]);
  };

  const requestPermissions = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 31) {
      try {
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);
        addLog('Permissions granted');
      } catch (err) {
        addLog(`Permissão negada: ${err}`);
      }
    }
  };

  const listPairedDevices = async () => {
    try {
      const paired = await RNBluetoothClassic.getBondedDevices();
      setDevices(paired);
      addLog(`Paired devices encontrados: ${paired.length}`);
    } catch (err) {
      addLog(`Erro listando dispositivos: ${err}`);
    }
  };

  const connectToDevice = async (device) => {
    try {
      addLog(`Tentando conectar a ${device.name || device.address}...`);

      const connection = await RNBluetoothClassic.connectToDevice(device.address, {
        delimiter: '\r',
      });

      if (connection) {
        setConnectedDevice(connection);
        setIsConnected(true);
        addLog(`Conectado a: ${device.name || device.address}`);

        const subscription = connection.onDataReceived((event) => {
          const msg = String(event.data).trim();
          addLog(`Mensagem recebida: ${msg}`);
          setMessages((prev) => [...prev, msg]);
        });

        await connection.write('010C\r');
        addLog('Enviado comando: 010C');

        return () => subscription.remove();
      } else {
        addLog('Falha na conexão (retornou false)');
      }
    } catch (err) {
      addLog(`Erro de conexão: ${err}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bluetooth Classic Debug</Text>
      <Button title="List Paired Devices" onPress={listPairedDevices} />

      <FlatList
        data={devices}
        keyExtractor={(item) => item.address}
        renderItem={({ item }) => (
          <View style={styles.deviceItem}>
            <Text style={styles.item}>{item.name || item.address}</Text>
            <Button title="Conectar" onPress={() => connectToDevice(item)} />
          </View>
        )}
        ListEmptyComponent={<Text>Nada aq</Text>}
      />

      {isConnected && connectedDevice && (
        <Text style={styles.connectedText}>
          🔗 Connected to: {connectedDevice.name || connectedDevice.address}
        </Text>
      )}

      {messages.length > 0 && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ color: 'yellow' }}>Mensagens recebidas:</Text>
          {messages.map((msg, idx) => (
            <Text key={idx} style={{ color: 'white' }}>{msg}</Text>
          ))}
        </View>
      )}

      <ScrollView style={styles.logBox}>
        {logs.map((log, idx) => (
          <Text key={idx} style={styles.logText}>{log}</Text>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  item: {
    fontSize: 16,
    marginVertical: 5,
    color: 'white',
  },
  deviceItem: { marginVertical: 10 },
  connectedText: { marginTop: 20, fontSize: 16, color: 'green' },
  logBox: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#111',
    borderRadius: 10,
    maxHeight: 200,
  },
  logText: {
    color: '#0f0',
    fontSize: 14,
    marginVertical: 2,
  },
});

export default App;