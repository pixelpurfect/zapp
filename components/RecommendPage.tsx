import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

const RecommendPage: React.FC = () => {
  const recommendedItems = [
    {
      id: 1,
      name: "Ice Cream",
      description: "A delicious vanilla ice cream.",
      cost: 20,
      image: "https://via.placeholder.com/100?text=Ice+Cream",
    },
    {
      id: 2,
      name: "Pizza Slice",
      description: "A cheesy slice of pizza.",
      cost: 50,
      image: "https://via.placeholder.com/100?text=Pizza+Slice",
    },
    {
      id: 3,
      name: "Burger",
      description: "A juicy beef burger.",
      cost: 40,
      image: "https://via.placeholder.com/100?text=Burger",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Less item, More recommended ➡️</Text>
      <ScrollView horizontal style={styles.scrollView}>
        {recommendedItems.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.cost}>₹{item.cost}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scrollView: {
    flexDirection: "row",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginRight: 10,
    padding: 10,
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  description: {
    fontSize: 12,
    color: "#555",
    marginTop: 5,
  },
  cost: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },
});

export default RecommendPage;
