import { View, Image, TextInput } from "react-native";
import { GoogleTextInputProps } from "@/types/type";

const GoogleTextInput = ({ icon, containerStyle }: GoogleTextInputProps) => {
  return (
    <View className="flex flex-row items-center px-5 bg-gray-300 rounded-lg h-10">
      <View className="justify-center items-center w-6 h-6">
        <Image source={icon} className="w-6 h-6" resizeMode={"contain"} />
      </View>
      <TextInput placeholder="Weher do you want to go?" />
    </View>
  );
};

export default GoogleTextInput;
