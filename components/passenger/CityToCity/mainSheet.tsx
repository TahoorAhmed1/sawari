import { RouteModel } from "@/components/models/RouteModel";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Info } from "lucide-react-native"; // Optional icons
import React, { useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const MainSheet = ({ setStep, showEnterRoute, setShowEnterRoute }: any) => {
  const snapPoints = useMemo(() => ["58%"], []);
  const [activeCategory, setActiveCategory] = useState("City to city");

  const categories = [
    { label: "A/C", emoji: "🚗" },
    { label: "Premium", emoji: "🚘", hasSnow: true },
    { label: "City to city", emoji: "🏙️" },
    { label: "City to city", emoji: "🏙️" },
    { label: "Couriers", emoji: "🛵" },
    { label: "City to city", emoji: "🏙️" },
    { label: "Freight", emoji: "🚚" },
    { label: "Freight", emoji: "🚚" },
    { label: "Freight", emoji: "🚚" },
  ];

  return (
    <>
      <BottomSheet
        snapPoints={snapPoints}
        handleIndicatorStyle={{ backgroundColor: "#E5E7EB", width: 40 }}
        backgroundStyle={{ borderRadius: 32 }}
      >
        <BottomSheetScrollView
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="py-2"
            style={{ marginBottom: 10 }}
            contentContainerStyle={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 16,
            }}
          >
            {categories.map((item, index) => (
              <Category
                key={index}
                label={item.label}
                emoji={item.emoji}
                active={activeCategory === item.label}
                hasSnow={item.hasSnow}
                onPress={() => setActiveCategory(item.label)}
              />
            ))}
          </ScrollView>
          <View className="px-4">
            <TouchableOpacity
              className="bg-gray-100 flex-row items-center p-4 rounded-2xl mb-4"
              onPress={() => setShowEnterRoute(true)}
            >
              <Ionicons name="search" size={20} color="#1F2937" />
              <Text className="text-black text-lg font-bold ml-3 flex-1">
                Where to & for how much?
              </Text>
              <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
            </TouchableOpacity>
            <View className=" flex-row items-center justify-between ">
              <View>
                <ActionCard
                  title="Share your ride"
                  onPress={() => setShowEnterRoute(true)}
                />
                <ActionCard
                  title="Request a car"
                  onPress={() => setShowEnterRoute(true)}
                />
              </View>
              <View className="flex-1 h-full">
                <ActionCard
                  title="Send a parcel"
                  onPress={() => setShowEnterRoute(true)}
                />
              </View>
            </View>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
      {showEnterRoute && (
        <RouteModel
          onNext={() => {
            setShowEnterRoute(false);
            setStep("select");
          }}
          onClose={() => setShowEnterRoute(false)}
        />
      )}
    </>
  );
};

const Category = ({ label, emoji, active, hasSnow, onPress }: any) => (
  <TouchableOpacity
    onPress={onPress}
    style={{ alignItems: "center", marginRight: 20 }}
  >
    <View>
      <Text style={{ fontSize: 22 }}>{emoji}</Text>
      {hasSnow && (
        <Text style={{ position: "absolute", top: -5, right: -5 }}>❄️</Text>
      )}
      {active && (
        <View
          style={{
            position: "absolute",
            top: -5,
            right: -10,
            backgroundColor: "white",
            borderRadius: 20,
          }}
        >
          <Info size={16} color="#3B82F6" />
        </View>
      )}
    </View>
    <Text
      style={{
        marginTop: 6,
        fontWeight: "bold",
        color: active ? "#0F172A" : "#94A3B8",
      }}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

const ActionCard = ({ title, onPress }: any) => (
  <TouchableOpacity
    onPress={onPress}
    className="h-full"
    style={{
      backgroundColor: "#F9FAFB",
      height: 90,
      borderRadius: 16,
      padding: 12,
      margin: 5,
      justifyContent: "space-between",
      borderWidth: 1,
      borderColor: "#F1F5F9",
    }}
  >
    <Text style={{ fontWeight: "bold" }}>{title}</Text>
    <Text style={{ alignSelf: "flex-end", fontSize: 32 }}>🚗</Text>
  </TouchableOpacity>
);

export default MainSheet;
