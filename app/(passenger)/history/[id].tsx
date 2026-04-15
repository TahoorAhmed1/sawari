import {
    AntDesign,
    Ionicons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    Image,
    Keyboard,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

export default function Index() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Header */}
      <View className="flex-row items-center justify-between px-5 pt-3 pb-4 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <View className="items-center">
          <Text className="text-xl font-semibold">Tue, 03 Feb 2026</Text>
          <Text className="text-sm text-gray-500">11:07 AM</Text>
        </View>
        <View style={{ width: 28 }} /> {/* Spacer for balance */}
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Map Section */}
        <View className="h-64 bg-gray-100 p-10 ">
          <MapView
            provider={PROVIDER_GOOGLE}
            style={StyleSheet.absoluteFillObject}
            onPress={() => Keyboard.dismiss()}
            initialRegion={{
              latitude: 24.8607,
              longitude: 67.0104,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          />
        </View>

        {/* Ride Info */}
        <View className="px-5 pt-5 pb-6 bg-white -mt-3 rounded-t-3xl">
          <View className="flex-row justify-between items-start">
            <View>
              <Text className="text-2xl font-bold">City ride</Text>
              <Text className="text-green-600 font-medium">
                Ride • Completed
              </Text>
            </View>
            <Image
              source={{
                uri: "https://i.ibb.co/0jZ0Z0Z/white-car-green-stripe.png",
              }} // Replace with your car image
              className="w-28 h-16"
              resizeMode="contain"
            />
          </View>

          {/* Route Details */}
          <View className="mt-6 space-y-4">
            <View className="flex-row items-center">
              <View className="w-5 items-center">
                <View className="w-3 h-3 bg-blue-500 rounded-full" />
                <View className="w-0.5 h-8 bg-gray-300 my-1" />
              </View>
              <View className="flex-1 ml-3">
                <Text className="text-base font-medium">Karachi</Text>
              </View>
              <Text className="text-gray-500">11:11 AM</Text>
            </View>

            <View className="flex-row items-center">
              <View className="w-5 items-center">
                <View className="w-3 h-3 bg-green-500 rounded-full" />
              </View>
              <View className="flex-1 ml-3">
                <Text className="text-base font-medium">
                  Hashmanis Hospital Numaish
                </Text>
              </View>
              <Text className="text-gray-500">11:27 AM</Text>
            </View>
          </View>

          {/* Duration & Distance */}
          <View className="flex-row mt-7 border-t border-b border-gray-100 py-5">
            <View className="flex-1 flex-row items-center">
              <MaterialCommunityIcons
                name="clock-outline"
                size={24}
                color="#64748b"
              />
              <View className="ml-3">
                <Text className="text-xs text-gray-500">Duration</Text>
                <Text className="font-semibold text-lg">16 min</Text>
              </View>
            </View>

            <View className="flex-1 flex-row items-center">
              <MaterialCommunityIcons
                name="road-variant"
                size={24}
                color="#64748b"
              />
              <View className="ml-3">
                <Text className="text-xs text-gray-500">Distance</Text>
                <Text className="font-semibold text-lg">6,3 km</Text>
              </View>
            </View>
          </View>

          {/* Driver Info */}
          <View className="flex-row items-center mt-6">
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
              className="w-14 h-14 rounded-full"
            />
            <View className="ml-4 flex-1">
              <Text className="font-semibold text-lg">Syed Arslan</Text>
              <Text className="text-gray-500">
                Black MOTOR-BIKE Star, KIA-8386
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="flex-row justify-around px-5 py-6 bg-white border-t border-gray-100">
          {[
            { icon: "receipt", label: "Receipt" },
            { icon: "chat", label: "Support" },
            { icon: "refresh", label: "Repeat ride" },
            { icon: "swap-horizontal", label: "Return route" },
          ].map((item, index) => (
            <TouchableOpacity key={index} className="items-center">
              <View className="w-14 h-14 bg-gray-100 rounded-full items-center justify-center mb-2">
                <Ionicons name={item.icon as any} size={26} color="#334155" />
              </View>
              <Text className="text-xs text-center font-medium text-gray-700">
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Payment Section */}
        <View className="px-5 pb-8 bg-white">
          <Text className="text-xl font-bold mb-4">I paid</Text>

          <View className="bg-gray-50 rounded-2xl p-5 space-y-4">
            <View className="flex-row justify-between">
              <Text className="text-base text-gray-700">Fare</Text>
              <Text className="font-semibold text-lg">PKR 150.00</Text>
            </View>

            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center">
                <View className="bg-primary  w-6 h-6 rounded items-center justify-center">
                  <AntDesign name="money-collect" size={14} color="white" />
                </View>
                <Text className="ml-2 font-medium text-base">Total paid</Text>
              </View>
              <Text className="font-bold text-lg">PKR 150.00</Text>
            </View>
          </View>

          {/* Remove from History */}
          <TouchableOpacity className="mt-8 bg-white border border-red-500 py-4 rounded-2xl">
            <Text className="text-red-500 font-semibold text-center text-lg">
              Remove from history
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
