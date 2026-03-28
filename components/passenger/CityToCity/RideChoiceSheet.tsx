import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { LIME, RIDE_CHOICES, RideChoiceId } from "./types";

interface RideChoiceSheetProps {
  onNext: () => void;
  onSelectRide: (ride: RideChoiceId) => void;
  selectedRide: RideChoiceId;
}

// Emoji-based car illustrations matching the screenshot
const RIDE_ICONS: Record<RideChoiceId, string> = {
  private: "🚗",
  shared: "🧑‍🤝‍🧑🚗",
  parcel: "📦🚗",
};

export function RideChoiceSheet({
  onNext,
  onSelectRide,
  selectedRide,
}: RideChoiceSheetProps) {
  return (
    <View style={styles.panelShell}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.panelContent}
      >
        <Text style={styles.sheetTitle}>What ride do you need?</Text>

        {RIDE_CHOICES.map((ride) => {
          const isSelected = ride.id === selectedRide;
          return (
            <TouchableOpacity
              key={ride.id}
              onPress={() => onSelectRide(ride.id)}
              activeOpacity={0.85}
              style={[styles.rideRow, isSelected && styles.rideRowSelected]}
            >
              {/* Icon */}
              <View style={styles.rideIconWrap}>
                <Text style={styles.rideIconText}>
                  {RIDE_ICONS[ride.id as RideChoiceId]}
                </Text>
              </View>

              {/* Text */}
              <View style={styles.rideTextWrap}>
                <Text style={styles.rideTitle}>{ride.title}</Text>
                <Text style={styles.rideSubtitle}>{ride.subtitle}</Text>
              </View>

              {/* Price */}
              <View style={styles.ridePriceWrap}>
                {!!ride.price && (
                  <Text style={styles.ridePrice}>{ride.price}</Text>
                )}
                {!!ride.priceNote && (
                  <Text style={styles.ridePriceNote}>{ride.priceNote}</Text>
                )}
              </View>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity
          style={styles.nextButton}
          onPress={onNext}
          activeOpacity={0.9}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  nextButton: {
    backgroundColor: LIME,
    borderRadius: 18,
    height: 62,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
  },
  nextButtonText: {
    fontSize: 22,
    fontWeight: "500",
    color: "#111",
    letterSpacing: 0.2,
  },
  panelContent: {
    paddingHorizontal: 22,
    paddingTop: 26,
    paddingBottom: 24,
  },
  panelShell: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 63,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 12,
  },
  rideIconText: {
    fontSize: 28,
  },
  rideIconWrap: {
    width: 68,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  ridePrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
    textAlign: "right",
  },
  ridePriceNote: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
    textAlign: "right",
  },
  ridePriceWrap: {
    alignItems: "flex-end",
    justifyContent: "center",
    minWidth: 100,
  },
  rideRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 18,
    marginBottom: 2,
  },
  rideRowSelected: {
    backgroundColor: "#EEEEED",
  },
  rideSubtitle: {
    fontSize: 14,
    color: "#6B6B6B",
    lineHeight: 20,
    marginTop: 2,
  },
  rideTextWrap: {
    flex: 1,
    paddingRight: 8,
  },
  rideTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },
  sheetTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
    marginBottom: 16,
  },
});
