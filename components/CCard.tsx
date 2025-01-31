import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface CCardProps {
  customStyles?: any;
  restaurant: {
    name: string;
    address: string;
  };
}

const CCard: React.FC<CCardProps> = ({ restaurant }) => {
  return (
    <View style={styles.cardWrapper}>
      <LinearGradient
        colors={['#1a1a1a', '#2d2d2d']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardContainer}
      >
        {/* Left content section */}
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{restaurant.name}</Text>
            <View style={styles.addressContainer}>
              <View style={styles.locationDot} />
              <Text style={styles.address}>{restaurant.address}</Text>
            </View>
          </View>
          
          {/* Rating and timing indicators */}
          <View style={styles.infoContainer}>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>4.5 ★</Text>
            </View>
            <Text style={styles.timing}>20-30 min</Text>
          </View>
        </View>

        {/* Right decoration */}
        <View style={styles.decorationContainer}>
          <View style={styles.decorationLine} />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    width: width * 0.9,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  cardContainer: {
    height: 120,
    borderRadius: 16,
    padding: 15,
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    overflow: 'hidden',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  address: {
    fontSize: 16,
    color: '#a0a0a0',
    letterSpacing: 0.3,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  ratingContainer: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rating: {
    color: '#4CAF50',
    fontWeight: '600',
    fontSize: 14,
  },
  timing: {
    color: '#a0a0a0',
    fontSize: 14,
  },
  decorationContainer: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  decorationLine: {
    width: 3,
    height: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 1.5,
  },
});

export default CCard;