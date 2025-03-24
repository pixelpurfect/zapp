import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import Navbar from '@/components/Navbar';
import BiryaniCardScreen from '@/components/Biryanicard';
import CCard from "@/components/CCard";
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import FloatingMenu from '@/components/FloatingMenu';
import { collection, getDocs, query, where, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { db, auth } from '../../firebase/Config';
import {NotificationBadge} from './NotificationBadge';
import { NotificationsList } from '@/components/NotificationsList';


const { width, height } = Dimensions.get('window');

interface Restaurant {
  id: string;
  name: string;
  address: string;
}

interface Notification {
  id: string;
  ordererId: string;
  acceptedBy: string;
  orderId: string;
  restaurantName: string;
  location: string;
  amount: number;
  read: boolean;
  acceptedAt: Date;
}


export default function HomeScreen() {
  const [category, setCategory] = useState('');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [searchText, setSearchText] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [searchResults, setSearchResults] = useState<Restaurant[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'restaurantsData'));
        const restaurantList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
          address: doc.data().address,
        }));
        setRestaurants(restaurantList);
        setFilteredRestaurants(restaurantList);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, []);

  useEffect(() => {
    let filtered = restaurants;

    if (category) {
      filtered = filtered.filter(restaurant => restaurant.address === category);
    }

    if (searchText) {
      filtered = filtered.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }

    setFilteredRestaurants(filtered);
  }, [category, searchText, restaurants]);

  const handleCardPress = (restaurant: Restaurant) => {
    router.push(`/MenuList?restaurantId=${restaurant.id}&name=${encodeURIComponent(restaurant.name)}`);
  };

  const handleProfilePress = () => {
    router.push('/ProfilePage');
  };

  const handleMenuToggle = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const customCardStyles = {
    cardContainer: {
      width: width * 0.9,
      height: 120,
      backgroundColor: '#000000',
      borderRadius: 10,
      marginVertical: 10,
      padding: 15,
      flexDirection: 'row',
      alignItems: 'center',
    },
    textContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingRight: 15,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#ffffff',
    },
    subtitle: {
      fontSize: 16,
      color: '#888888',
    },
  };

  // const MenuButton = () => (
  //   <TouchableOpacity style={styles.menuButton} onPress={handleMenuToggle}>
  //     <NotificationBadge />
  //     <Text style={styles.menuText}>☰</Text>
  //   </TouchableOpacity>
  // );

  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* <NotificationsList /> */}
        
        <View style={styles.searchBarContainer}>
          <TextInput
            placeholder="Search for restaurants"
            placeholderTextColor="#aaa"
            style={styles.searchBar}
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
          {searchResults.length > 0 && (
            <FlatList
              data={searchResults}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.searchResult}
                  onPress={() => handleCardPress(item)}
                >
                  <Text style={styles.searchResultText}>{item.name}</Text>
                </TouchableOpacity>
              )}
              style={styles.searchResultsContainer}
            />
          )}
        </View>

        <Text style={styles.heading}>Popular foods!</Text>

        <View style={styles.cardWrapper}>
          <TouchableOpacity onPress={() => handleCardPress({ id: 'popular', name: "Classic Biryani", address: "Java Green" })}>
            <CCard customStyles={customCardStyles} restaurant={{ name: "Classic Biryani", address: "Java Green" }} />
          </TouchableOpacity>
        </View>

        <BiryaniCardScreen />

        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownLabel}>Choose Location</Text>
          <Picker
            selectedValue={category}
            style={styles.dropdown}
            onValueChange={(value) => setCategory(value)}
          >
            <Picker.Item label="All Locations" value="" />
            <Picker.Item label="Java" value="Java" />
            <Picker.Item label="UB" value="UB" />
          </Picker>
        </View>

        <Text style={styles.heading}>Hotel List</Text>

        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant) => (
            <TouchableOpacity
              style={styles.cardWrapper}
              key={restaurant.id}
              onPress={() => handleCardPress(restaurant)}
            >
              <CCard customStyles={customCardStyles} restaurant={restaurant} />
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noResults}>No restaurants found in this location.</Text>
        )}
      </ScrollView>

      {isMenuOpen && (
        <FloatingMenu
          onProfilePress={handleProfilePress}
        />
      )}
 <TouchableOpacity style={styles.menuButton} onPress={handleMenuToggle}>
        <NotificationBadge />
        <Text style={styles.menuText}>☰</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollContainer: {
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 20,
    color: '#333',
  },
  searchBarContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  searchResultsContainer: {
    backgroundColor: '#fff',
    marginTop: 5,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    maxHeight: 200,
  },
  searchResult: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchResultText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  dropdown: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    height: 50,
  },
  dropdownLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  cardWrapper: {
    marginVertical: 10,
    alignItems: 'center',
  },
  menuButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 30,
    zIndex: 1000,
  },
  menuText: {
    color: '#fff',
    fontSize: 24,
  },
  noResults: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginTop: 20,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  notificationsContainer: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  notificationItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  unreadNotification: {
    backgroundColor: '#f0f9ff',
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  notificationDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  notificationAmount: {
    fontSize: 14,
    color: '#4caf50',
    fontWeight: '500',
    marginTop: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
});