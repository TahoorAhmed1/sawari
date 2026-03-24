import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PasskeyScreen() {
  const router = useRouter();

  const goNext = () => {
    router.push("/(auth)/role-select" as never);
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

        <View className="items-center mt-5 mb-8">
          <View className="w-40 h-40 rounded-full bg-lime-100 items-center justify-center">
            <MaterialCommunityIcons name="fingerprint" size={88} color="#111827" />
          </View>
        </View>

        <Text className="text-4xl font-black text-gray-900 leading-tight">
          Fast and secure login with a passkey
        </Text>
        <Text className="text-2xl text-gray-600 mt-3">No more waiting for the code</Text>

        <View className="mt-8">
          <View className="flex-row items-start mb-4">
            <MaterialCommunityIcons name="fingerprint" size={22} color="#111827" />
            <Text className="text-xl text-gray-800 ml-3 flex-1 leading-7">
              Sign in with your fingerprint, face, PIN or pattern. We don&apos;t
              collect this info.
            </Text>
          </View>

          <View className="flex-row items-start">
            <Ionicons name="shield-checkmark-outline" size={22} color="#111827" />
            <Text className="text-xl text-gray-800 ml-3 flex-1 leading-7">
              Passkey is more secure, stored only on your device account.
            </Text>
          </View>
        </View>

        <View className="mt-auto">
          <TouchableOpacity
            onPress={goNext}
            activeOpacity={0.9}
            className="h-14 rounded-2xl items-center justify-center bg-[#C2FF12]"
          >
            <Text className="text-2xl font-semibold text-black">Create passkey</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={goNext}
            activeOpacity={0.9}
            className="h-14 rounded-2xl items-center justify-center bg-gray-100 mt-3"
          >
            <Text className="text-2xl font-medium text-gray-700">Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
