import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const AcceptedOrders = () => {
  const { selectedOrders } = useLocalSearchParams();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (selectedOrders) {
      try {
        const parsedOrders = JSON.parse(selectedOrders as string);

        // Check if the number of orders exceeds the limit
        if (parsedOrders.length > 3) {
          Alert.alert(
            'Limit Exceeded',
            'You can accept a maximum of 3 orders only. Please adjust your selection.'
          );
        } else {
          setOrders(parsedOrders);
        }
      } catch (error) {
        console.error('Error parsing selected orders:', error);
        Alert.alert('Error', 'There was an issue fetching the selected orders.');
      }
    }
  }, [selectedOrders]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Accepted Orders</Text>
      {orders.length > 0 ? (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.orderId}>Order ID: {item.id}</Text>
              {/* Location Tag */}
              <View style={styles.locationContainer}>
                <Text style={styles.locationText}>
                  📍 {item.location || 'Location not specified'}
                </Text>
              </View>
              <Text style={styles.items}>
                Items: {item.items.map((i: any) => i.title).join(', ') || 'No items listed'}
              </Text>
              <Text style={styles.total}>Total: ₹{item.total}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyText}>No orders selected</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginBottom: 12,
    elevation: 3,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  // New styles for location
  locationContainer: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  items: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  total: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4caf50',
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: 32,
  },
});

export default AcceptedOrders;
