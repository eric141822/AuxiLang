import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Alert, Picture } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import wordList from "./assets/words/intro_vocab.json";

import Acquisition from "./components/Acquisition";
import Homescreen from "./components/Homescreen";
import Dictionary from "./components/Dictionary";
import GamePicture from "./components/GamePicture";
import Hangman from "./components/Hangman";
/* TODO:
    Add dictionary page. DONE
    Format Home screen.
*/

const Stack = createNativeStackNavigator();

export default function App() {
  const [storeErrors, setStoreErrors] = useState(true);
  const setStore = () => {
    let errorOnly = wordList.filter((item) => item.error > 0);
    if (errorOnly.length > 0) {
      setStoreErrors(!storeErrors);
    } else {
      Alert.alert("Error", "You have not made a mistake on any words yet.", [
        { text: "Cancel" },
      ]);
    }
  };
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home">
          {(props) => (
            <Homescreen
              {...props}
              wordList={wordList}
              isStore={storeErrors}
              setStore={setStore}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Acquisition">
          {(props) => (
            <Acquisition {...props} wordList={wordList} isStore={storeErrors} />
          )}
        </Stack.Screen>
        <Stack.Screen name="Dictionary">
          {(props) => (
            <Dictionary {...props} wordList={wordList} isStore={storeErrors} />
          )}
        </Stack.Screen>
        <Stack.Screen name="Hangman">
          {(props) => (
            <Hangman {...props} wordList={wordList} isStore={storeErrors} />
          )}
        </Stack.Screen>
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
