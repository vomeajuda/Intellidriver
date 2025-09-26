import { View, Text } from "react-native";
import { colors } from '../constants/theme';

const DataDisplay = ({ rpm, speed, coolant, fuel }) => (
  <View style={{ marginTop: 20, padding: 15, backgroundColor: colors.surface, borderRadius: 12 }}>
    {rpm !== null && <Text>RPM: {rpm}</Text>}
    {speed !== null && <Text>Velocidade: {speed} km/h</Text>}
    {coolant !== null && <Text>Temp: {coolant} °C</Text>}
    {fuel !== null && <Text>Combustível: {fuel}%</Text>}
  </View>
);

export default DataDisplay;