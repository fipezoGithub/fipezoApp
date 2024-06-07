import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {vw, vh} from 'react-native-viewport-units';

const PrivacyPolicy = ({navigation}) => {
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
          <Text className="text-black font-bold" style={{fontSize: 6 * vw}}>
            Privacy Policy of Fipezo Website
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            Welcome to Fipezo! This Privacy Policy explains how we collect, use,
            disclose, and safeguard your personal information when you use our
            website &#40;www.fipezo.com&#41; and the services offered through
            it. We are committed to protecting your privacy and ensuring that
            your personal information is handled responsibly and in accordance
            with applicable data protection laws. By accessing and using our
            website, you consent to the practices described in this Privacy
            Policy.
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            Information We Collect:
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            At Fipezo, we understand the importance of your privacy, and we
            strive to ensure the confidentiality and security of your personal
            information. When you use our platform, we may collect the following
            information:
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            User Information:
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            Basic details such as name, email address, and contact information
            to create and manage your account.
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            Pitch Information:
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            Descriptions and pitches provided by users to showcase their skills
            and expertise.
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            How We Collect Information
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            We collect information through the following means:
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            User Input:
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            Information is provided directly by users during the account
            creation process and while creating pitches.
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            Automated Technologies:
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            We may use cookies and similar technologies to collect data about
            your interactions with our platform.
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            How We Use Collected Information
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            The information we collect is used for the following purposes:
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            Account Management:
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            To create and manage your Fipezo account.
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            Matching Services:
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            To connect freelance artists with clients and companies seeking
            their services.
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            Communication:
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            To communicate with users about their accounts, projects, and
            platform updates.
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            Keeping Information Safe:
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            Fipezo employs industry-standard security measures to safeguard your
            information. We use encryption, secure data storage, and access
            controls to protect against unauthorized access or disclosure.
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            Information Sharing with Third Parties
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            Fipezo prioritizes your privacy, and we do not sell, trade, or
            otherwise transfer your personal information to third parties. We
            may share information with trusted partners solely to provide and
            improve our services.
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            Trust and Safety:
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            Fipezo is committed to being a trustworthy and secure platform for
            freelance collaboration. We value the trust you place in us when
            sharing your information, and we continuously strive to maintain the
            highest standards of data protection.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({});
