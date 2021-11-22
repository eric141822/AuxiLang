import React, { useEffect, useState } from "react";
import all from '../assets/data/picture_list.json';

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Button,
  Image,
  FlatList, 
  Alert,
} from "react-native";



function randomArrayShuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}


const wordList = require('../assets/data/picture_list.json');

console.log(wordList["all"])

const wrongAns = () =>
Alert.alert(
  "Wrong Answer",
  "The Answer is wrong",
  [
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel"
    },
    { text: "OK", onPress: () => console.log("OK Pressed") }
  ]
);

const GamePicture = () => {
  const [images, setimages]= useState([
    require('../assets/pictures/all/bear.jpg'),
    require('../assets/pictures/all/bee.jpg'),
    require('../assets/pictures/all/cow.jpg'),
    require('../assets/pictures/all/crow.jpg'),
  ]);

  return (
    <View>
      <FlatList
        numColumns={2}
        data={images}
        renderItem={ ({item, index }) => (
          <TouchableOpacity onPress={(wrongAns)}>
          <Image source = {item}
          key={index}
          style={styles.tinyLogo}
          /></TouchableOpacity>
        )}
      />
    
    </View>
  );
};




const styles = StyleSheet.create({
  tinyLogo:{
    width: 150,
    height:150,
    borderRadius:20,
    margin: 10
  },

});

export default GamePicture;
