import { useRouter } from "expo-router";
import React from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Brand Header */}
      <View className="items-center mt-12">
        <View className="flex-row items-center">
          <View className="bg-[#C2FF12] w-9 h-9 rounded-xl items-center justify-center mr-2">
            <Text className="font-bold text-[10px] text-black">ID</Text>
          </View>
          <Text className="text-2xl font-bold tracking-tight text-black">
            inDrive
          </Text>
        </View>
      </View>

      {/* Illustration & Text */}
      <View className="flex-1 justify-center items-center px-10">
        {/* <Image
          source={require("../../assets/images/handshake.png")}
          className="w-full h-72"
          resizeMode="contain"
        /> */}

        <View className="mt-10">
          <Text className="text-[32px] font-black text-center text-slate-900 leading-[38px]">
            Your app for fair deals
          </Text>
          <Text className="text-gray-600 text-[17px] text-center mt-3 font-medium">
            Choose rides that are right for you
          </Text>
        </View>

        {/* Dots */}
        <View className="flex-row mt-14">
          <View className="h-2 w-2 rounded-full bg-black mx-1" />
          <View className="h-2 w-2 rounded-full bg-gray-200 mx-1" />
        </View>
      </View>

      {/* Footer Buttons */}
      <View className="px-5 pb-10">
        <TouchableOpacity
          onPress={() => router.push("/(auth)/phone-login")}
          className="bg-[#C2FF12] h-[60px] rounded-2xl items-center justify-center mb-3"
        >
          <Text className="text-black font-bold text-lg">
            Continue with phone
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-gray-100 h-[60px] rounded-2xl flex-row justify-center items-center">
          {/* <Image
            source={require("../../assets/images/google-icon.png")}
            className="w-6 h-6 mr-3"
          /> */}
          <Text className="text-black font-bold text-lg">
            Continue with Google
          </Text>
        </TouchableOpacity>

        <Text className="text-center text-gray-500 text-[12px] mt-6 px-4">
          Joining our app means you agree with our{" "}
          <Text className="underline">Terms of Use</Text> and{" "}
          <Text className="underline">Privacy Policy</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}
