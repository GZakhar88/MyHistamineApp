import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import addScreen from "../screens/addScreen";
import editScreen from "../screens/editScreen";
import listAllScreen from "../screens/listAllScreen";
import searchScreen from "../screens/searchScreen";
const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Add" component={addScreen} />
      <Tab.Screen name="Edit" component={editScreen} />
      <Tab.Screen name="List All" component={listAllScreen} />
      <Tab.Screen name="Search" component={searchScreen} />
    </Tab.Navigator>
  );
}
