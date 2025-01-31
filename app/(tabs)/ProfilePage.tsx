import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Link, useRouter } from 'expo-router'; // Import Link and useRouter for navigation

const ProfilePage = () => {
  const [profileImage, setProfileImage] = useState(null);
  const router = useRouter(); // Hook for navigation

  // Function to handle image upload
  const handleImageUpload = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setProfileImage(pickerResult.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>PROFILE</Text>
        <TouchableOpacity onPress={() => router.push('/HomeScreen')}>
          {/* Navigates back to HomeScreen */}
          <Text style={styles.close}>×</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Info with Upload Button */}
      <View style={styles.profileInfo}>
        <TouchableOpacity style={styles.profilePicContainer} onPress={handleImageUpload}>
          <Image
            source={{ uri: profileImage || 'https://placeimg.com/150/150/people' }}
            style={styles.profilePic}
          />
          <View style={styles.uploadOverlay}>
            <Text style={styles.uploadText}>Upload Image</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.username}>Vivish.V</Text>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statTitle}>TOTAL ORDERS</Text>
          <Text style={styles.statValue}>120</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statTitle}>ZAPP POINTS</Text>
          <Text style={styles.statValue}>430</Text>
        </View>
      </View>

      {/* Zapper Toggle */}
      <View style={styles.zapperContainer}>
        <Text style={styles.zapperText}>ZAPPER</Text>
        <Link href="/OrderDashboard">
          <Text style={styles.zapperAction}>SWIPE TO ENABLE ➡️</Text>
        </Link>
      </View>

      {/* Menu Options */}
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>PRIVACY TERMS AND POLICY</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>ZAPP POINTS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>PAYMENTS AND REFUNDS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000000', // Black background for the whole page
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#FFFFFF', // White background for header
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    color: '#000000', // Black text for the title
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center', // Center aligns text within the space
    flex: 1, // Makes it occupy available space
  },
  close: {
    color: '#000000', // Black color for close icon
    fontSize: 28,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: 40,
  },
  profilePicContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: '#FFFFFF', // White border for profile picture
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePic: {
    width: '100%',
    height: '100%',
  },
  uploadOverlay: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Black overlay
    width: '100%',
    alignItems: 'center',
    paddingVertical: 5,
  },
  uploadText: {
    color: '#FFFFFF', // White text for upload
    fontSize: 14,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#FFFFFF', // White color for username
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  statBox: {
    backgroundColor: '#FFFFFF', // White background for stats
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: '40%',
  },
  statTitle: {
    fontSize: 16,
    color: '#000000', // Black text for stat title
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 20,
    color: '#000000', // Black text for stat value
    fontWeight: 'bold',
  },
  zapperContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    backgroundColor: '#FFFFFF', // White background for zapper section
    padding: 15,
    borderRadius: 10,
  },
  zapperText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000', // Black color for zapper text
  },
  zapperAction: {
    fontSize: 16,
    color: '#000000', // Black color for swipe action
    fontWeight: 'bold',
  },
  menu: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E4EC',
    paddingVertical: 15,
  },
  menuText: {
    fontSize: 16,
    color: '#FFFFFF', // White text for menu items
    fontWeight: 'bold',
  },
});

export default ProfilePage;
