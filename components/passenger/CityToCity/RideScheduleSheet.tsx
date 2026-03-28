import * as Haptics from "expo-haptics";
import { CalendarDays, Clock3 } from "lucide-react-native";
import React, { useCallback, useRef, useState } from "react";
import {
    DimensionValue,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { LIME } from "./types";

const ITEM_H = 54;
const VISIBLE_ROWS = 3;
const PICKER_H = ITEM_H * VISIBLE_ROWS;

function buildDates(): string[] {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const result: string[] = ["Today", "Tomorrow"];
  const now = new Date();

  for (let index = 2; index < 14; index += 1) {
    const nextDate = new Date(now);
    nextDate.setDate(now.getDate() + index);
    result.push(
      `${days[nextDate.getDay()]}, ${nextDate.getDate()} ${months[nextDate.getMonth()]}`,
    );
  }

  return result;
}

function buildTimes(): string[] {
  const result: string[] = [];

  for (let hour = 0; hour < 12; hour += 1) {
    for (let minute = 0; minute < 60; minute += 15) {
      result.push(
        `${String(hour === 0 ? 12 : hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
      );
    }
  }

  return result;
}

const DATES = buildDates();
const TIMES = buildTimes();
const MERIDIEMS = ["AM", "PM"];

function WheelColumn({
  items,
  initialIndex,
  onSelect,
  width,
}: {
  items: string[];
  initialIndex: number;
  onSelect: (index: number) => void;
  width: DimensionValue;
}) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const committedIndexRef = useRef(initialIndex);

  const resolveIndex = useCallback(
    (offsetY: number) =>
      Math.max(0, Math.min(Math.round(offsetY / ITEM_H), items.length - 1)),
    [items.length],
  );

  const commitSelection = useCallback(
    (index: number) => {
      setActiveIndex(index);

      if (committedIndexRef.current !== index) {
        committedIndexRef.current = index;
        onSelect(index);
        Haptics.selectionAsync().catch(() => undefined);
      }
    },
    [onSelect],
  );

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      setActiveIndex(resolveIndex(event.nativeEvent.contentOffset.y));
    },
    [resolveIndex],
  );

  const handleScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      commitSelection(resolveIndex(event.nativeEvent.contentOffset.y));
    },
    [commitSelection, resolveIndex],
  );

  return (
    <View
      className="relative overflow-hidden"
      style={{ height: PICKER_H, width }}
    >
      <View pointerEvents="none" style={styles.selectionBand} />

      <ScrollView
        className="z-10"
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_H}
        decelerationRate="fast"
        contentOffset={{ x: 0, y: initialIndex * ITEM_H }}
        contentContainerStyle={{ paddingVertical: ITEM_H }}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleScrollEnd}
        onScrollEndDrag={handleScrollEnd}
      >
        {items.map((item, index) => (
          <View
            key={`${item}-${index}`}
            className="items-center justify-center"
            style={{ height: ITEM_H }}
          >
            <Text
              style={
                index === activeIndex
                  ? styles.selectedWheelText
                  : styles.mutedWheelText
              }
            >
              {item}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

interface RideScheduleSheetProps {
  onSelectStart: (value: "now" | "later") => void;
  rideStart: "now" | "later";
}

export function RideScheduleSheet({
  onSelectStart,
  rideStart,
}: RideScheduleSheetProps) {
  const [dateIndex, setDateIndex] = useState(0);
  const [timeIndex, setTimeIndex] = useState(21);
  const [meridiemIndex, setMeridiemIndex] = useState(1);

  return (
    <View
      className="absolute bottom-[63px] left-0 right-0 rounded-t-[28px] bg-white"
      style={styles.panelShadow}
    >
      <View className="px-6 pt-6 pb-[22px]">
        <Text className="mb-1 text-[22px] font-bold text-[#111111]">
          When to start the ride
        </Text>

        <TouchableOpacity
          onPress={() => onSelectStart("now")}
          activeOpacity={0.85}
          className="flex-row items-center py-[18px]"
        >
          <View className="mr-[14px] w-9 items-center">
            <Clock3 size={26} color="#111111" strokeWidth={2} />
          </View>
          <Text className="flex-1 text-[20px] font-medium text-[#111111]">
            Now
          </Text>
          <View
            style={[
              styles.radioOuter,
              rideStart === "now" ? styles.radioOuterActive : undefined,
            ]}
          >
            {rideStart === "now" ? <View style={styles.radioInner} /> : null}
          </View>
        </TouchableOpacity>

        <View className="ml-[50px] h-px bg-[#EFEFEF]" />

        <TouchableOpacity
          onPress={() => onSelectStart("later")}
          activeOpacity={0.85}
          className="flex-row items-center py-[18px]"
        >
          <View className="mr-[14px] w-9 items-center">
            <CalendarDays size={26} color="#111111" strokeWidth={2} />
          </View>
          <View className="flex-1">
            <Text className="text-[20px] font-medium text-[#111111]">
              Later
            </Text>
            <Text className="mt-0.5 text-[14px] text-[#6B6B6B]">
              Select date and time
            </Text>
          </View>
          <View
            style={[
              styles.radioOuter,
              rideStart === "later" ? styles.radioOuterActive : undefined,
            ]}
          >
            {rideStart === "later" ? <View style={styles.radioInner} /> : null}
          </View>
        </TouchableOpacity>

        {rideStart === "later" ? (
          <View
            className="mt-1 mb-1 flex-row overflow-hidden border-y border-[#EFEFEF]"
            style={{ height: PICKER_H }}
          >
            <WheelColumn
              items={DATES}
              initialIndex={dateIndex}
              onSelect={setDateIndex}
              width="46%"
            />
            <WheelColumn
              items={TIMES}
              initialIndex={timeIndex}
              onSelect={setTimeIndex}
              width="30%"
            />
            <WheelColumn
              items={MERIDIEMS}
              initialIndex={meridiemIndex}
              onSelect={setMeridiemIndex}
              width="24%"
            />
          </View>
        ) : null}

        <TouchableOpacity
          activeOpacity={0.9}
          className="mt-[18px] h-[62px] items-center justify-center rounded-[18px]"
          style={{ backgroundColor: LIME }}
        >
          <Text className="text-[22px] font-medium text-[#111111]">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mutedWheelText: {
    color: "#ABABAB",
    fontSize: 20,
    fontWeight: "400",
    textAlign: "center",
  },
  panelShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 12,
  },
  radioInner: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#111111",
  },
  radioOuter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#D0D0D0",
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterActive: {
    borderColor: "#111111",
  },
  selectedWheelText: {
    color: "#111111",
    fontSize: 22,
    fontWeight: "500",
    textAlign: "center",
  },
  selectionBand: {
    position: "absolute",
    top: ITEM_H,
    left: 0,
    right: 0,
    height: ITEM_H,
    backgroundColor: "#F0F0F0",
    zIndex: 0,
  },
});
