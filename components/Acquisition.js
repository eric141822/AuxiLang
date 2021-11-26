import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
} from "react-native";
import {
  randomWord,
  questionAcq,
  getQuestionAcqIntro,
  getQuestionAcqHard,
  getQuestionAcqIntroOnlyError,
} from "../util/utils";
import { Button } from "react-native-elements";
import {
  IconButton,
  Card,
  Button as PaperButton,
  Paragraph,
} from "react-native-paper";
import Modal from "react-native-modal";
import { LinearGradient } from "expo-linear-gradient";

const Acquisition = ({ wordList, navigation, isStore }) => {
  const [question, setQuestion] = isStore
    ? useState(getQuestionAcqIntro(wordList))
    : useState(getQuestionAcqIntroOnlyError(wordList));
  const [usedLetters, setUsedLetters] = useState([]);
  const [isWin, setIsWin] = useState(false);
  const [score, setScore] = useState(0);
  const [info, setInfo] = useState(false);
  useEffect(() => {
    // console.log(isStore);
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
                To win: Select the missing letter using the letters below.
              </Paragraph>
              <Paragraph>Incorrect letters will be grayed out.</Paragraph>
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
  const keyPress = function (letter) {
    setUsedLetters([letter, ...usedLetters]);
    if (letter === question.answer) {
      setQuestion({ ...question, q: [...question.word] });
      setScore(score + 1);
      setIsWin(true);
      //   if (score >= global.acq_highscore) {
      //     global.acq_highscore = score;
      //   }
      //   console.log(global.acq_highscore);
    }
  };

  const nextQuestion = function () {
    setIsWin(false);
    // setQuestion(questionAcq(randomWord()));
    if (isStore) {
      setQuestion(getQuestionAcqIntro(wordList));
    } else {
      setQuestion(getQuestionAcqIntroOnlyError(wordList));
    }
    setUsedLetters([]);
  };

  const renderModal = function () {
    return (
      <View>
        <Modal isVisible={isWin}>
          <View style={styles.winBox}>
            <Text style={styles.winText}>You got it!</Text>
            <Text style={{ marginBottom: 10 }}>
              The answer is {question.word.join("")}
            </Text>
            <Button
              title="Next Question"
              onPress={() => {
                nextQuestion();
              }}
            />
          </View>
        </Modal>
      </View>
    );
  };

  const renderKeyBoard = function () {
    const keysRows = [
      ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
      ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
      [" ", "Z", "X", "C", "V", "B", "N", "M", " "],
    ];
    return (
      <View style={styles.keyboard}>
        {keysRows.map((keys, rowIndex) => {
          return (
            <View key={rowIndex} style={styles.keyboardRow}>
              {keys.map((letter, index) => {
                if (letter == " ") {
                  return <Text key={index}> </Text>;
                } else if (usedLetters.indexOf(letter) != -1) {
                  return (
                    <View style={styles.keyItem} key={index}>
                      <Text key={index} style={styles.usedKey}>
                        {letter}
                      </Text>
                    </View>
                  );
                } else {
                  return (
                    <TouchableHighlight
                      style={styles.keyItem}
                      key={index}
                      onPress={() => {
                        keyPress(letter);
                      }}
                    >
                      <Text style={styles.letter}>{letter}</Text>
                    </TouchableHighlight>
                  );
                }
              })}
            </View>
          );
        })}
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
      {/* <ImageBackground
        source={require("../assets/Logos/Background.png")}
        style={{
          width: "100%",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
        resizeMode="cover"
      > */}
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontSize: 20 }}>Score: {score}</Text>
      </View>
      <View style={styles.hiddenWord}>
        {question.q.map((char, idx) => {
          return (
            <Text key={idx} style={styles.gameText}>
              {char}
            </Text>
          );
        })}
      </View>
      {renderModal()}
      {renderInfoModal()}
      <Text style={styles.hintText}>Hint: {question.hint}</Text>
      {renderKeyBoard()}
      {/* </ImageBackground> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  hiddenWord: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  gameText: {
    margin: 3,
    fontSize: 25,
  },
  keyboard: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
  },
  keyboardRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  keyItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    margin: 2,
  },
  usedKey: {
    color: "lightgrey",
    fontSize: 20,
    width: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  letter: {
    color: "black",
    fontSize: 20,
    width: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  winBox: {
    display: "flex",
    height: "auto",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#fff",
  },
  winText: {
    fontSize: 30,
    marginBottom: 15,
    fontWeight: "bold",
  },
  hintText: {
    fontStyle: "italic",
  },
});

export default Acquisition;
