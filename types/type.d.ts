import { TextInputProps, TouchableOpacityProps } from "react-native";
import React from "react";
import { QuickReplies } from "react-native-gifted-chat";

declare interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  bgVariant?: "success" | "danger" | "secondary" | "outline";
  textVariant?: "success" | "danger" | "secondary" | "default" | "primary";
  className?: string;
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
}

declare interface CustomInputProps extends TextInputProps {
  title: string;
  icon?: any;
  iconStyle?: string;
  className?: string;
  inputStyle?: string;
  containerStyle?: string;
  titleStyle?: string;
  secureTextEntry?: boolean;
}

declare interface Ride {
  ride_id: string;
  origin_address: string;
  destination_address: string;
  origin_latitude: string;
  origin_longitude: string;
  destination_latitude: string;
  destination_longitude: string;
  ride_time: number;
  fare_price: string;
  payment_status: string;
  driver_id: number;
  user_id: string;
  created_at: string;
  driver: {
    driver_id: string;
    first_name: string;
    last_name: string;
    profile_image_url: string;
    car_image_url: string;
    car_seats: number;
    rating: string;
  };
}

declare interface GoogleTextInputProps {
  icon?: sting;
  containerStyle: string;
  initialLocation?: stirng;
  textInputBackgroundColor?: string;
  handlePress: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
}

declare interface LocationStoreProps {
  userLatitude: number | null;
  userLongitude: number | null;
  userAddress: string | null;
  destinationLatitude: number | null;
  destinationLongitude: number | null;
  destinationAddress: string | null;
  setUserLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
  setDestinationLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
}

declare interface Driver {
  driver_id: number;
  first_name: string;
  last_name: string;
  profile_image_url: string;
  car_image_url: string;
  car_seats: number;
  rating: number;
}

declare interface MarkerData {
  latitude: number;
  longitude: number;
  id?: number;
  title: string;
  profile_image_url: string;
  car_image_url: string;
  car_seats: number;
  rating: number;
  first_name: string;
  last_name: string;
  time?: number;
  price?: string;
}

declare interface DriverStoreProps {
  drivers: MerkerData[];
  selectedDriver: number | null;
  setSelectedDriver: (driverId: number) => void;
  setDrivers: (drivers: MarkerData[]) => void;
  clearSelectedDriver: () => void;
}

declare interface DriverCardProps {
  item: MarkerData;
  selectedDriver: number;
  setSelectedDriver: () => void;
}

declare interface PaymentProps {
  fullName: string;
  email: string;
  amount: string;
  driverId: number;
  rideTime: number;
}

declare module "react-native-vector-icons/ FontAwesome";

declare interface ChatDataProps {
  _id: string;
  text: string;
  createdAt: Date;
  user: {
    _id: string;
    name: "User" | "Admin";
    avatar: string;
  };
}
