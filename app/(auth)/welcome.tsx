import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { useRef, useState } from "react";
import { onboarding } from "@/constants";
import Swiper from "react-native-swiper";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";

const Onboarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView className="h-full items-center justify-center bg-white">
      <TouchableOpacity
        className="w-full flex  items-end justify-end p-5"
        onPress={() => {
          router.replace("/(auth)/sign-up");
        }}
      >
        <Text className="text-black text-md font-JakartaBold">Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View className="w-[32px] h-[4px] rounded-full bg-[#E2E8F0]" />}
        activeDot={
          <View className="w-[32px] h-[4px] rounded-full bg-[#0286FF]" />
        }
        onIndexChanged={(index: number) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="flex items-center justify-center p-5">
            <Image
              source={item.image}
              resizeMode={"contain"}
              className="w-full h-[300px]"
            />
            <View className="flex items-center justify-center w-full mt-10">
              <Text className="text-black font-bold text-center mx-10 text-3xl">
                {item.title}
              </Text>
              <Text className="text-[#858585] text-center text-md font-JakartaSemiBold mx-10 mt-3">
                {item.description}
              </Text>
            </View>
          </View>
        ))}
      </Swiper>
      <CustomButton
        title={isLastSlide ? "Get Started" : "Next"}
        className="w-11/12 mt-10 mb-5"
        onPress={() => {
          isLastSlide
            ? router.replace("/(auth)/sign-up")
            : swiperRef.current?.scrollBy(1);
        }}
      />
    </SafeAreaView>
  );
};

export default Onboarding;
