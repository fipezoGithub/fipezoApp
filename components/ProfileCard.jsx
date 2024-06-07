import {
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {vw, vh} from 'react-native-viewport-units';
import Iconstar from 'react-native-vector-icons/AntDesign';
import Iconlocation from 'react-native-vector-icons/FontAwesome6';
import Iconverified from 'react-native-vector-icons/MaterialIcons';
import Iconshare from 'react-native-vector-icons/Entypo';
import Iconmenu from 'react-native-vector-icons/SimpleLineIcons';
import Iconreport from 'react-native-vector-icons/MaterialIcons';
import React, {useContext, useEffect, useState} from 'react';
import {SERVER_URL, BUCKET_URL} from '@env';
import {AuthContext} from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Divider, Menu} from 'react-native-paper';
import ReportBox from './ReportBox';
import Iconhire from 'react-native-vector-icons/Feather';

const ProfileCard = ({item, navigation}) => {
  const [isLoved, setIsLoved] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showReportBox, setShowReportBox] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const onShare = async msg => {
    try {
      const result = await Share.share(
        {
          message: `https://fipezo.com/profile/${item.uid}`,
          url: `https://fipezo.com/profile/${item.uid}`,
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

  const {authData, dispatch} = useContext(AuthContext);

  useEffect(() => {
    if (authData.userDetails?.wishlist?.includes(item._id)) {
      setIsLoved(true);
    }
  }, [authData.userType !== 'freelancer']);

  async function addWishList() {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${SERVER_URL}/freelancer/wishlist/add`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({freelancer: item._id}),
      });
      const respData = await res.json();
      if (res.ok) {
        dispatch({
          type: 'login',
          payload: {
            userDetails: respData,
            userType: authData.userType,
          },
        });
        setIsLoved(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function removeWishList() {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${SERVER_URL}/freelancer/wishlist/remove`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({freelancer: item._id}),
      });
      const respData = await res.json();
      if (res.ok) {
        dispatch({
          type: 'login',
          payload: {
            userDetails: respData,
            userType: authData.userType,
          },
        });
        setIsLoved(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('freelancer-profile', {uid: item.uid})}
      className="flex flex-col items-center justify-center mx-4 my-4 bg-white rounded-lg relative"
      style={{elevation: 5, width: 90 * vw}}>
      <View
        className="flex items-center justify-center relative"
        style={{aspectRatio: 1 * 2.37, width: 25 * vw, height: 18 * vh}}>
        <Image
          src={`${BUCKET_URL}${item.coverPicture}`}
          style={{width: '100%', height: '100%'}}
          borderTopLeftRadius={10}
          borderTopRightRadius={10}
          resizeMode="cover"
        />
        <View className="absolute -bottom-8 left-5 z-10">
          <Image
            src={`${BUCKET_URL}${item.profilePicture}`}
            className="w-20 h-20 overflow-hidden rounded-full"
            resizeMode="contain"
          />
        </View>
        <View className="absolute top-2 right-0 z-10">
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <Button onPress={openMenu}>
                <Iconmenu name="options-vertical" size={4 * vw} color="#fff" />
              </Button>
            }>
            {authData.userType !== 'freelancer' &&
              (isLoved ? (
                <Menu.Item
                  onPress={removeWishList}
                  title={
                    <View className="flex flex-row items-center gap-x-1">
                      <Iconstar name="heart" size={4.5 * vw} color="#ef4444" />
                      <Text
                        className="capitalize font-medium text-black"
                        style={{fontSize: 4 * vw}}>
                        remove from wishlist
                      </Text>
                    </View>
                  }
                />
              ) : (
                <Menu.Item
                  onPress={addWishList}
                  title={
                    <View className="flex flex-row items-center gap-x-1">
                      <Iconstar name="hearto" size={4.5 * vw} color="#ef4444" />
                      <Text
                        className="capitalize font-medium text-black"
                        style={{fontSize: 4 * vw}}>
                        add to wishlist
                      </Text>
                    </View>
                  }
                />
              ))}
            <Divider />
            <Menu.Item
              onPress={() => onShare('See my profile at Fipezo')}
              title={
                <View className="flex flex-row items-center gap-x-1">
                  <Iconshare name="share" size={4.5 * vw} />
                  <Text
                    className="capitalize font-medium text-black"
                    style={{fontSize: 4 * vw}}>
                    share
                  </Text>
                </View>
              }
            />
            <Divider />
            <Menu.Item
              onPress={() => setShowReportBox(true)}
              title={
                <View className="flex flex-row items-center gap-x-1">
                  <Iconreport name="report" size={4.5 * vw} color="#ef4444" />
                  <Text
                    className="capitalize font-medium text-black"
                    style={{fontSize: 4 * vw}}>
                    report
                  </Text>
                </View>
              }
            />
          </Menu>
        </View>
      </View>
      <View className="w-full flex flex-col items-stretch gap-y-4 rounded-b-md my-4 px-2">
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row items-center gap-x-1">
            <Text
              className="text-2xl capitalize font-bold text-black"
              style={{maxWidth: 64 * vw}}
              numberOfLines={1}
              ellipsizeMode="tail">
              {item.firstname + ' ' + item.lastname}
            </Text>
            <Iconverified name="verified" size={6 * vw} color="#2c96ea" />
          </View>
          <View className="bg-green-600 px-2 py-0.5 rounded-lg flex items-center flex-row gap-x-1">
            <Text className="text-white text-lg font-semibold">
              {item.rating?.toFixed(1)}
            </Text>
            <Iconstar name="star" size={18} color="#ffffff" />
          </View>
        </View>
        <View className="flex flex-row gap-2 flex-wrap">
          <View className="bg-red-500 rounded-lg" style={{elevation: 3}}>
            <Text className="text-base capitalize text-white px-2 py-0.5">
              {item.profession
                ?.split('_')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            </Text>
          </View>
          <View
            className="flex flex-row items-center gap-x-1 bg-orange-500 rounded-lg px-2 py-0.5"
            style={{elevation: 3}}>
            <Iconlocation name="location-dot" size={4 * vw} color="#fff" />
            <Text className="text-base capitalize text-white">
              {item.location}
            </Text>
          </View>
          {item.featured && (
            <View
              className="bg-lime-500 rounded-lg px-2 py-0.5"
              style={{elevation: 3}}>
              <Text className="text-base text-white capitalize">featured</Text>
            </View>
          )}
        </View>
        <View
          className="border-dashed"
          style={{borderWidth: 0.7, height: 0.7}}></View>
        <View className="flex flex-row justify-between">
          <Text className="text-lg text-black font-semibold">
            Rs. {item.rate} /{' '}
            {(item.profession === 'actor' ||
              item.profession === 'actress' ||
              item.profession === 'model') &&
              'Shoot'}
            {item.profession === 'influencer' && 'Post'}
            {item.profession === 'fashion_designer' && 'Dress'}
            {(item.profession === 'babysitter' ||
              item.profession === 'maid' ||
              item.profession === 'dance_teacher' ||
              item.profession === 'drawing_teacher' ||
              item.profession === 'music_teacher' ||
              item.profession == 'private_tutor') &&
              'Month'}
            {(item.profession === 'dj' ||
              item.profession == 'musician' ||
              item.profession === 'drone_operator') &&
              'Hour'}
            {(item.profession === 'album_designer' ||
              item.profession === 'dancer' ||
              item.profession === 'graphics_designer' ||
              item.profession === 'interior_designer' ||
              item.profession === 'mehendi_artist' ||
              item.profession === 'painter' ||
              item.profession === 'photo_editor' ||
              item.profession === 'video_editor' ||
              item.profession === 'voice_over_artist' ||
              item.profession === 'anchor' ||
              item.profession === 'lyricist' ||
              item.profession === 'makeup_artist' ||
              item.profession === 'vocalist' ||
              item.profession === 'web_developer') &&
              'Project'}
            {(item.profession === 'cinematographer' ||
              item.profession === 'photographer') &&
              'Day'}
          </Text>
          <TouchableOpacity
            disabled={authData.userType === 'freelancer'}
            className="flex flex-row items-center gap-x-2 bg-blue-600 px-2 py-0.5 rounded-lg"
            style={{elevation: 3}}
            onPress={() =>
              navigation.navigate('hire-freelancer', {pageData: item})
            }>
            <Iconhire name="user-check" size={4.4 * vw} color="#fff" />
            <Text
              className="font-semibold text-white capitalize"
              style={{fontSize: 4.4 * vw}}>
              hire now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ReportBox
        showReportBox={showReportBox}
        setShowReportBox={setShowReportBox}
        freelancer={item}
      />
    </TouchableOpacity>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({});
