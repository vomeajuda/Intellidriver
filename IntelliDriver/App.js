import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  ScrollView,
} from "react-native";
import RNBluetoothClassic from "react-native-bluetooth-classic";
import { jsonToCSV } from "react-native-csv";
import RNFS from "react-native-fs";

const PID_COMMANDS = [
  { pid: "010C", label: "RPM" },
  { pid: "010D", label: "Speed" },
  { pid: "0105", label: "Coolant" },
  { pid: "012F", label: "Fuel" },
];

const App = () => {
  const [devices, setDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [logs, setLogs] = useState([]);

  // 📊 Estados para exibir na tela
  const [rpm, setRpm] = useState(null);
  const [speed, setSpeed] = useState(null);
  const [coolant, setCoolant] = useState(null);
  const [fuel, setFuel] = useState(null);
  const [dataLogs, setDataLogs] = useState([]);

  // 📦 Buffer em tempo real (sincronizado direto com respostas)
  const latestDataRef = useRef({ rpm: null, speed: null, coolant: null, fuel: null });

  const intervalRef = useRef(null);
  const subscriptionRef = useRef(null);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    requestPermissions();
    return () => disconnectFromDevice();
  }, []);

  const addLog = (msg) => {
    console.log(msg);
    setLogs((prev) => [...prev, msg]);
  };

  const requestPermissions = async () => {
    if (Platform.OS === "android" && Platform.Version >= 31) {
      try {
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);
        addLog("Permissions granted");
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
        delimiter: "\r",
      });

      if (connection) {
        setConnectedDevice(connection);
        setIsConnected(true);
        addLog(`Conectado a: ${device.name || device.address}`);

        subscriptionRef.current = connection.onDataReceived((event) => {
          const raw = String(event.data).trim();
          if (!raw) return;
          addLog(`Recebido cru: ${raw}`);

          if (raw.includes("NO DATA")) return;

          const parts = raw.split(" ").slice(2).map((h) => parseInt(h, 16));

          if (raw.startsWith("41 0C") && parts.length >= 2) {
            const val = ((parts[0] * 256 + parts[1]) / 4).toFixed(0);
            setRpm(val);
            latestDataRef.current.rpm = val;   // ✅ buffer
            addLog(`RPM: ${val}`);
          }
          if (raw.startsWith("41 0D") && parts.length >= 1) {
            const val = parts[0];
            setSpeed(val);
            latestDataRef.current.speed = val; // ✅ buffer
            addLog(`Speed: ${val}`);
          }
          if (raw.startsWith("41 05") && parts.length >= 1) {
            const val = parts[0] - 40;
            setCoolant(val);
            latestDataRef.current.coolant = val; // ✅ buffer
            addLog(`Coolant: ${val}`);
          }
          if (raw.startsWith("41 2F") && parts.length >= 1) {
            const val = ((100 / 255) * parts[0]).toFixed(1);
            setFuel(val);
            latestDataRef.current.fuel = val;  // ✅ buffer
            addLog(`Fuel: ${val}`);
          }
        });

        // Polling loop
        intervalRef.current = setInterval(async () => {
          try {
            if (!connection) return;

            const cmd = PID_COMMANDS[currentIndexRef.current];
            await connection.write(cmd.pid + "\r");
            addLog(`Enviado: ${cmd.pid}`);

            currentIndexRef.current =
              (currentIndexRef.current + 1) % PID_COMMANDS.length;

            // ✅ Quando termina o ciclo → salva snapshot
            if (currentIndexRef.current === 0) {
              const timestamp = new Date().toISOString();
              const { rpm, speed, coolant, fuel } = latestDataRef.current;

              if (rpm !== null || speed !== null || coolant !== null || fuel !== null) {
                setDataLogs([
                  ...dataLogs,
                  { 
                    "Time": timestamp, 
                    "RPM": rpm, 
                    "Speed": speed, 
                    "CoolantTemp": coolant, 
                    "FuelLevel": fuel 
                  },
                ]);
                addLog(`📊 Snapshot em ${timestamp}: RPM=${rpm}, Speed=${speed}, Coolant=${coolant}, Fuel=${fuel}`);
              } else {
                addLog("⏩ Snapshot ignorado (sem dados)");
              }

              // Limpar buffer para próximo ciclo
              latestDataRef.current = { rpm: null, speed: null, coolant: null, fuel: null };
            }
          } catch (err) {
            addLog(`Erro enviando comando: ${err}`);
          }
        }, 500);
      } else {
        addLog("Falha na conexão (retornou false)");
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
        addLog(
          `Desconectado de ${connectedDevice.name || connectedDevice.address}`
        );
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

  const saveCsv = async () => {
    try {
      const csv = jsonToCSV(dataLogs);

      const path = RNFS.DownloadDirectoryPath + "/obd_logs.csv";
      await RNFS.writeFile(path, csv, "utf8");
      addLog(`CSV salvo em: ${path}`);
    } catch (err) {
      addLog(`Erro salvando CSV: ${err}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OBD-II Debug</Text>
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
        ListEmptyComponent={<Text style={{ color: "gray" }}>Nada aq</Text>}
      />

      {isConnected && (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.connectedText}>
            🔗 Conectado a {connectedDevice?.name || connectedDevice?.address}
          </Text>
          <Button title="Desconectar" color="red" onPress={disconnectFromDevice} />
          <View style={{ marginTop: 10 }}>
            <Button title="Salvar CSV" onPress={saveCsv} />
          </View>
        </View>
      )}

      <View style={styles.dataBox}>
        {rpm !== null && <Text style={styles.dataText}>RPM: {rpm}</Text>}
        {speed !== null && <Text style={styles.dataText}>Velocidade: {speed} km/h</Text>}
        {coolant !== null && <Text style={styles.dataText}>Temp: {coolant} °C</Text>}
        {fuel !== null && <Text style={styles.dataText}>Combustível: {fuel}%</Text>}
      </View>

      <ScrollView style={styles.logBox}>
        {logs.slice(-20).map((log, idx) => (
          <Text key={idx} style={styles.logText}>
            {log}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#000" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20, color: "white" },
  item: { fontSize: 16, marginVertical: 5, color: "white" },
  deviceItem: { marginVertical: 10 },
  connectedText: { marginTop: 10, fontSize: 16, color: "green" },
  dataBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#111",
    borderRadius: 12,
  },
  dataText: { fontSize: 18, fontWeight: "bold", color: "cyan", marginVertical: 2 },
  logBox: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#111",
    borderRadius: 10,
    maxHeight: 200,
  },
  logText: { color: "#0f0", fontSize: 14, marginVertical: 2 },
});

export default App;