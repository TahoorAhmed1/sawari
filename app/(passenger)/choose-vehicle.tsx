import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChooseVehicleScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-4 py-2">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-lg font-bold text-slate-900">Close</Text>
        </TouchableOpacity>
      </View>

      <View className="px-5 pt-8">
        <Text className="text-2xl font-black text-slate-900 mb-10">
          Choose your vehicle
        </Text>

        <VehicleRow
          label="Car"
          icon="car-side"
          onPress={() => router.push("/(passenger)/driver-reg-step1")}
        />
        <VehicleRow label="Motorcycle" icon="motorbike" />
        <VehicleRow label="Rickshaw" icon="rickshaw" />
      </View>
    </SafeAreaView>
  );
}

const VehicleRow = ({ label, icon, onPress }: any) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex-row items-center py-5 border-b border-gray-50"
  >
    <View className="w-16 h-16 bg-gray-100 rounded-3xl items-center justify-center mr-5">
      <MaterialCommunityIcons name={icon} size={35} color="black" />
    </View>
    <Text className="text-xl font-bold flex-1">{label}</Text>
    <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
  </TouchableOpacity>
);
