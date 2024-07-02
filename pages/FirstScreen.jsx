import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {vw} from 'react-native-viewport-units';

const FirstScreen = ({navigation}) => {
  const scroll = useRef();
  const [currentPage, setCurrentPage] = useState(0);

  const setNewUser = async () => {
    try {
      await AsyncStorage.setItem('newUser', 'true');
      navigation.navigate('Explore');
    } catch (error) {
      console.log(error);
    }
  };

  const handleScroll = event => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / (100 * vw));
    setCurrentPage(currentIndex);
  };

  const slideToNext = () => {
    const nextIndex = currentPage + 1 < 3 ? currentPage + 1 : 0;
    scroll.current.scrollTo({x: nextIndex * (100 * vw), animated: true});
  };

  return (
    <View
      className="gap-y-6 py-8 items-start justify-around bg-black"
      style={{flex: 1}}>
      <Text className="text-3xl font-bold text-white ml-4">Fipezo</Text>
      <View className="flex-1 items-center justify-center">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          alwaysBounceHorizontal={true}
          scrollEnabled={false}
          pagingEnabled
          scrollEventThrottle={16}
          onScroll={handleScroll}
          ref={scroll}>
          <View
            className="flex flex-col items-center justify-center gap-y-2"
            style={{width: 100 * vw}}>
            <Image
              source={require('../assets/client-img.png')}
              style={{resizeMode: 'contain'}}
              className="w-80 h-60 mb-4"
            />
            <Text className="text-2xl font-bold text-white mx-4">
              What can you expect as a client?
            </Text>
            <Text className="text-xl text-white mx-4">
              Hire freelancer for your events
            </Text>
            <Text className="text-xl text-center text-white mx-4">
              All freelancers are verified, so no worries of getting fraud
            </Text>
          </View>
          <View
            className="flex flex-col items-center justify-center gap-y-2"
            style={{width: 100 * vw}}>
            <Image
              source={require('../assets/freelancer-img.png')}
              style={{resizeMode: 'contain'}}
              className="w-80 h-60 mb-4"
            />
            <Text className="text-2xl font-bold text-center text-white mx-4">
              What can you expect as a freelancer?
            </Text>
            <Text className="text-xl text-white mx-4">
              3x Increase your earnings
            </Text>
            <Text className="text-xl text-white mx-4">Showcase your works</Text>
            <Text className="text-xl text-white mx-4">
              Get projects from clients or Companies
            </Text>
          </View>
          <View
            className="flex flex-col items-center justify-center gap-y-2"
            style={{width: 100 * vw}}>
            <Image
              source={require('../assets/company-img.png')}
              style={{resizeMode: 'contain'}}
              className="w-80 h-60 mb-4"
            />
            <Text className="text-2xl font-bold text-center text-white mx-4">
              What can you expect as a company?
            </Text>
            <Text className="text-xl text-white mx-4">
              Verified freelancers
            </Text>
            <Text className="text-xl text-white mx-4">
              Can chose category based on requirements
            </Text>
          </View>
        </ScrollView>
      </View>
      <View className="self-end flex flex-row items-center justify-between w-full">
        <View className="flex flex-row items-center gap-2 ml-4">
          <View
            className={
              'inline h-2 rounded-full' +
              (currentPage === 0 ? ' w-6 bg-orange-500' : ' w-2 bg-neutral-500')
            }></View>
          <View
            className={
              'inline h-2 rounded-full' +
              (currentPage === 1 ? ' w-6 bg-orange-500' : ' w-2 bg-neutral-500')
            }></View>
          <View
            className={
              'inline h-2 rounded-full' +
              (currentPage === 2 ? ' w-6 bg-orange-500' : ' w-2 bg-neutral-500')
            }></View>
        </View>
        {currentPage < 2 ? (
          <TouchableOpacity
            className="flex flex-row items-center bg-[#75bc7b] px-4 py-1 rounded-3xl gap-x-4 mr-4"
            onPress={slideToNext}>
            <Text className="text-2xl text-white capitalize">next</Text>
            <Text className="bg-white rounded-full p-1">
              <Icon name="right" size={16} color="#000000" />
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={setNewUser}
            className="flex flex-row items-center bg-[#75bc7b] px-2 py-1 rounded-3xl gap-x-2 mr-4">
            <Text className="text-xl bg-[#75bc7b] text-white px-4 py-2 rounded-3xl capitalize">
              Get Started
            </Text>
            <Text className="bg-white rounded-full p-1">
              <Icon name="right" size={16} color="#000000" />
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FirstScreen;

const styles = StyleSheet.create({});
