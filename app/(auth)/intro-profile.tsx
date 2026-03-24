import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function IntroProfileScreen() {
  const router = useRouter();
  const { role = "passenger" } = useLocalSearchParams<{ role?: string }>();
  const [firstName, setFirstName] = useState("");

  const nextRoute = useMemo(
    () => (role === "driver" ? "/(driver)" : "/(passenger)"),
    [role]
  );

  const canContinue = firstName.trim().length > 0;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="px-5 pt-1 flex-1 pb-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-12 h-12 items-center justify-center -ml-2"
          >
            <Ionicons name="arrow-back" size={26} color="black" />
          </TouchableOpacity>

          <Text className="text-4xl font-black text-gray-900 mt-12 leading-tight">
            Welcome to inDrive!
          </Text>
          <Text className="text-lg text-gray-500 mt-3">
            Please introduce yourself
          </Text>

          <TextInput
            className="mt-10 h-14 border-2 border-gray-800 rounded-xl px-4 text-2xl text-black"
            placeholder="First name"
            placeholderTextColor="#6B7280"
            value={firstName}
            onChangeText={setFirstName}
            autoFocus
            returnKeyType="done"
            onSubmitEditing={() => {
              if (!canContinue) return;
              router.replace(nextRoute as "/(passenger)" | "/(driver)");
            }}
          />

          <View className="mt-auto">
            <TouchableOpacity
              onPress={() =>
                router.replace(nextRoute as "/(passenger)" | "/(driver)")
              }
              activeOpacity={0.9}
              disabled={!canContinue}
              className={`h-14 rounded-2xl items-center justify-center ${canContinue ? "bg-[#C2FF12]" : "bg-gray-100"
                }`}
            >
              <Text
                className={`text-2xl font-semibold ${canContinue ? "text-black" : "text-gray-400"
                  }`}
              >
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
