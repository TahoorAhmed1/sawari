import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import React, { useMemo, useState } from "react";
import {
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RouteModel } from "../../models/RouteModel";

interface EnterRouteScreenProps {
  onNext: any;
  onClose: () => void;
}

export const PassengerHomeSheet = ({
  onNext,
  onClose,
}: EnterRouteScreenProps) => {
  const [showEnterRoute, setShowEnterRoute] = useState(false);

  const snapPoints = useMemo(() => ["60%", "94%"], []);
  const navigation = useNavigation();

  const insets = useSafeAreaInsets();
  const extraTop = Math.max(0, insets.top - 24);
  return (
    <View className="flex-1 z-20 bg-gray-400/60">
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

      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        activeOpacity={0.85}
        className="absolute left-5 bg-white rounded-full w-11 h-11 items-center justify-center shadow"
        style={{ top: 10 + extraTop }}
      >
        <Ionicons name="menu" size={22} color="#333" />
      </TouchableOpacity>

      <BottomSheet
        snapPoints={snapPoints}
        handleIndicatorStyle={{ backgroundColor: "#E5E7EB", width: 40 }}
        backgroundStyle={{ borderRadius: 32 }}
      >
        <BottomSheetScrollView
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="px-4 pt-2">
            <View className="flex-row justify-between mb-3">
              <TouchableOpacity
                className="w-[48%] h-48 bg-gray-100 rounded-3xl p-4 overflow-hidden"
                onPress={() => setShowEnterRoute(true)}
              >
                <View className="z-10">
                  <Text className="text-gray-800 text-base font-bold leading-5">
                    Groceries{"\n"}in 30 min
                  </Text>
                  <View className="bg-red-500 self-start px-2 py-0.5 rounded-md mt-2">
                    <Text className="text-white text-[10px] font-black">
                      NEW
                    </Text>
                  </View>
                </View>
                <Image
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/512/3724/3724720.png",
                  }}
                  className="w-full h-28 absolute bottom-0 right-0 left-0"
                  resizeMode="contain"
                />
              </TouchableOpacity>

              <View className="w-[48%] flex gap-3 justify-between">
                <ServiceSmallCard
                  title="City rides"
                  img="https://cdn-icons-png.flaticon.com/512/2555/2555013.png"
                  onPress={() => setShowEnterRoute(true)}
                />
                <ServiceSmallCard
                  title="City to City"
                  img="https://cdn-icons-png.flaticon.com/512/2099/2099140.png"
                  onPress={() => setShowEnterRoute(true)}
                />
              </View>
            </View>

            <View className="flex-row justify-between mb-3">
              <ServiceSmallCard
                title="Couriers"
                img="https://cdn-icons-png.flaticon.com/512/2362/2362252.png"
                containerStyle="w-[48%]"
                onPress={() => setShowEnterRoute(true)}
              />
              <ServiceSmallCard
                title="Freight"
                img="https://cdn-icons-png.flaticon.com/512/2891/2891415.png"
                containerStyle="w-[48%]"
                onPress={() => setShowEnterRoute(true)}
              />
            </View>

            {/* Search Bar */}
            <TouchableOpacity
              className="bg-gray-100 flex-row items-center p-4 rounded-2xl mb-4"
              onPress={() => setShowEnterRoute(true)}
            >
              <Ionicons name="search" size={20} color="#1F2937" />
              <Text className="text-gray-900 text-lg font-bold ml-3 flex-1">
                Where to & for how much?
              </Text>
              <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
            </TouchableOpacity>

            <SectionHeader title="Groceries in 30 minutes" />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-6"
            >
              <PromoCard label="Flash Deal" color="bg-lime-400" icon="tag" />
              <PromoCard
                label="Fruits & Veg"
                color="bg-orange-50"
                icon="food-apple"
              />
              <PromoCard
                label="Chicken & Meat"
                color="bg-red-50"
                icon="food-drumstick"
              />
            </ScrollView>

            {/* Horizontal Scrolling Section: Send fast and safe */}
            <SectionHeader title="Send fast and safe" />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <CategoryIcon
                label="Clothes"
                icon="tshirt-crew"
                color="bg-lime-400"
              />
              <CategoryIcon label="Food" icon="hamburger" color="bg-lime-400" />
              <CategoryIcon
                label="Documents"
                icon="file-document"
                color="bg-lime-400"
              />
            </ScrollView>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>

      {showEnterRoute && (
        <RouteModel
          onNext={() => {
            setShowEnterRoute(false);
            onNext();
          }}
          onClose={() => setShowEnterRoute(false)}
        />
      )}
    </View>
  );
};

const ServiceSmallCard = ({
  title,
  img,
  onPress,
  containerStyle = "w-full",
}: any) => (
  <TouchableOpacity
    onPress={onPress}
    className={`${containerStyle} h-[88px] bg-gray-100 rounded-3xl p-3 relative overflow-hidden`}
  >
    <Text className="text-gray-800 text-sm font-bold w-2/3">{title}</Text>
    <Image
      source={{ uri: img }}
      className="w-14 h-12 absolute right-1 bottom-1"
      resizeMode="contain"
    />
  </TouchableOpacity>
);

const SectionHeader = ({ title }: { title: string }) => (
  <View className="flex-row items-center justify-between mb-3 mt-2">
    <Text className="text-gray-900 text-xl font-black">{title}</Text>
    <TouchableOpacity className="bg-gray-100 rounded-full p-1">
      <Ionicons name="chevron-forward" size={14} color="black" />
    </TouchableOpacity>
  </View>
);

const PromoCard = ({ label, color }: any) => (
  <View className="mr-3 items-center">
    <View
      className={`w-32 h-32 rounded-3xl ${color} items-center justify-center overflow-hidden`}
    >
      {/* Placeholder for complex graphics in screenshot */}
      <MaterialCommunityIcons
        name="shopping"
        size={50}
        color="rgba(0,0,0,0.1)"
      />
    </View>
    <Text className="text-gray-800 text-xs font-bold mt-2">{label}</Text>
  </View>
);

const CategoryIcon = ({ label, icon }: any) => (
  <View className="mr-3 items-center">
    <View className="w-32 h-32 bg-lime-400 rounded-3xl items-center justify-center">
      <MaterialCommunityIcons name={icon} size={60} color="black" />
    </View>
    <Text className="text-gray-800 text-sm font-bold mt-2">{label}</Text>
  </View>
);
