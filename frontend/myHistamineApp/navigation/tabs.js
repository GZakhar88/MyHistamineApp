import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";
import addScreen from "../screens/addScreen";
import listAllScreen from "../screens/listAllScreen";
import searchScreen from "../screens/searchScreen";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Add a new Item") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search";
          } else if (route.name === "All ingredient") {
            iconName = focused ? "list" : "list";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Add a new Item"
        component={addScreen}
        options={{ unmountOnBlur: true }}
      />
      <Tab.Screen name="Search" component={searchScreen} />
      <Tab.Screen
        name="All ingredient"
        component={listAllScreen}
        options={{ unmountOnBlur: true }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
