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
  const lastCard = () => {
    setIndex(index - 1);
  };
  const nextCard = () => {
    setIndex(index + 1);
  };
  console.log(wordList);
  return (
    <View>
      <View>
        <Flashcard
          word={wordList[index].word}
          definition={wordList[index].definition}
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

export default FlashCardPage;
