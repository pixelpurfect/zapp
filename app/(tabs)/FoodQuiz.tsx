import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';

const FoodQuiz = () => {
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [opacity] = useState(new Animated.Value(1)); // Start opacity at 1 to ensure it's visible

  const questions = [
    { question: 'What is the main ingredient in sushi?', options: ['Rice', 'Wheat', 'Corn'], answer: 'Rice' },
    { question: 'Which country is famous for pasta?', options: ['Italy', 'India', 'China'], answer: 'Italy' },
  ];

  const handleAnswer = (option: string) => {
    if (option === questions[questionIndex].answer) {
      setScore(score + 1);
    }
    setQuestionIndex(questionIndex + 1);
    animateTransition();
  };

  const animateTransition = () => {
    // Fade out effect
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      // Fade in effect
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <View style={styles.container}>
      {questionIndex < questions.length ? (
        <Animated.View style={[styles.quizContainer, { opacity }]}>
          <Text style={styles.question}>{questions[questionIndex].question}</Text>
          {questions[questionIndex].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleAnswer(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </Animated.View>
      ) : (
        <Text style={styles.result}>Your score is: {score}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9', // Light background color to contrast with white card
    padding: 20,
  },
  quizContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 30, // Increased padding to avoid content being too tight
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    minWidth: 300, // Ensure that the quiz card has enough width on smaller screens
  },
  question: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  optionText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  result: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});

export default FoodQuiz;




