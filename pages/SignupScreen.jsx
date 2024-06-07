import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const SignupScreen = ({navigation}) => {
  return (
    <View className="bg-white flex flex-col items-center justify-evenly h-screen">
      <View className="flex items-center justify-center gap-y-2">
        <Text className="text-5xl font-bold text-black">Welcome</Text>
        <Text className="text-xl text-black">Create a new Account</Text>
      </View>
      <View className="flex flex-col items-center justify-center gap-y-6">
        <Text className="text-3xl text-black font-semibold">
          Tell us about yourself
        </Text>
        <View className="flex flex-col items-center justify-center w-[325] gap-4">
          <TouchableOpacity
            className="flex flex-row items-center justify-between gap-2 w-full border p-2 rounded-lg"
            onPress={() => navigation.navigate('ClientSignup')}>
            <Image
              source={require('../assets/client_register.png')}
              className="w-10 h-10"
              style={{resizeMode: 'contain'}}
            />
            <Text className="text-xl text-center text-black max-w-[250]">
              I am a client, wants to hire freelancers
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex flex-row items-center justify-between gap-2 w-full border p-2 rounded-lg"
            onPress={() => navigation.navigate('FreelancerSignup')}>
            <Image
              source={require('../assets/freelancer_register.png')}
              className="w-10 h-10"
              style={{resizeMode: 'contain'}}
            />
            <Text className="text-xl text-center text-black max-w-[250]">
              I am a freelancer, looking for work
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex flex-row items-center justify-between gap-2 w-full border p-2 rounded-lg"
            onPress={() => navigation.navigate('CompanySignup')}>
            <Image
              source={require('../assets/company_register.png')}
              className="w-10 h-10"
              style={{resizeMode: 'contain'}}
            />
            <Text className="text-xl text-center text-black max-w-[250]">
              I am a company, wants to hire freelancer
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex items-center flex-row gap-x-2">
        <Text className="text-base text-black">Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text className="text-base text-blue-600 font-bold">Log in now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({});
