import CustomDrawerContent from "@/components/shared/CustomDrawerContent";
import { Drawer } from "expo-router/drawer";
import React from "react";

export default function DriverLayout() {
  const [currentMode, setCurrentMode] = React.useState<"driver" | "passenger">(
    "driver"
  );
  return (
    <Drawer
      drawerContent={(props: any) => (
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
        headerShown: false,
        drawerStyle: { width: "80%", backgroundColor: "#1A1A1A" }, // Often drivers get a dark-themed UI
      }}
    >
      <Drawer.Screen name="dashboard" />
      <Drawer.Screen name="earnings" />
    </Drawer>
  );
}
