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
import titles from "../assets/data/picture_list.json";
import { getPictures } from "../util/utils";


const wordList = require("../assets/data/picture_list.json");

const wrongAns = () =>
  Alert.alert("Wrong Answer", "The Answer is wrong", [
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel",
    },
    { text: "OK", onPress: () => console.log("OK Pressed") },
  ]);

const GamePicture = () => {
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(3);
  const [rand, setRand] = useState(0);

  const [pics, setPics] = useState(getPictures());

  const handleRandNum = () => {
    setRand(Math.floor(Math.random() * (maxVal - minVal + 1) + minVal));
  };

  var a=[]
  for (i=0; i<4;i++){
    a.push(pics[i].id)
    
  }
  console.log(a)
  return (
    <View style={styles.container}>
  
      <FlatList
        data={titles}
        
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => 
        <Text style={styles.title}>{item.all[a[rand]]}</Text>
      }
        keyExtractor={(item, index) => index.toString()}
      />
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          marginLeft: 35,
          paddingBottom: 50,
        }}
        numColumns={2}
        data={pics}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={wrongAns}>
            <Image source={item.src} key={index} style={styles.tinyLogo} />
          </TouchableOpacity>
         
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 50,
    color: "black",
    fontSize: 50,
  },
  tinyLogo: {
    width: 150,
    height: 150,
    borderRadius: 20,
    margin: 10,
  },
});

export default GamePicture;
