const connectToDevice = require('../connectToDevice');

describe('connectToDevice', () => {
  it('deve retornar erro de conexão quando tentar conexão', async () => {
    const fakeDevice = {
      name: 'Dispositivo Fake',
      connect: jest.fn().mockRejectedValue(new Error('Simulação de erro')),
    };

    const addLog = jest.fn();
    const setConnectedDevice = jest.fn();
    const setIsConnected = jest.fn();
    const setMessages = jest.fn();

    await connectToDevice(fakeDevice, {
      addLog,
      setConnectedDevice,
      setIsConnected,
      setMessages,
    });

    expect(addLog).toHaveBeenCalledWith('Tentando conectar a Dispositivo Fake...');
    expect(addLog).toHaveBeenCalledWith(expect.stringContaining('Erro de conexão:'));
  });
});
