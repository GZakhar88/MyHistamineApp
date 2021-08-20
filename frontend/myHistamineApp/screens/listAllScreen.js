import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  StatusBar,
  Alert,
} from "react-native";
import { getAllIngredient } from "../functions/getAllIngredient";
import ListItem from "../components/listItem";

export default function listAllScreen() {
  const [list, setList] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    getAllIngredient({ setList });
  }, [list]);

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
});
