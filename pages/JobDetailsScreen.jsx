import {
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useIsFocused, useRoute} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {vw} from 'react-native-viewport-units';
import Iconrupee from 'react-native-vector-icons/FontAwesome';
import Iconlocation from 'react-native-vector-icons/FontAwesome6';
import Iconstate from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SERVER_URL, BUCKET_URL} from '@env';
import socket from '../utils/socket';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../context/AuthContext';
import Loader from '../components/Loader';
import Iconshare from 'react-native-vector-icons/Entypo';
import Iconchat from 'react-native-vector-icons/Ionicons';

const JobDetailsScreen = ({navigation}) => {
  const [job, setJob] = useState({});
  const [time, setTime] = useState({});
  const [isApplied, setIsApplied] = useState(false);
  const [finalDate, setFinalDate] = useState('');

  const {authData} = useContext(AuthContext);
  const isFocused = useIsFocused();

  const scrollNavFuction = e => {
    if (e.nativeEvent.contentOffset.y < 40) {
    } else {
    }
  };

  const route = useRoute();
  const {uid} = route.params;

  async function getJobDetails(uid, setFunc1, setFunc2) {
    try {
      const resp = await fetch(`${SERVER_URL}/job/get/${uid}`);
      const data = await resp.json();
      setFunc1(data);
      const d = JSON.parse(data.eventTime);
      setFunc2(d);
      data.appliedFreelancers.forEach(element => {
        if (authData.userDetails?._id === element._id) {
          setIsApplied(true);
        }
      });
      let one_day = 1000 * 60 * 60 * 24;
      let a = new Date(data.dueDate);
      let today = new Date();
      var Result = Math.round(a.getTime() - today.getTime()) / one_day;
      var Final_Result = Result.toFixed(0);
      setFinalDate(Final_Result);
    } catch (error) {
      console.log(error);
    }
  }

  const applyJob = async () => {
    if (!authData.isLoggedIn) {
      navigation.navigate('GetStarted');
      return;
    }
    try {
      setIsApplied(true);
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${SERVER_URL}/job/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({jobid: job._id}),
      });
      const respData = await res.json();
      if (respData) {
        socket.emit('send-notification', {
          type: 'Job apply',
          headline: `${authData.userDetails.firstname} ${authData.userDetails.lastname} applied to your posted job`,
          acceptedCompany: job.createdCompany._id,
          sentFreelancer: authData.userDetails._id,
          href: '/posted-jobs',
        });
      }
    } catch (error) {
      console.log(error);
      setIsApplied(false);
    }
  };

  useEffect(() => {
    getJobDetails(uid, setJob, setTime);
    return () => {
      setJob({});
    };
  }, [uid, isFocused]);

  const onShare = async (msg, uri) => {
    try {
      const result = await Share.share(
        {
          message: uri,
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

  const createChatRoom = async () => {
    if (!authData.isLoggedIn) {
      navigation.navigate('GetStarted');
      return;
    }
    try {
      const res = await fetch(`${SERVER_URL}/createmessagebox`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messageId: (
            authData.userDetails.phone + job.createdCompany.companyphone
          ).toString(),
          company: job.createdCompany._id,
          freelancer: authData.userDetails._id,
        }),
      });
      const respData = await res.json();
      if (res.ok) {
        navigation.navigate('user-chat', {chatId: respData.messageId});
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!job) {
    return <Loader />;
  }

  return (
    <ScrollView onScroll={scrollNavFuction}>
      <StatusBar
        animated={true}
        backgroundColor="#973931"
        barStyle={'default'}
        showHideTransition={'fade'}
        hidden={false}
      />
      <View className="h-40 bg-orange-500"></View>
      <View
        className="bg-white rounded-t-3xl relative bottom-4 flex-col"
        style={{flex: 1, minHeight: '100%'}}>
        <View className="flex items-center justify-center border border-white self-center relative bottom-6 rounded-full">
          <FastImage
            source={{
              uri: `${BUCKET_URL}${job?.createdCompany?.profilePicture}`,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
            style={{width: 15 * vw, height: 15 * vw, borderRadius: 7.5 * vw}}
          />
        </View>
        <View className="flex flex-col items-center m-4">
          <Text
            style={{fontSize: 6 * vw}}
            className="capitalize font-bold text-black text-center">
            {job.title}
          </Text>
          <Text
            style={{fontSize: 5 * vw}}
            className="capitalize font-bold text-neutral-600">
            {job.createdCompany?.companyname}
          </Text>
        </View>
        <View className="flex flex-row items-center justify-evenly my-2 mx-4">
          <View className="flex flex-col items-center gap-y-2">
            <View className="rounded-full flex flex-row items-center justify-center bg-orange-500 px-2 py-2">
              <View className="rounded-full flex flex-row items-center justify-center bg-white px-2 py-1">
                <Iconrupee name="rupee" size={5 * vw} color="#F97316" />
              </View>
            </View>
            <Text
              className="text-neutral-600 capitalize"
              style={{fontSize: 3 * vw}}>
              budget
            </Text>
            <Text
              className="text-black font-bold capitalize"
              style={{fontSize: 3.7 * vw}}>
              {job.budget}
            </Text>
          </View>
          <View className="flex flex-col items-center gap-y-2">
            <View className="rounded-full flex flex-row items-center justify-center bg-orange-500 p-2">
              <View className="rounded-full flex flex-row items-center justify-center bg-white p-1">
                <Iconlocation
                  name="location-crosshairs"
                  size={5 * vw}
                  color="#F97316"
                />
              </View>
            </View>
            <Text
              className="text-neutral-600 capitalize"
              style={{fontSize: 3 * vw}}>
              venue
            </Text>
            <Text
              className="text-black font-bold capitalize"
              style={{fontSize: 3.7 * vw}}>
              {job.venue}
            </Text>
          </View>
          <View className="flex flex-col items-center gap-y-2">
            <View className="rounded-full flex flex-row items-center justify-center bg-orange-500 p-2">
              <View className="rounded-full flex flex-row items-center justify-center bg-white px-2 py-1">
                <Iconrupee name="microphone" size={5 * vw} color="#F97316" />
              </View>
            </View>
            <Text
              className="text-neutral-600 capitalize"
              style={{fontSize: 3 * vw}}>
              vacancy
            </Text>
            <Text
              className="text-black font-bold capitalize"
              style={{fontSize: 3.7 * vw}}>
              {job.vacancy}
            </Text>
          </View>
          <View className="flex flex-col items-center gap-y-2">
            <View className="rounded-full flex flex-row items-center justify-center bg-orange-500 p-2">
              <View className="rounded-full flex flex-row items-center justify-center bg-white px-1 py-1">
                <Iconstate name="progress-star" size={5 * vw} color="#F97316" />
              </View>
            </View>
            <Text
              className="text-neutral-600 capitalize"
              style={{fontSize: 3 * vw}}>
              status
            </Text>
            <Text
              className="text-black font-bold capitalize"
              style={{fontSize: 3.7 * vw}}>
              {finalDate > 0 ? `${finalDate} days left` : `Expired`}
            </Text>
          </View>
        </View>
        <View className="flex flex-col items-start gap-y-2 my-2 mx-4">
          <View className="flex flex-row items-center justify-between self-stretch">
            <Text
              style={{fontSize: 4.5 * vw}}
              className="text-black font-bold capitalize">
              job description
            </Text>
            <TouchableOpacity
              onPress={() =>
                onShare(
                  job.title,
                  `https://fipezo.com/jobs/details/${job.uid}/`,
                )
              }>
              <Iconshare name="share" size={6 * vw} />
            </TouchableOpacity>
          </View>
          <Text
            style={{fontSize: 4 * vw}}
            className="text-neutral-600 font-semibold">
            {job.createdCompany?.companyname} are seeking talented{' '}
            {job.profession
              ?.split('_')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')}{' '}
            {job.eventType &&
              `for ${job.eventType} event. Working hours are from ${time.startTime} to ${time.endTime}`}
          </Text>
        </View>
        <View className="flex flex-col items-start gap-y-2 my-2 mx-4">
          <View className="flex flex-row items-center justify-between self-stretch">
            <Text
              style={{fontSize: 4.5 * vw}}
              className="text-black font-bold capitalize">
              about company
            </Text>
            <TouchableOpacity onPress={createChatRoom}>
              <Iconchat name="chatbox-sharp" size={6 * vw} />
            </TouchableOpacity>
          </View>
          <Text
            style={{fontSize: 4 * vw}}
            className="text-neutral-600 font-semibold">
            {job.createdCompany?.bio}
          </Text>
        </View>
        <TouchableOpacity
          className="flex items-center justify-center mx-8 rounded-3xl py-2 my-2"
          disabled={
            authData.userType !== 'freelancer' || isApplied || finalDate < 1
          }
          style={
            authData.userType === 'freelancer' && !isApplied && finalDate > 1
              ? {backgroundColor: 'rgb(249,115,22)'}
              : {backgroundColor: 'rgb(161,161,170)'}
          }
          onPress={applyJob}>
          <Text
            style={{fontSize: 4.5 * vw}}
            className="capitalize font-semibold text-white">
            {isApplied ? 'applied' : 'apply'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default JobDetailsScreen;

const styles = StyleSheet.create({});
