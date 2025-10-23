import { View, Text } from "react-native";
import { colors } from '../constants/theme';

const DataDisplay = ({ rpm, speed, coolant, fuel, engineLoad, absoluteLoad, throttlePosition, fuelRate }) => (
  <View style={{ marginTop: 20, padding: 15, backgroundColor: colors.surface, borderRadius: 12 }}>
    {rpm !== null && <Text>RPM: {rpm}</Text>}
    {speed !== null && <Text>Velocidade: {speed} km/h</Text>}
    {coolant !== null && <Text>Temp: {coolant} °C</Text>}
    {fuel !== null && <Text>Combustível: {fuel}%</Text>}
    {engineLoad !== null && <Text>Carga do Motor: {engineLoad}%</Text>}
    {throttlePosition !== null && <Text>Posição do Acelerador: {throttlePosition}%</Text>}
    {fuelRate !== null && <Text>Taxa de Combustível: {fuelRate} L/h</Text>}
  </View>
);

export default DataDisplay;