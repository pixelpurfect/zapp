import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase/Config';
import { collection, addDoc } from 'firebase/firestore';

const SignUpScreen = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Create a new document in the 'zappers' collection
      await addDoc(collection(db, 'zappers'), {
        uid: user.uid,
        email: user.email,
        createdAt: new Date(),
      });
  
      Alert.alert('Sign Up', 'User registered successfully.');
      navigation.navigate('Login'); // Navigate to login screen after successful sign up
    } catch (error) {
      // Type assertion to tell TypeScript that `error` is an instance of Error
      const e = error as Error;
      console.error('Error during sign up: ', e.message);  // Accessing the message property
      Alert.alert('Error', e.message);
    }
  };
  

  return (
    <View>
      <Text>Sign Up</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default SignUpScreen;
