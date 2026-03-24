import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RoleSelectScreen() {
  const router = useRouter();

  const onPick = (role: "passenger" | "driver") => {
    router.push({
      pathname: "/(auth)/intro-profile" as never,
      params: { role },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-5 pt-1 pb-6">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-12 h-12 items-center justify-center -ml-2"
        >
          <Ionicons name="arrow-back" size={26} color="black" />
        </TouchableOpacity>

        <Text className="text-4xl font-black text-gray-900 mt-14 text-center leading-tight">
          Are you a passenger or a driver?
        </Text>
        <Text className="text-lg text-gray-500 text-center mt-3">
          You can change the mode later
        </Text>

        <View className="flex-1 items-center justify-center">
          <View className="w-64 h-40 rounded-3xl bg-lime-100 items-center justify-center">
            <Text className="text-7xl">🚗</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => onPick("passenger")}
          activeOpacity={0.9}
          className="h-14 rounded-2xl items-center justify-center bg-[#C2FF12]"
        >
          <Text className="text-2xl font-semibold text-black">Passenger</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onPick("driver")}
          activeOpacity={0.9}
          className="h-14 rounded-2xl items-center justify-center bg-gray-100 mt-3"
        >
          <Text className="text-2xl font-medium text-gray-800">Driver</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
