import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Drawer } from "react-native-paper";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { CommonActions } from "@react-navigation/native";

import { AuthContext } from "../util/context";
const DrawerContent = ({ navigation }) => {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...navigation}>
        <View style={styles.drawerContent}>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              label="Home"
              icon={({ color, size }) => (
                <Ionicons color={color} size={size} name="home-outline" />
              )}
              onPress={() => {
                navigation.navigate("Home");
              }}
            />
            <DrawerItem
              label="Dictionary"
              icon={({ color, size }) => (
                <Ionicons color={color} size={size} name="book" />
              )}
              onPress={() => {
                navigation.navigate("Dictionary");
              }}
            />
          </Drawer.Section>
        </View>
        <View style={styles.drawerContent}>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              label="Acquisition"
              onPress={() => {
                navigation.dispatch(
                  CommonActions.reset({
                    routes: [{ name: "Acquisition" }],
                  })
                );
              }}
            />
            <DrawerItem
              label="Hangman"
              onPress={() => {
                navigation.dispatch(
                  CommonActions.reset({
                    routes: [{ name: "Hangman" }],
                  })
                );
              }}
            />
            <DrawerItem
              label="Guess the Picture"
              onPress={() => {
                navigation.dispatch(
                  CommonActions.reset({
                    routes: [{ name: "GamePicture" }],
                  })
                );
              }}
            />
            <DrawerItem
              label="Guess the Word"
              onPress={() => {
                navigation.dispatch(
                  CommonActions.reset({
                    routes: [{ name: "GameText" }],
                  })
                );
              }}
            />
          </Drawer.Section>
        </View>
        <View style={styles.drawerContent}>
          <Drawer.Section
            style={{ ...styles.drawerSection, alignItems: "center" }}
          >
            <Image
              source={require("../assets/Logos/Mascot2.png")}
              style={{ width: 200, height: 200 }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          label="Sign Out"
          icon={({ color, size }) => (
            <FontAwesome name="sign-out" size={size} color={color} />
          )}
          onPress={() => {
            signOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
});
