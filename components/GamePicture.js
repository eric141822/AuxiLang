import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Button,
} from "react-native";
import {
  randomWord,
  questionAcq,
  getQuestionAcqIntro,
  getQuestionAcqHard,
} from "../util/utils";
import Modal from "react-native-modal";

/* 
    TODO: 
    presumebly unlimited lives for word acquisition as it's supposed to be the easiest game.
    Global js file in util folder for mode switching (keep track of error words or not).
    Switch word list and question to 50000 words data. (DONE)
    Maybe filter the word list to just include around 5000 entry level vocab?
*/
const GamePicture = () => {
  const [question, setQuestion] = useState(getQuestionAcqIntro());
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
      //   if (score >= global.acq_highscore) {
      //     global.acq_highscore = score;
      //   }
      //   console.log(global.acq_highscore);
    }
  };

  const nextQuestion = function () {
    setIsWin(false);
    // TODO: Modify JSON so that no repeating word would show up, global val to store high score.
    // setQuestion(questionAcq(randomWord()));
    setQuestion(getQuestionAcqIntro());
    setUsedLetters([]);
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
  
});

export default GamePicture;
