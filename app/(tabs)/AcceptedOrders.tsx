import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { collection, doc, updateDoc, addDoc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase/Config';

interface Order {
  id: string;
  items: any[];
  total: number;
  location: string;
  restaurantName: string;
  userId: string;  // UID of person who placed the order
  acceptedBy?: string; // UID of person who accepted the order
  userName?: string; // Name of person who placed the order
}

interface AcceptedOrder {
  id: string;
  ordererId: string;
  acceptedBy: string;
  orderId: string;
  location: string;
  amount: number;
  restaurantName: string;
  acceptedAt: Date;
  read: boolean;
  ordererName?: string;
}

const AcceptedOrders = () => {
  const { selectedOrders } = useLocalSearchParams();
  const [orders, setOrders] = useState<Order[]>([]);
  const [acceptedOrders, setAcceptedOrders] = useState<AcceptedOrder[]>([]);

  useEffect(() => {
    if (selectedOrders) {
      try {
        const parsedOrders = JSON.parse(selectedOrders as string);
        if (parsedOrders.length > 3) {
          Alert.alert(
            'Limit Exceeded',
            'You can accept a maximum of 3 orders only. Please adjust your selection.'
          );
        } else {
          // Fetch user details for each order
          const ordersWithUserDetails = parsedOrders.map(async (order: Order) => {
            try {
              const userDoc = await getDoc(doc(db, 'users', order.userId));
              if (userDoc.exists()) {
                return {
                  ...order,
                  userName: userDoc.data().name || 'Unknown User'
                };
              }
              return order;
            } catch (error) {
              console.error('Error fetching user details:', error);
              return order;
            }
          });

          Promise.all(ordersWithUserDetails).then(ordersWithNames => {
            setOrders(ordersWithNames);
          });
        }
      } catch (error) {
        console.error('Error parsing selected orders:', error);
        Alert.alert('Error', 'There was an issue fetching the selected orders.');
      }
    }
  }, [selectedOrders]);

  const handleAcceptOrder = async (order: Order) => {
    try {
      if (!auth.currentUser) {
        Alert.alert('Error', 'You must be logged in to accept orders.');
        return;
      }

      // Update the original order status
      const orderRef = doc(db, 'orders', order.id);
      await updateDoc(orderRef, {
        status: 'accepted',
        acceptedBy: auth.currentUser.uid,
        acceptedAt: new Date(),
      });

      // Get the name of the person who placed the order
      const ordererDoc = await getDoc(doc(db, 'USERS', order.userId));
      const ordererName = ordererDoc.exists() ? ordererDoc.data().name : 'Unknown User';

      // Add entry to acceptedOrders collection
      const acceptedOrderDoc = await addDoc(collection(db, 'acceptedOrders'), {
        ordererId: order.userId,          // UID of person who placed the order
        ordererName: ordererName,         // Name of person who placed the order
        acceptedBy: auth.currentUser.uid, // UID of person who accepted
        orderId: order.id,
        location: order.location,
        amount: order.total,
        restaurantName: order.restaurantName,
        acceptedAt: new Date(),
        read: false
      });

      // Create notification for the order placer
      await addDoc(collection(db, 'notifications'), {
        userId: order.userId,
        type: 'ORDER_ACCEPTED',
        message: `Your order from ${order.restaurantName} has been accepted`,
        orderId: order.id,
        acceptedOrderId: acceptedOrderDoc.id,
        createdAt: new Date(),
        read: false
      });

      Alert.alert(
        'Success',
        'Order accepted successfully!'
      );

      // Update local state
      setOrders(prevOrders =>
        prevOrders.map(o =>
          o.id === order.id 
            ? { ...o, status: 'accepted', acceptedBy: auth.currentUser?.uid }
            : o
        )
      );
    } catch (error) {
      console.error('Error accepting order:', error);
      Alert.alert('Error', 'Failed to accept order. Please try again.');
    }
  };

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
              
              <Text style={styles.restaurantName}>
                🍽️ {item.restaurantName}
              </Text>

              <Text style={styles.orderUser}>
                👤 Ordered by: {item.userName || 'Unknown User'}
              </Text>
              
              <View style={styles.locationContainer}>
                <Text style={styles.locationText}>
                  📍 {item.location}
                </Text>
              </View>
              
              <Text style={styles.items}>
                Items: {item.items.map((i) => i.title).join(', ')}
              </Text>
              
              <Text style={styles.total}>Total: ₹{item.total}</Text>
              
              {!item.status && !item.acceptedBy && (
                <TouchableOpacity
                  style={styles.acceptButton}
                  onPress={() => handleAcceptOrder(item)}
                >
                  <Text style={styles.acceptButtonText}>Accept Order</Text>
                </TouchableOpacity>
              )}
              
              {(item.status === 'accepted' || item.acceptedBy) && (
                <View style={styles.statusContainer}>
                  <Text style={styles.statusText}>✅ Order Accepted</Text>
                </View>
              )}
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
  restaurantName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
    marginBottom: 8,
  },
  orderUser: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
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
    marginBottom: 12,
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  acceptButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  statusContainer: {
    backgroundColor: '#E8F5E9',
    padding: 8,
    borderRadius: 6,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: 32,
  },
});

export default AcceptedOrders;