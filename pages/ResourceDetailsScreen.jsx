import {
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import {vw, vh} from 'react-native-viewport-units';
import {SERVER_URL, BUCKET_URL} from '@env';
import HTML from 'react-native-render-html';
const WebDisplay = React.memo(function WebDisplay({html}) {
  return (
    <HTML
      source={{html}}
      contentWidth={100}
      tagsStyles={{
        p: {
          fontSize: 5 * vw,
          lineHeight: 7 * vw,
          fontWeight: '700',
          color: 'black',
        },
      }}
      style={{fontSize: 5 * vw}}
    />
  );
});
const ResourceDetailsScreen = () => {
  const [blogData, setBlogData] = useState({});
  const routes = useRoute();
  const {bloguid} = routes.params;

  async function getBlogData(uid, setFunc) {
    try {
      const resp = await fetch(`${SERVER_URL}/blog/${uid}`);
      const data = await resp.json();
      setFunc(data);
    } catch (error) {
      console.log(error);
    }
  }

  const onShare = async (msg, uid) => {
    try {
      const result = await Share.share(
        {
          message: 'https://fipezo.com/resources/details/' + uid,
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

  useEffect(() => {
    getBlogData(bloguid, setBlogData);
  }, [blogData]);

  return (
    <ScrollView>
      <StatusBar
        animated={true}
        backgroundColor="#973931"
        barStyle={'default'}
        showHideTransition={'fade'}
        hidden={false}
      />
      <View className="pt-16 flex flex-col items-center gap-y-4">
        <View
          style={{aspectRatio: 1 * 1.5, width: 22 * vw, height: 28 * vh}}
          className="relative flex items-center justify-center rounded-lg">
          <FastImage
            source={{
              uri: `${BUCKET_URL}${blogData.cover}`,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
            style={{width: '100%', height: '100%', borderRadius: 8}}
          />
          <Text
            className="text-black capitalize font-semibold px-2 py-1 bg-neutral-100 absolute -bottom-2 left-4 rounded-lg"
            style={{fontSize: 4.5 * vw, elevation: 5}}>
            {blogData.category?.split('_').join(' ')}
          </Text>
        </View>
        <View className="mx-4">
          <Text
            style={{fontSize: 5 * vw}}
            className="text-black font-extrabold leading-6">
            {blogData.title}
          </Text>
        </View>
        <View className="flex self-stretch flex-row items-center justify-between mx-4">
          <View>
            <FastImage
              source={require('../assets/favi.png')}
              resizeMode={FastImage.resizeMode.cover}
              style={{width: 15 * vw, height: 15 * vw, borderRadius: 7.5 * vw}}
            />
          </View>
          <View className="flex flex-col">
            <Text
              className="font-medium text-neutral-600"
              style={{fontSize: 4 * vw}}>
              Mon 23, 2024
            </Text>
            <Text
              className="text-black font-semibold
            "
              style={{fontSize: 4 * vw}}>
              Fipezo Team
            </Text>
          </View>
          <TouchableOpacity
            className="bg-orange-500 rounded"
            onPress={() => onShare(blogData.title, blogData.uid)}
            style={{elevation: 5}}>
            <Text
              style={{fontSize: 4 * vw}}
              className="px-2 py-1 capitalize text-white font-semibold">
              share
            </Text>
          </TouchableOpacity>
        </View>
        <View className="mx-4 flex flex-col">
          {blogData.content && <WebDisplay html={blogData.content} />}
        </View>
      </View>
    </ScrollView>
  );
};

export default ResourceDetailsScreen;

const styles = StyleSheet.create({});
