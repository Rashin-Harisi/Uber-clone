import { ScrollView, Text, View, Image, Alert } from "react-native";
import { images, icons } from "@/constants";
import CustomInput from "@/components/CustomInput";
import { useCallback, useState } from "react";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";
import OAuth from "@/components/OAuth";

const SignIn = () => {
  const { isLoaded, signIn, setActive } = useSignIn();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const signInHandler = useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        // @ts-ignore
        router.replace("/");
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2));
        Alert.alert("Error", "Log in failed. Please try again.");
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  }, [isLoaded, form.email, form.password]);
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="w-full h-[250px] relative">
          <Image source={images.signUpCar} className=" z-0 w-full h-[250px]" />
          <Text className="absolute text-2xl text-black font-JakartaSemiBold bottom-5 left-5 ">
            Welcome 🖐
          </Text>
        </View>
        <View className="p-5">
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
            title="Sign In"
            onPress={signInHandler}
            className="mt-6"
          />
          <OAuth />
          <Link
            href="/(auth)/sign-up"
            className="text-lg text-center text-general-200 mt-10"
          >
            <Text>Don't have any account? </Text>
            <Text className="text-primary-500">Sign Up</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
