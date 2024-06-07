import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {vw, vh} from 'react-native-viewport-units';

const DataProtection = ({navigation}) => {
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
            User Data Safe Commitment by FIPEZO Website
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            At FIPEZO, we prioritize the security and privacy of our users&apos;
            data. We are committed to maintaining the highest standards of data
            protection to ensure that your personal information remains safe and
            secure. Our commitment to safeguarding your data is reflected in the
            following principles:
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            Data Encryption:
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            We employ industry-standard encryption protocols to protect the
            transmission and storage of your data. This ensures that any data
            you share with us remains confidential and cannot be accessed by
            unauthorized parties.
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            Secure Data Storage:
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            All user data is stored in highly secure data centres with strict
            access controls. We regularly review and update our security
            measures to stay ahead of potential threats.
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            Limited Access:
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            Only authorized personnel with a genuine need to access your data,
            such as for customer support or technical assistance, will be
            allowed to do so. All our employees undergo extensive training on
            data protection and privacy.
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            No Third-Party Sharing:
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            We do not sell, trade, or rent your personal information to third
            parties. Your data is used solely to provide you with the services
            you have requested from us.
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            Anonymized Analytics:
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            We may use anonymized data for analytical purposes to improve our
            services and user experience. However, this data will never contain
            any personally identifiable information.
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            Consent-Based Communication:
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            We will always seek your explicit consent before sending you any
            marketing or promotional materials. You have full control over the
            communication preferences and can opt out at any time.
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            Compliance with Laws:
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            We strictly adhere to all applicable data protection and privacy
            laws to ensure that your rights are protected.
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            Regular Security Audits:
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            We conduct regular security audits and vulnerability assessments to
            identify and address potential weaknesses in our systems.
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            User Account Security:
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            We encourage users to create strong and unique passwords for their
            accounts. Additionally, we offer optional two-factor authentication
            for an added layer of security.
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            Transparency and Communication:
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            In the event of any data breach or security incident, we will
            promptly notify affected users and take necessary measures to
            rectify the situation.
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            Your trust is of utmost importance to us. We are continuously
            working to enhance our data security practices and welcome feedback
            from our users to further improve our measures.
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            Thank you for choosing FIPEZO. We remain committed to protecting
            your data and providing you with a safe and secure online
            experience.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default DataProtection;

const styles = StyleSheet.create({});
