import React from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface MenuItem {
  title: string;
  icon: string;
  onPress: () => void;
}

interface FloatingMenuProps {
  onProfilePress: () => void;
  onLocationPress: () => void;
}

const FloatingMenu: React.FC<FloatingMenuProps> = ({ onProfilePress, onLocationPress }) => {
  const router = useRouter();
  const { width } = Dimensions.get('window');

  const menuItems: MenuItem[] = [
    {
      title: 'Home',
      icon: 'home',
      onPress: () => router.push('/HomeScreen'),
    },
    {
      title: 'Profile',
      icon: 'person',
      onPress: onProfilePress,
    },
    {
      title: 'Location',
      icon: 'location',
      onPress: onLocationPress,
    },
    {
      title: 'Orders',
      icon: 'receipt',
      onPress: () => router.push('/Ordersummarycard'),
    },
    {
      title: 'Settings',
      icon: 'settings',
      onPress: () => router.push('/App'),
    },
  ];

  return (
    <View style={[styles.container, { width: width - 32 }]}>
      <View style={styles.dockContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={item.title}
            style={styles.iconButton}
            onPress={item.onPress}
            activeOpacity={0.7}
          >
            <View style={styles.iconWrapper}>
              <Ionicons name={item.icon as any} size={24} color="#fff" />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    alignItems: 'center',
  },
  dockContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 32,
    padding: 8,
    gap: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backdropFilter: 'blur(10px)',
  },
  iconButton: {
    padding: 8,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});

export default FloatingMenu;