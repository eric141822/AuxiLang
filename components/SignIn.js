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
      <Text>Username</Text>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(val) => textInputChange(val)}
          placeholder="User Name"
          autoCapitalize="none"
        />
      </View>
      <Text>Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          secureTextEntry={true}
          onChangeText={(val) => handlePasswordChange(val)}
          placeholder="Password"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.button}>
        <TouchableOpacity
          style={{
            width: "100%",
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
          onPress={() => {
            loginHandle(data.username, data.password);
          }}
        >
          <Text>Sign In</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={{
            width: "100%",
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
          onPress={() => {
            // navigation.navigate("SignUp");
            console.log("Pressed Sign Up");
          }}
        >
          <Text>Sign Up</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  text_header: {
    color: "black",
    fontWeight: "bold",
    fontSize: 30,
  },
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 2,
    // borderColor: "black",
    marginTop: 12,
  },
});
