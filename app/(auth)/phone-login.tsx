import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PhoneLoginScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleNext = () => {
    if (phone.length < 10) {
      setError("Enter your phone number");
      return;
    }
    setError(null);
    router.push("/(auth)/otp");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Navigation Header */}
        <TouchableOpacity onPress={() => router.back()} className="p-5">
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>

        <View className="px-6 flex-1">
          <Text className="text-[32px] font-black text-black leading-tight">
            Join us via phone number
          </Text>
          <Text className="text-gray-500 text-lg mt-2 mb-10 font-medium">
            We&apos;ll text a code to verify your phone
          </Text>

          {/* Professional Input Container */}
          <View
            className={`flex-row items-center h-16 px-4 rounded-xl bg-gray-50 border-2 ${
              error
                ? "border-red-500"
                : "border-gray-100 focus:border-[#C2FF12]"
            }`}
          >
            {/* Country Picker Section */}
            <TouchableOpacity className="flex-row items-center border-r border-gray-200 pr-3 mr-4">
              <Text className="text-2xl mr-2">🇵🇰</Text>
              <Ionicons name="caret-down" size={12} color="black" />
              <Text className="text-xl font-bold ml-2">+92</Text>
            </TouchableOpacity>

            <TextInput
              className="flex-1 text-xl font-bold"
              placeholder=""
              keyboardType="phone-pad"
              value={phone}
              maxLength={10}
              onChangeText={(val) => {
                setPhone(val);
                if (error) setError(null);
              }}
              autoFocus
            />
          </View>

          {error && (
            <Text className="text-red-500 text-sm mt-2 font-medium ml-1">
              {error}
            </Text>
          )}
        </View>

        {/* Footer Action */}
        <View className="p-6">
          <TouchableOpacity
            onPress={handleNext}
            activeOpacity={0.8}
            className={`h-16 rounded-3xl items-center justify-center ${
              phone.length >= 10 ? "bg-[#C2FF12]" : "bg-gray-100"
            }`}
          >
            <Text
              className={`font-bold text-xl ${phone.length >= 10 ? "text-black" : "text-gray-400"}`}
            >
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
