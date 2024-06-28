import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {vw, vh} from 'react-native-viewport-units';
import DatePicker from 'react-native-date-picker';
import RazorpayCheckout from 'react-native-razorpay';
import {AuthContext} from '../context/AuthContext';
import {SERVER_URL, RAZORPAY_KEY} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import socket from '../utils/socket';
import {HelperText} from 'react-native-paper';

const HireFreelancer = ({route, navigation}) => {
  const [date, setDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [openStartTime, setOpenStartTime] = useState(false);
  const [endTime, setEndTime] = useState(new Date());
  const [openEndTime, setOpenEndTime] = useState(false);
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState(false);
  const [budget, setBudget] = useState('');
  const [budgetError, setBudgetError] = useState(false);
  const [description, setDescription] = useState('');

  const {pageData} = route.params;
  const {authData} = useContext(AuthContext);

  async function createHireRequest() {
    if (address.length <= 0) {
      setAddressError(true);
      return;
    }
    if (budget.length <= 0) {
      setBudgetError(true);
      return;
    }
    try {
      const token = await AsyncStorage.getItem('token');
      const razorPay = await RazorpayCheckout.open({
        description: `Fipezo hire Freelancer at 49/-`,
        image: 'https://fipezo.com/favi.png',
        currency: 'INR',
        key: RAZORPAY_KEY, // Your api key
        amount: `${49 * 100}`,
        name: 'Fipezo',
        prefill: {
          contact: authData.userDetails.phone,
          name: authData.userDetails.firstname
            ? authData.userDetails.firstname + authData.userDetails.lastname
            : authData.userDetails.companyname,
        },
        theme: {color: '#f71942'},
      });

      let bodyData = {};
      if (authData.userType === 'company') {
        bodyData = {
          company: authData.userDetails._id,
          fullName: fullname,
          hired_freelancer: pageData._id,
          address: address,
          phone: phone,
          reuireDate: date,
          budget: budget,
          startTime: startTime,
          endTime: endTime,
          description: description,
          transactionId: razorPay.razorpay_payment_id,
        };
      } else if (authData.userType === 'user') {
        bodyData = {
          user: authData.userDetails._id,
          fullName: fullname,
          hired_freelancer: pageData._id,
          address: address,
          phone: phone,
          reuireDate: date,
          budget: budget,
          startTime: startTime,
          endTime: endTime,
          description: description,
          transactionId: razorPay.razorpay_payment_id,
        };
      } else {
        bodyData = {
          freelancer: authData.userDetails._id,
          fullName: fullname,
          hired_freelancer: pageData._id,
          address: address,
          phone: phone,
          reuireDate: date,
          budget: budget,
          startTime: startTime,
          endTime: endTime,
          description: description,
          transactionId: razorPay.razorpay_payment_id,
        };
      }

      const response = await fetch(`${SERVER_URL}/hire/premium`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bodyData),
      });
      const respdata = await response.text();

      if (response.ok) {
        if (authData.userType === 'company') {
          socket.emit('send-notification', {
            type: 'Hire',
            headline: `You have a hire request from ${fullname}`,
            acceptedFreelancer: pageData._id,
            sentCompany: authData.userDetails._id,
            href: '/my_requests',
          });
        } else {
          socket.emit('send-notification', {
            type: 'Hire',
            headline: `You have a hire request from ${fullname}`,
            acceptedFreelancer: pageData._id,
            sentUser: authData.userDetails._id,
            href: '/my_requests',
          });
        }
      }
      navigation.navigate('my-hire-request');
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (authData.userType === 'company') {
      setFullname(authData.userDetails.companyname);
      setPhone(authData.userDetails.companyphone.toString());
    } else if (authData.userType === 'user') {
      setFullname(
        authData.userDetails.firstname + ' ' + authData.userDetails.lastname,
      );
      setPhone(authData.userDetails.phone.toString());
    } else {
      setFullname(
        authData.userDetails.firstname + ' ' + authData.userDetails.lastname,
      );
      setPhone(authData.userDetails.phone.toString());
    }
  }, [authData.userDetails]);

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: '#fff',
        minHeight: 90 * vh,
      }}>
      <View className="my-2">
        <Text
          className="text-black font-semibold capitalize text-center"
          style={{fontSize: 6 * vw}}>
          send your task
        </Text>
      </View>
      <View className="mx-4 flex flex-col gap-y-2">
        <View className="flex flex-col gap-y-2">
          <Text
            style={{fontSize: 4 * vw}}
            className="text-black font-semibold capitalize">
            full name
          </Text>
          <TextInput
            keyboardAppearance="default"
            inputMode="text"
            editable={false}
            value={fullname}
            onChangeText={text => setFullname(text)}
            placeholder="Enter your name"
            className="border text-black rounded-2xl"
          />
        </View>
        <View className="flex flex-col gap-y-2">
          <Text
            style={{fontSize: 4 * vw}}
            className="text-black font-semibold capitalize">
            freelancer name
          </Text>
          <TextInput
            keyboardAppearance="default"
            inputMode="text"
            editable={false}
            value={pageData.firstname + ' ' + pageData.lastname}
            placeholder="Enter your name"
            className="border text-neutral-600 border-neutral-600 rounded-2xl"
          />
        </View>
        <View className="flex flex-col gap-y-2">
          <Text
            style={{fontSize: 4 * vw}}
            className="text-black font-semibold capitalize">
            phone
          </Text>
          <TextInput
            keyboardAppearance="default"
            inputMode="numeric"
            value={phone}
            editable={false}
            placeholder="Enter your phone number"
            className="border text-neutral-600 border-neutral-600 rounded-2xl"
          />
        </View>
        <View className="flex flex-col gap-y-2">
          <Text
            style={{fontSize: 4 * vw}}
            className="text-black font-semibold capitalize">
            address
          </Text>
          <TextInput
            keyboardAppearance="default"
            inputMode="text"
            value={address}
            onChangeText={text => setAddress(text)}
            placeholder="Enter your address"
            className="border text-black rounded-2xl"
          />
          <HelperText
            type="error"
            visible={addressError}
            padding="none"
            style={{
              fontSize: 4 * vw,
            }}>
            Address can't be empty
          </HelperText>
        </View>
        <View className="flex flex-col gap-y-2">
          <Text
            style={{fontSize: 4 * vw}}
            className="text-black font-semibold capitalize">
            total budget
          </Text>
          <TextInput
            keyboardAppearance="default"
            inputMode="decimal"
            value={budget}
            onChangeText={text => {
              setBudgetError(false);
              setBudget(text);
            }}
            placeholder="Enter your budget"
            className="border text-black rounded-2xl"
          />
          <HelperText
            type="error"
            visible={budgetError}
            padding="none"
            style={{
              fontSize: 4 * vw,
            }}>
            Please provide your estimated budget
          </HelperText>
        </View>
        <View className="flex flex-col gap-y-2">
          <Text
            style={{fontSize: 4 * vw}}
            className="text-black font-semibold capitalize">
            task description
          </Text>
          <TextInput
            keyboardAppearance="default"
            inputMode="text"
            placeholder="Enter your budget"
            value={description}
            onChangeText={text => setDescription(text)}
            className="border text-black h-28 rounded-2xl"
            style={{textAlignVertical: 'top'}}
            multiline={true}
          />
        </View>
        <View className="flex flex-col gap-y-2">
          <Text
            style={{fontSize: 4 * vw}}
            className="text-black font-semibold capitalize">
            date
          </Text>
          <TouchableOpacity
            onPress={() => setOpenDate(true)}
            className="border py-2 px-1 rounded-2xl">
            <Text className="text-neutral-600 font-semibold capitalize">
              {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
            </Text>
          </TouchableOpacity>
          <DatePicker
            modal
            date={date}
            open={openDate}
            onConfirm={date => {
              setOpenDate(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpenDate(false);
            }}
            mode="date"
          />
        </View>
        <View className="flex flex-col gap-y-2">
          <Text
            style={{fontSize: 4 * vw}}
            className="text-black font-semibold capitalize">
            start time
          </Text>
          <TouchableOpacity
            onPress={() => setOpenStartTime(true)}
            className="border py-2 px-1 rounded-2xl">
            <Text className="text-neutral-600 font-semibold capitalize">
              {startTime.getHours()}:{startTime.getMinutes()}
            </Text>
          </TouchableOpacity>
          <DatePicker
            modal
            date={startTime}
            open={openStartTime}
            onConfirm={date => {
              setOpenStartTime(false);
              setStartTime(date);
            }}
            onCancel={() => {
              setOpenStartTime(false);
            }}
            mode="time"
          />
        </View>
        <View className="flex flex-col gap-y-2">
          <Text
            style={{fontSize: 4 * vw}}
            className="text-black font-semibold capitalize">
            end time
          </Text>
          <TouchableOpacity
            onPress={() => setOpenEndTime(true)}
            className="border py-2 px-1 rounded-2xl">
            <Text className="text-neutral-600 font-semibold capitalize">
              {endTime.getHours()}:{endTime.getMinutes()}
            </Text>
          </TouchableOpacity>
          <DatePicker
            modal
            date={endTime}
            open={openEndTime}
            onConfirm={date => {
              setOpenEndTime(false);
              setEndTime(date);
            }}
            onCancel={() => {
              setOpenEndTime(false);
            }}
            locale="en_IN"
            mode="time"
          />
        </View>
        <TouchableOpacity
          className="bg-blue-500 self-center rounded-lg mb-2"
          onPress={createHireRequest}>
          <Text
            className="capitalize font-bold text-white px-4 py-2"
            style={{fontSize: 4.5 * vw}}>
            pay & send request
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HireFreelancer;

const styles = StyleSheet.create({});
