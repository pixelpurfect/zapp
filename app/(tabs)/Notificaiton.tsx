import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
} from 'react-native';

const Notification: React.FC = () => {
  const [notifications, setNotifications] = useState<any[]>([]); // Removing interface and using `any[]`
  const [popupVisible, setPopupVisible] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  // Fetch notifications from your data source
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const mockNotifications = [
          {
            message:
              "Your zapper has picked up their order. They'll reach in 15 minutes!",
            timestamp: '1d ago',
            icon: require('./assets/zapper.png'), // Ensure path is correct
          },
          {
            message: 'Is your name Ramen? Because you make my taste buds go wild <3',
            timestamp: '1d ago',
            icon: require('./assets/ramen.png'), // Ensure path is correct
          },
          {
            message:
              'Your protein goal for the day has not been met yet! Order asap~',
            timestamp: '20m ago',
            icon: require('./assets/protein.png'), // Ensure path is correct
          },
        ];
        setNotifications(mockNotifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    fetchNotifications();
  }, []);

  const togglePopup = () => {
    Animated.timing(animation, {
      toValue: popupVisible ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setPopupVisible(!popupVisible);
  };

  const renderNotification = (notification: any) => {
    return (
      <View style={styles.notificationContainer} key={notification.message}>
        <View style={styles.iconContainer}>
          <Image source={notification.icon} style={styles.icon} />
        </View>
        <View style={styles.messageContainer}>
          <Text style={styles.message}>{notification.message}</Text>
          <Text style={styles.timestamp}>{notification.timestamp}</Text>
        </View>
      </View>
    );
  };

  const popupStyle = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [100, 0],
        }),
      },
    ],
    opacity: animation,
    width: 330,
    height: 420,
    borderRadius: 43,
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={togglePopup} style={styles.notificationButton}>
        <Text style={styles.buttonText}>Notifications</Text>
      </TouchableOpacity>

      {popupVisible && (
        <Animated.View style={[styles.popup, popupStyle]}>
          <View style={styles.popupHeader}>
            <Text style={styles.popupTitle}>NOTIFICATIONS</Text>
            <TouchableOpacity onPress={togglePopup}>
              <Text style={styles.closeButton}>X</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.notificationsList}>
            {notifications.map(renderNotification)}
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  notificationButton: {
    backgroundColor: '#6200EE',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  popup: {
    backgroundColor: 'white',
    padding: 20,
    position: 'absolute',
    top: 50,
    right: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  popupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 18,
    color: 'red',
  },
  notificationsList: {
    marginTop: 10,
  },
  notificationContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 10,
  },
  icon: {
    width: 40,
    height: 40,
  },
  messageContainer: {
    flex: 1,
  },
  message: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: 12,
    color: 'gray',
  },
});

export  default Notification ;
