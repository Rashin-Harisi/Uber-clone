import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import { useEffect, useState } from "react";
import ChatComponent from "@/components/ChatComponent";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";
import uuid from "react-native-uuid";
import { ChatDataProps } from "@/types/type";
//import { useUser } from "@clerk/clerk-expo";

const chatData: ChatDataProps[] = [
  {
    _id: "1",
    text: "Hi, I need help with my order.",
    createdAt: new Date(),
    user: {
      _id: "123",
      name: "User",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
  {
    _id: "2",
    text: "Hello! How can I assist you today?",
    createdAt: new Date(),
    user: {
      _id: "456",
      name: "Admin",
      avatar: "https://placeimg.com/140/140/tech",
    },
  },
  {
    _id: "3",
    text: "I haven't received a confirmation email.",
    createdAt: new Date(),
    user: {
      _id: "123",
      name: "User",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
  {
    _id: "4",
    text: "Let me check that for you. One moment, please.",
    createdAt: new Date(),
    user: {
      _id: "456",
      name: "Admin",
      avatar: "https://placeimg.com/140/140/tech",
    },
  },
  {
    _id: "5",
    text: "Thanks!",
    createdAt: new Date(),
    user: {
      _id: "123",
      name: "User",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
  {
    _id: "6",
    text: "It looks like the confirmation email was sent. Could you check your spam folder?",
    createdAt: new Date(),
    user: {
      _id: "456",
      name: "Admin",
      avatar: "https://placeimg.com/140/140/tech",
    },
  },
  {
    _id: "7",
    text: "I found it, thanks for your help!",
    createdAt: new Date(),
    user: {
      _id: "123",
      name: "User",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
  {
    _id: "8",
    text: "You're welcome! Let me know if you need anything else.",
    createdAt: new Date(),
    user: {
      _id: "456",
      name: "Admin",
      avatar: "https://placeimg.com/140/140/tech",
    },
  },
];

const Chat = () => {
  //const { user } = useUser();
  //const userEmail = user?.emailAddresses[0].emailAddress;
  //const avatar = userEmail?.split("@")[0][0].toUpperCase();
  //const useId = user?.emailAddresses[0].id;

  const [newMessage, setNewMessage] = useState<string>("");
  const data = chatData;

  const sendMessage = () => {
    Alert.alert(
      "success",
      "Your message send to admin. The support team will reach you ASAP. ",
    );
  };

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Text className="text-2xl p-5 font-JakartaBold">Chat with Admin</Text>
        <ScrollView>
          <View className="px-5">
            {data ? (
              data.map((item, index) => (
                <ChatComponent key={index} item={item} />
              ))
            ) : (
              <View className="flex-1 h-fit flex justify-center items-center">
                <Image
                  source={images.message}
                  alt="message"
                  className="w-full h-40"
                  resizeMode="contain"
                />
                <Text className="text-3xl font-JakartaBold mt-3">
                  No Messages Yet
                </Text>
                <Text className="text-base mt-2 text-center px-7">
                  Start a conversation with your friends and family
                </Text>
                <CustomButton
                  title="Start a chat"
                  className="mt-5"
                  // @ts-ignore
                  onPress={() => router.push("/(root)/chat-screen")}
                />
              </View>
            )}
          </View>
        </ScrollView>

        {data && (
          <View className="flex flex-row justify-end items-center gap-2 px-5 mt-10 mb-36">
            <TextInput
              placeholder="Type Here"
              value={newMessage}
              onChangeText={(e) => setNewMessage(e)}
              className="h-[50px] min-w-[300px] bg-neutral-300 rounded-lg px-3 "
            />

            <TouchableOpacity onPress={sendMessage}>
              <View className="rounded-full bg-primary-400 w-10 h-10 flex justify-center items-center">
                <Icon name="send" size={15} color="#364573" />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;
