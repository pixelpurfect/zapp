import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface FoodOutletCardProps {
  name: string;
  imageUrl: string;
}

const FoodOutletCard: React.FC<FoodOutletCardProps> = ({ name, imageUrl }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{name}</Text>
      <View style={styles.cardImageContainer}>
        {/* Replace with your image component */}
        <Image source={{ uri: imageUrl }} style={styles.cardImage} />
      </View>
    </View>
  );
};

const FoodOutlets: React.FC = () => {
  const [outlets, setOutlets] = useState<FoodOutletCardProps[]>([
    { name: 'Classic Biryani', imageUrl: '...' },
    { name: 'Java Green', imageUrl: '...' },
    // Add more initial outlets here
  ]);

  const handleAddOutlet = () => {
    setOutlets((prevOutlets) => [
      ...prevOutlets,
      { name: 'New Outlet', imageUrl: '...' }, // Replace with default image
    ]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={outlets}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <FoodOutletCard {...item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddOutlet}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    width: 200,
    marginRight: 16,
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardImageContainer: {
    height: 150,
    overflow: 'hidden',
    borderRadius: 8,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  addButton: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default FoodOutlets;