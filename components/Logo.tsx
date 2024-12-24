// Logo.tsx
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const Logo = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/zapp.png')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 50,
  },
});

export default Logo;
