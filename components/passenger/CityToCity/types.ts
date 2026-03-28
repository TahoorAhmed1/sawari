import { Ionicons } from "@expo/vector-icons";

export type CityStep = "main" | "select" | "schedule";

export type RideChoiceId = "private" | "shared" | "parcel";

export const LIME = "#C8FF13";

export interface RideChoice {
  id: RideChoiceId;
  title: string;
  subtitle: string;
  price: string;
  priceNote?: string;
  icon: keyof typeof Ionicons.glyphMap;
}

export const RIDE_CHOICES: RideChoice[] = [
  {
    id: "private",
    title: "Private",
    subtitle: "Only you and the driver",
    price: "≈PKR56,250",
    icon: "car-sport-outline",
  },
  {
    id: "shared",
    title: "Pay per seat",
    subtitle: "Ride with other people, you pay per seat",
    price: "≈PKR25,300",
    priceNote: "for 1 seat",
    icon: "people-outline",
  },
  {
    id: "parcel",
    title: "Send parcel",
    subtitle: "Delivery to another city",
    price: "",
    icon: "cube-outline",
  },
];
