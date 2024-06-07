import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {vw, vh} from 'react-native-viewport-units';
import Iconfollow from 'react-native-vector-icons/AntDesign';
import Iconverified from 'react-native-vector-icons/MaterialIcons';
import Iconlocation from 'react-native-vector-icons/EvilIcons';
import {SERVER_URL, BUCKET_URL} from '@env';
import FastImage from 'react-native-fast-image';
import Loader from '../components/Loader';
import {AuthContext} from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import ImageView from 'react-native-image-viewing';

const CompanyProfileScreen = ({route, navigation}) => {
  const {uid} = route.params;
  const [freelancer, setFreelancer] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isFollow, setIsFollow] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [companyAddress, setCompanyAddress] = useState({});
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [showImage, setShowImage] = useState([]);

  const {authData, dispatch} = useContext(AuthContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Reset the screen state here
      setFreelancer({});
      setShowImage([]);
    });
    fetchFreelancerDetails(uid, setFreelancer);
    return unsubscribe;
  }, [isFocused]);

  async function fetchFreelancerDetails(uid, setFunc) {
    try {
      setIsLoading(true);
      const resp = await fetch(`${SERVER_URL}/profile/company/${uid}`);
      const res = await resp.json();
      setFunc(res);
      setFollowerCount(res.followers.length);
      setCompanyAddress(JSON.parse(res.companyaddress));
      if (authData.userDetails?.followedCompanies?.includes(res._id)) {
        setIsFollow(true);
      } else {
        setIsFollow(false);
      }

      res.works.forEach(element => {
        setShowImage(prev => [...prev, {uri: BUCKET_URL + element}]);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handelFollow = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${SERVER_URL}/follow/freelancer`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({userid: freelancer._id}),
      });
      const respdata = await res.json();
      dispatch({type: 'isLoggedIn'});
      setIsFollow(true);
      setFollowerCount(followerCount + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handelUnfollow = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${SERVER_URL}/unfollow/freelancer`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({userid: freelancer._id}),
      });
      const respdata = await res.json();
      dispatch({type: 'isLoggedIn'});
      setIsFollow(false);
      setFollowerCount(followerCount - 1);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <Loader />; // Or a loading indicator
  }

  return (
    <ScrollView nestedScrollEnabled scrollEventThrottle={16}>
      <StatusBar
        animated={true}
        backgroundColor="#973931"
        barStyle={'default'}
        showHideTransition={'fade'}
        hidden={false}
      />
      <View style={{aspectRatio: 1 * 1.7, width: 25 * vw, height: 28 * vh}}>
        <FastImage
          source={{
            uri: `${BUCKET_URL}${freelancer.coverPicture}`,
            priority: FastImage.priority.normal,
          }}
          style={{width: '100%', height: '100%'}}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
      <View className="mx-4 flex flex-row justify-around">
        <FastImage
          source={{
            uri: `${BUCKET_URL}${freelancer.profilePicture}`,
            priority: FastImage.priority.normal,
          }}
          style={{
            width: 30 * vw,
            height: 30 * vw,
            position: 'relative',
            left: '-85%',
            bottom: '20%',
            borderRadius: 9999,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
      <View className="flex flex-row items-center gap-x-1 mx-4 -mt-16">
        <Text
          className=" text-black font-bold capitalize"
          style={{fontSize: 6 * vw}}>
          {freelancer.companyname}
        </Text>
        <Iconverified name="verified" size={6 * vw} color="#2c96ea" />
      </View>
      <View className="my-2 flex flex-row flex-wrap items-center gap-x-2 mx-4">
        <View className="bg-purple-600 px-2 py-0.5 rounded-lg flex flex-row items-center gap-x-1">
          <Iconlocation name="location" color="#fff" size={6 * vw} />
          <Text
            className=" text-white font-bold capitalize"
            style={{fontSize: 4 * vw}}>
            {companyAddress.city}
          </Text>
        </View>
        <View className="bg-red-500 px-2 py-0.5 rounded-lg">
          <Text
            className=" text-white font-bold capitalize"
            style={{fontSize: 4 * vw}}>
            {freelancer.companytype}
          </Text>
        </View>
        <View className="flex flex-row items-center justify-center mx-4 bg-green-500 px-2 py-0.5 rounded-lg">
          <Text
            style={{fontSize: 4 * vw}}
            className="font-semibold capitalize text-white text-center">
            {followerCount} followers
          </Text>
        </View>
      </View>
      <View className="flex flex-col gap-y-2 items-start justify-between mx-4 mt-2">
        <View className="flex flex-row items-center justify-between w-full">
          <Text
            style={{fontSize: 6 * vw}}
            className="capitalize text-black font-bold">
            about me
          </Text>
          {authData.userType === 'freelancer' &&
            authData.userDetails.uid !== uid &&
            (isFollow ? (
              <TouchableOpacity
                className="flex flex-row items-center gap-x-2 bg-blue-500 px-2 py-0.5 rounded-lg"
                onPress={handelUnfollow}>
                <Iconfollow name="deleteuser" size={4.4 * vw} color="#fff" />
                <Text
                  className="font-semibold capitalize text-white"
                  style={{fontSize: 4.4 * vw}}>
                  unfollow
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                className="flex flex-row items-center gap-x-2 bg-blue-500 px-2 py-0.5 rounded-lg"
                onPress={handelFollow}>
                <Iconfollow name="adduser" size={4.4 * vw} color="#fff" />
                <Text
                  className="font-semibold capitalize text-white"
                  style={{fontSize: 4.4 * vw}}>
                  follow
                </Text>
              </TouchableOpacity>
            ))}
        </View>
        <Text
          style={{fontSize: 4.5 * vw}}
          className="capitalize text-neutral-700 font-semibold">
          {freelancer.bio}
        </Text>
      </View>
      <ScrollView
        nestedScrollEnabled
        stickyHeaderIndices={[1]}
        contentContainerStyle={{
          marginTop: 16,
          justifyContent: 'center',
        }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            width: '100%',
          }}>
          <View className="w-full flex-row justify-evenly items-center border-b pb-2 border-neutral-500">
            <TouchableOpacity>
              <Text
                className={`capitalize font-bold text-orange-500`}
                style={{fontSize: 5 * vw}}>
                portfolio
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View className="flex flex-row items-center justify-center gap-x-2 gap-y-1 flex-wrap my-4">
          {freelancer.works?.length > 0 &&
            freelancer.works?.map((item, idx) => (
              <>
                <TouchableOpacity
                  key={idx}
                  onPress={() => {
                    setIndex(idx);
                    setVisible(true);
                  }}>
                  <FastImage
                    style={{width: 48 * vw, height: 18 * vh}}
                    source={{
                      uri: BUCKET_URL + item,
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                </TouchableOpacity>
                <ImageView
                  images={showImage}
                  imageIndex={index}
                  visible={visible}
                  onRequestClose={() => setVisible(false)}
                />
              </>
            ))}
        </View>
      </ScrollView>
    </ScrollView>
  );
};

export default CompanyProfileScreen;

const styles = StyleSheet.create({});
