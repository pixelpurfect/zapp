import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';

const EmailVerification = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Check Your Email!</Text>
      <Text>A verification link has been sent to your email address. Please verify to continue.</Text>
      <Button title="Go to Login" onPress={() => router.push('/LoginSignupScreen')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default EmailVerification;


