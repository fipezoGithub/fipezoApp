import {Animated, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import {vw, vh} from 'react-native-viewport-units';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SERVER_URL} from '@env';
import {useIsFocused} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const HireRequest = ({navigation}) => {
  const [hireLists, setHireLists] = useState([]);

  const isFocused = useIsFocused();

  const hideAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(hideAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(hideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  async function getHireList() {
    try {
      const token = await AsyncStorage.getItem('token');
      const resp = await fetch(`${SERVER_URL}/hire/premium/user`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const res = await resp.json();
      setHireLists(res);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getHireList();
  }, []);

  if (isFocused) {
    fadeIn();
  } else {
    fadeOut();
  }

  return (
    <ScrollView contentContainerStyle={{rowGap: 5 * vw, alignItems: 'center'}}>
      <View style={{paddingTop: 2 * vh}}>
        <Text
          className="text-black font-semibold capitalize"
          style={{fontSize: 8 * vw}}>
          my hirings
        </Text>
      </View>
      <View className="flex flex-row flex-wrap items-center justify-center gap-4 mx-2">
        {hireLists.length > 0 &&
          hireLists.map((item, index) => (
            <View
              className="flex gap-y-2 mx-4 border border-neutral-400 px-4 py-2 rounded-md bg-white"
              key={index}
              style={{minWidth: 88 * vw, elevation: 5}}>
              <Text
                style={{fontSize: 5 * vw}}
                className="font-medium text-black">
                {item.hired_freelancer.firstname
                  .split('_')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ') +
                  ' ' +
                  item.hired_freelancer.lastname
                    .split('_')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}
                {' - '}
                {item.hired_freelancer.profession
                  .split('_')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
              </Text>
              <Text
                className="capitalize self-start italic rounded-tl-2xl rounded-br-2xl rounded-tr-xl rounded-bl-xl bg-neutral-500 px-4 py-1 text-white"
                style={{fontSize: 4.5 * vw}}>
                {item.status}
              </Text>
              <Text
                style={{fontSize: 5 * vw}}
                className="font-medium text-black border border-neutral-400 px-2 py-1">
                Phone: {item.phone}
              </Text>
              <Text
                style={{fontSize: 5 * vw}}
                className="font-medium text-black border border-neutral-400 px-2 py-1">
                Description: {item.description}
              </Text>
              <Text
                style={{fontSize: 5 * vw}}
                className="font-medium text-black border border-neutral-400 px-2 py-1">
                Address: {item.address}
              </Text>
              <Text
                style={{fontSize: 5 * vw}}
                className="font-medium text-black border border-neutral-400 px-2 py-1">
                Budget: {item.budget}
              </Text>
              <View className="flex flex-row justify-between">
                <TouchableOpacity className="px-2 py-1 rounded-lg border border-neutral-200">
                  <Text
                    className="capitalize text-slate-800 font-medium"
                    style={{fontSize: 4 * vw}}>
                    contact
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className="px-2 py-1 rounded-lg bg-black">
                  <Text
                    className="capitalize text-white font-medium"
                    style={{fontSize: 4 * vw}}>
                    cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
      </View>
    </ScrollView>
  );
};

export default HireRequest;

const styles = StyleSheet.create({});
