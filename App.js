import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Picture, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Acquisition from "./components/Acquisition";
import Homescreen from "./components/Homescreen";
import Dictionary from "./components/Dictionary";
import GamePicture from "./components/GamePicture";

/* TODO:
    Add dictionary page. DONE
    Format Home screen.
*/

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Homescreen} />
        <Stack.Screen name="Acquisition" component={Acquisition} />
        <Stack.Screen name="Dictionary" component={Dictionary} />
        <Stack.Screen name="GamePicture" component={GamePicture} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
