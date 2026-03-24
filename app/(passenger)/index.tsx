/**
 * CityRideFlow
 * Complete step-by-step flow orchestrator for city rides
 *
 * Steps:
 *  1. enter-route     – "Enter your route" sheet
 *  2. select-ride     – Map + ride options sheet
 *  3. payment-method  – Payment method sheet
 *  4. finding-ride    – Searching / countdown
 *  5. higher-fare     – Higher fare modal
 *  6. driver-offer    – Driver offer card
 *
 * Usage: replace <ServiceCard title="City" sub="rides" /> press handler
 *   onPress={() => navigation.navigate("CityRideFlow")}
 */

import { useNavigation } from "expo-router";
import React, { useCallback, useState } from "react";
import { View } from "react-native";

// Screen components
import { DriverOfferScreen } from "@/components/passenger/screens/DriverOfferScreen";
import { EnterRouteScreen } from "@/components/passenger/screens/EnterRouteScreen";
import { FindingRideScreen } from "@/components/passenger/screens/FindingRideScreen";
import { HigherFareModal } from "@/components/passenger/screens/HigherFareModal";
import { SelectRideScreen } from "@/components/passenger/screens/SelectRideScreen";

// Types
import type { Step } from "@/components/passenger/types";

export default function CityRideFlow() {
  const navigation = useNavigation();
  const [step, setStep] = useState<Step>("enter-route");
  const [showHigherFare, setShowHigherFare] = useState(false);

  const goBack = useCallback(() => {
    // navigation.goBack();
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      {/* Step 1 – Enter Route */}
      {step === "enter-route" && (
        <EnterRouteScreen
          onNext={() => setStep("select-ride")}
          onClose={goBack}
        />
      )}

      {/* Step 2 – Select Ride */}
      {step === "select-ride" && (
        <SelectRideScreen
          onFindOffers={() => setStep("finding-ride")}
          onPaymentPress={() => setStep("select-ride")}
          onBack={() => setStep("enter-route")}
        />
      )}

      {/* Step 4 – Finding Ride */}
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

      {/* Step 6 – Driver Offer */}
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
