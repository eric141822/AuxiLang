import React from "react";
import { View, StyleSheet } from "react-native";
import { Drawer } from "react-native-paper";
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
              onPress={() => {
                navigation.navigate("Home");
              }}
            />
            <DrawerItem
              label="Dictionary"
              onPress={() => {
                navigation.navigate("Dictionary");
              }}
            />
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
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          label="Sign Out"
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
