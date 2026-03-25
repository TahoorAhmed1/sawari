import { Ionicons } from "@expo/vector-icons";
import { ArrowLeft, History, Navigation } from "lucide-react-native";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MainSheet from "../CityToCity/mainSheet";
export default function CityToCity() {
  const [step, setStep] = useState<"main" | "route" | "select" | "finding">(
    "main"
  );

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1">
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

        <View className="absolute top-12 left-4 right-4 flex-row gap-2 ">
          <TouchableOpacity className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-lg">
            <ArrowLeft size={22} color="#333" />
          </TouchableOpacity>
          <View className=" bg-white rounded-2xl px-4 py-3 shadow-lg w-full flex-1 ">
            <View className="flex-row items-center mb-3">
              <View className="w-4 h-4 rounded-full border-[3.5px] border-green-600 mr-3" />
              <Text className="text-[17px] font-bold">Karachi</Text>
            </View>
            <View className="h-[1px] bg-gray-100 ml-7 mb-3" />
            <View className="flex-row items-center">
              <View className="w-4 h-4 rounded-full border-[3.5px] border-red-400 mr-3" />
              <Text className="text-[17px] font-bold flex-1">
                Hashmanis Hospital{" "}
                <Text className="text-gray-400 font-normal">Numaish</Text>
              </Text>
              <Ionicons name="add" size={24} color="#000" />
            </View>
          </View>
        </View>
      </View>

      {step === "main" && <MainSheet setStep={setStep} />}

      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "white",
          borderTopWidth: 1,
          borderColor: "#F1F5F9",
          flexDirection: "row",
          paddingTop: 10,
          paddingBottom: 5,
          paddingHorizontal: 30,
        }}
      >
        <TouchableOpacity style={{ flex: 1, alignItems: "center" }}>
          <Navigation size={22} color="black" />
          <Text style={{ fontWeight: "bold", marginTop: 4 }}>Ride</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ flex: 1, alignItems: "center" }}>
          <History size={22} color="#CBD5E1" />
          <Text style={{ color: "#94A3B8", marginTop: 4 }}>My orders</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ================= COMPONENTS ================= */
