import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Button,
} from "react-native";
import { randomWord, questionAcq, getQuestionAcq } from "../util/utils";
import Modal from "react-native-modal";

/* 
    TODO: 
    presumebly unlimited lives for word acquisition as it's supposed to be the easiest game.
    Global js file in util folder for mode switching (keep track of error words or not).
    Switch word list and question to 50000 words data. (DONE)
    Maybe filter the word list to just include around 5000 entry level vocab?
*/
const Acquisition = () => {
  const [question, setQuestion] = useState(getQuestionAcq());
  const [usedLetters, setUsedLetters] = useState([]);
  const [isWin, setIsWin] = useState(false);
  const [score, setScore] = useState(0);
  //   const [q, setQ] = useState(getQuestionAcq());
  useEffect(() => {
    //   console.log(q);
    console.log(question);
  });

  const keyPress = function (letter) {
    setUsedLetters([letter, ...usedLetters]);
    if (letter === question.answer) {
      setQuestion({ ...question, q: [...question.word] });
      setScore(score + 1);
      setIsWin(true);
      if (score >= global.acq_highscore) {
        global.acq_highscore = score;
      }
      console.log(global.acq_highscore);
      // TODO: Pop-up win window or win text, add score, show "Next Question Button" and on click, reset question.;
    }
  };

  const nextQuestion = function () {
    setIsWin(false);
    // TODO: Modify JSON so that no repeating word would show up, global val to store high score.
    // setQuestion(questionAcq(randomWord()));
    setQuestion(getQuestionAcq());
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
      <Text>Score: {score}</Text>
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
      <Text style={styles.hintText}>Hint: {question.hint}</Text>
      {renderKeyBoard()}
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
