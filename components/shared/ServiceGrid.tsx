import { Text, TouchableOpacity, View } from "react-native";

const SERVICES = [
  {
    id: "city",
    title: "City rides",
    img: require("../../../assets/images/car.png"),
  },
  {
    id: "delivery",
    title: "Couriers",
    img: require("../../../assets/images/box.png"),
  },
  // ... add more
];

export const ServiceGrid = () => {
  return (
    <View className="flex-row flex-wrap justify-between px-4 mt-2">
      {SERVICES.map((item) => (
        <TouchableOpacity
          key={item.id}
          className="w-[48%] bg-gray-50 h-36 rounded-3xl p-4 mb-4 justify-between"
        >
          <Text className="font-bold text-gray-800 text-lg">{item.title}</Text>
          {/* <Image
            source={item.img}
            className="w-20 h-16 self-end"
            resizeMode="contain"
          /> */}
        </TouchableOpacity>
      ))}
    </View>
  );
};
