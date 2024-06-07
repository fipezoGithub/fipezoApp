import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import Iconsend from 'react-native-vector-icons/FontAwesome';
import {vw, vh} from 'react-native-viewport-units';
import socket from '../utils/socket';
import FastImage from 'react-native-fast-image';
import {AuthContext} from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BUCKET_URL} from '@env';
import Loader from '../components/Loader';
import Iconleft from 'react-native-vector-icons/Entypo';

const ChatScreen = ({route, navigation}) => {
  const {chatId} = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState({});
  const [loading, setLoading] = useState(false);

  const chatRef = useRef();

  const {authData} = useContext(AuthContext);

  function asyncEmit(emitEventName, onEventName, socketData) {
    return new Promise(function (resolve, reject) {
      socket.emit(emitEventName, socketData);
      socket.on(onEventName, result => {
        resolve(result);
      });
      setTimeout(reject, 2500);
    });
  }

  async function getAllMessages() {
    try {
      setLoading(true);
      const receivedData = await asyncEmit('all-messages', 'messages', {
        messageId: chatId,
      });
      setMessages(receivedData.messages);
      if (
        receivedData.freelancer &&
        receivedData?.freelancer?._id !== authData?.userDetails?._id
      ) {
        setReceiver(receivedData.freelancer);
      } else if (
        receivedData.user &&
        receivedData?.user?._id !== authData?.userDetails?._id
      ) {
        setReceiver(receivedData.user);
      } else {
        setReceiver(receivedData.company);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error.message);
    }
  }

  const handleSendMessage = async () => {
    const token = await AsyncStorage.getItem('token');
    if (message.trim()) {
      socket.emit('send-message', {
        token: token,
        messageId: chatId,
        message: JSON.stringify({
          text: message,
          sender: authData.userType,
          time: new Date().toLocaleString(),
        }),
      });
      if (authData.userType === 'company') {
        if (receiver.uid && !receiver.companyname) {
          socket.emit('send-notification', {
            type: 'Message',
            headline: `You have a message from ${authData.userDetails.firstname}`,
            acceptedFreelancer: receiver._id,
            sentCompany: authData.userDetails._id,
            href: '/chats',
          });
        } else if (!receiver.uid) {
          socket.emit('send-notification', {
            type: 'Message',
            headline: `You have a message from ${authData.userDetails.firstname}`,
            acceptedUser: receiver._id,
            sentCompany: authData.userDetails._id,
            href: '/chats',
          });
        }
      } else if (authData.userType === 'user') {
        if (receiver.uid && !receiver.companyname) {
          socket.emit('send-notification', {
            type: 'Message',
            headline: `You have a message from ${authData.userDetails.firstname}`,
            acceptedFreelancer: receiver._id,
            sentUser: authData.userDetails._id,
            href: '/chats',
          });
        } else if (receiver.uid && receiver.companyname) {
          socket.emit('send-notification', {
            type: 'Message',
            headline: `You have a message from ${authData.userDetails.firstname}`,
            acceptedCompany: receiver._id,
            sentUser: authData.userDetails._id,
            href: '/chats',
          });
        }
      } else {
        if (!receiver.uid) {
          socket.emit('send-notification', {
            type: 'Message',
            headline: `You have a message from ${authData.userDetails.firstname}`,
            acceptedUser: receiver._id,
            sentFreelancer: authData.userDetails._id,
            href: '/chats',
          });
        } else if (receiver.uid && receiver.companyname) {
          socket.emit('send-notification', {
            type: 'Message',
            headline: `You have a message from ${authData.userDetails.firstname}`,
            acceptedCompany: receiver._id,
            sentFreelancer: authData.userDetails._id,
            href: '/chats',
          });
        }
      }
    }
    setMessage('');
  };

  useEffect(() => {
    getAllMessages();
  }, [authData, chatId, socket]);

  useEffect(() => {
    socket.on('messageResponse', data => {
      setMessages(data.messages);
    });
  }, [socket]);

  if (loading) {
    return <Loader />;
  }

  return (
    <View className="flex-1">
      <View className="bg-slate-200 absolute top-0 left-0 right-0 z-[999]">
        <TouchableOpacity
          className="p-2"
          onPress={() => navigation.navigate('chats')}>
          <Iconleft name="chevron-left" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      <ScrollView
        nestedScrollEnabled={true}
        ref={chatRef}
        onContentSizeChange={() =>
          chatRef.current.scrollToEnd({animated: true})
        }
        scrollEventThrottle={16}
        contentContainerStyle={{
          rowGap: 4 * vh,
          backgroundColor: '#fff',
          paddingTop: 50,
        }}>
        <View className="flex flex-row items-center gap-x-2 mx-2 my-2 bg-neutral-300 py-2 rounded-md">
          <FastImage
            source={{
              uri: `${BUCKET_URL}${receiver?.profilePicture}`,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
            style={{width: 12 * vw, height: 12 * vw}}
            className="rounded-full"
          />
          <Text
            style={{fontSize: 5 * vw}}
            className="font-semibold capitalize text-black">
            {receiver.companyname
              ? receiver.companyname
              : receiver?.firstname + ' ' + receiver?.lastname}
          </Text>
        </View>
        <View style={{marginHorizontal: 3 * vw, rowGap: 0.8 * vh}}>
          {messages.length > 0 &&
            messages.map((mes, i) => {
              const det = JSON.parse(mes);
              if (det.sender !== authData.userType) {
                return (
                  <View key={i} className="flex flex-col gap-y-2">
                    <Text className="text-lg px-4 py-2 bg-neutral-200 rounded-lg rounded-bl-none text-neutral-800">
                      {det.text}
                    </Text>
                    <Text className="text-xs text-neutral-500">{det.time}</Text>
                  </View>
                );
              } else {
                return (
                  <View key={i} className="flex flex-col self-end gap-y-2">
                    <Text className="text-lg px-4 py-2 bg-orange-500 text-white rounded-lg rounded-br-none">
                      {det.text}
                    </Text>
                    <Text className="text-xs text-neutral-500">{det.time}</Text>
                  </View>
                );
              }
            })}
        </View>
        <View
          className="flex flex-row justify-center gap-x-1 items-center"
          style={{marginHorizontal: 3 * vw}}>
          <TextInput
            placeholder="Write message"
            inputMode="text"
            value={message}
            onChangeText={text => setMessage(text)}
            className="border rounded-md border-neutral-500"
            style={{width: 80 * vw}}
          />
          <Pressable
            className="bg-orange-500 px-4 self-stretch rounded-md flex items-center justify-center"
            onPress={handleSendMessage}>
            <Iconsend name="send" size={5 * vw} color="#fff" />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
