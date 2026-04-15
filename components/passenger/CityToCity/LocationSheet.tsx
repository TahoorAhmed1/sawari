import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface LocationSheetProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  city: string;
  street: string;
  onCityPress: () => void;
  onStreetPress: () => void;
  onDone: () => void;
}

const LocationSheet = ({
  visible,
  onClose,
  title,
  city,
  street,
  onCityPress,
  onStreetPress,
  onDone,
}: LocationSheetProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["45%"], []);

  // Better way to control the sheet
  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
      }
    },
    [onClose],
  );

  // Open/close when visible prop changes
  React.useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.snapToIndex(0);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [visible]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={visible ? 0 : -1} // ← This is the key fix
      snapPoints={snapPoints}
      enablePanDownToClose
      onChange={handleSheetChanges}
      handleIndicatorStyle={{ backgroundColor: "#E5E7EB", width: 40 }}
      backgroundStyle={{
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        paddingBottom: 10,
      }}
    >
      <BottomSheetView
        style={{ paddingHorizontal: 18, paddingTop: 8, paddingBottom: 16 }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 18,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              flex: 1,
              textAlign: "center",
            }}
          >
            {title}
          </Text>

          <TouchableOpacity
            onPress={onClose}
            style={{ position: "absolute", right: 0 }}
          >
            <Ionicons name="close" size={28} color="#222" />
          </TouchableOpacity>
        </View>

        {/* City */}
        <TouchableOpacity
          style={{
            backgroundColor: "#F5F5F5",
            borderRadius: 12,
            padding: 16,
            marginBottom: 12,
          }}
          onPress={onCityPress}
        >
          <Text style={{ color: "#A3A3A3", fontSize: 15 }}>City</Text>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>{city}</Text>
        </TouchableOpacity>

        {/* Street */}
        <TouchableOpacity
          style={{
            backgroundColor: "#F5F5F5",
            borderRadius: 12,
            padding: 16,
            marginBottom: 24,
          }}
          onPress={onStreetPress}
        >
          <Text style={{ color: "#A3A3A3", fontSize: 15 }}>
            House number and street
          </Text>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            {street || "Enter street"}
          </Text>
        </TouchableOpacity>

        {/* Done Button */}
        <TouchableOpacity
          style={{
            backgroundColor: "#D6FF3D",
            borderRadius: 12,
            paddingVertical: 16,
            alignItems: "center",
          }}
          onPress={onDone}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>Done</Text>
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default LocationSheet;
