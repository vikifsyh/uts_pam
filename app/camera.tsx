import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import PhotoPreviewSection from "../components/PhotoPreviewSection";
import Icon from "@/constants/Icon";

export default function Camera() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<any>(null);
  const cameraRef = useRef<CameraView | null>(null);

  if (!permission) {
    return <View className="flex-1 justify-center items-center" />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-900">
        <Text className="text-lg text-center mb-4 text-white">
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      const options = {
        quality: 1,
        base64: true,
        exif: false,
      };
      const takedPhoto = await cameraRef.current.takePictureAsync(options);
      setPhoto(takedPhoto);
    }
  };

  const handleRetakePhoto = () => setPhoto(null);

  if (photo) {
    return (
      <PhotoPreviewSection
        photo={photo}
        handleRetakePhoto={handleRetakePhoto}
      />
    );
  }

  return (
    <View className="flex-1 bg-white">
      <CameraView facing={facing} ref={cameraRef} className="flex-1">
        <View className="absolute bottom-8 w-full flex-row justify-center space-x-8">
          <TouchableOpacity
            onPress={toggleCameraFacing}
            className="p-4 bg-gray-800/30 rounded-full items-center justify-center"
          >
            <Icon name="retweet" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleTakePhoto}
            className="p-5 bg-white rounded-full items-center justify-center"
          >
            <Icon name="camera" />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}
