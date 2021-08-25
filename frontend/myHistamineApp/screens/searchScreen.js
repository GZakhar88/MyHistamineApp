import { StatusBar } from "expo-status-bar";
import React from "react";
import { useEffect } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  TextInput,
  Button,
  Alert,
  FlatList,
} from "react-native";
const URL = "http://localhost:8080/ingredients/";
import ListItem from "../components/listItem";

function isInTheList(list, input) {
  let result = false;
  if (list.length === 0) {
    return result;
  } else {
    list.forEach((elem) => {
      elem.id === input.id ? (result = true) : null;
    });
    return result;
  }
}

export default function searchScreen({ navigation }) {
  const [input, setInput] = React.useState("");
  const [result, setResult] = React.useState([]);
  const [selectedId, setSelectedId] = React.useState(null);

  async function getIngredient({ input, setResult }) {
    try {
      const fetchItem = await fetch(URL + input, {
        method: "GET",
        headers: { "Content-type": "application/json" },
      });
      const response = await fetchItem.json();
      if (fetchItem.status !== 200) {
        Alert.alert(`${response.error}`);
      } else if (isInTheList(result, response[0])) {
        Alert.alert("This item is already in the list");
      } else if (response.length === 0) {
        Alert.alert(`No item with this name: ${input}`);
      } else {
        setResult(result.concat(response));
      }
    } catch (error) {
      console.log(error);
    }
  }

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#3b606e" : "white";
    const color = item.id === selectedId ? "white" : "black";

    return (
      <ListItem
        item={item}
        onPress={() => {
          setSelectedId(item.id),
            Alert.alert(
              "You clicked on: ",
              `${item.id}, ${item.name}, ${item.tolerancelevel}`
            );
        }}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={styles.list}>
              {result.length !== 0 && (
                <FlatList
                  data={result}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                  extraData={selectedId}
                />
              )}
            </View>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.textInput}
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
                  getIngredient({ input, setResult });
                  setInput("");
                }}
              />
              <Button
                disabled={result.length !== 0 ? false : true}
                style={styles.button}
                title="Clear list"
                onPress={() => {
                  setResult([]);
                }}
              />
            </View>
            <StatusBar style="auto" />
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  inner: {
    flex: 1,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingBottom: 100,
  },
  list: {
    flex: 0.7,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "100%",
  },
  inputBox: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderTopColor: "gray",
    borderTopWidth: 0.5,
  },
  text: {
    margin: 10,
    fontSize: 20,
  },
  textInput: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
  },
});
