import { View, Text, Button, FlatList } from "react-native";

const DeviceList = ({ devices, onConnect }) => (
  <FlatList
    data={devices}
    keyExtractor={(item) => item.address}
    renderItem={({ item }) => (
      <View style={{ marginVertical: 10 }}>
        <Text style={{ color: "white" }}>{item.name || item.address}</Text>
        <Button title="Conectar" onPress={() => onConnect(item)} />
      </View>
    )}
    ListEmptyComponent={<Text style={{ color: "gray" }}>Nada aq</Text>}
  />
);

export default DeviceList;