import { View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

interface MapProps {
  location: { latitude: number; longitude: number };
  children?: React.ReactNode;
}

export const MapLayer = ({ location, children }: MapProps) => {
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      className="w-full h-full"
      initialRegion={{
        ...location,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      // Use "google" styling to match the clean inDrive look
    >
      <Marker coordinate={location}>
        <View className="w-8 h-8 bg-blue-500 rounded-full border-4 border-white shadow-lg" />
      </Marker>
      {children}
    </MapView>
  );
};
