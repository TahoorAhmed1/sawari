import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { Menu, Navigation as NavIcon } from "lucide-react-native";
import React, { useMemo, useRef } from "react";
import {
  Dimensions,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

// ─── Types ──────────────────────────────────────────────────────────────────
interface ServiceCardProps {
  title: string;
  sub: string;
  emoji: string;
  wide?: boolean;
  tall?: boolean;
  isNew?: boolean;
}

interface GroceryCardProps {
  label: string;
  emoji: string;
  isSale?: boolean;
}

interface SendCardProps {
  label: string;
  emoji: string;
}

interface FeaturePillProps {
  emoji: string;
  line1: string;
  line2: string;
  bgClass: string;
}

// ─── Sub-components ─────────────────────────────────────────────────────────

const ServiceCard = ({
  title,
  sub,
  emoji,
  wide,
  tall,
  isNew,
}: ServiceCardProps) => (
  <TouchableOpacity
    activeOpacity={0.8}
    style={{
      width: wide ? "100%" : (width - 32 - 10) / 2,
      height: tall
        ? (width - 32 - 10) / 2 + 10 + ((width - 32 - 10) / 2) * 0.55
        : ((width - 32 - 10) / 2) * 0.55,
    }}
    className="bg-[#F3F4F6] rounded-2xl p-4 mb-[10px] justify-between overflow-hidden"
  >
    {isNew && (
      <View className="self-start bg-red-500 rounded-md px-2 py-0.5 mb-2">
        <Text className="text-white text-[10px] font-extrabold">NEW</Text>
      </View>
    )}
    <View>
      <Text className="text-[15px] font-black text-slate-900">{title}</Text>
      <Text className="text-[12px] text-gray-500 mt-0.5">{sub}</Text>
    </View>
    <Text className="text-4xl self-end">{emoji}</Text>
  </TouchableOpacity>
);

const GroceryCard = ({ label, emoji, isSale }: GroceryCardProps) => (
  <TouchableOpacity
    activeOpacity={0.8}
    className="w-36 bg-gray-50 rounded-2xl overflow-hidden mr-2.5"
  >
    <View className="h-24 items-center justify-center bg-white rounded-xl m-2">
      {isSale ? (
        <View className="items-center justify-center gap-1">
          <View className="bg-red-500 rounded-md px-2 py-1">
            <Text className="text-white text-xs font-extrabold">SALE</Text>
          </View>
          <Text className="text-4xl font-black text-[#A3C800]">%</Text>
        </View>
      ) : (
        <Text className="text-4xl">{emoji}</Text>
      )}
    </View>
    <Text className="text-[13px] font-semibold text-gray-700 px-2 pb-3">
      {label}
    </Text>
  </TouchableOpacity>
);

const SendCard = ({ label, emoji }: SendCardProps) => (
  <TouchableOpacity
    activeOpacity={0.8}
    className="w-32 h-32 bg-[#C8F000] rounded-2xl items-center justify-center mr-2.5 gap-1"
  >
    <Text className="text-5xl">{emoji}</Text>
    <Text className="text-[13px] font-bold text-gray-900">{label}</Text>
  </TouchableOpacity>
);

const FeaturePill = ({ emoji, line1, line2, bgClass }: FeaturePillProps) => (
  <View
    className={`${bgClass} rounded-2xl p-4 mr-2.5 justify-end`}
    style={{ width: 100, minHeight: 90 }}
  >
    <Text className="text-xl mb-1">{emoji}</Text>
    <Text className="text-[12px] font-bold text-gray-800 leading-4">
      {line1}
    </Text>
    <Text className="text-[12px] font-bold text-gray-800 leading-4">
      {line2}
    </Text>
  </View>
);

const SectionHeader = ({ emoji, title }: { emoji: string; title: string }) => (
  <TouchableOpacity
    activeOpacity={0.7}
    className="flex-row items-center gap-2 mb-3"
  >
    <Text className="text-2xl">{emoji}</Text>
    <Text className="text-[16px] font-extrabold text-gray-900 flex-1">
      {title}
    </Text>
    <Ionicons name="chevron-forward" size={18} color="#333" />
  </TouchableOpacity>
);

const RecentRow = ({
  icon,
  title,
  subtitle,
}: {
  icon: "time-outline" | "location-outline";
  title: string;
  subtitle?: string;
}) => (
  <TouchableOpacity
    activeOpacity={0.7}
    className="flex-row items-center py-3 border-b border-gray-100"
  >
    <View className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center mr-3">
      <Ionicons name={icon} size={17} color="#555" />
    </View>
    <View className="flex-1">
      <Text
        className="text-[14px] font-semibold text-gray-800"
        numberOfLines={1}
      >
        {title}
      </Text>
      {subtitle && (
        <Text className="text-[12px] text-gray-400 mt-0.5" numberOfLines={1}>
          {subtitle}
        </Text>
      )}
    </View>
  </TouchableOpacity>
);

// ─── Main Screen ─────────────────────────────────────────────────────────────

export default function PassengerHome() {
  const navigation = useNavigation();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["42%", "80%", "95%"], []);

  return (
    <View className="flex-1 bg-gray-200">
      {/* ── MAP ── */}
      {/* <MapView
        provider={PROVIDER_GOOGLE}
        style={{ ...require("react-native").StyleSheet.absoluteFillObject }}
        initialRegion={{
          latitude: 24.8607,
          longitude: 67.0104,
          latitudeDelta: 0.012,
          longitudeDelta: 0.012,
        }}
        showsUserLocation
        showsMyLocationButton={false}
      >
        <Marker coordinate={{ latitude: 24.8607, longitude: 67.0104 }}>
          <View className="w-5 h-5 rounded-full bg-blue-600 border-2 border-white shadow-md" />
        </Marker>
      </MapView> */}

      {/* ── PICKUP BUBBLE ── */}
      <View
        className="absolute bg-white rounded-xl px-4 py-2.5 shadow-md"
        style={{
          top: Platform.OS === "ios" ? 80 : 60,
          left: width / 2 - 75,
          minWidth: 150,
        }}
      >
        <Text className="text-[11px] text-gray-400 mb-0.5">Pickup point</Text>
        <View className="flex-row items-center">
          <Text className="text-[15px] font-bold text-gray-900 mr-1">
            Plot 21
          </Text>
          <Ionicons name="chevron-forward" size={14} color="#333" />
        </View>
      </View>

      {/* ── FLOATING MENU BUTTON ── */}
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        className="absolute bg-white rounded-full shadow-md items-center justify-center z-50"
        style={{
          top: Platform.OS === "ios" ? 56 : 36,
          left: 16,
          width: 44,
          height: 44,
        }}
      >
        <Menu size={24} color="#111" />
      </TouchableOpacity>

      {/* ── RECENTER BUTTON ── */}
      <TouchableOpacity
        className="absolute bg-white rounded-full shadow-md items-center justify-center"
        style={{
          top: Platform.OS === "ios" ? 56 : 36,
          right: 16,
          width: 44,
          height: 44,
        }}
      >
        <NavIcon size={22} color="#111" />
      </TouchableOpacity>

      {/* ── BOTTOM SHEET ── */}
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        handleIndicatorStyle={{
          backgroundColor: "#D1D5DB",
          width: 40,
          height: 4,
        }}
        backgroundStyle={{ backgroundColor: "#ffffff", borderRadius: 20 }}
      >
        <BottomSheetScrollView
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Location Header */}
          <TouchableOpacity
            activeOpacity={0.7}
            className="flex-row items-center py-2.5 mb-1"
          >
            <Ionicons name="location-outline" size={18} color="#555" />
            <Text className="ml-2 text-[15px] font-semibold text-gray-800">
              Sohrab Goth Bus Stop
            </Text>
          </TouchableOpacity>

          {/* Ramadan Banner */}
          <TouchableOpacity
            activeOpacity={0.85}
            className="bg-[#C8F000] rounded-2xl flex-row items-center px-4 py-3 mb-4"
          >
            <View className="w-11 h-11 rounded-xl bg-black/10 items-center justify-center mr-3">
              <Text className="text-2xl">🌙</Text>
            </View>
            <Text className="flex-1 text-[14px] font-bold text-gray-900 leading-5">
              Apni rides ko bamaqsad madad mein badlein
            </Text>
          </TouchableOpacity>

          {/* ── SERVICE GRID ── */}
          {/* Row 1: Groceries (tall-left) + City rides / City to City (right column) */}
          <View className="flex-row gap-[10px] mb-0">
            {/* LEFT – tall Groceries card */}
            <TouchableOpacity
              activeOpacity={0.8}
              className="bg-gray-100 rounded-2xl p-4 justify-between overflow-hidden"
              style={{
                width: (width - 32 - 10) / 2,
                height: (width - 32 - 10) * 0.58 * 2 + 10,
              }}
            >
              <View>
                <View className="self-start bg-red-500 rounded-md px-2 py-0.5 mb-2">
                  <Text className="text-white text-[10px] font-extrabold">
                    NEW
                  </Text>
                </View>
                <Text className="text-[15px] font-black text-gray-900">
                  Groceries
                </Text>
                <Text className="text-[12px] text-gray-500 mt-0.5">
                  in 30 min
                </Text>
              </View>
              <Text className="text-5xl self-center">🛒</Text>
              <View className="flex-row flex-wrap gap-1">
                <Text className="text-2xl">🥦</Text>
                <Text className="text-2xl">🍅</Text>
                <Text className="text-2xl">🍌</Text>
              </View>
            </TouchableOpacity>

            {/* RIGHT – City rides + City to City stacked */}
            <View
              className="gap-[10px]"
              style={{ width: (width - 32 - 10) / 2 }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                className="bg-gray-100 rounded-2xl p-4 justify-between"
                style={{ height: (width - 32 - 10) * 0.58 }}
              >
                <Text className="text-[15px] font-black text-gray-900">
                  City rides
                </Text>
                <View className="flex-row gap-1 self-end">
                  <Text className="text-3xl">🚗</Text>
                  <Text className="text-2xl">🛵</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                className="bg-gray-100 rounded-2xl p-4 justify-between"
                style={{ height: (width - 32 - 10) * 0.58 }}
              >
                <Text className="text-[15px] font-black text-gray-900">
                  City to City
                </Text>
                <View className="flex-row gap-1 self-end">
                  <Text className="text-3xl">🚙</Text>
                  <Text className="text-2xl">🧳</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Row 2: Couriers + Freight */}
          <View className="flex-row gap-[10px] mt-[10px] mb-4">
            <TouchableOpacity
              activeOpacity={0.8}
              className="bg-gray-100 rounded-2xl p-4 justify-between"
              style={{ width: (width - 32 - 10) / 2, height: 110 }}
            >
              <Text className="text-[15px] font-black text-gray-900">
                Couriers
              </Text>
              <Text className="text-4xl self-end">📦</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              className="bg-gray-100 rounded-2xl p-4 justify-between"
              style={{ width: (width - 32 - 10) / 2, height: 110 }}
            >
              <Text className="text-[15px] font-black text-gray-900">
                Freight
              </Text>
              <Text className="text-4xl self-end">🚚</Text>
            </TouchableOpacity>
          </View>

          {/* ── SEARCH BAR ── */}
          <TouchableOpacity
            activeOpacity={0.8}
            className="bg-gray-100 rounded-2xl flex-row items-center px-4 py-4 mb-1"
          >
            <Ionicons name="search-outline" size={20} color="#333" />
            <Text className="ml-3 text-[15px] font-bold text-gray-700 flex-1">
              Where to & for how much?
            </Text>
            <Ionicons name="chevron-forward" size={18} color="#aaa" />
          </TouchableOpacity>

          {/* ── RECENT LOCATIONS ── */}
          <RecentRow
            icon="time-outline"
            title="Hashmanis Hospital Numaish"
            subtitle="Muhammad Ali Jinn...acob Lines Karachi"
          />
          <RecentRow icon="location-outline" title="Sohrab Goth Bus Stop" />

          {/* ── GROCERIES IN 30 MINUTES ── */}
          <View className="mt-5">
            <SectionHeader emoji="🛒" title="Groceries in 30 minutes" />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="-mr-4"
              contentContainerStyle={{ paddingRight: 16 }}
            >
              <GroceryCard label="Flash Deal" emoji="" isSale />
              <GroceryCard label="Fruits & Vegetables" emoji="🍅🧅🍌" />
              <GroceryCard label="Chicken & Meat" emoji="🍗🥩" />
              <GroceryCard label="Dairy & Eggs" emoji="🥛🥚" />
            </ScrollView>
          </View>

          {/* ── SEND FAST AND SAFE ── */}
          <View className="mt-5">
            <SectionHeader emoji="📦" title="Send fast and safe" />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="-mr-4"
              contentContainerStyle={{ paddingRight: 16 }}
            >
              <SendCard label="Clothes" emoji="👕" />
              <SendCard label="Food" emoji="🍔" />
              <SendCard label="Documents" emoji="📄" />
              <SendCard label="Electronics" emoji="📱" />
            </ScrollView>
          </View>

          {/* ── FEATURE PILLS ── */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-4 -mr-4"
            contentContainerStyle={{ paddingRight: 16 }}
          >
            <FeaturePill
              emoji="🛵"
              line1="Delivery"
              line2="From PKR95"
              bgClass="bg-yellow-200"
            />
            <FeaturePill
              emoji="🛡️"
              line1="Safety"
              line2="Above All"
              bgClass="bg-green-200"
            />
            <FeaturePill
              emoji="❤️"
              line1="Visit Loved"
              line2="Ones"
              bgClass="bg-red-200"
            />
            <FeaturePill
              emoji="🚗"
              line1="Ride in"
              line2="Comfort"
              bgClass="bg-emerald-200"
            />
          </ScrollView>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
}
