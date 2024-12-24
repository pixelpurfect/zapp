import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

// Get screen width for responsive design
const { width } = Dimensions.get('window');

const CCard = ({ customStyles }: { customStyles: any }) => {
  return (
    <View style={[customStyles.cardContainer, { width: width * 0.9 }]}>
      {/* Left side text */}
      <View style={customStyles.textContainer}>
        <Text style={[customStyles.title, { fontSize: width > 400 ? 22 : 18 }]}>
          CLASSIC BIRYANI
        </Text>
        <Text style={[customStyles.subtitle, { fontSize: width > 400 ? 16 : 14 }]}>
          Java Green
        </Text>
        <Text style={[customStyles.description, { fontSize: width > 400 ? 14 : 12 }]}>
          A delicious and aromatic biryani made with long-grain rice, tender chicken, and fragrant spices.
        </Text>
      </View>

      {/* Right side image */}
      <View style={customStyles.imageContainer}>
        <Image
          source={require('../assets/images/biryani.png')} // Ensure the file path is correct
          style={[customStyles.image, { width: width > 400 ? '100%' : '80%' }]} // Adjust image size
        />
      </View>
    </View>
  );
};

export default CCard;
