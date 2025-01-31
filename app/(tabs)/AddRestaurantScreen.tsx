import React, { useState } from 'react';
import { TextInput, Button, View, Text } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/Config';

const AddRestaurantScreen = ({ onRestaurantAdded, onViewRestaurants }: any) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleAddRestaurant = async () => {
    if (!name || !address || !phone) {
      setErrorMessage('All fields are required.');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'restaurantsData'), {
        name,
        address,
        phone,
      });

      setSuccessMessage('Restaurant added successfully! ID: ' + docRef.id);
      setErrorMessage('');
      setName('');
      setAddress('');
      setPhone('');

      // Inform the parent component that a new restaurant has been added
      onRestaurantAdded(docRef.id, name);
    } catch (error) {
      console.error('Error adding restaurant:', error);
      setErrorMessage('Failed to add restaurant. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Restaurant Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter restaurant name"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <Text>Address</Text>
      <TextInput
        value={address}
        onChangeText={setAddress}
        placeholder="Enter address"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <Text>Phone Number</Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />

      {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
      {successMessage && <Text style={{ color: 'green' }}>{successMessage}</Text>}

      <Button title="Add Restaurant" onPress={handleAddRestaurant} />
      <Button title="View All Restaurants" onPress={onViewRestaurants} />
    </View>
  );
};

export default AddRestaurantScreen;






