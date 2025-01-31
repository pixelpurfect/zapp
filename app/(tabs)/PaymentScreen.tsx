import { useState, useEffect } from 'react';
import { Button, View, Alert, Platform } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { getFunctions, httpsCallable } from 'firebase/functions';
import Constants from 'expo-constants';

const PaymentScreen: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const functions = getFunctions();

  const handlePayment = async (): Promise<void> => {
    setLoading(true);

    try {
      // 1. Create order on Firebase
      const createOrder = httpsCallable<RazorpayOrderData, { orderId: string }>(
        functions,
        'createRazorpayOrder'
      );

      const orderResult = await createOrder({
        amount: 500,
        currency: 'INR',
        receipt: `receipt_${Date.now()}`
      });

      const { orderId } = orderResult.data;

      // 2. Create checkout URL
      const options = {
        key: Constants.expoConfig?.extra?.razorpayKeyId || '', // Get from app.config.js
        amount: 500 * 100,
        currency: 'INR',
        name: 'Your Company Name',
        description: 'Purchase Description',
        order_id: orderId,
        prefill: {
          email: 'user@example.com',
          contact: '9999999999',
          name: 'John Doe'
        },
        theme: { color: '#F37254' },
        handler: function () {}, // This will be handled by the redirect URL
        modal: {
          ondismiss: function () {
            Alert.alert('Payment cancelled');
          }
        }
      };

      // 3. Create a redirect URL for handling payment success
      const successUrl = `${Constants.expoConfig?.extra?.appUrl}/payment-success`;
      
      // 4. Create the checkout URL with all parameters
      const checkoutUrl = `https://checkout.razorpay.com/v1/checkout.html?key=${options.key}&amount=${options.amount}&currency=${options.currency}&name=${encodeURIComponent(options.name)}&description=${encodeURIComponent(options.description)}&order_id=${orderId}&prefill[email]=${encodeURIComponent(options.prefill.email)}&prefill[contact]=${options.prefill.contact}&prefill[name]=${encodeURIComponent(options.prefill.name)}&theme[color]=${encodeURIComponent(options.theme.color)}&redirect=true&callback_url=${encodeURIComponent(successUrl)}`;

      // 5. Open payment in WebBrowser
      const result = await WebBrowser.openAuthSessionAsync(
        checkoutUrl,
        successUrl
      );

      if (result.type === 'success') {
        // Parse URL parameters from success redirect
        const urlParams = new URLSearchParams(result.url.split('?')[1]);
        const paymentId = urlParams.get('razorpay_payment_id');
        const signature = urlParams.get('razorpay_signature');
        
        if (paymentId && signature) {
          // 6. Verify payment on backend
          const verifyPayment = httpsCallable(functions, 'verifyRazorpayPayment');
          await verifyPayment({
            orderCreationId: orderId,
            razorpayPaymentId: paymentId,
            razorpayOrderId: orderId,
            razorpaySignature: signature
          });

          Alert.alert('Success', 'Payment completed successfully');
        }
      } else {
        Alert.alert('Error', 'Payment was not completed');
      }
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Payment failed');
      console.error('Payment failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Button
        title={loading ? 'Processing...' : 'Pay Now'}
        onPress={handlePayment}
        disabled={loading}
      />
    </View>
  );
};

export default PaymentScreen