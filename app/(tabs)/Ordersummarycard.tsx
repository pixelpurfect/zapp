import React, { useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import PaymentSuccessPopup from '@/components/paymentpopup';
import PaymentUnsuccessfulPopup from '@/components/Paymentunsuccessful';



type OrderItem = {
  id: number;
  image: string;
  title: string;
  weight: string;
  description: string;
  rating: number;
  price: number;
  quantity: number;
};

const Ordersummarycard: React.FC = () => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    {
      id: 1,
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fthegastronomicbong.com%2Fkolkata-style-mutton-biryani%2F&psig=AOvVaw302Y7xLBLaM9-IIXgka4kO&ust=1735105229282000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIjJ6ufYv4oDFQAAAAAdAAAAABAE",
      title: "Chicken Biryani",
      weight: "300g",
      description: "Fluffy basmati rice layered over tender & succulent pieces of meat, accompanied with the mesmerizing aromas of spices, herbs & caramelized onions.",
      rating: 4.5,
      price: 100,
      quantity: 1,
    },
    {
      id: 2,
      image: "hhttps://www.google.com/url?sa=i&url=https%3A%2F%2Fthegastronomicbong.com%2Fkolkata-style-mutton-biryani%2F&psig=AOvVaw302Y7xLBLaM9-IIXgka4kO&ust=1735105229282000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIjJ6ufYv4oDFQAAAAAdAAAAABAE",
      title: "Chicken Biryani",
      weight: "300g",
      description: "Fluffy basmati rice layered over tender & succulent pieces of meat, accompanied with the mesmerizing aromas of spices, herbs & caramelized onions.",
      rating: 4.5,
      price: 100,
      quantity: 1,
    },
    {
      id: 3,
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fthegastronomicbong.com%2Fkolkata-style-mutton-biryani%2F&psig=AOvVaw302Y7xLBLaM9-IIXgka4kO&ust=1735105229282000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIjJ6ufYv4oDFQAAAAAdAAAAABAE",
      title: "Chicken Biryani",
      weight: "300g",
      description: "Fluffy basmati rice layered over tender & succulent pieces of meat, accompanied with the mesmerizing aromas of spices, herbs & caramelized onions.",
      rating: 4.5,
      price: 100,
      quantity: 1,
    },
  ]);

  // Increment quantity
  const incrementQuantity = (id: number) => {
    const updatedItems = orderItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setOrderItems(updatedItems);
  };

  // Decrement quantity
  const decrementQuantity = (id: number) => {
    const updatedItems = orderItems.map((item) =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setOrderItems(updatedItems);
  };

  // Calculate total price
  const totalPrice = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Pay button action
  const handlePay = () => {
    Alert.alert("Payment", `You have paid ₹${totalPrice.toFixed(2)}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>
      <ScrollView>
        {orderItems.map((item) => (
          <View key={item.id} style={styles.card}>
            {/* Image */}
            <Image source={{ uri: item.image }} style={styles.image} />
            {/* Details */}
            <View style={styles.detailsContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.weight}>{item.weight}</Text>
              <Text style={styles.description} numberOfLines={2}>
                {item.description}
              </Text>
              <View style={styles.footer}>
                <View style={styles.ratingContainer}>
                  <FontAwesome name="star" size={16} color="#f0c02f" />
                  <Text style={styles.rating}>{item.rating}</Text>
                </View>
                {/* Quantity controls */}
                <View style={styles.quantityContainer}>
                  <TouchableOpacity onPress={() => decrementQuantity(item.id)} style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => incrementQuantity(item.id)} style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
                {/* Price */}
                <Text style={styles.price}>{`₹${item.price * item.quantity}`}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      {/* Summary */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Food Cost: ₹{totalPrice.toFixed(2)}</Text>
        <Text style={styles.summaryText}>Delivery Charge: ₹30.00</Text>
        <Text style={styles.summaryText}>Total: ₹{(totalPrice + 30).toFixed(2)}</Text>
      </View>
      {/* Pay Button */}
      <TouchableOpacity style={styles.payButton} onPress={handlePay}>
        <Text style={styles.payButtonText}>{`PAY ₹${(totalPrice + 30).toFixed(2)}`}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  weight: {
    fontSize: 12,
    color: "#666",
    marginVertical: 2,
  },
  description: {
    fontSize: 12,
    color: "#555",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 14,
    color: "#333",
    marginLeft: 5,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: "#ff6600",
    borderRadius: 4,
    padding: 5,
  },
  quantityButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
    color: "#333",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  summaryContainer: {
    marginTop: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
  },
  summaryText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  payButton: {
    backgroundColor: "#ff6600",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  payButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default Ordersummarycard;
