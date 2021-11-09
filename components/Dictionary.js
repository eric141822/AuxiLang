import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { getAllWords, testPrint } from "../util/utils";
const Dictionary = () => {
  const [words, setWords] = useState(getAllWords());
  //   useEffect(() => {
  //     console.log(testPrint());
  //   });
  //TODO: Switch to flat list, and switch words to new 50000 words dict.
  return (
    <View>
      <ScrollView snapToInterval={25}>
        {words.map((word, idx) => {
          return (
            <View key={idx} style={styles.wordBox}>
              <Text>{word}</Text>
              <Text>Definition: None</Text>
            </View>
          );
        })}
      </ScrollView>
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
  wordBox: {
    backgroundColor: "lightblue",
    padding: 5,
    marginTop: 3,
    width: "100%",
    borderRadius: 5,
    borderStyle: "solid",
  },
});

export default Dictionary;
