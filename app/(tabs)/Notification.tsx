import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router"; // For navigation

const Notification = () => {
  const router = useRouter();

  const notifications = [
    {
      emoji: "📦", // Emoji replacement for "zapp.png"
      message: "Your zapper has picked up their order. They’ll reach in",
      highlight: "15 minutes!",
      time: "1d ago",
    },
    {
      emoji: "🍜", // Emoji replacement for "ramen.png"
      message: "Is your name Ramen? Because you make my taste buds go wild <3",
      time: "1d ago",
    },
    {
      emoji: "💪", // Emoji replacement for "protein.png"
      message: "Your protein goal for the day has not been met yet! Order asap~",
      time: "20m ago",
    },
    {
      emoji: "🔥", // Emoji replacement for "activity-icon.png"
      message: "You haven’t been active in 3 days, Let’s change that",
      time: "8hours ago",
    },
    {
      emoji: "👑", // Emoji replacement for "wallet-icon.png"
      message: "You have 25 points in your wallet. Redeem kardo!",
      time: "1w ago",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>NOTIFICATIONS</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <ScrollView style={styles.notificationsList}>
        {notifications.map((notification, index) => (
          <View key={index} style={styles.notificationItem}>
            <Text style={styles.emoji}>{notification.emoji}</Text>
            <View style={styles.textContainer}>
              <Text style={styles.notificationMessage}>
                {notification.message}{" "}
                {notification.highlight && <Text style={styles.highlight}>{notification.highlight}</Text>}
              </Text>
              <Text style={styles.time}>{notification.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2C2C2C", // Dark background
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  notificationsList: {
    flex: 1,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3E3E3E", // Slightly lighter background for notification cards
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  emoji: {
    fontSize: 24, // Emoji size
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  notificationMessage: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  highlight: {
    color: "#FFD700", // Yellow for highlights
    fontWeight: "bold",
  },
  time: {
    color: "#A9A9A9", // Gray for time
    fontSize: 12,
    marginTop: 4,
  },
});

export default Notification;
