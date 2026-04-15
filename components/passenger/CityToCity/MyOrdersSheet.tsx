import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import OrderItem from "./OrderItem";

interface Order {
  status: string;
  fare: string;
  type: string;
  scheduledLabel: string;
  from: string;
  to: string;
}

interface MyOrdersSheetProps {
  isVisible: boolean;
  onClose: () => void;
  orders: Order[];
}

const MyOrdersSheet = ({ isVisible, onClose, orders }: MyOrdersSheetProps) => {
  if (!isVisible) return null;

  return (
    <View
      style={{
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.08)",
        zIndex: 100,
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "#FAFAFA",
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderRadius: 0,
          paddingHorizontal: 18,
          paddingTop: 18,
          paddingBottom: 32,
          minHeight: "100%",
          maxHeight: "100%",
        }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 18,
          }}
        >
          <TouchableOpacity onPress={onClose} style={{ marginRight: 12 }}>
            <Ionicons name="arrow-back" size={24} color="#222" />
          </TouchableOpacity>
          <Text style={{ fontWeight: "bold", fontSize: 22, flex: 1 }}>
            My orders
          </Text>
        </View>
        {/* Orders List */}
        <FlatList
          data={orders}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={({ item }) => <OrderItem {...item} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default MyOrdersSheet;
