import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, Image, StyleSheet, StatusBar, Text, ScrollView } from 'react-native';
import { Link } from 'expo-router'; // Import Link from expo-router

export default function Index() {
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks the current image index
  const opacity = useRef(new Animated.Value(0)).current; // Initial opacity for fade-in effect

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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* ScrollView around the content that needs to be scrollable */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Navigation links at the top */}
        <View style={styles.navButtons}>
          <View style={styles.navButton}>
            <Link href="/HomeScreen">
              <Text style={styles.navButtonText}>Go to HomeScreen</Text>
            </Link>
          </View>
          <View style={styles.navButton}>
            <Link href="/StationHomeScreen">
              <Text style={styles.navButtonText}>Go to StationHomeScreen</Text>
            </Link>
          </View>
          <View style={styles.navButton}>
            <Link href="/Printoutspage">
              <Text style={styles.navButtonText}>Go to PrintHomeScreen</Text>
            </Link>
          </View>
          <View style={styles.navButton}>
            <Link href="/MainScreen">
              <Text style={styles.navButtonText}>Go to Addrestaruant</Text>
            </Link>
          </View>
          <View style={styles.navButton}>
            <Link href="/EmailVerification">
              <Text style={styles.navButtonText}>sign up email</Text>
            </Link>
          </View>
        </View>

        {/* Zapp logo at the top */}
        <Image source={require('../../assets/images/zapp.jpeg')} style={styles.logo} />

        {/* Slideshow images with fade-in/out animation */}
        <Animated.Image
          source={images[currentIndex]} // Dynamically change the image based on currentIndex
          style={[styles.mainImage, { opacity }]} // Apply the fade effect to each image
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingBottom: 20, // Optional: Add padding at the bottom if needed
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginTop: 50, // Adjusted margin to make room for navigation links
  },
  mainImage: {
    width: '100%',
    height: 300, // Set height explicitly so the image doesn't stretch too much
    resizeMode: 'cover',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop: 20,
  },
  navButtons: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'transparent', // Ensure the buttons aren't being hidden
    marginTop: 20, // Space between the navigation and logo/image
  },
  navButton: {
    backgroundColor: '#ff6347', // Tomato color for the button
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1, // Debugging: Add a border to see if the button is rendering
    borderColor: '#fff', // Border color to make it visible
  },
  navButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
