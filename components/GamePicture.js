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

// const guessWord;

const GamePicture = () => {


  const [minVal,setMinVal]=useState(0)
  const [maxVal,setMaxVal]=useState(222 )
  const [rand,setRand]=useState(100)
  
  const handleRandNum=()=>{
    setRand(Math.floor(Math.random()*(maxVal-minVal+1)+minVal))
  }
  



  const [images, setimages]= useState([
    require('../assets/pictures/all/kiwi.jpg'),
    require('../assets/pictures/all/apple.jpg'),
    require('../assets/pictures/all/pasta.jpg'),
    require('../assets/pictures/all/pizza.jpg'),
  ]);

  return (
    <View style={styles.container}>
      <Text style = {styles.title}>Pasta{rand}</Text>
      <FlatList
        contentContainerStyle={{flexGrow:1, justifyContent: 'center', marginLeft:35, paddingBottom: 50}}
        numColumns={2}
        data={images}
        renderItem={ ({item, index }) => (
          <TouchableOpacity onPress={(handleRandNum)}>
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
  container: {
    flex:1,
    backgroundColor: 'white'
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 50,
    color:'black',
    fontSize:50,
  },
  tinyLogo:{
    width: 150,
    height:150,
    borderRadius:20,
    margin: 10
  },

});

export default GamePicture;
