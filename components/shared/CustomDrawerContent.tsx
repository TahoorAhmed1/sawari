import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import {
  Bell,
  Car,
  ChevronRight,
  Facebook,
  Globe,
  History,
  Instagram,
  Settings,
  ShieldCheck,
  Truck,
  User,
} from "lucide-react-native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CustomDrawerContent(
  props: DrawerContentComponentProps
) {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header - image_fd7d46.jpg */}
        <TouchableOpacity
          onPress={() => router.push("/(passenger)/income-selection")}
          className="flex-row items-center justify-between px-5 py-6 mt-4"
        >
          <View className="flex-row items-center">
            <View className="w-14 h-14 bg-[#3b82f6] rounded-full items-center justify-center mr-4">
              <User color="white" size={36} strokeWidth={2.5} />
            </View>
            <Text className="text-2xl font-semibold text-slate-900">
              Tahoor
            </Text>
          </View>
          <ChevronRight color="#cbd5e1" size={24} />
        </TouchableOpacity>

        {/* Navigation List - matches image_fd7d46.jpg list order */}
        <View className="px-2">
          <DrawerItem
            icon={<Car size={24} color="#64748b" />}
            label="City"
            isActive={true}
            onPress={() => router.push("/(passenger)")}
          />
          <DrawerItem
            icon={<History size={24} color="#64748b" />}
            label="Request history"
            onPress={() => router.push("/(passenger)/history")}
          />

          <DrawerItem
            icon={<Globe size={24} color="#64748b" />}
            label="City to City"
            onPress={() => router.push("/(passenger)/citytocity")}
          />
          <DrawerItem
            icon={<Truck size={24} color="#64748b" />}
            label="Freight"
          />
          <DrawerItem
            icon={<Bell size={24} color="#64748b" />}
            label="Notifications"
            onPress={() => router.push("/(passenger)/notifications")}
          />
          <DrawerItem
            icon={<ShieldCheck size={24} color="#64748b" />}
            label="Safety"
            onPress={() => router.push("/(passenger)/safety")}
          />
          <DrawerItem
            icon={<Settings size={24} color="#64748b" />}
            label="Settings"
            onPress={() => router.push("/(passenger)/settings")}
          />
        </View>
      </ScrollView>

      {/* Footer - image_fca3ae.jpg */}
      <View className="px-5 pb-8 pt-4 border-t border-gray-50">
        <TouchableOpacity
          onPress={() => router.push("/(passenger)/income-selection")}
          className="bg-[#C2FF12] h-16 rounded-[20px] items-center justify-center mb-6 shadow-sm"
        >
          <Text className="text-xl font-bold text-slate-900">Driver mode</Text>
        </TouchableOpacity>

        <View className="flex-row justify-center space-x-6">
          <TouchableOpacity className="bg-[#1877F2] w-10 h-10 rounded-full items-center justify-center">
            <Facebook color="white" size={22} fill="white" />
          </TouchableOpacity>
          <TouchableOpacity className="bg-[#E4405F] w-10 h-10 rounded-full items-center justify-center">
            <Instagram color="white" size={22} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

{
  /* Individual Row Component */
}
const DrawerItem = ({ icon, label, isActive, badge, onPress }: any) => (
  <TouchableOpacity
    onPress={onPress}
    className={`flex-row items-center px-4 py-3.5 rounded-xl mb-0.5 ${isActive ? "bg-gray-100" : ""}`}
  >
    <View className="w-10 items-center mr-2">{icon}</View>
    <View className="flex-row items-center flex-1">
      {badge && (
        <View className="bg-red-500 px-1.5 py-0.5 rounded mr-2">
          <Text className="text-white text-[10px] font-bold tracking-tighter">
            {badge}
          </Text>
        </View>
      )}
      <Text
        className={`text-[17px] ${isActive ? "font-bold text-slate-900" : "font-medium text-slate-700"}`}
      >
        {label}
      </Text>
    </View>
  </TouchableOpacity>
);
