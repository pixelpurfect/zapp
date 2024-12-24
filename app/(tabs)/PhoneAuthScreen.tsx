import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';  // Import auth from firebaseConfig

const PhoneAuthScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [code, setCode] = useState('');
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Send OTP to the phone number
  const sendOTP = async () => {
    try {
      const phoneProvider = new PhoneAuthProvider(auth);

      // Since we're bypassing reCAPTCHA for testing, we don't need the recaptchaVerifier
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber, // Ensure the phone number is in E.164 format: "+1234567890"
      );

      setVerificationId(verificationId);
      setIsOTPSent(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unknown error occurred.');
      }
    }
  };

  // Verify OTP and sign in the user
  const verifyOTP = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, code);
      await signInWithCredential(auth, credential);
      console.log('User signed in successfully');
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
      <Text>Phone Authentication</Text>
      {!isOTPSent ? (
        <>
          <TextInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
          />
          <Button title="Send OTP" onPress={sendOTP} />
        </>
      ) : (
        <>
          <TextInput
            value={code}
            onChangeText={setCode}
            placeholder="Enter OTP"
            keyboardType="numeric"
          />
          <Button title="Verify OTP" onPress={verifyOTP} />
        </>
      )}

      {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
    </View>
  );
};

export default PhoneAuthScreen;

