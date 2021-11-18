import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Switch } from "react-native-elements";
import {
  IconButton,
  Card,
  Button as PaperButton,
  Paragraph,
} from "react-native-paper";
import Modal from "react-native-modal";

const Homescreen = ({ navigation, wordList, isStore, setStore }) => {
  const [info, setInfo] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <Switch value={isStore} onValueChange={setStore} />
          <IconButton
            icon="information-outline"
            size={20}
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
                If you wish to NOT save the erros you've made, click the switch
                next to this info button to deactivate error save functions.
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
        <Button
          buttonStyle={styles.btn}
          title="Alphabet Acquisition"
          onPress={() => {
            navigation.navigate("Acquisition");
          }}
        />

        <Button
          buttonStyle={styles.btn}
          title="Dictionary"
          onPress={() => {
            navigation.navigate("Dictionary");
          }}
        />
      </View>
      <View style={styles.row}>
        <Button
          buttonStyle={styles.btn}
          title="Hang-man"
          onPress={() => {
            // navigation.navigate("Acquisition");
          }}
        />

        <Button
          buttonStyle={styles.btn}
          title="Word Search"
          onPress={() => {
            // navigation.navigate("Dictionary");
          }}
        />
      </View>
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  btn: {
    margin: 10,
    borderRadius: 10,
    // width: 250,
    // height: 200,
  },
});
export default Homescreen;
