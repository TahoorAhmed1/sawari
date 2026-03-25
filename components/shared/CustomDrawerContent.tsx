import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import {
  Bell,
  Car,
  ChevronRight,
  Clock,
  Globe,
  Printer,
  Settings,
  ShieldCheck,
  Truck,
  User,
} from "lucide-react-native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function CustomDrawerContent(
  _props: DrawerContentComponentProps,
) {
  const router = useRouter();

  return (
    <>
      {/* ── Header ── */}
      <TouchableOpacity
        onPress={() => router.push("/(passenger)/income-selection")}
        activeOpacity={0.7}
        className="flex-row items-center px-5 py-5 gap-4"
      >
        <View className="w-[52px] h-[52px] rounded-full bg-[#3b82f6] items-center justify-center">
          <User color="#fff" size={30} strokeWidth={2} />
        </View>
        <Text className="flex-1 text-[21px] font-semibold text-gray-900 tracking-tight">
          Tahoor
        </Text>
        <ChevronRight color="#111827" size={22} strokeWidth={2.5} />
      </TouchableOpacity>

      {/* ── Divider ── */}
      <View className="h-px bg-gray-200" />

      {/* ── Menu list ── */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ paddingTop: 2 }}
      >
        <DrawerItem
          icon={<Car color="#6b7280" size={23} strokeWidth={1.7} />}
          label="City"
          isActive
          onPress={() => router.push("/(passenger)")}
        />
        <DrawerItem
          icon={<Clock color="#6b7280" size={23} strokeWidth={1.7} />}
          label="Request history"
          onPress={() => router.push("/(passenger)/history")}
        />

        <DrawerItem
          icon={<Printer color="#6b7280" size={23} strokeWidth={1.7} />}
          label="Couriers"
          onPress={() => router.push("/(passenger)")}
        />

        <DrawerItem
          icon={<Globe color="#6b7280" size={23} strokeWidth={1.7} />}
          label="City to City"
          onPress={() => router.push("/(passenger)")}
        />
        <DrawerItem
          icon={<Truck color="#6b7280" size={23} strokeWidth={1.7} />}
          label="Freight"
          onPress={() => router.push("/(passenger)")}
        />
        <DrawerItem
          icon={<Bell color="#6b7280" size={23} strokeWidth={1.7} />}
          label="Notifications"
          onPress={() => router.push("/(passenger)")}
        />
        <DrawerItem
          icon={<ShieldCheck color="#6b7280" size={23} strokeWidth={1.7} />}
          label="Safety"
          onPress={() => router.push("/(passenger)")}
        />
        <DrawerItem
          icon={<Settings color="#6b7280" size={23} strokeWidth={1.7} />}
          label="Settings"
          onPress={() => router.push("/(passenger)")}
        />
      </ScrollView>

      {/* ── Footer ── */}
      <View className="px-4 pt-3 pb-5">
        {/* Driver mode */}
        <TouchableOpacity
          onPress={() => router.push("/(passenger)/income-selection")}
          activeOpacity={0.85}
          className="bg-[#C2FF12] h-[60px] rounded-[18px] items-center justify-center mb-5"
        >
          <Text className="text-[18px] font-bold text-gray-900 tracking-wide">
            Driver mode
          </Text>
        </TouchableOpacity>

        {/* Social icons */}
        <View className="flex-row justify-center gap-4">
          {/* Facebook */}
          <TouchableOpacity
            activeOpacity={0.8}
            className="w-11 h-11 rounded-full bg-[#1877F2] items-center justify-center"
          >
            <Text
              className="text-white text-[24px] font-bold leading-none"
              style={{ marginTop: -2 }}
            >
              f
            </Text>
          </TouchableOpacity>

          {/* Instagram */}
          <TouchableOpacity
            activeOpacity={0.8}
            className="w-11 h-11 rounded-full items-center justify-center"
            style={{ backgroundColor: "#d62976" }}
          >
            {/* Camera outline */}
            <View className="w-5 h-5 rounded-[5px] border-2 border-white items-center justify-center">
              {/* Lens circle */}
              <View className="w-2 h-2 rounded-full border border-white" />
              {/* Flash dot */}
              <View
                className="absolute bg-white rounded-full"
                style={{ width: 3, height: 3, top: 1, right: 1 }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

/* ─── DrawerItem ──────────────────────────────────────────────── */
interface DrawerItemProps {
  icon?: React.ReactNode;
  label: string;
  isActive?: boolean;
  badge?: string;
  onPress?: () => void;
}

const DrawerItem = ({
  icon,
  label,
  isActive,
  badge,
  onPress,
}: DrawerItemProps) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.65}
    className={`flex-row items-center px-5 min-h-[58px] py-[15px] ${
      isActive ? "bg-gray-100" : "bg-white"
    }`}
  >
    {/* Icon / badge column — fixed width so all labels align */}
    <View className="w-[38px] items-center justify-center mr-3">
      {badge ? (
        <View className="bg-red-500 px-[6px] py-[3px] rounded">
          <Text className="text-white text-[10px] font-extrabold tracking-widest">
            {badge}
          </Text>
        </View>
      ) : (
        icon
      )}
    </View>

    {/* Label */}
    <Text
      className={`flex-1 text-[16px] text-gray-900 ${
        isActive ? "font-medium" : "font-normal"
      }`}
    >
      {label}
    </Text>
  </TouchableOpacity>
);
