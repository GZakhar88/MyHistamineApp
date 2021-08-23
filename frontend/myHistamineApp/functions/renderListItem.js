import React, { useEffect, useState } from "react";
import { StyleSheet, StatusBar, Alert } from "react-native";
import ListItem from "../components/listItem";

const renderListItem = ({ item, selectedId, setSelectedId }) => {
  const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
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

export default renderListItem;
