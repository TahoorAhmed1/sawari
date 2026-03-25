import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "./global.css";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen
            name="(auth)"
            options={{ animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="(passenger)"
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen name="(driver)" options={{ gestureEnabled: false }} />
        </Stack>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
