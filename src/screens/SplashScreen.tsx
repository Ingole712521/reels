/** @format */

import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import Logo from "../components/Logo";
import { RootStackParamList } from "../types/navigation";
import { getCurrentUser } from "../services/auth";

type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Splash"
>;

type Props = {
  navigation: SplashScreenNavigationProp;
};

export default function SplashScreen({ navigation }: Props) {
  useEffect(() => {
    const checkAuthAndNavigate = async () => {
      try {
        // Display splash screen for 2 seconds
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const user = await getCurrentUser();
        if (user) {
          navigation.replace("Home", { user });
        } else {
          navigation.replace("Login");
        }
      } catch (error) {
        console.error("Error during authentication check:", error);
        navigation.replace("Login");
      }
    };

    checkAuthAndNavigate();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Logo width={200} height={200} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  }
});
