import BottomSheet, {
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Navigation } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Polyline, PROVIDER_GOOGLE } from "react-native-maps";

import { Divider } from "../ui/Divider";
import { PaymentMethodSheet } from "../ui/PaymentMethodSheet";

interface FindingRideScreenProps {
  onHigherFare: () => void;
  onCancel: () => void;
}

export function FindingRideScreen({
  onHigherFare,
  onCancel,
}: FindingRideScreenProps) {
  const [seconds, setSeconds] = useState(54);
  const [fare, setFare] = useState(235);
  const [autoAccept, setAutoAccept] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const timerProgress = useRef(new Animated.Value(1)).current;
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = React.useMemo(() => ["50%"], []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(interval);
          onHigherFare();
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    Animated.timing(timerProgress, {
      toValue: 0,
      duration: 54000,
      useNativeDriver: false,
    }).start();

    return () => clearInterval(interval);
  }, [onHigherFare, timerProgress]);

  const progressWidth = timerProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <BottomSheetModalProvider>
      <View className="flex-1">
        <View style={{ flex: 1 }}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={StyleSheet.absoluteFillObject}
            initialRegion={{
              latitude: 24.855,
              longitude: 67.015,
              latitudeDelta: 0.04,
              longitudeDelta: 0.04,
            }}
          >
            <Polyline
              coordinates={[
                { latitude: 24.8607, longitude: 67.0104 },
                { latitude: 24.845, longitude: 67.022 },
              ]}
              strokeColor="#2563EB"
              strokeWidth={4}
            />
          </MapView>

          <View
            className="absolute left-0 right-0 flex-row items-center px-5 py-3 bg-white/90"
            style={{ bottom: 0 }}
          >
            <Text className="flex-1 text-[14px] font-semibold text-gray-800">
              3 drivers are viewing your request
            </Text>
            <View className="flex-row">
              {["👨‍🦱", "👨", "👱"].map((a, i) => (
                <View
                  key={i}
                  className="w-8 h-8 rounded-full bg-gray-200 items-center justify-center -ml-2 border-2 border-white"
                >
                  <Text>{a}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints} index={0}>
          <BottomSheetView className="bg-white px-5 pt-4 pb-10">
            <View className="items-center mb-3">
              <View className="w-10 h-1 bg-gray-300 rounded-full" />
            </View>

            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-[16px] font-bold text-gray-800 flex-1 leading-6 pr-4">
                Good fare. Your request gets priority
              </Text>
              <Text className="text-[22px] font-black text-gray-900">
                0:{seconds.toString().padStart(2, "0")}
              </Text>
            </View>

            <View className="h-[3px] bg-gray-200 rounded-full mb-5 overflow-hidden">
              <Animated.View
                className="h-full bg-gray-900 rounded-full"
                style={{ width: progressWidth }}
              />
            </View>

            <View className="flex-row items-center mb-2">
              <TouchableOpacity
                className="px-5 py-3 bg-gray-100 rounded-xl mr-3"
                onPress={() => setFare((f) => Math.max(200, f - 5))}
              >
                <Text className="text-[13px] text-gray-500">-5</Text>
              </TouchableOpacity>
              <Text className="flex-1 text-center text-[24px] font-black text-gray-900">
                PKR{fare}
              </Text>
              <TouchableOpacity
                className="px-5 py-3 bg-gray-100 rounded-xl ml-3"
                onPress={() => setFare((f) => f + 5)}
              >
                <Text className="text-[13px] text-gray-500">+5</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity className="items-center mb-4">
              <Text className="text-[14px] text-gray-400">Raise fare</Text>
            </TouchableOpacity>

            <Divider />

            <View className="flex-row items-center py-3">
              <Navigation size={18} color="#333" />
              <Text className="flex-1 ml-3 text-[14px] text-gray-700 leading-5">
                Automatically accept the nearest driver for PKR{fare}
              </Text>
              <Switch
                value={autoAccept}
                onValueChange={setAutoAccept}
                trackColor={{ false: "#e5e7eb", true: "#86efac" }}
                thumbColor={autoAccept ? "#16a34a" : "#fff"}
              />
            </View>

            <Divider />

            <TouchableOpacity
              className="flex-row items-center py-3"
              onPress={() => setShowPayment(true)}
            >
              <Text className="text-xl mr-3">💵</Text>
              <Text className="text-[14px] font-semibold text-gray-800">
                PKR{fare}{" "}
                <Text className="text-gray-400 font-normal">Cash</Text>
              </Text>
            </TouchableOpacity>

            <Divider />

            <View className="py-3 mb-3">
              <View className="flex-row items-start mb-3">
                <View className="w-4 h-4 rounded-full border-[3px] border-green-600 mr-3 mt-1" />
                <Text className="text-[14px] text-gray-800 flex-1 leading-5">
                  Plot 21 (P.E.C.H.S., New Karachi Society)
                </Text>
              </View>
              <View className="flex-row items-start">
                <View className="w-4 h-4 rounded-full border-[3px] border-red-400 mr-3 mt-1" />
                <Text className="text-[14px] text-gray-800 flex-1 leading-5">
                  Hashmanis Hospital Numaish (Muhammad Ali Jinnah Road, Central
                  Jacob Lines Karachi)
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={onCancel}
              className="border border-gray-200 rounded-2xl py-4 items-center"
            >
              <Text className="text-[16px] font-bold text-gray-800">
                Cancel request
              </Text>
            </TouchableOpacity>
          </BottomSheetView>
        </BottomSheet>

        <PaymentMethodSheet
          visible={showPayment}
          onClose={() => setShowPayment(false)}
        />
      </View>
    </BottomSheetModalProvider>
  );
}
