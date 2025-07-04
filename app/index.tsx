import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

const tops = [
  "https://i.postimg.cc/RhM5X01N/top1.jpg",
  "https://i.postimg.cc/FsPzkY3W/top2.jpg",
  "https://i.postimg.cc/Y9fqr0tx/top3.jpg",
  "https://i.postimg.cc/YqSq7tZ1/top4.jpg",
  "https://i.postimg.cc/PxhTRH1v/top5.jpg",
  "https://i.postimg.cc/05VPcLjr/top6.jpg",
  "https://i.postimg.cc/7L1y7RjH/top7.jpg",
];

const bottoms = [
  "https://i.postimg.cc/YCzHLV5p/bottom1.jpg",
  "https://i.postimg.cc/pXNbGRxW/bottom2.jpg",
  "https://i.postimg.cc/C5ktTnYF/bottom3.jpg",
  "https://i.postimg.cc/Jh0272mY/bottom4.jpg",
  "https://i.postimg.cc/3wktQ0CP/bottom5.jpg",
  "https://i.postimg.cc/L6mv6b3k/bottom6.jpg",
  "https://i.postimg.cc/jSFhcd0v/bottom7.jpg",
];

export default function VirtualWardrobe() {
  const [topImage, setTopImage] = useState(tops[0]);
  const [bottomImage, setBottomImage] = useState(bottoms[0]);

  // Precargar imágenes
  useEffect(() => {
    [...tops, ...bottoms].forEach((url) => {
      Image.prefetch(url).catch((err) => {
        console.warn("No se pudo precargar:", url);
      });
    });
  }, []);

  const animateChange = (images: string[], setter: (img: string) => void, count = 0) => {
    if (count > 10) return;
    const random = images[Math.floor(Math.random() * images.length)];
    setter(random);
    setTimeout(() => animateChange(images, setter, count + 1), 100);
  };

  return (
    <View style={styles.container}>
      {/* Top bar */}
      <View style={styles.bar}>
        <Text style={styles.leftText}>Virtual wardrobe</Text>
        <Text style={styles.centerText}>Fall fashion</Text>
      </View>

      {/* Wardrobe content */}
      <View style={styles.wardrobeContainer}>
        <Image source={{ uri: topImage }} style={styles.image} />

        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={() => animateChange(tops, setTopImage)}>
            <FontAwesome6 name="angles-left" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => animateChange(tops, setTopImage)}>
            <FontAwesome6 name="angles-right" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <Image source={{ uri: bottomImage }} style={styles.image} />

        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={() => animateChange(bottoms, setBottomImage)}>
            <FontAwesome6 name="angles-left" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => animateChange(bottoms, setBottomImage)}>
            <FontAwesome6 name="angles-right" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom bar */}
      <View style={[styles.bar, styles.bottomBar]}>
        <Text style={styles.footerText}>Shoes • Jewelry • Scarves • Pantyhose • Pants • Sweaters</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bar: {
    height: 30,
    backgroundColor: "#2b2039",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    zIndex: 10,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    width: "100%",
  },
  leftText: {
    color: "#fff",
    fontSize: 10,
    textTransform: "uppercase",
  },
  centerText: {
    position: "absolute",
    left: "50%",
    transform: [{ translateX: -50 }],
    color: "#fff",
    fontSize: 10,
    textTransform: "uppercase",
  },
  footerText: {
    color: "#fff",
    fontSize: 10,
    textAlign: "center",
    width: "100%",
    textTransform: "uppercase",
  },
  wardrobeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  image: {
    width: 125,
    height: 125,
    resizeMode: "cover",
    marginVertical: 8,
    backgroundColor: "#c0c0c0",
    borderRadius: 8,
    padding: 4,
    borderWidth: 1,
    borderColor: "#808080",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 20,
    marginVertical: 10,
  },
});
