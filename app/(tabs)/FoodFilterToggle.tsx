import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

const FoodFilterToggle = () => {
  const [isVegetarian, setIsVegetarian] = useState(false);

  const handleToggle = () => {
    setIsVegetarian(!isVegetarian);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Filter Options</Text>
      <View style={styles.filterOption}>
        <Text style={styles.optionText}>Vegetarian</Text>
        <Switch
          value={isVegetarian}
          onValueChange={handleToggle}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isVegetarian ? '#f5dd4b' : '#f4f3f4'}
        />
      </View>
      <Text style={styles.message}>{isVegetarian ? 'You are looking at vegetarian options.' : 'Showing all options.'}</Text>
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
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  optionText: {
    fontSize: 18,
    marginRight: 10,
  },
  message: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default FoodFilterToggle;




