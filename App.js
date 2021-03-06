import React, { useState, useEffect, useMemo } from "react";
import { StyleSheet, View, Alert, ActivityIndicator } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import wordList from "./assets/words/intro_vocab.json";

import Acquisition from "./components/Acquisition";
import Homescreen from "./components/Homescreen";
import Dictionary from "./components/Dictionary";
import GamePicture from "./components/GamePicture";
import GameText from "./components/GameText";
import Hangman from "./components/Hangman";
import RootStack from "./components/RootStack";
import DrawerContent from "./components/DrawerContent";

import { AuthContext } from "./util/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Drawer = createDrawerNavigator();
export default function App() {
  const [storeErrors, setStoreErrors] = useState(true);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "LOGIN":
        return {
          ...prevState,
          isLoading: false,
          userName: action.id,
          userToken: action.token,
        };
      case "LOGOUT":
        return {
          ...prevState,
          isLoading: false,
          userName: null,
          userToken: null,
        };
      case "RETRIEVE_TOKEN":
        return { ...prevState, isLoading: false, userToken: action.token };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  const authContext = useMemo(
    () => ({
      signIn: async (userName, password) => {
        let userToken = null;

        if (userName === "admin" && password === "admin") {
          try {
            userToken = "adminToken";
            await AsyncStorage.setItem("userToken", userToken);
          } catch (e) {
            console.log(e);
          }
        }
        dispatch({ type: "LOGIN", id: userName, token: userToken });
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem("userToken");
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGOUT" });
      },
    }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      let userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        // saving error
        console.log(e);
      }

      dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken !== null ? (
          <Drawer.Navigator
            drawerContent={(props) => <DrawerContent {...props} />}
          >
            <Drawer.Screen name="Home">
              {(props) => (
                <Homescreen
                  {...props}
                  wordList={wordList}
                  isStore={storeErrors}
                  setStore={setStore}
                />
              )}
            </Drawer.Screen>
            <Drawer.Screen name="Acquisition">
              {(props) => (
                <Acquisition
                  {...props}
                  wordList={wordList}
                  isStore={storeErrors}
                />
              )}
            </Drawer.Screen>
            <Drawer.Screen name="Dictionary">
              {(props) => (
                <Dictionary
                  {...props}
                  wordList={wordList}
                  isStore={storeErrors}
                />
              )}
            </Drawer.Screen>
            <Drawer.Screen name="Hangman">
              {(props) => (
                <Hangman {...props} wordList={wordList} isStore={storeErrors} />
              )}
            </Drawer.Screen>
            <Drawer.Screen name="Guess the Picture">
              {(props) => <GamePicture {...props} wordList={wordList} />}
            </Drawer.Screen>
            <Drawer.Screen name="Guess the Word">
              {(props) => <GameText {...props} wordList={wordList} />}
            </Drawer.Screen>
          </Drawer.Navigator>
        ) : (
          <RootStack />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
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
