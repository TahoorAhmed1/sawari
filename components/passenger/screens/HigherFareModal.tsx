import {
  BottomSheetModal,
  BottomSheetView
} from "@gorhom/bottom-sheet";
import React, { useEffect, useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { CloseButton } from "../ui/CloseButton";

interface HigherFareModalProps {
  visible: boolean;
  onSearchHigher: () => void;
  onCancel: () => void;
}

export function HigherFareModal({
  visible,
  onSearchHigher,
  onCancel,
}: HigherFareModalProps) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = React.useMemo(() => ["50%"], []);

  useEffect(() => {
    if (visible) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [visible]);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      onDismiss={onCancel}
      enablePanDownToClose={true}
    >
      <BottomSheetView className="flex-1 px-6 pt-6 pb-10">
        <View className="items-center mb-4">
          <View className="w-10 h-1 bg-gray-300 rounded-full" />
        </View>

        <View className="items-end mb-3">
          <CloseButton onPress={onCancel} />
        </View>

        <Text className="text-[24px] font-black text-gray-900 leading-8 mb-3">
          Still need a ride? Search again with the higher fare
        </Text>
        <Text className="text-[15px] text-gray-500 mb-6">
          Increase your chances of getting a ride
        </Text>

        <TouchableOpacity
          onPress={onSearchHigher}
          activeOpacity={0.85}
          className="bg-[#C8F000] rounded-2xl py-4 items-center mb-2"
        >
          <Text className="text-[17px] font-black text-gray-900">
            Search at PKR260
          </Text>
        </TouchableOpacity>
        <Text className="text-center text-[12px] text-gray-400 mb-5">
          Most passengers get a ride at this fare on similar routes
        </Text>

        <TouchableOpacity
          onPress={onCancel}
          className="border border-gray-100 rounded-2xl py-4 items-center"
        >
          <Text className="text-[16px] font-bold text-gray-700">
            I want to cancel
          </Text>
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheetModal>
  );
}
