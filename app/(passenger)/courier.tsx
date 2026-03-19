import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function CourierScreen() {
  const router = useRouter();
  const snapPoints = useMemo(() => ["45%", "60%"], []);

  return (
    <View className="flex-1 bg-white">
      {/* Map Background */}
      {/* <DevMap /> */}

      {/* Header Overlays */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-12 left-5 w-10 h-10 bg-white rounded-full shadow-md items-center justify-center z-10"
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <BottomSheet snapPoints={snapPoints} index={0}>
        <View className="flex-1 px-5 pt-2">
          <Text className="text-2xl font-black text-slate-900 mb-6">
            Courier delivery
          </Text>

          {/* Pickup Point (Fixed) */}
          <View className="flex-row items-center mb-6">
            <View className="w-3 h-3 rounded-full bg-green-600 mr-4" />
            <Text className="text-lg font-medium text-slate-800">
              NKCHS Union Road
            </Text>
          </View>

          {/* Destination Input */}
          <View className="bg-gray-100 h-14 rounded-xl flex-row items-center px-4 mb-3">
            <Ionicons name="search" size={20} color="#64748b" />
            <TextInput
              placeholder="To"
              className="flex-1 ml-3 text-lg font-medium"
              placeholderTextColor="#94a3b8"
            />
            <TouchableOpacity className="flex-row items-center border-l border-gray-200 pl-3">
              <Text className="text-gray-400 mr-1">Add stops</Text>
              <Ionicons name="add" size={20} color="gray" />
            </TouchableOpacity>
          </View>

          {/* Order Details Button */}
          <TouchableOpacity className="bg-gray-100 h-14 rounded-xl flex-row items-center px-4 mb-3">
            <MaterialCommunityIcons
              name="tune-vertical"
              size={20}
              color="black"
            />
            <Text className="flex-1 ml-3 text-lg font-medium">
              Order details
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
          </TouchableOpacity>

          {/* Fare Offer Button */}
          <TouchableOpacity className="bg-gray-100 h-14 rounded-xl flex-row items-center px-4 mb-8">
            <Ionicons name="cash-outline" size={20} color="black" />
            <Text className="flex-1 ml-3 text-lg font-medium">
              Offer your fare
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
          </TouchableOpacity>

          {/* Action Button */}
          <TouchableOpacity className="bg-[#C2FF12] h-16 rounded-2xl items-center justify-center shadow-sm">
            <Text className="font-black text-xl">Find a courier</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
}
