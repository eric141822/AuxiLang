import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import wordList from "./assets/words/intro_vocab.json";

import Acquisition from "./components/Acquisition";
import Homescreen from "./components/Homescreen";
import Dictionary from "./components/Dictionary";

/* TODO:
    Add dictionary page. DONE
    Format Home screen.
*/

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home">
          {(props) => <Homescreen {...props} wordList={wordList} />}
        </Stack.Screen>
        <Stack.Screen name="Acquisition">
          {(props) => <Acquisition {...props} wordList={wordList} />}
        </Stack.Screen>
        <Stack.Screen name="Dictionary">
          {(props) => <Dictionary {...props} wordList={wordList} />}
        </Stack.Screen>
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
