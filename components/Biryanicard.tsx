import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const BiryaniCardScreen: React.FC = () => {
  // Animated component to add a floating effect for the button
  const floatingButton = new Animated.Value(0);

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(floatingButton, {
        toValue: 10,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(floatingButton, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      {/* Background Image with Gradient */}
      <ImageBackground
        source={{ uri: 'https://via.placeholder.com/800x400' }} // Replace with actual background image URL
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay}></View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* App Headline */}
          <Text style={styles.headline}>
            Discover the Best Biryani in Town
          </Text>
          
          {/* App Features (Icons or Text) */}
          <View style={styles.features}>
            <View style={styles.feature}>
              <FontAwesome name="location-arrow" size={24} color="#fff" />
              <Text style={styles.featureText}>Find Nearby Biryani</Text>
            </View>
            <View style={styles.feature}>
              <FontAwesome name="cutlery" size={24} color="#fff" />
              <Text style={styles.featureText}>Delicious Options</Text>
            </View>
            <View style={styles.feature}>
              <FontAwesome name="credit-card" size={24} color="#fff" />
              <Text style={styles.featureText}>Secure Payments</Text>
            </View>
          </View>

          {/* Call-to-action Button */}
          <Animated.View
            style={[styles.floatingButton, { transform: [{ translateY: floatingButton }] }]}
          >
            <TouchableOpacity style={styles.button} onPress={animateButton}>
              <Text style={styles.buttonText}>Start Ordering</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    borderRadius: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay to make text stand out
    borderRadius: 10,
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  headline: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 30,
  },
  feature: {
    alignItems: 'center',
  },
  featureText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
  floatingButton: {
    marginTop: 20,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: '#FF6347', // Button color
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation: 5, // Add shadow for Android
  },
  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default BiryaniCardScreen;
