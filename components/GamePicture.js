import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Button,
  Image, 
} from "react-native";

const onPress = () =>(1);

const GamePicture = () => {
  return (
    <View>
     <View style={styles.oreintation}>
      <TouchableOpacity 
      onPress={onPress}>
      <Image
      style={styles.tinyLogo}
      source={require('../assets/pictures/animals/bear.jpg')}
      />
      </TouchableOpacity>

      <TouchableOpacity 
      onPress={onPress}>
      <Image
      style={styles.tinyLogo}
      source={require('../assets/pictures/animals/bear.jpg')}
      />
      </TouchableOpacity>
      </View>

      <TouchableOpacity 
      onPress={onPress}>
      <Image
      style={styles.tinyLogo}
      source={require('../assets/pictures/animals/bear.jpg')}
      />
      </TouchableOpacity>
      
      <TouchableOpacity 
      onPress={onPress}>
      <Image
      style={styles.tinyLogo}
      source={require('../assets/pictures/animals/bear.jpg')}
      />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  tinyLogo:{
    width: 134,
    height:134,
    borderRadius:20,

  },
  oreintation:{
   display:"flex",
   
  }
});

export default GamePicture;
