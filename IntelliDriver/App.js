import React, { useEffect, useState, useRef } from 'react';
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
import RNFS from 'react-native-fs';

const PIDS = [
  { cmd: '010C', name: 'RPM' },
  { cmd: '010D', name: 'Speed' },
  { cmd: '0105', name: 'CoolantTemp' },
  { cmd: '012F', name: 'FuelLevel' },
];

const App = () => {
  const [devices, setDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [logs, setLogs] = useState([]);
  const [rpm, setRpm] = useState(null);
  const [speed, setSpeed] = useState(null);
  const [coolant, setCoolant] = useState(null);
  const [fuel, setFuel] = useState(null);
  const [dataLogs, setDataLogs] = useState([]); // 📊 histórico com colunas fixas

  const intervalRef = useRef(null);
  const subscriptionRef = useRef(null);
  const pidIndexRef = useRef(0);
  const lastCommandRef = useRef(null);

  useEffect(() => {
    requestPermissions();
    return () => {
      disconnectFromDevice();
    };
  }, []);

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

        subscriptionRef.current = connection.onDataReceived((event) => {
          const msg = String(event.data).trim();
          if (!msg) return;

          // ignora eco
          if (lastCommandRef.current && msg.includes(lastCommandRef.current)) {
            return;
          }

          addLog(`Mensagem recebida: ${msg}`);
          setMessages((prev) => [...prev, msg]);

          if (msg.startsWith("41")) {
            const parts = msg.split(" ").map(p => p.trim());
            if (parts.length >= 3) {
              const pid = parts[1];
              const A = parseInt(parts[2], 16);
              const B = parts[3] ? parseInt(parts[3], 16) : 0;

              let rpmValue = rpm;
              let speedValue = speed;
              let tempValue = coolant;
              let fuelValue = fuel;

              if (pid === "0C" && parts.length >= 4) {
                rpmValue = ((A * 256) + B) / 4;
                setRpm(rpmValue);
                addLog(`RPM calculado: ${rpmValue}`);
              }
              if (pid === "0D") {
                speedValue = A;
                setSpeed(speedValue);
                addLog(`Velocidade calculada: ${speedValue}`);
              }
              if (pid === "05") {
                tempValue = A - 40;
                setCoolant(tempValue);
                addLog(`Temp. calculada: ${tempValue}`);
              }
              if (pid === "2F") {
                fuelValue = (A * 100) / 255;
                setFuel(fuelValue);
                addLog(`Nível combustível: ${fuelValue}%`);
              }

              // salva snapshot no histórico
              const timestamp = new Date().toISOString();
              setDataLogs(prev => [
                ...prev,
                {
                  time: timestamp,
                  rpm: rpmValue ?? "",
                  speed: speedValue ?? "",
                  coolant: tempValue ?? "",
                  fuel: fuelValue ?? "",
                }
              ]);
            }
          }
        });

        // envia comandos em loop (um a cada 700ms)
        intervalRef.current = setInterval(async () => {
          try {
            const pid = PIDS[pidIndexRef.current];
            const cmd = pid.cmd + "\r";

            lastCommandRef.current = pid.cmd;
            await connection.write(cmd);
            addLog(`Enviado comando: ${pid.cmd}`);

            pidIndexRef.current = (pidIndexRef.current + 1) % PIDS.length;
          } catch (err) {
            addLog(`Erro enviando comando: ${err}`);
          }
        }, 700);

      } else {
        addLog('Falha na conexão (retornou false)');
      }
    } catch (err) {
      addLog(`Erro de conexão: ${err}`);
    }
  };

  const disconnectFromDevice = async () => {
    try {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
        subscriptionRef.current = null;
      }
      if (isConnected && connectedDevice) {
        await RNBluetoothClassic.disconnect();
        addLog(`Desconectado de ${connectedDevice.name || connectedDevice.address}`);
      }
    } catch (err) {
      addLog(`Erro ao desconectar: ${err}`);
    } finally {
      setIsConnected(false);
      setConnectedDevice(null);
      setRpm(null);
      setSpeed(null);
      setCoolant(null);
      setFuel(null);
    }
  };

  // 📂 salvar CSV
  const saveCsv = async () => {
    try {
      let csv = "Time,RPM,Speed,CoolantTemp,FuelLevel\n";
      dataLogs.forEach(item => {
        csv += `${item.time},${item.rpm},${item.speed},${item.coolant},${item.fuel}\n`;
      });

      const path = RNFS.DownloadDirectoryPath + "/obd_logs.csv";
      await RNFS.writeFile(path, csv, "utf8");
      addLog(`CSV salvo em: ${path}`);
    } catch (err) {
      addLog(`Erro salvando CSV: ${err}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bluetooth OBD-II Debug</Text>
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
        ListEmptyComponent={<Text style={{ color: 'gray' }}>Nada aq</Text>}
      />

      {isConnected && connectedDevice && (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.connectedText}>
            🔗 Connected to: {connectedDevice.name || connectedDevice.address}
          </Text>
          <Button title="Desconectar" color="red" onPress={disconnectFromDevice} />
          <View style={{ marginTop: 10 }}>
            <Button title="Salvar CSV" onPress={saveCsv} />
          </View>
        </View>
      )}

      <View style={styles.dataBox}>
        {rpm !== null && <Text style={styles.dataText}>RPM: {rpm.toFixed(0)}</Text>}
        {speed !== null && <Text style={styles.dataText}>Velocidade: {speed} km/h</Text>}
        {coolant !== null && <Text style={styles.dataText}>Temp: {coolant} °C</Text>}
        {fuel !== null && <Text style={styles.dataText}>Combustível: {fuel.toFixed(1)}%</Text>}
      </View>

      <ScrollView style={styles.logBox}>
        {logs.slice(-20).map((log, idx) => (
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
  connectedText: { marginTop: 10, fontSize: 16, color: 'green' },
  dataBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#111',
    borderRadius: 12,
  },
  dataText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'cyan',
    marginBottom: 5,
  },
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