

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const ProfilePage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>PROFILE</Text>
        <TouchableOpacity>
          <Text style={styles.close}>×</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileInfo}>
        <Image source={{ uri: 'https://placeimg.com/100/100/people' }} style={styles.profilePic} />
        <Text style={styles.username}>User Name</Text>
      </View>

      <View style={styles.stats}>
        <Text>Total Orders: 5</Text>
        <Text>Zapp Points: 200</Text>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity><Text>Order History</Text></TouchableOpacity>
        <TouchableOpacity><Text>Favorite List</Text></TouchableOpacity>
        <TouchableOpacity><Text>Zapper (Toggle)</Text></TouchableOpacity>
        <TouchableOpacity><Text>Privacy Terms</Text></TouchableOpacity>
        <TouchableOpacity><Text>Payments & Refunds</Text></TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#000',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
  },
  close: {
    color: '#fff',
    fontSize: 30,
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    fontSize: 20,
    marginTop: 10,
  },
  stats: {
    marginTop: 20,
    paddingLeft: 20,
  },
  menu: {
    marginTop: 20,
    paddingLeft: 20,
  },
});

export default ProfilePage;
