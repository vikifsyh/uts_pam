import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Icon from "@/constants/Icon";

interface CustomLabelProps {
  title: string;
  focused: boolean;
}

const CustomLabel: React.FC<CustomLabelProps> = ({ title, focused }) => (
  <View style={{ alignItems: "center" }}>
    <Text
      className={`text-xs ${
        focused ? "text-primary font-bold" : "text-neutral font-normal"
      }`}
    >
      {title}
    </Text>
  </View>
);

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "white",
          height: 74,
          paddingVertical: 10,
          paddingHorizontal: 20,
          shadowColor: "black",
          shadowOpacity: 0.1,
          borderTopWidth: 0,
          elevation: 10,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          // headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>
              <Icon name="home" color={focused ? "#1B8C78" : "#D3D1D8"} />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <CustomLabel title="Beranda" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="category"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>
              <Icon name="category" color={focused ? "#1B8C78" : "#D3D1D8"} />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <CustomLabel title="Kategori" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="post"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: () => (
            <View
              className="p-5 rounded-full bg-primary"
              style={{
                position: "absolute",
                bottom: 40,
                alignSelf: "center",
                zIndex: 1,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 5,
                elevation: 5,
              }}
            >
              <Icon name="add" />
            </View>
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="trending"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>
              <Icon name="trending" color={focused ? "#1B8C78" : "#D3D1D8"} />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <CustomLabel title="Trending" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>
              <Icon name="profile" color={focused ? "#1B8C78" : "#D3D1D8"} />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <CustomLabel title="Saya" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
