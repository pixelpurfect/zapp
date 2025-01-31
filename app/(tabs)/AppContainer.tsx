import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '../../firebase/Config';
import { collection, addDoc, getDocs, writeBatch, deleteDoc } from 'firebase/firestore';
import { User } from 'firebase/auth'

// Define types for CartItems
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// SignUpScreen Component
const SignUpScreen = ({ onSignUp }: { onSignUp: () => void }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const user = auth.currentUser;  // Check if the user is already logged in
  
    const handleSignUp = async () => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
  
        // Save user details in the 'zappers' collection
        await addDoc(collection(db, 'zappers'), {
          uid: user.uid,
          email: user.email,
          createdAt: new Date(),
        });
  
        Alert.alert('Sign Up', 'User registered successfully.');
        onSignUp(); // Navigate to Login after successful registration
      } catch (error: any) {
        Alert.alert('Error', error.message);
      }
    };
  
    // If the user is already logged in, navigate to the login or cart screen directly
    if (user) {
      onSignUp();  // Automatically navigate to login if user is logged in
      return null;  // Prevent rendering of sign-up screen
    }
  
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Sign Up</Text>
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
        <Button title="Sign Up" onPress={handleSignUp} />
        <TouchableOpacity onPress={onSignUp}>
          <Text style={styles.link}>Go to Login</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };
  

// LoginScreen Component
const LoginScreen = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin(); // Navigate to Cart after successful login
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const handleLogout = () => {
    signOut(auth);
    onLogin(); // Navigate back to login after logout
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Login</Text>
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
      <TouchableOpacity onPress={onLogin}>
        <Text style={styles.link}>Go to Sign Up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// CartScreen Component
const CartScreen = ({ onLogout }: { onLogout: () => void }) => {
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
          email: auth.currentUser.email,
          items: cartItems,
          total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
          orderDate: new Date(),
        };
  
        try {
          const docRef = await addDoc(orderRef, orderData);
  
          Alert.alert('Order Placed', `Order ID: ${docRef.id}`);
  
          setCartItems([]); // Clear cart after placing the order
        } catch (error) {
          Alert.alert('Error', 'There was an issue placing your order.');
        }
      }
    };
  
    const handleRemoveItem = (itemId: string) => {
      setCartItems(cartItems.filter(item => item.id !== itemId));
    };
  
    const handleLogout = async () => {
      try {
        await signOut(auth);
        onLogout();  // Navigate back to login after logout
      } catch (error: any) {
        Alert.alert('Error', 'There was an issue logging out.');
      }
    };
  
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Your Cart</Text>
        {cartItems.length === 0 ? (
          <Text>No items in your cart.</Text>
        ) : (
          cartItems.map(item => (
            <View key={item.id} style={styles.cartItem}>
              <Text>{item.name} - ${item.price} x {item.quantity}</Text>
              <Button title="Remove" onPress={() => handleRemoveItem(item.id)} />
            </View>
          ))
        )}
        {cartItems.length > 0 && (
          <Button title="Place Order" onPress={handlePlaceOrder} />
        )}
        
        {/* Logout Button */}
        <Button title="Logout" onPress={handleLogout} color="red" />
  
        <TouchableOpacity onPress={() => console.log("Navigate to Profile")}>
          <Text style={styles.link}>Go to Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };
  

// Main AppContainer Component
const AppContainer = () => {
    const [currentScreen, setCurrentScreen] = useState('signUp');
    const [user, setUser] = useState<any>(null);
  
    const navigateToSignUp = () => setCurrentScreen('signUp');
    const navigateToLogin = () => setCurrentScreen('login');
    const navigateToCart = () => setCurrentScreen('cart');
  
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          setUser(authUser);
          setCurrentScreen('cart');
        } else {
          setUser(null);
          setCurrentScreen('login');
        }
      });
      return unsubscribe;
    }, []);
  
    const handleLogout = () => {
      setUser(null); // Clear user state after logout
      setCurrentScreen('login'); // Navigate to the login screen
    };
  
    return (
      <View style={styles.appContainer}>
        {currentScreen === 'signUp' && <SignUpScreen onSignUp={navigateToLogin} />}
        {currentScreen === 'login' && <LoginScreen onLogin={navigateToCart} />}
        {currentScreen === 'cart' && <CartScreen onLogout={handleLogout} />}
      </View>
    );
  };
  

// Styles
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  cartItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  link: {
    color: 'blue',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});

export default AppContainer;

