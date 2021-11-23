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
import { AuthContext } from "../util/context";
const Homescreen = ({ navigation, wordList, isStore, setStore }) => {
  const [info, setInfo] = useState(false);
  const { signOut } = React.useContext(AuthContext);
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
            <Card.Title title="Info" />
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
        </Modal>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {/* <Button
        title="test"
        onPress={() => {
          //   console.log(wordList[0]);
          wordList[0].error++;
          wordList[1].error += 2;
          wordList[99].error += 99;
        }}
      /> */}
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
            source={require("../assets/dictionaryIcon.png")}
          />
          <Button
            buttonStyle={styles.btn}
            title="Dictionary"
            onPress={() => {
              navigation.navigate("Dictionary");
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
            title="Pictionary"
            onPress={() => {
              // navigation.navigate("Dictionary");
            }}
          />
        </View>
      </View>
      {/* <View style={{ ...styles.row, marginTop: 30 }}>
        <Button
          title="Sign Out"
          buttonStyle={{ width: 300, borderRadius: 30 }}
          onPress={() => {
            signOut();
          }}
        />
      </View> */}
      {renderInfoModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
