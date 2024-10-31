import { View, Text, TouchableOpacity, Button } from "react-native";
import React from "react";
import { Href, Link, usePathname, useRouter } from "expo-router";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-red-100">
      <Text className="text-red-500">
        Open up App.js to start working on your app!
      </Text>
      <Text className="text-4xl font-bold">Hello World! 👋</Text>

      {/* <TouchableOpacity onPress={() => router.replace("/home" as Href)}>
        <Text>Home</Text>
      </TouchableOpacity> */}
      <Link href={"/home"}>Home</Link>
    </View>
  );
}
