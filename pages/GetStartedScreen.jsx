import {Image, TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {vw, vh} from 'react-native-viewport-units';

const GetStartedScreen = ({navigation}) => {
  return (
    <View className="flex-1 flex-col items-center bg-white justify-evenly">
      <View className="">
        <Image
          source={require('../assets/loginbg.png')}
          style={{maxWidth: 80 * vw, maxHeight: 40 * vh, objectFit: 'fill'}}
          resizeMode="contain"
        />
      </View>
      <View className="flex flex-col items-center gap-y-6">
        <Text className="capitalize font-bold text-4xl text-black">
          let&apos;s get started
        </Text>
        <Text className="text-lg text-center mx-4 text-black">
          Welcome to your Fipezo! Find projects, connect with clients, and build
          your freelance career with ease.
        </Text>
      </View>
      <View className="flex flex-col items-center justify-center gap-y-4 mt-6">
        <TouchableOpacity
          className="bg-violet-600 py-2 flex items-center justify-center rounded-3xl"
          style={{minWidth: 60 * vw}}
          onPress={({pressed}) => navigation.navigate('Signup')}>
          <Text className="text-white text-xl capitalize">create account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="border border-violet-600 py-2 flex items-center justify-center rounded-3xl"
          style={{minWidth: 60 * vw}}
          onPress={({pressed}) => navigation.navigate('Login')}>
          <Text className="text-violet-600 text-xl capitalize">log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GetStartedScreen;

const styles = StyleSheet.create({});
