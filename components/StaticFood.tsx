import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const foodItems = [
  { id: 1, name: 'Biryani', image: require('./assets/images/biryani.jpg') },
  { id: 2, name: 'Salad', image: require('./assets/images/salad.jpg') },
  { id: 3, name: 'Sandwich', image: require('./assets/images/sandwich.jpg') },
  { id: 4, name: 'Milkshake', image: require('./assets/images/milkshake.jpg') },
];

const FoodScrollBox: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>What are you craving?</Text>
        <Text style={styles.seeAllText}>See all categories</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {foodItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.item}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  seeAllText: {
    fontSize: 14,
    color: '#007BFF',
  },
  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    marginRight: 15,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  itemText: {
    fontSize: 14,
    color: '#000',
  },
});

export default FoodScrollBox;
