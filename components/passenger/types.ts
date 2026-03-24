export type Step =
  | "enter-route"
  | "select-ride"
  | "payment-method"
  | "finding-ride"
  | "higher-fare"
  | "driver-offer";

export interface RideOption {
  id: string;
  name: string;
  emoji: string;
  seats: number;
  eta: string;
  fare: string;
  tag: string;
  selected?: boolean;
}

export type PaymentMethodId = "easypaisa" | "jazzcash" | "cash";
