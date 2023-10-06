import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const Loading = ({ message }: { message: string }) => {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.message}>{message}</Text>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    fontSize: 16,
    marginBottom: 12,
  },
});
