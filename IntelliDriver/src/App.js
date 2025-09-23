import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import DeviceList from "./components/DeviceList";
import DataDisplay from "./components/DataDisplay";
import LogConsole from "./components/LogConsole";
import { listPairedDevices } from "./services/bluetoothService";
import { saveCsv } from "./services/csvService";
import { useBluetooth } from "./hooks/useBluetooth";

const App = () => {
  const { data, logs, dataLogs, isConnected, device, connect, disconnectNow, addLog } = useBluetooth();
  const [devices, setDevices] = useState([]);

  const loadDevices = async () => {
    const paired = await listPairedDevices();
    setDevices(paired);
    addLog(`Encontrados ${paired.length} dispositivos`);
  };

  const handleSave = async () => {
    try {
      const path = await saveCsv(dataLogs);
      addLog(`CSV salvo em: ${path}`);
      disconnectNow();
    } catch (err) {
      addLog(`Erro salvando CSV: ${err}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OBD-II Debug</Text>

      <Button title="List Paired Devices" onPress={loadDevices} />
      <DeviceList devices={devices} onConnect={connect} />

      {isConnected && (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.connectedText}>
            🔗 Conectado a {device?.name || device?.address}
          </Text>
          <Button title="Encerrar" onPress={handleSave} />
        </View>
      )}

      <DataDisplay {...data} />
      <LogConsole logs={logs} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#000" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20, color: "white" },
  connectedText: { marginTop: 10, fontSize: 16, color: "green" },
});

export default App;