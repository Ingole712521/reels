/** @format */

// AuthNavigator.tsx
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";

// Define the type for the Auth Navigator stack
type AuthStackParamList = {
  Login: undefined;
  Registration: undefined;
};

const AuthStack = createStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name='Login' component={LoginScreen} />
      <AuthStack.Screen name='Registration' component={RegistrationScreen} />
    </AuthStack.Navigator>
  );
}
