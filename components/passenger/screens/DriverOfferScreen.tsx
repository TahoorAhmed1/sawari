import {
  BottomSheetModal,
  BottomSheetView
} from "@gorhom/bottom-sheet";
import { X } from "lucide-react-native";
import React, { useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

interface DriverOfferScreenProps {
  onAccept: () => void;
  onDecline: () => void;
  onCancel: () => void;
}

export function DriverOfferScreen({
  onAccept,
  onDecline,
  onCancel,
}: DriverOfferScreenProps) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = React.useMemo(() => [350], []);

  React.useEffect(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleAccept = () => {
    bottomSheetModalRef.current?.dismiss();
    onAccept();
  };

  const handleDecline = () => {
    bottomSheetModalRef.current?.dismiss();
    onDecline();
  };

  const handleCancel = () => {
    bottomSheetModalRef.current?.dismiss();
    onCancel();
  };

  return (
    <View className="flex-1">
      <MapView
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: 24.86,
          longitude: 67.02,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
      >
        {[
          { lat: 24.855, lng: 67.018 },
          { lat: 24.862, lng: 67.025 },
          { lat: 24.858, lng: 67.012 },
        ].map((pos, i) => (
          <Marker
            key={i}
            coordinate={{ latitude: pos.lat, longitude: pos.lng }}
          >
            <View className="bg-[#C8F000] w-8 h-8 rounded-full items-center justify-center border-2 border-white">
              <Text className="text-base">🛵</Text>
            </View>
          </Marker>
        ))}
      </MapView>

      <TouchableOpacity
        onPress={handleCancel}
        className="absolute bg-red-100 rounded-full px-5 py-3 flex-row items-center shadow"
        style={{ top: 36, left: 16 }}
      >
        <X size={16} color="#ef4444" />
        <Text className="ml-2 text-[14px] font-bold text-red-500">
          Cancel request
        </Text>
      </TouchableOpacity>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onDismiss={handleCancel}
      >
        <BottomSheetView className="flex-1 px-5 pb-10">
          <View className="flex-row items-baseline gap-3 mb-4">
            <Text className="text-[28px] font-black text-gray-900">PKR259</Text>
            <Text className="text-[24px] font-black text-gray-400">3 min</Text>
          </View>

          <View className="flex-row items-center mb-5">
            <View className="relative mr-4">
              <View className="w-14 h-14 rounded-full bg-gray-200 items-center justify-center border-2 border-gray-300 overflow-hidden">
                <Text className="text-3xl">👨</Text>
              </View>
              <View className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 rounded-full items-center justify-center border border-white">
                <Text className="text-[8px] text-white font-black">✓</Text>
              </View>
            </View>

            <View className="flex-1">
              <View className="flex-row items-center gap-2">
                <Text className="text-[16px] font-black text-gray-900">
                  Sajjad
                </Text>
                <Text className="text-[14px]">⭐</Text>
                <Text className="text-[14px] font-bold text-gray-700">
                  4.94
                </Text>
                <Text className="text-[13px] text-gray-400">2153 rides</Text>
              </View>
              <Text className="text-[13px] text-gray-700 font-semibold mt-0.5">
                MOTOR-BIKE Power
              </Text>
              <Text className="text-[13px] font-bold text-purple-600 mt-0.5">
                Platinum driver
              </Text>
            </View>
          </View>

          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={handleDecline}
              activeOpacity={0.8}
              className="flex-1 bg-gray-100 rounded-2xl py-4 items-center"
            >
              <Text className="text-[16px] font-bold text-gray-800">
                Decline
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleAccept}
              activeOpacity={0.85}
              className="flex-1 bg-[#C8F000] rounded-2xl py-4 items-center"
            >
              <Text className="text-[16px] font-black text-gray-900">
                Accept
              </Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
}
