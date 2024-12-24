import React, { useState } from 'react';
import { TextInput, Button, Text, View } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unknown error occurred.');
      }
    }
  };

  const handleLogout = () => {
    auth.signOut();
    setIsLoggedIn(false);
  };

  return (
    <View style={{ padding: 20 }}>
      {!isLoggedIn ? (
        <>
          <Text>Login</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email"
            keyboardType="email-address"
            style={{ borderBottomWidth: 1, marginBottom: 10 }}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password"
            secureTextEntry
            style={{ borderBottomWidth: 1, marginBottom: 20 }}
          />
          {errorMessage ? <Text style={{ color: 'red' }}>{errorMessage}</Text> : null}
          <Button title="Login" onPress={handleLogin} />
        </>
      ) : (
        <View>
          <Text>Welcome, you are logged in!</Text>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      )}
    </View>
  );
};

export default LoginScreen;



