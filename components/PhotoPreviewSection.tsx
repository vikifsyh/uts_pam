import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { CameraCapturedPicture } from "expo-camera";

export default function PhotoPreviewSection({
  photo,
  handleRetakePhoto,
}: {
  photo: CameraCapturedPicture;
  handleRetakePhoto: () => void;
}) {
  return (
    <SafeAreaView className="flex-1 bg-gray-900 items-center justify-center">
      <View className="w-full h-4/5 mb-6">
        <Image
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
          className="w-full h-full rounded-lg"
          resizeMode="contain"
        />
      </View>
      <View className="w-full flex items-center">
        <TouchableOpacity
          onPress={handleRetakePhoto}
          className="px-6 py-3 bg-red-600 rounded-full"
        >
          <Text className="text-white text-lg font-semibold">Retake Photo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
