import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

const Homescreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Button
          style={styles.btn}
          title="Alphabet Acquisition"
          onPress={() => {
            navigation.navigate("Acquisition");
          }}
        />

        <Button
          style={styles.btn}
          title="Dictionary"
          onPress={() => {
            navigation.navigate("Dictionary");
          }}
        />
      </View>
      <View style={styles.row}>
        <Button
          style={styles.btn}
          title="Hang-man"
          onPress={() => {
            // navigation.navigate("Acquisition");
          }}
        />

        <Button
          style={styles.btn}
          title="Word Search"
          onPress={() => {
            // navigation.navigate("Dictionary");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  btn: {
    margin: 10,
    borderRadius: 10,
    width: 250,
    height: 200,
  },
});
export default Homescreen;
