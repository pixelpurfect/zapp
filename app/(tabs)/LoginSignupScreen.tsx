import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import { useAuth } from '../(tabs)/context/AuthContext';  // Use AuthContext
import { auth, db } from '../../firebase/Config';  // Firebase config
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { useRouter } from 'expo-router'; // For navigation

const LoginSignupScreen = () => {
  const { user } = useAuth();
  const router = useRouter(); // Hook for navigation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      if (firebaseUser.emailVerified) {
        // If email is verified, navigate to the Home screen
        Alert.alert('Login Successful', 'You are now logged in.');
        router.push('/HomeScreen'); // Navigate to the Home screen
      } else {
        // If email is not verified
        setErrorMessage('Please verify your email before logging in.');
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Send email verification
      await sendEmailVerification(firebaseUser);

      // Save user to the 'zappers' collection in Firestore
      await addDoc(collection(db, 'zappers'), {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        createdAt: new Date(),
      });

      Alert.alert('Check your email', 'A verification link has been sent.');
      router.push('/EmailVerification'); // Redirect to the email verification page
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <View style={styles.container}>
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
      <Button title="Login" onPress={handleLogin} />
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      <Button title="Sign Up" onPress={handleSignUp} />
      <Text style={styles.linkText} onPress={() => router.push('/PasswordReset')}>
        Forgot Password?
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
  },
  linkText: {
    color: '#1e90ff',
    marginTop: 16,
    textAlign: 'center',
  },
});

export default LoginSignupScreen;

