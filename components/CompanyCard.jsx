import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {vw, vh} from 'react-native-viewport-units';
import Iconlocation from 'react-native-vector-icons/FontAwesome6';
import React from 'react';
import {BUCKET_URL} from '@env';
import Iconverified from 'react-native-vector-icons/MaterialIcons';

const CompanyCard = ({company, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('company-profile', {uid: company.uid})}
      className="flex flex-col items-center justify-center my-4 mx-4 bg-white rounded-lg"
      style={{elevation: 5, width: 90 * vw}}>
      <View
        className="flex items-center justify-center relative"
        style={{aspectRatio: 1 * 2.37, width: 25 * vw, height: 18 * vh}}>
        <Image
          source={{uri: `${BUCKET_URL}${company.coverPicture}`}}
          style={{width: '100%', height: '100%'}}
          borderTopLeftRadius={10}
          borderTopRightRadius={10}
          resizeMode="cover"
        />
        <View className="absolute -bottom-8 left-5 z-10">
          <Image
            source={{uri: `${BUCKET_URL}${company.profilePicture}`}}
            className="w-20 h-20 overflow-hidden rounded-full"
            resizeMode="contain"
          />
        </View>
      </View>
      <View className="flex flex-col items-stretch gap-y-4 rounded-b-md mx-4 my-4">
        <View className="flex flex-row items-center gap-x-1">
          <Text
            className="text-2xl capitalize font-bold text-black"
            style={{maxWidth: 75 * vw}}
            numberOfLines={1}
            ellipsizeMode="tail">
            {company.companyname}
          </Text>
          <Iconverified name="verified" size={6 * vw} color="#2c96ea" />
        </View>
        <Text className="text-lg text-black">
          {company.bio?.slice(0, 150)} {company.bio?.length > 150 && ' ...'}
        </Text>
        <View className="flex flex-row gap-x-4">
          <Text className="text-lg capitalize text-neutral-800 bg-teal-400 rounded-lg px-2 py-0.5">
            {company.companytype} company
          </Text>
          <View className="flex flex-row items-center gap-x-1 bg-orange-500 rounded-lg px-2 py-0.5">
            <Iconlocation name="location-dot" size={15} color="#fff" />
            <Text className="text-lg text-neutral-100">
              {JSON.parse(company.companyaddress).city}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CompanyCard;

const styles = StyleSheet.create({});
