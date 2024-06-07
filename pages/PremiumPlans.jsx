import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import {vw, vh} from 'react-native-viewport-units';
import FastImage from 'react-native-fast-image';
import Iconleft from 'react-native-vector-icons/Entypo';
import RazorpayCheckout from 'react-native-razorpay';
import {AuthContext} from '../context/AuthContext';
import {SERVER_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PremiumPlans = ({navigation}) => {
  const {authData} = useContext(AuthContext);

  const hadelBuyPremium = async amount => {
    try {
      const razorPay = await RazorpayCheckout.open({
        description: `Fipezo Premium Pack @${amount} for 1 month`,
        image: 'https://fipezo.com/favi.png',
        currency: 'INR',
        key: 'rzp_live_p6yzHSiRLoRqkh', // Your api key
        amount: `${amount * 100}`,
        name: 'Fipezo',
        prefill: {
          contact: authData.userDetails.phone,
          name: authData.userDetails.firstname + authData.userDetails.lastname,
        },
        theme: {color: '#f71942'},
      });
      console.log(`Success: ${razorPay.razorpay_payment_id}`);
      const d = new Date();
      const date = d.setDate(d.getDate() + 30);
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${SERVER_URL}/payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          paymentPack: `${amount}`,
          transactionId: razorPay.razorpay_payment_id,
          startDate: new Date().toISOString(),
          endDate: new Date(date).toISOString(),
        }),
      });
      const message = await res.json();
      navigation.navigate('freelancer-profile', {
        uid: authData.userDetails.uid,
      });
    } catch (error) {
      console.error(error);
      console.error(`Error: ${error.code} | ${error.description}`);
      alert(`Error: ${error.code} | ${error.description}`);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        minHeight: 100 * vh,
        rowGap: 5 * vh,
        alignItems: 'center',
        backgroundColor: '#000',
      }}>
      <TouchableOpacity
        className="self-start mt-4 mx-2"
        onPress={() => navigation.goBack()}>
        <Iconleft name="chevron-left" size={30} color="#fff" />
      </TouchableOpacity>
      <View className="flex flex-col items-center gap-y-4 mx-4">
        <Text style={{fontSize: 5.5 * vw}} className="text-white font-bold">
          Now increase your PROFIT by 10X
        </Text>
        <Text
          style={{fontSize: 5.5 * vw}}
          className="text-white font-bold text-center leading-7">
          Post unlimited photos, get featured tag, assure leads
        </Text>
      </View>
      <View className="flex flex-row items-center justify-between gap-x-4">
        <View className="flex flex-col items-start px-4 py-2 rounded-xl gap-y-3 border border-neutral-300">
          <Text
            style={{fontSize: 4.7 * vw}}
            className="text-white font-semibold">
            1 month plan
          </Text>
          <Text className="w-full border-b h-1 border-dotted border-neutral-400"></Text>
          <Text
            style={{fontSize: 4.7 * vw}}
            className="text-white font-semibold">
            ₹99
          </Text>
          <View className="flex flex-row items-center gap-x-2">
            <Text
              className="line-through text-white font-semibold"
              style={{fontSize: 4.7 * vw}}>
              ₹140
            </Text>
            <Text
              style={{fontSize: 3.5 * vw}}
              className="text-white font-semibold bg-yellow-500 px-2 rounded">
              Save 40%
            </Text>
          </View>
          <TouchableOpacity
            className="bg-orange-500 self-center px-2 py-1 rounded-lg"
            onPress={() => hadelBuyPremium(99)}>
            <Text
              style={{fontSize: 4.7 * vw}}
              className="text-white capitalize font-semibold">
              buy now
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex flex-col items-start px-4 py-2 rounded-xl gap-y-3 border border-neutral-300">
          <Text
            style={{fontSize: 4.7 * vw}}
            className="text-white font-semibold">
            1 month plan
          </Text>
          <Text className="w-full border-b h-1 border-dotted border-neutral-400"></Text>
          <Text
            style={{fontSize: 4.7 * vw}}
            className="text-white font-semibold">
            ₹499
          </Text>
          <View className="flex flex-row items-center gap-x-2">
            <Text
              className="line-through text-white font-semibold"
              style={{fontSize: 4.7 * vw}}>
              ₹700
            </Text>
            <Text
              style={{fontSize: 3.5 * vw}}
              className="text-white font-semibold bg-yellow-500 px-2 rounded">
              Save 40%
            </Text>
          </View>
          <TouchableOpacity
            className="bg-orange-500 self-center px-2 py-1 rounded-lg"
            onPress={() => hadelBuyPremium(499)}>
            <Text
              style={{fontSize: 4.7 * vw}}
              className="text-white capitalize font-semibold">
              buy now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex flex-col items-center mx-8 gap-y-4">
        <Text
          style={{fontSize: 5.5 * vw}}
          className="text-white font-bold text-center leading-7">
          Now enjoy premium benefits for your professional profile
        </Text>
        <View className="flex flex-col items-start justify-center mx-4 border border-neutral-300 px-4 py-1 rounded-xl">
          <View className="flex flex-row items-center gap-x-4">
            <FastImage
              source={require('../assets/unlimited-upload.png')}
              resizeMode={FastImage.resizeMode.contain}
              style={{width: 10 * vw, height: 10 * vh}}
            />
            <Text
              style={{fontSize: 5 * vw}}
              className="font-semibold text-white">
              Unlimited portfolio photos or videos upload
            </Text>
          </View>
          <View className="flex flex-row items-center gap-x-4">
            <FastImage
              source={require('../assets/extra-visiblity.png')}
              resizeMode={FastImage.resizeMode.contain}
              style={{width: 10 * vw, height: 10 * vh}}
            />
            <Text
              style={{fontSize: 5 * vw}}
              className="font-semibold text-white">
              Extra visibility all over website
            </Text>
          </View>
          <View className="flex flex-row items-center gap-x-4">
            <FastImage
              source={require('../assets/notification-bell.png')}
              resizeMode={FastImage.resizeMode.contain}
              style={{width: 10 * vw, height: 10 * vh}}
            />
            <Text
              style={{fontSize: 5 * vw}}
              className="font-semibold text-white">
              Smart priority notification for all latest jobs
            </Text>
          </View>
          <View className="flex flex-row items-center gap-x-4">
            <FastImage
              source={require('../assets/unlock-all.png')}
              resizeMode={FastImage.resizeMode.contain}
              style={{width: 10 * vw, height: 10 * vh}}
            />
            <Text
              style={{fontSize: 5 * vw}}
              className="font-semibold text-white">
              Unlock premium features like featured tag, explore page top list,
              and more
            </Text>
          </View>
          <View className="flex flex-row items-center gap-x-4">
            <FastImage
              source={require('../assets/relation-manager.png')}
              resizeMode={FastImage.resizeMode.contain}
              style={{width: 10 * vw, height: 10 * vh}}
            />
            <Text
              style={{fontSize: 5 * vw}}
              className="font-semibold text-white">
              Dedicated Relationship Manager
            </Text>
          </View>
          <View className="flex flex-row items-center gap-x-4">
            <FastImage
              source={require('../assets/freelancer-assurence.png')}
              resizeMode={FastImage.resizeMode.contain}
              style={{width: 10 * vw, height: 10 * vh}}
            />
            <Text
              style={{fontSize: 5 * vw}}
              className="font-semibold text-white">
              5 lead Assured{' '}
              <Text style={{fontSize: 3 * vw}} className="text-neutral-500">
                for @499 Only
              </Text>
            </Text>
          </View>
        </View>
      </View>
      <View className="mx-4">
        <Text
          style={{fontSize: 5 * vw}}
          className="text-center text-white leading-7">
          For any queries, reach out to us at +91 90385 78787 or help@fipezo.com
          available from Mon-Sat, 10:30 AM to 6:30 PM.
        </Text>
      </View>
    </ScrollView>
  );
};

export default PremiumPlans;

const styles = StyleSheet.create({});
