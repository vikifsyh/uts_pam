import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Camera from "@/app/camera"; // Assuming this is your Camera component for taking photos
import Icon from "@/constants/Icon";
import { useNavigation } from "expo-router";

export default function Post() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigation = useNavigation();

  const handlePost = () => {
    console.log("Title:", title);
    console.log("Content:", content);
  };

  return (
    <ScrollView className="flex-1 bg-gray-100 px-4 py-6">
      <View className="bg-white p-6 rounded-lg shadow-lg">
        <Text className="text-2xl font-semibold text-gray-800 mb-4">
          Tambah Berita
        </Text>

        {/* Title Input */}
        <View className="mb-4">
          <Text className="text-lg text-gray-700 mb-1">Judul</Text>
          <View className="flex-row items-center border border-gray-300 rounded-md px-3 py-2 bg-gray-50">
            <Icon name="title" />
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Masukan Judul Berita"
              placeholderTextColor="#9CA3AF"
              className="flex-1 text-gray-800"
            />
          </View>
        </View>

        {/* Content Input */}
        <View className="mb-4">
          <Text className="text-lg text-gray-700 mb-1">Isi Berita</Text>
          <View className="border border-gray-300 rounded-md px-3 py-2 bg-gray-50">
            <TextInput
              value={content}
              onChangeText={setContent}
              placeholder="Masukan berita disini"
              placeholderTextColor="#9CA3AF"
              className="text-gray-800 h-32"
              multiline
              numberOfLines={4}
            />
          </View>
        </View>

        {/* Image Capture / Upload */}
        <View className="mb-6">
          <Text className="text-lg text-gray-700 mb-2">Upload Gambar</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("camera")}
            className="bg-[#d7d7d7] w-[100px] h-[100px] flex items-center justify-center rounded-lg"
          >
            <Icon name="camera-off" />
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handlePost}
          className="bg-primary rounded-md py-2 items-center shadow-md"
        >
          <Text className="text-white font-semibold">Submit </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
