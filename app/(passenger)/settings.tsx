import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView className="px-5">
        <Text className="text-3xl font-black mb-8 text-slate-900">
          App settings
        </Text>

        <SettingItem
          icon="moon-outline"
          title="Appearance"
          sub="System default"
        />
        <SettingItem
          icon="git-network-outline"
          title="Distance units"
          sub="Kilometres"
        />
        <SettingItem
          icon="language-outline"
          title="Language"
          sub="Default language"
        />

        <View className="h-[1px] bg-gray-100 my-4" />

        <SettingItem
          icon="document-text-outline"
          title="Legal documents"
          isLast
        />
        <SettingItem
          icon="phone-portrait-outline"
          title="App version"
          sub="5.160.0"
          isLast
        />

        <View className="h-[1px] bg-gray-100 my-4" />

        <SettingItem icon="log-out-outline" title="Log out" isLast noArrow />
        <SettingItem
          icon="trash-outline"
          title="Delete account"
          isLast
          noArrow
        />

        {/* Info Box */}
        <View className="bg-blue-50 p-6 rounded-[30px] mt-8 mb-10">
          <Text className="text-slate-800 font-medium text-lg leading-6 mb-4">
            Some settings moved to make things simpler. Tap to find
          </Text>
          <TouchableOpacity className="bg-white self-start px-6 py-3 rounded-2xl shadow-sm">
            <Text className="font-bold text-lg">Phone number</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const SettingItem = ({ icon, title, sub, isLast, noArrow }: any) => (
  <TouchableOpacity
    className={`flex-row items-center py-4 ${!isLast ? "border-b border-gray-50" : ""}`}
  >
    <Ionicons name={icon} size={24} color="black" />
    <View className="ml-4 flex-1">
      <Text className="text-lg font-bold text-slate-900">{title}</Text>
      {sub && <Text className="text-gray-400 font-medium">{sub}</Text>}
    </View>
    {!noArrow && <Ionicons name="chevron-forward" size={18} color="#cbd5e1" />}
  </TouchableOpacity>
);
