import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { db, auth } from '../../firebase/Config';
import { collection, getDocs, addDoc, writeBatch, deleteDoc } from 'firebase/firestore';

// Define the CartItem type
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const CartScreen = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: '1', name: 'Pizza', price: 10.99, quantity: 1 },
    { id: '2', name: 'Burger', price: 5.99, quantity: 1 },
  ]);

  const handlePlaceOrder = async () => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const orderRef = collection(db, 'orders');
      const orderData = {
        userId,
        email: auth.currentUser.email, // Store the email of the logged-in user
        items: cartItems,
        total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        orderDate: new Date(),
      };

      try {
        // Add the order to the orders collection
        const docRef = await addDoc(orderRef, orderData);
        
        // Clear the cart after the order is placed
        await clearCart();
        
        Alert.alert('Order Placed', `Order ID: ${docRef.id}`);
      } catch (error) {
        Alert.alert('Error', 'There was an issue placing your order.');
      }
    }
  };

  const clearCart = async () => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const cartRef = collection(db, `zappers/${userId}/cart`);
      const cartSnapshot = await getDocs(cartRef);
      const batch = writeBatch(db);

      cartSnapshot.docs.forEach(docSnapshot => batch.delete(docSnapshot.ref));

      await batch.commit();
      setCartItems([]); // Update the cart UI
    }
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Your Cart:</Text>
      {cartItems.length === 0 ? (
        <Text>No items in your cart.</Text>
      ) : (
        cartItems.map(item => (
          <View key={item.id} style={{ marginBottom: 10 }}>
            <Text>{item.name} - ${item.price} x {item.quantity}</Text>
            <Button title="Remove" onPress={() => handleRemoveItem(item.id)} />
          </View>
        ))
      )}
      {cartItems.length > 0 && (
        <Button title="Place Order" onPress={handlePlaceOrder} />
      )}
      <Button title="Go to Profile" onPress={() => console.log("Navigate to Profile")} />
    </View>
  );
};

export default CartScreen;






