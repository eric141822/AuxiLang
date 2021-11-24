import React from "react";
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
const SignUp = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Username</Text>
      <View style={styles.inputContainer}>
        <TextInput placeholder="User Name" autoCapitalize="none" />
      </View>
      <Text>Password</Text>
      <View style={styles.inputContainer}>
        <TextInput placeholder="Password" autoCapitalize="none" />
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
        >
          <Text>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
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
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;

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
