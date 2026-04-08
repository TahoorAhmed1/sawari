import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Circle, Path, Rect, Text as SvgText } from "react-native-svg";
import { LIME, ParcelRequestDetails } from "./types";

interface SearchingDriversScreenProps {
  onBack: () => void;
  request: ParcelRequestDetails;
  routeFrom: string;
  routeTo: string;
}

const CANCEL_REASONS = [
  "To change the departure time",
  "Incorrect address",
  "I've got no offers from drivers",
  "Changed my mind",
  "To change the fare",
];

export function SearchingDriversScreen({
  onBack,
  request,
  routeFrom,
  routeTo,
}: SearchingDriversScreenProps) {
  const requestSheetRef = useRef<BottomSheetModal>(null);
  const { height: windowHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [isExpanded, setIsExpanded] = useState(false);
  const [fare, setFare] = useState(request.fare);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showOtherReasonModal, setShowOtherReasonModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [otherReason, setOtherReason] = useState("");

  const fareLabel = useMemo(() => `PKR${fare.toLocaleString()}`, [fare]);
  const sheetBottomInset = useMemo(() => insets.bottom + 54, [insets.bottom]);
  const snapPoints = useMemo(
    () => [100, Math.min(windowHeight - (insets.top + 74), 618)],
    [insets.top, windowHeight],
  );
  const viewedCount = isExpanded ? 15 : 12;
  const extraCount = isExpanded ? "+13" : "+10";

  useEffect(() => {
    requestSheetRef.current?.present();

    return () => {
      requestSheetRef.current?.dismiss();
    };
  }, []);

  const handleSheetChange = useCallback((index: number) => {
    setIsExpanded(index > 0);
  }, []);

  const toggleSheet = useCallback(() => {
    if (isExpanded) {
      requestSheetRef.current?.snapToIndex(0);
      return;
    }

    requestSheetRef.current?.snapToIndex(1);
  }, [isExpanded]);

  return (
    <>
      <View className="flex-1 bg-[#F7F7F4]">
        <View className="px-4 pt-12">
          <View className="flex-row items-center">
            <TouchableOpacity
              activeOpacity={0.85}
              className="h-12 w-12 items-center justify-center rounded-full"
              onPress={onBack}
            >
              <Ionicons name="arrow-back" size={34} color="#121212" />
            </TouchableOpacity>

            <Text className="flex-1 pr-12 text-center text-[23px] font-bold text-[#111111]">
              Searching for drivers
            </Text>
          </View>

          <View className="mt-6 flex-row justify-between px-1">
            {Array.from({ length: 6 }).map((_, index) => (
              <View
                key={index}
                className="h-[6px] rounded-full bg-[#222222]"
                style={{ width: 44 }}
              />
            ))}
          </View>
        </View>

        <View className="flex-1 items-center justify-center px-8 pb-[190px] pt-4">
          <View style={styles.heroIllustrationWrap}>
            <SearchingIllustration />
          </View>
          <Text className="mt-4 text-center text-[25px] font-bold leading-[31px] text-[#111111]">
            Choose your driver
          </Text>
          <Text className="mt-3 text-center text-[18px] leading-[28px] text-[#1C1C1C]">
            You'll see the car, number of orders,{"\n"}rating and reviews
          </Text>
        </View>
      </View>

      <BottomSheetModal
        ref={requestSheetRef}
        index={0}
        snapPoints={snapPoints}
        detached
        enablePanDownToClose={false}
        enableDynamicSizing={false}
        enableOverDrag={false}
        onChange={handleSheetChange}
        bottomInset={sheetBottomInset}
        backgroundStyle={styles.sheetBackground}
        handleIndicatorStyle={styles.sheetHandle}
        style={styles.sheetModal}
      >
        <BottomSheetView
          style={[styles.sheetContent, { paddingBottom: 18 + insets.bottom }]}
        >
          <TouchableOpacity
            activeOpacity={0.95}
            onPress={toggleSheet}
            className="mb-2 flex-row items-center px-6 pt-2"
          >
            <Text className="flex-1 text-[18px] font-bold leading-[24px] text-[#111111]">
              {viewedCount} drivers viewed your request
            </Text>

            <View className="ml-3 flex-row items-center">
              <AvatarBubble label="AK" bgColor="#D1B7A0" offset={0} />
              <AvatarBubble label="MS" bgColor="#C3CFDB" offset={-10} />
              <View className="-ml-4 h-[40px] min-w-[40px] items-center justify-center rounded-full bg-[#F2F2F2] px-2">
                <Text className="text-[15px] font-medium text-[#616161]">
                  {extraCount}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <View
            className="h-[3px]"
            style={{ backgroundColor: isExpanded ? "#A5C43A" : "#C8FF13" }}
          />

          {isExpanded && (
            <View style={styles.expandedContent}>
              <View className="mb-4 rounded-[28px] bg-[#E4F08F] px-5 py-4">
                <View className="flex-row items-center justify-between">
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() =>
                      setFare((current) => Math.max(0, current - 500))
                    }
                    className="h-[50px] w-[50px] items-center justify-center rounded-[18px] bg-[#F1F3DE]"
                  >
                    <Ionicons name="remove" size={22} color="#707070" />
                  </TouchableOpacity>

                  <View className="mx-3 flex-1 items-center rounded-[22px] bg-white px-4 py-[14px]">
                    <Text className="text-[17px] font-bold text-[#111111]">
                      {fareLabel}
                    </Text>
                  </View>

                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => setFare((current) => current + 500)}
                    className="h-[50px] w-[50px] items-center justify-center rounded-[18px] bg-[#F1F3DE]"
                  >
                    <Ionicons name="add" size={22} color="#111111" />
                  </TouchableOpacity>
                </View>

                <Text className="mt-3 text-center text-[14px] leading-[20px] text-[#222222]">
                  Try raising your fare to get offers
                </Text>
              </View>

              <View className="mb-5 items-center justify-center rounded-[22px] bg-[#F2F2F2] py-4">
                <Text className="text-[20px] font-medium text-[#B0B0B0]">
                  Raise fare
                </Text>
              </View>

              <View className="mb-6">
                <Text className="text-[22px] font-bold text-[#111111]">
                  {fareLabel}
                </Text>

                <View className="mt-3 flex-row gap-3">
                  <View className="rounded-[13px] bg-[#D4F4FA] px-3 py-[6px]">
                    <Text className="text-[14px] font-medium text-[#111111]">
                      Parcel
                    </Text>
                  </View>
                  <View className="rounded-[13px] bg-[#F0F0F0] px-3 py-[6px]">
                    <Text className="text-[14px] font-medium text-[#111111]">
                      Cash
                    </Text>
                  </View>
                </View>

                <Text className="mt-4 text-[17px] font-bold text-[#111111]">
                  {request.scheduledLabel}
                </Text>

                <View className="mt-4 flex-row">
                  <View className="mr-4 items-center">
                    <View className="h-3 w-3 rounded-full bg-[#64A7F3]" />
                    <View className="h-[36px] w-px border-l border-dashed border-[#C5D4E3]" />
                    <View className="h-3 w-3 rounded-full bg-[#49C44B]" />
                  </View>

                  <View className="flex-1">
                    <Text className="text-[15px] leading-[21px] text-[#111111]">
                      {routeFrom}
                    </Text>
                    <Text className="mt-2 text-[15px] leading-[21px] text-[#111111]">
                      {routeTo}
                    </Text>
                  </View>
                </View>

                <View className="mt-3 flex-row items-start">
                  <Ionicons name="chatbox-outline" size={20} color="#111111" />
                  <Text className="ml-3 flex-1 text-[15px] leading-[21px] text-[#111111]">
                    {request.comments}
                  </Text>
                </View>

                <Text className="mt-4 text-[13px] text-[#7A7A7A]">
                  Published now
                </Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setShowCancelModal(true)}
                className="items-center justify-center rounded-[22px] bg-[#F3F3F3]"
                style={{ height: 68 }}
              >
                <Text className="text-[22px] font-medium text-[#E24A41]">
                  Cancel request
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </BottomSheetView>
      </BottomSheetModal>

      <Modal
        transparent
        visible={showCancelModal}
        animationType="fade"
        statusBarTranslucent
      >
        <View className="flex-1 justify-end bg-black/45">
          <Pressable
            style={StyleSheet.absoluteFillObject}
            onPress={() => setShowCancelModal(false)}
          />
          <View
            className="rounded-t-[36px] bg-white px-8 pt-6 pb-8"
            style={styles.modalCard}
          >
            <View className="mb-8 flex-row items-start justify-between">
              <Text className="mr-4 flex-1 text-[26px] font-bold leading-[32px] text-[#111111]">
                Why do you want to cancel?
              </Text>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => setShowCancelModal(false)}
                className="h-14 w-14 items-center justify-center rounded-full bg-[#F5F5F5]"
              >
                <Ionicons name="close" size={29} color="#111111" />
              </TouchableOpacity>
            </View>

            <View className="gap-4">
              {CANCEL_REASONS.map((reason) => {
                const selected = selectedReason === reason;

                return (
                  <TouchableOpacity
                    key={reason}
                    activeOpacity={0.85}
                    onPress={() => setSelectedReason(reason)}
                    className="flex-row items-center py-1"
                  >
                    <Text className="flex-1 pr-4 text-[19px] leading-[28px] text-[#111111]">
                      {reason}
                    </Text>
                    <View
                      className="h-[46px] w-[46px] rounded-[14px] border-[2px]"
                      style={{
                        backgroundColor: selected ? LIME : "white",
                        borderColor: selected ? LIME : "#D7D7D7",
                      }}
                    />
                  </TouchableOpacity>
                );
              })}

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => {
                  setShowCancelModal(false);
                  setShowOtherReasonModal(true);
                }}
                className="flex-row items-center py-1"
              >
                <Text className="flex-1 pr-4 text-[19px] leading-[28px] text-[#111111]">
                  Another reason
                </Text>
                <Ionicons name="chevron-forward" size={26} color="#111111" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setShowCancelModal(false)}
              className="mt-10 items-center justify-center rounded-[22px]"
              style={{ backgroundColor: LIME, height: 78 }}
            >
              <Text className="text-[28px] font-medium text-[#111111]">
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        transparent
        visible={showOtherReasonModal}
        animationType="fade"
        statusBarTranslucent
      >
        <View className="flex-1 justify-end bg-black/45">
          <Pressable
            style={StyleSheet.absoluteFillObject}
            onPress={() => setShowOtherReasonModal(false)}
          />
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={Platform.OS === "ios" ? 18 : 0}
          >
            <View
              className="rounded-t-[36px] bg-white px-8 pt-6 pb-8"
              style={styles.modalCard}
            >
              <View className="mb-8 flex-row items-start justify-between">
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => {
                    setShowOtherReasonModal(false);
                    setShowCancelModal(true);
                  }}
                  className="mr-3 h-14 w-14 items-center justify-center rounded-full"
                >
                  <Ionicons name="arrow-back" size={34} color="#111111" />
                </TouchableOpacity>

                <Text className="mr-3 flex-1 text-[26px] font-bold leading-[32px] text-[#111111]">
                  Give the reason for cancellation
                </Text>

                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => setShowOtherReasonModal(false)}
                  className="h-14 w-14 items-center justify-center rounded-full bg-[#F5F5F5]"
                >
                  <Ionicons name="close" size={29} color="#111111" />
                </TouchableOpacity>
              </View>

              <TextInput
                value={otherReason}
                onChangeText={setOtherReason}
                multiline
                autoFocus
                placeholder="Comments"
                placeholderTextColor="#787878"
                textAlignVertical="top"
                className="min-h-[184px] rounded-[18px] border-[2px] border-[#64A7F3] px-6 py-5 text-[18px] leading-[24px] text-[#111111]"
              />

              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setShowOtherReasonModal(false)}
                className="mt-10 items-center justify-center rounded-[22px]"
                style={{ backgroundColor: LIME, height: 78 }}
              >
                <Text className="text-[28px] font-medium text-[#111111]">
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </>
  );
}

function AvatarBubble({
  bgColor,
  label,
  offset,
}: {
  bgColor: string;
  label: string;
  offset: number;
}) {
  return (
    <View
      className="h-[40px] w-[40px] items-center justify-center rounded-full border-2 border-white"
      style={{ backgroundColor: bgColor, marginLeft: offset }}
    >
      <Text className="text-[11px] font-semibold text-[#111111]">{label}</Text>
    </View>
  );
}

function SearchingIllustration() {
  return (
    <View className="items-center justify-center">
      <Svg width={360} height={240} viewBox="0 0 360 240">
        <Path
          d="M100 60C170 35 238 34 302 54V154C245 168 178 172 114 150Z"
          fill="#C8FF13"
        />
        <Path d="M65 112L132 100V146L68 158Z" fill="#C8FF13" />
        <Path d="M246 104L318 108V158L238 156Z" fill="#C8FF13" />
        <Path d="M116 158L260 158L268 208L130 220Z" fill="#C8FF13" />

        <Rect
          x="123"
          y="74"
          width="118"
          height="75"
          rx="12"
          fill="white"
          stroke="#161616"
          strokeWidth="4"
        />
        <Rect
          x="67"
          y="110"
          width="86"
          height="54"
          rx="10"
          fill="#C8FF13"
          stroke="#161616"
          strokeWidth="3"
        />
        <Rect
          x="233"
          y="112"
          width="83"
          height="52"
          rx="10"
          fill="#C8FF13"
          stroke="#161616"
          strokeWidth="3"
        />

        <Circle
          cx="147"
          cy="112"
          r="15"
          fill="white"
          stroke="#161616"
          strokeWidth="3"
        />
        <Circle
          cx="95"
          cy="133"
          r="12"
          fill="#F7D061"
          stroke="#161616"
          strokeWidth="3"
        />
        <Circle
          cx="251"
          cy="133"
          r="12"
          fill="#F7D061"
          stroke="#161616"
          strokeWidth="3"
        />
        <Circle
          cx="176"
          cy="93"
          r="10"
          fill="#F5F5F5"
          stroke="#161616"
          strokeWidth="3"
        />

        <Path
          d="M144 112C144 106 149 101 155 101C161 101 166 106 166 112"
          stroke="#161616"
          strokeWidth="3"
          fill="none"
        />
        <Path
          d="M89 132C89 126 94 121 100 121C106 121 111 126 111 132"
          stroke="#161616"
          strokeWidth="3"
          fill="none"
        />
        <Path
          d="M245 132C245 126 250 121 256 121C262 121 267 126 267 132"
          stroke="#161616"
          strokeWidth="3"
          fill="none"
        />

        <Rect
          x="174"
          y="84"
          width="33"
          height="17"
          rx="8"
          fill="white"
          stroke="#161616"
          strokeWidth="3"
        />
        <SvgText x="180" y="96" fontSize="9" fontWeight="700" fill="#161616">
          5,0
        </SvgText>
        <SvgText x="86" y="126" fontSize="8" fontWeight="700" fill="#161616">
          4,9
        </SvgText>
        <SvgText x="242" y="126" fontSize="8" fontWeight="700" fill="#161616">
          4,8
        </SvgText>

        <Path
          d="M212 93H226L232 97H243"
          stroke="#161616"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <Circle cx="218" cy="98" r="3" fill="#161616" />
        <Circle cx="236" cy="98" r="3" fill="#161616" />
        <Path
          d="M278 129H292L298 133H309"
          stroke="#161616"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <Circle cx="284" cy="134" r="3" fill="#161616" />
        <Circle cx="302" cy="134" r="3" fill="#161616" />

        <Rect x="161" y="114" width="61" height="8" rx="4" fill="#161616" />
        <Rect x="85" y="145" width="40" height="7" rx="3.5" fill="#161616" />
        <Rect x="250" y="145" width="39" height="7" rx="3.5" fill="#161616" />

        <Path
          d="M184 186C173 170 167 158 168 149C169 141 175 139 183 146L193 158L194 114C194 107 199 103 205 104C211 105 215 110 214 117L212 153L221 148C227 145 232 149 232 156C232 162 227 168 219 172L208 178L214 210"
          fill="white"
          stroke="#161616"
          strokeWidth="5"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  expandedContent: {
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  heroIllustrationWrap: {
    transform: [{ scale: 0.72 }],
  },
  modalCard: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 12,
  },
  sheetBackground: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 38,
    borderTopRightRadius: 38,
  },
  sheetContent: {
    flex: 1,
    paddingBottom: 8,
  },
  sheetHandle: {
    backgroundColor: "#E6E6E6",
    width: 54,
    height: 6,
    borderRadius: 999,
  },
  sheetModal: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 12,
  },
  sheetShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 12,
  },
});
