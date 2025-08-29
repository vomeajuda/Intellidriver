const connectToDevice = async (
    device,
    { addLog, setConnectedDevice, setIsConnected, setMessages }
  ) => {
    try {
      addLog(`Tentando conectar a ${device.name || device.address}...`);
  
      const success = await device.connect();
      if (success) {
        setConnectedDevice(device);
        setIsConnected(true);
        addLog(`Conectado a: ${device.name || device.address}`);
  
        await device.write('010C\r');
        addLog('Enviado comando: 010C');
  
        const response = await device.readFromDevice();
        addLog(`⬅Resposta OBD: ${response}`);
        setMessages((prev) => [...prev, response]);
      } else {
        addLog('Falha na conexão (retornou false)');
      }
    } catch (err) {
      addLog(`Erro de conexão: ${err}`);
    }
  };
  
  module.exports = connectToDevice;
  