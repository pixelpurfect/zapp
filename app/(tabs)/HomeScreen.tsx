import { View, ScrollView, StyleSheet } from 'react-native';
import Navbar from '@/components/Navbar'; // Assuming your Navbar is in the components folder

import BiryaniCardScreen from '@/components/Biryanicard'; // Assuming your BiryaniCardScreen is in the components folder
import SearchBar from '@/components/SearchBar';
import MenuBar from '@/components/Menubar';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { Animated } from 'react-native';
import React, { useState } from 'react';

// Home screen
export default function HomeScreen() {
  const [menuBarVisible, setMenuBarVisible] = useState(false); // State to control MenuBar visibility
  const translateY = new Animated.Value(0);

  // Toggle MenuBar visibility
  const toggleMenuBar = () => {
    setMenuBarVisible(!menuBarVisible);
  };

  const handleGesture = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    { useNativeDriver: true }
  );

  return (
    <View style={styles.container}>
      {/* Navbar at the top */}
      <Navbar />

      {/* SearchBar container */}
      <View style={styles.searchBarContainer}>
        <SearchBar />
      </View>

      {/* Biryani Cards - scrollable */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Card placed here with custom styles */}
        <Card customStyles={cardStyles} />

        {/* Original BiryaniCardScreen component */}
        <BiryaniCardScreen />
      </ScrollView>

      {/* MenuBar at the bottom */}
      <View style={styles.menuBarContainer}>
        <MenuBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8', // Light background for the home screen
  },
  scrollContainer: {
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  searchBarContainer: {
    paddingTop: 10, // Adds some spacing between the Navbar and the SearchBar
    paddingHorizontal: 10, // Keeps the padding consistent
  },
  menuBarContainer: {
    position: 'absolute', // Fixing MenuBar at the bottom
    bottom: 0, // Sticks the MenuBar to the bottom
    left: 0,
    right: 0,
    paddingBottom: 10, // Ensures it doesn't overlap with screen edge
    borderTopLeftRadius: 20, // Optional: rounded corners for aesthetics
    borderTopRightRadius: 20, // Optional: rounded corners for aesthetics
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});

// Card styles to be applied in the HomeScreen
const cardStyles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row', // Horizontal layout for text and image
    backgroundColor: 'black', // Black background for card
    borderRadius: 10, // Rounded edges
    marginVertical: 10, // Margin for spacing
    padding: 15, // Padding inside card
    overflow: 'hidden', // Ensures image is clipped properly
  },
  textContainer: {
    flex: 1, // Takes up remaining space for text
    justifyContent: 'center', // Center text vertically
    paddingRight: 15, // Adds space between text and image
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff', // Bright white text for title
  },
  subtitle: {
    fontSize: 16,
    color: '#cccccc', // Lighter gray for subtitle
  },
  description: {
    fontSize: 12,
    color: '#aaaaaa', // Even lighter gray for description text
  },
  imageContainer: {
    width: 120, // Fixed width for the image container
    height: 100, // Adjust height for the image
    borderRadius: 10, // Ensure rounded corners on the image side
    overflow: 'hidden', // Hide overflowed image parts
  },
  image: {
    width: '100%', // Image should take up full width of container
    height: '100%', // Image should take up full height of container
    resizeMode: 'cover', // Image should cover the area without stretching
  },
});
