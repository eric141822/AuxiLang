import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";

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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        {index > 0 && (
          <Button
            buttonStyle={styles.btn}
            title="Last Card"
            onPress={lastCard}
          />
        )}
        {index < wordList.length - 1 && (
          <Button
            buttonStyle={styles.btn}
            title="Next Card"
            onPress={nextCard}
          />
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
  btn: {
    margin: 10,
  },
});
export default FlashCardPage;
