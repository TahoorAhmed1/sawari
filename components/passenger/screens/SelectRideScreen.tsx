import { Ionicons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Navigation, Pencil } from "lucide-react-native";
import React, { useMemo, useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";

import { RIDE_OPTIONS } from "../data";

const { height } = Dimensions.get("window");

interface SelectRideScreenProps {
  onFindOffers: () => void;
  onPaymentPress: () => void;
  onBack: () => void;
}

export function SelectRideScreen({
  onFindOffers,
  onPaymentPress,
  onBack,
}: SelectRideScreenProps) {
  const [selected, setSelected] = useState("moto");
  const [fare, setFare] = useState(235);
  const [autoAccept, setAutoAccept] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["50%", "80r%"], []);

  const selectedRide = useMemo(
    () => RIDE_OPTIONS.find((r) => r.id === selected)!,
    [selected]
  );

  return (
    <View className="flex-1">
      <View className="flex-1">
        <MapView
          provider={PROVIDER_GOOGLE}
          style={StyleSheet.absoluteFillObject}
          initialRegion={{
            latitude: 24.855,
            longitude: 67.015,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
          }}
        >
          <Marker coordinate={{ latitude: 24.8607, longitude: 67.0104 }}>
            <View className="w-4 h-4 rounded-full bg-green-600 border-2 border-white" />
          </Marker>
          <Marker coordinate={{ latitude: 24.845, longitude: 67.022 }}>
            <View className="w-4 h-4 rounded-full bg-red-400 border-2 border-white" />
          </Marker>
          <Polyline
            coordinates={[
              { latitude: 24.8607, longitude: 67.0104 },
              { latitude: 24.845, longitude: 67.022 },
            ]}
            strokeColor="#2563EB"
            strokeWidth={4}
          />
        </MapView>

        <View className="absolute top-4 left-4 right-4 bg-white rounded-2xl px-5 py-4 shadow-md">
          <View className="flex-row items-center mb-3">
            <View className="w-4 h-4 rounded-full border-[3px] border-green-600 mr-3" />
            <Text className="text-[15px] font-bold text-gray-900 flex-1">
              Plot 21
            </Text>
            <TouchableOpacity className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center">
              <Text className="text-xl">+</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row items-start">
            <View className="w-4 h-4 rounded-full border-[3px] border-red-400 mr-3 mt-0.5" />
            <Text className="text-[15px] font-bold text-gray-900 flex-1 leading-5">
              Hashmanis Hospital Numaish{" "}
              <Text className="text-gray-400 font-normal">~11 min.</Text>
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={onBack}
          className="absolute bottom-4 left-4 w-10 h-10 bg-white rounded-full items-center justify-center shadow"
        >
          <Ionicons name="arrow-back" size={20} color="#333" />
        </TouchableOpacity>
      </View>

      <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints} index={0}>
        <BottomSheetScrollView
          className="flex-1 bg-white"
          showsVerticalScrollIndicator={false}
        >
          <View className="items-center pt-2 pb-1">
            <View className="w-10 h-1 rounded-full bg-gray-300" />
          </View>

          <View className="mx-4 mt-3 border border-gray-200 rounded-2xl overflow-hidden mb-2">
            <View className="flex-row items-center px-4 py-4">
              <Text className="text-4xl mr-4">{selectedRide.emoji}</Text>
              <View className="flex-1">
                <View className="flex-row items-center gap-1">
                  <Text className="text-[16px] font-black text-gray-900">
                    {selectedRide.name}
                  </Text>
                  <View className="w-4 h-4 rounded-full border border-gray-400 items-center justify-center ml-1">
                    <Text className="text-[9px] text-gray-500 font-bold">
                      i
                    </Text>
                  </View>
                </View>
                <Text className="text-[13px] text-gray-500 mt-0.5">
                  👤 {selectedRide.seats} • {selectedRide.eta}
                </Text>
                <Text className="text-[12px] text-gray-400 mt-0.5">
                  {selectedRide.tag}
                </Text>
              </View>
              <TouchableOpacity className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center">
                <Pencil size={14} color="#333" />
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center px-4 pb-4">
              <TouchableOpacity
                className="w-11 h-11 rounded-full bg-gray-100 items-center justify-center"
                onPress={() => setFare((f) => Math.max(200, f - 5))}
              >
                <Text className="text-xl font-bold text-gray-700">−</Text>
              </TouchableOpacity>
              <View className="flex-1 items-center">
                <Text className="text-[22px] font-black text-gray-900">
                  PKR{fare}
                </Text>
                <Text className="text-[12px] text-gray-400">
                  Recommended fare: PKR235
                </Text>
              </View>
              <TouchableOpacity
                className="w-11 h-11 rounded-full bg-gray-100 items-center justify-center"
                onPress={() => setFare((f) => f + 5)}
              >
                <Text className="text-xl font-bold text-gray-700">+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {RIDE_OPTIONS.filter((r) => r.id !== selected).map((ride) => (
            <TouchableOpacity
              key={ride.id}
              onPress={() => setSelected(ride.id)}
              activeOpacity={0.75}
              className="flex-row items-center px-5 py-4 border-b border-gray-50"
            >
              <Text className="text-3xl mr-4">{ride.emoji}</Text>
              <View className="flex-1">
                <Text className="text-[15px] font-bold text-gray-900">
                  {ride.name}
                </Text>
                {ride.seats > 0 && (
                  <Text className="text-[12px] text-gray-500 mt-0.5">
                    👤 {ride.seats} • {ride.eta}
                  </Text>
                )}
                <Text className="text-[12px] text-gray-400">{ride.tag}</Text>
              </View>
              {ride.fare ? (
                <Text className="text-[14px] font-bold text-gray-800">
                  {ride.fare}
                </Text>
              ) : null}
            </TouchableOpacity>
          ))}

          <View className="h-24" />
        </BottomSheetScrollView>

        <BottomSheetView className="bg-white px-4 pb-8 pt-3 border-t border-gray-100">
          <View className="flex-row items-center mb-3">
            <Navigation size={18} color="#333" />
            <Text className="flex-1 ml-3 text-[14px] font-semibold text-gray-800">
              Auto-accept offer of PKR{fare}
            </Text>
            <Switch
              value={autoAccept}
              onValueChange={setAutoAccept}
              trackColor={{ false: "#e5e7eb", true: "#86efac" }}
              thumbColor={autoAccept ? "#16a34a" : "#fff"}
            />
          </View>

          <TouchableOpacity
            onPress={onFindOffers}
            activeOpacity={0.85}
            className="bg-[#C8F000] rounded-2xl py-4 flex-row items-center justify-center"
          >
            <Text className="text-xl mr-2">💵</Text>
            <Text className="text-[17px] font-black text-gray-900">
              Find offers
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onPaymentPress}
            activeOpacity={0.7}
            className="mt-3 items-center"
          >
            <Text className="text-[12px] text-gray-400">Payment method</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}
