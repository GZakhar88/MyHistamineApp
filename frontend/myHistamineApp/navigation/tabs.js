import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";
import addScreen from "../screens/addScreen";
import editScreen from "../screens/editScreen";
import listAllScreen from "../screens/listAllScreen";
import searchScreen from "../screens/searchScreen";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#34eba8",
      }}
    >
      <Tab.Screen name="Add" component={addScreen} />
      {/*  <Tab.Screen name="Edit" component={editScreen} /> */}
      <Tab.Screen name="Search" component={searchScreen} />
      <Tab.Screen name="All ingredient" component={listAllScreen} />
    </Tab.Navigator>
  );
};

export default Tabs;
