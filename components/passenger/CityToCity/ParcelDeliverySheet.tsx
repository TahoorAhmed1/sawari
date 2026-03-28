import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { LIME } from "./types";

interface ParcelDeliverySheetProps {
  onEditSchedule: () => void;
  scheduledLabel: string;
}

export function ParcelDeliverySheet({
  onEditSchedule,
  scheduledLabel,
}: ParcelDeliverySheetProps) {
  const [fare, setFare] = useState(0);
  const [draftFare, setDraftFare] = useState("");
  const [comments, setComments] = useState("");
  const [showFareModal, setShowFareModal] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const hasComments = comments.trim().length > 0;

  const fareLabel = useMemo(() => {
    if (!fare) {
      return "Your fare";
    }

    return `PKR ${fare.toLocaleString()}`;
  }, [fare]);

  const openFareModal = () => {
    setDraftFare(fare ? String(fare) : "");
    setShowFareModal(true);
  };

  const applyDraftFare = () => {
    const parsed = Number(draftFare.replace(/[^\d]/g, ""));
    setFare(Number.isFinite(parsed) ? parsed : 0);
    setShowFareModal(false);
  };

  const nudgeFare = (delta: number) => {
    setFare((currentFare) => Math.max(0, currentFare + delta));
  };

  const handleFindDriver = () => {
    if (!fare) {
      openFareModal();
      return;
    }

    if (!hasComments) {
      setShowCommentsModal(true);
    }
  };

  const closeFareModal = () => {
    setShowFareModal(false);
  };

  const closeCommentsModal = () => {
    setShowCommentsModal(false);
  };

  const applyComments = () => {
    setComments((currentComments) => currentComments.trim());
    setShowCommentsModal(false);
  };

  return (
    <>
      <View
        className="absolute bottom-[62px] left-0 right-0 rounded-t-[36px] bg-white"
        style={styles.sheetShadow}
      >
        <View className="px-8 pt-8 pb-6">
          <View className="mb-7 flex-row items-start justify-between">
            <View className="pr-3">
              <Text className="text-[27px] font-bold leading-[33px] text-[#111111]">
                Parcel delivery
              </Text>
              <Text className="mt-1 text-[18px] leading-[23px] text-[#171717]">
                Offer your fare
              </Text>
            </View>

            <View style={styles.deliveryIllustration}>
              <View style={styles.illustrationParcel}>
                <View style={styles.illustrationParcelStripe} />
              </View>
              <View style={styles.illustrationEnvelopeBody}>
                <View style={styles.illustrationEnvelopeFlapLeft} />
                <View style={styles.illustrationEnvelopeFlapRight} />
              </View>
              <View style={styles.illustrationCarRoof} />
              <View style={styles.illustrationCarWindow} />
              <View style={styles.illustrationCarBody} />
              <View style={styles.illustrationWheelLeft} />
              <View style={styles.illustrationWheelRight} />
            </View>
          </View>

          <View className="mb-4 rounded-[30px] bg-[#F4F4F4] px-7 py-7">
            <View className="flex-row items-center justify-between">
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => nudgeFare(-500)}
                className="h-[60px] w-[60px] items-center justify-center rounded-[20px] bg-[#EFEFEF]"
              >
                <Ionicons name="remove" size={28} color="#9D9D9D" />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.9}
                onPress={openFareModal}
                className="mx-4 flex-1 items-center rounded-[22px] bg-white px-4 py-[17px]"
              >
                <Text className="text-[18px] font-medium text-[#171717]">
                  {fareLabel}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => nudgeFare(500)}
                className="h-[60px] w-[60px] items-center justify-center rounded-[20px] bg-[#EFEFEF]"
              >
                <Ionicons name="add" size={28} color="#9D9D9D" />
              </TouchableOpacity>
            </View>

            <Text className="mt-5 text-center text-[16px] font-medium text-[#707070]">
              Tap to offer
            </Text>
          </View>

          <View
            className="mb-3 overflow-hidden rounded-[24px] bg-white"
            style={styles.cardShadow}
          >
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={onEditSchedule}
              className="flex-row items-center px-6 py-[22px]"
            >
              <View className="mr-5 w-8 items-center">
                <Ionicons name="time-outline" size={31} color="#181818" />
              </View>
              <View className="flex-1">
                <Text className="text-[15px] font-normal text-[#6A6A6A]">
                  Date and time
                </Text>
                <Text className="mt-0.5 text-[18px] font-semibold text-[#111111]">
                  {scheduledLabel}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={23} color="#8F8F8F" />
            </TouchableOpacity>
          </View>

          <View
            className="overflow-hidden rounded-[24px] bg-white"
            style={styles.cardShadow}
          >
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setShowCommentsModal(true)}
              className="flex-row items-center px-6 py-[24px]"
            >
              <View className="mr-5 w-8 items-center">
                <Ionicons name="chatbox-outline" size={29} color="#181818" />
              </View>
              <View className="flex-1">
                <Text className="text-[18px] font-semibold text-[#111111]">
                  Comments
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={23} color="#8F8F8F" />
            </TouchableOpacity>
          </View>

          <View className="mt-4 flex-row items-center gap-4">
            <View className="h-[76px] w-[76px] rounded-[20px] bg-[#F3F3F3]" />
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={handleFindDriver}
              className="flex-1 items-center justify-center rounded-[20px]"
              style={{ backgroundColor: LIME, height: 76 }}
            >
              <Text className="text-[27px] font-medium text-[#111111]">
                Find a driver
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal
        transparent
        visible={showFareModal}
        animationType="fade"
        statusBarTranslucent
      >
        <View className="flex-1 justify-end bg-black/45">
          <Pressable
            style={StyleSheet.absoluteFillObject}
            onPress={closeFareModal}
          />
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={Platform.OS === "ios" ? 18 : 0}
          >
            <View
              className="rounded-t-[36px] bg-white px-8 pt-6 pb-6"
              style={styles.modalCard}
            >
              <View className="mb-8 flex-row items-center justify-between">
                <View className="w-14" />
                <Text className="text-[24px] font-bold text-[#111111]">
                  Offer your fare
                </Text>
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={closeFareModal}
                  className="h-14 w-14 items-center justify-center rounded-full bg-[#F5F5F5]"
                >
                  <Ionicons name="close" size={29} color="#111111" />
                </TouchableOpacity>
              </View>

              <View className="items-center">
                <View
                  className="mb-3 min-h-[102px] w-full flex-row items-end justify-center px-2"
                  style={styles.fareValueRow}
                >
                  <Text className="mr-2 text-[78px] font-bold tracking-[-2px] text-[#7A7A84]">
                    PKR
                  </Text>
                  <TextInput
                    value={draftFare}
                    onChangeText={setDraftFare}
                    keyboardType="number-pad"
                    autoFocus
                    placeholder=""
                    textAlign="left"
                    className="min-w-[72px] pb-1 text-[64px] font-bold tracking-[-2px] text-[#7A7A84]"
                    style={styles.fareInput}
                  />
                </View>
                <View className="mb-8 h-px w-full bg-[#E3E3E3]" />
              </View>

              <TouchableOpacity
                activeOpacity={0.9}
                onPress={applyDraftFare}
                className="items-center justify-center rounded-[20px]"
                style={{ backgroundColor: LIME, height: 74 }}
              >
                <Text className="text-[28px] font-medium text-[#111111]">
                  Done
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>

      <Modal
        transparent
        visible={showCommentsModal}
        animationType="fade"
        statusBarTranslucent
      >
        <View className="flex-1 justify-end bg-black/45">
          <Pressable
            style={StyleSheet.absoluteFillObject}
            onPress={closeCommentsModal}
          />
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={Platform.OS === "ios" ? 18 : 0}
          >
            <View
              className="rounded-t-[36px] bg-white px-8 pt-6 pb-6"
              style={styles.modalCard}
            >
              <View className="mb-8 flex-row items-center justify-between">
                <View className="w-14" />
                <Text className="text-[24px] font-bold text-[#111111]">
                  Comments
                </Text>
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={closeCommentsModal}
                  className="h-14 w-14 items-center justify-center rounded-full bg-[#F5F5F5]"
                >
                  <Ionicons name="close" size={29} color="#111111" />
                </TouchableOpacity>
              </View>

              <TextInput
                value={comments}
                onChangeText={setComments}
                multiline
                autoFocus
                placeholder="For example: a small box, about 1kg"
                placeholderTextColor="#787878"
                textAlignVertical="top"
                className="min-h-[182px] rounded-[18px] border-[2.5px] border-[#383838] px-6 py-5 text-[18px] leading-[24px] text-[#111111]"
              />

              <TouchableOpacity
                activeOpacity={0.9}
                onPress={applyComments}
                className="mt-6 items-center justify-center rounded-[20px]"
                style={{ backgroundColor: LIME, height: 74 }}
              >
                <Text className="text-[28px] font-medium text-[#111111]">
                  Done
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  fareInput: {
    flexShrink: 1,
    maxWidth: 120,
  },
  fareValueRow: {
    overflow: "hidden",
  },
  deliveryIllustration: {
    width: 92,
    height: 48,
    position: "relative",
    marginTop: 2,
  },
  illustrationCarBody: {
    position: "absolute",
    left: 0,
    bottom: 7,
    width: 50,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#F3F3F3",
    borderWidth: 1,
    borderColor: "#DADADA",
  },
  illustrationCarRoof: {
    position: "absolute",
    left: 10,
    bottom: 20,
    width: 32,
    height: 10,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor: "#181818",
  },
  illustrationCarWindow: {
    position: "absolute",
    left: 16,
    bottom: 21,
    width: 18,
    height: 7,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    backgroundColor: "#9CB8C8",
  },
  illustrationWheelLeft: {
    position: "absolute",
    left: 8,
    bottom: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#1F1F1F",
  },
  illustrationWheelRight: {
    position: "absolute",
    left: 34,
    bottom: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#1F1F1F",
  },
  illustrationParcel: {
    position: "absolute",
    right: 0,
    bottom: 2,
    width: 32,
    height: 30,
    borderRadius: 4,
    backgroundColor: "#44BF49",
  },
  illustrationParcelStripe: {
    position: "absolute",
    right: 5,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: "#83D082",
  },
  illustrationEnvelopeBody: {
    position: "absolute",
    right: 18,
    bottom: 2,
    width: 26,
    height: 18,
    borderRadius: 3,
    backgroundColor: "#F2C85B",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E0B54C",
  },
  illustrationEnvelopeFlapLeft: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 13,
    height: 11,
    backgroundColor: "#F6D982",
    transform: [{ skewY: "20deg" }],
  },
  illustrationEnvelopeFlapRight: {
    position: "absolute",
    right: 0,
    top: 0,
    width: 13,
    height: 11,
    backgroundColor: "#F6D982",
    transform: [{ skewY: "-20deg" }],
  },
  modalCard: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 12,
  },
  sheetShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 8,
  },
});
