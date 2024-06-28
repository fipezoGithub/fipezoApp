import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {vw, vh} from 'react-native-viewport-units';

const CancellationAndRefund = ({navigation}) => {
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
            Returns and Exchanges
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            We understand that circumstances may arise where you need to cancel
            or request a refund for a service on Fipezo. Our Cancellation and
            Refund Policy is designed to provide clarity on the process.
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            1. Eligibility for Returns or Exchanges
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            Services on Fipezo may be eligible for return or exchange under the
            following conditions:
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            Cancellation Period:
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            Users may cancel a project within 7 days of the purchase date.
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            Refund Period:
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            Refund requests must be initiated within 7 days of the purchase
            date.
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            2. How to Initiate a Return or Exchange
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            To initiate a cancellation, return, or exchange, please contact our
            customer support team at help@fipezo.com Provide your order details,
            including the project name and purchase date, along with a brief
            description of the reason for cancellation or refund. Our customer
            support team will guide you through the process and address any
            questions or concerns you may have.
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            3. Refund Processing Time
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            Once a return or refund request is approved, the processing time for
            refunds is typically 3-5 days. Please note that the exact time may
            vary depending on your payment method and financial institution.
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            4. Exceptions
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            Certain circumstances may affect the eligibility for returns or
            exchanges, and we reserve the right to make exceptions on a
            case-by-case basis. This includes but is not limited to cases of
            fraud, misuse, or violations of our Terms and Conditions.
          </Text>
        </View>
        <View className="flex items-start gap-y-3">
          <Text className="text-black font-bold" style={{fontSize: 5.5 * vw}}>
            5. Changes to the Cancellation and Refund Policy
          </Text>
          <Text className="text-black font-medium" style={{fontSize: 4.5 * vw}}>
            Fipezo reserves the right to modify or update this Cancellation and
            Refund Policy at any time. Changes will be effective immediately
            upon posting on our website. It is the responsibility of users to
            review this policy periodically for any updates.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default CancellationAndRefund;

const styles = StyleSheet.create({});
