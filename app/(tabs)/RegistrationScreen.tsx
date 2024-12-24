import React, { useState } from 'react';
import { TextInput, Button, Text, View } from 'react-native';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';

const RegistrationScreen = ({ onNavigateToVerification }: { onNavigateToVerification: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);

      // After registration, manually navigate to the Email Verification screen
      onNavigateToVerification();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unknown error occurred.');
      }
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Register</Text>
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
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default RegistrationScreen;
