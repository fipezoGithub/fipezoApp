import {
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {vw, vh} from 'react-native-viewport-units';
import {SERVER_URL} from '@env';
import {AuthContext} from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyReferal = ({navigation}) => {
  const [referDetails, setReferDetails] = useState({});
  
  const onShare = async msg => {
    try {
      const result = await Share.share(
        {
          message: 'https://fipezo.com/register/freelancer',
          url: 'https://fipezo.com',
        },
        {dialogTitle: msg},
      );
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error);
    }
  };

  const {authData} = useContext(AuthContext);

  async function getReferDetails() {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${SERVER_URL}/getrefer/${authData.userType}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      });
      const referalCode = await res.json();
      setReferDetails(referalCode);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getReferDetails();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        minHeight: 100 * vh,
        maxWidth: 100 * vw,
        backgroundColor: '#ffffff',
        paddingTop: 8 * vh,
        rowGap: 4 * vw,
      }}>
      <View className="flex items-center gap-y-3">
        <FastImage
          source={require('../assets/refer-friend.jpg')}
          resizeMode={FastImage.resizeMode.contain}
          style={{width: 75 * vw, height: 25 * vh}}
        />
        <Text
          className="text-black font-bold text-center"
          style={{fontSize: 6 * vw}}>
          Invite your freelancer friend to Fipezo and earn ₹50 rupees for every
          successful freelancer joining
        </Text>
      </View>
      <View className="flex flex-col items-center gap-y-4 mx-4">
        <Text style={{fontSize: 4 * vw}} className="text-black font-medium">
          Your referal code{' '}
        </Text>
        <Text style={{fontSize: 6 * vw}} className="text-black font-bold">
          {referDetails.referUid}
        </Text>
        <TouchableOpacity
          className="bg-orange-500 px-2 py-1 rounded-lg"
          onPress={() =>
            onShare(
              `Invite your freelancer friend to FIpezo and use the ${referDetails.referUid} when registering as a freelancer`,
            )
          }>
          <Text className="capitalize text-white" style={{fontSize: 5 * vw}}>
            invite
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-col items-center gap-y-4 mx-4">
        <Text style={{fontSize: 4.5 * vw}} className="text-black font-medium">
          Your current successful refer{' '}
        </Text>
        <Text
          style={{fontSize: 7 * vw}}
          className="bg-orange-500 px-5 py-2 rounded-full text-white font-bold">
          {referDetails?.acceptedFreelancer?.length}
        </Text>
      </View>
    </ScrollView>
  );
};

export default MyReferal;

const styles = StyleSheet.create({});
