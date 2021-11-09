import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Button,
} from "react-native";
import { randomWord, questionAcq } from "../util/utils";
/* 
    TODO: 
    Add onPress for keyboard to reflect guesses. DONE
    presumebly unlimited lives for word acquisition as it's supposed to be the easiest game.
    Global js file in util folder for mode switching (keep track of error words or not).
    
*/
const Acquisition = () => {
  const [question, setQuestion] = useState(questionAcq(randomWord()));
  const [usedLetters, setUsedLetters] = useState([]);
  const [isWin, setIsWin] = useState(false);
  const [score, setScore] = useState(0);
  useEffect(() => {
    // console.log(question);
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
    setQuestion(questionAcq(randomWord()));
    setUsedLetters([]);
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
      {isWin && <Text>You got it!</Text>}
      {isWin && (
        <Button
          title="Next Question"
          onPress={() => {
            nextQuestion();
          }}
        />
      )}
      <Text>Hint: {question.hint}</Text>
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
    color: "grey",
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
});

export default Acquisition;
