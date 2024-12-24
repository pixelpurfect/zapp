import React from 'react';
import { Modal, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface PaymentUnsuccessfulPopupProps {
  visible: boolean;
  onClose: () => void;
}

const PaymentUnsuccessfulPopup: React.FC<PaymentUnsuccessfulPopupProps> = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.overlay} onPress={onClose}>
        <View style={styles.container}>
          <Image
            source={{
              uri: 'https://i.pinimg.com/564x/91/1f/68/911f68df9f0b5c9e474c81ab06a9c03e.jpg', // Replace with your image URL 
            }}
            style={styles.image}
          />
          <Text style={styles.message}>payment unsuccessful</Text>
          <Text style={styles.footer}>Click anywhere to continue</Text>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    backgroundColor: '#000',
    borderRadius: 20,
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
  },
  message: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
    textTransform: 'lowercase',
  },
  footer: {
    fontSize: 14,
    color: '#fff',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default PaymentUnsuccessfulPopup;
