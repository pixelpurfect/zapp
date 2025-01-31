import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';

const RestaurantListScreen = ({ restaurants, onAddAnotherRestaurant, onAddMenu }: any) => {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Restaurants</Text>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 20, padding: 10, borderWidth: 1, borderRadius: 5 }}>
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
            <Button
              title="Add Menu Item"
              onPress={() => onAddMenu(item.id)} // Trigger onAddMenu with restaurantId
            />
          </View>
        )}
      />
      <Button title="Add Another Restaurant" onPress={onAddAnotherRestaurant} />
    </View>
  );
};

export default RestaurantListScreen;
