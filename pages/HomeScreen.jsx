import {
  Animated,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import Iconfreelancer from 'react-native-vector-icons/Fontisto';
import Iconcompany from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconsearch from 'react-native-vector-icons/AntDesign';
import FreelancersCategory from '../components/FreelancersCategory';
import ProfileCard from '../components/ProfileCard';
import CompanyCard from '../components/CompanyCard';
import Loader from '../components/Loader';
import Iconstar from 'react-native-vector-icons/AntDesign';
import Iconlocation from 'react-native-vector-icons/FontAwesome6';
import {SERVER_URL, BUCKET_URL} from '@env';
import {useIsFocused} from '@react-navigation/native';
import HomeSearch from '../components/HomeSearch';
import Iconverified from 'react-native-vector-icons/MaterialIcons';
import {vw, vh} from 'react-native-viewport-units';
import BottomNavBar from '../components/BottomNavBar';

const HomeScreen = ({location, navigation}) => {
  const [allFreelancers, setAllFreelancers] = useState([]);
  const [featureFreelancers, setFeatureFreelancers] = useState([]);
  const [allCompanies, setAllCompanies] = useState([]);
  const [showFreelancers, setShowFreelancers] = useState(true);
  const [showCompanies, setShowCompanies] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [totalFreelancers, setTotalFreelancers] = useState(0);
  const isFocused = useIsFocused();
  const flatRef = useRef();

  const memoCurrentPage = useMemo(() => {
    return currentPage + 1;
  }, [currentPage]);

  async function fetchFreelancersData(page) {
    try {
      setIsLoading(true);
      const resp = await fetch(
        `${SERVER_URL}/profiles/verified/freelancer?loc=${location}&page=${page}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const res = await resp.json();
      setTotalPages(res.totalPages);
      setTotalFreelancers(res.freelancersNumber);
      res.freelancers.forEach(obj => {
        if (!allFreelancers.some(item => item._id === obj._id)) {
          setAllFreelancers(prev => [...prev, obj]);
        }
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchCompanyData() {
    try {
      const resp = await fetch(`${SERVER_URL}/profiles/verified/companies`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const res = await resp.json();
      setAllCompanies(res);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchFeaturedFreelancers(setFunc) {
    try {
      const resp = await fetch(`${SERVER_URL}/profiles/featured/freelancer`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const res = await resp.json();
      setFunc(res);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setCurrentPage(0);
    setAllFreelancers([]);
    setAllCompanies([]);
    setTotalFreelancers(0);
  }, [location, !showFreelancers, !showCompanies]);

  useEffect(() => {
    if (!isFocused) {
      return;
    }
    fetchFeaturedFreelancers(setFeatureFreelancers);
    if (showFreelancers) fetchFreelancersData(memoCurrentPage);
    if (showCompanies) fetchCompanyData();
  }, [currentPage, showFreelancers, showCompanies, isFocused, location]);

  return (
    <>
      <FlatList
        data={showFreelancers ? allFreelancers : allCompanies}
        ref={flatRef}
        keyExtractor={item => item._id}
        initialNumToRender={2}
        scrollEventThrottle={16}
        onEndReached={() => {
          if (showFreelancers && !isLoading && totalPages >= memoCurrentPage) {
            setCurrentPage(currentPage + 1);
          }
        }}
        onEndReachedThreshold={2}
        progressViewOffset={12}
        renderItem={({item, index}) =>
          showFreelancers ? (
            <ProfileCard item={item} navigation={navigation} key={index} />
          ) : (
            <CompanyCard company={item} key={index} navigation={navigation} />
          )
        }
        ListFooterComponent={isLoading && <Loader />}
        ListHeaderComponent={() => (
          <View style={{flex: 1}}>
            <StatusBar
              animated={true}
              backgroundColor="#973931"
              barStyle={'default'}
              showHideTransition={'fade'}
              hidden={false}
            />
            <ImageBackground
              source={require('../assets/headerIMGBg.jpeg')}
              className="h-[35vh] flex flex-col items-center"
              resizeMode="cover">
              <TouchableOpacity
                className="bg-white rounded-2xl px-2 flex flex-row items-center gap-x-2 my-24"
                style={{width: 90 * vw}}
                onPress={() => setShowModal(true)}>
                <Iconsearch name="search1" size={20} color="#f61841" />
                <Text className="py-4 text-black">
                  Search for{' '}
                  <Animated.Text>freelancers, categories</Animated.Text>
                </Text>
              </TouchableOpacity>
              <HomeSearch showModal={showModal} setShowModal={setShowModal} />
            </ImageBackground>
            <View className="flex flex-col items-center justify-center mt-4">
              <Text className="text-xl uppercase tracking-widest text-black">
                freelancer categories
              </Text>
              <FreelancersCategory />
            </View>
            <View className="flex flex-col items-center justify-center my-4 gap-y-4">
              <Text className="text-xl uppercase tracking-widest text-black">
                featured freelancer
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {featureFreelancers.length > 0 &&
                  featureFreelancers.map((item, index) => (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('freelancer-profile', {
                          uid: item.uid,
                        })
                      }
                      className="flex flex-row bg-white rounded-r-md mx-4 overflow-hidden"
                      style={{elevation: 5}}
                      key={index}>
                      <View className="relative">
                        <Image
                          src={`${BUCKET_URL}${item.profilePicture}`}
                          className="w-28 h-28 rounded-l-md"
                          resizeMode="contain"
                        />
                        <View className="bg-green-600 px-1 py-0.5 rounded-lg flex items-center flex-row gap-x-1 absolute bottom-1 left-2">
                          <Text className="text-sm capitalize font-semibold text-white">
                            {item.rating.toFixed(1)}
                          </Text>
                          <Iconstar name="star" size={10} color="#ffffff" />
                        </View>
                      </View>
                      <View className="flex flex-col justify-between h-24 mx-4">
                        <View>
                          <View className="flex flex-row items-center gap-x-1">
                            <Text className="text-base capitalize font-semibold text-black">
                              {item.firstname + ' ' + item.lastname}
                            </Text>
                            <Iconverified
                              name="verified"
                              size={12}
                              color="#2c96ea"
                            />
                          </View>
                          <Text className="text-sm capitalize font-semibold text-neutral-600">
                            {item.profession
                              .split('_')
                              .map(
                                word =>
                                  word.charAt(0).toUpperCase() + word.slice(1),
                              )
                              .join(' ')}
                          </Text>
                        </View>
                        <View className="flex flex-row items-center gap-x-1">
                          <Iconlocation
                            name="location-dot"
                            size={12}
                            color="#ff0000"
                          />
                          <Text className="font-semibold text-neutral-600">
                            {item.location
                              .split('_')
                              .map(
                                word =>
                                  word.charAt(0).toUpperCase() + word.slice(1),
                              )
                              .join(' ')}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
              </ScrollView>
            </View>
            <View className="flex flex-col items-center justify-center mt-4 gap-y-4">
              <Text className="text-xl uppercase tracking-widest text-black">
                Explore
              </Text>
              <View className="flex flex-row gap-x-8">
                <TouchableOpacity
                  className="flex flex-row items-center gap-x-2 border px-2 py-0.5 rounded-lg"
                  style={{borderColor: showFreelancers ? '#FB923C' : '#475569'}}
                  onPress={() => {
                    setShowCompanies(false);
                    setShowFreelancers(true);
                    setAllCompanies([]);
                  }}>
                  <Iconfreelancer
                    name="person"
                    size={20}
                    color={showFreelancers ? '#FB923C' : '#475569'}
                  />
                  <Text
                    className="text-xl"
                    style={{color: showFreelancers ? '#FB923C' : '#475569'}}>
                    Freelancer
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex flex-row items-center gap-x-2 border px-2 py-0.5 rounded-lg"
                  onPress={() => {
                    setShowCompanies(true);
                    setShowFreelancers(false);
                    setAllFreelancers([]);
                    setCurrentPage(0);
                  }}
                  style={{borderColor: showCompanies ? '#FB923C' : '#475569'}}>
                  <Iconcompany
                    name="office-building"
                    size={20}
                    color={showCompanies ? '#FB923C' : '#475569'}
                  />
                  <Text
                    className="text-xl"
                    style={{color: showCompanies ? '#FB923C' : '#475569'}}>
                    Company
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {showFreelancers && (
              <View className="my-4">
                <Text
                  className="text-center text-neutral-600 font-semibold"
                  style={{fontSize: 5 * vw}}>
                  {totalFreelancers} freelancers nearby
                </Text>
              </View>
            )}
          </View>
        )}
      />
      <View style={styles.bottomNavBox}>
        <BottomNavBar currentIndex={0} />
      </View>
    </>
  );
};

export default HomeScreen;

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
