import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../../firebase/Config';

const Notification = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!currentUser) return;

    // Query orders for the current user that have been accepted
    const ordersQuery = query(
      collection(db, 'orders'),
      where('userId', '==', currentUser.uid),
      where('status', '==', 'accepted')
    );

    const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(ordersData);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return date.toLocaleString();
  };

  const formatOrderItems = (items) => {
    if (!items || !items.length) return '';
    return items.map(item => `${item.quantity}x ${item.title}`).join(', ');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>YOUR ORDERS</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.notificationsList}>
        {orders.map((order) => (
          <View key={order.id} style={styles.notificationItem}>
            <View style={styles.orderHeader}>
              <Text style={styles.restaurantName}>{order.restaurantName}</Text>
              <Text style={styles.orderTotal}>₹{order.total}</Text>
            </View>
            
            <View style={styles.orderDetails}>
              <Text style={styles.itemsList}>
                {formatOrderItems(order.items)}
              </Text>
              <Text style={styles.location}>📍 {order.location}</Text>
              <View style={styles.timeContainer}>
                <Text style={styles.orderTime}>
                  Ordered: {formatDate(order.orderDate)}
                </Text>
                <Text style={styles.acceptedTime}>
                  Accepted: {formatDate(order.acceptedAt)}
                </Text>
              </View>
            </View>
          </View>
        ))}
        
        {orders.length === 0 && (
          <Text style={styles.noOrders}>No accepted orders found</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2C2C',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  notificationsList: {
    flex: 1,
  },
  notificationItem: {
    backgroundColor: '#3E3E3E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  restaurantName: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderTotal: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderDetails: {
    gap: 4,
  },
  itemsList: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  location: {
    color: '#A9A9A9',
    fontSize: 14,
  },
  timeContainer: {
    marginTop: 8,
  },
  orderTime: {
    color: '#A9A9A9',
    fontSize: 12,
  },
  acceptedTime: {
    color: '#A9A9A9',
    fontSize: 12,
  },
  noOrders: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  }
});

export default Notification;