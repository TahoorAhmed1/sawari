import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

const SIZES = [
  { label: "S", desc: "up to 5 kg", icon: "person" },
  { label: "M", desc: "up to 15 kg", icon: "person" },
  { label: "L", desc: "up to 20 kg", icon: "person" },
];

export default function OrderDetailsSheet({
  onClose,
}: {
  onClose: () => void;
}) {
  const [deliveryType, setDeliveryType] = useState("building");
  const [size, setSize] = useState("M");
  const [comment, setComment] = useState("");

  return (
    <View style={styles.sheet}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.header}>Order details</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
          <Ionicons name="close" size={24} color="#111" />
        </TouchableOpacity>
      </View>
      {/* Segmented control */}
      <View style={styles.segmentedRow}>
        <TouchableOpacity
          style={[
            styles.segment,
            deliveryType === "building" && styles.segmentActive,
          ]}
          onPress={() => setDeliveryType("building")}
        >
          <Text
            style={[
              styles.segmentText,
              deliveryType === "building" && styles.segmentTextActive,
            ]}
          >
            To building
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.segment,
            deliveryType === "door" && styles.segmentActive,
          ]}
          onPress={() => setDeliveryType("door")}
        >
          <Text
            style={[
              styles.segmentText,
              deliveryType === "door" && styles.segmentTextActive,
            ]}
          >
            To door
          </Text>
        </TouchableOpacity>
      </View>
      {/* What to deliver */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 18,
          marginBottom: 8,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 17, color: "#111" }}>
          What to deliver
        </Text>
        <Ionicons
          name="information-circle-outline"
          size={18}
          color="#111"
          style={{ marginLeft: 6 }}
        />
      </View>
      <View style={{ flexDirection: "row", marginBottom: 12 }}>
        {SIZES.map((s) => (
          <TouchableOpacity
            key={s.label}
            style={[styles.sizeCard, size === s.label && styles.sizeCardActive]}
            onPress={() => setSize(s.label)}
          >
            <Ionicons
              name="person"
              size={28}
              color={size === s.label ? "#111" : "#94a3b8"}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 2,
              }}
            >
              <Text
                style={[
                  styles.sizeLabel,
                  size === s.label && styles.sizeLabelActive,
                ]}
              >
                {s.label}
              </Text>
            </View>
            <Text
              style={[
                styles.sizeDesc,
                size === s.label && styles.sizeDescActive,
              ]}
            >
              {s.desc}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Comments */}
      <TextInput
        style={styles.commentInput}
        placeholder="Comments for courier"
        placeholderTextColor="#94a3b8"
        value={comment}
        onChangeText={setComment}
        maxLength={200}
        multiline
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <Text style={{ color: "#A3A3A3", fontSize: 13 }}>Optional</Text>
        <Text style={{ color: "#A3A3A3", fontSize: 13 }}>
          {comment.length}/200
        </Text>
      </View>
      {/* Where to pick up/deliver */}
      <Text style={styles.sectionTitle}>Where to pick up</Text>
      <View style={styles.addressRow}>
        <View style={[styles.dot, { backgroundColor: "#22C55E" }]} />
        <View style={{ flex: 1 }}>
          <Text style={styles.addressTitle}>Gulf Shopping Mall</Text>
          <Text style={styles.addressDesc} numberOfLines={1}>
            (Khayaban-e-Iqbal, Block 9 Block...)
          </Text>
          <Text style={styles.addressDesc}>+923242467747</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
      </View>
      <Text style={styles.sectionTitle}>Where to deliver</Text>
      <View style={styles.addressRow}>
        <View style={[styles.dot, { backgroundColor: "#2563EB" }]} />
        <View style={{ flex: 1 }}>
          <Text style={styles.addressTitle}>Karachi (P&T Colony)</Text>
          <Text style={styles.addressDesc}>
            Add address details and phone num...
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
      </View>
      <View style={styles.addressRow}>
        <View style={[styles.dot, { backgroundColor: "#EF4444" }]} />
        <View style={{ flex: 1 }}>
          <Text style={styles.addressTitle}>Karachi (P&T Colony)</Text>
          <Text style={styles.addressDesc}>
            Add address details and phone num...
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
      </View>
      {/* Bottom bar */}
      <View style={styles.bottomBar}>
        <Text style={{ fontWeight: "bold", fontSize: 16, color: "#111" }}>
          from PKR150
        </Text>
        <TouchableOpacity style={styles.saveBtn}>
          <Text style={{ fontWeight: "bold", fontSize: 17, color: "#111" }}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    flex: 1,
    padding: 0,
    paddingTop: 12,
    paddingHorizontal: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  header: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#111",
  },
  closeBtn: {
    padding: 4,
    borderRadius: 16,
  },
  segmentedRow: {
    flexDirection: "row",
    backgroundColor: "#F1F5F9",
    borderRadius: 14,
    marginHorizontal: 20,
    marginBottom: 8,
    overflow: "hidden",
  },
  segment: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  segmentActive: {
    backgroundColor: "#111",
  },
  segmentText: {
    color: "#111",
    fontWeight: "bold",
    fontSize: 15,
  },
  segmentTextActive: {
    color: "#fff",
  },
  sizeCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    alignItems: "center",
    marginHorizontal: 4,
    padding: 10,
  },
  sizeCardActive: {
    backgroundColor: "#EFFFAD",
    borderColor: "#D1FF00",
  },
  sizeLabel: {
    fontWeight: "bold",
    color: "#94a3b8",
    fontSize: 16,
    marginRight: 4,
  },
  sizeLabelActive: {
    color: "#111",
  },
  sizeDesc: {
    color: "#94a3b8",
    fontSize: 13,
  },
  sizeDescActive: {
    color: "#111",
  },
  commentInput: {
    backgroundColor: "#F1F5F9",
    borderRadius: 14,
    padding: 12,
    fontSize: 16,
    color: "#111",
    marginHorizontal: 0,
    marginBottom: 2,
    minHeight: 48,
    maxHeight: 80,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#111",
    marginTop: 8,
    marginBottom: 2,
    marginLeft: 0,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 0,
    marginBottom: 2,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 10,
  },
  addressTitle: {
    fontWeight: "bold",
    color: "#111",
    fontSize: 15,
  },
  addressDesc: {
    color: "#94a3b8",
    fontSize: 13,
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 0,
    paddingVertical: 8,
  },
  saveBtn: {
    backgroundColor: "#D1FF00",
    borderRadius: 14,
    paddingHorizontal: 32,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
