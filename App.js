import {NavigationContainer} from "@react-navigation/native";
import HomeIndex from "./pages/Home/Index";
import MedicinesIndex from "./pages/Medicines/Index";
import AppointmentsIndex from "./pages/Appointments/Index";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {SafeAreaView} from "react-native-safe-area-context";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"Home"} screenOptions={{ tabBarStyle: {display: "none"}}}>
          <Stack.Screen name={"Home"} component={HomeIndex} options={{headerShown: false}} />
          <Stack.Screen name={"Medicines"} component={MedicinesIndex} />
          <Stack.Screen name={"Appointments"} component={AppointmentsIndex} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
