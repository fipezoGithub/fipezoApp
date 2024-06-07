import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {vw, vh} from 'react-native-viewport-units';
import {SERVER_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconTrash from 'react-native-vector-icons/Ionicons';
import ProfileCard from '../components/ProfileCard';
import FastImage from 'react-native-fast-image';
import {AuthContext} from '../context/AuthContext';

const WishListScreen = ({navigation}) => {
  const [wishList, setWishList] = useState([]);

  const {authData, dispatch} = useContext(AuthContext);

  async function getWishList() {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${SERVER_URL}/freelancer/wishlist/all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const respData = await res.json();
      setWishList(respData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getWishList();
  }, []);

  async function removeWishList(id) {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${SERVER_URL}/freelancer/wishlist/remove`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({freelancer: id}),
      });
      const respData = await res.json();
      if (res.ok) {
        dispatch({
          type: 'login',
          payload: {
            userDetails: respData,
            userType: authData.userType,
            isLoggedIn: authData.isLoggedIn,
          },
        });
        const newList = wishList.filter(item => {
          return item._id != id;
        });

        setWishList(newList);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView contentContainerStyle={{alignItems: 'center', rowGap: 2 * vh}}>
      <View className="mt-4">
        <Text
          className="capitalize text-black font-bold"
          style={{fontSize: 7 * vw}}>
          my wishlist
        </Text>
      </View>
      {wishList.length < 0 ? (
        <View className="flex flex-col items-center gap-y-4">
          <FastImage
            source={require('../assets/no-wishlist.png')}
            resizeMode={FastImage.resizeMode.center}
            style={{width: 75 * vw, height: 35 * vh}}
          />
          <Text
            style={{fontSize: 4.7 * vw}}
            className="text-black font-medium capitalize">
            no wishlist found
          </Text>
        </View>
      ) : (
        <View className="flex items-center justify-center flex-wrap">
          {wishList.map((item, index) => (
            <View key={index} className="relative">
              <TouchableOpacity
                className="absolute top-5 right-6 z-10"
                onPress={() => removeWishList(item._id)}>
                <IconTrash name="trash-bin-sharp" size={25} color="#ef4444" />
              </TouchableOpacity>
              <ProfileCard item={item} navigation={navigation} />
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default WishListScreen;

const styles = StyleSheet.create({});
