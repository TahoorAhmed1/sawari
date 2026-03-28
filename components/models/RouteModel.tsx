import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { MapPin } from "lucide-react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Divider } from "../passenger/ui/Divider";

const RECENT_LOCATIONS = [
  {
    id: "1",
    title: "Hashmanis Hospital Numaish",
    address: "Muhammad Ali Jinnah Road, Central Jacob Lines Karachi",
  },
  {
    id: "2",
    title: "Dolmen Mall Tariq Road",
    address: "Tariq Rd, PECHS Block 3, Karachi",
  },
  {
    id: "3",
    title: "Aga Khan University Hospital",
    address: "National Stadium Rd, Karachi",
  },
];

interface RouteModelScreenProps {
  onNext: () => void;
  onClose: () => void;
}

export function RouteModel({ onNext, onClose }: RouteModelScreenProps) {
  const [dest, setDest] = useState("");
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = React.useMemo(() => ["65%", "80%"], []);

  useEffect(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    ),
    [],
  );

  const handleNext = () => {
    Keyboard.dismiss();
    bottomSheetModalRef.current?.dismiss();
    onNext();
  };

  const handleClose = () => {
    Keyboard.dismiss();
    bottomSheetModalRef.current?.dismiss();
    // onClose is triggered via onDismiss prop
  };

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      onDismiss={onClose}
      enablePanDownToClose={false} // Prevents closing via dragging down
      backgroundStyle={{ backgroundColor: "white", borderRadius: 32 }}
      handleIndicatorStyle={{ backgroundColor: "#ccc" }}
    >
      <BottomSheetScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="px-5 pt-4 pb-10"
        keyboardShouldPersistTaps="handled"
      >
        {/* Header with Close Icon */}
        <View className="flex-row items-center justify-between mb-5">
          <Text className="text-[18px] font-black text-gray-900">
            Enter your route
          </Text>
          <TouchableOpacity
            onPress={handleClose}
            activeOpacity={0.7}
            className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center"
          >
            <Ionicons name="close-outline" size={24} color="#111" />
          </TouchableOpacity>
        </View>

        {/* From Input */}
        <View className="bg-gray-100 rounded-2xl px-4 py-4 flex-row items-center mb-3">
          <View className="w-5 h-5 rounded-full border-[3px] border-green-600 bg-white mr-3" />
          <View>
            <Text className="text-[11px] text-gray-400 font-semibold">
              From
            </Text>
            <Text className="text-[15px] font-bold text-gray-900 mt-0.5">
              Plot 21
            </Text>
          </View>
        </View>

        {/* Search Input */}
        <View className="border-[1.2px] border-gray-300 rounded-2xl px-4 py-3 flex-row items-center mb-3">
          <Ionicons name="search-outline" size={20} color="#555" />
          <TextInput
            className="flex-1 ml-3 text-[15px] font-semibold text-gray-800"
            placeholder="To"
            placeholderTextColor="#aaa"
            value={dest}
            onChangeText={setDest}
            onSubmitEditing={handleNext}
            returnKeyType="search"
          />
          <TouchableOpacity
            className="w-10 h-10 rounded-xl bg-blue-50 items-center justify-center"
            onPress={handleNext}
          >
            <MapPin size={20} color="#2563EB" />
          </TouchableOpacity>
        </View>

        <Divider />

        {/* Recent Locations */}
        <View className="flex-1">
          {RECENT_LOCATIONS.map((item) => (
            <TouchableOpacity
              key={item.id}
              className="flex-row items-start py-4 border-b border-gray-50"
              onPress={handleNext}
              activeOpacity={0.7}
            >
              <View className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center mr-3 mt-0.5">
                <Ionicons name="time-outline" size={17} color="#555" />
              </View>
              <View className="flex-1">
                <Text className="text-[15px] font-bold text-gray-900">
                  {item.title}
                </Text>
                <Text className="text-[13px] text-gray-500 mt-0.5 leading-5">
                  {item.address}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
}
