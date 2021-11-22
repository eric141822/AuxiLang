import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableHighlight,
  Alert,
} from "react-native";

import { Puzzles } from "../assets/puzzles/index";
class HangmanGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: "",
      hint: "",
      correct: 0,
      wrong: 0,
      usedLetters: [],
      lettersLeft: [],
      input: "",
      score: 0,
    };
    this.init = this.init.bind(this);
    this.puzzles = new Puzzles();
  }
  componentDidMount() {
    this.init();
  }
  static navigationOptions = {
    title: "Back",
  };
  init() {
    let puzzle = this.puzzles.getRandom();
    let answer = puzzle.word.replace(/[^a-zA-Z]/gim, " ").trim();
    let hint = puzzle.definition;
    let lettersLeft = Array(answer.length);
    for (let index = 0; index < answer.length; index++) {
      lettersLeft[index] = answer[index] == " " ? "*" : " ";
    }
    this.setState({
      answer: answer,
      hint: hint,
      correct: 0,
      wrong: 0,
      usedLetters: [],
      lettersLeft: lettersLeft,
      input: "",
    });
  }
  validate(usedLetters, letter) {
    usedLetters.push(letter);
    let correct = this.state.correct,
      wrong = this.state.wrong,
      answer = this.state.answer,
      lettersLeft = this.state.lettersLeft,
      score = this.state.score;
    if (answer.toUpperCase().indexOf(letter) == -1) {
      wrong++;
      if (score > 0) {
        score--;
      }
    } else {
      answer
        .toUpperCase()
        .split("")
        .map((value, index) => {
          if (value == letter) {
            lettersLeft[index] = letter;
            correct++;
            score++;
          }
        });
    }
    if (correct == answer.length) {
      Alert.alert(
        "You win",
        "You have gussed the correct answer",
        [{ text: "OK", onPress: () => this.init() }],
        { cancelable: false }
      );
    }

    this.setState({
      usedLetters: usedLetters,
      correct: correct,
      wrong: wrong,
      lettersLeft: lettersLeft,
      score: score,
    });
    if (wrong > 7) {
      this.init();
    }
  }
  render() {
    let rope = <View style={styles.rope} />;
    let head = <View style={styles.head} />;
    let body = <View style={styles.body} />;
    let Rhand = <View style={styles.Rhand} />;
    let Lhand = <View style={styles.Lhand} />;
    let Rleg = <View style={styles.Rleg} />;
    let Lleg = <View style={styles.Lleg} />;

    return (
      <View style={styles.container}>
        <View style={styles.hanger}>
          <View style={styles.rectangle1} />
          <View style={styles.rectangle2} />
          <View style={styles.rectangle3} />

          {this.state.wrong > 0 ? rope : null}
          {this.state.wrong > 1 ? head : null}
          {this.state.wrong > 2 ? body : null}
          {this.state.wrong > 3 ? Lhand : null}
          {this.state.wrong > 4 ? Rhand : null}
          {this.state.wrong > 5 ? Lleg : null}
          {this.state.wrong > 6 ? Rleg : null}
        </View>
        {this.renderDashes()}
        <View style={styles.hintContainer}>
          <Text style={styles.hintText}>Hint : {this.state.hint}</Text>
        </View>
        {this.renderKeyBoard()}
      </View>
    );
  }
  renderDashes() {
    return (
      <View style={styles.dashes}>
        {this.state.lettersLeft.map((letter, index) => {
          if (letter == "*") {
            return (
              <View style={styles.dashItemContainer} key={index}>
                <Text style={styles.dashBlankItem}> </Text>
              </View>
            );
          } else {
            return (
              <View style={styles.dashItemContainer} key={index}>
                <Text style={styles.dashItem}>{letter}</Text>
              </View>
            );
          }
        })}
      </View>
    );
  }
  onKeyPress(letter) {
    let usedLetters = this.state.usedLetters;
    if (usedLetters.indexOf(letter) == -1) {
      this.validate(usedLetters, letter);
    } else {
      return;
    }
  }
  renderKeyBoard() {
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
                } else if (this.state.usedLetters.indexOf(letter) != -1) {
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
                      onPress={this.onKeyPress.bind(this, letter)}
                      style={styles.keyItem}
                      key={index}
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
  }
}

const Hangman = () => {
  return <HangmanGame />;
};

export default Hangman;

const styles = StyleSheet.create({
  rope: {
    position: "absolute",
    top: 20,
    left: 50,
    width: 5,
    height: 40,
    backgroundColor: "#053544",
  },
  head: {
    position: "absolute",
    top: 60,
    left: 40,
    width: 25,
    height: 25,
    borderRadius: 25,
    backgroundColor: "#053544",
  },
  body: {
    position: "absolute",
    top: 80,
    left: 49,
    width: 5,
    height: 50,
    backgroundColor: "#053544",
  },
  Rhand: {
    position: "absolute",
    top: 80,
    left: 59,
    width: 5,
    height: 30,
    backgroundColor: "#053544",
    transform: [{ rotate: "45deg" }],
  },
  Lhand: {
    position: "absolute",
    top: 80,
    left: 40,
    width: 5,
    height: 30,
    backgroundColor: "#053544",
    transform: [{ rotate: "135deg" }],
  },
  Rleg: {
    position: "absolute",
    top: 120,
    left: 59,
    width: 5,
    height: 30,
    backgroundColor: "#053544",
    transform: [{ rotate: "135deg" }],
  },
  Lleg: {
    position: "absolute",
    top: 120,
    left: 39,
    width: 5,
    height: 30,
    backgroundColor: "#053544",
    transform: [{ rotate: "45deg" }],
  },
  rectangle1: {
    position: "absolute",
    top: 20,
    left: -50,
    width: 5,
    height: 150,
    backgroundColor: "#053544",
  },
  rectangle2: {
    position: "absolute",
    top: 20,
    left: -50,
    width: 100,
    height: 5,
    backgroundColor: "#053544",
  },
  rectangle3: {
    position: "absolute",
    top: 170,
    left: -100,
    width: 100,
    height: 5,
    backgroundColor: "#053544",
  },

  container: {
    flex: 1,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
  },
  hanger: {
    flex: 2,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
  homeContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  gameTitleView: {
    flexDirection: "row",
  },
  gameTitle: {
    fontSize: 35,
    borderBottomWidth: 1,
    margin: 10,
  },
  keyboard: {
    flex: 2,
    backgroundColor: "#fff",
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
  startGameBtn: {
    color: "#841584",
    fontSize: 25,
    margin: 10,
  },
  dashInputStyle: {
    height: 40,
  },
  dashes: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "auto",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  dashItemContainer: {
    flex: 0,
    padding: 5,
    margin: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  dashItem: {
    width: 20,
    color: "#841584",
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  dashBlankItem: {
    width: 20,
    fontSize: 20,
  },
  hintContainer: {
    flexWrap: "wrap",
    alignItems: "flex-start",
    padding: 10,
    backgroundColor: "lightgrey",
  },
  hintText: {
    fontSize: 18,
    fontWeight: "500",
  },
  scoreText: {
    fontSize: 13,
    textAlign: "right",
    fontWeight: "500",
    justifyContent: "flex-end",
    width: "100%",
  },
});