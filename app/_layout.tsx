import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import "./global.css";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="dark" />

      <Stack
        screenOptions={{
          headerShown: false, // Professional apps usually use custom headers
          animation: "fade_from_bottom", // Smooth transition
        }}
      >
        {/* 3. Logical Route Grouping */}
        <Stack.Screen name="index" />
        <Stack.Screen
          name="(auth)"
          options={{ animation: "slide_from_right" }}
        />
        <Stack.Screen name="(passenger)" options={{ gestureEnabled: false }} />
        <Stack.Screen name="(driver)" options={{ gestureEnabled: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
