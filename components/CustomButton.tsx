import { TouchableOpacity, Text } from "react-native";
// eslint-disable-next-line import/namespace
import { CustomButtonProps } from "@/types/type";

const getBgVariantStyle = (variant: CustomButtonProps["bgVariant"]) => {
  switch (variant) {
    case "secondary":
      return "bg-gray-500";
    case "success":
      return "bg-green-500";
    case "danger":
      return "bg-red-500";
    case "outline":
      return "bg-transparent border-neutral-300 border-[0.5px]";
    default:
      return "bg-[#0286FF]";
  }
};
const getTextVariant = (variant: CustomButtonProps["textVariant"]) => {
  switch (variant) {
    case "primary":
      return "text-black";
    case "secondary":
      return "text-gray-100";
    case "danger":
      return "text-red-100";
    case "success":
      return "text-green-100";
    default:
      return "text-white";
  }
};
const CustomButton = ({
  title,
  onPress,
  bgVariant,
  className,
  IconLeft,
  IconRight,
  textVariant,
  ...props
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      className={`w-full rounded-full p-3 flex justify-center items-center  flex-row shadow-md shadow-neutral-400/70 ${getBgVariantStyle(bgVariant)} ${className}`}
      onPress={onPress}
      {...props}
    >
      {IconLeft && <IconLeft />}
      <Text className={`text-lg font-bold ${getTextVariant(textVariant)}`}>
        {title}
      </Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
};
export default CustomButton;
