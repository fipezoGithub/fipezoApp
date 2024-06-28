import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {vw, vh} from 'react-native-viewport-units';
import FastImage from 'react-native-fast-image';

const GuidesAndReviews = ({navigation}) => {
  return (
    <ScrollView
      contentContainerStyle={{
        minHeight: 100 * vh,
        maxWidth: 100 * vw,
        backgroundColor: '#ffffff',
      }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          rowGap: 15,
          justifyContent: 'center',
          marginHorizontal: 15,
          paddingVertical: 15 * vw,
        }}>
        <View className="flex items-center gap-y-3">
          <FastImage
            source={require('../assets/guidesX.jpg')}
            resizeMode={FastImage.resizeMode.contain}
            style={{width: 50 * vw, height: 25 * vh}}
          />
          <Text
            className="text-black font-bold text-center"
            style={{fontSize: 6 * vw}}>
            Fipezo - Your Comprehensive Guide and Review for Freelancers
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            Introduction:
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            Welcome to Fipezo, the ultimate online platform designed exclusively
            for freelancers! If you're a freelancer looking to navigate the vast
            and dynamic world of remote work, you've come to the right place.
            Fipezo is your go-to resource for comprehensive guides and unbiased
            reviews, empowering you to make informed decisions that will boost
            your freelancing career to new heights.
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            Overview of Fipezo:
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            Fipezo is a cutting-edge website that caters to freelancers from all
            walks of life, regardless of their niche or expertise. Our platform
            aims to simplify the freelancing experience, providing essential
            tools, insights, and valuable resources to help freelancers thrive
            in today's competitive gig economy.
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            The Freelancer's Starter Guide:
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            Whether you're just beginning your freelancing journey or are an
            experienced pro, Fipezo's Starter Guide has something for everyone.
            This section covers everything you need to know about freelancing,
            including how to create a standout profile, price your services
            effectively, find your target market, and deal with common
            challenges faced by freelancers.
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            Niche-Specific Guides:
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            Fipezo takes a personalized approach to freelancing by offering
            niche-specific guides tailored to your area of expertise. Whether
            you're a photographer, Cinematographer, Drone Operator, or any other
            type of freelancer, you'll find valuable tips, tricks, and
            strategies to excel in your chosen field.
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            Freelancer Tools and Resources:
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            Fipezo understands the significance of having the right tools at
            your disposal. In this section, we've curated a comprehensive list
            of must-have tools and resources to optimize your productivity and
            streamline your freelance operations. From project management
            software to invoicing platforms, we've got you covered.
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            Reviewing Freelancer Platforms:
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            With so many freelancer platforms available today, it can be
            challenging to identify the best one for your needs. Fipezo's team
            of experts conducts impartial reviews of various freelancing
            platforms, analyzing their features, fees, user experience, and
            overall effectiveness. This way, you can make well-informed
            decisions when choosing the platform that aligns best with your
            goals.
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            Community and Support:
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            At Fipezo, we believe in the power of a strong freelancer community.
            Connect with like-minded individuals, share your experiences, seek
            advice, and offer support to others on the same journey. Our
            interactive forums and chat groups create a nurturing environment
            for collaboration and growth.
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            Conclusion:
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            Fipezo is your one-stop destination for all things freelancing.
            Whether you're a beginner exploring the world of remote work or a
            seasoned freelancer seeking to expand your horizons, Fipezo's guides
            and reviews will equip you with the knowledge and resources you need
            to succeed in your freelance career. Join Fipezo today and unlock
            the full potential of your freelancing journey!
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default GuidesAndReviews;

const styles = StyleSheet.create({});
