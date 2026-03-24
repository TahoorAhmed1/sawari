import type { RideOption } from "./types";

export const LIME = "#C8F000";

export const RIDE_OPTIONS: RideOption[] = [
  {
    id: "moto",
    name: "Moto",
    emoji: "🏍️",
    seats: 1,
    eta: "3 min",
    fare: "PKR235",
    tag: "No traffic, lower prices",
    selected: true,
  },
  {
    id: "mini",
    name: "Mini",
    emoji: "🚗",
    seats: 4,
    eta: "3 min",
    fare: "~PKR280",
    tag: "Lower fares, no AC",
  },
  {
    id: "rickshaw",
    name: "Rickshaw",
    emoji: "🛺",
    seats: 3,
    eta: "2 min",
    fare: "~PKR241",
    tag: "Lower fares",
  },
  {
    id: "rideac",
    name: "Ride A/C",
    emoji: "❄️🚗",
    seats: 4,
    eta: "3 min",
    fare: "~PKR324",
    tag: "Cars with AC",
  },
  {
    id: "premium",
    name: "Premium",
    emoji: "🚙",
    seats: 4,
    eta: "3 min",
    fare: "~PKR476",
    tag: "Sedans with AC",
  },
  {
    id: "couriers",
    name: "Couriers",
    emoji: "📦🛵",
    seats: 0,
    eta: "",
    fare: "",
    tag: "Request package delivery",
  },
];

