import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

interface OrderItemProps {
  status: string;
  fare: string;
  type: string;
  scheduledLabel: string;
  from: string;
  to: string;
}

const OrderItem = ({
  status,
  fare,
  type,
  scheduledLabel,
  from,
  to,
}: OrderItemProps) => {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 18,
        padding: 18,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.03,
        shadowRadius: 2,
        elevation: 1,
      }}
    >
      <Text style={{ color: "#9CA3AF", fontWeight: "600", marginBottom: 2 }}>
        {status}
      </Text>
      <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 2 }}>
        {fare} for {type}
      </Text>
      <Text style={{ color: "#222", marginBottom: 8 }}>{scheduledLabel}</Text>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 2 }}
      >
        <Ionicons
          name="radio-button-on"
          size={16}
          color="#2563EB"
          style={{ marginRight: 6 }}
        />
        <Text style={{ color: "#222", flex: 1 }} numberOfLines={1}>
          {from}
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons
          name="radio-button-on"
          size={16}
          color="#16A34A"
          style={{ marginRight: 6 }}
        />
        <Text style={{ color: "#222", flex: 1 }} numberOfLines={1}>
          {to}
        </Text>
      </View>
    </View>
  );
};

export default OrderItem;
