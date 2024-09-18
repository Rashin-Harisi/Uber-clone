import { ScrollView, Text, View, Image, Alert } from "react-native";
import { images, icons } from "@/constants";
import CustomInput from "@/components/CustomInput";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import { ReactNativeModal } from "react-native-modal";
import OAuth from "@/components/OAuth";
import { fetchApi } from "@/lib/fetch";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModel, setShowSuccessModel] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const signupHandler = async () => {
    if (!isLoaded) {
      return;
    }
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === "complete") {
        await fetchApi("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: completeSignUp.createdSessionId,
          }),
        });
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({
          ...verification,
          state: "success",
        });
      } else {
        setVerification({
          ...verification,
          error: "Verification failed.Please try again",
          state: "failed",
        });
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: "failed",
      });
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="w-full h-[250px] relative">
          <Image source={images.signUpCar} className=" z-0 w-full h-[250px]" />
          <Text className="absolute text-2xl text-black font-JakartaSemiBold bottom-5 left-5 ">
            Create Your Account
          </Text>
        </View>
        <View className="p-5">
          <CustomInput
            title="Name"
            placeholder="Enter your name"
            value={form.name}
            onChangeText={(value: string) =>
              setForm({
                ...form,
                name: value,
              })
            }
            icon={icons.person}
          />
          <CustomInput
            title="Email"
            placeholder="Enter your email"
            textContentType={"emailAddress"}
            value={form.email}
            onChangeText={(value: string) =>
              setForm({
                ...form,
                email: value,
              })
            }
            icon={icons.email}
          />
          <CustomInput
            title="Password"
            placeholder="Enter your password"
            textContentType={"password"}
            secureTextEntry={true}
            value={form.password}
            onChangeText={(value: string) =>
              setForm({
                ...form,
                password: value,
              })
            }
            icon={icons.lock}
          />
          <CustomButton
            title="Sign Up"
            onPress={signupHandler}
            className="mt-6"
          />
          <OAuth />
          <Link
            href="/(auth)/sign-in"
            className="text-lg text-center text-general-200 mt-10"
          >
            <Text>Already have an account? </Text>
            <Text className="text-primary-500">Sign In</Text>
          </Link>
        </View>
        <ReactNativeModal
          isVisible={verification.state === "pending"}
          onModalHide={() => {
            if (verification.state === "success") {
              setShowSuccessModel(true);
            }
          }}
        >
          <View className="bg-white min-h-[300px] px-7 py-9 rounded-2xl">
            <Text className="font-JakartaExtraBold text-2xl mb-2">
              Verification
            </Text>
            <Text className="font-Jakarta mb-5">
              We've sent a verification code to {form.email}
            </Text>
            <CustomInput
              title="Code"
              value={verification.code}
              onChangeText={(value: string) =>
                setVerification({
                  ...verification,
                  code: value,
                })
              }
              icon={icons.lock}
              placeholder="12345678"
              keyboardType="numeric"
            />
            {verification.error && (
              <Text className="text-red-500 text-sm mt-1">
                {verification.error}
              </Text>
            )}
            <CustomButton
              title="Verify Email"
              onPress={onPressVerify}
              className="mt-5 bg-success-500"
            />
          </View>
        </ReactNativeModal>
        <ReactNativeModal isVisible={showSuccessModel}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className="h-[110px] w-[110px] mx-auto my-5"
            />
            <Text className="text-3xl font-JakartaBold text-center">
              Verified
            </Text>
            <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
              You have successfully verified your email
            </Text>
            <CustomButton
              title="Browes Home"
              // @ts-ignore
              onPress={() => router.push("/(root)/(tabs)//home")}
              className="mt-5"
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
