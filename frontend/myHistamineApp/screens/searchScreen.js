import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
const URL = "http://localhost:8080/ingredients/";
import Ingredient from "../Ingredient";

export default function searchScreen({ navigation }) {
  const [input, setInput] = React.useState("");
  const [result, setResult] = React.useState({});

  async function getIngredient(input) {
    try {
      const fetchItem = await fetch(URL + input, {
        method: "GET",
        headers: { "Content-type": "application/json" },
      });
      const response = await fetchItem.json();
      response === undefined ? setResult(undefined) : setResult(response[0]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Search an Item!</Text>
      <Ingredient props={result} />
      <TextInput
        style={styles.input}
        placeholder="What are you looking for?"
        keyboardType="default"
        onChangeText={(text) => setInput(text.toLocaleLowerCase())}
        value={input}
      />
      <Button
        disabled={input !== "" ? false : true}
        style={styles.button}
        title="Search"
        onPress={() => {
          getIngredient(input);
          Alert.alert(`You just search about ${input}`);
          setInput("");
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
  input: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: "black",
    margin: 10,
    borderRadius: 10,
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  resultContainer: {
    backgroundColor: "green",
    width: 350,
    height: 100,
  },
});
