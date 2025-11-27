import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="map" options={{ headerShown: false }} />
        <Stack.Screen name="vaccines/index" options={{ headerShown: false }} />
        <Stack.Screen name="vaccines/[id]" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
