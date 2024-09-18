import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { CustomInputProps } from "@/types/type";

const CustomInput = ({
  title,
  placeholder,
  value,
  onChangeText,
  icon,
  iconStyle,
  inputStyle,
  containerStyle,
  titleStyle,
  secureTextEntry = false,
  ...props
}: CustomInputProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="w-full my-2">
          <Text className={`font-JakartaSemiBold text-lg mb-3 ${titleStyle}`}>
            {title}
          </Text>
          <View
            className={`flex flex-row justify-start items-center border border-neutral-100 rounded-full bg-neutral-100 focus:border-primary-500 ${containerStyle}`}
          >
            {icon && (
              <Image
                source={icon}
                resizeMode={"contain"}
                className={`w-6 h-6 ml-4 ${iconStyle}`}
              />
            )}
            <TextInput
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              value={value}
              onChangeText={onChangeText}
              className={` rounded-full p-4 font-JakartaSemiBold text-[15px] flex-1 text-left ${inputStyle}`}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default CustomInput;
