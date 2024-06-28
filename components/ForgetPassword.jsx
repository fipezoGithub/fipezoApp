import {
  Modal,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import Iconclose from 'react-native-vector-icons/MaterialCommunityIcons';
import {vw} from 'react-native-viewport-units';
import {SERVER_URL} from '@env';
import {HelperText} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../context/AuthContext';

const ForgetPassword = ({
  forgetPasswordModal,
  setForgetPasswordModal,
  navigation,
}) => {
  const [phone, setPhone] = useState('');
  const [otp, setOTP] = useState('');
  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');
  const [phoneErr, setPhoneErr] = useState(false);
  const [otpErr, setOTPErr] = useState(false);
  const [showOTPBox, setShowOTPBox] = useState(false);
  const [showPasswordBox, setShowPasswordBox] = useState(false);
  const [loading, setLoading] = useState(false);

  const {dispatch} = useContext(AuthContext);

  const handelOTP = async () => {
    if (phone.length !== 10) {
      setPhoneErr(true);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${SERVER_URL}/otp/forget-password`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({type: 'forget', phone: phone}),
      });
      if (res.ok) {
        setShowOTPBox(true);
      } else {
        setPhoneErr(true);
      }
    } catch (error) {
      console.log(error);
      setPhoneErr(true);
    } finally {
      setLoading(false);
    }
  };

  const submitOTP = async () => {
    if (otp.length !== 6) {
      setOTPErr(true);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${SERVER_URL}/forget-password/submitotp`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({type: 'forget', phone: phone, otp: otp}),
      });
      const data = await res.json();
      if (res.ok) {
        setShowPasswordBox(true);
      }
      await AsyncStorage.setItem('token', data.token);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async e => {
    const token = await AsyncStorage.getItem('token');
    try {
      setLoading(true);
      if (password === conPassword) {
        const res = await fetch(`${SERVER_URL}/profile/user/password/change`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({password: password}),
        });
        const data = await res.json();
        if (data) {
          dispatch({type: 'isLoggedIn'});
          navigation.navigate('TabNav');
        }
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      visible={forgetPasswordModal}
      transparent={true}
      onRequestClose={() => {
        setForgetPasswordModal(false);
      }}>
      <View
        className="flex-1 items-center justify-center"
        style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
        <View className="bg-white rounded-xl px-4 py-2 flex flex-col items-start gap-y-4 relative">
          <TouchableOpacity
            className="absolute right-2"
            onPress={() => setForgetPasswordModal(false)}>
            <Iconclose name="close-thick" size={8 * vw} color="#000" />
          </TouchableOpacity>
          <View>
            <Text style={{fontSize: 6 * vw}} className="font-bold text-black">
              Retrieve your Password
            </Text>
          </View>
          <View className="flex items-center">
            <View className="self-stretch flex flex-col gap-y-2">
              <Text
                style={{fontSize: 4 * vw}}
                className="font-medium text-black capitalize">
                phone
              </Text>
              <View
                className="border border-neutral-300 relative"
                style={{width: 80 * vw}}>
                <TextInput
                  className=""
                  placeholder="Enter your phone number"
                  placeholderTextColor="#404040"
                  keyboardType="phone-pad"
                  value={phone}
                  maxLength={10}
                  onChangeText={text => {
                    setPhone(text);
                    setPhoneErr(false);
                  }}
                  style={{textAlignVertical: 'center', color: '#000'}}
                />
              </View>
              <HelperText
                type="error"
                visible={phoneErr}
                padding="none"
                style={{
                  fontSize: 4 * vw,
                }}>
                Phone number is not valid
              </HelperText>
            </View>
            <TouchableOpacity
              className="bg-black rounded-md"
              onPress={handelOTP}>
              <Text
                style={{fontSize: 4 * vw}}
                className="text-white font-bold px-4 py-1">
                Get OTP
              </Text>
            </TouchableOpacity>
          </View>
          {showOTPBox && (
            <View className="flex items-center">
              <View className="self-stretch flex flex-col gap-y-2">
                <Text
                  style={{fontSize: 4 * vw}}
                  className="font-medium text-black">
                  Enter OTP
                </Text>
                <View
                  className="border border-neutral-300 relative"
                  style={{width: 80 * vw}}>
                  <TextInput
                    value={otp}
                    placeholder="Enter the OTP you received"
                    maxLength={6}
                    placeholderTextColor="#404040"
                    keyboardType="decimal-pad"
                    onChangeText={text => {
                      setOTPErr(false);
                      setOTP(text);
                    }}
                    style={{textAlignVertical: 'center'}}
                  />
                </View>
                <HelperText
                  type="error"
                  visible={otpErr}
                  padding="none"
                  style={{
                    fontSize: 4 * vw,
                  }}>
                  OTP is not valid
                </HelperText>
              </View>
              <TouchableOpacity
                className="bg-black rounded-md"
                onPress={submitOTP}>
                <Text
                  style={{fontSize: 4 * vw}}
                  className="text-white font-bold capitalize px-4 py-1">
                  submit
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {showPasswordBox && (
            <View className="flex items-center">
              <View className="self-stretch flex flex-col gap-y-2">
                <Text
                  style={{fontSize: 4 * vw}}
                  className="font-medium text-black">
                  Enter new Password
                </Text>
                <View
                  className="border border-neutral-300 relative"
                  style={{width: 80 * vw}}>
                  <TextInput
                    value={password}
                    placeholder="Enter the new password"
                    placeholderTextColor="#404040"
                    keyboardType="decimal-pad"
                    onChangeText={text => {
                      setPassword(text);
                    }}
                    style={{textAlignVertical: 'center'}}
                  />
                </View>
              </View>
              <View className="self-stretch flex flex-col gap-y-2">
                <Text
                  style={{fontSize: 4 * vw}}
                  className="font-medium text-black">
                  Confirm new Password
                </Text>
                <View
                  className="border border-neutral-300 relative"
                  style={{width: 80 * vw}}>
                  <TextInput
                    value={conPassword}
                    placeholder="Confirm your new password"
                    placeholderTextColor="#404040"
                    keyboardType="decimal-pad"
                    onChangeText={text => {
                      setConPassword(text);
                    }}
                    style={{textAlignVertical: 'center'}}
                  />
                </View>
              </View>
              <TouchableOpacity
                className="bg-black rounded-md"
                onPress={changePassword}>
                <Text
                  style={{fontSize: 4 * vw}}
                  className="text-white font-bold capitalize px-4 py-1">
                  submit
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({});
