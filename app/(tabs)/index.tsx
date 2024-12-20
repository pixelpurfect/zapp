import { View, Text, StyleSheet } from 'react-native';
import React from 'react'
import { Link } from 'expo-router';
// basically a home page of our app 
export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>lauch screen</Text>
      <Link href="/HomeScreen" style={styles.button}>
        Go to About screen
      </Link>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});