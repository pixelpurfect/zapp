import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CountdownTimer = () => {
  const [seconds, setSeconds] = useState(10); // 10 seconds for testing
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 1) {
          clearInterval(interval);
          setIsCompleted(true);
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Order Countdown</Text>
      {isCompleted ? (
        <Text style={styles.completedText}>Your food is ready!</Text>
      ) : (
        <Text style={styles.timerText}>{seconds}s</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  timerText: {
    fontSize: 50,
    fontWeight: '600',
    color: 'red',
  },
  completedText: {
    fontSize: 24,
    fontWeight: '600',
    color: 'green',
  },
});

export default CountdownTimer;
