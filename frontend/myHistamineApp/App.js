import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Tabs from "./navigation/tabs";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {}
        <Tab.Screen name={"Home"} component={HomeScreen}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
    </View>
  );
}
function AddScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Add!</Text>
    </View>
  );
}
function ListScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>List!</Text>
    </View>
  );
}
function EditScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Edit!</Text>
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

/* 
<View style={styles.container}>
      <Text style={styles.text}>My Histamine App!</Text>
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
    </View> */
