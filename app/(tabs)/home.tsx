import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  FlatList,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "@/constants/Icon";
import { StatusBar } from "expo-status-bar";

import { authListener } from "@/services/firebase";
import { User } from "firebase/auth";
import { useUser } from "@/context/userContext";

interface Article {
  title: string;
  urlToImage: string;
  source: {
    name: string;
  };
}

export default function Home() {
  const [activeItem, setActiveItem] = useState(1);
  const [berita, setBerita] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useUser(); // Here user can be User or null

  useEffect(() => {
    const unsubscribe = authListener((user: User | null) => {
      if (user) {
        // User is logged in, set user details
        setUser(user); // setUser can accept User or null
      } else {
        // No user logged in, set user to null
        setUser(null); // This is allowed as UserContext expects null
      }
      setLoading(false); // Stop loading once user status is determined
    });

    return () => unsubscribe(); // Cleanup the listener when component is unmounted
  }, []);

  const kategori = [
    { id: 1, title: "Semua" },
    { id: 2, title: "Olahraga" },
    { id: 3, title: "Politik" },
    { id: 4, title: "Teknologi" },
    { id: 5, title: "Kesehatan" },
  ];

  const shuffleArray = (array: Article[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const fetchBerita = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=f1205d88be3247ef998be010b13bdbf0`
      );
      const data = await response.json();
      setBerita(data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBerita();
  }, []);

  const randomArticles = shuffleArray([...berita]).slice(0, 10);

  return (
    <View className="bg-white flex-1">
      <StatusBar backgroundColor="#fff" style="dark" />
      <View className="mt-16 mx-5">
        <Text className="">Selamat Datang,</Text>
        <Text className="mb-5 text-lg font-semibold">
          {user ? user.email : "Guest"}
        </Text>

        <Text className="text-2xl text-neutral-700 font-semibold">
          Jelajahi Berita Terkini
        </Text>
        <Text className="text-neutral-500">
          Info Penting Langsung untuk Kamu!
        </Text>

        <View className="p-3 bg-neutral-50 rounded-xl relative mt-8">
          <View className="absolute top-4 left-3">
            <Icon name="search" color="#e7e7e7" />
          </View>
          <TextInput
            className="left-7"
            placeholder="Cari Berita"
            placeholderTextColor="#5d5d5d"
          />
        </View>

        <View className="mt-6 mb-4">
          <FlatList
            data={kategori}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableHighlight
                onPress={() => setActiveItem(item.id)}
                className={`mr-4 px-4 py-2 rounded-2xl ${
                  activeItem === item.id ? "bg-primary" : "bg-neutral-50"
                }`}
              >
                <View>
                  <Text
                    className={`text-xs font-semibold ${
                      activeItem === item.id
                        ? "text-white "
                        : "text-neutral-300"
                    }`}
                  >
                    {item.title}
                  </Text>
                </View>
              </TouchableHighlight>
            )}
          />
        </View>
      </View>

      <FlatList
        ListHeaderComponent={
          <View>
            <View className="mt-6 mb-4 mx-5">
              <FlatList
                data={randomArticles}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View className="mr-4 relative">
                    <View className="absolute z-10 bg-black opacity-50 w-full h-full rounded-xl"></View>
                    <Image
                      source={{ uri: item.urlToImage }}
                      className="w-56 h-56 rounded-xl opacity-40"
                      resizeMode="cover"
                    />
                    <Text
                      className="z-10 text-white font-bold absolute bottom-3 left-3 "
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      testID="articleTitle" // Menambahkan testID pada title artikel
                    >
                      {item.title}
                    </Text>
                  </View>
                )}
              />
            </View>
            <Text className="mx-5 text-2xl text-neutral-700 font-semibold">
              Berita Terkini
            </Text>
          </View>
        }
        data={berita}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View className="mt-6 mx-5">
            <View className="flex-row items-center gap-4">
              <View className="w-24 h-24">
                <Image
                  source={{ uri: item.urlToImage }}
                  className="w-full h-full rounded-xl"
                  resizeMode="cover"
                />
              </View>
              <View className="flex">
                <Text className="text-sm text-neutral-300">
                  {item.source.name}
                </Text>
                <Text
                  className="text-neutral-500 font-semibold line-clamp-1"
                  testID="articleTitle" // Menambahkan testID pada title artikel
                >
                  {item.title}
                </Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}
