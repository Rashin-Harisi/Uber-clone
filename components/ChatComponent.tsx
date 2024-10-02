import { View, Text } from "react-native";
import { useUser } from "@clerk/clerk-expo";

const ChatComponent = ({ item }: { item?: any }) => {
  const { user } = useUser();
  const userEmail = user?.emailAddresses[0].emailAddress;
  const avatar = userEmail?.split("@")[0][0].toUpperCase();
  const useId = user?.emailAddresses[0].id;

  return (
    <>
      <View
        className={` flex flex-row items-center gap-2 w-fit px-4 my-3 pt-3`}
      >
        {item?.user?.name !== "Admin" && (
          <Text
            className={` text-white  bg-neutral-700 w-[45px] h-[45px] text-center rounded-full pt-3`}
          >
            {avatar}
          </Text>
        )}

        <Text
          className={`${
            item?.user?.name === "Admin"
              ? "text-blue-700 bg-blue-300"
              : "text-black-500 bg-neutral-300 "
          } w-fit h-[50px] pt-3 px-3`}
        >
          {item?.text || "Chat component"}
        </Text>
      </View>
    </>
  );
};
export default ChatComponent;
