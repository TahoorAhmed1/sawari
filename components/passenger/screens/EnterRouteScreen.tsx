import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { MapPin } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import { Divider } from "../ui/Divider";

interface EnterRouteScreenProps {
  onNext: () => void;
  onClose: () => void;
}

export function EnterRouteScreen({ onNext, onClose }: EnterRouteScreenProps) {
  const [dest, setDest] = useState("");

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = React.useMemo(() => ["35%", "70%", "95%"], []);
  useEffect(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleNext = () => {
    bottomSheetModalRef.current?.dismiss();
    onNext();
  };

  const handleClose = () => {
    Keyboard.dismiss();
    bottomSheetModalRef.current?.dismiss();
    onClose();
  };

  return (
    <View className="flex-1 bg-gray-400/60">
      <MapView
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFillObject}
        onPress={() => Keyboard.dismiss()}
        initialRegion={{
          latitude: 24.8607,
          longitude: 67.0104,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      />

      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        index={0} // 👈 start HALF
        enablePanDownToClose={false} // 👈 prevents closing
        onDismiss={onClose}
      >
        <BottomSheetView className="bg-white rounded-t-3xl px-5 pt-5 pb-10 shadow-2xl">
          <View className="flex-row items-center justify-between mb-5">
            <Text className="text-[18px] font-black text-gray-900">
              Enter your route
            </Text>
          </View>

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

          <View className="border-2 border-gray-900 rounded-2xl px-4 py-3 flex-row items-center">
            <Ionicons name="search-outline" size={20} color="#555" />
            <TextInput
              className="flex-1 ml-3 text-[15px] font-semibold text-gray-800"
              placeholder="To"
              placeholderTextColor="#aaa"
              value={dest}
              onChangeText={setDest}
              onSubmitEditing={handleNext}
            />
            <TouchableOpacity
              className="w-10 h-10 rounded-xl bg-blue-50 items-center justify-center"
              onPress={handleNext}
            >
              <MapPin size={20} color="#2563EB" />
            </TouchableOpacity>
          </View>

          <Divider />
          <TouchableOpacity
            className="flex-row items-start py-3"
            onPress={handleNext}
            activeOpacity={0.7}
          >
            <View className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center mr-3 mt-0.5">
              <Ionicons name="time-outline" size={17} color="#555" />
            </View>
            <View className="flex-1">
              <Text className="text-[15px] font-bold text-gray-900">
                Hashmanis Hospital Numaish
              </Text>
              <Text className="text-[13px] text-gray-500 mt-0.5 leading-5">
                Muhammad Ali Jinnah Road, Central Jacob Lines Karachi
              </Text>
            </View>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
}
