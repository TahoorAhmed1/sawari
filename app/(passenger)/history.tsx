import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HISTORY = [
  {
    id: "1",
    date: "3 Feb",
    title: "Hashmanis Hospital Numaish",
    time: "11:07 AM",
    price: "PKR 150.00",
    status: "completed",
  },
  {
    id: "2",
    date: "28 Jan",
    title: "Hashmanis Hospital Numaish",
    time: "11:14 AM",
    price: "PKR 0.00",
    status: "You cancelled",
  },
];

export default function HistoryScreen() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View className="px-5">
        <Text className="text-3xl font-black mb-6">Order history</Text>
      </View>

      <View className="flex-row px-5 mb-6">
        <FilterChip label="All" active />
        <FilterChip label="City rides" />
        <FilterChip label="Delivery" />
      </View>

      <FlatList
        data={HISTORY}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="px-5 mb-8">
            <Text className="font-bold text-lg mb-4">{item.date}</Text>
            <View className="flex-row items-center">
              <View className="bg-gray-100 p-3 rounded-2xl">
                <MaterialCommunityIcons
                  name="car-side"
                  size={32}
                  color="#cbd5e1"
                />
              </View>
              <View className="ml-4 flex-1">
                {item.status !== "completed" && (
                  <Text className="text-red-500 text-xs font-bold">
                    {item.status}
                  </Text>
                )}
                <Text className="text-gray-400 text-[10px] uppercase">
                  Karachi
                </Text>
                <Text
                  className="font-bold text-[16px] text-slate-800"
                  numberOfLines={1}
                >
                  {item.title}
                </Text>
                <View className="flex-row justify-between mt-1">
                  <Text className="text-gray-400">{item.time}</Text>
                  <Text className="font-bold text-slate-800">{item.price}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const FilterChip = ({ label, active }: any) => (
  <TouchableOpacity
    className={`px-5 py-2 rounded-full mr-2 ${active ? "bg-slate-800" : "bg-gray-100"}`}
  >
    <Text className={`font-bold ${active ? "text-white" : "text-slate-800"}`}>
      {label}
    </Text>
  </TouchableOpacity>
);
