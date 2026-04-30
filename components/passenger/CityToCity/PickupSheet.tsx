import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

export default function PickupSheet({
  onBack,
  onSave,
}: {
  onBack: () => void;
  onSave: () => void;
}) {
  const [address, setAddress] = useState(
    "Gulf Shopping Mall (Khayaban-e-Iqbal, Block 9 Block...)",
  );
  const [entrance, setEntrance] = useState("");
  const [details, setDetails] = useState("");
  const [phone, setPhone] = useState("+92 3242467747");

  return (
    <View style={styles.sheet}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#111" />
        </TouchableOpacity>
        <Text style={styles.header}>Where to pick up</Text>
        <View style={{ width: 24 }} />
      </View>
      {/* Address fields */}
      <View style={styles.row}>
        <View style={{ flex: 1, marginRight: 6 }}>
          <Text style={styles.label}>Street, building</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Street, building"
            placeholderTextColor="#A3A3A3"
          />
        </View>
        <View style={{ width: 90 }}>
          <Text style={styles.label}>Entrance</Text>
          <TextInput
            style={styles.input}
            value={entrance}
            onChangeText={setEntrance}
            placeholder="Entrance"
            placeholderTextColor="#A3A3A3"
          />
        </View>
      </View>
      <Text style={styles.label}>Address details</Text>
      <TextInput
        style={styles.input}
        value={details}
        onChangeText={setDetails}
        placeholder="Address details"
        placeholderTextColor="#A3A3A3"
      />
      {/* Phone */}
      <Text style={styles.label}>Sender phone number</Text>
      <View style={styles.phoneRow}>
        <View style={styles.flagBox}>
          <Text style={{ fontSize: 18 }}>🇵🇰</Text>
          <Ionicons
            name="chevron-down"
            size={16}
            color="#111"
            style={{ marginLeft: 2 }}
          />
        </View>
        <TextInput
          style={[
            styles.input,
            { flex: 1, borderWidth: 0, marginLeft: 8, paddingLeft: 0 },
          ]}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TouchableOpacity style={{ marginLeft: 8 }}>
          <Ionicons name="ios-book" size={22} color="#111" />
        </TouchableOpacity>
      </View>
      {/* Save button */}
      <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
        <Text style={{ fontWeight: "bold", fontSize: 18, color: "#111" }}>
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    flex: 1,
    paddingTop: 18,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  header: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#111",
  },
  backBtn: {
    padding: 4,
    borderRadius: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    color: "#A3A3A3",
    fontSize: 14,
    marginBottom: 2,
    marginLeft: 2,
  },
  input: {
    backgroundColor: "#F1F5F9",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: "#111",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    borderRadius: 14,
    paddingHorizontal: 8,
    marginBottom: 18,
    marginTop: 2,
  },
  flagBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    marginRight: 2,
  },
  saveBtn: {
    backgroundColor: "#D1FF00",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    marginTop: 10,
  },
});
