import React, { useEffect, useState } from "react";

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
  SafeAreaView,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import titles from '../assets/data/picture_list.json'



// function randomArrayShuffle(array) {
//   var currentIndex = array.length, temporaryValue, randomIndex;
//   while (0 !== currentIndex) {
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex -= 1;
//     temporaryValue = array[currentIndex];
//     array[currentIndex] = array[randomIndex];
//     array[randomIndex] = temporaryValue;
//   }
//   return array;

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
    require('../assets/pictures/all/kiwi.jpg'),
    require('../assets/pictures/all/apple.jpg'),
    require('../assets/pictures/all/pasta.jpg'),
    require('../assets/pictures/all/pizza.jpg'),
  ]);

  
  return (
    <View style={styles.container}>
      <Text>Titles</Text>
      <FlatList
        data = {titles}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => 
        <Text>{item.all}</Text>
        }
        keyExtractor={(item,index) => index.toString()}
      />
      <FlatList
        contentContainerStyle={{flexGrow:1, justifyContent: 'center', marginLeft:35, paddingBottom: 50}}
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
