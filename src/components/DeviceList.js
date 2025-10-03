import { View, Text, TouchableOpacity, FlatList } from "react-native";

const DeviceList = ({ devices, onConnect }) => (
  <FlatList
    data={devices}
    keyExtractor={(item) => item.address}
    renderItem={({ item }) => (
      <View style={{ marginVertical: 10 }}>
        <Text style={{ color: "black" }}>{item.name || item.address}</Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#4CAF50',
            padding: 10,
            borderRadius: 5,
            marginTop: 5,
          }}
          onPress={() => onConnect(item)}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Conectar</Text>
        </TouchableOpacity>
      </View>
    )}
    ListEmptyComponent={<Text style={{ color: "gray" }}>Nada aq</Text>}
  />
);

export default DeviceList;