import {
    Banknote,
    ChevronLeft,
    History,
    Info,
    MapPin,
    Navigation,
    Search,
} from "lucide-react-native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CityToCityScreen() {
  return (
    <View className="flex-1 bg-white">
      {/* Map Background Placeholder */}
      <View className="flex-1 bg-slate-200">
        {/* Top Navigation Bar */}
        <SafeAreaView>
          <View className="flex-row items-center p-4">
            <TouchableOpacity className="bg-white w-10 h-10 rounded-full items-center justify-center shadow-md">
              <ChevronLeft color="black" size={24} />
            </TouchableOpacity>

            {/* Pickup Point Card */}
            <View className="flex-1 mx-3 bg-white p-3 rounded-xl shadow-sm flex-row items-center">
              <View className="flex-1">
                <Text className="text-gray-500 text-xs">Pickup point</Text>
                <Text className="text-slate-900 font-bold" numberOfLines={1}>
                  Plot 21, New Karachi Co-Operative Housing Society
                </Text>
              </View>
              <ChevronLeft
                size={20}
                color="#cbd5e1"
                style={{ transform: [{ rotate: "180deg" }] }}
              />
            </View>
          </View>
        </SafeAreaView>

        {/* Current Location Marker Placeholder */}
        <View className="absolute top-1/2 left-1/2 -ml-4 -mt-8">
          <MapPin size={40} color="#3b82f6" fill="#3b82f6" />
        </View>

        {/* Floating Recenter Button */}
        <TouchableOpacity className="absolute right-4 top-1/2 bg-white p-3 rounded-full shadow-lg">
          <Navigation size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Bottom Sheet UI */}
      <View className="bg-white rounded-t-[32px] shadow-2xl -mt-8 pb-8">
        {/* Toll Banner - image_fc2467.jpg */}
        <View className="bg-[#C2FF12] mx-4 mt-6 p-4 rounded-2xl flex-row items-center">
          <Banknote size={24} color="black" className="mr-3" />
          <Text className="flex-1 text-[15px] font-bold leading-5 text-slate-900">
            Toll roads aren&apos;t included in the fare. Please pay them
            separately
          </Text>
        </View>

        {/* Vehicle Selection - image_fc2467.jpg */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 20 }}
        >
          <VehicleType label="Premium" icon="❄️" />
          <VehicleType label="City to city" icon="📍" isActive={true} hasInfo />
          <VehicleType label="Couriers" icon="🛵" />
          <VehicleType label="Freight" icon="🚛" />
        </ScrollView>

        {/* Search Bar - image_fc2467.jpg */}
        <TouchableOpacity className="mx-4 bg-gray-100 h-16 rounded-2xl flex-row items-center px-5 mb-6">
          <Search size={24} color="black" />
          <Text className="ml-3 text-xl font-bold text-slate-900">
            Where to & for how much?
          </Text>
        </TouchableOpacity>

        {/* Action Cards Grid - image_fc2467.jpg */}
        <View className="flex-row px-4 mb-4">
          <ActionCard title="Share your ride" icon="👥" />
          <ActionCard title="Request a car" icon="🚗" />
        </View>
        <View className="flex-row px-4">
          <ActionCard title="Send a parcel" icon="📦" />
          <ActionCard title="Request a car" icon="🚕" isWide />
        </View>
      </View>

      {/* Bottom Tab Bar Placeholder */}
      <View className="flex-row border-t border-gray-100 py-3 bg-white">
        <TouchableOpacity className="flex-1 items-center">
          <Navigation size={24} color="black" />
          <Text className="text-xs font-bold mt-1">Ride</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 items-center">
          <History size={24} color="#cbd5e1" />
          <Text className="text-xs text-gray-400 mt-1">My orders</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

{
  /* Helper Component: Vehicle Type */
}
const VehicleType = ({ label, icon, isActive, hasInfo }: any) => (
  <TouchableOpacity
    className={`items-center px-4 py-2 rounded-2xl mr-2 ${isActive ? "bg-[#eef6ff]" : ""}`}
  >
    <View className="flex-row items-center">
      <Text className="text-3xl mb-1">{icon}</Text>
      {hasInfo && (
        <View className="ml-1 bg-blue-100 rounded-full p-0.5">
          <Info size={12} color="#3b82f6" />
        </View>
      )}
    </View>
    <Text
      className={`text-sm font-bold ${isActive ? "text-slate-900" : "text-gray-400"}`}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

{
  /* Helper Component: Action Card */
}
const ActionCard = ({ title, icon, isWide }: any) => (
  <TouchableOpacity
    className={`${isWide ? "flex-1" : "w-1/2"} bg-gray-50 p-4 rounded-3xl m-1 h-32 justify-between border border-gray-100`}
  >
    <Text className="text-[17px] font-bold text-slate-800 leading-5">
      {title}
    </Text>
    <Text className="text-4xl self-end">{icon}</Text>
  </TouchableOpacity>
);
