import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Button,
} from "react-native";
import picture_name from "../assets/data/picture_list.json";

const GameText= ({ navigation }) => {
    const picName = ({ picName }) => {
        return (
          <View style={styles.wordBox}>
            <Text>Lion</Text>
          </View>
        );
      };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      },
    wordBox: {
        backgroundColor: "lightblue",
        padding: 5,
        marginTop: 3,
        width: "100%",
        borderRadius: 5,
        borderStyle: "solid",
    }
 });

 export default GameText;