import React, { useState } from 'react';
import { TextInput, Button, View, Text } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/Config';

const AddMenuItemScreen = ({ restaurantId }: any) => {
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleAddMenuItem = async () => {
    if (!itemName || !price || !description) {
      setErrorMessage('All fields are required.');
      return;
    }

    try {
      const menuRef = collection(db, 'restaurantsData', restaurantId, 'menu');
      const docRef = await addDoc(menuRef, {
        itemName,
        price: parseFloat(price),
        description,
      });

      setSuccessMessage('Menu item added successfully! ID: ' + docRef.id);
      setErrorMessage('');
      setItemName('');
      setPrice('');
      setDescription('');
    } catch (error) {
      console.error('Error adding menu item: ', error);
      setErrorMessage('Failed to add menu item. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Item Name</Text>
      <TextInput
        value={itemName}
        onChangeText={setItemName}
        placeholder="Enter item name"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <Text>Price</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="Enter price"
        keyboardType="numeric"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <Text>Description</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
      {successMessage && <Text style={{ color: 'green' }}>{successMessage}</Text>}
      <Button title="Add Menu Item" onPress={handleAddMenuItem} />
    </View>
  );
};

export default AddMenuItemScreen;







