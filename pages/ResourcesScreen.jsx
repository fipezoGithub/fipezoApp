import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {vw, vh} from 'react-native-viewport-units';
import {SERVER_URL, BUCKET_URL} from '@env';
import Loader from '../components/Loader';
import BottomNavBar from '../components/BottomNavBar';

const ResourcesScreen = ({navigation}) => {
  const [featured, setFeatured] = useState([]);
  const [showFeaturedBox, setShowFeaturedBox] = useState(true);
  const [freelanceInsights, setFreelanceInsights] = useState([]);
  const [showFreelanceInsights, setShowFreelanceInsights] = useState(false);
  const [hiringInsights, setHiringInsights] = useState([]);
  const [showHiringInsights, setShowHiringInsights] = useState(false);
  const [fipezoInsights, setFipezoInsights] = useState([]);
  const [showFipezoInsights, setShowFipezoInsights] = useState(false);
  const [howToGuide, setHowToGuide] = useState([]);
  const [showHowToGuide, setShowHowToGuide] = useState(false);
  const [successStories, setsuccessStories] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function fetchResourcesData(cat, setFunc) {
    try {
      setLoading(true);
      const resp = await fetch(`${SERVER_URL}/blog/category/${cat}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const res = await resp.json();
      setFunc(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (showFeaturedBox) {
      fetchResourcesData('featured', setFeatured);
    } else if (showFreelanceInsights) {
      fetchResourcesData('freelance_insights', setFreelanceInsights);
    } else if (showHiringInsights) {
      fetchResourcesData('hiring_insights', setHiringInsights);
    } else if (showFipezoInsights) {
      fetchResourcesData('fipezo_insights', setFipezoInsights);
    } else if (showHowToGuide) {
      fetchResourcesData('how_to_guide', setHowToGuide);
    } else if (showSuccess) {
      fetchResourcesData('success_stories', setsuccessStories);
    }
  }, [
    showFeaturedBox,
    showFipezoInsights,
    showFreelanceInsights,
    showHiringInsights,
    showHowToGuide,
    showSuccess,
  ]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        BackHandler.exitApp();
      },
    );

    return () => backHandler.remove();
  }, [BackHandler]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <ScrollView
        nestedScrollEnabled
        contentContainerStyle={{
          backgroundColor: '#ffffff',
        }}>
        <StatusBar
          animated={true}
          backgroundColor="#973931"
          barStyle={'default'}
          showHideTransition={'fade'}
          hidden={false}
        />
        <View className="pt-4 flex flex-col gap-y-4 items-center justify-center">
          <Text className="text-3xl font-semibold capitalize text-black">
            Resources
          </Text>
          <Text className="text-xl font-medium text-black">
            Welcome to Fipezo resources
          </Text>
        </View>
        <ScrollView
          nestedScrollEnabled
          contentContainerStyle={{height: '100%'}}
          stickyHeaderIndices={[1]}
          scrollEventThrottle={16}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              backgroundColor: '#fff',
              paddingVertical: 25,
            }}>
            <TouchableOpacity
              className="m-2 p-2 border rounded-lg"
              style={{borderColor: showFeaturedBox ? '#FB923C' : '#000'}}
              onPress={() => {
                setShowFeaturedBox(true);
                setShowFreelanceInsights(false);
                setShowHiringInsights(false);
                setShowFipezoInsights(false);
                setShowHowToGuide(false);
                setShowSuccess(false);
              }}>
              <Text
                style={{
                  color: showFeaturedBox ? '#FB923C' : '#000',
                  fontSize: 15,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  textTransform: 'capitalize',
                }}>
                featured
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="m-2 p-2 border rounded-lg"
              style={{borderColor: showFreelanceInsights ? '#FB923C' : '#000'}}
              onPress={() => {
                setShowFeaturedBox(false);
                setShowFreelanceInsights(true);
                setShowHiringInsights(false);
                setShowFipezoInsights(false);
                setShowHowToGuide(false);
                setShowSuccess(false);
              }}>
              <Text
                style={{
                  color: showFreelanceInsights ? '#FB923C' : '#000',
                  fontSize: 15,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  textTransform: 'capitalize',
                }}>
                freelance insight
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="m-2 p-2 border rounded-lg"
              style={{borderColor: showHiringInsights ? '#FB923C' : '#000'}}
              onPress={() => {
                setShowFeaturedBox(false);
                setShowFreelanceInsights(false);
                setShowHiringInsights(true);
                setShowFipezoInsights(false);
                setShowHowToGuide(false);
                setShowSuccess(false);
              }}>
              <Text
                style={{
                  color: showHiringInsights ? '#FB923C' : '#000',
                  fontSize: 15,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  textTransform: 'capitalize',
                }}>
                hiring insight
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="m-2 p-2 border rounded-lg"
              style={{borderColor: showFipezoInsights ? '#FB923C' : '#000'}}
              onPress={() => {
                setShowFeaturedBox(false);
                setShowFreelanceInsights(false);
                setShowHiringInsights(false);
                setShowFipezoInsights(true);
                setShowHowToGuide(false);
                setShowSuccess(false);
              }}>
              <Text
                style={{
                  color: showFipezoInsights ? '#FB923C' : '#000',
                  fontSize: 15,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  textTransform: 'capitalize',
                }}>
                fipezo insight
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="m-2 p-2 border rounded-lg"
              style={{borderColor: showHowToGuide ? '#FB923C' : '#000'}}
              onPress={() => {
                setShowFeaturedBox(false);
                setShowFreelanceInsights(false);
                setShowHiringInsights(false);
                setShowFipezoInsights(false);
                setShowHowToGuide(true);
                setShowSuccess(false);
              }}>
              <Text
                style={{
                  color: showHowToGuide ? '#FB923C' : '#000',
                  fontSize: 15,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  textTransform: 'capitalize',
                }}>
                how to guide
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="m-2 p-2 border rounded-lg"
              style={{borderColor: showSuccess ? '#FB923C' : '#000'}}
              onPress={() => {
                setShowFeaturedBox(false);
                setShowFreelanceInsights(false);
                setShowHiringInsights(false);
                setShowFipezoInsights(false);
                setShowHowToGuide(false);
                setShowSuccess(true);
              }}>
              <Text
                style={{
                  color: showSuccess ? '#FB923C' : '#000',
                  fontSize: 15,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  textTransform: 'capitalize',
                }}>
                success story
              </Text>
            </TouchableOpacity>
          </ScrollView>
          {showFeaturedBox &&
            featured.map((item, index) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('resource-details', {bloguid: item.uid})
                }
                className="flex items-center justify-center gap-y-2 my-4"
                key={index}>
                <View
                  style={{
                    aspectRatio: 1 * 1.7,
                    width: 23 * vw,
                    height: 23 * vh,
                  }}>
                  <Image
                    source={{uri: `${BUCKET_URL}${item.cover}`}}
                    style={{width: '100%', height: '100%'}}
                  />
                </View>
                <Text className="text-lg font-bold text-black mx-4">
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          {showFreelanceInsights &&
            freelanceInsights.map((item, index) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('resource-details', {bloguid: item.uid})
                }
                className="flex items-center justify-center gap-y-2 my-4"
                key={index}>
                <View
                  style={{
                    aspectRatio: 1 * 1.7,
                    width: 23 * vw,
                    height: 23 * vh,
                  }}>
                  <Image
                    source={{uri: `${BUCKET_URL}${item.cover}`}}
                    style={{width: '100%', height: '100%'}}
                  />
                </View>
                <Text className="text-lg font-bold text-black mx-4">
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          {showHiringInsights &&
            hiringInsights.map((item, index) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('resource-details', {bloguid: item.uid})
                }
                className="flex items-center justify-center gap-y-2 my-4"
                key={index}>
                <View
                  style={{
                    aspectRatio: 1 * 1.7,
                    width: 23 * vw,
                    height: 23 * vh,
                  }}>
                  <Image
                    source={{uri: `${BUCKET_URL}${item.cover}`}}
                    style={{width: '100%', height: '100%'}}
                  />
                </View>
                <Text className="text-lg font-bold text-black mx-4">
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          {showFipezoInsights &&
            fipezoInsights.map((item, index) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('resource-details', {bloguid: item.uid})
                }
                className="flex items-center justify-center gap-y-2 my-4"
                key={index}>
                <View
                  style={{
                    aspectRatio: 1 * 1.7,
                    width: 23 * vw,
                    height: 23 * vh,
                  }}>
                  <Image
                    source={{uri: `${BUCKET_URL}${item.cover}`}}
                    style={{width: '100%', height: '100%'}}
                  />
                </View>
                <Text className="text-lg font-bold text-black mx-4">
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          {showHowToGuide &&
            howToGuide.map((item, index) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('resource-details', {bloguid: item.uid})
                }
                className="flex items-center justify-center gap-y-2 my-4"
                key={index}>
                <View
                  style={{
                    aspectRatio: 1 * 1.7,
                    width: 23 * vw,
                    height: 23 * vh,
                  }}>
                  <Image
                    source={{uri: `${BUCKET_URL}${item.cover}`}}
                    style={{width: '100%', height: '100%'}}
                  />
                </View>
                <Text className="text-lg font-bold text-black mx-4">
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          {showSuccess &&
            successStories.map((item, index) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('resource-details', {bloguid: item.uid})
                }
                className="flex items-center justify-center gap-y-2 my-4"
                key={index}>
                <View
                  style={{
                    aspectRatio: 1 * 1.7,
                    width: 23 * vw,
                    height: 23 * vh,
                  }}>
                  <Image
                    source={{uri: `${BUCKET_URL}${item.cover}`}}
                    style={{width: '100%', height: '100%'}}
                  />
                </View>
                <Text className="text-lg font-bold text-black mx-4">
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </ScrollView>
      <View style={styles.bottomNavBox}>
        <BottomNavBar currentIndex={2} />
      </View>
    </>
  );
};

export default ResourcesScreen;

const styles = StyleSheet.create({
  bottomNavBox: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginHorizontal: 2 * vh,
    marginVertical: 2 * vw,
  },
});
