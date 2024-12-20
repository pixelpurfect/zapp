import { Stack } from 'expo-router';


export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="HomeScreen" options={{ title: 'About' }} />
      <Stack.Screen name="MenuList" options={{ title: 'menu' }} />
    </Stack>
  );
}

