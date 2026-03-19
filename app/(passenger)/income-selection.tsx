import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function IncomeSelectionScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-4 py-2">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-slate-900">Tahoor</Text>
        <Ionicons name="person-circle" size={34} color="#3b82f6" />
      </View>

      <ScrollView className="flex-1 px-5 pt-6">
        <View className="bg-gray-50/50 p-6 rounded-[40px] border border-gray-100 mb-6">
          <Text className="text-[26px] font-black text-slate-900 mb-6 leading-8">
            How do you want to get income with us?
          </Text>

          <IncomeOption
            title="City driver"
            sub="Drive passengers around the city"
            icon="car"
            onPress={() => router.push("/(passenger)/choose-vehicle")}
          />
          <IncomeOption
            title="Courier"
            sub="Deliver packages up to 20kg within the city"
            icon="package-variant"
            isMCI
          />
          <IncomeOption
            title="City to City driver"
            sub="Transport passengers between cities"
            icon="map-marker-distance"
            isMCI
          />
          <IncomeOption
            title="Freight driver"
            sub="Deliver cargoes over 20kg"
            icon="truck"
            isMCI
          />
        </View>

        <TouchableOpacity className="flex-row items-center bg-gray-50 p-5 rounded-[30px] mb-10">
          <View className="flex-1">
            <Text className="text-xl font-bold text-slate-900">Karachi</Text>
            <Text className="text-gray-400 font-medium">Change the city</Text>
          </View>
          <View className="bg-green-100 p-2.5 rounded-full">
            <Ionicons name="location" size={20} color="#22c55e" />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const IncomeOption = ({ title, sub, icon, isMCI, onPress }: any) => (
  <TouchableOpacity onPress={onPress} className="flex-row items-center mb-6">
    <View className="w-14 h-14 bg-gray-100 rounded-2xl items-center justify-center mr-4">
      {isMCI ? (
        <MaterialCommunityIcons name={icon} size={28} color="#64748b" />
      ) : (
        <Ionicons name={icon} size={28} color="#64748b" />
      )}
    </View>
    <View className="flex-1">
      <Text className="text-[17px] font-bold text-slate-900">{title}</Text>
      <Text className="text-gray-400 text-sm leading-4">{sub}</Text>
    </View>
    <Ionicons name="chevron-forward" size={18} color="#cbd5e1" />
  </TouchableOpacity>
);
