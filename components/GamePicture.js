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
} from "react-native";

const onPress = () =>(1);

const GamePicture = () => {
  const [images, setimages]= useState([
    require('../assets/pictures/animals/bear.jpg'),
    require('../assets/pictures/animals/bee.jpg'),
    require('../assets/pictures/animals/cow.jpg'),
    require('../assets/pictures/animals/crow.jpg'),
  ]);

  return (
    <View>
      <FlatList
        numColumns={2}
        data={images}
        renderItem={ ({item, index }) => (
          <TouchableOpacity onPress={onPress}>
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
