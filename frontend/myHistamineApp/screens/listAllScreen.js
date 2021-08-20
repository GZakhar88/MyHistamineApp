import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";

async function getAllIngredient({ setList }) {
  try {
    const fetchItem = await fetch("http://localhost:8080/ingredients/all", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const response = await fetchItem.json();
    setList(response);
  } catch (error) {
    console.log(error);
  }
}

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.name}</Text>
    <Text style={[styles.title, textColor]}>{item.tolerancelevel}</Text>
  </TouchableOpacity>
);
export default function listAllScreen() {
  const [list, setList] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    getAllIngredient({ setList });
  }, [list]);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? "white" : "black";

    return (
      <Item
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
    <SafeAreaView style={styles.container}>
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
