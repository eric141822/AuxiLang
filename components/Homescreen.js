import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
const Homescreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Alphabet Acquisition"
        onPress={() => {
          navigation.navigate("Acquisition");
        }}
      />
      <Text>Highscore: {global.acq_highscore}</Text>
      <Button
        title="Dictionary"
        onPress={() => {
          navigation.navigate("Dictionary");
        }}
      />
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
});
export default Homescreen;
