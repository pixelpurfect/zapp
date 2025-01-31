
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { PhoneAuthProvider, signInWithCredential, RecaptchaVerifier } from 'firebase/auth';
import { auth } from '../../firebase/Config';  // Import auth from firebaseConfig

const PhoneAuthScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [code, setCode] = useState('');
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const recaptchaVerifier = React.useRef(null);

  // Send OTP to the phone number
  const sendOTP = async () => {
    try {
      if (!recaptchaVerifier.current) {
        throw new Error('reCAPTCHA verifier not initialized.');
      }

      const phoneProvider = new PhoneAuthProvider(auth);

      // Use the recaptchaVerifier for reCAPTCHA challenge
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber, 
        recaptchaVerifier.current // Add reCAPTCHA verifier
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
    <View style={styles.container}>
      <Text style={styles.heading}>Phone Authentication</Text>
      {!isOTPSent ? (
        <>
          <TextInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
            style={styles.input}
          />
          {/* reCAPTCHA Verifier */}
          <div ref={recaptchaVerifier} />
          <Button title="Send OTP" onPress={sendOTP} />
        </>
      ) : (
        <>
          <TextInput
            value={code}
            onChangeText={setCode}
            placeholder="Enter OTP"
            keyboardType="numeric"
            style={styles.input}
          />
          <Button title="Verify OTP" onPress={verifyOTP} />
        </>
      )}

      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 15,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default PhoneAuthScreen;
