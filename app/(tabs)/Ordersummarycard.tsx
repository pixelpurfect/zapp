import React, { useState, useEffect} from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
  Modal,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCart } from "@/components/CartProvider";
import { useAuth } from '@/components/AuthContext';
import RecommendPage from "@/components/RecommendPage";

// LocationPopup Component
interface LocationPopupProps {
  visible: boolean;
  onClose: () => void;
  onLocationSubmit: (location: string) => void;
}

const LocationPopup: React.FC<LocationPopupProps> = ({ visible, onClose, onLocationSubmit }) => {
  const [location, setLocation] = useState('');

  const handleSubmit = () => {
    if (location.trim()) {
      onLocationSubmit(location);
      setLocation('');
    } else {
      Alert.alert('Please enter a valid location!');
    }
  };

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.overlayLocation}>
        <View style={styles.popupLocation}>
          <Text style={styles.titleLocation}>Where are you?</Text>
          <TextInput
            style={styles.inputLocation}
            placeholder="Enter Building and Room"
            value={location}
            onChangeText={setLocation}
          />
          <TouchableOpacity style={styles.submitButtonLocation} onPress={handleSubmit}>
            <Text style={styles.buttonTextLocation}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButtonLocation} onPress={onClose}>
            <Text style={styles.buttonTextLocation}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

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

const OrderSummaryCard: React.FC = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { cartItems: orderItems, updateQuantity, clearCart } = useCart();
  const { user, isAuthenticated, login, placeOrder, userLocation, setUserLocation } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showLocationPopup, setShowLocationPopup] = useState(false);
   

  // Handle login
  const handleLogin = async () => {
    try {
      await login(email, password);
      setErrorMessage("");
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  // Increment and decrement item quantity
  const incrementQuantity = (id: number) => {
    const item = orderItems.find((item) => item.id === id);
    if (item) {
      updateQuantity(id, item.quantity + 1);
    }
  };

  const decrementQuantity = (id: number) => {
    const item = orderItems.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      updateQuantity(id, item.quantity - 1);
    }
  };

  const totalPrice = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCharge = totalPrice * 0.1;
  const finalAmount = totalPrice + deliveryCharge;

  // Handle payment and order placement
  const handlePay = async () => {
    if (!isAuthenticated) {
      Alert.alert("Error", "Please login to place an order.");
      return;
    }

    if (!userLocation) {
      setShowLocationPopup(true);
      return;
    }

    try {
      const formattedOrderItems = orderItems.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        description: item.description,
        image: item.image,
        rating: item.rating,
        weight: item.weight
      }));

      const orderId = await placeOrder(formattedOrderItems, finalAmount);
      clearCart();
      
      Alert.alert(
        "Order Placed Successfully",
        `Your order ID is: ${orderId}\nDelivery Location: ${userLocation}\nTotal Amount: ₹${finalAmount.toFixed(2)}`,
        [
          {
            text: "OK",
            onPress: () => router.push("/HomeScreen")
          }
        ]
      );
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  // Handle back navigation
  const handleBack = () => {
    const from = params.from as string;
    if (from === "MenuList") {
      router.push("/MenuList");
    } else {
      router.push("/HomeScreen");
    }
  };

  if (orderItems.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Your Cart is Empty</Text>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>Back to Menu</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <FontAwesome name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.header}>Your Cart</Text>
      <ScrollView style={styles.scrollView}>
        {!isAuthenticated ? (
          <View style={styles.authContainer}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter Email"
              keyboardType="email-address"
              style={styles.input}
            />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter Password"
              secureTextEntry
              style={styles.input}
            />
            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
            <Button title="Login" onPress={handleLogin} />
            <TouchableOpacity onPress={() => router.push("/")}>
              <Text style={styles.signupLink}>Need an account? Sign Up</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {orderItems.map((item) => (
              <View key={item.id} style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.image} />
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
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity
                        onPress={() => decrementQuantity(item.id)}
                        style={styles.quantityButton}
                      >
                        <Text style={styles.quantityButtonText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.quantity}>{item.quantity}</Text>
                      <TouchableOpacity
                        onPress={() => incrementQuantity(item.id)}
                        style={styles.quantityButton}
                      >
                        <Text style={styles.quantityButtonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.price}>₹{(item.price * item.quantity).toFixed(2)}</Text>
                  </View>
                </View>
              </View>
            ))}
          </>
        )}

        <LocationPopup
          visible={showLocationPopup}
          onClose={() => setShowLocationPopup(false)}
          onLocationSubmit={(location) => {
            setUserLocation(location);
            setShowLocationPopup(false);
            handlePay();
          }}
        />

        <RecommendPage />

        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>Food Cost: ₹{totalPrice.toFixed(2)}</Text>
          <Text style={styles.summaryText}>Delivery Charge: ₹{deliveryCharge.toFixed(2)}</Text>
          <Text style={[styles.summaryText, styles.totalText]}>
            Total: ₹{finalAmount.toFixed(2)}
          </Text>
        </View>

        {isAuthenticated && (
          <TouchableOpacity style={styles.payButton} onPress={handlePay}>
            <Text style={styles.payButtonText}>
              PAY ₹{finalAmount.toFixed(2)}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 10,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    marginTop: 40,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 1,
    padding: 10,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
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
    fontSize: 12,
    marginLeft: 5,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: "#f0c02f",
    padding: 5,
    borderRadius: 4,
  },
  quantityButtonText: {
    fontSize: 18,
    color: "#fff",
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  summaryContainer: {
    marginTop: 20,
    paddingTop: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  summaryText: {
    fontSize: 16,
    color: "#333",
  },
  totalText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  payButton: {
    backgroundColor: "#f0c02f",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  payButtonText: {
    fontSize: 18,
    color: "#fff",
  },
  authContainer: {
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  input: {
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
    padding: 10,
    borderRadius: 6,
    fontSize: 16,
  },
  error: {
    color: "red",
    fontSize: 14,
    marginVertical: 5,
  },
  signupLink: {
    color: '#007bff',
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  // Location Popup Styles
  overlayLocation: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popupLocation: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  titleLocation: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  inputLocation: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
  },
  submitButtonLocation: {
    backgroundColor: '#f0c02f',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  closeButtonLocation: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonTextLocation: {
    color: '#fff',
    fontSize: 16,
  },
});

export default OrderSummaryCard;