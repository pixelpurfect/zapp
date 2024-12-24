import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, Image, StyleSheet, StatusBar, TouchableWithoutFeedback } from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter from expo-router

export default function Index() {
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks the current image index
  const opacity = useRef(new Animated.Value(0)).current; // Initial opacity for fade-in effect

  // Router for navigation
  const router = useRouter();

  // Array of images to be shown in slideshow
  const images = [
    require('../../assets/images/sample.jpeg'),
    require('../../assets/images/sample1.jpg'),
    require('../../assets/images/sample2.jpeg'),
  ];

  // Function to loop through images
  const fadeInOutImages = () => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1, // Fade in to 100% opacity
        duration: 1500, // 1.5 seconds fade-in duration
        useNativeDriver: true,
      }),
      Animated.delay(2000), // Wait for 2 seconds before fading out
      Animated.timing(opacity, {
        toValue: 0, // Fade out to 0% opacity
        duration: 1500, // 1.5 seconds fade-out duration
        useNativeDriver: true,
      }),
    ]).start(() => {
      // After fading out, move to the next image and repeat the animation
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Loop through images
    });
  };

  // Set up the slideshow to repeat indefinitely
  useEffect(() => {
    const interval = setInterval(() => {
      fadeInOutImages();
    }, 5000); // Repeat every 5 seconds

    // Start the slideshow when the component is mounted
    fadeInOutImages();

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, []);

  // Function to handle screen touch (navigation to HomeScreen)
  const handleTouch = () => {
    router.push('/HomeScreen'); // Navigate to HomeScreen.tsx
  };
  // EmailVerificationScreen
  return (
    <TouchableWithoutFeedback onPress={handleTouch}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        {/* Zapp logo at the top */}
        <Image source={require('../../assets/images/zapp.jpeg')} style={styles.logo} />

        {/* Slideshow images with fade-in/out animation */}
        <Animated.Image
          source={images[currentIndex]} // Dynamically change the image based on currentIndex
          style={[styles.mainImage, { opacity }]} // Apply the fade effect to each image
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginTop: 100,
  },
  mainImage: {
    width: '100%',
    height: '80%',
    resizeMode: 'cover',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop: 20,
  },
});

