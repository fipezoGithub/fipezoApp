import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {vw, vh} from 'react-native-viewport-units';

const AboutUsScreens = ({navigation}) => {
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
        <View className="flex items-start gap-y-3">
          <Text
            className="text-black font-bold text-center"
            style={{fontSize: 6 * vw}}>
            Welcome to Fipezo - Empowering Freelancers Worldwide!
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            At Fipezo, we believe that freelancers are the backbone of a dynamic
            and innovative economy. Our platform is designed to provide a
            seamless and empowering experience for talented freelancers like
            you, connecting you with exciting opportunities and helping you
            thrive in the gig economy.
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            Who We Are:
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            Fipezo is a revolutionary online marketplace for freelancers,
            created by a team of passionate professionals who understand the
            challenges and aspirations of independent workers. Our mission is to
            be the go-to platform where freelancers can find meaningful
            projects, gain recognition for their expertise, and build lasting
            relationships with clients across the globe.
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            Our Vision:
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            We envision a world where freelancers can unleash their true
            potential, pursuing their passions and shaping their own destinies.
            We strive to create a community that fosters collaboration,
            encourages creativity, and empowers freelancers to take control of
            their careers.
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            What Sets Us Apart:
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            Diverse Range of Talents: Fipezo boasts a diverse pool of talents,
            covering a wide array of industries and expertise. Whether you're a
            creative artist, a tech guru, a marketing mastermind, or a skilled
            professional in any field, Fipezo is the platform to showcase your
            skills and find projects that align with your strengths.
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            User-Friendly Interface: Our user-friendly platform is designed to
            make your freelancing journey smooth and hassle-free. With an
            intuitive interface and comprehensive features, you can easily
            create a professional profile, search for relevant projects,
            communicate with clients, and get paid securely.
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            Fair and Transparent: At Fipezo, we prioritize fairness and
            transparency. We believe in providing equal opportunities for
            freelancers, ensuring that everyone has an equal chance to shine
            based on their skills and dedication.
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            Supportive Community: Joining Fipezo means becoming part of a
            supportive and inspiring community of freelancers. Share
            experiences, exchange knowledge, and collaborate with fellow
            freelancers, empowering each other to grow and excel in your
            respective fields.
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            Join Us Today:
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            Are you ready to take your freelancing career to new heights?
            Whether you're just starting or a seasoned pro, Fipezo welcomes you
            with open arms. Join our platform today and embark on an exciting
            journey filled with endless opportunities and the freedom to be your
            own boss.
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            Join Fipezo and discover the world of limitless possibilities for
            freelancers like you!
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default AboutUsScreens;

const styles = StyleSheet.create({});
