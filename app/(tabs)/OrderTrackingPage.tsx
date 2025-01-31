import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking, Platform, Animated, Easing, ScrollView } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const OrderTrackingPage = () => {
  const [slideAnim] = useState(new Animated.Value(-100));  // Slide animation for the header
  const [rotateAnim] = useState(new Animated.Value(0));  // Rotation animation for the location pin
  const [pulseAnim] = useState(new Animated.Value(1));  // Pulse animation for the call button
  const [progressAnim] = useState(new Animated.Value(0)); // Animation for the progress bar
  const [countdown, setCountdown] = useState(1200); // Countdown timer (20 mins)
  const navigation = useNavigation();
  

  // Simulate order tracking data
  const orderDetails = {
    zapperName: "Vivish Reddy",
    zapperPhone: "+1234567890",
    location: "TP 3102, Tech Park-1, SRMIST",
    numberOfItems: 5,
    estimatedTime: "20 mins",
    orderStatus: "On the Way",
    zapperImage: "https://placeimg.com/200/200/people", // Placeholder
    foodItems: [
      { name: "Pizza", emoji: "🍕" },
      { name: "Burger", emoji: "🍔" },
      { name: "Fries", emoji: "🍟" },
      { name: "Soda", emoji: "🥤" },
    ],
  };

  useEffect(() => {
    // Header Slide-in Animation
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1200,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();

    // Location Pin Rotation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Pulse Animation for the call button
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Progress Bar Animation
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 5000, // Simulate order completion time
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();

    // Countdown Timer
    const interval = setInterval(() => {
      setCountdown(prev => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [slideAnim, rotateAnim, pulseAnim, progressAnim]);

  const handleCallZapper = () => {
    const phoneNumber = Platform.OS === 'ios' ? `telprompt:${orderDetails.zapperPhone}` : `tel:${orderDetails.zapperPhone}`;
    Linking.openURL(phoneNumber);
  };

  return (
    <View style={styles.container}>
      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Animated Header */}
        <Animated.View style={[styles.header, { transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.status}>{orderDetails.orderStatus}</Text>
          <Text style={styles.estimatedTime}>Estimated Time: {orderDetails.estimatedTime}</Text>
        </Animated.View>

        {/* Zapper Info Card */}
        <View style={styles.card}>
          <Animated.View style={styles.zapperContainer}>
            <Image source={{ uri: orderDetails.zapperImage }} style={styles.zapperImage} />
            <View style={styles.zapperDetails}>
              <Text style={styles.zapperName}>{orderDetails.zapperName}</Text>
              <Text style={styles.zapperLocation}>{orderDetails.location}</Text>
            </View>
          </Animated.View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBar}>
          <Animated.View
            style={[
              styles.progressFill,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>

        {/* Location with Rotating Pin */}
        <View style={styles.locationContainer}>
          <Animated.View
            style={{
              transform: [{ rotate: rotateAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] }) }],
            }}
          >
            <MaterialIcons name="location-pin" size={60} color="#007aff" />
          </Animated.View>
          <Text style={styles.locationText}>{orderDetails.location}</Text>
        </View>

        {/* Call Zapper Button with Pulse Effect */}
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <TouchableOpacity style={styles.callButton} onPress={handleCallZapper}>
            <FontAwesome name="phone" size={24} color="#fff" />
            <Text style={styles.callButtonText}>Call Zapper</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* New Section: Order Summary with Countdown */}
        <View style={styles.card}>
          <Text style={styles.orderSummaryTitle}>Your Order:</Text>
          <View style={styles.foodItemsContainer}>
            {orderDetails.foodItems.map((item, index) => (
              <View key={index} style={styles.foodItem}>
                <Text style={styles.foodEmoji}>{item.emoji}</Text>
                <Text style={styles.foodName}>{item.name}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.countdownText}>
            Time Remaining: {Math.floor(countdown / 60)}:{String(countdown % 60).padStart(2, '0')}
          </Text>

          <TouchableOpacity style={styles.rateButton} onPress={() => { /* Navigate to rate experience screen */ }}>
            <Text style={styles.rateButtonText}>Rate Your Experience</Text>
          </TouchableOpacity>
        </View>



{/* New Section: Recent Orders */}
<View style={styles.card}>
  <Text style={styles.recentOrdersTitle}>Recent Orders</Text>
  <ScrollView horizontal style={styles.recentOrdersContainer}>
    <View style={styles.recentOrderItem}>
      <Text style={styles.recentOrderText}>Pizza Party</Text>
      <Text style={styles.recentOrderDate}>12/28/2024</Text>
    </View>
    <View style={styles.recentOrderItem}>
      <Text style={styles.recentOrderText}>Burger Delight</Text>
      <Text style={styles.recentOrderDate}>12/22/2024</Text>
    </View>
  </ScrollView>
</View>


{/* New Section: Real-Time Updates */}
<View style={styles.card}>
  <Text style={styles.updatesTitle}>Real-Time Order Updates</Text>
  <Text style={styles.update}>Order Received</Text>
  <Text style={styles.update}>Preparing your food...</Text>
  <Text style={styles.update}>On the way!</Text>
</View>

{/* New Section: Zapper Rating */}
<View style={styles.card}>
  <Text style={styles.ratingTitle}>Rate Your Zapper</Text>
  <View style={styles.ratingContainer}>
    {/* Add stars or rating component */}
    <FontAwesome name="star" size={24} color="#ffd700" />
    <FontAwesome name="star" size={24} color="#ffd700" />
    <FontAwesome name="star" size={24} color="#ffd700" />
    <FontAwesome name="star-half-o" size={24} color="#ffd700" />
    <FontAwesome name="star-o" size={24} color="#ffd700" />
  </View>
</View>


{/* New Section: Floating Chat Icon */}
<TouchableOpacity style={styles.fabChat} onPress={() => { /* Start chat functionality */ }}>
  <MaterialIcons name="chat" size={30} color="#fff" />
</TouchableOpacity>

      </ScrollView>

      {/* Floating Action Button for additional actions */}
      <TouchableOpacity style={styles.fab} onPress={() => { /* Navigate to another screen or perform an action */ }}>
        <MaterialIcons name="add" size={40} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0', // Light gray for the main background
    position: 'relative',
  },
  scrollViewContent: {
    paddingBottom: 100,
  },
  header: {
    backgroundColor: '#000', // Solid black
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: '#333', // Dark gray shadow
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  status: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff', // White text
    textTransform: 'uppercase',
  },
  estimatedTime: {
    fontSize: 18,
    color: '#ccc', // Light gray for secondary text
    marginTop: 10,
  },
  card: {
    backgroundColor: '#fff', // White background
    borderRadius: 15,
    padding: 25,
    marginBottom: 30,
    shadowColor: '#555', // Mid-gray shadow
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
  },
  zapperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  zapperImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#ddd', // Light gray border
    marginRight: 20,
  },
  zapperDetails: {
    flexDirection: 'column',
  },
  zapperName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000', // Black text
  },
  zapperLocation: {
    fontSize: 16,
    color: '#666', // Dark gray text
  },
  progressBar: {
    width: '100%',
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
    marginBottom: 30,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#333', // Dark gray for progress
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  locationText: {
    fontSize: 18,
    color: '#000',
    marginLeft: 12,
  },
  callButton: {
    backgroundColor: '#333', // Dark gray for button
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  callButtonText: {
    fontSize: 18,
    color: '#fff', // White text
    marginLeft: 15,
  },
  orderSummaryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  foodItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  foodItem: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: 10,
  },
  foodEmoji: {
    fontSize: 50,
    marginBottom: 10,
  },
  foodName: {
    fontSize: 14,
    color: '#333',
  },
  countdownText: {
    fontSize: 18,
    color: '#333',
    marginVertical: 10,
  },
  rateButton: {
    backgroundColor: '#007aff',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rateButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: '#007aff',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  etaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  etaGraph: {
    width: '100%',
    height: 5,
    backgroundColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
  },
  etaProgressFill: {
    height: '100%',
    backgroundColor: '#007aff',
  },

  // Recent Orders Section
  recentOrdersTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  recentOrdersContainer: {
    flexDirection: 'row',
  },
  recentOrderItem: {
    padding: 10,
    marginRight: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    alignItems: 'center',
  },
  recentOrderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  recentOrderDate: {
    fontSize: 14,
    color: '#777',
  },

  // Map Section
  mapTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  mapImage: {
    width: '100%',
    height: 200,
    borderRadius: 15,
  },

  // Real-Time Updates Section
  updatesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  update: {
    fontSize: 16,
    color: '#007aff',
    marginBottom: 5,
  },

  // Rating Section
  ratingTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  // Weather Section
  weatherTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherCondition: {
    fontSize: 18,
    marginRight: 10,
  },

  // Thank You Section
  thankYouText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  thankYouMessage: {
    fontSize: 18,
    color: '#777',
    marginTop: 10,
  },

  // Floating Chat Button
  fabChat: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: '#007aff',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
});

export default OrderTrackingPage;


