import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
}

export const PrimaryButton = ({
  title,
  onPress,
  loading,
  disabled,
  variant = "primary",
  className,
}: ButtonProps) => {
  const getVariantClass = () => {
    switch (variant) {
      case "secondary":
        return "bg-gray-100";
      case "outline":
        return "bg-transparent border-2 border-gray-200";
      default:
        return "bg-[#C2FF12]";
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      className={`h-16 rounded-2xl items-center justify-center flex-row ${getVariantClass()} ${disabled ? "opacity-50" : ""} ${className}`}
    >
      {loading ? (
        <ActivityIndicator color="black" />
      ) : (
        <Text className="text-black font-bold text-lg">{title}</Text>
      )}
    </TouchableOpacity>
  );
};
