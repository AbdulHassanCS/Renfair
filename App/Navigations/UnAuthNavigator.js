import { View, Text } from "react-native";
import React from "react";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import OnBoarding from "../Screens/onBoarding/OnBoarding";

export default function UnAuthNavigator() {
  const isAndroid = true;
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        ...(isAndroid && TransitionPresets.ModalPresentationIOS),
      }}
    >
      <Stack.Screen
        name="onBoarding"
        options={{ headerShown: false }}
        component={OnBoarding}
      />
    </Stack.Navigator>
  );
}
