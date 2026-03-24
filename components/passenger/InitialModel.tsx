import { Search } from "lucide-react-native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface InitialModelProps {
  onSearchClick: () => void;
  onCityRideClick: () => void;
}

export function InitialModel({
  onSearchClick,
  onCityRideClick,
}: InitialModelProps) {
  return (
    <View style={{ flex: 1, backgroundColor: "#f8f9fb" }}>
      {/* Map section */}
      <View style={{ flex: 1, backgroundColor: "#eef2f7" }}>
        <View
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            right: 16,
            borderRadius: 20,
            backgroundColor: "white",
            padding: 12,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.12,
            shadowRadius: 6,
            elevation: 4,
          }}
        >
          <Text style={{ color: "#8b8f9c", fontSize: 12 }}>Pickup point</Text>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 2 }}>
            Plot 21
          </Text>
        </View>

        <View
          style={{
            position: "absolute",
            bottom: 12,
            left: 16,
            right: 16,
            borderRadius: 14,
            backgroundColor: "#e6ffd8",
            paddingVertical: 12,
            paddingHorizontal: 14,
            borderWidth: 1,
            borderColor: "#c2ff12",
          }}
        >
          <Text style={{ color: "#1a3d0f", fontSize: 14, fontWeight: "bold" }}>
            Apni rides ko bamaqsad madad mein badlein
          </Text>
        </View>
      </View>

      {/* Bottom cards */}
      <View
        style={{
          backgroundColor: "white",
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          marginTop: -24,
          paddingTop: 24,
          flex: 1,
        }}
      >
        <TouchableOpacity
          style={{
            height: 58,
            marginHorizontal: 16,
            borderRadius: 16,
            backgroundColor: "#f2f2f7",
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            marginBottom: 10,
          }}
          onPress={onSearchClick}
        >
          <Search color="#333" size={20} />
          <Text
            style={{
              marginLeft: 12,
              fontWeight: "700",
              fontSize: 16,
              color: "#000",
            }}
          >
            Where to & for how much?
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 16,
            marginBottom: 10,
          }}
        >
          <TouchableOpacity
            onPress={onCityRideClick}
            style={{
              flex: 1,
              marginRight: 6,
              backgroundColor: "#fff",
              borderRadius: 16,
              padding: 14,
              borderColor: "#e2e8f0",
              borderWidth: 1,
            }}
          >
            <Text style={{ fontWeight: "800", color: "#111", fontSize: 15 }}>
              City rides
            </Text>
            <Text style={{ color: "#60667e", marginTop: 4 }}>Fast, local</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              marginLeft: 6,
              backgroundColor: "#fff",
              borderRadius: 16,
              padding: 14,
              borderColor: "#e2e8f0",
              borderWidth: 1,
            }}
          >
            <Text style={{ fontWeight: "800", color: "#111", fontSize: 15 }}>
              Groceries
            </Text>
            <Text style={{ color: "#60667e", marginTop: 4 }}>
              30 min delivery
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ paddingLeft: 10 }}
        >
          {[
            { label: "Flash Deal" },
            { label: "Fruits & Vegetables" },
            { label: "Chicken Meal" },
          ].map((item) => (
            <View
              key={item.label}
              style={{
                width: 120,
                height: 120,
                marginRight: 10,
                borderRadius: 20,
                backgroundColor: "#fff",
                justifyContent: "center",
                alignItems: "center",
                borderColor: "#ddd",
                borderWidth: 1,
              }}
            >
              <Text style={{ fontSize: 13, fontWeight: "700" }}>
                {item.label}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View style={{ marginTop: 14, marginHorizontal: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: "800", marginBottom: 8 }}>
            Send fast and safe
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {[{ label: "Clothes" }, { label: "Food" }, { label: "Docs" }].map(
              (item) => (
                <View
                  key={item.label}
                  style={{
                    width: "32%",
                    aspectRatio: 1,
                    borderRadius: 16,
                    backgroundColor: "#dcffe9",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 13, fontWeight: "700" }}>
                    {item.label}
                  </Text>
                </View>
              )
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
