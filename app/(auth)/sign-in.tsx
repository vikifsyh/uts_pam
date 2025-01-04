import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { login } from "@/services/auth";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const router = useRouter();

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        throw new Error("Email dan kata sandi tidak boleh kosong.");
      }

      const user = await login(email, password); // Memanggil fungsi login dari auth.ts
      setModalMessage(`Welcome, ${user.email}`);
      setIsSuccess(true);
      setModalVisible(true);
    } catch (error: any) {
      console.error(error);

      // Validasi pesan error untuk menunjukkan penyebabnya
      if (error.message.includes("Invalid email")) {
        setModalMessage("Email yang dimasukkan salah. Silakan coba lagi.");
      } else if (error.message.includes("Invalid password")) {
        setModalMessage("Kata sandi yang dimasukkan salah. Silakan coba lagi.");
      } else {
        setModalMessage(
          "Login gagal. Periksa kembali email dan kata sandi kamu."
        );
      }
      setIsSuccess(false);
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    if (isSuccess) {
      router.replace("/home"); // Arahkan ke halaman home jika login berhasil
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-5">
      <StatusBar backgroundColor="#fff" style="dark" />
      <Image
        source={require("../../assets/images/3094352.jpg")}
        className="w-56 h-56 mb-6"
      />
      <Text className="text-2xl font-bold text-gray-800 mb-6">Login</Text>
      <View className="w-full">
        <Text className="mb-2 font-semibold">Email</Text>
        <TextInput
          className="w-full p-3 focus:border focus:border-primary rounded-lg bg-[#f5f5f5] mb-4"
          placeholder="Masukkan email kamu"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View className="w-full">
        <Text className="mb-2 font-semibold">Kata Sandi</Text>
        <TextInput
          className="w-full p-3 focus:border focus:border-primary rounded-lg bg-[#f5f5f5] mb-4"
          placeholder="Masukkan kata sandi kamu"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <TouchableOpacity
        className="w-full p-4 bg-primary rounded-xl my-4"
        onPress={handleLogin}
      >
        <Text className="text-white text-center font-semibold">
          Masuk Sekarang
        </Text>
      </TouchableOpacity>
      <View className="flex-row space-x-1">
        <Text>Belum punya akun?</Text>
        <TouchableOpacity className="" onPress={() => router.push("/sign-up")}>
          <Text className="text-primary font-semibold">Daftar</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white p-6 rounded-lg w-80">
            <Text
              className={`text-lg font-bold mb-4 ${
                isSuccess ? "text-green-500" : "text-red-500"
              }`}
            >
              {isSuccess ? "Login Successful" : "Login Failed"}
            </Text>
            <Text className="text-gray-700 mb-6">{modalMessage}</Text>
            <TouchableOpacity
              className="p-3 bg-primary rounded-lg"
              onPress={closeModal}
            >
              <Text className="text-white text-center font-semibold">OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SignIn;
