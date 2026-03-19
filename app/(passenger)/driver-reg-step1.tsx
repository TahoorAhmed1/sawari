import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DriverRegStep1() {
  const router = useRouter();
  const [showExitModal, setShowExitModal] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-2">
        <TouchableOpacity onPress={() => setShowExitModal(true)}>
          <Ionicons name="close" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text className="text-blue-500 font-bold text-lg">Help</Text>
        </TouchableOpacity>
      </View>

      <View className="px-5 pt-6 flex-1">
        <Text className="text-[28px] font-black text-slate-900 mb-8">
          Personal information
        </Text>

        <TouchableOpacity className="w-32 h-32 bg-gray-100 rounded-[40px] items-center justify-center mb-2">
          <Ionicons name="add" size={40} color="black" />
        </TouchableOpacity>
        <Text className="text-gray-500 font-medium mb-8">Personal picture</Text>

        <View className="space-y-4">
          <View className="bg-gray-100 h-16 rounded-2xl px-5 justify-center">
            <TextInput placeholder="First name" className="text-lg font-bold" />
          </View>
          <View className="bg-gray-100 h-16 rounded-2xl px-5 justify-center mt-3">
            <TextInput placeholder="Last name" className="text-lg font-bold" />
          </View>
          <View className="bg-gray-100 h-16 rounded-2xl px-5 justify-center mt-3">
            <TextInput
              placeholder="Date of birth"
              className="text-lg font-bold"
            />
          </View>
        </View>
      </View>

      {/* Footer Navigation */}
      <View className="px-5 py-6 flex-row items-center justify-between">
        <Text className="text-xl font-black text-slate-900">1 of 4</Text>
        <View className="flex-row space-x-3">
          <TouchableOpacity className="w-14 h-14 bg-gray-50 rounded-2xl items-center justify-center opacity-30">
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity className="bg-[#C2FF12] px-10 h-14 rounded-2xl flex-row items-center justify-center">
            <Text className="text-xl font-black mr-2">Next</Text>
            <Ionicons name="chevron-forward" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Exit Modal - image_fcaecd.png */}
      <Modal visible={showExitModal} transparent animationType="fade">
        <View className="flex-1 bg-black/50 items-center justify-center px-6">
          <View className="bg-white w-full rounded-[40px] p-8 items-center">
            <Text className="text-2xl font-black text-center mb-4">
              Do you want to close registration?
            </Text>
            <Text className="text-gray-500 text-center mb-8 font-medium">
              All the info and pictures are saved. You can continue any time
            </Text>
            <TouchableOpacity
              onPress={() => router.replace("/(passenger)")}
              className="bg-[#C2FF12] w-full h-16 rounded-2xl items-center justify-center mb-3"
            >
              <Text className="text-xl font-black">Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowExitModal(false)}
              className="bg-gray-100 w-full h-16 rounded-2xl items-center justify-center"
            >
              <Text className="text-xl font-black">No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
