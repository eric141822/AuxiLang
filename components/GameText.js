import React, { useEffect, useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Button,
  Image,
  FlatList,
  Alert,
  SafeAreaView,
} from "react-native";

import { ActivityIndicator } from "react-native-paper";
import titles from "../assets/data/picture_list.json";
import { getPictures } from "../util/utils";

const wordList = require("../assets/data/picture_list.json");

const wrongAns = () =>
  Alert.alert("Wrong Answer", "Please try again!", [
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel",
    },
    { text: "OK", onPress: () => console.log("OK Pressed") },
  ]);

const correctAns = () =>
  Alert.alert("Correct Answer", "Nice job!", [
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel",
    },
    { text: "OK", onPress: () => console.log("OK Pressed") },
  ]);

const getAnswerIdx = () => {
  return (Math.random() * 4) | 0;
};

const GamePicture = () => {
  const [pics, setPics] = useState(getPictures());
  const [answer, setAnswer] = useState(getAnswerIdx());

  const validate = (item) => {
    // console.log(item.word);
    if (item.word === pics[answer].word) {
      correctAns();
      console.log("Correct!");
      setPics(getPictures());
      setAnswer(getAnswerIdx());
    } else {
      wrongAns();
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 50,
        }}
      >
        <Image source={pics[answer].src} style={styles.tinyLogo}></Image>
      </View>
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 30,
        }}
        numColumns={1}
        data={pics}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              validate(item);
            }}
          >
              <Text style={styles.title} key={index} >{item.word.toUpperCase()}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
  },
  title: {
    fontWeight: "bold",
    color: "black",
    fontSize: 25,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#20232a",
    borderRadius: 5,
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginTop: 10,
    width: 280,
  },
  tinyLogo: {
    width: 250,
    height: 200,
    borderRadius: 10,
    margin: 10,
    resizeMode: "stretch",
  },
});

export default GamePicture;
