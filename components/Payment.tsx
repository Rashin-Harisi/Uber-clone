import CustomButton from "@/components/CustomButton";
import { PaymentSheetError, useStripe } from "@stripe/stripe-react-native";
import { Alert, Image, Text, View } from "react-native";
import { useState } from "react";
import { fetchApi } from "@/lib/fetch";
import { PaymentProps } from "@/types/type";
import { useDriverStore, useLocationStore } from "@/store";
import { useAuth } from "@clerk/clerk-expo";
import { ReactNativeModal } from "react-native-modal";
import { images } from "@/constants";
import { router } from "expo-router";

const Payment = ({
  fullName,
  email,
  amount,
  driverId,
  rideTime,
}: PaymentProps) => {
  const [success, setSuccess] = useState<boolean>(false);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const {
    userAddress,
    destinationAddress,
    userLatitude,
    userLongitude,
    destinationLongitude,
    destinationLatitude,
  } = useLocationStore();
  const { userId } = useAuth();
  // const { drivers } = useDriverStore();
  //const driver = drivers.filter((driver) => driver.id === driverId);
  //console.log("drivers", drivers);
  //console.log("driver", driver);

  const openPaymentSheet = async () => {
    await initializePaymentSheet();
    const { error } = await presentPaymentSheet();
    if (error) {
      Alert.alert(`Error code :${error.code}`, error.message);
    } else {
      setSuccess(true);
    }
  };

  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Ryde Inc.",
      intentConfiguration: {
        mode: {
          amount: parseInt(amount) * 100,
          currencyCode: "USD",
        },
        confirmHandler: async (paymentMethod, _, intentCreationCallback) => {
          //console.log("PaymentMethod", paymentMethod);
          const { paymentIntent, customer } = await fetchApi(
            "/(api)/(stripe)/create",
            {
              method: "POST",
              body: JSON.stringify({
                name: fullName || email.split("@")[0],
                email: email,
                amount: amount,
                paymentMethod: paymentMethod.id,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            },
          );
          //console.log("paymentIntent", paymentIntent);
          if (paymentIntent.client_secret) {
            const { result } = await fetchApi("/(api)/(stripe)/pay", {
              method: "POST",
              body: JSON.stringify({
                customer_id: customer,
                payment_method_id: paymentMethod.id,
                payment_intent_id: paymentIntent.id,
                client_secret: paymentIntent.client_secret,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            });

            if (result.client_secret) {
              await fetchApi("/(api)/ride/create", {
                method: "POST",
                body: JSON.stringify({
                  origin_address: userAddress,
                  destination_address: destinationAddress,
                  origin_latitude: userLatitude,
                  origin_longitude: userLongitude,
                  destination_latitude: destinationLatitude,
                  destination_longitude: destinationLongitude,
                  ride_time: rideTime.toFixed(0),
                  fare_price: parseInt(amount) * 100,
                  payment_status: "paid",
                  driver_id: driverId,
                  user_id: userId,
                  //created_at: () => new Date(),
                  //driver: driver,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              });
              intentCreationCallback({
                clientSecret: result.client_secret,
              });
            }
          }
        },
      },
      returnURL: "myapp://book-ride",
    });
    if (error) {
      console.log(error);
    }
  };

  return (
    <>
      <CustomButton
        title={"Confirm Ride"}
        className="my-10"
        onPress={openPaymentSheet}
      />
      <ReactNativeModal
        isVisible={success}
        onBackdropPress={() => setSuccess(false)}
      >
        <View className="flex flex-col items-center justify-center bg-white p-7 rounded-2xl">
          <Image source={images.check} className="w-28 h-28 mt-5" />

          <Text className="text-2xl text-center font-JakartaBold mt-5">
            Booking placed successfully
          </Text>

          <Text className="text-md text-general-200 font-JakartaRegular text-center mt-3">
            Thank you for your booking. Your reservation has been successfully
            placed. Please proceed with your trip.
          </Text>

          <CustomButton
            title="Back Home"
            onPress={() => {
              setSuccess(false);
              router.push("/(root)/(tabs)/home");
            }}
            className="mt-5"
          />
        </View>
      </ReactNativeModal>
    </>
  );
};

export default Payment;
