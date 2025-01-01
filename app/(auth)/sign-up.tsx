import { signUp } from "@/services/auth";
import React, { useState } from "react";
import { TextInput, Text, View, Modal, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      await signUp(email, password);
      setModalMessage("Account created successfully! Please log in.");
      setModalVisible(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    router.replace("/sign-in"); // Arahkan ke halaman login
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-5">
      <View className="w-full">
        <Text className="text-2xl text-left font-semibold mb-4">Buat Akun</Text>

        {error && (
          <Text className="text-red-500 text-center mb-4">{error}</Text>
        )}

        <View className="space-y-4">
          <View>
            <Text className="mb-2 font-semibold">Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              className="w-full p-3 focus:border focus:border-primary rounded-lg bg-[#f5f5f5] "
              placeholder="Enter your email"
            />
          </View>

          <View>
            <Text className="mb-2 font-semibold">Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              className="w-full p-3 focus:border focus:border-primary rounded-lg bg-[#f5f5f5] mb-4"
              placeholder="Enter your password"
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            className={`p-4 rounded-xl ${
              loading ? "bg-gray-400" : "bg-primary"
            }`}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text className="text-white text-center font-semibold">
              {loading ? "Loading..." : "Daftar Sekarang"}
            </Text>
          </TouchableOpacity>
          <View className="flex-row space-x-1 justify-center">
            <Text>Sudah punya akun?</Text>
            <TouchableOpacity
              className=""
              onPress={() => router.push("/sign-in")}
            >
              <Text className="text-primary font-semibold">Masuk</Text>
            </TouchableOpacity>
          </View>
        </View>
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
            <Text className="text-lg font-bold mb-4 text-green-500">
              Success
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

export default SignUp;
