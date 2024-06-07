import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {vw, vh} from 'react-native-viewport-units';
import {AuthContext} from '../context/AuthContext';
import {SERVER_URL, BUCKET_URL} from '@env';
import FastImage from 'react-native-fast-image';
import IconRight from 'react-native-vector-icons/AntDesign';

const ChatListScreen = ({navigation}) => {
  const [chatRooms, setChatRooms] = useState([]);
  const {authData} = useContext(AuthContext);

  async function getChatRooms() {
    try {
      const res = await fetch(
        `${SERVER_URL}/allchatrooms/${authData.userDetails?._id}?type=${authData.userType}`,
      );
      const respData = await res.json();
      setChatRooms(respData);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getChatRooms();
  }, [authData]);

  return (
    <ScrollView
      contentContainerStyle={{
        minHeight: 85 * vh,
        rowGap: 2 * vh,
        backgroundColor: '#fff',
      }}>
      <Text
        style={{fontSize: 6 * vw}}
        className="font-bold text-center text-black">
        Recent Chats
      </Text>
      <View className="flex flex-col gap-y-2 mx-2">
        {authData.userType === 'freelancer' &&
          chatRooms.length > 0 &&
          chatRooms.map((chat, i) => {
            if (chat.company) {
              return (
                <TouchableOpacity
                  className="flex flex-row justify-between items-center p-2"
                  key={i}
                  onPress={() =>
                    navigation.navigate('user-chat', {chatId: chat.messageId})
                  }>
                  <View className="flex flex-row gap-x-2">
                    <FastImage
                      source={{
                        uri: `${BUCKET_URL}${chat.company?.profilePicture}`,
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                      style={{width: 12 * vw, height: 12 * vw}}
                      className="rounded-full"
                    />
                    <View>
                      <Text
                        style={{fontSize: 5 * vw}}
                        className="font-bold text-black">
                        {chat.company.companyname}
                      </Text>
                      <Text style={{fontSize: 3.5 * vw}} className="text-black">
                        {
                          JSON.parse(chat.messages[chat.messages.length - 1])
                            .text
                        }
                      </Text>
                    </View>
                  </View>
                  <View>
                    <IconRight name="right" size={5 * vw} color="#000" />
                  </View>
                </TouchableOpacity>
              );
            } else {
              return (
                <TouchableOpacity
                  className="flex flex-row justify-between items-center p-2"
                  key={i}
                  onPress={() =>
                    navigation.navigate('user-chat', {chatId: chat.messageId})
                  }>
                  <View className="flex flex-row gap-x-2">
                    <FastImage
                      source={{
                        uri: `${BUCKET_URL}${chat.user.profilePicture}`,
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                      style={{width: 12 * vw, height: 12 * vw}}
                      className="rounded-full"
                    />
                    <View>
                      <Text
                        style={{fontSize: 5 * vw}}
                        className="font-bold text-black">
                        {chat.user?.firstname} {chat.user?.lastname}
                      </Text>
                      <Text style={{fontSize: 3.5 * vw}} className="text-black">
                        {
                          JSON.parse(chat.messages[chat.messages.length - 1])
                            .text
                        }
                      </Text>
                    </View>
                  </View>
                  <View>
                    <IconRight name="right" size={5 * vw} color="#000" />
                  </View>
                </TouchableOpacity>
              );
            }
          })}

        {authData.userType === 'user' &&
          chatRooms.length > 0 &&
          chatRooms.map((chat, i) => (
            <TouchableOpacity
              className="flex flex-row justify-between items-center p-2"
              key={i}
              onPress={() =>
                navigation.navigate('user-chat', {chatId: chat.messageId})
              }>
              <View className="flex flex-row gap-x-2">
                <FastImage
                  source={{
                    uri: `${BUCKET_URL}${chat.freelancer?.profilePicture}`,
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                  style={{width: 12 * vw, height: 12 * vw}}
                  className="rounded-full"
                />
                <View>
                  <Text
                    style={{fontSize: 5 * vw}}
                    className="font-bold text-black">
                    {chat.freelancer?.firstname} {chat.freelancer?.lastname}
                  </Text>
                  <Text style={{fontSize: 3.5 * vw}} className="text-black">
                    {JSON.parse(chat.messages[chat.messages.length - 1]).text}
                  </Text>
                </View>
              </View>
              <View>
                <IconRight name="right" size={5 * vw} color="#000" />
              </View>
            </TouchableOpacity>
          ))}

        {authData.userType === 'company' &&
          chatRooms.length > 0 &&
          chatRooms.map((chat, i) => (
            <TouchableOpacity
              className="flex flex-row justify-between items-center p-2"
              key={i}
              onPress={() =>
                navigation.navigate('user-chat', {chatId: chat.messageId})
              }>
              <View className="flex flex-row gap-x-2">
                <FastImage
                  source={{
                    uri: `${BUCKET_URL}${chat.freelancer?.profilePicture}`,
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                  style={{width: 12 * vw, height: 12 * vw}}
                  className="rounded-full"
                />
                <View>
                  <Text
                    style={{fontSize: 5 * vw}}
                    className="font-bold text-black">
                    {chat.freelancer?.firstname} {chat.freelancer?.lastname}
                  </Text>
                  <Text style={{fontSize: 3.5 * vw}} className="text-black">
                    {JSON.parse(chat.messages[chat.messages.length - 1]).text}
                  </Text>
                </View>
              </View>
              <View>
                <IconRight name="right" size={5 * vw} color="#000" />
              </View>
            </TouchableOpacity>
          ))}
      </View>
    </ScrollView>
  );
};

export default ChatListScreen;

const styles = StyleSheet.create({});
