import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { CloseButton } from "./CloseButton";

interface PaymentMethodSheetProps {
  visible: boolean;
  onClose: () => void;
}

interface PaymentOption {
  id: string;
  label: string;
  emoji: string;
}

interface PaymentMethodGroup {
  section: string;
  sub: string;
  options: PaymentOption[];
}

export function PaymentMethodSheet({
  visible,
  onClose,
}: PaymentMethodSheetProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = React.useMemo(() => [350], []);

  useEffect(() => {
    if (visible) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [visible]);

  const methods: PaymentMethodGroup[] = [
    {
      section: "Money Transfer",
      sub: "Pay via your banking app",
      options: [
        { id: "easypaisa", label: "EasyPaisa", emoji: "💳" },
        { id: "jazzcash", label: "JazzCash", emoji: "💳" },
      ],
    },
    {
      section: "Other",
      sub: "",
      options: [{ id: "cash", label: "Cash", emoji: "💵" }],
    },
  ];

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        onDismiss={onClose}
        enablePanDownToClose={true}
      >
        <BottomSheetView className="flex-1 px-6 pt-5 pb-12">
          {/* Handle */}
          <View className="items-center mb-4">
            <View className="w-10 h-1 bg-gray-300 rounded-full" />
          </View>

          {/* Close */}
          <View className="items-end mb-4">
            <CloseButton onPress={onClose} />
          </View>

          <Text className="text-[24px] font-black text-gray-900 mb-6">
            Choose a payment method
          </Text>

          {methods.map((group) => (
            <View key={group.section} className="mb-5">
              <Text className="text-[17px] font-black text-gray-900 mb-0.5">
                {group.section}
              </Text>
              {group.sub ? (
                <Text className="text-[13px] text-gray-500 mb-3">
                  {group.sub}
                </Text>
              ) : null}
              {group.options.map((opt) => (
                <TouchableOpacity
                  key={opt.id}
                  onPress={() => {
                    setSelected(opt.id);
                    setTimeout(onClose, 300);
                  }}
                  activeOpacity={0.75}
                  className="flex-row items-center py-4 border-b border-gray-100"
                >
                  <Text className="text-2xl mr-4">{opt.emoji}</Text>
                  <Text className="flex-1 text-[15px] font-semibold text-gray-800">
                    {opt.label}
                  </Text>
                  {/* Radio */}
                  <View
                    className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                      selected === opt.id
                        ? "border-green-600"
                        : "border-gray-300"
                    }`}
                  >
                    {selected === opt.id && (
                      <View className="w-3 h-3 rounded-full bg-green-600" />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
