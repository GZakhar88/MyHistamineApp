import React from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";

function Ingredient({ props }) {
  return (
    <View style={styles.resultContainer}>
      {props !== undefined ? (
        <View>
          <Text>ID: {props.id}</Text>
          <Text>NAME: {props.name}</Text>
          <Text>LEVEL: {props.tolerancelevel}</Text>
        </View>
      ) : (
        <Text> Not found this ingredient! </Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    margin: 10,
    fontSize: 20,
  },
  resultContainer: {
    backgroundColor: "green",
    width: 350,
    height: 100,
  },
});

export default Ingredient;
