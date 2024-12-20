import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';

// many 
export default function MenuList() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>MenuList</Text>
        <Text style={styles.text}>PIZZA</Text>
        <Text style={styles.text}>Noodles</Text>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0', // Light background for visibility
    },
    text: {
      color: '#000', // Ensure text is visible
      fontSize: 16,
      margin: 5,
    },
  });

