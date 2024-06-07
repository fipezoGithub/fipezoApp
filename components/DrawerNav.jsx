import {
  Alert,
  BackHandler,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {vw} from 'react-native-viewport-units';
import SelectDropdown from 'react-native-select-dropdown';
import Iconsearch from 'react-native-vector-icons/AntDesign';
import Iconleft from 'react-native-vector-icons/Entypo';
import Iconlocation from 'react-native-vector-icons/MaterialIcons';
import Icondown from 'react-native-vector-icons/FontAwesome';
import Iconright from 'react-native-vector-icons/AntDesign';
import Iconcrown from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconpower from 'react-native-vector-icons/Feather';
import Iconnotification from 'react-native-vector-icons/Ionicons';
import Iconcity from 'react-native-vector-icons/FontAwesome5';
import Iconcitytree from 'react-native-vector-icons/FontAwesome6';
import Iconrule from 'react-native-vector-icons/MaterialIcons';
import Iconrefund from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';
import {BUCKET_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../context/AuthContext';
import FastImage from 'react-native-fast-image';
import socket from '../utils/socket';

const DrawerNav = ({gooleSignin, currentRouteName, setLocation, location}) => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [profileName, setProfileName] = useState('');
  const [phone, setPhone] = useState('');
  const [profession, setProfession] = useState('');
  const [premiumMembers, setPremiumMembers] = useState(false);
  const [profilePicture, setProfilePicture] = useState();
  const [notificationCount, setNotificationCount] = useState(0);

  const cities = [
    'Agra',
    'Ahmedabad',
    'Amritsar',
    'Aurangabad',
    'Bengaluru',
    'Bhopal',
    'Bhubaneswar',
    'Burdwan',
    'Chandigarh',
    'Chennai',
    'Coimbatore',
    'Dehradun',
    'Delhi',
    'Dhanbad',
    'Durgapur',
    'Faridabad',
    'Ghaziabad',
    'Guwahati',
    'Gwalior',
    'Hyderabad',
    'Indore',
    'Jaipur',
    'Jamshedpur',
    'Jodhpur',
    'Kanpur',
    'Kochi',
    'Kolkata',
    'Lucknow',
    'Ludhiana',
    'Madurai',
    'Mangaluru',
    'Meerut',
    'Mumbai',
    'Mysuru',
    'Nagpur',
    'Nashik',
    'New Delhi',
    'Navi Mumbai',
    'Patna',
    'Prayagraj',
    'Puducherry',
    'Pune',
    'Raipur',
    'Rajkot',
    'Ranchi',
    'Siliguri',
    'Surat',
    'Thane',
    'Thiruvananthapuram',
    'Udaipur',
    'Vadodara',
    'Varanasi',
    'Vijayawada',
    'Visakhapatnam',
    'Warangal',
  ];
  const {authData, dispatch} = useContext(AuthContext);
  const {userDetails, userType} = authData;

  useEffect(() => {
    if (!userDetails) {
      return;
    }
    if (userType === 'company') {
      setProfileName(userDetails.companyname);
      setProfilePicture(userDetails.profilePicture);
      setPhone(userDetails.companyphone);
    } else {
      setProfileName(userDetails.firstname + ' ' + userDetails.lastname);
      setPhone(userDetails.phone);
      if (userDetails.profession)
        setProfession(userDetails.profession.split('_').join(' '));
      setProfilePicture(userDetails.profilePicture);
      socket.emit('get-notifications', {
        user: userDetails?._id,
        type: userType,
      });
      socket.on('notifications', data => {
        // console.log(data);
        setNotificationCount(data.length);
      });
      userDetails.premium && setPremiumMembers(true);
    }
  }, [userDetails]);

  const handelLogout = async () => {
    try {
      await gooleSignin.signOut();
      await AsyncStorage.removeItem('token');
      dispatch({type: 'logout'});
      navigation.reset({
        index: 0,
        routes: [{name: 'GetStarted'}],
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const backAction = () => {
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ]);
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [BackHandler]);

  return (
    <View
      className={
        'flex flex-row justify-between items-center top-0 z-10 w-full px-2 bg-neutral-50'
      }>
      {currentRouteName.route.name != 'Explore' &&
        currentRouteName.route.name != 'Jobs' &&
        currentRouteName.route.name != 'Learn' &&
        currentRouteName.route.name != 'Help' && (
          <TouchableOpacity className="" onPress={() => navigation.goBack()}>
            <Iconleft name="chevron-left" size={25} color="#000" />
          </TouchableOpacity>
        )}
      <View className="flex">
        <SelectDropdown
          data={cities}
          disabled={
            currentRouteName.route.name === 'freelancer-profile' ||
            currentRouteName.route.name === 'company-profile' ||
            currentRouteName.route.name === 'job-details' ||
            currentRouteName.route.name === 'resource-details' ||
            currentRouteName.route.name === 'notifications' ||
            currentRouteName.route.name === 'edit-profile'
          }
          renderCustomizedButtonChild={e => (
            <View className="flex flex-row items-center gap-x-1">
              <Iconlocation name="location-pin" size={20} color="#f61841" />
              <Text className={`text-lg text-black capitalize font-semibold`}>
                {e ? e : 'Select your city'}
              </Text>
              <Icondown name="angle-down" size={20} color="#000000" />
            </View>
          )}
          defaultValue={location}
          buttonStyle={{
            backgroundColor: 'transparent',
            width: 225,
          }}
          dropdownStyle={{
            borderRadius: 10,
            height: '100%',
            flex: 1,
            alignItems: 'stretch',
            width: 95 * vw,
            top: 0,
            left: 0,
            backgroundColor: '#FFFFFF',
          }}
          rowTextStyle={{textTransform: 'capitalize'}}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem.split(' ').join('_'), index);
            setLocation(selectedItem.split(' ').join('_'));
          }}
          search={true}
          searchPlaceHolder={'Enter state name'}
          renderSearchInputLeftIcon={() => (
            <Iconsearch name="search1" size={20} color="#000000" />
          )}
          renderCustomizedRowChild={(item, index) => (
            <View className="mx-4 flex flex-row items-center justify-center gap-x-2">
              {index % 3 === 0 && (
                <Iconcity name="city" size={23} color="#c0c3cd" />
              )}
              {index % 3 === 1 && (
                <Iconcitytree name="mountain-city" size={23} color="#c0c3cd" />
              )}
              {index % 3 === 2 && (
                <Iconcitytree name="tree-city" size={23} color="#c0c3cd" />
              )}
              <Text className="text-lg font-medium text-center text-black">
                {item}
              </Text>
            </View>
          )}
          searchInputStyle={{width: 95 * vw, backgroundColor: '#ffffff'}}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
        />
      </View>
      <View>
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <FastImage
            source={
              profilePicture
                ? {
                    uri: `${BUCKET_URL}${profilePicture}`,
                    priority: FastImage.priority.normal,
                  }
                : require('../assets/dp.png')
            }
            resizeMode={FastImage.resizeMode.cover}
            className="w-8 h-8 rounded-full"
          />
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={showModal}
        onBackdropPress={() => setShowModal(false)}
        onBackButtonPress={() => setShowModal(false)}
        onSwipeComplete={() => setShowModal(false)}
        hideModal={() => setShowModal(false)}
        swipeDirection="right"
        animationIn="slideInRight"
        animationInTiming={500}
        animationOut="slideOutRight"
        animationOutTiming={500}
        backdropTransitionOutTiming={500}
        backdropOpacity={1}
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          position: 'relative',
          margin: 0,
          backgroundColor: '#fff',
        }}>
        <ScrollView
          nestedScrollEnabled={true}
          contentContainerStyle={{
            flexGrow: 1,
            width: '100%',
          }}>
          <TouchableOpacity
            className="absolute top-4 left-2"
            onPress={() => setShowModal(false)}>
            <Iconleft name="chevron-left" size={30} color="#000000" />
          </TouchableOpacity>
          <View className="mt-16 flex flex-col mx-4">
            <ImageBackground
              source={require('../assets/profileBg.png')}
              resizeMode="cover"
              borderRadius={20}
              className="w-full">
              <View className="flex flex-row items-center gap-4 p-4">
                <TouchableOpacity
                  onPress={() => {
                    setShowModal(false);
                    if (userType === 'freelancer') {
                      setShowModal(false);
                      navigation.navigate('edit-profile');
                    } else if (userType === 'user') {
                      setShowModal(false);
                      navigation.navigate('edit-client-profile');
                    } else if (userType === 'company') {
                      setShowModal(false);
                      navigation.navigate('edit-company-profile');
                    }
                  }}>
                  <FastImage
                    source={
                      profilePicture
                        ? {
                            uri: `${BUCKET_URL}${profilePicture}`,
                            priority: FastImage.priority.normal,
                          }
                        : require('../assets/dp.png')
                    }
                    resizeMode={FastImage.resizeMode.cover}
                    className="w-20 h-20 rounded-full"
                  />
                </TouchableOpacity>
                <View className="flex flex-col items-start gap-y-1">
                  <Text className="text-white font-bold text-xl capitalize">
                    {profileName}
                  </Text>
                  {userDetails?.profession && (
                    <Text className="text-white font-bold text-base bg-yellow-700 rounded-xl px-2 py-0.5 capitalize">
                      {profession}
                    </Text>
                  )}
                  <Text className="text-white font-bold text-base capitalize">
                    {phone}
                  </Text>
                  {userType === 'company' && (
                    <TouchableOpacity
                      className="flex flex-row items-center"
                      onPress={() => {
                        setShowModal(false);
                        navigation.navigate('posted-jobs');
                      }}>
                      <Text className="text-base text-white font-semibold">
                        View posted jobs
                      </Text>
                      <Iconright name="caretright" size={20} color="#ffffff" />
                    </TouchableOpacity>
                  )}
                  {userType === 'freelancer' && (
                    <TouchableOpacity
                      className="flex flex-row items-center"
                      onPress={() => {
                        setShowModal(false);
                        navigation.navigate('applied-jobs');
                      }}>
                      <Text className="text-base text-white font-semibold">
                        View applied jobs
                      </Text>
                      <Iconright name="caretright" size={20} color="#ffffff" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              <View className="h-0.5 w-full bg-yellow-700"></View>
              <TouchableOpacity
                onPress={() => {
                  setShowModal(false);
                  navigation.navigate('premium-plans');
                }}
                className="flex flex-row items-center p-4 gap-x-2">
                <Iconcrown name="crown" size={40} color="#BF9B30" />
                <Text className="text-lg text-white font-semibold">
                  {premiumMembers ? 'Premium member' : 'Get premium'}
                </Text>
                <Iconright name="right" size={20} color="#BF9B30" />
              </TouchableOpacity>
            </ImageBackground>
            <View className="flex flex-row justify-between mx-4 mt-8">
              <TouchableOpacity
                className="p-2 flex flex-col items-start gap-y-2 bg-white border border-neutral-400 rounded-xl"
                style={{minWidth: 35 * vw}}
                onPress={() => {
                  setShowModal(false);
                  navigation.navigate('chats');
                }}>
                <View className="bg-[#f3f4f7] p-2 rounded-full">
                  <Iconlocation
                    name="chat-bubble-outline"
                    size={23}
                    color="#c0c3cd"
                  />
                </View>
                <Text className="text-lg capitalize text-black font-medium">
                  chats
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="p-2 flex flex-col items-start gap-y-2 bg-white border border-neutral-400 rounded-xl relative"
                style={{minWidth: 35 * vw}}
                onPress={() => {
                  setShowModal(false);
                  navigation.navigate('notifications');
                }}>
                <View className="bg-[#f3f4f7] p-2 rounded-full ">
                  <Iconnotification
                    name="notifications-outline"
                    size={23}
                    color="#c0c3cd"
                  />
                </View>
                <View className="flex flex-row">
                  <Text className="text-lg capitalize text-black font-medium">
                    notifications
                  </Text>
                </View>
                {notificationCount >= 1 && (
                  <Text
                    className="bg-red-500 rounded-full absolute top-0 right-1"
                    style={{width: 2 * vw, height: 2 * vw}}></Text>
                )}
              </TouchableOpacity>
            </View>
            <View className="flex flex-col mx-4 mt-8">
              <Text className="border-l-2 pl-2 border-red-600 text-xl text-black font-medium">
                Profile
              </Text>
              <View className="flex flex-col mt-2">
                {userType === 'freelancer' && (
                  <TouchableOpacity
                    className="p-2 border-b-[0.5px] border-slate-400 flex flex-row items-center gap-x-4"
                    onPress={() => {
                      setShowModal(false);
                      navigation.navigate('freelancer-profile', {
                        uid: userDetails.uid,
                      });
                    }}>
                    <View className="bg-[#f3f4f7] p-2 rounded-full">
                      <Icondown name="user-o" size={23} color="#c0c3cd" />
                    </View>
                    <Text className="text-lg capitalize text-black font-medium">
                      my profile
                    </Text>
                  </TouchableOpacity>
                )}
                {userType === 'company' && (
                  <TouchableOpacity
                    className="p-2 border-b-[0.5px] border-slate-400 flex flex-row items-center gap-x-4"
                    onPress={() => {
                      setShowModal(false);
                      navigation.navigate('company-profile', {
                        uid: userDetails.uid,
                      });
                    }}>
                    <View className="bg-[#f3f4f7] p-2 rounded-full">
                      <Icondown name="user-o" size={23} color="#c0c3cd" />
                    </View>
                    <Text className="text-lg capitalize text-black font-medium">
                      my profile
                    </Text>
                  </TouchableOpacity>
                )}
                {userType === 'freelancer' && userDetails.works.length <= 0 && (
                  <TouchableOpacity
                    className="p-2 border-b-[0.5px] border-slate-400 flex flex-row items-center gap-x-4"
                    onPress={() => {
                      setShowModal(false);
                      navigation.navigate('complete-freelancer-profile');
                    }}>
                    <View className="bg-[#f3f4f7] p-2 rounded-full">
                      <Iconleft name="time-slot" size={23} color="#c0c3cd" />
                    </View>
                    <Text className="text-lg capitalize text-black font-medium">
                      complete your profile
                    </Text>
                  </TouchableOpacity>
                )}
                {userType !== 'freelancer' && (
                  <TouchableOpacity
                    className="p-2 border-b-[0.5px] border-slate-400 flex flex-row items-center gap-x-4"
                    onPress={() => {
                      setShowModal(false);
                      navigation.navigate('wishlist', {
                        uid: userDetails.uid,
                      });
                    }}>
                    <View className="bg-[#f3f4f7] p-2 rounded-full">
                      <Icondown name="heart" size={23} color="#c0c3cd" />
                    </View>
                    <Text className="text-lg capitalize text-black font-medium">
                      wishlist
                    </Text>
                  </TouchableOpacity>
                )}
                {userType === 'freelancer' && (
                  <TouchableOpacity
                    className="p-2 border-b-[0.5px] border-slate-400 flex flex-row items-center gap-x-4"
                    onPress={() => {
                      setShowModal(false);
                      navigation.navigate('update-portfolio');
                    }}>
                    <View className="bg-[#f3f4f7] p-2 rounded-full">
                      <Iconleft name="shareable" size={23} color="#c0c3cd" />
                    </View>
                    <Text className="text-lg capitalize text-black font-medium">
                      update portfolio
                    </Text>
                  </TouchableOpacity>
                )}
                {userType === 'company' && (
                  <TouchableOpacity
                    className="p-2 border-b-[0.5px] border-slate-400 flex flex-row items-center gap-x-4"
                    onPress={() => {
                      setShowModal(false);
                      navigation.navigate('post-job');
                    }}>
                    <View className="bg-[#f3f4f7] p-2 rounded-full">
                      <Iconrefund
                        name="post-outline"
                        size={23}
                        color="#c0c3cd"
                      />
                    </View>
                    <Text className="text-lg capitalize text-black font-medium">
                      Post job
                    </Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  className="p-2 border-b-[0.5px] border-slate-400 flex flex-row items-center gap-x-4"
                  onPress={() => {
                    setShowModal(false);
                    navigation.navigate('my-hire-request');
                  }}>
                  <View className="bg-[#f3f4f7] p-2 rounded-full">
                    <Iconlocation
                      name="work-outline"
                      size={23}
                      color="#c0c3cd"
                    />
                  </View>
                  <Text className="text-lg capitalize text-black font-medium">
                    hire request
                  </Text>
                </TouchableOpacity>
                {userType === 'freelancer' && (
                  <TouchableOpacity className="p-2 border-b-[0.5px] border-slate-400 flex flex-row items-center gap-x-4">
                    <View className="bg-[#f3f4f7] p-2 rounded-full">
                      <Iconcrown
                        name="file-check-outline"
                        size={23}
                        color="#c0c3cd"
                      />
                    </View>
                    <Text className="text-lg capitalize text-black font-medium">
                      update portfolio
                    </Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={() => {
                    setShowModal(false);
                    navigation.navigate('my-referral');
                  }}
                  className="p-2 border-b-[0.5px] border-slate-400 flex flex-row items-center gap-x-4">
                  <View className="bg-[#f3f4f7] p-2 rounded-full">
                    <Iconcrown
                      name="account-multiple-outline"
                      size={23}
                      color="#c0c3cd"
                    />
                  </View>
                  <Text className="text-lg capitalize text-black font-medium">
                    my referal
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className="flex flex-col mx-4 mt-8">
              <Text className="border-l-2 pl-2 border-red-600 text-xl text-black font-medium">
                App Information
              </Text>
              <View className="flex flex-col mt-2">
                <TouchableOpacity
                  className="p-2 border-b-[0.5px] border-slate-400 flex flex-row items-center gap-x-4"
                  onPress={() => {
                    setShowModal(false);
                    navigation.navigate('refer-and-earn');
                  }}>
                  <View className="bg-[#f3f4f7] p-2 rounded-full">
                    <Iconrefund name="cash-refund" size={23} color="#c0c3cd" />
                  </View>
                  <Text className="text-lg capitalize text-black font-medium">
                    refer & earn
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="p-2 border-b-[0.5px] border-slate-400 flex flex-row items-center gap-x-4"
                  onPress={() => {
                    setShowModal(false);
                    navigation.navigate('about_us');
                  }}>
                  <View className="bg-[#f3f4f7] p-2 rounded-full">
                    <Iconright name="appstore-o" size={23} color="#c0c3cd" />
                  </View>
                  <Text className="text-lg capitalize text-black font-medium">
                    about us
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="p-2 border-b-[0.5px] border-slate-400 flex flex-row items-center gap-x-4"
                  onPress={() => {
                    setShowModal(false);
                    navigation.navigate('terms-and-condition');
                  }}>
                  <View className="bg-[#f3f4f7] p-2 rounded-full">
                    <Iconrule name="rule" size={23} color="#c0c3cd" />
                  </View>
                  <Text className="text-lg capitalize text-black font-medium">
                    terms &amp; conditions
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="p-2 border-b-[0.5px] border-slate-400 flex flex-row items-center gap-x-4"
                  onPress={() => {
                    setShowModal(false);
                    navigation.navigate('data-protection');
                  }}>
                  <View className="bg-[#f3f4f7] p-2 rounded-full">
                    <Iconcity name="database" size={23} color="#c0c3cd" />
                  </View>
                  <Text className="text-lg capitalize text-black font-medium">
                    data protection
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="p-2 border-b-[0.5px] border-slate-400 flex flex-row items-center gap-x-4"
                  onPress={() => {
                    setShowModal(false);
                    navigation.navigate('privacy-and-policy');
                  }}>
                  <View className="bg-[#f3f4f7] p-2 rounded-full">
                    <Iconrule name="privacy-tip" size={23} color="#c0c3cd" />
                  </View>
                  <Text className="text-lg capitalize text-black font-medium">
                    privacy policy
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="p-2 border-b-[0.5px] border-slate-400 flex flex-row items-center gap-x-4"
                  onPress={() => {
                    setShowModal(false);
                    navigation.navigate('cancellation-and-refund');
                  }}>
                  <View className="bg-[#f3f4f7] p-2 rounded-full">
                    <Iconrefund
                      name="credit-card-refund"
                      size={23}
                      color="#c0c3cd"
                    />
                  </View>
                  <Text className="text-lg capitalize text-black font-medium">
                    cancellation &amp; refund
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="p-2 border-b-[0.5px] border-slate-400 flex flex-row items-center gap-x-4"
                  onPress={() => {
                    setShowModal(false);
                    navigation.navigate('guides-and-reviews');
                  }}>
                  <View className="bg-[#f3f4f7] p-2 rounded-full">
                    <Iconrefund name="guitar-pick" size={23} color="#c0c3cd" />
                  </View>
                  <Text className="text-lg capitalize text-black font-medium">
                    guides &amp; reviews
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="p-2 border-b-[0.5px] border-slate-400 flex flex-row items-center gap-x-4"
                  onPress={() => {
                    setShowModal(false);
                    navigation.navigate('faq');
                  }}>
                  <View className="bg-[#f3f4f7] p-2 rounded-full">
                    <Iconcitytree
                      name="clipboard-question"
                      size={23}
                      color="#c0c3cd"
                    />
                  </View>
                  <Text className="text-lg capitalize text-black font-medium">
                    FAQs
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="p-2 border-b-[0.5px] border-slate-400 flex flex-row items-center gap-x-4"
                  onPress={() => {
                    setShowModal(false);
                    navigation.navigate('submit-city');
                  }}>
                  <View className="bg-[#f3f4f7] p-2 rounded-full">
                    <Iconrefund name="home-city" size={23} color="#c0c3cd" />
                  </View>
                  <Text className="text-lg capitalize text-black font-medium">
                    submit your city
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="p-2 flex flex-row items-center gap-x-4"
                  onPress={handelLogout}>
                  <View className="bg-[#f3f4f7] p-2 rounded-full">
                    <Iconpower name="power" size={23} color="#c0c3cd" />
                  </View>
                  <Text className="text-lg capitalize text-black font-medium">
                    log out
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

export default DrawerNav;

const styles = StyleSheet.create({});
