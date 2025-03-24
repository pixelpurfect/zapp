import React, { useState, useEffect } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Switch } from 'react-native';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/Config';
import { useRouter } from 'expo-router';
import ZapperNavbar from '@/components/ZapperNavbar';
import CategorySlider from '@/components/CategorySlider';

const { width, height } = Dimensions.get('window');

const MAX_ORDERS = 3;

const OrderDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState<{ [key: string]: boolean }>({});
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersRef = collection(db, 'orders');
        const q = query(ordersRef, orderBy('orderDate', 'desc'));
        const querySnapshot = await getDocs(q);
        const ordersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          items: doc.data().items || [],
          total: doc.data().total || 0,
          orderDate: doc.data().orderDate || null,
          location: doc.data().location || 'Location not specified',
          restaurantName: doc.data().restaurantName || 'Unknown Restaurant', // Added restaurant name
        }));
        setOrders(ordersList);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const toggleOrderSelection = (orderId: string) => {
    const selectedCount = Object.values(selectedOrders).filter(Boolean).length;

    if (!selectedOrders[orderId] && selectedCount >= MAX_ORDERS) {
      Alert.alert('Limit Reached', `You can accept a maximum of ${MAX_ORDERS} orders.`);
      return;
    }

    setSelectedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const navigateToNextPage = () => {
    const selectedOrderDetails = orders.filter((order) => selectedOrders[order.id]);

    if (selectedOrderDetails.length === 0) {
      Alert.alert('No Orders Selected', 'Please select at least one order.');
      return;
    }

    router.push({
      pathname: '/AcceptedOrders',
      params: { selectedOrders: JSON.stringify(selectedOrderDetails) },
    });
  };

  return (
    <View style={styles.container}>
      <ZapperNavbar />
      <View style={{ marginTop: -10 }}>
        <CategorySlider />
      </View>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Swipeable
            renderRightActions={() => (
              <TouchableOpacity
                style={styles.swipeButton}
                onPress={() => toggleOrderSelection(item.id)}
              >
                <Text style={styles.swipeText}>
                  {selectedOrders[item.id] ? 'Unselect' : 'Select'}
                </Text>
              </TouchableOpacity>
            )}
          >
            <View style={styles.card}>
              <View style={styles.row}>
                <Switch
                  value={selectedOrders[item.id] || false}
                  onValueChange={() => toggleOrderSelection(item.id)}
                  trackColor={{ false: '#555', true: '#007AFF' }}
                  thumbColor={selectedOrders[item.id] ? '#fff' : '#f4f3f4'}
                  style={styles.switch}
                />
                <Text style={styles.orderId}>Order ID: {item.id}</Text>
              </View>
              {/* Restaurant Name */}
              <Text style={styles.restaurantName}>🍽 {item.restaurantName}</Text>
              {/* Location Display */}
              <View style={styles.locationContainer}>
                <Text style={styles.locationText}>📍 {item.location}</Text>
              </View>
              <Text style={styles.items}>
                Items: {item.items.map((i) => i.title).join(', ') || 'No items listed'}
              </Text>
              <Text style={styles.total}>Total: ₹{item.total}</Text>
            </View>
          </Swipeable>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No orders found</Text>}
      />
      <TouchableOpacity style={styles.acceptButton} onPress={navigateToNextPage}>
        <Text style={styles.acceptButtonText}>Accept Selected Orders</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  listContent: {
    marginTop: 32,
  },
  swipeButton: {
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
  },
  swipeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#1f1f1f',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginBottom: 12,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  switch: {
    marginRight: 8,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 6,
  },
  locationContainer: {
    backgroundColor: '#2a2a2a',
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  items: {
    fontSize: 14,
    color: '#bbb',
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
    color: '#bbb',
    marginTop: 32,
  },
  acceptButton: {
    backgroundColor: '#4caf50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  acceptButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default OrderDashboard;
