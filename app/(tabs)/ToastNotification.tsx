import React, { useEffect } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import Toast from 'react-native-toast-message';

const ToastNotification = () => {
  const showToast = () => {
    Toast.show({
      type: 'success',
      position: 'top',
      text1: 'Order Placed!',
      text2: 'Your meal is on its way.',
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Show Toast" onPress={showToast} />
      {/* Toast component goes at the root level */}
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ToastNotification;


