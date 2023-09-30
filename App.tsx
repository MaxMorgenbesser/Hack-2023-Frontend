import Store from "./src/redux/Store";
import { Provider } from "react-redux";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <Provider store={Store}>
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
