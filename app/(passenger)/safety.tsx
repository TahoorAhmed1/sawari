import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SafetyScreen() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-xl font-bold mr-6">
          Safety
        </Text>
      </View>
      <ScrollView className="px-5">
        <View className="flex-row justify-between mb-4 mt-2">
          <SafetyTopCard icon="chatbox-ellipses-outline" label="Support" />
          <SafetyTopCard icon="people-outline" label="Emergency contacts" />
        </View>
        <TouchableOpacity className="bg-[#D32F2F] h-16 rounded-2xl flex-row items-center justify-center mb-8">
          <MaterialCommunityIcons
            name="alarm-light-outline"
            size={24}
            color="white"
          />
          <Text className="text-white font-bold text-xl ml-3">Call 15</Text>
        </TouchableOpacity>
        <Text className="text-2xl font-black mb-6">
          How you&apos;re protected
        </Text>
        <View className="flex-row flex-wrap justify-between">
          <SafetyFeatureCard
            title="Proactive safety support"
            icon="shield-checkmark"
          />
          <SafetyFeatureCard title="Drivers verification" icon="id-card" />
          <SafetyFeatureCard title="Protecting your privacy" icon="phone" />
          <SafetyFeatureCard
            title="Staying safe on every ride"
            icon="seatbelt"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const SafetyTopCard = ({ icon, label }: any) => (
  <TouchableOpacity className="bg-gray-50 w-[48%] p-6 rounded-2xl items-center">
    <Ionicons name={icon} size={28} color="black" />
    <Text className="text-center mt-2 font-medium text-slate-700">{label}</Text>
  </TouchableOpacity>
);

const SafetyFeatureCard = ({ title, icon }: any) => (
  <TouchableOpacity className="bg-gray-50 w-[48%] h-36 p-4 rounded-2xl mb-4">
    <Text className="font-bold text-slate-800 leading-tight">{title}</Text>
    <View className="absolute bottom-4 right-4 bg-[#C2FF12] p-2 rounded-xl rotate-12">
      <Ionicons name={icon} size={20} color="black" />
    </View>
  </TouchableOpacity>
);
