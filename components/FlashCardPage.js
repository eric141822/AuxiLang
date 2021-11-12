import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Button,
} from "react-native";

import Flashcard from "./Flashcard";
const FlashCardPage = ({ wordList }) => {
  const [index, setIndex] = useState(0);
  const [flip, setFlip] = useState(false);
  const lastCard = () => {
    setFlip(false);
    setIndex(index - 1);
  };
  const nextCard = () => {
    setFlip(false);
    setIndex(index + 1);
  };
  return (
    <View styles={styles.container}>
      <View style={styles.cardBox}>
        <Flashcard
          word={wordList[index].word}
          definition={wordList[index].definition}
          flip={flip}
        />
        <Button
          title="Flip"
          onPress={() => {
            setFlip(!flip);
          }}
        />
      </View>
      <View>
        {index > 0 && <Button title="Last card" onPress={lastCard} />}
        {index < wordList.length - 1 && (
          <Button title="Next card" onPress={nextCard} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
  },
  cardBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
});
export default FlashCardPage;
