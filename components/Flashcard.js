import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Button,
} from "react-native";

/* TODO: 
    1. Develop UI for flashcard.
    2. Create another JS compoment for all flash cards. The screen contains two buttons bottom left and bottom right.
        "Last card" and "Next card".
    3. In Dictionary.js, create checkboxes for each word to enable selection, push checked word objects with definition
       into an array, pass the array as a prop to the page in mentioned in 2., and for each word, load this current flashcard component.
    4. Implement a GOTO flashcards Button in dictionaru.js, perhaps at top right. (UI design will be decided later).
    
*/

const Flashcard = ({ word, definition }) => {
  const [flip, setFlip] = useState(false);

  const renderWordCard = () => {
    return (
      <View>
        <Text>{flip ? definition : word}</Text>
        <Button
          title="Flip"
          onPress={() => {
            setFlip(!flip);
          }}
        />
      </View>
    );
  };
  return <View>{renderWordCard()}</View>;
};

const styles = StyleSheet.create({});

export default Flashcard;
