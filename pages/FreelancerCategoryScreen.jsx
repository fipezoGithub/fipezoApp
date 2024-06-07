import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {SERVER_URL} from '@env';
import React, {useEffect, useState} from 'react';
import ProfileCard from '../components/ProfileCard';
import {FlatList} from 'react-native-gesture-handler';
import Loader from '../components/Loader';
import FastImage from 'react-native-fast-image';
import {vw, vh} from 'react-native-viewport-units';
import {useIsFocused} from '@react-navigation/native';

const FreelancerCategoryScreen = ({route, navigation, location}) => {
  const [freelancers, setFreelancers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();

  const {category} = route.params;

  async function fetchFreelancersData(page, cat) {
    try {
      setIsLoading(true);
      const resp = await fetch(
        `${SERVER_URL}/freelancer/professions?q[]=${cat}&loc=${location}&page=${page}&services[]=`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const res = await resp.json();
      res.totalPages == 0 && setCurrentPage(0);
      setTotalPages(res.totalPages);
      res.freelancers.forEach(obj => {
        if (!freelancers.some(item => item._id === obj._id)) {
          setFreelancers(prev => [...prev, obj]);
        }
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setFreelancers([]);
    setCurrentPage(1);
    setTotalPages(0);
  }, [location, !isFocused, category]);

  useEffect(() => {
    if (totalPages === currentPage) {
      return;
    }
    fetchFreelancersData(currentPage, category);
  }, [category, currentPage, location, isFocused]);

  return (
    <FlatList
      data={freelancers}
      style={{backgroundColor: '#fff'}}
      contentContainerStyle={{alignItems: 'center'}}
      keyExtractor={item => item._id}
      initialNumToRender={2}
      ListFooterComponent={isLoading && <Loader />}
      onEndReachedThreshold={2}
      progressViewOffset={12}
      renderItem={({item, index}) => (
        <ProfileCard item={item} navigation={navigation} key={index} />
      )}
      onEndReached={e => {
        if (isFocused && !isLoading && totalPages !== currentPage) {
          setCurrentPage(currentPage + 1);
        }
      }}
      ListHeaderComponent={() => (
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <StatusBar
            animated={true}
            backgroundColor="#973931"
            barStyle={'default'}
            showHideTransition={'fade'}
            hidden={false}
          />
          <View className="pt-4">
            <Text className="text-3xl capitalize text-black font-bold text-center">
              {category.split('_').join(' ') + 's'} in Fipezo
            </Text>
          </View>
        </View>
      )}
      ListEmptyComponent={() => (
        <View className="flex flex-col items-center">
          <FastImage
            source={require('../assets/nobody.webp')}
            style={{width: 70 * vw, height: 65 * vh}}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text
            style={{fontSize: 4.5 * vw}}
            className="text-black mx-4 text-center font-medium">
            No {category.split('_').join(' ')} found. Try to change the
            location.
          </Text>
        </View>
      )}
    />
  );
};

export default FreelancerCategoryScreen;

const styles = StyleSheet.create({});
