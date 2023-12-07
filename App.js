import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import TabNavigation from "./App/Navigations/TabNavigation";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";
import Colors from "./App/Shared/Colors";
import { ActivityIndicator } from "react-native";
import store from "./state-management/store";
import { LogBox } from "react-native";
import UnAuthNavigator from "./App/Navigations/UnAuthNavigator";
import { firebaseConfig } from "./state-management/actions/env";

import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function App() {
  LogBox.ignoreAllLogs();
  const [status, setStatus] = useState(0);
  const [fontsLoaded] = useFonts({
    raleway: require("./assets/Fonts/Raleway-Regular.ttf"),
  });

  useEffect(() => {
    try {
      (async () => {
        // Initialize Firebase
        if (!firebase.apps.length) {
          const a = firebase.initializeApp(firebaseConfig);
          const auth = initializeAuth(a, {
            persistence: getReactNativePersistence(AsyncStorage),
          });
          const db = getFirestore(a);
          const storage = getStorage(a);
          onAuthStateChanged(auth, (user) => {
            if (user) {
              setStatus(1);
            } else {
              setStatus(0);
            }
          });
        }
      })();
    } catch (e) {
      console.log(e.message);
    }
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Provider store={store}>
        <NavigationContainer>
          {status == 0 ? <UnAuthNavigator /> : <TabNavigation />}
        </NavigationContainer>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
});
