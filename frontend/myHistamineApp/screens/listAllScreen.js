import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";

export default function listAllScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>List All Item screen</Text>
      <Button
        style={styles.button}
        title="Click Me"
        onPress={() => {
          Alert.alert(`Button clicked`);
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    margin: 10,
    fontSize: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
