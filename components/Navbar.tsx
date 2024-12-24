import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router'; // Import Link from expo-router
import Logo from './Logo';

const Navbar = () => {
  return (
    <View style={styles.navbarContainer}>
      {/* Logo in the Center */}
      <View style={styles.logoContainer}>
        <Logo /> {/* Replace with your Logo component */}
      </View>

      {/* Icons and Links */}
      <View style={styles.iconContainer}>
        {/* Cart Button with Link for navigation */}
        <Link href="./Ordersummarycard">
          <View style={styles.iconButton}>
            <Text style={styles.iconText}>🛒</Text> {/* Cart emoji */}
          </View>
        </Link>

        {/* Notification Bell with Link for navigation */}
        <Link href="./Notification">
          <View style={styles.iconButton}>
            <Text style={styles.iconText}>🔔</Text> {/* Bell emoji */}
          </View>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000000',
    padding: 10,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 15,
  },
  iconText: {
    color: '#fff',
    fontSize: 24,
  },
});

export default Navbar;
