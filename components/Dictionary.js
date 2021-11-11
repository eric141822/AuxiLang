import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SearchBar } from "react-native-elements";

import { getAllWords, getLargeWordsList } from "../util/utils";
const Dictionary = () => {
  const [words, setWords] = useState(getAllWords());
  const [dataSource, setDataSource] = useState(getLargeWordsList());
  const [search, setSearch] = useState();
  const [filteredList, setFilteredList] = useState(dataSource);
  const [offset, setOffset] = useState(10);
  useEffect(() => {
    searchFilter();
  }, [search, offset]);
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
      <SearchBar
        placeholder="Search here..."
        onChangeText={(e) => {
          setSearch(e);
          setOffset(10);
        }}
        value={search}
      />
      <FlatList
        data={filteredList.slice(0, offset)}
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
