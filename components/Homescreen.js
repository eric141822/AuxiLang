import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Switch, Image } from "react-native-elements";
import {
  IconButton,
  Card,
  Button as PaperButton,
  Paragraph,
} from "react-native-paper";
import Modal from "react-native-modal";
import { LinearGradient } from "expo-linear-gradient";

const Homescreen = ({ navigation, wordList, isStore, setStore }) => {
  const [info, setInfo] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Switch value={isStore} onValueChange={setStore} />
          <IconButton
            icon="information-outline"
            size={25}
            onPress={() => {
              setInfo(!info);
            }}
          />
        </View>
      ),
    });
    //console.log(isStore);
  }, [isStore, info]);

  const renderInfoModal = () => {
    return (
      <View>
        <Modal
          isVisible={info}
          onBackdropPress={() => {
            setInfo(!info);
          }}
        >
          <Card style={styles.infoPanel}>
            <Card.Title title="Auxi's Tips:" />
            <Card.Content>
              <Paragraph>Select the game you want to play below!</Paragraph>
              <Paragraph>
                If you wish to NOT save the errors you've made and ONLY practice
                on words you've made a mistake on, click the switch next to this
                info button to deactivate error save functions.
              </Paragraph>
            </Card.Content>
            <Card.Actions>
              <PaperButton
                onPress={() => {
                  setInfo(!info);
                }}
              >
                Cancel
              </PaperButton>
            </Card.Actions>
          </Card>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Image
              source={require("../assets/Logos/Mascot1.png")}
              style={{ width: 200, height: 200 }}
            />
          </View>
        </Modal>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: "100%",
        }}
        colors={["#F57F11", "#C92828"]}
      />

      <View style={styles.row}>
        <View style={styles.gamePanel}>
          <Image
            style={styles.image}
            source={require("../assets/alphabetACQ.png")}
          />
          <Button
            buttonStyle={styles.btn}
            title="Alphabet Acquisition"
            onPress={() => {
              navigation.navigate("Acquisition");
            }}
          />
        </View>
        <View style={styles.gamePanel}>
          <Image
            style={styles.image}
            source={require("../assets/guess_what.png")}
          />
          <Button
            buttonStyle={styles.btn}
            title="Guess The Word"
            onPress={() => {
              navigation.navigate("GameText");
            }}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.gamePanel}>
          <Image
            style={styles.image}
            source={require("../assets/hangmanIcon.png")}
          />
          <Button
            buttonStyle={styles.btn}
            title="Hang-man"
            onPress={() => {
              navigation.navigate("Hangman");
            }}
          />
        </View>
        <View style={styles.gamePanel}>
          <Image
            style={styles.image}
            source={require("../assets/picturesIcon.png")}
          />
          <Button
            buttonStyle={styles.btn}
            title="Guess the Picture"
            onPress={() => {
              navigation.navigate("GamePicture");
            }}
          />
        </View>
      </View>
      {renderInfoModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  gamePanel: {
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    margin: 10,
    borderRadius: 10,
    width: 175,
    // height: 200,
  },
  image: {
    resizeMode: "contain",
    height: 150,
    width: 175,
  },
});
export default Homescreen;
