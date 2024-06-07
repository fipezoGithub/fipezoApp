import {
  Animated,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useRef, useState} from 'react';
import Iconmail from 'react-native-vector-icons/Feather';
import Iconphone from 'react-native-vector-icons/AntDesign';
import Icongoogle from 'react-native-vector-icons/AntDesign';
import Iconfacebook from 'react-native-vector-icons/FontAwesome';
import {SERVER_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../context/AuthContext';
import SMSRetriever from 'react-native-sms-retriever';
import {HelperText} from 'react-native-paper';
import {LoginManager} from 'react-native-fbsdk';
import {vw, vh} from 'react-native-viewport-units';
import ForgetPassword from '../components/ForgetPassword';

const LoginScreen = ({navigation, gooleSignin}) => {
  const [loginPhone, setLoginPhone] = useState(false);
  const [loginEmail, setLoginEmail] = useState(false);
  const [type, setType] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailLoginError, setEmailLoginError] = useState(false);
  const [phone, setPhone] = useState('');
  const [sendOTP, setSendOTP] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [otp, setOtp] = useState('');
  const [count, setCount] = useState(30);
  const [timerId, setTimerId] = useState(null);
  const [forgetPasswordModal, setForgetPasswordModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const translateXEmail = useRef(new Animated.Value(500)).current;
  const translateXPhone = useRef(new Animated.Value(500)).current;

  const {dispatch} = useContext(AuthContext);

  const slideInEmail = () => {
    Animated.timing(translateXEmail, {
      toValue: 0, // Move to center
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const slideOutEmail = () => {
    Animated.timing(translateXEmail, {
      toValue: 500, // Move to right
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const slideInPhone = () => {
    Animated.timing(translateXPhone, {
      toValue: 0, // Move to center
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const slideOutPhone = () => {
    Animated.timing(translateXPhone, {
      toValue: 500, // Move to right
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const signIn = async () => {
    try {
      await gooleSignin.hasPlayServices();
      const userInfo = await gooleSignin.signIn();
      const {user} = userInfo;
      const response = await fetch(`${SERVER_URL}/email/login/social`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          type: 'login',
        }),
      });
      if (response.status === 403) {
        console.log('error: ');
      }
      const data = await response.json();
      if (data.message) {
      } else {
        await AsyncStorage.setItem('token', data.token);
        dispatch({type: 'isLoggedIn'});
        navigation.navigate('Explore');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handelEmailLogin = async () => {
    if (email.length <= 0 || password.length <= 0) {
      return;
    }
    setLoading(true);
    try {
      const resp = await fetch(`${SERVER_URL}/email/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          type: type,
        }),
      });
      const respData = await resp.json();
      if (!resp.ok) {
        setEmailLoginError(true);
        return;
      }
      await AsyncStorage.setItem('token', respData.token);
      dispatch({type: 'isLoggedIn'});
      navigation.navigate('Explore');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const startCountdown = () => {
    setCount(30);
    setTimerId(
      setInterval(() => {
        setCount(prevCount => prevCount - 1);
      }, 1000),
    );
  };

  async function getOTP() {
    try {
      const response = await fetch(`${SERVER_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: phone,
          type: 'login',
        }),
      });
      if (response.status !== 200) {
        setOtpError(true);
        return;
      }
      setSendOTP(true);
      startCountdown();
      retrieveOTP();
    } catch (error) {
      console.error(error);
    }
  }

  const handelPhoneLogin = async () => {
    try {
      if (!sendOTP) {
        await getOTP();
      } else {
        setLoading(true);
        const response = await fetch(`${SERVER_URL}/otp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            otp: otp,
            phone: phone,
            type: 'login',
          }),
        });
        const data = await response.json();
        await AsyncStorage.setItem('token', data.token);
        dispatch({type: 'isLoggedIn'});
        setLoading(false);
        navigation.navigate('Explore');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const retrieveOTP = async () => {
    try {
      const registered = await SMSRetriever.startSmsRetriever();
      if (registered) {
        SMSRetriever.addSmsListener(event => {
          if (event.message) {
            const getotp = event.message.match(/\d{6}/)[0]; // Extract 6-digit OTP
            console.log('OTP:', getotp);
            setOtp(getotp);
          }
        });
      }
    } catch (error) {
      console.error('Failed to start SMS retriever', error);
    } finally {
      SMSRetriever.removeSmsListener();
    }
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="height">
      <ImageBackground
        source={require('../assets/bg1.jpg')}
        resizeMode="repeat"
        className="mt-8 flex-1 flex-col items-center justify-evenly gap-y-4 bg-white relative"
        style={{maxHeight: 100 * vh}}>
        <View className="flex items-center justify-center gap-y-2">
          <Text className="text-5xl font-bold text-black">Welcome</Text>
          <Text className="text-2xl text-black">Log In To Your Account</Text>
        </View>
        <View className="flex items-center gap-y-8">
          <TouchableOpacity
            onPress={() => {
              setLoginPhone(false);
              setLoginEmail(true);
              slideInEmail();
            }}
            className="flex flex-row items-center justify-center rounded-3xl gap-x-2 border border-black py-2 w-60">
            <Iconmail name="mail" size={24} color="#000000" />
            <Text className="text-xl capitalize text-black">
              login with email
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setLoginEmail(false);
              setLoginPhone(true);
              slideInPhone();
            }}
            className="flex flex-row items-center justify-center rounded-3xl gap-x-2 border border-black py-2 w-60">
            <Iconphone name="phone" size={24} color="#000000" />
            <Text className="text-xl capitalize text-black">
              login with phone
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex items-center flex-row gap-x-4 self-end mr-4">
          <Text className="uppercase text-black">or use</Text>
          <TouchableOpacity onPress={signIn}>
            <Icongoogle name="google" size={48} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              LoginManager.logInWithPermissions(['public_profile']).then(
                function (result) {
                  if (result.isCancelled) {
                    console.log('Login cancelled');
                  } else {
                    console.log(
                      'Login success with permissions: ' +
                        result.grantedPermissions.toString(),
                    );
                  }
                },
                function (error) {
                  console.log('Login fail with error: ' + error);
                },
              )
            }>
            <Iconfacebook name="facebook" size={48} color="#000000" />
          </TouchableOpacity>
        </View>
        <View className="flex items-center flex-row gap-x-2">
          <Text className="text-base text-black">
            Don&apos;t have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text className="text-base text-blue-600 font-bold">
              sign up now
            </Text>
          </TouchableOpacity>
        </View>

        {loginPhone && (
          <Animated.View
            style={{
              transform: [{translateX: translateXPhone}],
              minHeight: 40 * vh,
              position: 'absolute',
              bottom: 25 * vh,
              left: 0,
              right: 0,
              borderRadius: 24,
              backgroundColor: '#EDE9FE',
              alignItems: 'center',
              paddingVertical: 16,
              paddingHorizontal: 24,
              marginHorizontal: 24,
              elevation: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: '#000',
                  marginLeft: 16,
                }}>
                Login with phone
              </Text>
              <TouchableOpacity
                onPress={slideOutPhone}
                style={{
                  marginRight: 16,
                  position: 'absolute',
                  top: -0.5 * vh,
                  right: -5.5 * vw,
                }}>
                <Iconphone name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: 0.2 * vw,
                width: '100%',
                backgroundColor: '#737373',
                marginVertical: 8,
              }}
            />
            <View style={{alignItems: 'center', width: '100%'}}>
              <TextInput
                placeholder="eg:1234567890"
                maxLength={10}
                style={{
                  width: '75%',
                  fontSize: 18,
                  borderBottomWidth: 1,
                  borderBottomColor: '#737373',
                  paddingLeft: 8,
                  color: '#000',
                  marginBottom: 16,
                }}
                value={phone}
                placeholderTextColor="#000"
                onChangeText={text => {
                  setOtpError(false);
                  setPhone(text);
                }}
                keyboardType="numeric"
              />
              <HelperText
                type="error"
                visible={otpError}
                style={{fontSize: 14, color: '#D32F2F'}}>
                User not found
              </HelperText>
              <TextInput
                placeholder="enter OTP"
                editable={sendOTP}
                value={otp}
                placeholderTextColor="#000"
                onChangeText={text => setOtp(text)}
                maxLength={6}
                style={{
                  width: '75%',
                  fontSize: 18,
                  borderBottomWidth: 1,
                  borderBottomColor: '#737373',
                  paddingLeft: 8,
                  color: '#000',
                  marginBottom: 16,
                }}
                keyboardType="numeric"
              />
              {!sendOTP ? (
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#000',
                    alignSelf: 'flex-end',
                    marginBottom: 16,
                  }}>
                  {count}s
                </Text>
              ) : (
                <TouchableOpacity
                  style={{alignSelf: 'flex-end', marginBottom: 16}}>
                  <Text
                    style={{fontSize: 16, fontWeight: 'bold', color: '#000'}}>
                    Resend OTP
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={handelPhoneLogin}
                style={{
                  width: '75%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 12,
                  backgroundColor: '#7C3AED',
                  borderRadius: 24,
                }}>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: '#FFF'}}>
                  {sendOTP ? 'Submit' : 'Get OTP'}
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}

        {loginEmail && (
          <Animated.View
            style={{
              transform: [{translateX: translateXEmail}],
              height: '45vh',
              position: 'absolute',
              bottom: 25 * vh,
              borderRadius: 24,
              backgroundColor: '#EDE9FE',
              alignItems: 'center',
              paddingVertical: 16,
              paddingHorizontal: 24,
              marginHorizontal: 24,
              elevation: 5,
              justifyContent: 'space-evenly',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: 75 * vw,
                position: 'relative',
              }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: '#000',
                  marginLeft: 16,
                }}>
                Login with email
              </Text>
              <TouchableOpacity
                onPress={slideOutEmail}
                style={{
                  marginRight: 16,
                  position: 'absolute',
                  top: -0.5 * vh,
                  right: -5.5 * vw,
                }}>
                <Iconphone name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: 0.5,
                width: '100%',
                backgroundColor: '#737373',
                marginVertical: 8,
              }}
            />
            <View style={{alignItems: 'center', width: '100%'}}>
              <TextInput
                placeholder="eg:abc@xyz.com"
                placeholderTextColor="#000"
                style={{
                  width: '75%',
                  fontSize: 18,
                  borderBottomWidth: 1,
                  borderBottomColor: '#737373',
                  paddingLeft: 8,
                  color: '#000',
                  marginBottom: 16,
                }}
                keyboardType="email-address"
                value={email}
                onChangeText={text => {
                  setEmailLoginError(false);
                  setEmail(text);
                }}
              />
              <TextInput
                placeholder="enter password"
                placeholderTextColor="#000"
                style={{
                  width: '75%',
                  fontSize: 18,
                  borderBottomWidth: 1,
                  borderBottomColor: '#737373',
                  paddingLeft: 8,
                  color: '#000',
                  marginBottom: 16,
                }}
                keyboardType="default"
                secureTextEntry
                value={password}
                onChangeText={text => {
                  setEmailLoginError(false);
                  setPassword(text);
                }}
              />
              <HelperText
                type="error"
                visible={emailLoginError}
                style={{fontSize: 14, color: '#D32F2F'}}>
                Credential mismatch
              </HelperText>
              <TouchableOpacity
                onPress={() => setForgetPasswordModal(true)}
                style={{alignSelf: 'flex-end', marginBottom: 16}}>
                <Text style={{fontSize: 16, fontWeight: 'bold', color: '#000'}}>
                  forget password?
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handelEmailLogin}
                style={{
                  width: '75%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 12,
                  backgroundColor: '#7C3AED',
                  borderRadius: 24,
                }}>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: '#FFF'}}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}

        <ForgetPassword
          forgetPasswordModal={forgetPasswordModal}
          setForgetPasswordModal={setForgetPasswordModal}
          navigation={navigation}
        />
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
