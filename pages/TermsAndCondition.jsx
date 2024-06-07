import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {vw, vh} from 'react-native-viewport-units';

const TermsAndCondition = ({navigation}) => {


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
            Terms &amp; Conditions for Fipezo - Freelance Platform
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            Introducing Fipezo, a freelancing platform that establishes
            connections between proficient freelancers and clients seeking their
            services. These Terms & Conditions meticulously regulate your
            utilization of the Fipezo website and all associated services, all
            of which are provided by Fipezo—a subsidiary owned and managed by
            NOZZE ARTE PRIVATE LIMITED, the parent company of Fipezo. By
            accessing or utilizing our Website and Services, you hereby consent
            to be bound by these Terms.
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            Contact Information:
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            For any inquiries or concerns regarding our Terms and Conditions,
            please contact us at: help@fipezo.com
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            Effective Date
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            These Terms and Conditions are effective as of the date mentioned
            above and apply to all users of the Fipezo platform.
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            Limitation of Liability
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            Fipezo strives to provide a reliable and secure platform, but we
            cannot guarantee uninterrupted or error-free service. By using our
            platform, you agree that Fipezo and its affiliates shall not be
            liable for any direct, indirect, incidental, consequential, or
            exemplary damages, including but not limited to, damages for loss of
            profits, goodwill, use, data, or other intangible losses.
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            Disclaimer of Warranties:
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            Fipezo provides its services on an &quot;as is&quot; and &quot;as
            available&quot; basis. We do not make any warranties, expressed or
            implied, regarding the quality, accuracy, or reliability of our
            platform. Fipezo disclaims all warranties of any kind, whether
            express or implied, including but not limited to the implied
            warranties of merchantability, fitness for a particular purpose, and
            non-infringement.
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            Rules of Conduct:
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            Users of Fipezo are expected to adhere to the following rules of
            conduct:
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            Professionalism:
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            Treat all users with respect and maintain a professional demeanor in
            all communications.
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            Accuracy:
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            Provide accurate and truthful information in your profile, pitches,
            and communications.
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            Compliance:
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            Abide by all applicable laws and regulations while using the Fipezo
            platform.
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            Non-Discrimination:
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            Do not engage in any discriminatory practices based on race, gender,
            religion, or any other protected characteristic.
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            User Restrictions:
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            To ensure a positive and secure environment, Fipezo imposes the
            following user restrictions:
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            Age Limit:
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            Users must be at least 18 years old to create an account on Fipezo.
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            Account Responsibility:
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            Users are responsible for maintaining the confidentiality of their
            account credentials and are liable for any activities conducted
            through their accounts.
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            Prohibited Activities:
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            Users must not engage in any activities that violate the law,
            infringe on the rights of others, or violate these Terms and
            Conditions.
          </Text>
        </View>

        <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
          By using the Fipezo platform, you acknowledge that you have read,
          understood, and agree to these Terms & Conditions. If you have any
          questions or concerns, please contact us at help@fipezo.com.
        </Text>
      </View>
    </ScrollView>
  );
};

export default TermsAndCondition;

const styles = StyleSheet.create({});
