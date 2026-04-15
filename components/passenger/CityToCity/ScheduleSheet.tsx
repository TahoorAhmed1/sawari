import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useEffect, useMemo, useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ScheduleSheetProps {
  visible: boolean;
  onClose: () => void;
  selectedDate: string | null;
  onDateSelect: (date: string) => void;
  onNext: () => void;
}

const ScheduleSheet = ({
  visible,
  onClose,
  selectedDate,
  onDateSelect,
  onNext,
}: ScheduleSheetProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["45%"], []);

  const dates = [
    { label: "Today", value: "Today" },
    { label: "Tomorrow", value: "Tomorrow" },
    // You can add more dates here if needed
    // { label: "Fri, 15 May", value: "Fri, 15 May" },
  ];

  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.snapToIndex(0);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [visible]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={visible ? 0 : -1}
      snapPoints={snapPoints}
      enablePanDownToClose
      onClose={onClose}
      handleIndicatorStyle={{ backgroundColor: "#E5E7EB", width: 40 }}
      backgroundStyle={{
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
      }}
    >
      <BottomSheetView style={{ padding: 20, paddingBottom: 30 }}>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              flex: 1,
              textAlign: "center",
            }}
          >
            Select the date
          </Text>
          <TouchableOpacity
            onPress={onClose}
            style={{ position: "absolute", right: 0 }}
          >
            <Ionicons name="close" size={28} color="#222" />
          </TouchableOpacity>
        </View>

        {/* Date Options */}
        <View style={{ gap: 8 }}>
          {dates.map((item) => (
            <TouchableOpacity
              key={item.value}
              onPress={() => onDateSelect(item.value)}
              style={{
                padding: 18,
                backgroundColor:
                  selectedDate === item.value ? "#D6FF3D" : "#F5F5F5",
                borderRadius: 14,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: selectedDate === item.value ? "bold" : "600",
                  color: selectedDate === item.value ? "#000" : "#333",
                }}
              >
                {item.label}
              </Text>

              {selectedDate === item.value && (
                <Ionicons name="checkmark-circle" size={24} color="#000" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Next Button */}
        <TouchableOpacity
          onPress={onNext}
          disabled={!selectedDate}
          style={{
            marginTop: 32,
            backgroundColor: selectedDate ? "#D6FF3D" : "#E5E7EB",
            paddingVertical: 18,
            borderRadius: 14,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#000" }}>
            Next
          </Text>
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default ScheduleSheet;
