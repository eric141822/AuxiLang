import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import { Button } from "react-native-elements";
import { AuthContext } from "../util/context";
const SignIn = ({ navigation }) => {
  const [data, setData] = React.useState({
    username: "",
    password: "",
    check_textInputChange: false,
  });
  const { signIn } = React.useContext(AuthContext);

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
      });
    }
  };
  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
      });
    } else {
      setData({
        ...data,
        password: val,
      });
    }
  };

  const loginHandle = (userName, password) => {
    signIn(userName, password);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>Username</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(val) => textInputChange(val)}
          placeholder="Username"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Password</Text>
        <TextInput
          style={styles.textInput}
          secureTextEntry={true}
          onChangeText={(val) => handlePasswordChange(val)}
          placeholder="Password"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.button}>
        <Button
          buttonStyle={{ width: 300, borderRadius: 30 }}
          title="LOGIN"
          onPress={() => {
            loginHandle(data.username, data.password);
          }}
        />
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    width: "80%",
    marginTop: 50,
  },
  text_header: {
    color: "black",
    fontWeight: "bold",
    fontSize: 30,
  },
  inputContainer: {
    width: "80%",
    marginTop: 12,
  },
  textInput: {
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey",
  },
});
