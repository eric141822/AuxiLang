import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "./SignIn";

const Stack = createNativeStackNavigator();

const RootStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Sign In" component={SignIn} />
    </Stack.Navigator>
  );
};

export default RootStack;
