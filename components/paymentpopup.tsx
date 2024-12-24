import React from 'react';
import { Modal, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface PaymentSuccessPopupProps {
  visible: boolean;
  onClose: () => void;
  transactionId: string;
  amountPaid: string;
  paymentMethod: string;
}

const PaymentSuccessPopup: React.FC<PaymentSuccessPopupProps> = ({
  visible,
  onClose,
  transactionId,
  amountPaid,
  paymentMethod,
}) => {
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <TouchableOpacity style={styles.overlay} onPress={onClose}>
        <View style={styles.container}>
          <Image
            source={{
              uri: 'https://www.example.com/burger-image.jpg', // Replace with your image URL
            }}
            style={styles.image}
          />
          <Text style={styles.title}>payment successful</Text>
          <Text style={styles.transaction}>Transaction ID: {transactionId}</Text>
          <Text style={styles.amount}>Amount paid: ₹{amountPaid}</Text>
          <Text style={styles.method}>Paid by {paymentMethod}</Text>
          <Text style={styles.processing}>Your order is being processed</Text>
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
    backgroundColor: '#000',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  transaction: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  amount: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  method: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
  processing: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  footer: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
});

export default PaymentSuccessPopup;
