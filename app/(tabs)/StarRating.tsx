import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Rating } from 'react-native-ratings';

const StarRating = () => {
  // Explicitly type the parameter as a number
  const handleRating = (rating: number) => {
    console.log('Rated:', rating);
  };

  return (
    <View style={styles.container}>
      <Rating
        type="star"
        ratingCount={5}
        imageSize={30}
        onFinishRating={handleRating} // Pass the function
      />
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
});

export default StarRating;

