import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const Homescreen = ({ navigation }) => {
  return (
    <View>
      <Button
        title="Acq"
        onPress={() => {
          navigation.navigate("Acquisition");
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
