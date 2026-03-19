import CustomDrawerContent from "@/components/shared/CustomDrawerContent";
import { Drawer } from "expo-router/drawer";

export default function DriverLayout() {
  return (
    <Drawer
      drawerContent={(props: any) => (
        <CustomDrawerContent {...props} role="driver" />
      )}
      screenOptions={{
        headerShown: false,
        drawerStyle: { width: "80%", backgroundColor: "#1A1A1A" }, // Often drivers get a dark-themed UI
      }}
    >
      <Drawer.Screen name="dashboard" />
      <Drawer.Screen name="earnings" />
    </Drawer>
  );
}
