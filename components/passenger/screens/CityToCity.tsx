import { ArrowLeft, History, Navigation } from "lucide-react-native";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MainSheet from "../CityToCity/mainSheet";
import { ParcelDeliverySheet } from "../CityToCity/ParcelDeliverySheet";
import { RideChoiceSheet } from "../CityToCity/RideChoiceSheet";
import { RideScheduleSheet } from "../CityToCity/RideScheduleSheet";
import { RouteSummaryCard } from "../CityToCity/RouteSummaryCard";
import { CityStep, RideChoiceId } from "../CityToCity/types";

const ROUTE_DETAILS = {
  from: "Pakistan, Plot 21, New Karachi Co-Operative Housing Society",
  to: "Pakistan, Lahore",
};

export default function CityToCity() {
  const [step, setStep] = useState<CityStep>("main");
  const [showEnterRoute, setShowEnterRoute] = useState(false);
  const [selectedRide, setSelectedRide] = useState<RideChoiceId>("private");
  const [rideStart, setRideStart] = useState<"now" | "later">("later");
  const [scheduledLabel, setScheduledLabel] = useState("Wed, 25 Mar 5:45 PM");

  const handleBack = () => {
    if (showEnterRoute) {
      setShowEnterRoute(false);
      return;
    }

    if (step === "schedule") {
      setStep("select");
      return;
    }

    if (step === "details") {
      setStep("schedule");
      return;
    }

    if (step === "select") {
      setStep("main");
    }
  };

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
          <TouchableOpacity
            className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-lg"
            onPress={handleBack}
            activeOpacity={0.85}
          >
            <ArrowLeft size={22} color="#333" />
          </TouchableOpacity>
          {step !== "main" && !showEnterRoute && (
            <RouteSummaryCard from={ROUTE_DETAILS.from} to={ROUTE_DETAILS.to} />
          )}
        </View>
      </View>

      {step === "main" && (
        <MainSheet
          setShowEnterRoute={setShowEnterRoute}
          showEnterRoute={showEnterRoute}
          setStep={setStep}
        />
      )}

      {step === "select" && !showEnterRoute && (
        <RideChoiceSheet
          onNext={() => setStep("schedule")}
          onSelectRide={setSelectedRide}
          selectedRide={selectedRide}
        />
      )}

      {step === "schedule" && !showEnterRoute && (
        <RideScheduleSheet
          onNext={(nextScheduledLabel) => {
            setScheduledLabel(nextScheduledLabel);
            setStep("details");
          }}
          onSelectStart={setRideStart}
          rideStart={rideStart}
        />
      )}

      {step === "details" && !showEnterRoute && (
        <ParcelDeliverySheet
          onEditSchedule={() => setStep("schedule")}
          scheduledLabel={scheduledLabel}
        />
      )}

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
