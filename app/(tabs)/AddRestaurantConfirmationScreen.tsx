import React from 'react';
import { View, Text, Button } from 'react-native';

const AddRestaurantConfirmationScreen = ({ restaurantId, onAddMenuItem }: any) => {
  return (
    <View style={{ padding: 20 }}>
      <Text>Restaurant added successfully!</Text>
      <Text>Restaurant ID: {restaurantId}</Text>

      {/* Button to navigate to the Add Menu Item screen */}
      <Button
        title="Add Menu Item"
        onPress={() => onAddMenuItem(restaurantId)} // Navigate to AddMenuItemScreen
      />
    </View>
  );
};

export default AddRestaurantConfirmationScreen;

