/**
 * CityRideFlow.tsx
 * Complete step-by-step flow after tapping "City rides" on PassengerHome.
 *
 * Steps:
 *  1. enter-route     – "Enter your route" sheet  (Image 1)
 *  2. select-ride     – Map + ride options sheet   (Image 2 & 3)
 *  3. payment-method  – Payment method sheet       (Image 4)
 *  4. finding-ride    – Searching / countdown      (Image 5)
 *  5. higher-fare     – Higher fare modal          (Image 6)
 *  6. driver-offer    – Driver offer card          (Image 7)
 *
 * Usage: replace <ServiceCard title="City" sub="rides" /> press handler
 *   onPress={() => navigation.navigate("CityRideFlow")}
 */

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import {
  ChevronRight,
  MapPin,
  Navigation,
  Pencil,
  X
} from "lucide-react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";

const { width, height } = Dimensions.get("window");
const LIME = "#C8F000";

// ─── Types ────────────────────────────────────────────────────────────────────
type Step =
  | "enter-route"
  | "select-ride"
  | "payment-method"
  | "finding-ride"
  | "higher-fare"
  | "driver-offer";

interface RideOption {
  id: string;
  name: string;
  emoji: string;
  seats: number;
  eta: string;
  fare: string;
  tag: string;
  selected?: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const RIDE_OPTIONS: RideOption[] = [
  {
    id: "moto",
    name: "Moto",
    emoji: "🏍️",
    seats: 1,
    eta: "3 min",
    fare: "PKR235",
    tag: "No traffic, lower prices",
    selected: true,
  },
  {
    id: "mini",
    name: "Mini",
    emoji: "🚗",
    seats: 4,
    eta: "3 min",
    fare: "~PKR280",
    tag: "Lower fares, no AC",
  },
  {
    id: "rickshaw",
    name: "Rickshaw",
    emoji: "🛺",
    seats: 3,
    eta: "2 min",
    fare: "~PKR241",
    tag: "Lower fares",
  },
  {
    id: "rideac",
    name: "Ride A/C",
    emoji: "❄️🚗",
    seats: 4,
    eta: "3 min",
    fare: "~PKR324",
    tag: "Cars with AC",
  },
  {
    id: "premium",
    name: "Premium",
    emoji: "🚙",
    seats: 4,
    eta: "3 min",
    fare: "~PKR476",
    tag: "Sedans with AC",
  },
  {
    id: "couriers",
    name: "Couriers",
    emoji: "📦🛵",
    seats: 0,
    eta: "",
    fare: "",
    tag: "Request package delivery",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Divider line */
const Divider = () => <View className="h-px bg-gray-100 my-2" />;

/** Small close circle button */
const CloseButton = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
    className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center"
  >
    <X size={18} color="#333" />
  </TouchableOpacity>
);

// ─────────────────────────────────────────────────────────────────────────────
// STEP 1 — Enter Route
// ─────────────────────────────────────────────────────────────────────────────
const EnterRouteScreen = ({
  onNext,
  onClose,
}: {
  onNext: () => void;
  onClose: () => void;
}) => {
  const [dest, setDest] = useState("");

  return (
    <View className="flex-1 bg-gray-400/60">
      {/* Map behind */}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: 24.8607,
          longitude: 67.0104,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      />

      {/* Hamburger */}
      <View
        className="absolute left-5 bg-white rounded-full w-11 h-11 items-center justify-center shadow"
        style={{ top: Platform.OS === "ios" ? 56 : 36 }}
      >
        <Ionicons name="menu" size={22} color="#333" />
      </View>

      {/* Bottom white sheet */}
      <View className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl px-5 pt-5 pb-10 shadow-2xl">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-5">
          <Text className="text-[18px] font-black text-gray-900">
            Enter your route
          </Text>
          <CloseButton onPress={onClose} />
        </View>

        {/* FROM field */}
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

        {/* TO field */}
        <View className="border-2 border-gray-900 rounded-2xl px-4 py-3 flex-row items-center">
          <Ionicons name="search-outline" size={20} color="#555" />
          <TextInput
            className="flex-1 ml-3 text-[15px] font-semibold text-gray-800"
            placeholder="To"
            placeholderTextColor="#aaa"
            value={dest}
            onChangeText={setDest}
            autoFocus
            onSubmitEditing={onNext}
          />
          {/* Map pin icon button */}
          <TouchableOpacity
            className="w-10 h-10 rounded-xl bg-blue-50 items-center justify-center"
            onPress={onNext}
          >
            <MapPin size={20} color="#2563EB" />
          </TouchableOpacity>
        </View>

        {/* Recent location */}
        <Divider />
        <TouchableOpacity
          className="flex-row items-start py-3"
          onPress={onNext}
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
      </View>
    </View>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// STEP 2 — Select Ride
// ─────────────────────────────────────────────────────────────────────────────
const SelectRideScreen = ({
  onFindOffers,
  onPaymentPress,
  onBack,
}: {
  onFindOffers: () => void;
  onPaymentPress: () => void;
  onBack: () => void;
}) => {
  const [selected, setSelected] = useState("moto");
  const [fare, setFare] = useState(235);
  const [autoAccept, setAutoAccept] = useState(false);

  const selectedRide = RIDE_OPTIONS.find((r) => r.id === selected)!;

  return (
    <View className="flex-1">
      {/* MAP (top ~42%) */}
      <View style={{ height: height * 0.42 }}>
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
          {/* Origin */}
          <Marker coordinate={{ latitude: 24.8607, longitude: 67.0104 }}>
            <View className="w-4 h-4 rounded-full bg-green-600 border-2 border-white" />
          </Marker>
          {/* Destination */}
          <Marker coordinate={{ latitude: 24.845, longitude: 67.022 }}>
            <View className="w-4 h-4 rounded-full bg-red-400 border-2 border-white" />
          </Marker>
          {/* Route line */}
          <Polyline
            coordinates={[
              { latitude: 24.8607, longitude: 67.0104 },
              { latitude: 24.845, longitude: 67.022 },
            ]}
            strokeColor="#2563EB"
            strokeWidth={4}
          />
        </MapView>

        {/* Route summary card (top of map) */}
        <View className="absolute top-4 left-4 right-4 bg-white rounded-2xl px-5 py-4 shadow-md">
          <View className="flex-row items-center mb-3">
            <View className="w-4 h-4 rounded-full border-[3px] border-green-600 mr-3" />
            <Text className="text-[15px] font-bold text-gray-900 flex-1">
              Plot 21
            </Text>
            <TouchableOpacity className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center">
              <Text className="text-xl">+</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row items-start">
            <View className="w-4 h-4 rounded-full border-[3px] border-red-400 mr-3 mt-0.5" />
            <Text className="text-[15px] font-bold text-gray-900 flex-1 leading-5">
              Hashmanis Hospital Numaish{" "}
              <Text className="text-gray-400 font-normal">~11 min.</Text>
            </Text>
          </View>
        </View>

        {/* Back button */}
        <TouchableOpacity
          onPress={onBack}
          className="absolute bottom-4 left-4 w-10 h-10 bg-white rounded-full items-center justify-center shadow"
        >
          <Ionicons name="arrow-back" size={20} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Promo code bar */}
      <TouchableOpacity className="flex-row items-center px-5 py-3 border-b border-gray-100 bg-white">
        <Ionicons
          name="ticket-outline"
          size={18}
          color="#555"
          className="mr-3"
        />
        <Text className="flex-1 ml-2 text-[14px] text-gray-700 font-medium">
          Got promo code? Use it here
        </Text>
        <ChevronRight size={16} color="#aaa" />
      </TouchableOpacity>

      {/* Bottom sheet scroll */}
      <ScrollView
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}
      >
        {/* Handle */}
        <View className="items-center pt-2 pb-1">
          <View className="w-10 h-1 rounded-full bg-gray-300" />
        </View>

        {/* SELECTED RIDE – expanded card */}
        <View className="mx-4 mt-3 border border-gray-200 rounded-2xl overflow-hidden mb-2">
          <View className="flex-row items-center px-4 py-4">
            <Text className="text-4xl mr-4">{selectedRide.emoji}</Text>
            <View className="flex-1">
              <View className="flex-row items-center gap-1">
                <Text className="text-[16px] font-black text-gray-900">
                  {selectedRide.name}
                </Text>
                <View className="w-4 h-4 rounded-full border border-gray-400 items-center justify-center ml-1">
                  <Text className="text-[9px] text-gray-500 font-bold">i</Text>
                </View>
              </View>
              <Text className="text-[13px] text-gray-500 mt-0.5">
                👤 {selectedRide.seats} • {selectedRide.eta}
              </Text>
              <Text className="text-[12px] text-gray-400 mt-0.5">
                {selectedRide.tag}
              </Text>
            </View>
            <TouchableOpacity className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center">
              <Pencil size={14} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Fare adjuster */}
          <View className="flex-row items-center px-4 pb-4">
            <TouchableOpacity
              className="w-11 h-11 rounded-full bg-gray-100 items-center justify-center"
              onPress={() => setFare((f) => Math.max(200, f - 5))}
            >
              <Text className="text-xl font-bold text-gray-700">−</Text>
            </TouchableOpacity>
            <View className="flex-1 items-center">
              <Text className="text-[22px] font-black text-gray-900">
                PKR{fare}
              </Text>
              <Text className="text-[12px] text-gray-400">
                Recommended fare: PKR235
              </Text>
            </View>
            <TouchableOpacity
              className="w-11 h-11 rounded-full bg-gray-100 items-center justify-center"
              onPress={() => setFare((f) => f + 5)}
            >
              <Text className="text-xl font-bold text-gray-700">+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* OTHER RIDE OPTIONS */}
        {RIDE_OPTIONS.filter((r) => r.id !== selected).map((ride) => (
          <TouchableOpacity
            key={ride.id}
            onPress={() => setSelected(ride.id)}
            activeOpacity={0.75}
            className="flex-row items-center px-5 py-4 border-b border-gray-50"
          >
            <Text className="text-3xl mr-4">{ride.emoji}</Text>
            <View className="flex-1">
              <Text className="text-[15px] font-bold text-gray-900">
                {ride.name}
              </Text>
              {ride.seats > 0 && (
                <Text className="text-[12px] text-gray-500 mt-0.5">
                  👤 {ride.seats} • {ride.eta}
                </Text>
              )}
              <Text className="text-[12px] text-gray-400">{ride.tag}</Text>
            </View>
            {ride.fare ? (
              <Text className="text-[14px] font-bold text-gray-800">
                {ride.fare}
              </Text>
            ) : null}
          </TouchableOpacity>
        ))}

        {/* Spacer for footer */}
        <View className="h-24" />
      </ScrollView>

      {/* STICKY FOOTER */}
      <View className="bg-white px-4 pb-8 pt-3 border-t border-gray-100">
        {/* Auto-accept toggle */}
        <View className="flex-row items-center mb-3">
          <Navigation size={18} color="#333" />
          <Text className="flex-1 ml-3 text-[14px] font-semibold text-gray-800">
            Auto-accept offer of PKR{fare}
          </Text>
          <Switch
            value={autoAccept}
            onValueChange={setAutoAccept}
            trackColor={{ false: "#e5e7eb", true: "#86efac" }}
            thumbColor={autoAccept ? "#16a34a" : "#fff"}
          />
        </View>

        {/* Find offers button */}
        <TouchableOpacity
          onPress={onFindOffers}
          activeOpacity={0.85}
          className="bg-[#C8F000] rounded-2xl py-4 flex-row items-center justify-center"
        >
          <Text className="text-xl mr-2">💵</Text>
          <Text className="text-[17px] font-black text-gray-900">
            Find offers
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// STEP 3 — Payment Method (bottom sheet modal)
// ─────────────────────────────────────────────────────────────────────────────
const PaymentMethodSheet = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const [selected, setSelected] = useState<string | null>(null);

  const methods = [
    {
      section: "Money Transfer",
      sub: "Pay via your banking app",
      options: [
        { id: "easypaisa", label: "EasyPaisa", emoji: "💳" },
        { id: "jazzcash", label: "JazzCash", emoji: "💳" },
      ],
    },
    {
      section: "Other",
      sub: "",
      options: [{ id: "cash", label: "Cash", emoji: "💵" }],
    },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/40">
        <View className="bg-white rounded-t-3xl px-6 pt-5 pb-12">
          {/* Handle */}
          <View className="items-center mb-4">
            <View className="w-10 h-1 bg-gray-300 rounded-full" />
          </View>

          {/* Close */}
          <View className="items-end mb-4">
            <CloseButton onPress={onClose} />
          </View>

          <Text className="text-[24px] font-black text-gray-900 mb-6">
            Choose a payment method
          </Text>

          {methods.map((group) => (
            <View key={group.section} className="mb-5">
              <Text className="text-[17px] font-black text-gray-900 mb-0.5">
                {group.section}
              </Text>
              {group.sub ? (
                <Text className="text-[13px] text-gray-500 mb-3">
                  {group.sub}
                </Text>
              ) : null}
              {group.options.map((opt) => (
                <TouchableOpacity
                  key={opt.id}
                  onPress={() => {
                    setSelected(opt.id);
                    setTimeout(onClose, 300);
                  }}
                  activeOpacity={0.75}
                  className="flex-row items-center py-4 border-b border-gray-100"
                >
                  <Text className="text-2xl mr-4">{opt.emoji}</Text>
                  <Text className="flex-1 text-[15px] font-semibold text-gray-800">
                    {opt.label}
                  </Text>
                  {/* Radio */}
                  <View
                    className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                      selected === opt.id
                        ? "border-green-600"
                        : "border-gray-300"
                    }`}
                  >
                    {selected === opt.id && (
                      <View className="w-3 h-3 rounded-full bg-green-600" />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </View>
    </Modal>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// STEP 4 — Finding Ride (countdown + driver avatars)
// ─────────────────────────────────────────────────────────────────────────────
const FindingRideScreen = ({
  onHigherFare,
  onCancel,
}: {
  onHigherFare: () => void;
  onCancel: () => void;
}) => {
  const [seconds, setSeconds] = useState(54);
  const [fare, setFare] = useState(235);
  const [autoAccept, setAutoAccept] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const timerProgress = useRef(new Animated.Value(1)).current;

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
  }, []);

  const progressWidth = timerProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View className="flex-1">
      {/* MAP */}
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

        {/* "3 drivers viewing" bar */}
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

      {/* BOTTOM PANEL */}
      <View className="bg-white px-5 pt-4 pb-10">
        {/* Handle */}
        <View className="items-center mb-3">
          <View className="w-10 h-1 bg-gray-300 rounded-full" />
        </View>

        {/* Status + timer */}
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-[16px] font-bold text-gray-800 flex-1 leading-6 pr-4">
            Good fare. Your request gets priority
          </Text>
          <Text className="text-[22px] font-black text-gray-900">
            0:{seconds.toString().padStart(2, "0")}
          </Text>
        </View>

        {/* Progress bar */}
        <View className="h-[3px] bg-gray-200 rounded-full mb-5 overflow-hidden">
          <Animated.View
            className="h-full bg-gray-900 rounded-full"
            style={{ width: progressWidth }}
          />
        </View>

        {/* Fare adjuster */}
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

        {/* Auto accept */}
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

        {/* Payment method */}
        <TouchableOpacity
          className="flex-row items-center py-3"
          onPress={() => setShowPayment(true)}
        >
          <Text className="text-xl mr-3">💵</Text>
          <Text className="text-[14px] font-semibold text-gray-800">
            PKR{fare} <Text className="text-gray-400 font-normal">Cash</Text>
          </Text>
        </TouchableOpacity>

        <Divider />

        {/* Route */}
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

        {/* Cancel */}
        <TouchableOpacity
          onPress={onCancel}
          className="border border-gray-200 rounded-2xl py-4 items-center"
        >
          <Text className="text-[16px] font-bold text-gray-800">
            Cancel request
          </Text>
        </TouchableOpacity>
      </View>

      <PaymentMethodSheet
        visible={showPayment}
        onClose={() => setShowPayment(false)}
      />
    </View>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// STEP 5 — Higher Fare Modal
// ─────────────────────────────────────────────────────────────────────────────
const HigherFareModal = ({
  visible,
  onSearchHigher,
  onCancel,
}: {
  visible: boolean;
  onSearchHigher: () => void;
  onCancel: () => void;
}) => (
  <Modal visible={visible} transparent animationType="slide">
    <View className="flex-1 justify-end bg-black/30">
      <View className="bg-white rounded-t-3xl px-6 pt-6 pb-10">
        {/* Handle */}
        <View className="items-center mb-4">
          <View className="w-10 h-1 bg-gray-300 rounded-full" />
        </View>

        {/* Close */}
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
      </View>
    </View>
  </Modal>
);

// ─────────────────────────────────────────────────────────────────────────────
// STEP 6 — Driver Offer
// ─────────────────────────────────────────────────────────────────────────────
const DriverOfferScreen = ({
  onAccept,
  onDecline,
  onCancel,
}: {
  onAccept: () => void;
  onDecline: () => void;
  onCancel: () => void;
}) => (
  <View className="flex-1">
    {/* Full map */}
    <MapView
      provider={PROVIDER_GOOGLE}
      style={StyleSheet.absoluteFillObject}
      initialRegion={{
        latitude: 24.86,
        longitude: 67.02,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      }}
    >
      {[
        { lat: 24.855, lng: 67.018 },
        { lat: 24.862, lng: 67.025 },
        { lat: 24.858, lng: 67.012 },
      ].map((pos, i) => (
        <Marker key={i} coordinate={{ latitude: pos.lat, longitude: pos.lng }}>
          <View className="bg-[#C8F000] w-8 h-8 rounded-full items-center justify-center border-2 border-white">
            <Text className="text-base">🛵</Text>
          </View>
        </Marker>
      ))}
    </MapView>

    {/* Cancel request pill (top) */}
    <TouchableOpacity
      onPress={onCancel}
      className="absolute bg-red-100 rounded-full px-5 py-3 flex-row items-center shadow"
      style={{ top: Platform.OS === "ios" ? 56 : 36, left: 16 }}
    >
      <X size={16} color="#ef4444" />
      <Text className="ml-2 text-[14px] font-bold text-red-500">
        Cancel request
      </Text>
    </TouchableOpacity>

    {/* "Choose a driver" label */}
    <View
      className="absolute left-5"
      style={{ top: Platform.OS === "ios" ? 110 : 90 }}
    >
      <Text
        className="text-[26px] font-black text-white"
        style={{
          textShadowColor: "rgba(0,0,0,0.4)",
          textShadowOffset: { width: 0, height: 1 },
          textShadowRadius: 4,
        }}
      >
        Choose a driver
      </Text>
    </View>

    {/* Driver offer card (floating) */}
    <View
      className="absolute left-4 right-4 bg-white rounded-3xl p-5 shadow-2xl"
      style={{ top: Platform.OS === "ios" ? 165 : 145 }}
    >
      {/* Price + ETA */}
      <View className="flex-row items-baseline gap-3 mb-4">
        <Text className="text-[28px] font-black text-gray-900">PKR259</Text>
        <Text className="text-[24px] font-black text-gray-400">3 min</Text>
      </View>

      {/* Driver info */}
      <View className="flex-row items-center mb-5">
        {/* Avatar with badge */}
        <View className="relative mr-4">
          <View className="w-14 h-14 rounded-full bg-gray-200 items-center justify-center border-2 border-gray-300 overflow-hidden">
            <Text className="text-3xl">👨</Text>
          </View>
          <View className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 rounded-full items-center justify-center border border-white">
            <Text className="text-[8px] text-white font-black">✓</Text>
          </View>
        </View>

        <View className="flex-1">
          <View className="flex-row items-center gap-2">
            <Text className="text-[16px] font-black text-gray-900">Sajjad</Text>
            <Text className="text-[14px]">⭐</Text>
            <Text className="text-[14px] font-bold text-gray-700">4.94</Text>
            <Text className="text-[13px] text-gray-400">2153 rides</Text>
          </View>
          <Text className="text-[13px] text-gray-700 font-semibold mt-0.5">
            MOTOR-BIKE Power
          </Text>
          <Text className="text-[13px] font-bold text-purple-600 mt-0.5">
            Platinum driver
          </Text>
        </View>
      </View>

      {/* Accept / Decline */}
      <View className="flex-row gap-3">
        <TouchableOpacity
          onPress={onDecline}
          activeOpacity={0.8}
          className="flex-1 bg-gray-100 rounded-2xl py-4 items-center"
        >
          <Text className="text-[16px] font-bold text-gray-800">Decline</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onAccept}
          activeOpacity={0.85}
          className="flex-1 bg-[#C8F000] rounded-2xl py-4 items-center"
        >
          <Text className="text-[16px] font-black text-gray-900">Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

// ─────────────────────────────────────────────────────────────────────────────
// ROOT: CityRideFlow
// ─────────────────────────────────────────────────────────────────────────────
export default function CityRideFlow() {
  const navigation = useNavigation();
  const [step, setStep] = useState<Step>("enter-route");
  const [showPayment, setShowPayment] = useState(false);
  const [showHigherFare, setShowHigherFare] = useState(false);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      {/* ── Step 1 ── */}
      {step === "enter-route" && (
        <EnterRouteScreen
          onNext={() => setStep("select-ride")}
          onClose={goBack}
        />
      )}

      {/* ── Step 2 ── */}
      {step === "select-ride" && (
        <>
          <SelectRideScreen
            onFindOffers={() => setStep("finding-ride")}
            onPaymentPress={() => setShowPayment(true)}
            onBack={() => setStep("enter-route")}
          />
          <PaymentMethodSheet
            visible={showPayment}
            onClose={() => setShowPayment(false)}
          />
        </>
      )}

      {/* ── Step 4 ── */}
      {step === "finding-ride" && (
        <>
          <FindingRideScreen
            onHigherFare={() => setShowHigherFare(true)}
            onCancel={goBack}
          />
          <HigherFareModal
            visible={showHigherFare}
            onSearchHigher={() => {
              setShowHigherFare(false);
              setStep("driver-offer");
            }}
            onCancel={() => {
              setShowHigherFare(false);
              goBack();
            }}
          />
        </>
      )}

      {/* ── Step 6 ── */}
      {step === "driver-offer" && (
        <DriverOfferScreen
          onAccept={goBack}
          onDecline={() => setStep("finding-ride")}
          onCancel={goBack}
        />
      )}
    </View>
  );
}
