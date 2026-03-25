import { Ionicons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetFooter,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { Pencil } from "lucide-react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

const RIDE_OPTIONS = [
  {
    id: "moto",
    name: "Moto",
    emoji: "🏍️",
    seats: 1,
    eta: "2 min",
    tag: "No traffic, lower prices",
    fare: 190,
  },
  {
    id: "mini",
    name: "Mini",
    emoji: "🚗",
    seats: 4,
    eta: "3 min",
    tag: "Lower fares, no AC",
    fare: 401,
  },
  {
    id: "rickshaw",
    name: "Rickshaw",
    emoji: "🛺",
    seats: 3,
    eta: "2 min",
    tag: "Lower fares",
    fare: 295,
  },
  {
    id: "ride_ac",
    name: "Ride A/C",
    emoji: "🚙",
    seats: 4,
    eta: "4 min",
    tag: "Cars with AC",
    fare: 464,
  },
  {
    id: "premium",
    name: "Premium",
    emoji: "🚘",
    seats: 4,
    eta: "2 min",
    tag: "Sedans with AC",
    fare: 681,
  },
  {
    id: "couriers",
    name: "Couriers",
    emoji: "📦",
    seats: "up to 20kg",
    eta: "",
    tag: "Request package delivery",
    fare: 0,
  },
];

export function SelectRideScreen({ onFindOffers, onBack }: any) {
  const [selected, setSelected] = useState("moto");
  const [fare, setFare] = useState(190);
  const [autoAccept, setAutoAccept] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["45%", "90%"], []);
  const selectedRide = useMemo(
    () => RIDE_OPTIONS.find((r) => r.id === selected)!,
    [selected],
  );

  // Use useCallback for the footer to prevent re-renders
  const renderFooter = useCallback(
    (props: any) => (
      <BottomSheetFooter {...props} bottomInset={0}>
        <View className="bg-white px-5 pb-5 pt-2 border-t border-gray-100 shadow-2xl">
          <View className="flex-row items-center justify-between mb-4 px-1">
            <View className="flex-row items-center">
              <Ionicons
                name="send"
                size={20}
                color="#000"
                style={{ transform: [{ rotate: "-45deg" }] }}
              />
              <Text className="ml-3 text-[13px] font-black text-gray-800">
                Auto-accept offer of PKR{fare}
              </Text>
            </View>
            <Switch
              value={autoAccept}
              onValueChange={setAutoAccept}
              trackColor={{ false: "#E5E7EB", true: "#000" }}
              thumbColor={"#fff"}
            />
          </View>

          <TouchableOpacity
            onPress={onFindOffers}
            className="bg-[#BFFF07] rounded-[22px] py-3 flex-row items-center justify-center shadow-sm"
          >
            <View className="mr-3 bg-green-800 w-7 h-5 rounded-md items-center justify-center">
              <Text className="text-[12px] text-white font-bold">$</Text>
            </View>
            <Text className="text-[22px] font-black text-gray-900">
              Find offers
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetFooter>
    ),
    [fare, autoAccept],
  );

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1">
        <MapView
          provider={PROVIDER_GOOGLE}
          style={StyleSheet.absoluteFillObject}
          initialRegion={{
            latitude: 24.8607,
            longitude: 67.0104,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        />

        {/* Custom Header (Location Box) */}
        <View className="absolute top-12 left-4 right-4 bg-white rounded-2xl px-4 py-3 shadow-lg ">
          <View className="flex-row items-center mb-3">
            <View className="w-4 h-4 rounded-full border-[3.5px] border-green-600 mr-3" />
            <Text className="text-[17px] font-bold">Karachi</Text>
          </View>
          <View className="h-[1px] bg-gray-100 ml-7 mb-3" />
          <View className="flex-row items-center">
            <View className="w-4 h-4 rounded-full border-[3.5px] border-red-400 mr-3" />
            <Text className="text-[17px] font-bold flex-1">
              Hashmanis Hospital{" "}
              <Text className="text-gray-400 font-normal">Numaish</Text>
            </Text>
            <Ionicons name="add" size={24} color="#000" />
          </View>
        </View>
        <View className="absolute top-[160px] left-4 right-4 bg-white rounded-xl flex-row items-center px-4 py-3 shadow-md">
          <Ionicons name="receipt-outline" size={20} color="#000" />
          <Text className="flex-1 ml-3 text-[14px] font-bold text-gray-800">
            Got promo code? Use it here
          </Text>
          <Ionicons name="chevron-forward" size={18} color="#000" />
        </View>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={0}
        footerComponent={renderFooter} // PINS THE FOOTER
      >
        <BottomSheetScrollView
          contentContainerStyle={{ paddingBottom: 180 }} // Ensure list scrolls above footer
          showsVerticalScrollIndicator={false}
        >
          {/* Main Selected Card */}
          <View className="mx-4 mt-2 bg-[#F2F2F2] rounded-[30px] p-1">
            <View className="bg-white rounded-[28px] p-4 shadow-sm">
              <View className="flex-row items-center">
                <Text className="text-5xl mr-3">{selectedRide.emoji}</Text>
                <View className="flex-1">
                  <Text className="text-[18px] font-bold">
                    {selectedRide.name} ⓘ
                  </Text>
                  <Text className="text-gray-600 font-bold">
                    👤 {selectedRide.seats} • {selectedRide.eta}
                  </Text>
                  <Text className="text-gray-400">{selectedRide.tag}</Text>
                </View>
                <TouchableOpacity className="bg-gray-100 p-2 rounded-full">
                  <Pencil size={18} color="#000" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Fare Control */}
            <View className="flex-row items-center justify-between px-6 py-4">
              <TouchableOpacity
                onPress={() => setFare((f) => f - 5)}
                className="bg-white w-14 h-14 rounded-full items-center justify-center shadow-sm"
              >
                <Ionicons name="remove" size={32} color="#000" />
              </TouchableOpacity>
              <View className="items-center">
                <Text className="text-3xl font-black">PKR{fare}</Text>
                <Text className="text-gray-500 text-xs">
                  Recommended fare: PKR{fare}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setFare((f) => f + 5)}
                className="bg-white w-14 h-14 rounded-full items-center justify-center shadow-sm"
              >
                <Ionicons name="add" size={32} color="#000" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Other List Items */}
          <View className="mt-4">
            {RIDE_OPTIONS.filter((r) => r.id !== selected).map((ride) => (
              <TouchableOpacity
                key={ride.id}
                onPress={() => setSelected(ride.id)}
                className="flex-row items-center px-6 py-4"
              >
                <Text className="text-4xl mr-4">{ride.emoji}</Text>
                <View className="flex-1">
                  <Text className="text-[17px] font-bold">{ride.name}</Text>
                  <Text className="text-gray-500 font-bold">
                    👤 {ride.seats} {ride.eta && `• ${ride.eta}`}
                  </Text>
                  <Text className="text-gray-400 text-xs">{ride.tag}</Text>
                </View>
                <Text className="text-[16px] font-bold">
                  {ride.fare > 0 ? `~PKR${ride.fare}` : ""}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
}
