// import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { Dimensions, StyleSheet, View, SafeAreaView } from 'react-native';
import { CartProvider } from '@/components/CartProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from '@/components/AuthContext';
import { NotificationProvider } from '@/components/NotificationContext';

// Importing Expo Notifications and Firebase config
// import * as Notifications from 'expo-notifications';
// import firebase from '../../firebase/Config'; // Import Firebase configuration

const { width, height } = Dimensions.get('window');

export default function RootLayout() {
//   useEffect(() => {
//     // Request notification permission on component mount
//     const requestNotificationPermission = async () => {
//       const { status } = await Notifications.requestPermissionsAsync();
//       if (status === 'granted') {
//         console.log('Notification permissions granted');
//       }
//     };

//     // Fetch the Expo push token (FCM token) for this device
//     const getFCMToken = async () => {
//       try {
//         const token = await Notifications.getExpoPushTokenAsync();
//         console.log('FCM Token:', token.data);
//         // Here, you would typically save the token in your backend or Firebase
//       } catch (error) {
//         console.error('Error getting FCM token:', error);
//       }
//     };

//     // Handle notification received in the foreground
//     const notificationListener = Notifications.addNotificationReceivedListener(notification => {
//       console.log('Notification received in foreground:', notification);
//       // Handle foreground notifications (e.g., show a modal, update state)
//     });

//     // Handle notification response (user tapping on notification)
//     const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
//       console.log('Notification response received:', response);
//       // Handle the response (e.g., navigate to a specific screen)
//     });

//     // Request permission and get FCM token
//     requestNotificationPermission();
//     getFCMToken();

//     // Cleanup listeners on unmount
//     return () => {
//       Notifications.removeNotificationSubscription(notificationListener);
//       Notifications.removeNotificationSubscription(responseListener);
//     };
//   }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NotificationProvider>
      <AuthProvider>
        <CartProvider>
          <SafeAreaView style={styles.container}>
            <View style={styles.responsiveWrapper}>
              <Stack
                screenOptions={{
                  headerShown: false, // Hide headers for all screens
                  gestureEnabled: false, // Disable swipe-to-go-back gestures
                }}
              >
                <Stack.Screen name="index" options={{ title: 'Home' }} />
                <Stack.Screen name="form" options={{ title: 'Form' }} />
                <Stack.Screen name="HomeScreen" />
                <Stack.Screen name="MenuList" options={{ title: 'Menu' }} />
                <Stack.Screen name="Registration" options={{ title: 'Registration' }} />
                <Stack.Screen name="Login" options={{ title: 'Login' }} />
                <Stack.Screen name="EmailVerification" options={{ title: 'Email Verification' }} />
                <Stack.Screen name="PasswordReset" options={{ title: 'Password Reset' }} />
                <Stack.Screen name="ProfilePage" options={{ title: 'Profile Page' }} />
                <Stack.Screen name="AddMenuItemScreen" options={{ title: 'Add Menu Item' }} />
                <Stack.Screen name="AddRestaurantScreen" options={{ title: 'Add Restaurant' }} />
                <Stack.Screen name="RestaurantListScreen" options={{ title: 'Restaurant List' }} />
                <Stack.Screen name="MainScreen" options={{ title: 'Main' }} />
                <Stack.Screen name="StationHomeScreen" options={{ title: 'Station Home' }} />
                <Stack.Screen name="PrintHomeScreen" options={{ title: 'Print Home' }} />
                <Stack.Screen name="CartScreen" options={{ title: 'Cart' }} />
                <Stack.Screen name="EmailVerificationScreen" options={{ title: 'Email Verification Screen' }} />
                <Stack.Screen name="PasswordResetScreen" options={{ title: 'Password Reset Screen' }} />
                <Stack.Screen name="PhoneAuthScreen" options={{ title: 'Phone Auth' }} />
                <Stack.Screen name="FormComponent" options={{ title: 'Form Component' }} />
                <Stack.Screen name="printcard" options={{ title: 'Print Card' }} />
                <Stack.Screen name="pagepreference" options={{ title: 'Page Preference' }} />
                <Stack.Screen name="SignUpScreen" options={{ title: 'Sign Up' }} />
                <Stack.Screen name="LoginScreen" options={{ title: 'Login Screen' }} />
                <Stack.Screen name="Printoutspage" options={{ title: 'Print Outs Page' }} />
                <Stack.Screen name="signup" options={{ title: 'Sign Up Page' }} />
                <Stack.Screen name="Loginpage" options={{ title: 'Login Page' }} />
                <Stack.Screen name="Otppage" options={{ title: 'OTP Page' }} />
                <Stack.Screen name="AppContainer" options={{ title: 'App Container' }} />
                <Stack.Screen name="Signuppage" options={{ title: 'Sign Up Page' }} />
                <Stack.Screen name="Stationmenu" options={{ title: 'Station Menu' }} />
                <Stack.Screen name="Stationcart" options={{ title: 'Station Cart' }} />
                <Stack.Screen name="OrderTrackingPage" options={{ title: 'Track Your Order!' }} />
                <Stack.Screen name="OrderCompletion" options={{ title: 'Order Completion' }} />
                <Stack.Screen name="FoodFilterToggle" options={{ title: 'Food Filter Toggle' }} />
                <Stack.Screen name="StarRating" options={{ title: 'Star Rating' }} />
                <Stack.Screen name="ToastNotification" options={{ title: 'Toast Notification' }} />
                <Stack.Screen name="CountdownTimer" options={{ title: 'Countdown Timer' }} />
                <Stack.Screen name="DeliveryTracker" options={{ title: 'Delivery Tracker' }} />
                <Stack.Screen name="FoodQuiz" options={{ title: 'Food Quiz' }} />
                <Stack.Screen name="App" options={{ title: 'Login' }} />
                <Stack.Screen name="ChatScreen" options={{ title: 'Chat Screen' }} />
              </Stack>
            </View>
          </SafeAreaView>
        </CartProvider>
      </AuthProvider>
      </NotificationProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  responsiveWrapper: {
    flex: 1, // Ensures full height and width usage
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
  },
});

