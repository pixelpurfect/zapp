import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Link } from 'expo-router';

const FloatingMenu = ({ onProfilePress, onLikedFoodsPress }: { onProfilePress: () => void; onLikedFoodsPress: () => void }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onLikedFoodsPress} style={styles.icon}>
        <Text style={styles.iconText}>❤️</Text>
      </TouchableOpacity>

      <Link href="/ProfilePage" style={styles.icon}>
        <Text style={styles.iconText}>👤</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#000',
    borderRadius: 50,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 20,
  },
  iconText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default FloatingMenu;
