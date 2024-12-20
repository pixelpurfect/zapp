import { Link } from 'expo-router';
import { Text, View, StyleSheet } from 'react-native';
import React from 'react'
// hotel screen 
// zapper toggle 
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home screen</Text>
      <Link href={'/MenuList'} style = {styles.button}> classic briyani </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
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
