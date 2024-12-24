import { Stack } from 'expo-router';
import RegistrationScreen from './RegistrationScreen';
import EmailVerificationScreen from './EmailVerificationScreen';
import PasswordResetScreen from './PasswordResetScreen';


export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="form" options={{ title: 'Form' }} />
     <Stack.Screen name="HomeScreen" options={{ title: 'About' }} /> 
      <Stack.Screen name="MenuList" options={{ title: 'menu' }} />
      <Stack.Screen name="Registration" options={{ title: 'Registration' }} />
      <Stack.Screen name="Login" options={{ title: 'Login' }} />
      <Stack.Screen name="EmailVerification" options={{ title: 'Email Verification' }} />
      <Stack.Screen name="PasswordReset" options={{ title: 'Password Reset' }} />
      <Stack.Screen name="ProfilePage" options={{ title: 'ProfilePage' }} />
    </Stack>
  );
}