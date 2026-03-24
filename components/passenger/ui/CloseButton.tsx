import { X } from "lucide-react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

export function CloseButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center"
    >
      <X size={18} color="#333" />
    </TouchableOpacity>
  );
}
