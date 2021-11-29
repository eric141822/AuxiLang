import React, { useEffect, useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import {
  IconButton,
  Card,
  Button as PaperButton,
  Paragraph,
} from "react-native-paper";
import Modal from "react-native-modal";
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
      console.log("Correct!");
      setPics(getPictures());
      setAnswer(getAnswerIdx());
      setScore(score + 1);
    } else {
      wrongAns();
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
            <Card.Title title="Auxi's Tips:" />
            <Card.Content>
              <Paragraph>
                To win: Select the picture that matches the given word!
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
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Image
              source={require("../assets/Logos/Mascot1.png")}
              style={{ width: 200, height: 200 }}
            />
          </View>
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
          marginTop: 60,
        }}
      >
        <Text style={styles.title}>{pics[answer].word.toUpperCase()}</Text>
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
    textAlign: "center",
    fontWeight: "bold",
    color: "black",
    fontSize: 30,
    marginTop: 15,
  },
  tinyLogo: {
    width: 150,
    height: 150,
    borderRadius: 20,
    margin: 10,
    resizeMode: "stretch",
  },
});

export default GamePicture;
