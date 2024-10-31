import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import Icon from "@/constants/Icon"; // Pastikan jalur import sesuai dengan struktur folder Anda

export default function Home() {
  const kategori = [
    { id: 1, title: "Random" },
    { id: 2, title: "Olahraga" },
    { id: 3, title: "Politik" },
    { id: 4, title: "Teknologi" },
    { id: 5, title: "Kesehatan" },
  ];

  const isiKategori = [
    {
      id: 1,
      title: "Pelantikan Presiden Indonesia",
      kategori: "Politik",
      Image: require("../../assets/images/indonesia.png"),
    },
    {
      id: 2,
      title: "Pelantikan Presiden Indonesia",
      kategori: "Politik",
      Image: require("../../assets/images/indonesia.png"),
    },
  ];

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Beranda</Text>
        <Text style={styles.subtitle}>Discover things of this world</Text>

        {/* Pencarian */}
        <View style={styles.container}>
          <Icon name="home" color="#888" />
          <TextInput
            style={styles.input}
            placeholder="Cari Berita"
            placeholderTextColor="#888"
          />
        </View>

        {/* Flatlist Kategori */}
        <View style={styles.listContainer}>
          <FlatList
            data={kategori}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableHighlight
                onPress={() => console.log(`Selected: ${item.title}`)}
                underlayColor="#ddd"
                style={styles.itemContainer}
              >
                <View>
                  <Text
                    className="bg-neutral-50 p-2 rounded-lg jus"
                    style={styles.itemText}
                  >
                    {item.title}
                  </Text>
                </View>
              </TouchableHighlight>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>

        {/* Flatlist isi kategori */}
        <View style={styles.wrapper}>
          <View style={styles.listContainer}>
            <FlatList
              data={isiKategori}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableHighlight
                  onPress={() => console.log(`Selected: ${item.title}`)}
                  underlayColor="#ddd"
                  style={styles.itemContainer}
                >
                  <View style={styles.itemContent}>
                    <Image source={item.Image} style={styles.itemImage} />
                    <View style={styles.textOverlay}>
                      <Text style={styles.itemTitle}>{item.title}</Text>
                      <Text style={styles.itemCategory}>{item.kategori}</Text>
                    </View>
                  </View>
                </TouchableHighlight>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    paddingTop: 12,
  },
  subtitle: {
    fontSize: 12,
    color: "#A8A8A8",
    paddingTop: 4,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    marginTop: 10,
  },
  icon: {
    marginRight: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  listContainer: {
    marginTop: 8,
  },
  itemContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#ffffff",
    borderRadius: 8,
  },
  itemImage: {
    width: 250, // Atur lebar gambar
    height: 250, // Atur tinggi gambar
    borderRadius: 8, // Agar sudut gambar membulat
  },
  itemContent: {
    position: "relative", // Untuk mengatur posisi teks di atas gambar
  },
  textOverlay: {
    position: "absolute",
    bottom: 10, // Mengatur posisi teks
    left: 10,
    right: 10,
    alignItems: "center", // Untuk menengahkan teks
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff", // Mengubah warna teks agar terlihat di atas gambar
    textAlign: "center",
  },
  itemCategory: {
    fontSize: 12,
    color: "#fff", // Mengubah warna teks agar terlihat di atas gambar
    textAlign: "center",
  },
  itemText: {
    fontSize: 16,
  },
  separator: {
    width: 1,
  },
});
