import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SearchBar, CheckBox, Button } from "react-native-elements";
import {
  IconButton,
  Card,
  Title,
  Button as PaperButton,
  Paragraph,
} from "react-native-paper";
// import { getAllWords, getLargeWordsList } from "../util/utils";
import FlashCardPage from "./FlashCardPage";
import Modal from "react-native-modal";
// import intro_vocab from "../assets/words/intro_vocab.json";

const Dictionary = ({ navigation, wordList }) => {
  const [flashCardWords, setFlashCardWords] = useState([]);
  const [show, setShow] = useState(false);
  const [dataSource, setDataSource] = useState(wordList);
  const [info, setInfo] = useState(false);
  const [search, setSearch] = useState();
  const [filteredList, setFilteredList] = useState(dataSource);
  const [offset, setOffset] = useState(10);
  useEffect(() => {
    searchFilter();
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="information-outline"
          size={20}
          onPress={() => {
            setInfo(!info);
          }}
        />
      ),
    });
  }, [search, offset, info]);

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
            <Text style={{ color: "white", fontSize: 15 }}>Load More</Text>
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
        <Text>{item.word}</Text>
        <Text>{item.type}</Text>
        <Text>{item.definition}</Text>
        <Text>Error: {item.error}</Text>
        <CheckBox
          title="Include in Flashcards"
          checked={item.isChecked}
          onPress={() => {
            checker(item.id);
          }}
        />
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
      setFilteredList(dataSource);
      return;
    }
    let keyword = search.toLowerCase();
    let res = dataSource.filter((item) =>
      item.word.toLowerCase().includes(keyword)
    );
    setFilteredList([...res]);
    return;
  };

  return (
    <View>
      <Button title="Show Flashcards" onPress={toFlashCards} />
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  //   infoPanel: {
  //     flex: 1,
  //     width: 400,
  //     height: "auto",
  //     alignItems: "center",
  //     justifyContent: "center",
  //   },
});

export default Dictionary;
