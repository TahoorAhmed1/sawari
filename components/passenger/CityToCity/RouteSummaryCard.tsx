import React from "react";
import { Text, View } from "react-native";

interface RouteSummaryCardProps {
  from: string;
  to: string;
}

export function RouteSummaryCard({ from, to }: RouteSummaryCardProps) {
  return (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 24,
        paddingHorizontal: 18,
        paddingVertical: 14,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.08,
        shadowRadius: 18,
        elevation: 8,
        flex: 1,
      }}
    >
      <View className="flex-row items-center mb-3">
        <View className="w-5 h-5 rounded-full border-[4px] border-green-600 mr-4 bg-white" />
        <Text
          className="flex-1 text-[16px] font-bold text-gray-900"
          numberOfLines={1}
        >
          {from}
        </Text>
      </View>
      <View className="h-[1px] bg-[#EEF2F6] ml-9 mb-3" />
      <View className="flex-row items-center">
        <View className="w-5 h-5 rounded-full border-[4px] border-[#E34C42] mr-4 bg-white" />
        <Text
          className="flex-1 text-[16px] font-bold text-gray-900"
          numberOfLines={1}
        >
          {to}
        </Text>
      </View>
    </View>
  );
}
