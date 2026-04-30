// LocationSheet.tsx
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface LocationSheetProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  city: string;
  street: string;
  onCityPress?: () => void;
  onStreetPress?: () => void;
  onDone: (city: string, street: string) => void;
}

const LocationSheet = ({
  visible,
  onClose,
  title,
  city,
  street,
  onCityPress,
  onStreetPress,
  onDone,
}: LocationSheetProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["45%"], []);

  // Move state inside the component
  const [cityLocal, setCityLocal] = useState(city);
  const [streetLocal, setStreetLocal] = useState(street);

  // Update local state when props change (only when sheet becomes visible)
  useEffect(() => {
    if (visible) {
      setCityLocal(city);
      setStreetLocal(street);
    }
  }, [visible, city, street]);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (visible) bottomSheetRef.current?.snapToIndex(0);
    else bottomSheetRef.current?.close();
  }, [visible]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={visible ? 0 : -1}
      snapPoints={snapPoints}
      enablePanDownToClose
      onChange={handleSheetChanges}
      handleIndicatorStyle={{ backgroundColor: "#E5E7EB", width: 40 }}
      backgroundStyle={{ borderTopLeftRadius: 28, borderTopRightRadius: 28 }}
    >
      <BottomSheetView
        style={{ paddingHorizontal: 18, paddingTop: 8, paddingBottom: 16 }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 18,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              flex: 1,
              textAlign: "center",
            }}
          >
            {title}
          </Text>
          <TouchableOpacity
            onPress={onClose}
            style={{ position: "absolute", right: 0 }}
          >
            <Ionicons name="close" size={28} color="#222" />
          </TouchableOpacity>
        </View>

        {/* City editable */}
        <View
          style={{
            backgroundColor: "#F5F5F5",
            borderRadius: 12,
            padding: 12,
            marginBottom: 12,
          }}
        >
          <Text style={{ color: "#A3A3A3", fontSize: 15 }}>City</Text>
          <TextInput
            value={cityLocal}
            onChangeText={setCityLocal}
            placeholder="City"
            placeholderTextColor="#9ca3af"
            style={{ fontSize: 17, fontWeight: "700", paddingVertical: 6 }}
            onFocus={onCityPress}
          />
        </View>

        {/* Street editable */}
        <View
          style={{
            backgroundColor: "#F5F5F5",
            borderRadius: 12,
            padding: 12,
            marginBottom: 24,
          }}
        >
          <Text style={{ color: "#A3A3A3", fontSize: 15 }}>
            House number and street
          </Text>
          <TextInput
            value={streetLocal}
            onChangeText={setStreetLocal}
            placeholder="Enter street"
            placeholderTextColor="#9ca3af"
            style={{ fontSize: 17, fontWeight: "700", paddingVertical: 6 }}
            onFocus={onStreetPress}
          />
        </View>

        {/* Done Button */}
        <TouchableOpacity
          style={{
            backgroundColor: "#84cc16",
            borderRadius: 12,
            paddingVertical: 16,
            alignItems: "center",
          }}
          onPress={() => onDone(cityLocal.trim(), streetLocal.trim())}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20, color: "#222" }}>
            Done
          </Text>
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default LocationSheet;
