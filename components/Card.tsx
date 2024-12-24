import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface CardProps {
  customStyles: any; // Accept custom styles as a prop
}
const function Card({ customStyles }: CardProps) {
  return (
    <View style={customStyles.cardContainer}>
      {/* Left side text */}
      <View style={customStyles.textContainer}>
        <Text style={customStyles.title}>CLASSIC BIRYANI</Text>
        <Text style={customStyles.subtitle}>Java Green</Text>
        <Text style={customStyles.description}>
          A delicious and aromatic biryani made with long-grain rice, tender chicken, and fragrant spices.
        </Text>
      </View>

      {/* Right side image */}
      <View style={customStyles.imageContainer}>
        <Image
          source={require('../assets/images/biryani.png')} // Corrected path
          style={customStyles.image}
        />
      </View>
    </View>
  );
}


export default Card;





