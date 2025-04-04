import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Animated, Easing } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const BiryaniCardScreen: React.FC = () => {
  // Animated component to add a floating effect for the button
  const floatingButton = new Animated.Value(0);
  const buttonScale = new Animated.Value(1);

  const animateButton = () => {
    // Animate the floating button with a bounce effect
    Animated.sequence([
      Animated.timing(floatingButton, {
        toValue: 10,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.bounce,
      }),
      Animated.timing(floatingButton, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.bounce,
      }),
    ]).start();
  };

  // Button press effect (scale when pressed)
  const handleButtonPressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handleButtonPressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      {/* Background Image with Gradient Overlay */}
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
            <TouchableOpacity
              style={[styles.button, { transform: [{ scale: buttonScale }] }]}
              onPressIn={handleButtonPressIn}
              onPressOut={handleButtonPressOut}
              onPress={animateButton}
            >
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
    opacity: 0.9, // Slightly reduce the image opacity for better text visibility
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Darker overlay for contrast
    borderRadius: 10,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  headline: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 40,
  },
  feature: {
    alignItems: 'center',
    marginHorizontal: 15,
  },
  featureText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 8,
    textAlign: 'center',
  },
  floatingButton: {
    marginTop: 30,
    width: 220,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: '#FF6347', // Button color
    paddingVertical: 18,
    paddingHorizontal: 25,
    elevation: 10, // Add shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'uppercase',
  },
});

export default BiryaniCardScreen;

