import { useEffect, useRef, useState } from "react";
import { parseOBDResponse } from "../services/obdParser";
import { connectToDevice, disconnect } from "../services/bluetoothService";

const PID_COMMANDS = [
  { pid: "010C", label: "RPM" },
  { pid: "010D", label: "Speed" },
  { pid: "0105", label: "Coolant" },
  { pid: "012F", label: "Fuel" },
];

export const useBluetooth = () => {
  const [data, setData] = useState({ rpm: null, speed: null, coolant: null, fuel: null });
  const [logs, setLogs] = useState([]);
  const [dataLogs, setDataLogs] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [device, setDevice] = useState(null);

  const intervalRef = useRef(null);
  const subscriptionRef = useRef(null);
  const currentIndexRef = useRef(0);
  const latestDataRef = useRef({ rpm: null, speed: null, coolant: null, fuel: null });

  const addLog = (msg) => {
    console.log(msg);
    setLogs((prev) => [...prev, msg]);
  };

  const connect = async (target) => {
    try {
      const connection = await connectToDevice(target.address);
      setDevice(connection);
      setIsConnected(true);
      addLog(`Conectado a: ${target.name || target.address}`);

      subscriptionRef.current = connection.onDataReceived((event) => {
        const raw = String(event.data).trim();
        if (!raw || raw.includes("NO DATA")) return;

        const parsed = parseOBDResponse(raw);
        if (parsed) {
          setData((prev) => ({ ...prev, [parsed.type]: parsed.value }));
          latestDataRef.current[parsed.type] = parsed.value;
          addLog(`${parsed.type.toUpperCase()}: ${parsed.value}`);
        }
      });

      // Polling loop
      intervalRef.current = setInterval(async () => {
        if (!connection) return;

        const cmd = PID_COMMANDS[currentIndexRef.current];
        await connection.write(cmd.pid + "\r");
        addLog(`Enviado: ${cmd.pid}`);

        currentIndexRef.current = (currentIndexRef.current + 1) % PID_COMMANDS.length;

        // Snapshot once per cycle
        if (currentIndexRef.current === 0) {
          const timestamp = new Date().toISOString();
          const snapshot = { Time: timestamp, ...latestDataRef.current };

          if (Object.values(snapshot).some((v) => v !== null)) {
            setDataLogs((prev) => [...prev, snapshot]);
            addLog(`Snapshot em ${timestamp}: ${JSON.stringify(snapshot)}`);
          } else {
            addLog("Snapshot ignorado (sem dados)");
          }

          latestDataRef.current = { rpm: null, speed: null, coolant: null, fuel: null };
        }
      }, 500);
    } catch (err) {
      addLog(`Erro de conexão: ${err}`);
    }
  };

  const disconnectNow = async () => {
    try {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
        subscriptionRef.current = null;
      }
      if (isConnected && device) {
        await disconnect();
        addLog(`Desconectado de ${device.name || device.address}`);
      }
    } catch (err) {
      addLog(`Erro ao desconectar: ${err}`);
    } finally {
      setIsConnected(false);
      setDevice(null);
      setData({ rpm: null, speed: null, coolant: null, fuel: null });
    }
  };

  return { data, logs, dataLogs, isConnected, device, connect, disconnectNow, addLog };
};