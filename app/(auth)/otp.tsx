import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Linking,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OTPScreen() {
  const router = useRouter();
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const [code, setCode] = useState("");
  const [seconds, setSeconds] = useState(91);
  const inputRef = React.useRef<TextInput | null>(null);

  const focusOtp = () => {
    inputRef.current?.focus();
  };

  const handleVerify = (val: string) => {
    const cleaned = val.replace(/[^\d]/g, "").slice(0, 4);
    setCode(cleaned);
    if (cleaned.length === 4) {
      router.push("/(auth)/passkey" as never);
    }
  };

  React.useEffect(() => {
    if (seconds <= 0) return;
    const timer = setInterval(() => setSeconds((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  const canResend = seconds === 0;
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="px-2 pt-1">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-12 h-12 items-center justify-center"
          >
            <Ionicons name="arrow-back" size={26} color="black" />
          </TouchableOpacity>
        </View>

        <View className="px-5 flex-1">
          <Text className="text-4xl font-black text-black mt-6">
            Enter the code
          </Text>
          <Text className="text-xl text-gray-700 mt-3 leading-7">
            We sent your code via WhatsApp to {"\n"}+92 {phone || "0000000000"}
          </Text>

          <View className="mt-1" onTouchStart={focusOtp}>
            {/* Invisible but focusable input: enables typing even when you tap the dots */}
            <TextInput
              ref={inputRef}
              keyboardType="number-pad"
              maxLength={4}
              autoFocus
              value={code}
              onChangeText={handleVerify}
              style={{
                opacity: 0,
                width: "100%"
              }}
            />

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={focusOtp}
              className="flex-row items-center"
            >
              {[0, 1, 2, 3].map((idx) => (
                <View
                  key={idx}
                  className={`h-4 w-4 rounded-full mr-6 ${
                    idx < code.length ? "bg-gray-500" : "bg-gray-200"
                  }`}
                />
              ))}
            </TouchableOpacity>
          </View>
        </View>

        <View className="px-5 pb-6">
          <TouchableOpacity
            activeOpacity={0.9}
            className="h-14 bg-gray-100 rounded-2xl items-center justify-center"
            onPress={() => {
              Linking.openURL("whatsapp://");
            }}
          >
            <Text className="text-2xl font-semibold text-black">Open WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              if (!canResend) return;
              setSeconds(91);
              setCode("");
            }}
            activeOpacity={0.9}
            className={`h-14 rounded-2xl items-center justify-center mt-3 ${
              canResend ? "bg-[#C2FF12]" : "bg-gray-100"
            }`}
          >
            <Text
              className={`text-2xl font-medium ${
                canResend ? "text-black" : "text-gray-400"
              }`}
            >
              {canResend ? "Resend code" : `Resend code ${mm}:${ss}`}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
