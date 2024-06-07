import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import socket from '../utils/socket';
import {AuthContext} from '../context/AuthContext';
import {SERVER_URL} from '@env';
import {vw, vh} from 'react-native-viewport-units';
import FastImage from 'react-native-fast-image';
import {FAB} from 'react-native-paper';

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const {authData, dispatch} = useContext(AuthContext);
  const {userDetails, userType} = authData;

  useEffect(() => {
    async function getNotifications() {
      const res = await fetch(
        `${SERVER_URL}/notification/${userDetails._id}?type=${userType}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const noti = await res.json();
      setNotifications(noti);
    }
    getNotifications();
  }, [userDetails]);

  useEffect(() => {
    socket.on('notifications', data => {
      setNotifications(prev => [...prev, ...data]);
    });
  }, [socket]);

  const seenAllNoti = async () => {
    try {
      const res = await fetch(
        `${SERVER_URL}/notification/seenall/${userDetails._id}?type=${userType}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const seenNoti = await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="flex-grow bg-white">
      <ScrollView
        contentContainerStyle={{
          minHeight: 85 * vh,
          alignItems: 'center',
          rowGap: 3 * vh,
          paddingVertical: 2 * vh,
          marginHorizontal: 2 * vw,
        }}>
        <Text className="font-bold text-black" style={{fontSize: 5 * vw}}>
          Notifications
        </Text>
        <View className="flex gap-y items-start flex-col">
          {notifications.length > 0 &&
            notifications.reverse().map((not, index) => (
              <View
                key={index}
                className="flex flex-row items-center gap-x-2 py-3"
                style={!not.seen && {backgroundColor: 'rgb(203 213 225)'}}>
                <FastImage
                  source={{
                    uri:
                      (not.sentUser?.profilePicture &&
                        `https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${not.sentUser.profilePicture}`) ||
                      (not.sentFreelancer?.profilePicture &&
                        `https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${not.sentFreelancer.profilePicture}`) ||
                      (not.sentCompany?.profilePicture &&
                        `https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${not.sentCompany?.profilePicture}`),
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                  style={{width: 10 * vw, height: 5 * vh}}
                  className="rounded-full"
                />
                <View className="flex flex-col items-start gap-y-2">
                  <Text
                    style={{fontSize: 4 * vw, width: 75 * vw}}
                    className="text-black font-medium">
                    {not.headline}
                  </Text>
                  <Text
                    style={{fontSize: 4 * vw}}
                    className="text-black font-medium">
                    {new Date(not.createdAt).toLocaleString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </Text>
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
      <FAB
        icon="read"
        style={[
          {
            position: 'absolute',
            right: 16,
            bottom: 16,
            backgroundColor: '#000',
          },
        ]}
        color="#fff"
        onPress={seenAllNoti}
      />
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({});
