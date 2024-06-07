import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {vw, vh} from 'react-native-viewport-units';
import {TextInput} from 'react-native-paper';

const SubmitCityScreen = ({navigation}) => {
  const scrollRef = useRef();
  const scrollNavFuction = e => {
    if (e.nativeEvent.contentOffset.y <= 0) {
    } else {
    }
  };
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.measure((x, y) => {
        if (y === 0) {
        }
      });
    }
  }, [scrollRef.current]);

  return (
    <ImageBackground
      source={require('../assets/submit-city.png')}
      resizeMode="cover">
      <ScrollView
        onScroll={scrollNavFuction}
        ref={scrollRef}
        contentContainerStyle={{
          paddingVertical: 15 * vw,
          alignItems: 'center',
        }}>
        <View className="flex flex-col mx-4 gap-y-4">
          <Text style={{fontSize: 7 * vw}} className="font-bold text-black">
            Can&apos;t find us in your city?
          </Text>
          <Text style={{fontSize: 4 * vw}} className="font-semibold text-black">
            Tell us your city name! When you drop your city, it helps us grow
            and serve more places. Your input makes our website better for you
            and others. Thanks for helping us expand!
          </Text>
          <View
            className="flex flex-col items-stretch gap-y-3 py-2 px-4 rounded-lg"
            style={{backgroundColor: 'rgba(0,0,0,0.4)', maxHeight: 70 * vh}}>
            <View className="flex flex-col gap-y-2">
              <Text
                style={{fontSize: 4.7 * vw}}
                className="capitalize text-white font-medium">
                full name
              </Text>
              <TextInput
                placeholder="Enter your full name"
                keyboardType="default"
              />
            </View>
            <View className="flex flex-col gap-y-2">
              <Text
                style={{fontSize: 4.7 * vw}}
                className="capitalize text-white font-medium">
                phone number
              </Text>
              <TextInput
                placeholder="Enter your number"
                keyboardType="number-pad"
              />
            </View>
            <View className="flex flex-col gap-y-2">
              <Text
                style={{fontSize: 4.7 * vw}}
                className="capitalize text-white font-medium">
                city name
              </Text>
              <TextInput
                placeholder="Enter your city name"
                keyboardType="default"
              />
            </View>
            <View className="flex flex-col gap-y-2">
              <Text
                style={{fontSize: 4.7 * vw}}
                className="capitalize text-white font-medium">
                pincode
              </Text>
              <TextInput
                placeholder="Enter your pincode"
                keyboardType="number-pad"
              />
            </View>
            <TouchableOpacity className="bg-orange-500 mx-4 rounded-lg py-2">
              <Text
                className="capitalize font-medium text-center text-white"
                style={{fontSize: 4.7 * vw}}>
                submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default SubmitCityScreen;

const styles = StyleSheet.create({});
