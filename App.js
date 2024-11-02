import {NavigationContainer} from "@react-navigation/native";
import HomeIndex from "./pages/Home/Index";
import MedicinesIndex from "./pages/Medicines/Index";
import AppointmentsIndex from "./pages/Appointments/Index";
import IntroIndex from "./pages/Intro/Index";
import SettingsIndex from "./pages/Settings/Index";
import ChatIndex from "./pages/Chat/Index";
import RegisterIndex from "./pages/Register/Index";
import ProfileIndex from "./pages/Profile/Index";
import LocationTrackingIndex from "./pages/LocationTracking/Index";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {SafeAreaView} from "react-native-safe-area-context";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "./utils/i18n";
import { UserProvider } from "./utils/UserContext";
import { LocationService } from "./utils/LocationService";

export default function App() {
  const {t} = useTranslation();
  const Stack = createNativeStackNavigator();

  return (
    <UserProvider>
      <SafeAreaView style={{flex: 1}}>
        <I18nextProvider i18n={i18n}>
        <LocationService>
          <NavigationContainer>
            <Stack.Navigator initialRouteName={"IntroPage"} screenOptions={{ tabBarStyle: {display: "none"}}}>
              <Stack.Screen name={"IntroPage"} component={IntroIndex} options={{headerShown: false}} />
              <Stack.Screen name={"Register"} component={RegisterIndex} options={{headerShown: false}} />
                <Stack.Screen name={"Home"} component={HomeIndex} options={{headerShown: false, title: t("Home")}} />
                <Stack.Screen name={"Medicines"} component={MedicinesIndex} options={{title: t("Medicines")}} />
                <Stack.Screen name={"Appointments"} component={AppointmentsIndex} options={{title: t("Appointments")}} />
                <Stack.Screen name={"Chat"} component={ChatIndex} options={{title: t("Chat")}} />
                <Stack.Screen name={"Settings"} component={SettingsIndex} options={{title: t("Settings")}} />
                <Stack.Screen name={"Profile"} component={ProfileIndex} options={{title: t("Profile")}} />
                <Stack.Screen name={"LocationTracking"} component={LocationTrackingIndex} options={{title: t("Location Tracking")}} />
              </Stack.Navigator>
            </NavigationContainer>
          </LocationService>
        </I18nextProvider>
      </SafeAreaView>
    </UserProvider>
  );
}
