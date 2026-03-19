import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FreightRequestScreen() {
  const router = useRouter();
  const [pickupTime, setPickupTime] = useState("Up to 1 hour");

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-4 py-2 border-b border-gray-50">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="black" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-xl font-black mr-6">
          Freight
        </Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Horizontal Service Selector (Top) */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="py-4 px-4 bg-white"
        >
          <TopIcon label="Premium" icon="car-sport-outline" />
          <TopIcon label="City to city" icon="map-outline" />
          <TopIcon label="Couriers" icon="moped" isMCI />
          <TopIcon label="Freight" icon="truck-outline" active />
        </ScrollView>

        <View className="px-5 pb-10">
          {/* Location Inputs */}
          <View className="bg-gray-50 rounded-2xl p-4 mb-4">
            <LocationRow
              label="Pickup location"
              value="Karachi, Plot 21"
              isGreen
            />
            <View className="h-[1px] bg-gray-200 my-3 ml-8" />
            <LocationRow label="Destination" value="Destination" isGrey />
          </View>

          {/* Pickup Time */}
          <Text className="font-bold text-slate-800 mb-3 ml-1">
            Pickup time
          </Text>
          <View className="flex-row mb-6">
            <TimeChip
              label="10-20 min"
              current={pickupTime}
              set={setPickupTime}
            />
            <TimeChip
              label="Up to 1 hour"
              current={pickupTime}
              set={setPickupTime}
            />
            <TimeChip
              label="Schedule"
              current={pickupTime}
              set={setPickupTime}
            />
          </View>

          {/* Form Fields */}
          <FormButton label="Description of the cargo" icon="chevron-forward" />
          <FormButton
            label="Vehicle size"
            subLabel="Medium truck (M)"
            icon="chevron-forward"
          />

          {/* Options Chips */}
          <Text className="font-bold text-slate-800 mt-6 mb-3 ml-1">
            Options{" "}
            <Ionicons
              name="information-circle-outline"
              size={16}
              color="gray"
            />
          </Text>
          <View className="flex-row flex-wrap">
            <OptionChip label="Easypaisa Pay" />
            <OptionChip label="Closed body truck" />
            <OptionChip label="Movers" />
            <OptionChip label="Ride as a passenger" />
            <OptionChip label="Furniture/Fragiles" />
          </View>

          {/* Cargo Image Placeholder */}
          <Text className="font-bold text-slate-800 mt-6 mb-3 ml-1">
            Picture of your cargo
          </Text>
          <TouchableOpacity className="w-24 h-24 bg-gray-50 rounded-2xl items-center justify-center border-2 border-dashed border-gray-200">
            <Ionicons name="add" size={32} color="gray" />
          </TouchableOpacity>

          <FormButton
            label="Offer your fare"
            icon="chevron-forward"
            className="mt-6"
          />

          {/* Final Request Button */}
          <TouchableOpacity className="bg-[#C2FF12] h-16 rounded-2xl items-center justify-center mt-8 shadow-sm">
            <Text className="font-black text-xl">Create request</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Sub-components for cleaner code
const TopIcon = ({ label, icon, active, isMCI }: any) => {
  const IconLib = isMCI ? MaterialCommunityIcons : Ionicons;
  return (
    <View
      className={`items-center px-4 py-2 rounded-xl mr-2 ${active ? "bg-blue-50 border border-blue-100" : ""}`}
    >
      <IconLib name={icon} size={28} color={active ? "#3b82f6" : "#64748b"} />
      <Text
        className={`text-[10px] mt-1 font-bold ${active ? "text-blue-500" : "text-gray-500"}`}
      >
        {label}
      </Text>
    </View>
  );
};

const LocationRow = ({ label, value, isGreen, isGrey }: any) => (
  <TouchableOpacity className="flex-row items-center">
    <View
      className={`w-2 h-2 rounded-full mr-4 ${isGreen ? "bg-green-500" : "bg-gray-300"}`}
    />
    <View className="flex-1">
      <Text className="text-gray-400 text-xs">{label}</Text>
      <Text
        className={`text-lg font-bold ${isGrey ? "text-gray-300" : "text-slate-800"}`}
      >
        {value}
      </Text>
    </View>
    <Ionicons name="chevron-forward" size={18} color="#cbd5e1" />
  </TouchableOpacity>
);

const TimeChip = ({ label, current, set }: any) => {
  const active = current === label;
  return (
    <TouchableOpacity
      onPress={() => set(label)}
      className={`px-4 py-2.5 rounded-full mr-2 ${active ? "bg-slate-800" : "bg-gray-100"}`}
    >
      <Text
        className={`font-bold text-sm ${active ? "text-white" : "text-slate-600"}`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const FormButton = ({ label, subLabel, icon, className }: any) => (
  <TouchableOpacity
    className={`bg-gray-50 h-16 rounded-2xl flex-row items-center px-4 mb-3 ${className}`}
  >
    <View className="flex-1">
      {subLabel && (
        <Text className="text-gray-400 text-[10px] uppercase font-bold">
          {label}
        </Text>
      )}
      <Text
        className={`text-lg font-medium ${subLabel ? "text-slate-800" : "text-gray-400"}`}
      >
        {subLabel || label}
      </Text>
    </View>
    <Ionicons name={icon} size={20} color="#cbd5e1" />
  </TouchableOpacity>
);

const OptionChip = ({ label }: { label: string }) => (
  <TouchableOpacity className="bg-gray-50 px-4 py-2 rounded-full mr-2 mb-2 border border-gray-100">
    <Text className="text-slate-700 font-medium">{label}</Text>
  </TouchableOpacity>
);
