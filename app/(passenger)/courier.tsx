import OrderDetailsSheet from "@/components/passenger/CityToCity/OrderDetailsSheet";
import PickupSheet from "@/components/passenger/CityToCity/PickupSheet";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
export default function CourierScreen() {
  const router = useRouter();
  const snapPoints = useMemo(() => ["60%"], []);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showPickupSheet, setShowPickupSheet] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flex: 1, height: "100%" }}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={StyleSheet.absoluteFillObject}
          initialRegion={{
            latitude: 24.8607,
            longitude: 67.0104,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        />
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            position: "absolute",
            top: 48,
            left: 20,
            width: 40,
            height: 40,
            backgroundColor: "#fff",
            borderRadius: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Main Bottom Sheet */}
      {/* {!showOrderDetails && !showPickupSheet && ( */}
      <BottomSheet
        index={0}
        snapPoints={snapPoints}
        style={{
          position: "absolute",
          zIndex: 100,
        }}
        enablePanDownToClose={false}
        handleIndicatorStyle={{ backgroundColor: "red", width: 40 }}
        backgroundStyle={{ borderRadius: 32 }}
      >
        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            backgroundColor: "red",
            paddingTop: 8,
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              color: "#111827",
              marginBottom: 18,
            }}
          >
            Courier delivery
          </Text>

          {/* Pickup Point */}
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 18,
            }}
            activeOpacity={0.8}
            onPress={() => setShowPickupSheet(true)}
          >
            <View
              style={{
                width: 16,
                height: 16,
                borderRadius: 8,
                backgroundColor: "#22C55E",
                marginRight: 10,
                borderWidth: 2,
                borderColor: "#fff",
              }}
            />
            <Text style={{ fontSize: 17, fontWeight: "500", color: "#111827" }}>
              Gulf Shopping Mall
            </Text>
          </TouchableOpacity>

          {/* Destination Input */}
          <View
            style={{
              backgroundColor: "#F1F5F9",
              height: 52,
              borderRadius: 14,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 16,
              marginBottom: 12,
            }}
          >
            <Ionicons name="search" size={20} color="#64748b" />
            <TextInput
              placeholder="To"
              style={{
                flex: 1,
                marginLeft: 12,
                fontSize: 17,
                fontWeight: "500",
                color: "#111827",
              }}
              placeholderTextColor="#94a3b8"
            />
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderLeftWidth: 1,
                borderLeftColor: "#E5E7EB",
                paddingLeft: 12,
              }}
            >
              <Text style={{ color: "#94a3b8", marginRight: 2, fontSize: 15 }}>
                Add stops
              </Text>
              <Ionicons name="add" size={20} color="#94a3b8" />
            </TouchableOpacity>
          </View>

          {/* Order Details Button */}
          <TouchableOpacity
            style={{
              backgroundColor: "#F1F5F9",
              height: 52,
              borderRadius: 14,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 16,
              marginBottom: 10,
            }}
            onPress={() => setShowOrderDetails(true)}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name="tune-vertical"
              size={20}
              color="#111827"
            />
            <Text
              style={{
                flex: 1,
                marginLeft: 12,
                fontSize: 17,
                fontWeight: "500",
                color: "#111827",
              }}
            >
              Order details
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
          </TouchableOpacity>

          {/* Fare Offer Button */}
          <TouchableOpacity
            style={{
              backgroundColor: "#F1F5F9",
              height: 52,
              borderRadius: 14,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 16,
              marginBottom: 24,
            }}
            activeOpacity={0.8}
          >
            <Ionicons name="cash-outline" size={20} color="#111827" />
            <Text
              style={{
                flex: 1,
                marginLeft: 12,
                fontSize: 17,
                fontWeight: "500",
                color: "#111827",
              }}
            >
              Offer your fare
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
          </TouchableOpacity>

          {/* Action Button */}
          <TouchableOpacity
            style={{
              backgroundColor: "#D1FF00",
              height: 56,
              borderRadius: 18,
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 4,
              marginBottom: 8,
            }}
            activeOpacity={0.85}
          >
            <Text
              style={{ fontWeight: "bold", fontSize: 20, color: "#111827" }}
            >
              Find a courier
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>

      {/* Order Details Overlay */}
      {showOrderDetails && (
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            backgroundColor: "rgba(0,0,0,0.15)",
            zIndex: 20,
            justifyContent: "flex-end",
          }}
        >
          <OrderDetailsSheet onClose={() => setShowOrderDetails(false)} />
        </View>
      )}

      {/* Pickup Sheet Overlay */}
      {showPickupSheet && (
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            backgroundColor: "rgba(0,0,0,0.15)",
            zIndex: 30,
            justifyContent: "flex-end",
          }}
        >
          <PickupSheet
            onBack={() => setShowPickupSheet(false)}
            onSave={() => setShowPickupSheet(false)}
          />
        </View>
      )}
    </View>
  );
}
