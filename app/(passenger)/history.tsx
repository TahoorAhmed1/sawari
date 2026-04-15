import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const HISTORY = [
  {
    id: "1",
    date: "3 Feb",
    city: "Karachi",
    title: "Hashmanis Hospital Numaish",
    time: "11:07 AM",
    price: "PKR 150.00",
    status: "completed",
  },
  {
    id: "2",
    date: "28 Jan",
    city: "Karachi",
    title: "Hashmanis Hospital Numaish",
    time: "11:18 AM",
    price: "PKR 153.00",
    status: "completed",
  },
  {
    id: "3",
    date: "28 Jan",
    city: "Karachi",
    title: "Hashmanis Hospital Numaish",
    time: "11:14 AM",
    price: "PKR 0.00",
    status: "You cancelled",
  },
  {
    id: "4",
    date: "18 Nov",
    city: "Karachi",
    title: "Hashmanis Hospital Numaish",
    time: "11:00 AM",
    price: "PKR 0.00",
    status: "Driver cancelled",
  },
  {
    id: "5",
    date: "18 Nov",
    city: "Karachi",
    title: "Jewellers Center",
    time: "10:58 AM",
    price: "PKR 0.00",
    status: "You cancelled",
  },
];

export default function HistoryScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      {/* Optional: Control status bar style */}
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View className="flex-1 px-5 pt-0">
        {/* Header with Back Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="self-start mb-4"
        >
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>

        {/* Title */}
        <Text className="text-3xl font-bold mb-6">Order history</Text>

        {/* Filter Chips */}
        <View className="flex-row mb-6">
          <FilterChip label="All" active />
          <FilterChip label="City rides" />
          <FilterChip label="Delivery" />
        </View>

        {/* Order List */}
        <FlatList
          data={HISTORY}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: "/(passenger)/history/[id]", // ← Exact path to your file
                  params: { id: item.id }, // ← Pass id here
                });
              }}
              className="mb-6"
            >
              {/* Date Header */}
              <Text className="font-bold text-lg mb-3 px-1">{item.date}</Text>

              {/* Ride Card */}
              <View className="bg-gray-50 rounded-3xl p-4 flex-row items-center">
                {/* Car Icon */}
                <View className="bg-white p-3 rounded-2xl shadow-sm">
                  <MaterialCommunityIcons
                    name="car-side"
                    size={42}
                    color="#94a3b8"
                  />
                </View>

                {/* Details */}
                <View className="flex-1 ml-4">
                  {item.status !== "completed" && (
                    <Text className="text-red-500 text-sm font-bold mb-1">
                      {item.status}
                    </Text>
                  )}

                  <Text className="text-gray-400 text-xs uppercase tracking-widest">
                    {item.city}
                  </Text>

                  <Text
                    className="font-semibold text-[17px] text-slate-800 mt-0.5"
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>

                  <View className="flex-row justify-between items-center mt-2">
                    <Text className="text-gray-500 text-base">{item.time}</Text>
                    <Text className="font-bold text-slate-800 text-[17px]">
                      {item.price}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

// Filter Chip Component
const FilterChip = ({
  label,
  active = false,
}: {
  label: string;
  active?: boolean;
}) => (
  <TouchableOpacity
    className={`px-6 py-2.5 rounded-full mr-3 ${
      active ? "bg-slate-900" : "bg-gray-100"
    }`}
  >
    <Text
      className={`font-semibold text-base ${
        active ? "text-white" : "text-slate-800"
      }`}
    >
      {label}
    </Text>
  </TouchableOpacity>
);
