import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";

export default function App() {
  const router = useRouter();

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();

    setTimeout(() => {
      SplashScreen.hideAsync();
      router.replace("/home");
    }, 10000);
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <LottieView
        source={require("../assets/animation/Animation - 1730469803244.json")}
        autoPlay
        loop
        style={{ width: 300, height: 300 }}
      />
      <StatusBar style="dark" />
    </View>
  );
}
