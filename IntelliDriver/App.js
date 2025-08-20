import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  PermissionsAndroid,
  Platform,
  StyleSheet,
} from 'react-native';
import RNBluetoothClassic from 'react-native-bluetooth-classic';

const App = () => {
  const [devices, setDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 31) {
      try {
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);
      } catch (err) {
        console.warn('Favor permitir', err);
      }
    }
  };

  const listPairedDevices = async () => {
    try {
      const paired = await RNBluetoothClassic.getBondedDevices();
      setDevices(paired);
    } catch (err) {
      console.error('Erro', err);
    }
  };

  const connectToDevice = async (device) => {
    try {
      const success = await device.connect();
      if (success) {
        setConnectedDevice(device);
        setIsConnected(true);
        console.log('Conectado a:', device.name);
        await device.write('010C\r');
      }
    } catch (err) {
      console.error('Connection failed:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bluetooth Classic Example</Text>
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
        ListEmptyComponent={<Text>O vazio que corroe</Text>}
      />

      {isConnected && connectedDevice && (
        <Text style={styles.connectedText}>
          Connected to: {connectedDevice.name}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white'
  },
  item: {
    fontSize: 16,
    marginVertical: 5,
    color: 'white',
  },
  deviceItem: { marginVertical: 10 },
  connectedText: { marginTop: 20, fontSize: 16, color: 'green' },
});

export default App;
