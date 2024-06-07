import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {vw, vh} from 'react-native-viewport-units';

const HireModal = () => {
  const [otp, setOTP] = useState('');
  return (
    <Modal animationType="slide" transparent={true} visible={true}>
      <ScrollView
        // className="flex-1 flex-row items-center justify-center"
        contentContainerStyle={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          alignItems: 'center',
        }}>
        <View
          className="bg-white flex flex-col items-center gap-y-4 p-4 rounded-md"
          style={{elevation: 5, width: 85 * vw}}>
          <Text
            style={{fontSize: 6 * vw}}
            className="font-bold text-black capitalize">
            send your task
          </Text>
          <View className="flex flex-col items-start w-full gap-y-2">
            <Text
              className="text-black font-semibold capitalize"
              style={{fontSize: 4 * vw}}>
              full name
            </Text>
            <TextInput
              placeholder="Enter your name"
              className="border w-full border-neutral-500 rounded-xl px-2 py-1"
              keyboardType="default"
            />
          </View>
          <View className="flex flex-col items-start w-full gap-y-2">
            <Text
              className="text-black font-semibold capitalize"
              style={{fontSize: 4 * vw}}>
              phone
            </Text>
            <TextInput
              placeholder="Enter your phone number"
              className="border w-full border-neutral-500 rounded-xl px-2 py-1"
              keyboardType="phone-pad"
            />
          </View>
          <View className="flex flex-col items-start w-full gap-y-2">
            <Text
              className="text-black font-semibold capitalize"
              style={{fontSize: 4 * vw}}>
              address
            </Text>
            <TextInput
              placeholder="Enter work address"
              className="border w-full border-neutral-500 rounded-xl px-2 py-1"
              keyboardType="default"
            />
          </View>
          <View className="flex flex-col items-start w-full gap-y-2">
            <Text
              className="text-black font-semibold capitalize"
              style={{fontSize: 4 * vw}}>
              total budget
            </Text>
            <TextInput
              placeholder="Enter your budget"
              className="border w-full border-neutral-500 rounded-xl px-2 py-1"
              keyboardType="numeric"
            />
          </View>
          <View className="flex flex-col items-start w-full gap-y-2">
            <Text
              className="text-black font-semibold capitalize"
              style={{fontSize: 4 * vw}}>
              description
            </Text>
            <TextInput
              placeholder="Enter your budget"
              multiline={true}
              className="border w-full border-neutral-500 rounded-xl px-2 py-1 h-32"
              keyboardType="default"
              style={{textAlignVertical: 'top'}}
            />
          </View>
          <TextInput
            placeholder="Enter your 6 digit otp"
            value={otp}
            className="border w-full border-neutral-300 rounded-3xl px-2 py-1"
            keyboardType="number-pad"
            onChangeText={text => setOTP(text)}
          />
          <View className="flex flex-row items-center">
            <Text>OTP is send to +91 1234567890 . </Text>
            <Pressable className="" onPress={() => setOtpForm(false)}>
              <Text className="text-blue-500 font-bold capitalize">edit</Text>
            </Pressable>
          </View>
          <Pressable className="px-4 py-2 bg-blue-500 rounded-3xl">
            <Text className="capitalize font-semibold text-white">submit</Text>
          </Pressable>
          <Text className="text-neutral-700 self-end">12s</Text>
          <Text className="text-slate-500 font-medium">
            OTP is valid for 5 minutes
          </Text>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default HireModal;

const styles = StyleSheet.create({});
