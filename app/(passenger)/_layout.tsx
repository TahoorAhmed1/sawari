import CustomDrawerContent from "@/components/shared/CustomDrawerContent";
import { Drawer } from "expo-router/drawer";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PassengerLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerType: "front", // The primary requirement for overlay
          drawerStyle: {
            width: "80%", // Balanced width for professional look [10]
            backgroundColor: "#ffffff",
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
          },
          overlayColor: "rgba(0,0,0,0.6)", // Deep overlay for focus [8, 13]
          headerShown: false, // Often hidden for custom UI [10]
        }}
      >
        <Drawer.Screen name="index" options={{ drawerLabel: "Home" }} />
      </Drawer>
    </SafeAreaView>
  );
}
