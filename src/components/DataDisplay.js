import { View, Text } from "react-native";

const DataDisplay = ({ rpm, speed, coolant, fuel }) => (
  <View style={{ marginTop: 20, padding: 15, backgroundColor: "#111", borderRadius: 12 }}>
    {rpm !== null && <Text style={{ color: "cyan" }}>RPM: {rpm}</Text>}
    {speed !== null && <Text style={{ color: "cyan" }}>Velocidade: {speed} km/h</Text>}
    {coolant !== null && <Text style={{ color: "cyan" }}>Temp: {coolant} °C</Text>}
    {fuel !== null && <Text style={{ color: "cyan" }}>Combustível: {fuel}%</Text>}
  </View>
);

export default DataDisplay;