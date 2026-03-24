import CustomDrawerContent from "@/components/shared/CustomDrawerContent";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Drawer } from "expo-router/drawer";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PassengerLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <BottomSheetModalProvider>
        <Drawer
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            headerShown: false,
            drawerStyle: {
              width: "80%",
              backgroundColor: "white",
            },
          }}
        >
          <Drawer.Screen name="index" options={{ drawerLabel: "Home" }} />
        </Drawer>
      </BottomSheetModalProvider>
    </SafeAreaView>
  );
}
