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
  Alert.alert("Wrong Answer", "The Answer is wrong", [
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel",
    },
    { text: "OK", onPress: () => console.log("OK Pressed") },
  ]);

  const correctAns = () =>
  Alert.alert("Correct Answer", "The Answer is Correct", [
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
      correctAns()
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
          marginTop: 60,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {pics[answer].word.toUpperCase()}
        </Text>
      </View>
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          marginLeft: 35,
          paddingBottom: 50,
        }}
        numColumns={2}
        data={pics}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              validate(item);
            }}
          >
            <Image source={item.src} key={index} style={styles.tinyLogo} />
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
    backgroundColor: "white",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 50,
    color: "black",
    fontSize: 50,
  },
  tinyLogo: {
    width: 150,
    height: 150,
    borderRadius: 20,
    margin: 10,
  },
});

export default GamePicture;
