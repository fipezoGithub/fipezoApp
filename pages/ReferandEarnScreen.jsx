import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {vw, vh} from 'react-native-viewport-units';
import FastImage from 'react-native-fast-image';
import Iconfingerprint from 'react-native-vector-icons/Entypo';
import Iconuserplus from 'react-native-vector-icons/AntDesign';
import Iconstar from 'react-native-vector-icons/Feather';
import Iconrupee from 'react-native-vector-icons/FontAwesome6';

const ReferandEarnScreen = ({navigation}) => {

  return (
    <ScrollView
      contentContainerStyle={{
        minHeight: 100 * vh,
        maxWidth: 100 * vw,
        backgroundColor: '#ffffff',
      }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          rowGap: 15,
          justifyContent: 'center',
          marginHorizontal: 15,
          paddingVertical: 15 * vw,
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
            Invite your freelancer friend to Fipezo and earn ₹50 rupees for
            every successful freelancer joining
          </Text>
        </View>
        <View className="flex flex-row justify-between flex-wrap gap-4">
          <View
            className="flex flex-col items-start gap-y-2"
            style={{width: 40 * vw}}>
            <Iconfingerprint size={13 * vw} name="fingerprint" color="#000" />
            <Text style={{fontSize: 4.5 * vw}} className="text-black font-bold">
              Step 1:
            </Text>
            <Text
              style={{fontSize: 4.5 * vw}}
              className="text-black font-medium">
              Login to Fipezo and navigate to refer and earn page
            </Text>
          </View>
          <View
            className="flex flex-col items-start gap-y-2"
            style={{width: 40 * vw}}>
            <Iconuserplus size={13 * vw} name="adduser" color="#000" />
            <Text style={{fontSize: 4.5 * vw}} className="text-black font-bold">
              Step 2:
            </Text>
            <Text
              style={{fontSize: 4.5 * vw}}
              className="text-black font-medium">
              Copy the invition code and send it to your freelancer friend
            </Text>
          </View>
          <View
            className="flex flex-col items-start gap-y-2"
            style={{width: 40 * vw}}>
            <Iconstar size={13 * vw} name="star" color="#000" />
            <Text style={{fontSize: 4.5 * vw}} className="text-black font-bold">
              Step 3:
            </Text>
            <Text
              style={{fontSize: 4.5 * vw}}
              className="text-black font-medium">
              Once a referall create a new account, you get paid 50 as reward
            </Text>
          </View>
          <View
            className="flex flex-col items-start gap-y-2"
            style={{width: 40 * vw}}>
            <Iconrupee size={13 * vw} name="dollar-sign" color="#000" />
            <Text style={{fontSize: 4.5 * vw}} className="text-black font-bold">
              Step 4:
            </Text>
            <Text
              style={{fontSize: 4.5 * vw}}
              className="text-black font-medium">
              After 5 successfull referral, you can withdraw your amount on your
              UPI bank account easily.
            </Text>
          </View>
        </View>
        <View className="flex flex-col gap-y-4 w-full">
          <Text
            style={{fontSize: 6 * vw}}
            className="text-black font-bold text-center">
            Terms and Conditions
          </Text>
          <View className="flex flex-col items-start gap-y-2">
            <Text
              style={{fontSize: 4.5 * vw}}
              className="text-black font-bold text-center">
              Eligibility :
            </Text>
            <View className="flex flex-row justify-start gap-x-2">
              <Text
                style={{fontSize: 4 * vw}}
                className="text-black font-medium">
                You must be a registered user of Fipezo to participate in the
                program
              </Text>
            </View>
          </View>
          <View className="flex flex-col items-start gap-y-2">
            <Text
              style={{fontSize: 4.5 * vw}}
              className="text-black font-bold text-center">
              Referral Reward :
            </Text>
            <View className="flex flex-col gap-y-3 justify-start gap-x-2">
              <Text
                style={{fontSize: 4 * vw}}
                className="text-black font-medium">
                For each successful referral, where a referred user creates a
                Fipezo profile and is a freelancer, you will receive a reward of
                50 Indian Rupees (INR).
              </Text>
              <Text
                style={{fontSize: 4 * vw}}
                className="text-black font-medium">
                The referred user must sign up using your unique referral code
                to be considered a successful referral.
              </Text>
            </View>
          </View>
          <View className="flex flex-col items-start gap-y-2">
            <Text
              style={{fontSize: 4.5 * vw}}
              className="text-black font-bold text-center">
              Limits and Conditions :
            </Text>
            <View className="flex flex-col gap-y-3 justify-start gap-x-2">
              <Text
                style={{fontSize: 4 * vw}}
                className="text-black font-medium">
                Each referral code is applicable for one profile creation only.
              </Text>
              <Text
                style={{fontSize: 4 * vw}}
                className="text-black font-medium">
                To be eligible for withdrawal, you must accumulate a minimum of
                300 INR in referral rewards.
              </Text>
            </View>
          </View>
          <View className="flex flex-col items-start gap-y-2">
            <Text
              style={{fontSize: 4.5 * vw}}
              className="text-black font-bold text-center">
              Withdrawal Method :
            </Text>
            <View className="flex flex-col gap-y-3 justify-start gap-x-2">
              <Text
                style={{fontSize: 4 * vw}}
                className="text-black font-medium">
                Referral rewards can only be withdrawn using the UPI (Unified
                Payments Interface) payment method.
              </Text>
            </View>
          </View>
          <View className="flex flex-col items-start gap-y-2">
            <Text
              style={{fontSize: 4.5 * vw}}
              className="text-black font-bold text-center">
              Fraud and Misuse :
            </Text>
            <View className="flex flex-col gap-y-3 justify-start gap-x-2">
              <Text
                style={{fontSize: 4 * vw}}
                className="text-black font-medium">
                Fipezo reserves the right to investigate and withhold rewards in
                cases of fraudulent activity or misuse of the "Refer and Earn"
                program.
              </Text>
              <Text
                style={{fontSize: 4 * vw}}
                className="text-black font-medium">
                Fraudulent activity includes but is not limited to, creating
                fake profiles or referring oneself.
              </Text>
            </View>
          </View>
          <View className="flex flex-col items-start gap-y-2">
            <Text
              style={{fontSize: 4.5 * vw}}
              className="text-black font-bold text-center">
              Contact :
            </Text>
            <View className="flex flex-col gap-y-3 justify-start gap-x-2">
              <Text
                style={{fontSize: 4 * vw}}
                className="text-black font-medium">
                If you have any questions or concerns regarding the "Refer and
                Earn" program, please contact our customer support.
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ReferandEarnScreen;

const styles = StyleSheet.create({});
