import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { SearchBar, CheckBox, Button } from "react-native-elements";
import {
  IconButton,
  Card,
  Button as PaperButton,
  Paragraph,
} from "react-native-paper";
// import { getAllWords, getLargeWordsList } from "../util/utils";
import FlashCardPage from "./FlashCardPage";
import Modal from "react-native-modal";
// import intro_vocab from "../assets/words/intro_vocab.json";
import { LinearGradient } from "expo-linear-gradient";

const Dictionary = ({ navigation, wordList }) => {
  const [flashCardWords, setFlashCardWords] = useState([]);
  const [show, setShow] = useState(false);
  const [dataSource, setDataSource] = useState(wordList);
  const [info, setInfo] = useState(false);
  const [search, setSearch] = useState();
  const [filteredList, setFilteredList] = useState(dataSource);
  const [offset, setOffset] = useState(10);
  const [errorSort, setErrorSort] = useState(false);
  useEffect(() => {
    searchFilter();
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
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
  }, [search, offset, info, errorSort, show]);

  const renderInfoModal = () => {
    return (
      <View>
        <Modal
          isVisible={info}
          onBackdropPress={() => {
            setInfo(!info);
          }}
        >
          <Card>
            <Card.Title title="Info" />
            <Card.Content>
              <Paragraph>
                Type in the search bar to search for a certain word.
              </Paragraph>
              <Paragraph>
                Click on the checkbox under each word to include them in
                flashcards.
              </Paragraph>
              <Paragraph>
                Click on the button "Show Flashcards" after selecting the words.
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

  const renderFlashCardModal = () => {
    return (
      <View>
        <Modal
          isVisible={show}
          onBackdropPress={() => {
            setShow(false);
          }}
        >
          <View>
            <FlashCardPage wordList={flashCardWords} />
          </View>
          <View>
            <Button
              title="Close Flashcards"
              onPress={() => {
                setShow(false);
              }}
            />
          </View>
        </Modal>
      </View>
    );
  };

  const getMore = () => {
    setOffset(offset + 10);
  };
  const footer = () => {
    return (
      filteredList.length > 10 && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.8}
            onPress={getMore}
          >
            <Text style={styles.footerText}>Load More</Text>
          </TouchableOpacity>
        </View>
      )
    );
  };
  const toFlashCards = () => {
    let list = dataSource.filter((i) => i.isChecked === true);
    if (list.length < 1) {
      Alert.alert("Error", "No words are selected", [{ text: "Cancel" }]);
      return;
    }
    setFlashCardWords([...list]);
    setShow(true);
  };
  const checker = (idx) => {
    //Need to set both lists for now, may explore more efficient options later.
    setDataSource(
      dataSource.map((i) =>
        i.id === idx ? { ...i, isChecked: !i.isChecked } : i
      )
    );
    setFilteredList(
      filteredList.map((i) =>
        i.id === idx ? { ...i, isChecked: !i.isChecked } : i
      )
    );
  };
  const itemComponent = ({ item }) => {
    return (
      <View style={styles.wordBox}>
        <View style={styles.wordDetail}>
          <Text style={styles.dictWord}>{item.word.toUpperCase()}</Text>
          <Text style={styles.dictType}>{item.type}</Text>
          <Text>{item.definition}</Text>
          <Text>No. of errors made: {item.error}</Text>
        </View>
        <View style={styles.checkBoxContainer}>
          <CheckBox
            size={30}
            checked={item.isChecked}
            onPress={() => {
              checker(item.id);
            }}
          />
        </View>
      </View>
    );
  };
  const itemSeperator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#C8C8C8",
        }}
      />
    );
  };

  const searchFilter = () => {
    if (!search || search === "") {
      if (errorSort) {
        let list = [...dataSource].sort((a, b) => b.error - a.error);
        setFilteredList([...list]);
      } else {
        setFilteredList(dataSource);
      }
      return;
    }
    let keyword = search.toLowerCase();
    let res = !errorSort
      ? dataSource.filter((item) => item.word.toLowerCase().includes(keyword))
      : [...dataSource]
          .filter((item) => item.word.toLowerCase().includes(keyword))
          .sort((a, b) => b.error - a.error);

    setFilteredList([...res]);
    return;
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: "10%",
        }}
      >
        <Button title="Show Flashcards" onPress={toFlashCards} />
        <CheckBox
          center
          title="Sort by Errors"
          checked={errorSort}
          onPress={() => {
            setErrorSort(!errorSort);
          }}
        />
      </View>
      <View style={{ height: "90%" }}>
        <FlatList
          data={filteredList.slice(0, offset)}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={itemSeperator}
          enableEmptySections={true}
          renderItem={itemComponent}
          ListHeaderComponent={
            <SearchBar
              placeholder="Search here..."
              onChangeText={(e) => {
                setSearch(e);
                setOffset(10);
              }}
              value={search}
            />
          }
          ListFooterComponent={footer}
        />
      </View>
      {renderFlashCardModal()}
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
  wordBox: {
    backgroundColor: "lightblue",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    marginTop: 3,
    width: "100%",
    borderRadius: 5,
    borderStyle: "solid",
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  btn: {
    padding: 10,
    backgroundColor: "orange",
    borderRadius: 5,
    width: "85%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    color: "white",
    fontSize: 15,
  },
  dictWord: {
    fontWeight: "bold",
    fontSize: 20,
  },
  dictType: { fontStyle: "italic" },
  wordDetail: { width: "80%" },
  checkBoxContainer: { width: "20%" },
});

export default Dictionary;
