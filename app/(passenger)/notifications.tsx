import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NOTIFICATIONS = [
  {
    id: "1",
    date: "Tuesday, 3 March",
    time: "12:29",
    text: "FIRSTORDER use karein aur Fruits & Vegetables and Chicken, Fish & Meat categories par 50% tak off paayein!",
    meta: "Min order value Rs.499, max discount Rs.500. Code paanch baar tak istimaal ho sakta hai.",
  },
  {
    id: "2",
    date: "Tuesday, 3 March",
    time: "12:13",
    text: "FIRSTORDER use karein aur Fruits & Vegetables...",
    meta: "Code do dafa tak istimaal ho sakta hai",
  },
];

export default function NotificationsScreen() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center px-4 py-4 border-b border-gray-50">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-xl font-bold mr-6">
          Notifications
        </Text>
      </View>
      <FlatList
        data={NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="px-4 py-6">
            <Text className="text-center text-gray-400 mb-4 text-xs font-medium uppercase tracking-widest">
              {item.date}
            </Text>
            <View className="bg-gray-50 p-4 rounded-2xl relative">
              <Text className="font-bold text-[15px] leading-5 text-slate-800">
                {item.text}
              </Text>
              <Text className="text-gray-500 mt-2 text-sm">{item.meta}</Text>
              <Text className="text-right text-gray-300 text-[10px] mt-2">
                {item.time}
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
