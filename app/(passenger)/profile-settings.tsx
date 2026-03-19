import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileSettingsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-2">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-slate-900">
          Profile settings
        </Text>
        {/* Top Right Icon to open Income/Role Selection */}
      </View>

      <View className="items-center mt-8 mb-10">
        <View className="relative">
          <View className="w-28 h-28 bg-gray-100 rounded-full items-center justify-center border border-gray-100">
            <Ionicons name="person-outline" size={60} color="black" />
          </View>
          <TouchableOpacity className="absolute bottom-0 right-0 bg-[#C2FF12] w-10 h-10 rounded-full items-center justify-center border-4 border-white">
            <Ionicons name="add" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="px-5 space-y-4">
        <InputField label="Name" value="Tahoor" />
        <InputField label="Last name" value="Ahmed" />
        <InputField label="Email" placeholder="Email" />

        <TouchableOpacity className="bg-gray-50 h-16 rounded-2xl flex-row items-center px-4 mt-2">
          <View className="flex-1">
            <Text className="text-gray-400 text-[10px] uppercase font-bold">
              City
            </Text>
            <Text className="text-lg font-medium text-slate-800">Karachi</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
        </TouchableOpacity>

        <TouchableOpacity className="bg-gray-50 h-16 rounded-2xl flex-row items-center px-4">
          <View className="flex-1">
            <Text className="text-gray-400 text-[10px] uppercase font-bold">
              Phone number
            </Text>
            <Text className="text-lg font-medium text-slate-800">
              92*********47
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
        </TouchableOpacity>
      </View>

      <View className="mt-auto px-5 pb-6">
        <TouchableOpacity className="bg-[#C2FF12] h-16 rounded-2xl items-center justify-center shadow-sm">
          <Text className="font-black text-xl">Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const InputField = ({ label, value, placeholder }: any) => (
  <View className="bg-gray-50 h-16 rounded-2xl px-4 justify-center mb-3">
    <Text className="text-gray-400 text-[10px] uppercase font-bold">
      {label}
    </Text>
    <TextInput
      defaultValue={value}
      placeholder={placeholder}
      className="text-lg font-medium text-slate-800 p-0"
    />
  </View>
);
