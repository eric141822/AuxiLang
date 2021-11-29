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
