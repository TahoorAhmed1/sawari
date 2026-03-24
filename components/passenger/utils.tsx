import { X } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";

/**
 * Divider component - a horizontal line separator
 */
export const Divider = () => <View className="h-px bg-gray-100 my-2" />;

/**
 * CloseButton component - a small circle button with X icon
 */
export const CloseButton = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
    className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center"
  >
    <X size={18} color="#333" />
  </TouchableOpacity>
);
