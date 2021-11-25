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
import {
  IconButton,
  Card,
  Button as PaperButton,
  Paragraph,
} from "react-native-paper";
import Modal from "react-native-modal";
import { LinearGradient } from "expo-linear-gradient";

import { getPictures } from "../util/utils";

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

const GamePicture = ({ navigation, wordList }) => {
  const [pics, setPics] = useState(getPictures());
  const [answer, setAnswer] = useState(getAnswerIdx());
  const [info, setInfo] = useState(false);
  const [score, setScore] = useState(0);

  const validate = (item) => {
    // console.log(item.word);
    if (item.word === pics[answer].word) {
      correctAns();
      setPics(getPictures());
      setAnswer(getAnswerIdx());
      setScore(score + 1);
    } else {
      wrongAns();
      setScore(score - 1);
      wordList = wordList.map((i) =>
        i.word.toLowerCase() === item.word.toLowerCase()
          ? { ...i, error: i.error++ }
          : i
      );
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <IconButton
            icon="information-outline"
            size={25}
            onPress={() => {
              setInfo(!info);
            }}
          />
        </View>
      ),
    });
  }, [info]);

  const renderInfoModal = function () {
    return (
      <View>
        <Modal
          isVisible={info}
          onBackdropPress={() => {
            setInfo(!info);
          }}
        >
          <Card>
            <Card.Title title="Info" />
            <Card.Content>
              <Paragraph>
                To win: Select the word that matches the given picture!
              </Paragraph>
            </Card.Content>
            <Card.Actions>
              <PaperButton
                onPress={() => {
                  setInfo(!info);
                }}
              >
                Cancel
              </PaperButton>
            </Card.Actions>
          </Card>
        </Modal>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: "100%",
        }}
        colors={["#F57F11", "#C92828"]}
      />
      <View style={{ marginTop: 30, alignItems: "center" }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Score: {score}</Text>
      </View>
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
            <Text style={styles.title} key={index}>
              {item.word.toUpperCase()}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
      {renderInfoModal()}
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
