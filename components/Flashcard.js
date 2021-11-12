import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Button,
} from "react-native";
import { Card, Title } from "react-native-paper";

/* TODO: 
    1. Develop UI for flashcard. (DONE)
    2. Create another JS compoment for all flash cards. The screen contains two buttons bottom left and bottom right.
        "Last card" and "Next card". (DONE)
    3. In Dictionary.js, create checkboxes for each word to enable selection, push checked word objects with definition
       into an array, pass the array as a prop to the page in mentioned in 2., and for each word, load this current flashcard component. (DONE)
    4. Implement a GOTO flashcards Button in dictionary.js, perhaps at top right. (UI design will be decided later). (DONE)
    
*/

const Flashcard = ({ word, definition, flip }) => {
  const renderWordCard = () => {
    return (
      <Card style={styles.card}>
        <Card.Content>
          <Title>{flip ? word : definition}</Title>
        </Card.Content>
      </Card>
    );
  };
  return <View>{renderWordCard()}</View>;
};

const styles = StyleSheet.create({
  card: {
    display: "flex",
    marginTop: 10,
    marginBottom: 5,
    width: 400,
    height: 420,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Flashcard;
