import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Info, Search } from "lucide-react-native"; // Optional icons
import React, { useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const MainSheet = ({ setStep }: any) => {
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

        <TouchableOpacity
          style={{
            backgroundColor: "#F8FAFC",
            height: 55,
            borderRadius: 20,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
            marginHorizontal: 16,
            marginBottom: 10,
            borderWidth: 1,
            borderColor: "#F1F5F9",
          }}
          onPress={() => setStep("route")}
        >
          <Search size={24} color="black" />
          <Text style={{ marginLeft: 10, fontSize: 18, fontWeight: "bold" }}>
            Where to & for how much?
          </Text>
        </TouchableOpacity>

        <View className=" flex-row items-center justify-between px-4">
          <View>
            <ActionCard
              title="Share your ride"
              onClick={() => setStep("route")}
            />
            <ActionCard
              title="Request a car"
              onClick={() => setStep("route")}
            />
          </View>
          <View className="flex-1 h-full">
            <ActionCard
              title="Send a parcel"
              onClick={() => setStep("route")}
            />
          </View>
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
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

const ActionCard = ({ title, onClick }: any) => (
  <TouchableOpacity
    onPress={onClick}
    className="h-full"
    style={{
      backgroundColor: "#F9FAFB",
      height: 90,
      borderRadius: 24,
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
