import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CCard from "@/components/CCard"; 
import Navbar from '@/components/Navbar';

export default function MenuList() {
  // Define custom styles for the card
  const customCardStyles = {
    cardContainer: {
      flexDirection: 'row',
      backgroundColor: '#282828', // Updated to a dark gray for a cleaner look
      borderRadius: 15,
      marginVertical: 10,
      padding: 15,
      shadowColor: '#000', // Shadow for iOS
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 6, // Shadow for Android
    },
    textContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingRight: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#ffffff',
    },
    subtitle: {
      fontSize: 16,
      color: '#bcbcbc',
      marginTop: 5,
    },
    description: {
      fontSize: 14,
      color: '#aaaaaa',
      marginTop: 5,
    },
    imageContainer: {
      width: 100,
      height: 80,
      borderRadius: 10,
      overflow: 'hidden',
      marginLeft: 10,
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
  };

  return (
    <View style={styles.container}>
      <Navbar />
      
      {/* Fixed Biryani Card */}
      <View style={styles.biryaniCard}>
        <Text style={styles.biryaniTitle}>Special Biryani</Text>
        <Text style={styles.biryaniDescription}>
          Taste the authentic flavors of Biryani, made with the finest ingredients!
        </Text>
      </View>

      {/* Scrollable List of CCard components */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.heading}>Menu List</Text>

        <View style={styles.cardWrapper}>
          <CCard customStyles={customCardStyles} />
        </View>
        <View style={styles.cardWrapper}>
          <CCard customStyles={customCardStyles} />
        </View>
        <View style={styles.cardWrapper}>
          <CCard customStyles={customCardStyles} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Light gray background for contrast
  },
  biryaniCard: {
    backgroundColor: '#ffde59', // Bright yellow for special card
    padding: 20,
    borderRadius: 15,
    margin: 20,
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6, // Shadow for Android
  },
  biryaniTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  biryaniDescription: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 20, // Padding at the bottom of the scrollable content
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  cardWrapper: {
    marginBottom: 15, // Spacing between cards
  },
});
