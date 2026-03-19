import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
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

export default function OTPScreen() {
  const router = useRouter();
  // 1. Get the phone number passed from the previous screen
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const [code, setCode] = useState("");

  const handleVerify = (val: string) => {
    setCode(val);
    // 2. Automate navigation when code is full
    if (val.length === 6) {
      // replace ensures user can't go back to OTP screen after login
      router.replace("/(passenger)");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* 3. Header with Back Button (Crucial for UX) */}
        <View className="px-4 py-2">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center"
          >
            <Ionicons name="arrow-back" size={28} color="black" />
          </TouchableOpacity>
        </View>

        <View className="p-6 flex-1">
          <Text className="text-[32px] font-black text-black leading-tight">
            Verification code
          </Text>
          <Text className="text-gray-500 text-lg mt-2 mb-10 font-medium">
            Sent to +92 {phone || "0000000000"}
          </Text>

          {/* 4. Styled Input with Character Spacing */}
          <TextInput
            className="bg-gray-50 border-2 border-gray-100 h-20 rounded-2xl text-center text-4xl font-black tracking-[15px] selection:bg-[#C2FF12]"
            keyboardType="number-pad"
            maxLength={6}
            autoFocus
            value={code}
            onChangeText={handleVerify}
            placeholder="000000"
            placeholderTextColor="#e2e8f0"
          />

          {/* 5. Resend Logic Section */}
          <View className="flex-row items-center mt-8">
            <Text className="text-gray-500 text-base font-medium">
              Didn&apos;t receive code?{" "}
            </Text>
            <TouchableOpacity onPress={() => console.log("Resend requested")}>
              <Text className="text-[#C2FF12] bg-black px-3 py-1 rounded-full font-bold">
                Resend
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
