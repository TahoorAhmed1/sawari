import CustomDrawerContent from "@/components/shared/CustomDrawerContent";
import { Drawer } from "expo-router/drawer";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PassengerLayout() {
  const [currentMode, setCurrentMode] = React.useState<"driver" | "passenger">(
    "passenger"
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Drawer
        drawerContent={(props) => (
          <CustomDrawerContent
            {...props}
            mode={currentMode}
            onSwitchMode={() =>
              setCurrentMode((prev) =>
                prev === "driver" ? "passenger" : "driver"
              )
            }
          />
        )}
        screenOptions={{
          drawerType: "front",
          drawerStyle: {
            width: "80%",
            backgroundColor: "#ffffff",
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
          },
          overlayColor: "rgba(0,0,0,0.6)",
          headerShown: false,
        }}
      >
        <Drawer.Screen name="index" options={{ drawerLabel: "Home" }} />
      </Drawer>
    </SafeAreaView>
  );
}
