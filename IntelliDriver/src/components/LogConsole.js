import { ScrollView, Text } from "react-native";

const LogConsole = ({ logs }) => (
  <ScrollView style={{ marginTop: 20, padding: 10, backgroundColor: "#111", borderRadius: 10, maxHeight: 200 }}>
    {logs.slice(-20).map((log, idx) => (
      <Text key={idx} style={{ color: "#0f0", fontSize: 14, marginVertical: 2 }}>
        {log}
      </Text>
    ))}
  </ScrollView>
);

export default LogConsole;