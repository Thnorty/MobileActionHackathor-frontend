import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";
import HomeIndex from "./pages/Home/Index";

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ tabBarStyle: {display: "none"}}}>
        <Tab.Screen name="Home" component={HomeIndex} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
