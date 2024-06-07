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
import Iconstar from 'react-native-vector-icons/AntDesign';
import Iconfollow from 'react-native-vector-icons/AntDesign';
import Iconhire from 'react-native-vector-icons/Feather';
import Iconrate from 'react-native-vector-icons/EvilIcons';
import Iconverified from 'react-native-vector-icons/MaterialIcons';
import Iconprofeesion from 'react-native-vector-icons/Entypo';
import ReviewCard from '../components/ReviewCard';
import {SERVER_URL, BUCKET_URL} from '@env';
import FastImage from 'react-native-fast-image';
import YoutubePlayer from 'react-native-youtube-iframe';
import Loader from '../components/Loader';
import {AuthContext} from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import ImageView from 'react-native-image-viewing';
import ReviewForm from '../components/ReviewForm';

const FreelancerProfileScreen = ({route, navigation}) => {
  const {uid} = route.params;
  const [freelancer, setFreelancer] = useState({});
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showPortfolio, setShowPortfolio] = useState(true);
  const [showReview, setShowReview] = useState(false);
  const [isFollow, setIsFollow] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [showImage, setShowImage] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);

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

  const getYouTubeThumbnail = url => {
    let videoId;
    if (url.includes('/shorts/')) {
      videoId = url.split('/shorts/')[1];
    } else if (url.includes('youtu.be')) {
      videoId = url.split('youtu.be/')[1];
    } else {
      videoId = url.split('v=')[1];
      const ampersandPosition = videoId.indexOf('&');
      if (ampersandPosition !== -1) {
        videoId = videoId.substring(0, ampersandPosition);
      }
    }
    // return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    return videoId;
  };

  async function fetchFreelancerDetails(uid, setFunc) {
    try {
      setIsLoading(true);
      const resp = await fetch(`${SERVER_URL}/profile/freelancer/${uid}`);
      const res = await resp.json();
      setFunc(res);
      setFollowerCount(res.followers.length);
      setFollowingCount(res.following.length);
      if (authData.userDetails?.following?.includes(res._id)) {
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

  async function fetchFreelancerReviews(id, setFunc) {
    try {
      const resp = await fetch(`${SERVER_URL}/reviews/${id}`);
      const res = await resp.json();
      setFunc(res);
    } catch (error) {
      console.warn(error.stack);
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

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      // Reset the screen state here
      setFreelancer({});
      setReviews([]);
    });
    if (Object.keys(freelancer).length === 0) {
      return;
    }
    fetchFreelancerReviews(freelancer._id, setReviews);
    return unsubscribe;
  }, [freelancer]);

  if (isLoading) {
    return <Loader />; // Or a loading indicator
  }

  return (
    <ScrollView
      nestedScrollEnabled
      scrollEventThrottle={16}
      contentContainerStyle={{rowGap: 1.5 * vh, backgroundColor: '#fff'}}>
      <StatusBar
        animated={true}
        backgroundColor="#973931"
        barStyle={'default'}
        showHideTransition={'fade'}
        hidden={false}
      />
      <View
        style={{
          aspectRatio: 1 * 1.7,
          width: 25 * vw,
          height: 28 * vh,
          position: 'relative',
        }}>
        <FastImage
          source={{
            uri: `${BUCKET_URL}${freelancer.coverPicture}`,
            priority: FastImage.priority.normal,
          }}
          style={{width: '100%', height: '100%'}}
          resizeMode={FastImage.resizeMode.cover}
        />
        <FastImage
          source={{
            uri: `${BUCKET_URL}${freelancer.profilePicture}`,
            priority: FastImage.priority.normal,
          }}
          style={{
            width: 35 * vw,
            height: 35 * vw,
            borderRadius: 9999,
            position: 'absolute',
            top: '45%',
            borderWidth: freelancer.premium ? 4 : 0,
            borderColor: '#ff9800',
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
      <View className="flex flex-row items-center flex-wrap mt-4 mx-4">
        <View className="flex flex-row gap-x-2 items-center">
          <Text
            className="text-black font-bold capitalize"
            style={{fontSize: 6.8 * vw}}>
            {freelancer.firstname + ' ' + freelancer.lastname}
          </Text>
          <Iconverified name="verified" size={6 * vw} color="#2c96ea" />
          <View className="bg-green-600 px-1 py-0.5 rounded-lg flex items-center flex-row gap-x-1">
            <Text
              className="text-white font-semibold"
              style={{fontSize: 3 * vw}}>
              {freelancer.rating?.toFixed(1)}
            </Text>
            <Iconstar name="star" size={12} color="#ffffff" />
          </View>
        </View>
      </View>
      <View className="flex flex-row items-center justify-between mx-4">
        <Text
          style={{fontSize: 5 * vw}}
          className="capitalize text-neutral-500">
          <Text style={{color: '#000', fontWeight: '600'}}>
            {followerCount}
          </Text>{' '}
          followers
        </Text>
        <Text
          style={{fontSize: 5 * vw}}
          className="capitalize text-neutral-500">
          <Text style={{color: '#000', fontWeight: '600'}}>
            {followingCount}
          </Text>{' '}
          following
        </Text>
        <Text
          style={{fontSize: 5 * vw}}
          className="capitalize text-neutral-500">
          <Text style={{color: '#000', fontWeight: '600'}}>
            {freelancer.loveCount}
          </Text>{' '}
          love
        </Text>
      </View>
      <View className="flex flex-row flex-wrap mx-4 gap-y-2">
        <View className="flex flex-row items-center bg-pink-600 py-1 px-2 rounded-md mr-1">
          <Iconverified name="location-pin" size={4 * vw} color="#fff" />
          <Text
            className="font-bold text-white capitalize ml-2"
            style={{fontSize: 4.5 * vw}}>
            {freelancer.location}
          </Text>
        </View>
        <View className="flex flex-row items-center bg-red-500 py-1 px-2 rounded-md mx-1">
          <Iconprofeesion name="news" size={4 * vw} color="#fff" />
          <Text
            className="font-bold text-white capitalize ml-2"
            style={{fontSize: 4.5 * vw}}>
            {freelancer.profession
              ?.split('_')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')}
          </Text>
        </View>
        {freelancer.featured && (
          <View className="flex flex-row items-center bg-purple-500 py-1 px-2 rounded-md">
            <Iconverified name="bolt" size={4 * vw} color="#fff" />
            <Text
              className="font-bold text-white capitalize ml-2"
              style={{fontSize: 4.5 * vw}}>
              featured
            </Text>
          </View>
        )}
      </View>
      <View className="flex flex-col gap-y-2 items-start justify-between mx-4">
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
      {freelancer.services && freelancer.services.length > 0 && (
        <View className="flex flex-col gap-y-2 items-start justify-between mx-4">
          <Text
            style={{fontSize: 6 * vw}}
            className="capitalize text-black font-bold">
            my specalities
          </Text>
          <View className="flex flex-row flex-wrap items-center gap-x-2 gap-y-1">
            {freelancer.services.map((item, index) => (
              <Text
                style={{fontSize: 4.5 * vw}}
                key={index}
                className="capitalize text-neutral-700 font-semibold">
                {item.split('_').join(' ')},
              </Text>
            ))}
          </View>
        </View>
      )}
      <View className="flex flex-row items-center justify-center mx-4 bg-blue-500 rounded-lg">
        <Text
          style={{fontSize: 4 * vw}}
          className="font-semibold text-white py-2 capitalize">
          Rs. {freelancer.rate} /{' '}
          {(freelancer.profession === 'actor' ||
            freelancer.profession === 'actress' ||
            freelancer.profession === 'model') &&
            'Shoot'}
          {freelancer.profession === 'influencer' && 'Post'}
          {freelancer.profession === 'fashion_designer' && 'Dress'}
          {(freelancer.profession === 'babysitter' ||
            freelancer.profession === 'maid' ||
            freelancer.profession === 'dance_teacher' ||
            freelancer.profession === 'drawing_teacher' ||
            freelancer.profession === 'music_teacher' ||
            freelancer.profession == 'private_tutor') &&
            'Month'}
          {(freelancer.profession === 'dj' ||
            freelancer.profession == 'musician' ||
            freelancer.profession === 'drone_operator') &&
            'Hour'}
          {(freelancer.profession === 'album_designer' ||
            freelancer.profession === 'dancer' ||
            freelancer.profession === 'graphics_designer' ||
            freelancer.profession === 'interior_designer' ||
            freelancer.profession === 'mehendi_artist' ||
            freelancer.profession === 'painter' ||
            freelancer.profession === 'photo_editor' ||
            freelancer.profession === 'video_editor' ||
            freelancer.profession === 'voice_over_artist' ||
            freelancer.profession === 'anchor' ||
            freelancer.profession === 'lyricist' ||
            freelancer.profession === 'makeup_artist' ||
            freelancer.profession === 'vocalist' ||
            freelancer.profession === 'web_developer') &&
            'Project'}
          {(freelancer.profession === 'cinematographer' ||
            freelancer.profession === 'photographer') &&
            'Day'}
        </Text>
      </View>
      {authData.userDetails.uid !== uid && (
        <View className="flex flex-row items-center justify-between mx-6">
          <TouchableOpacity
            disabled={authData.userType === 'freelancer'}
            className="flex flex-row items-center gap-x-2 bg-green-500 px-2 py-0.5 rounded-lg"
            onPress={() =>
              navigation.navigate('hire-freelancer', {pageData: freelancer})
            }>
            <Iconhire name="user-check" size={4.4 * vw} color="#fff" />
            <Text
              className="font-semibold text-white capitalize"
              style={{fontSize: 4.4 * vw}}>
              hire me
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex flex-row items-center gap-x-2 bg-amber-500 px-2 py-0.5 rounded-lg"
            disabled={authData.userType === 'freelancer'}
            onPress={() => setShowReviewForm(true)}>
            <Iconrate name="star" size={4.4 * vw} color="#fff" />
            <Text
              className="font-semibold text-white capitalize"
              style={{fontSize: 4.4 * vw}}>
              give rating
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <ScrollView
        nestedScrollEnabled
        stickyHeaderIndices={[0]}
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
            <TouchableOpacity
              onPress={() => {
                setShowPortfolio(true);
                setShowReview(false);
              }}>
              <Text
                className={`capitalize font-bold ${
                  showPortfolio ? 'text-orange-500' : 'text-black'
                }`}
                style={{fontSize: 5 * vw}}>
                portfolio
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowPortfolio(false);
                setShowReview(true);
              }}>
              <Text
                className={`capitalize font-bold ${
                  showReview ? 'text-orange-500' : 'text-black'
                }`}
                style={{fontSize: 5 * vw}}>
                reviews
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {showPortfolio && (
          <View className="flex flex-row items-center justify-center gap-x-2 gap-y-1 flex-wrap my-4">
            {freelancer.works?.length <= 0 ? (
              <View className="flex items-center justify-center">
                <FastImage
                  source={require('../assets/no_portfolio_banner.png')}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{width: 55 * vw, height: 35 * vh}}
                />
              </View>
            ) : (
              (freelancer.premium
                ? freelancer.works
                : freelancer.works?.slice(0, 8)
              )?.map((item, idx) =>
                !item.includes('youtu') ? (
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
                ) : (
                  <View key={idx}>
                    <YoutubePlayer
                      apiKey={'AIzaSyBkEyMlngVuFbiad3XulmBJxgi5fj_sQJA'}
                      videoId={getYouTubeThumbnail(item)} // YouTube video ID
                      height={25 * vh}
                      width={85 * vw}
                      style={{alignSelf: 'center'}}
                      webViewProps={{allowsFullscreenVideo: true}}
                      play={false} // control playback of video with true/false
                      fullscreen={true} // control whether the video should play in fullscreen or inline
                      loop={false} // control whether the video should loop when ended
                      onChangeState={e => console.log('onChangeState', e)}
                      onError={e => console.log('on error', e)}
                    />
                  </View>
                ),
              )
            )}
            <ImageView
              images={showImage}
              imageIndex={index}
              visible={visible}
              onRequestClose={() => setVisible(false)}
            />
          </View>
        )}
        {showReview &&
          (reviews.length < 1 ? (
            <View className="flex items-center justify-center">
              <FastImage
                source={require('../assets/no_review.png')}
                resizeMode={FastImage.resizeMode.contain}
                style={{width: 55 * vw, height: 35 * vh}}
              />
            </View>
          ) : (
            reviews.map((item, index) => (
              <ReviewCard review={item} key={index} />
            ))
          ))}
      </ScrollView>
      <ReviewForm
        showReviewForm={showReviewForm}
        setShowReviewForm={setShowReviewForm}
        freelancer={freelancer}
        setReviews={setReviews}
      />
    </ScrollView>
  );
};

export default FreelancerProfileScreen;

const styles = StyleSheet.create({});
