import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { auth } from '../../config/firebaseConfig';
import { sendEmailVerification } from 'firebase/auth';

const EmailVerificationScreen = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const checkVerification = async () => {
    try {
      const user = auth.currentUser;
      if (user && user.emailVerified) {
        setIsVerified(true);
      } else {
        setErrorMessage('Please verify your email first.');
      }
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
      <Text>Email Verification</Text>
      <Button title="Check Verification Status" onPress={checkVerification} />
      {isVerified ? <Text>Your email is verified!</Text> : <Text>{errorMessage}</Text>}
    </View>
  );
};

export default EmailVerificationScreen;

