import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  Linking,
  TouchableOpacity,
  Image,
  BackHandler,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown';
import Iconsearch from 'react-native-vector-icons/AntDesign';
import {SERVER_URL, CAPTCHA_SITE_KEY} from '@env';
import Recaptcha from 'react-native-recaptcha-that-works';
import {vw, vh} from 'react-native-viewport-units';
import BottomNavBar from '../components/BottomNavBar';

const HelpScreen = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [issue, setIssue] = useState('');
  const [message, setMessage] = useState('');
  const [reCaptchaValue, setReCaptchaValue] = useState(null);
  const issues = [
    'User Profile Related',
    'Freelancer Profile Related',
    'Company Profile Related',
    'OTP Related',
    'Refferal Issue',
    'Fraud/Scam',
    'Delete Profile',
    'Update Profile',
    'Other',
  ];

  const recaptchaRef = useRef();

  async function sendEmail(url) {
    try {
      const canOpen = await Linking.canOpenURL(url);
      return await Linking.openURL(url);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        BackHandler.exitApp();
      },
    );

    return () => backHandler.remove();
  }, [BackHandler]);

  const submitIssue = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          email: email,
          issue: issue,
          message: message,
          captcha: reCaptchaValue,
        }),
      });
      const res = await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  const onVerify = token => {
    console.log('success!', token);
    setReCaptchaValue(token);
  };

  const onExpire = () => {
    console.warn('expired!');
  };

  return (
    <>
      <ScrollView contentContainerStyle={{backgroundColor: '#ffffff'}}>
        <StatusBar
          animated={true}
          backgroundColor="#973931"
          barStyle={'default'}
          showHideTransition={'fade'}
          hidden={false}
        />
        <View className="pt-4 flex flex-row items-center justify-center">
          <Text className="text-3xl font-semibold capitalize text-black">
            contact us
          </Text>
        </View>
        <View className="flex flex-col items-stretch justify-center gap-y-2 m-4">
          <View className="flex flex-col gap-y-2">
            <Text className="text-xl font-medium capitalize text-black">
              first name
            </Text>
            <TextInput
              placeholder="enter your first name"
              inputMode="text"
              placeholderTextColor="#000"
              value={firstName}
              onChangeText={text => setFirstName(text)}
              className="border-b"
            />
          </View>
          <View className="flex flex-col gap-y-2">
            <Text className="text-xl font-medium capitalize text-black">
              last name
            </Text>
            <TextInput
              placeholder="enter your last name"
              inputMode="text"
              placeholderTextColor="#000"
              value={lastName}
              onChangeText={text => setLastName(text)}
              className="border-b"
            />
          </View>
          <View className="flex flex-col gap-y-2">
            <Text className="text-xl font-medium capitalize text-black">
              phone
            </Text>
            <TextInput
              placeholder="enter your number"
              inputMode="numeric"
              placeholderTextColor="#000"
              value={phone}
              onChangeText={text => setPhone(text)}
              className="border-b"
            />
          </View>
          <View className="flex flex-col gap-y-2">
            <Text className="text-xl font-medium capitalize text-black">
              email
            </Text>
            <TextInput
              placeholder="enter email address"
              inputMode="email"
              placeholderTextColor="#000"
              value={email}
              onChangeText={text => setEmail(text)}
              className="border-b"
            />
          </View>
          <View className="flex flex-col gap-y-2">
            <Text className="text-xl font-medium capitalize text-black">
              issue
            </Text>
            <SelectDropdown
              data={issues}
              buttonStyle={{
                width: '100%',
                backgroundColor: 'transparent',
                borderBottomWidth: 1,
                borderBottomColor: 'black',
                color: '#000',
              }}
              defaultButtonText={'select your freelance category'}
              rowTextStyle={{textTransform: 'capitalize', color: '#000'}}
              buttonTextStyle={{
                fontSize: 15,
                color: '#000',
                textAlign: 'left',
              }}
              onSelect={(selectedItem, index) => {
                setIssue(selectedItem);
              }}
              search={true}
              searchPlaceHolder={'enter freelancer category'}
              renderSearchInputLeftIcon={() => (
                <Iconsearch name="search1" size={20} color="#000000" />
              )}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item;
              }}
            />
          </View>
          <View className="flex flex-col gap-y-2">
            <Text className="text-xl font-medium capitalize text-black">
              message
            </Text>
            <TextInput
              placeholder="provide description"
              inputMode="email"
              multiline
              className="border h-32"
              placeholderTextColor="#000"
              value={message}
              onTextChange={text => setMessage(text)}
              style={{textAlignVertical: 'top'}}
            />
          </View>
          <View className="my-2">
            <Recaptcha
              ref={recaptchaRef}
              siteKey={CAPTCHA_SITE_KEY}
              baseUrl="https://fipezo.com"
              onVerify={onVerify}
              onExpire={onExpire}
              size="normal"
            />
            <TouchableOpacity
              onPress={() => recaptchaRef.current.open()}
              className="bg-gray-500 rounded-lg">
              <Text className="font-bold text-xl text-white text-center py-2">
                Verify Captcha
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className="w-60 flex items-center justify-center py-2 bg-violet-600 rounded-3xl self-center"
            onPress={submitIssue}>
            <Text className="text-lg capitalize text-white font-bold">
              submit
            </Text>
          </TouchableOpacity>
        </View>
        <View className="my-2 mx-4 flex flex-col items-start gap-y-2">
          <Text className="text-xl capitalize font-semibold text-black">
            customer support
          </Text>
          <View className="flex flex-row flex-wrap gap-x-1">
            <Text className="text-lg text-black">
              If you have any questions, concerns, or feedback, our customer
              support team is ready to assist you. Please email us at
            </Text>
            <TouchableOpacity
              className=""
              onPress={() => sendEmail('mailto:help@fipezo.com')}>
              <Text className="text-lg text-blue-500">help@fipezo.com</Text>
            </TouchableOpacity>
            <Text className="text-lg text-black">for prompt assistance.</Text>
          </View>
        </View>
        <View className="my-2 mx-4 flex flex-col items-start gap-y-2">
          <Text className="text-xl capitalize font-semibold text-black">
            business hours
          </Text>
          <View className="flex flex-col gap-x-2">
            <Text className="text-lg text-black">
              Our customer support team operates during the following business
              hours:
            </Text>
            <Text className="text-lg text-black">
              {'\u2022'} Monday to Saturday: {'('} 10:10 - 18:50 {')'}
            </Text>
            <Text className="text-lg text-black">
              {'\u2022'} Sunday: Closed
            </Text>
          </View>
        </View>
        <View className="my-2 mx-4 flex flex-col items-start gap-y-2">
          <Text className="text-xl capitalize font-semibold text-black">
            Office Address
          </Text>
          <Text className="text-lg text-black">
            2nd Floor, 17/40A, Dakshindari Road, West Bengal, Kolkata 700048
          </Text>
        </View>
        <View className="my-2 mx-4 flex flex-col items-start gap-y-2">
          <Text className="text-xl capitalize font-semibold text-black">
            Social Media
          </Text>
          <Text className="text-lg text-black">
            Stay connected with Fipezo through our social media channels for
            updates and announcements:
          </Text>
          <View className="flex flex-row items-start gap-x-4">
            <TouchableOpacity
              onPress={() =>
                sendEmail(
                  'https://www.facebook.com/fipezo/?show_switched_toast=0&show_invite_to_follow=0&show_switched_tooltip=0&show_podcast_settings=0&show_community_review_changes=0&show_community_rollback=0&show_follower_visibility_disclosure=0',
                )
              }>
              <Image
                source={require('../assets/facebook.png')}
                className="w-12 h-12"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                sendEmail('https://www.instagram.com/fipezoindia')
              }>
              <Image
                source={require('../assets/instagramC.png')}
                className="w-12 h-12"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => sendEmail('https://www.linkedin.com/in/fipezo/')}>
              <Image
                source={require('../assets/linkedinO.png')}
                className="w-12 h-12"
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text className="text-center text-base m-4 text-black">
          We appreciate your trust in Fipezo, and we look forward to serving
          you!
        </Text>
      </ScrollView>
      <View style={styles.bottomNavBox}>
        <BottomNavBar currentIndex={3} />
      </View>
    </>
  );
};

export default HelpScreen;

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
