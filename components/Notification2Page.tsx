// import React, { Component } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   TextInput,
//   Button,
//   Alert,
// } from "react-native";
// import { useRouter } from "expo-router";
// import { initializeApp } from "firebase/app";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// // Firebase configuration
// // const firebaseConfig = {
// //   apiKey: "YOUR_API_KEY",
// //   authDomain: "YOUR_AUTH_DOMAIN",
// //   projectId: "YOUR_PROJECT_ID",
// //   storageBucket: "YOUR_STORAGE_BUCKET",
// //   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
// //   appId: "YOUR_APP_ID",
// // };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// class Notification2Page extends Component {
//   state = {
//     notifications: [],
//     email: "",
//     password: "",
//   };

//   router = useRouter();

//   handleLogin = async () => {
//     const { email, password } = this.state;

//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       this.addNotification("✅", "Your login is confirmed", "Just now");
//     } catch (error: any) {
//       this.addNotification("❌", "Incorrect email or password!", "Just now");
//     }
//   };

//   handleOrderDelivered = () => {
//     const user = auth.currentUser;

//     if (!user) {
//       Alert.alert("Error", "You must be logged in to receive order notifications.");
//       return;
//     }

//     // Simulate order delivery notification
//     this.addNotification("📦", "Your order is delivered", "Just now");
//   };

//   addNotification = (emoji: string, message: string, time: string) => {
//     this.setState((prevState) => ({
//       notifications: [
//         ...prevState.notifications,
//         { emoji, message, time },
//       ],
//     }));
//   };

//   render() {
//     const { notifications, email, password } = this.state;

//     return (
//       <View style={styles.container}>
//         {/* Header */}
//         <View style={styles.header}>
//           <Text style={styles.headerText}>NOTIFICATIONS</Text>
//           <TouchableOpacity onPress={() => this.router.back()} style={styles.closeButton}>
//             <Text style={styles.closeButtonText}>×</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Login Section */}
//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter your email"
//             placeholderTextColor="#A9A9A9"
//             keyboardType="email-address"
//             value={email}
//             onChangeText={(text) => this.setState({ email: text })}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Enter your password"
//             placeholderTextColor="#A9A9A9"
//             secureTextEntry
//             value={password}
//             onChangeText={(text) => this.setState({ password: text })}
//           />
//           <Button title="Log In" onPress={this.handleLogin} />
//         </View>

//         {/* Simulate Order Delivery */}
//         <TouchableOpacity style={styles.deliveryButton} onPress={this.handleOrderDelivered}>
//           <Text style={styles.deliveryButtonText}>Simulate Order Delivery</Text>
//         </TouchableOpacity>

//         {/* Notifications List */}
//         <ScrollView style={styles.notificationsList}>
//           {notifications.map((notification, index) => (
//             <View key={index} style={styles.notificationItem}>
//               <Text style={styles.emoji}>{notification.emoji}</Text>
//               <View style={styles.textContainer}>
//                 <Text style={styles.notificationMessage}>{notification.message}</Text>
//                 <Text style={styles.time}>{notification.time}</Text>
//               </View>
//             </View>
//           ))}
//         </ScrollView>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#2C2C2C",
//     padding: 16,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   headerText: {
//     color: "#FFFFFF",
//     fontSize: 22,
//     fontWeight: "bold",
//   },
//   closeButton: {
//     padding: 5,
//   },
//   closeButtonText: {
//     color: "#FFFFFF",
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   inputContainer: {
//     marginBottom: 16,
//   },
//   input: {
//     backgroundColor: "#3E3E3E",
//     borderRadius: 8,
//     color: "#FFFFFF",
//     padding: 12,
//     marginBottom: 8,
//   },
//   deliveryButton: {
//     backgroundColor: "#FFD700",
//     padding: 12,
//     borderRadius: 8,
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   deliveryButtonText: {
//     color: "#2C2C2C",
//     fontWeight: "bold",
//   },
//   notificationsList: {
//     flex: 1,
//   },
//   notificationItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#3E3E3E",
//     borderRadius: 12,
//     padding: 12,
//     marginBottom: 12,
//   },
//   emoji: {
//     fontSize: 24,
//     marginRight: 16,
//   },
//   textContainer: {
//     flex: 1,
//   },
//   notificationMessage: {
//     color: "#FFFFFF",
//     fontSize: 16,
//     fontWeight: "500",
//   },
//   time: {
//     color: "#A9A9A9",
//     fontSize: 12,
//     marginTop: 4,
//   },
// });

// export default Notification2Page;

