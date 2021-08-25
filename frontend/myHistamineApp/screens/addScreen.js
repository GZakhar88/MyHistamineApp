import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { View } from "react-native";
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  Alert,
  FlatList,
  SafeAreaView,
} from "react-native";
import NumericInput from "react-native-numeric-input";
import ListItem from "../components/listItem";
const URL = "http://localhost:8080/ingredients";

export default function addScreen({ navigation }) {
  const [name, setName] = React.useState("");
  const [level, setLevel] = React.useState(0);
  const [newAddedItem, setNewAddedItem] = React.useState([]);
  const [selectedId, setSelectedId] = React.useState(null);

  useEffect(() => {}, [newAddedItem]);

  async function addIngredient({ name, level }) {
    let newItemData = {
      name: name,
      tolerancelevel: level,
    };
    try {
      let sendNewItem = await fetch(URL, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newItemData),
      });
      let newItemResponse = await sendNewItem.json();
      if (sendNewItem.status !== 200) {
        Alert.alert(`${newItemResponse.error}`);
      } else {
        Alert.alert(`You added a new item: ${newItemData.name}`);
        setNewAddedItem(newItemResponse);
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

  // Render the screen
  return (
    <SafeAreaView style={styles.container}>
      {newAddedItem.length !== 0 && (
        <FlatList
          data={newAddedItem}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
      )}
      <View style={styles.inputs}>
        <TextInput
          style={styles.textInput}
          placeholder="Name of the new ingredient"
          keyboardType="default"
          onChangeText={(text) => setName(text.toLocaleLowerCase())}
          value={name}
        />
        <Text style={styles.text}>
          Set the tolerance level of the new item:{" "}
        </Text>
        <NumericInput
          value={level}
          onChange={(value) => setLevel(value)}
          minValue={0}
          maxValue={3}
          totalWidth={240}
          totalHeight={50}
          iconSize={25}
          step={1}
          valueType="integer"
          textColor="#B0228C"
          iconStyle={{ color: "white" }}
          rightButtonBackgroundColor="#ed8674"
          leftButtonBackgroundColor="#b8e87d"
        />
        <Button
          style={styles.button}
          disabled={name === "" ? true : false}
          title="Add a new item"
          onPress={async () => {
            await addIngredient({ name, level });
            setName("");
          }}
        />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  textInput: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: "black",
    margin: 10,
    borderRadius: 10,
    padding: 10,
  },
  inputs: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  button: {
    marginTop: 25,
    borderStyle: "solid",
  },
});
