import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SupportScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center px-4 py-2">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="black" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-xl font-bold mr-6">
          Support
        </Text>
      </View>

      <ScrollView className="bg-gray-50">
        <SectionHeader title="Main topics" />
        <View className="bg-white">
          <SupportRow title="City" />
          <SupportRow title="City to city" />
          <SupportRow title="Couriers" />
          <SupportRow title="Freight" />
          <SupportRow title="Grocery" isLast />
        </View>

        <SectionHeader title="More" />
        <View className="bg-white">
          <SupportRow title="App issues" />
          <SupportRow title="About inDrive" isLast />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const SectionHeader = ({ title }: { title: string }) => (
  <View className="px-5 py-6">
    <Text className="text-lg font-black text-slate-900">{title}</Text>
  </View>
);

const SupportRow = ({ title, isLast }: { title: string; isLast?: boolean }) => (
  <TouchableOpacity
    className={`flex-row items-center px-5 h-16 ${!isLast ? "border-b border-gray-100" : ""}`}
  >
    <Text className="flex-1 text-lg font-medium text-slate-800">{title}</Text>
    <Ionicons name="chevron-forward" size={20} color="black" />
  </TouchableOpacity>
);
