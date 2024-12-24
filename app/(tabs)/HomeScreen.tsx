import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import Navbar from '@/components/Navbar';
import BiryaniCardScreen from '@/components/Biryanicard';
import SearchBar from '@/components/SearchBar';
import MenuBar from '@/components/Menubar';
import CCard from "@/components/CCard";  // Import CCard
import { Picker } from '@react-native-picker/picker'; // Import Picker for dropdown
import { Link } from 'expo-router'; // Import Link for navigation
import FloatingMenu from '@/components/FloatingMenu';



const { width, height } = Dimensions.get('window'); // Get screen dimensions

export default function HomeScreen() {
  const [category, setCategory] = useState('');

  const handleProfilePress = () => {
    // Your logic for navigating to profile or showing profile
    console.log('Profile Pressed');
  };

  const handleLikedFoodsPress = () => {
    // Your logic for showing liked foods or navigating
    console.log('Liked Foods Pressed');
  };

  const customCardStyles = {
    cardContainer: {
      flexDirection: 'row', 
      backgroundColor: '#000000',
      borderRadius: 10,
      marginVertical: 10,
      padding: 15,
      overflow: 'hidden',
      width: width * 0.9, // 90% of screen width for responsiveness
    },
    textContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingRight: 15,
    },
    title: {
      fontSize: width > 400 ? 22 : 18,
      fontWeight: 'bold',
      color: '#ffffff',
    },
    subtitle: {
      fontSize: width > 400 ? 16 : 14,
      color: '#cccccc',
    },
    description: {
      fontSize: width > 400 ? 14 : 12,
      color: '#aaaaaa',
    },
    imageContainer: {
      width: '30%',
      height: 100,
      borderRadius: 10,
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
  };

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <Navbar />
      
      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.searchBarContainer}>
          <SearchBar />
        </View>

        <Text style={styles.heading}>Popular foods!</Text>
        
        {/* CCard component - Touchable to navigate to MenuList */}
        <View style={styles.cardWrapper}>
          <Link href="/MenuList">
            <CCard customStyles={customCardStyles} />
          </Link>
        </View>

        <BiryaniCardScreen />

        {/* Category Dropdown (Using Picker from React Native) */}
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownLabel}>Choose Category</Text>
          <Picker
            selectedValue={category}
            style={styles.dropdown}
          >
            <Picker.Item label="None" value="" />
            <Picker.Item label="Popular Food" value="popularFood" />
            <Picker.Item label="Hotel List" value="hotelList" />
          </Picker>
        </View>

        {/* Static Message for Dropdown */}
        <View style={styles.staticMessageContainer}>
          <Text style={styles.staticMessage}>
            You can select a category, but nothing will change for now.
          </Text>
        </View>

        <Text style={styles.heading}>Hotel List</Text>
        
        {/* Add CCard below BiryaniCardScreen */}
        <View style={styles.cardWrapper}>
          <Link href="/MenuList">
            <CCard customStyles={customCardStyles} />
          </Link>
        </View>

        <View style={styles.cardWrapper}>
          <Link href="/MenuList">
            <CCard customStyles={customCardStyles} />
          </Link>
        </View>
      </ScrollView>

       {/* Floating Menu at the bottom of the screen */}
       <FloatingMenu
        onProfilePress={handleProfilePress}
        onLikedFoodsPress={handleLikedFoodsPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  searchBarContainer: {
    marginTop: 10,
    marginHorizontal: 20,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  scrollContainer: {
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 20,
    color: '#333',
  },
  dropdownContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  dropdown: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    height: 50,
  },
  dropdownLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  staticMessageContainer: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  staticMessage: {
    fontSize: 14,
    color: '#777',
    fontStyle: 'italic',
  },
  cardWrapper: {
    marginVertical: 10,
    alignItems: 'center', // Centering the cards
  },
});
