import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { getAllWords, getLargeWordsList } from "../util/utils";
const Dictionary = () => {
  const [words, setWords] = useState(getAllWords());
  const [dataSource, setDataSource] = useState(getLargeWordsList());
  const [offset, setOffset] = useState(10);
  //   useEffect(() => {
  //     console.log(testPrint());
  //   });
  //TODO: Switch to flat list, and switch words to new 50000 words dict.
  //   const footer = () => {

  //   }
  const getMore = () => {
    setOffset(offset + 10);
  };
  const footer = () => {
    return (
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.8}
          onPress={getMore}
        >
          <Text style={{ color: "white", fontSize: 15 }}>Load More</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const item = ({ item }) => {
    return (
      <View style={styles.wordBox}>
        <Text>{item.word}</Text>
        <Text>{item.type}</Text>
        <Text>{item.definition}</Text>
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
  return (
    <View>
      <FlatList
        data={dataSource.slice(0, offset)}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={itemSeperator}
        enableEmptySections={true}
        renderItem={item}
        ListFooterComponent={footer}
      />
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
});

export default Dictionary;
