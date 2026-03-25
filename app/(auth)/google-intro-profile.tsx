import { Entypo, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function IntroProfileScreen() {
  const router = useRouter();
  const { role = "passenger" } = useLocalSearchParams<{ role?: string }>();

  // Pre-filled state to match the screenshot
  const [firstName, setFirstName] = useState("Gauhwj");
  const [email, setEmail] = useState("gauhwjhwuwhehej@gmail.com");
  const [phone, setPhone] = useState("");

  const nextRoute = useMemo(
    () => (role === "driver" ? "/(driver)" : "/(passenger)"),
    [role]
  );

  const canContinue = firstName.trim().length > 0 && email.trim().length > 0;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="px-6 flex-1 pb-10">
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="mt-2 -ml-2 w-10 h-10 items-center justify-center"
          >
            <Ionicons name="arrow-back" size={28} color="black" />
          </TouchableOpacity>

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
            {/* Header */}
            <Text className="text-[32px] font-bold text-gray-900 mt-6 tracking-tight">
              Confirm your information
            </Text>

            {/* Avatar Section */}
            <View className="items-center mt-8">
              <View className="relative">
                <View className="w-32 h-32 rounded-full bg-[#F3F4F6]" />
                <TouchableOpacity
                  activeOpacity={0.8}
                  className="absolute bottom-1 right-1 bg-[#D4FF1E] w-9 h-9 rounded-full items-center justify-center border-4 border-white"
                >
                  <Entypo name="plus" size={20} color="black" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Input Fields */}
            <View className="mt-10 space-y-4">
              {/* Name Input */}
              <View className="bg-[#F3F4F6] rounded-xl px-4 py-3">
                <Text className="text-gray-400 text-sm font-medium">Name</Text>
                <TextInput
                  className="text-xl text-black font-medium mt-0.5"
                  value={firstName}
                  onChangeText={setFirstName}
                />
              </View>

              {/* Email Input */}
              <View className="bg-[#F8F8F8] rounded-xl px-4 py-3">
                <Text className="text-gray-300 text-sm font-medium">Email</Text>
                <TextInput
                  className="text-lg text-gray-400 font-medium mt-0.5"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* Phone Input */}
              <View className="flex-row items-center bg-[#F3F4F6] rounded-xl h-[70px] px-4">
                <View className="flex-row items-center border-r border-gray-300 pr-3 mr-3">
                  <Text className="text-xl mr-2">🇵🇰</Text>
                  <Ionicons name="caret-down" size={14} color="black" />
                  <Text className="text-lg ml-2 font-medium">+92</Text>
                </View>
                <TextInput
                  className="flex-1 text-lg text-black font-medium"
                  placeholder=""
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
              </View>
            </View>
          </ScrollView>

          <View className="mt-4">
            <TouchableOpacity
              onPress={() => router.replace(nextRoute as any)}
              activeOpacity={0.9}
              className={`h-16 rounded-[20px] items-center justify-center ${
                canContinue ? "bg-[#D4FF1E]" : "bg-[#F3F4F6]"
              }`}
            >
              <Text className="text-2xl font-bold text-black">Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
