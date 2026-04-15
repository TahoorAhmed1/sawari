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
    router.push({
      pathname: "/(auth)/otp",
      params: { phone },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-12 h-12 items-center justify-center ml-2 mt-2"
        >
          <Ionicons name="arrow-back" size={26} color="black" />
        </TouchableOpacity>

        <View className="px-5 flex-1">
          <Text className="text-3xl font-bold text-black  mt-4">
            Join us via phone number
          </Text>
          <Text className="text-black text-xl mt-2 mb-8">
            We&apos;ll text a code to verify your phone
          </Text>

          <View
            className={`flex-row items-center h-[55px] px-3 rounded-2xl border-2 ${
              error ? "border-slate-100" : "border-slate-100"
            }`}
          >
            <TouchableOpacity className="flex-row items-center border-r border-gray-300 pr-3 mr-3">
              <Text className="text-xl mr-1">🇵🇰</Text>
              <Ionicons name="caret-down" size={11} color="black" />
              <Text className="text-xl font-semibold ml-2">+92</Text>
            </TouchableOpacity>

            <TextInput
              className="flex-1 text-xl font-semibold text-black"
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

          {error && <Text className="text-red-500 text-sm mt-2">{error}</Text>}
        </View>

        <View className="px-5 pb-6">
          <TouchableOpacity
            onPress={handleNext}
            activeOpacity={0.8}
            className={`h-[55px] rounded-2xl items-center justify-center bg-primary ${
              phone.length >= 10 ? "" : "cursor-not-allowed"
            }`}
          >
            <Text className={`font-semibold text-2xl ${"text-white"}`}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
