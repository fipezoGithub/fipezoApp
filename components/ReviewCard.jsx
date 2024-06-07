import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {vw, vh} from 'react-native-viewport-units';
import Iconlike from 'react-native-vector-icons/EvilIcons';
import Iconstar from 'react-native-vector-icons/AntDesign';
import {BUCKET_URL} from '@env';

const ReviewCard = ({review}) => {
  return (
    <View className="bg-white m-4 p-4 rounded-xl" style={{elevation: 5}}>
      <View className="flex flex-row gap-x-4">
        <Image
          source={
            review.userDetails.profilePicture
              ? {uri: `${BUCKET_URL}${review.userDetails.profilePicture}`}
              : require('../assets/dp.png')
          }
          className="rounded-full"
          style={{width: 15 * vw, height: 15 * vw}}
          resizeMode="cover"
        />
        <View className="flex flex-col">
          <Text style={{fontSize: 6 * vw}} className="text-black font-bold">
            {review.userDetails.firstname + ' ' + review.userDetails.lastname}
          </Text>
          <View className="flex flex-row items-center">
            {Array.from({length: review.stars}).map((i, index) => (
              <Iconstar name="star" size={5 * vw} color="#FBBC04" key={index} />
            ))}
          </View>
        </View>
      </View>
      <View className="mt-4">
        <Text
          className="font-medium text-black capitalize mb-2"
          style={{fontSize: 5 * vw}}>
          {review.title}
        </Text>
        <Text
          className="font-medium text-neutral-700"
          style={{fontSize: 4.2 * vw}}>
          {review.review}
        </Text>
        <View className="flex flex-row items-center">
          <Iconlike size={10 * vw} name="like" color="#3B82F6" />
          <Text style={{fontSize: 5 * vw}}>{review.likeduser.length}</Text>
        </View>
      </View>
    </View>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({});
