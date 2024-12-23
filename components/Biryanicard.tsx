import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // For the star icon

// BiryaniCard Component
const BiryaniCard: React.FC<{
  image: string;
  subtitle: string;
  title: string;
  description: string;
  rating: number;
  price: number;
}> = ({ image, subtitle, title, description, rating, price }) => {
  return (
    <View style={styles.card}>
      {/* Image */}
      <Image 
        source={{ uri: image }} 
        style={styles.image} 
      />
      {/* Text Content */}
      <View style={styles.textContainer}>
        {/* Title */}
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Text style={styles.title}>{title}</Text>
        {/* Description */}
        <Text style={styles.description}>{description}</Text>
        {/* Rating and Price */}
        <View style={styles.footer}>
          <View style={styles.rating}>
            <FontAwesome name="star" size={18} color="#f0c02f" />
            <Text style={styles.ratingText}>{rating}</Text>
          </View>
          <Text style={styles.price}>{`₹${price} /-`}</Text>
        </View>
      </View>
    </View>
  );
};

// BiryaniCardScreen to render multiple cards
const BiryaniCardScreen: React.FC = () => {
  // Example data for multiple cards
  const biryaniData = [
    {
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Ffreebackground%2Fchicken-biryani-served-in-a-bowl_1461512.html&psig=AOvVaw3YP1Lp2JVpSZ59TL_5iN-f&ust=1735037431997000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCIDX8p_cvYoDFQAAAAAdAAAAABAE",
      subtitle: "CLASSIC BIRYANI, JAVA GREEN",
      title: "Chicken Biryani",
      description:
        "Fluffy basmati rice layered over tender & succulent pieces of meat, accompanied with the mesmerizing aromas of spices, herbs & caramelized onions.",
      rating: 4.5,
      price: 100,
    },
    {
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Ffreebackground%2Fchicken-biryani-served-in-a-bowl_1461512.html&psig=AOvVaw3YP1Lp2JVpSZ59TL_5iN-f&ust=1735037431997000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCIDX8p_cvYoDFQAAAAAdAAAAABAE",
      subtitle: "CLASSIC BIRYANI, JAVA GREEN",
      title: "Mutton Biryani",
      description:
        "Tender mutton pieces cooked to perfection in layers of fragrant basmati rice, infused with aromatic spices and herbs.",
      rating: 4.7,
      price: 180,
    },
    {
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Ffreebackground%2Fchicken-biryani-served-in-a-bowl_1461512.html&psig=AOvVaw3YP1Lp2JVpSZ59TL_5iN-f&ust=1735037431997000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCIDX8p_cvYoDFQAAAAAdAAAAABAE",
      subtitle: "CLASSIC BIRYANI, JAVA GREEN",
      title: "Veg Biryani",
      description:
        "A vegetarian delight with mixed vegetables cooked in layers of basmati rice, delicately spiced and topped with caramelized onions.",
      rating: 4.3,
      price: 90,
    },
  ];

  return (
    <ScrollView style={styles.screenContainer}>
      {biryaniData.map((item, index) => (
        <BiryaniCard
          key={index}
          image={item.image}
          subtitle={item.subtitle}
          title={item.title}
          description={item.description}
          rating={item.rating}
          price={item.price}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 10,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  textContainer: {
    flex: 1,
    padding: 10,
  },
  subtitle: {
    fontSize: 12,
    color: "#888",
    fontWeight: "600",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 5,
  },
  description: {
    fontSize: 12,
    color: "#555",
    marginVertical: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default BiryaniCardScreen;
