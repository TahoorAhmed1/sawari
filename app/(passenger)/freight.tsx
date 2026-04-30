import ScheduleSheet from "@/components/passenger/CityToCity/ScheduleSheet";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import LocationSheet from "../../components/passenger/CityToCity/LocationSheet";

// Vehicle Option Component
function VehicleOption({
  selected,
  onPress,
  icon,
  label,
  desc1,
  desc2,
  sizeLabel,
  highlight,
  newTag,
}: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[
        styles.vehicleOption,
        highlight && styles.vehicleOptionHighlight,
        selected && styles.vehicleOptionSelected,
      ]}
    >
      {icon}
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <Text style={styles.vehicleLabel}>
            {typeof label === "string" ? label : label}
          </Text>
          {newTag && <Text style={styles.newTag}>NEW</Text>}
        </View>
        <Text style={styles.vehicleDesc}>{desc1}</Text>
        {desc2 ? <Text style={styles.vehicleDesc}>{desc2}</Text> : null}
        {sizeLabel && (
          <View style={styles.sizeLabelBox}>
            <Text style={styles.sizeLabelText}>{sizeLabel}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  vehicleOption: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },
  vehicleOptionHighlight: {
    backgroundColor: "#eff6ff",
  },
  vehicleOptionSelected: {
    borderWidth: 2,
    borderColor: "#84cc16",
  },
  vehicleLabel: {
    fontWeight: "700",
    fontSize: 17,
    color: "#0f172a",
  },
  newTag: {
    marginLeft: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    fontSize: 12,
    borderRadius: 6,
    backgroundColor: "#dbeafe",
    color: "#2563eb",
    fontWeight: "700",
    overflow: "hidden",
  },
  vehicleDesc: {
    color: "#334155",
    fontSize: 14,
    marginTop: 2,
  },
  sizeLabelBox: {
    marginTop: 10,
    alignSelf: "flex-start",
    backgroundColor: "#dbeafe",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  sizeLabelText: {
    color: "#2563eb",
    fontWeight: "700",
    fontSize: 15,
  },
});

export default function FreightRequestScreen() {
  const router = useRouter();

  // Service type state
  const [selectedService, setSelectedService] = useState("Freight");

  // Single modal state management
  const [activeModal, setActiveModal] = useState<
    null | "desc" | "vehicle" | "pickup" | "destination" | "schedule"
  >(null);

  // Form state
  const [pickupTime, setPickupTime] = useState("1hour");
  const [pickupCity, setPickupCity] = useState("Karachi");
  const [pickupStreet, setPickupStreet] = useState("");
  const [destinationCity, setDestinationCity] = useState("Karachi");
  const [destinationStreet, setDestinationStreet] = useState("");
  const [cargoDescription, setCargoDescription] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("Medium truck (M)");
  const [selectedScheduleDate, setSelectedScheduleDate] = useState<
    string | null
  >(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [cargoImage, setCargoImage] = useState<string | null>(null);
  const [fareAmount, setFareAmount] = useState("");

  // Service types configuration
  const services = [
    {
      id: "Premium",
      label: "Premium",
      icon: "car-sport-outline",
      isMCI: false,
    },
    {
      id: "City to city",
      label: "City to city",
      icon: "map-outline",
      isMCI: false,
    },
    { id: "Couriers", label: "Couriers", icon: "moped", isMCI: true },
    { id: "Freight", label: "Freight", icon: "truck-outline", isMCI: false },
  ];

  // Handle service selection
  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    // No popup for non-Freight services (removed 'Coming Soon' alert)
  };

  // Handle time selection
  const handleTimeSelect = (label: string, value: string) => {
    setPickupTime(value);
    if (value === "Schedule") {
      setActiveModal("schedule");
    } else {
      setSelectedScheduleDate(null);
      setActiveModal(null);
    }
  };

  // Handle location updates from LocationSheet
  const handlePickupDone = (city: string, street: string) => {
    setPickupCity(city);
    setPickupStreet(street);
    setActiveModal(null);
  };

  const handleDestinationDone = (city: string, street: string) => {
    setDestinationCity(city);
    setDestinationStreet(street);
    setActiveModal(null);
  };

  // Toggle options
  const toggleOption = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option],
    );
  };

  // Handle image picker
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission needed",
        "Please grant permission to access photos",
      );
      return;
    }

    try {
      // Ensure status bar uses dark icons while picker opens (helps avoid dark-on-dark visuals)
      StatusBar.setBarStyle?.("dark-content", true);
    } catch (e) {
      // ignore
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"], // ✅ new API
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.9,
    });
    if (!result.canceled && result.assets && result.assets[0]?.uri) {
      setCargoImage(result.assets[0].uri);
    }

    try {
      // Restore status bar style used by the screen
      StatusBar.setBarStyle?.("dark-content", true);
    } catch (e) {
      // ignore
    }
  };

  // Handle fare input
  const handleFareInput = () => {
    Alert.prompt(
      "Offer Fare",
      "Enter your fare amount (PKR)",
      (text: string) => {
        const amount = text.replace(/[^0-9]/g, "");
        if (amount) setFareAmount(amount);
      },
      "plain-text",
      fareAmount,
      "number-pad",
    );
  };

  // Handle create request
  const handleCreateRequest = () => {
    // Validate required fields
    if (!pickupStreet.trim()) {
      Alert.alert("Error", "Please enter pickup location details");
      return;
    }
    if (!destinationStreet.trim()) {
      Alert.alert("Error", "Please enter destination details");
      return;
    }
    if (!cargoDescription.trim()) {
      Alert.alert("Error", "Please describe your cargo");
      return;
    }

    const requestData = {
      service: selectedService,
      pickup: {
        city: pickupCity,
        street: pickupStreet,
      },
      destination: {
        city: destinationCity,
        street: destinationStreet,
      },
      pickupTime: pickupTime === "Schedule" ? selectedScheduleDate : pickupTime,
      vehicle: selectedVehicle,
      cargoDescription,
      options: selectedOptions,
      cargoImage,
      fare: fareAmount || "Negotiable",
    };

    console.log("Creating request:", requestData);
    Alert.alert("Success", "Your freight request has been created!", [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  // Format pickup time display
  const getPickupTimeDisplay = () => {
    if (pickupTime === "Schedule" && selectedScheduleDate) {
      const date = new Date(selectedScheduleDate);
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    }
    if (pickupTime === "10m") return "10-20 min";
    if (pickupTime === "1hour") return "Up to 1 hour";
    return pickupTime;
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="flex-row items-center px-4 pt-12 pb-3 border-b border-gray-100">
        <TouchableOpacity
          onPress={() => router.canGoBack() && router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={26} color="black" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-xl font-bold text-slate-900">
          {selectedService}
        </Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Service Selector - Now Selectable */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="py-4 px-4 bg-white"
        >
          {services.map((service) => (
            <TopIcon
              key={service.id}
              label={service.label}
              icon={service.icon}
              isMCI={service.isMCI}
              active={selectedService === service.id}
              onPress={() => handleServiceSelect(service.id)}
            />
          ))}
        </ScrollView>

        <View className="px-5 pb-10">
          {/* Location Section */}
          <View className="bg-gray-50 rounded-2xl p-4 mb-6">
            <TouchableOpacity
              onPress={() => setActiveModal("pickup")}
              activeOpacity={0.8}
            >
              <LocationRow
                label="Pickup location"
                value={`${pickupCity}${
                  pickupStreet ? ", " + pickupStreet : ""
                }`}
                isGreen
              />
            </TouchableOpacity>

            <View className="h-[1px] bg-gray-200 my-3 ml-8" />

            <TouchableOpacity
              onPress={() => setActiveModal("destination")}
              activeOpacity={0.8}
            >
              <LocationRow
                label="Destination"
                value={`${destinationCity}${
                  destinationStreet ? ", " + destinationStreet : ""
                }`}
                isGrey={!destinationStreet}
              />
            </TouchableOpacity>
          </View>

          {/* Pickup Time */}
          <Text className="font-bold text-slate-800 mb-3 ml-1">
            Pickup time
          </Text>
          <View className="flex-row mb-6">
            <TimeChip
              label="10-20 min"
              current={pickupTime}
              value="10m"
              onPress={handleTimeSelect}
            />
            <TimeChip
              label="Up to 1 hour"
              current={pickupTime}
              value="1hour"
              onPress={handleTimeSelect}
            />
            <TimeChip
              label="Schedule"
              current={pickupTime}
              value="Schedule"
              onPress={handleTimeSelect}
            />
          </View>

          {/* Show selected schedule date if applicable */}
          {pickupTime === "Schedule" && selectedScheduleDate && (
            <View className="bg-lime-50 rounded-xl p-3 mb-6 flex-row items-center">
              <Ionicons name="calendar" size={20} color="#84cc16" />
              <Text className="ml-2 text-slate-800 font-semibold">
                Scheduled for:{" "}
                {new Date(selectedScheduleDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </View>
          )}

          {/* Form Buttons */}
          <FormButton
            label="Description of the cargo"
            subLabel={
              cargoDescription
                ? cargoDescription.substring(0, 30) +
                  (cargoDescription.length > 30 ? "..." : "")
                : undefined
            }
            icon="chevron-forward"
            onPress={() => setActiveModal("desc")}
          />

          <FormButton
            label="Vehicle size"
            subLabel={selectedVehicle}
            icon="chevron-forward"
            onPress={() => setActiveModal("vehicle")}
          />

          {/* Options */}
          <Text className="font-bold text-slate-800 mt-6 mb-3 ml-1">
            Options{" "}
            <Ionicons
              name="information-circle-outline"
              size={16}
              color="#9ca3af"
            />
          </Text>
          <View className="flex-row flex-wrap">
            <OptionChip
              label="Easypaisa Pay"
              selected={selectedOptions.includes("Easypaisa Pay")}
              onPress={() => toggleOption("Easypaisa Pay")}
            />
            <OptionChip
              label="Closed body truck"
              selected={selectedOptions.includes("Closed body truck")}
              onPress={() => toggleOption("Closed body truck")}
            />
            <OptionChip
              label="Movers"
              selected={selectedOptions.includes("Movers")}
              onPress={() => toggleOption("Movers")}
            />
            <OptionChip
              label="Ride as a passenger"
              selected={selectedOptions.includes("Ride as a passenger")}
              onPress={() => toggleOption("Ride as a passenger")}
            />
            <OptionChip
              label="Furniture/Fragiles"
              selected={selectedOptions.includes("Furniture/Fragiles")}
              onPress={() => toggleOption("Furniture/Fragiles")}
            />
          </View>

          {/* Cargo Picture */}
          <Text className="font-bold text-slate-800 mt-6 mb-3 ml-1">
            Picture of your cargo
          </Text>
          <TouchableOpacity
            className="w-24 h-24 bg-gray-50 rounded-2xl items-center justify-center border-2 border-dashed border-gray-200 overflow-hidden"
            onPress={pickImage}
            style={{ backgroundColor: "#ffffff" }}
          >
            {cargoImage ? (
              <Image
                source={{ uri: cargoImage }}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                  backgroundColor: "#ffffff",
                }}
              />
            ) : (
              <Ionicons name="camera" size={32} color="#9ca3af" />
            )}
          </TouchableOpacity>

          {/* Offer Fare */}
          <FormButton
            label="Offer your fare"
            subLabel={fareAmount ? `PKR ${fareAmount}` : undefined}
            icon="chevron-forward"
            className="mt-6"
            onPress={handleFareInput}
          />

          {/* Create Request Button */}
          <TouchableOpacity
            className="bg-lime-400 h-[55px] rounded-2xl items-center justify-center mt-8 shadow-sm"
            onPress={handleCreateRequest}
            activeOpacity={0.8}
          >
            <Text className="font-bold text-xl text-slate-900">
              Create request
            </Text>
          </TouchableOpacity>

          {/* Summary Card */}
          {(cargoDescription ||
            fareAmount ||
            pickupStreet ||
            destinationStreet) && (
            <View className="mt-6 bg-gray-50 rounded-2xl p-4">
              <Text className="font-bold text-slate-800 mb-3">
                Request Summary
              </Text>
              <View className="space-y-2">
                <SummaryRow label="Service" value={selectedService} />
                <SummaryRow
                  label="Pickup"
                  value={`${pickupCity}${pickupStreet ? ", " + pickupStreet : ""}`}
                />
                <SummaryRow
                  label="Drop-off"
                  value={`${destinationCity}${destinationStreet ? ", " + destinationStreet : ""}`}
                />
                <SummaryRow label="Time" value={getPickupTimeDisplay()} />
                <SummaryRow label="Vehicle" value={selectedVehicle} />
                {cargoDescription && (
                  <SummaryRow label="Cargo" value={cargoDescription} />
                )}
                {fareAmount && (
                  <SummaryRow label="Fare" value={`PKR ${fareAmount}`} />
                )}
                {selectedOptions.length > 0 && (
                  <SummaryRow
                    label="Options"
                    value={selectedOptions.join(", ")}
                  />
                )}
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Location Sheet (single instance for pickup/destination) */}
      <LocationSheet
        visible={activeModal === "pickup" || activeModal === "destination"}
        onClose={() => setActiveModal(null)}
        title={
          activeModal === "pickup"
            ? "Cargo loading point"
            : "Cargo drop-off point"
        }
        city={activeModal === "pickup" ? pickupCity : destinationCity}
        street={activeModal === "pickup" ? pickupStreet : destinationStreet}
        onCityPress={() => {}}
        onStreetPress={() => {}}
        onDone={(city, street) => {
          if (activeModal === "pickup") handlePickupDone(city, street);
          else if (activeModal === "destination")
            handleDestinationDone(city, street);
        }}
      />

      {/* Schedule Sheet */}
      <ScheduleSheet
        visible={activeModal === "schedule"}
        onClose={() => setActiveModal(null)}
        selectedDate={selectedScheduleDate}
        onDateSelect={setSelectedScheduleDate}
        onNext={() => {
          if (selectedScheduleDate) {
            setActiveModal(null);
          } else {
            Alert.alert("Error", "Please select a date");
          }
        }}
      />

      {/* Description Modal */}
      <Modal
        visible={activeModal === "desc"}
        animationType="slide"
        transparent
        onRequestClose={() => setActiveModal(null)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className="flex-1 justify-end"
        >
          <TouchableOpacity
            className="flex-1"
            activeOpacity={1}
            onPress={() => setActiveModal(null)}
          />
          <View
            className="bg-white rounded-t-3xl px-5 pt-6 pb-8 shadow-lg"
            style={{ minHeight: 340 }}
          >
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-center flex-1 text-lg font-bold text-slate-900">
                Description of the cargo
              </Text>
              <TouchableOpacity onPress={() => setActiveModal(null)}>
                <Ionicons
                  name="close-circle-outline"
                  size={28}
                  color="#d1d5db"
                />
              </TouchableOpacity>
            </View>

            <View className="bg-gray-50 rounded-2xl border border-gray-200 mb-8 px-4 py-3">
              <Text className="text-gray-400 text-base mb-1">
                For example: wardrobe 150/210 cm and five boxes with...
              </Text>
              <TextInput
                className="text-base text-slate-800"
                multiline
                value={cargoDescription}
                onChangeText={setCargoDescription}
                style={{ minHeight: 80, textAlignVertical: "top" }}
                autoFocus
                placeholder="Describe your cargo..."
                placeholderTextColor="#9ca3af"
              />
            </View>

            <TouchableOpacity
              className="bg-lime-400 h-12 rounded-2xl items-center justify-center"
              onPress={() => setActiveModal(null)}
            >
              <Text className="font-bold text-lg text-slate-900">Done</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Vehicle Size Modal */}
      <Modal
        visible={activeModal === "vehicle"}
        animationType="slide"
        onRequestClose={() => setActiveModal(null)}
        statusBarTranslucent={true}
      >
        <View className="flex-1 bg-white">
          {/* Header */}
          <View className="flex-row items-center justify-between px-5 pt-14 pb-4 border-b border-gray-100">
            <TouchableOpacity onPress={() => setActiveModal(null)}>
              <Ionicons name="close" size={28} color="#334155" />
            </TouchableOpacity>

            <Text className="text-xl font-bold text-slate-900">
              Vehicle Size
            </Text>

            <View style={{ width: 28 }} />
          </View>

          {/* Content */}
          <ScrollView
            className="flex-1 px-5 pt-6"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
          >
            <Text className="text-slate-500 text-base mb-6">
              Which vehicle is suitable for your cargo?
            </Text>

            <VehicleOption
              selected={selectedVehicle === "Medium truck (M)"}
              onPress={() => {
                setSelectedVehicle("Medium truck (M)");
                setActiveModal(null);
              }}
              icon={
                <MaterialCommunityIcons
                  name="truck"
                  size={42}
                  color="#0f172a"
                  style={{ marginRight: 14 }}
                />
              }
              label="Medium truck (M)"
              desc1="Hyundai Shehzore, Foton"
              desc2="up to 1.5t — fits a large sofa and moving boxes"
              sizeLabel="300×200×200 cm"
              highlight
            />

            <VehicleOption
              selected={selectedVehicle === "Partial load"}
              onPress={() => {
                setSelectedVehicle("Partial load");
                setActiveModal(null);
              }}
              icon={
                <MaterialCommunityIcons
                  name="cube-scan"
                  size={42}
                  color="#0f172a"
                  style={{ marginRight: 14 }}
                />
              }
              label="Partial load"
              desc1="Up to 100 kg — for intercity deliveries, if not requiring the entire cargo space"
              sizeLabel="80×80×50 cm"
              newTag
            />

            <VehicleOption
              selected={selectedVehicle === "Small truck (S)"}
              onPress={() => {
                setSelectedVehicle("Small truck (S)");
                setActiveModal(null);
              }}
              icon={
                <MaterialCommunityIcons
                  name="truck-fast"
                  size={42}
                  color="#0f172a"
                  style={{ marginRight: 14 }}
                />
              }
              label="Small truck (S)"
              desc1="Suzuki Ravi, Faw carrier"
              desc2="up to 1 ton — fits appliances, armchairs, drawers"
              sizeLabel="170×160×100 cm"
            />

            <VehicleOption
              selected={selectedVehicle === "Large truck (L)"}
              onPress={() => {
                setSelectedVehicle("Large truck (L)");
                setActiveModal(null);
              }}
              icon={
                <MaterialCommunityIcons
                  name="truck-trailer"
                  size={42}
                  color="#0f172a"
                  style={{ marginRight: 14 }}
                />
              }
              label="Large truck (L)"
              desc1="Hyundai Mighty Truck, Mazda Titan T350, Forland C314"
              desc2="up to 5t — fits large appliances, furniture and boxes"
              sizeLabel="700×250×250 cm"
            />

            <VehicleOption
              selected={selectedVehicle === "Rickshaw"}
              onPress={() => {
                setSelectedVehicle("Rickshaw");
                setActiveModal(null);
              }}
              icon={
                <MaterialCommunityIcons
                  name="truck-cargo-container"
                  size={42}
                  color="#0f172a"
                  style={{ marginRight: 14 }}
                />
              }
              label="Rickshaw"
              desc1="New Asia Rickshaw, Sazgar Loader rickshaw"
              desc2="up to 700kg — transports appliances, like a stove"
              sizeLabel="-"
            />
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

// Updated TopIcon component with onPress
const TopIcon = ({ label, icon, active, isMCI, onPress }: any) => {
  const IconLib = isMCI ? MaterialCommunityIcons : Ionicons;
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`items-center px-4 py-2 rounded-xl mr-2 ${
        active ? "bg-lime-50 border border-lime-200" : "bg-transparent"
      }`}
    >
      <IconLib name={icon} size={28} color={active ? "#84cc16" : "#64748b"} />
      <Text
        className={`text-[10px] mt-1 font-bold ${
          active ? "text-lime-600" : "text-gray-500"
        }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const LocationRow = ({ label, value, isGreen, isGrey }: any) => (
  <View className="flex-row items-center">
    <View
      className={`w-2 h-2 rounded-full mr-4 ${
        isGreen ? "bg-lime-400" : "bg-gray-300"
      }`}
    />
    <View className="flex-1">
      <Text className="text-gray-400 text-xs">{label}</Text>
      <Text
        className={`text-lg font-bold ${
          isGrey ? "text-gray-300" : "text-slate-800"
        }`}
        numberOfLines={1}
      >
        {value || "Select location"}
      </Text>
    </View>
    <Ionicons name="chevron-forward" size={18} color="#cbd5e1" />
  </View>
);

const TimeChip = ({ label, current, value, onPress }: any) => {
  const isActive = current === value;

  return (
    <TouchableOpacity
      onPress={() => onPress(label, value)}
      className={`px-4 py-2.5 rounded-full mr-2 ${
        isActive ? "bg-slate-800" : "bg-gray-100"
      }`}
    >
      <Text
        className={`font-bold text-sm ${
          isActive ? "text-white" : "text-slate-600"
        }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const FormButton = ({ label, subLabel, icon, className, onPress }: any) => (
  <TouchableOpacity
    className={`bg-gray-50 h-16 rounded-2xl flex-row items-center px-4 mb-3 ${
      className || ""
    }`}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <View className="flex-1">
      {subLabel && (
        <Text className="text-gray-400 text-[10px] uppercase font-bold tracking-wide">
          {label}
        </Text>
      )}
      <Text
        className={`text-lg font-medium ${
          subLabel ? "text-slate-800" : "text-gray-400"
        }`}
        numberOfLines={1}
      >
        {subLabel || label}
      </Text>
    </View>
    <Ionicons name={icon} size={20} color="#cbd5e1" />
  </TouchableOpacity>
);

const OptionChip = ({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    className={`px-4 py-2 rounded-full mr-2 mb-2 border ${
      selected ? "bg-lime-400 border-lime-400" : "bg-gray-50 border-gray-100"
    }`}
    onPress={onPress}
  >
    <Text
      className={`font-medium ${
        selected ? "text-slate-900" : "text-slate-700"
      }`}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <View className="flex-row justify-between py-1">
    <Text className="text-gray-500 text-sm">{label}</Text>
    <Text className="text-slate-700 text-sm font-medium text-right flex-1 ml-2">
      {value}
    </Text>
  </View>
);

// Add Image component import at the top
