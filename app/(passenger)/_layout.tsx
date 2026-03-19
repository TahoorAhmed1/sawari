import CustomDrawerContent from "@/components/shared/CustomDrawerContent";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function PassengerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false, // We use a custom menu button on the map
          drawerStyle: {
            width: "80%",
            backgroundColor: "white",
          },
        }}
      >
        <Drawer.Screen name="index" options={{ drawerLabel: "Home" }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}
