import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";

const Logo = require("../assets/images/logo2.png");

const { width } = Dimensions.get("window");

const slides = [
  {
    id: 1,
    title: "Your app for fair deals",
    subtitle: "Choose rides that are right for you",
    image: require("../assets/images/register-1.png"),
  },
  {
    id: 2,
    title: "Set your own price",
    subtitle: "Negotiate fares directly with drivers",
    image: require("../assets/images/register-2.png"),
  },
];

export default function Index() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  // const [request] = Google.useAuthRequest({
  //   androidClientId:
  //     "436626233053-m32tv0kgtk8p0b8todjk2326rc5p7dmg.apps.googleusercontent.com",
  //   webClientId:
  //     "436626233053-4fmep61k7jfnpjt0g17nv69ftcpv3hr0.apps.googleusercontent.com",
  //   redirectUri: "sawari://redirect",
  // });

  const renderItem = ({ item }: any) => (
    <View className="items-center justify-center px-6">
      <Image
        source={item.image}
        resizeMode="contain"
        style={{ width: 260, height: 200 }}
      />

      <Text className="text-[26px] font-bold text-center text-slate-900 mt-4">
        {item.title}
      </Text>

      <Text className="text-gray-600 text-[16px] text-center mt-3 leading-5 px-4">
        {item.subtitle}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Logo */}
      <View className="items-center mt-2">
        <Image
          source={Logo}
          className="w-[65px] h-[65px]"
          resizeMode="contain"
        />
      </View>

      {/* Main Illustration Area */}
      <View className="flex-1 justify-center items-center ">
        <Carousel
          width={width}
          height={350}
          data={slides}
          onSnapToItem={(index) => setActiveIndex(index)}
          renderItem={renderItem}
          pagingEnabled
          loop={false}
        />

        <View className="flex-row justify-center ">
          {slides.map((_, index) => (
            <View
              key={index}
              className={`mx-1.5 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "bg-black w-6 h-2.5"
                  : "bg-gray-300 w-2.5 h-2.5"
              }`}
            />
          ))}
        </View>
      </View>

      {/* Buttons Section */}
      <View className="px-6 pb-12">
        {/* Continue with Phone - Your Theme Color */}
        <TouchableOpacity
          onPress={() => router.push("/(auth)/phone-login")}
          className="bg-primary h-[55px] rounded-2xl items-center justify-center shadow-sm active:opacity-90"
        >
          <Text className="text-white font-semibold text-[17px]">
            Continue with phone
          </Text>
        </TouchableOpacity>

        {/* Continue with Google */}
        <TouchableOpacity
          // disabled={!request}
          onPress={() => router.push("/(passenger)")}
          className="mt-3 bg-white border border-gray-200 h-[55px] rounded-2xl flex-row items-center justify-center shadow-sm active:bg-gray-50"
        >
          <Image
            source={require("../assets/icons/google.png")}
            style={{ width: 24, height: 24, marginRight: 12 }}
          />
          <Text className="text-black font-semibold text-[17px]">
            Continue with Google
          </Text>
        </TouchableOpacity>

        {/* Terms & Privacy */}
        <Text className="text-center text-gray-400 text-[13px] mt-8 px-4 leading-[18px]">
          Joining our app means you agree with our{" "}
          <Text className="text-black underline">Terms of Use</Text> and{" "}
          <Text className="text-black underline">Privacy Policy</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}
