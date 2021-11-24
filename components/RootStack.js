import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Stack = createNativeStackNavigator();

const RootStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Sign In" component={SignIn} />
      <Stack.Screen name="Sign Up" component={SignUp} />
    </Stack.Navigator>
  );
};

export default RootStack;
