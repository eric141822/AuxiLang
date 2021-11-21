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

const GamePicture = () => {
  return (
    <View>
      <Text>Lion</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  
});

export default GamePicture;
