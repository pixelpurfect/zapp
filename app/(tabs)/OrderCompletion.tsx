import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

const OrderCompletion = () => {
  const [celebrate, setCelebrate] = React.useState(false);

  const handleOrderComplete = () => {
    setCelebrate(true);
  };

  return (
    <View style={styles.container}>
      {celebrate && <ConfettiCannon count={200} origin={{ x: 200, y: 0 }} />}
      <Text style={styles.header}>Order Complete!</Text>
      <Text style={styles.message}>Your meal is on its way!</Text>
      <Button title="Celebrate Order" onPress={handleOrderComplete} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
});

export default OrderCompletion;
