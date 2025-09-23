import RNBluetoothClassic from "react-native-bluetooth-classic";

export const listPairedDevices = async () => {
  return await RNBluetoothClassic.getBondedDevices();
};

export const connectToDevice = async (address) => {
  return await RNBluetoothClassic.connectToDevice(address, { delimiter: "\r" });
};

export const disconnect = async () => {
  return await RNBluetoothClassic.disconnect();
};