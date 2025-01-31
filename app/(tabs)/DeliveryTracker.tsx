import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressBar } from 'react-native-paper';

const DeliveryTracker = () => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (progress < 1) {
      const timer = setTimeout(() => setProgress(progress + 0.1), 1000);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  const statusText = progress === 1 ? 'Food Delivered!' : `Your food is ${Math.floor(progress * 100)}% ready`;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{statusText}</Text>
      <ProgressBar progress={progress} color="#6200ee" style={styles.progressBar} />
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  progressBar: {
    width: '80%',
    height: 10,
  },
});

export default DeliveryTracker;
