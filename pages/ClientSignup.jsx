import {
  ImageBackground,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useRef, useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
import {SERVER_URL} from '@env';
import {vw, vh} from 'react-native-viewport-units';
import Icongoogle from 'react-native-vector-icons/AntDesign';
import Iconfacebook from 'react-native-vector-icons/FontAwesome';
import Iconeye from 'react-native-vector-icons/Entypo';
import Iconrequest from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {HelperText} from 'react-native-paper';

const ClientSignup = ({navigation, gooleSignin}) => {
  const [showPassword, setShowPassword] = useState(true);
  const [otpForm, setOtpForm] = useState(false);
  const [passwordInputFocus, setPasswordInputFocus] = useState(false);
  const [phoneInputFocus, setPhoneInputFocus] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp1, setOTP1] = useState('');
  const [otp2, setOTP2] = useState('');
  const [otp3, setOTP3] = useState('');
  const [otp4, setOTP4] = useState('');
  const [otp5, setOTP5] = useState('');
  const [otp6, setOTP6] = useState('');
  const [count, setCount] = useState(120);
  const [timerId, setTimerId] = useState(null);
  const [proImg, setProImg] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState({
    firstNameError: false,
    lastNameError: false,
    emailError: false,
    passwordError: false,
    phoneError: false,
  });

  const {dispatch} = useContext(AuthContext);

  const otp1Ref = useRef(null);
  const otp2Ref = useRef(null);
  const otp3Ref = useRef(null);
  const otp4Ref = useRef(null);
  const otp5Ref = useRef(null);
  const otp6Ref = useRef(null);

  const startCountdown = () => {
    setCount(120);
    setTimerId(
      setInterval(() => {
        setCount(prevCount => prevCount - 1);
      }, 1000),
    );
  };

  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        // type: [DocumentPicker.types.allFiles],
        // There can me more options as well
        // DocumentPicker.types.allFiles
        type: DocumentPicker.types.images,
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      // Printing the log realted to the file
      //   console.log('res : ' + JSON.stringify(res));
      //   var y = await JSON.parse(res[0]);
      setProImg(res[0]);
    } catch (err) {
      setProImg(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert('Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  async function checkEmail() {
    if (firstName.length < 0) {
      setHasErrors(prev => ({...prev, firstNameError: true}));
      return;
    }
    if (lastName.length < 0) {
      setHasErrors(prev => ({...prev, lastNameError: true}));
      return;
    }
    if (phone.length !== 10) {
      setHasErrors(prev => ({...prev, phoneError: true}));
      return;
    }
    if (!email.includes('@') || email.length < 0) {
      setHasErrors(prev => ({...prev, emailError: true}));
      return;
    }
    if (password.length < 7) {
      setHasErrors(prev => ({...prev, passwordError: true}));
      return;
    }
    try {
      const res = await fetch(`${SERVER_URL}/verify/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email}),
      });
      if (res.status === 404) {
        setSignupFailed(true);
        return;
      }
      getOTP();
      startCountdown();
    } catch (error) {
      setSignupFailed(true);
      console.log(error);
    }
  }

  const getOTP = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          firstname: firstName,
          lastname: lastName,
          email: email,
          phone: phone,
          password: password,
          profilePicture: proImg,
          type: 'user',
        }),
      });
      const data = await response.json();
      if (data.message) {
        setSignupFailed(true);
        return;
      }
      setOtpForm(true);
    } catch (error) {
      setSignupFailed(true);
      console.error(error.message);
    }
  };

  const handleSubmitOTP = async event => {
    setLoading(true);
    const formData = new FormData();
    formData.append('firstname', firstName);
    formData.append('lastname', lastName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phone', phone);
    formData.append('profilePicture', proImg);
    formData.append('type', 'user');
    formData.append('otp', `${otp1}${otp2}${otp3}${otp4}${otp5}${otp6}`);
    try {
      const response = await fetch(`${SERVER_URL}/otp/signup`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        return;
      }
      await AsyncStorage.setItem('token', data.token);
      dispatch({type: 'isLoggedIn'});
      navigation.navigate('Explore');
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const getImageBlob = async imageUrl => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      return blob;
    } catch (error) {
      console.error('Error fetching image:', error);
      return null;
    }
  };

  const signIn = async () => {
    try {
      await gooleSignin.hasPlayServices();
      const userInfo = await gooleSignin.signIn();
      const {user} = userInfo;
      const photo = await getImageBlob(user.photo);
      const reader = new FileReader();
      reader.readAsDataURL(photo);
      reader.onloadend = () => {
        const base64data = reader.result;
        const imageData = {
          fileCopyUri: null,
          name: user.photo.substring(user.photo.lastIndexOf('/') + 1),
          size: photo.size,
          type: photo.type,
          uri: base64data,
        };
        setProImg(imageData);
      };
      setFirstName(user.givenName);
      setLastName(user.familyName);
      setEmail(user.email);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        display: 'flex',
        columnGap: 50,
        rowGap: 50,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#ffffff',
        paddingBottom: 10 * vw,
      }}>
      <View className="flex items-center justify-center gap-y-2 mx-4 mt-8">
        <Text className="text-5xl font-bold text-black">Welcome</Text>
        <Text className="text-lg text-black text-center">
          Fill up the form below for a new client account
        </Text>
      </View>
      <View className="flex flex-col items-center justify-center gap-y-6">
        <Text className="text-3xl capitalize font-bold text-black">
          sign up form
        </Text>
        <View className="relative flex flex-col items-center">
          <ImageBackground
            source={
              proImg === '' ? require('../assets/dp.png') : {uri: proImg.uri}
            }
            resizeMode="cover"
            className="rounded-full overflow-hidden">
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={selectFile}
              className="w-40 h-40">
              <Text></Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <View className="flex items-stretch justify-center gap-y-6 w-[320]">
          <View className="flex flex-col items-stretch">
            <Text className="text-xl font-semibold capitalize text-black">
              first name
            </Text>
            <TextInput
              placeholder="enter your first name"
              inputMode="text"
              value={firstName}
              onChangeText={text => {
                setHasErrors(prev => ({...prev, firstNameError: false}));
                setFirstName(text);
              }}
              placeholderTextColor="#a3a3a3"
              className="border-b text-neutral-800"
            />
            <HelperText
              type="error"
              visible={hasErrors.firstNameError}
              padding="none"
              style={{fontSize: 4 * vw}}>
              First name can't be empty!
            </HelperText>
          </View>
          <View className="flex flex-col items-stretch">
            <Text className="text-xl font-semibold capitalize text-black">
              last name
            </Text>
            <TextInput
              placeholder="enter your last name"
              inputMode="text"
              value={lastName}
              onChangeText={text => {
                setHasErrors(prev => ({...prev, lastNameError: false}));
                setLastName(text);
              }}
              placeholderTextColor="#a3a3a3"
              className="border-b text-neutral-900"
            />
            <HelperText
              type="error"
              visible={hasErrors.lastNameError}
              padding="none"
              style={{fontSize: 4 * vw}}>
              Last name can't be empty!
            </HelperText>
          </View>
          <View className="flex flex-col items-stretch">
            <Text className="text-xl font-semibold capitalize text-black">
              email
            </Text>
            <TextInput
              placeholder="enter email address"
              value={email}
              onChangeText={text => {
                setHasErrors(prev => ({...prev, emailError: false}));
                setEmail(text);
              }}
              inputMode="email"
              placeholderTextColor="#a3a3a3"
              className="border-b text-neutral-900"
            />
            <HelperText
              type="error"
              visible={hasErrors.emailError}
              padding="none"
              style={{fontSize: 4 * vw}}>
              Email is not valid!
            </HelperText>
          </View>
          <View className="flex flex-col items-stretch">
            <Text className="text-xl font-semibold capitalize text-black">
              password
            </Text>
            <View className="border-b flex flex-row items-center">
              <TextInput
                placeholder="enter password"
                placeholderTextColor="#a3a3a3"
                className="text-neutral-900"
                secureTextEntry={showPassword}
                value={password}
                onChangeText={text => {
                  setHasErrors(prev => ({...prev, passwordError: false}));
                  setPassword(text);
                }}
                inputMode="text"
                onFocus={() => setPasswordInputFocus(true)}
                onBlur={() => setPasswordInputFocus(false)}
              />
              {passwordInputFocus && (
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <Iconeye name="eye" size={20} color="#000000" />
                  ) : (
                    <Iconeye name="eye-with-line" size={20} color="#000000" />
                  )}
                </TouchableOpacity>
              )}
              <HelperText
                type="error"
                visible={hasErrors.passwordError}
                padding="none"
                style={{fontSize: 4 * vw}}>
                Password should be altleast 8 chracter!
              </HelperText>
            </View>
          </View>
          <View className="flex flex-col items-stretch">
            <Text className="text-xl font-semibold capitalize text-black">
              phone
            </Text>
            <View className="border-b flex flex-row items-center">
              <TextInput
                placeholder="enter your number"
                placeholderTextColor="#a3a3a3"
                className="text-neutral-900"
                inputMode="numeric"
                value={phone}
                onChangeText={text => {
                  setHasErrors(prev => ({...prev, phoneError: false}));
                  setPhone(text);
                }}
              />
            </View>
            <HelperText
              type="error"
              visible={hasErrors.phoneError}
              padding="none"
              style={{fontSize: 4 * vw}}>
              Phone is not valid!
            </HelperText>
          </View>
          <TouchableOpacity
            className="self-center bg-blue-500 py-2 w-60 flex items-center justify-center rounded-3xl"
            onPress={checkEmail}>
            <Text className="text-white capitalize font-bold text-lg">
              submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex items-center flex-row gap-x-4 self-end mr-4">
        <Text className="uppercase text-black">or use</Text>
        <TouchableOpacity onPress={signIn}>
          <Icongoogle name="google" size={48} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Iconfacebook name="facebook" size={48} color="#000000" />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={otpForm}
        onRequestClose={() => setOtpForm(false)}>
        <View
          className="flex-1 flex-row items-center justify-center"
          style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
          <View
            className="bg-white flex flex-col items-center gap-y-4 p-4 rounded-md"
            style={{elevation: 5, width: 70 * vw}}>
            <Text style={{fontSize: 6 * vw}} className="font-bold text-black">
              1 step remaining
            </Text>
            <View className="flex-row gap-2">
              <TextInput
                placeholder=""
                value={otp1}
                ref={otp1Ref}
                className="border border-neutral-300 text-center rounded-xl px-2 py-1"
                keyboardType="number-pad"
                autoFocus
                maxLength={1}
                onChangeText={text => {
                  setOTP1(text);
                  if (text.length === 1) otp2Ref.current.focus();
                }}
              />
              <TextInput
                placeholder=""
                value={otp2}
                ref={otp2Ref}
                maxLength={1}
                className="border border-neutral-300 text-center rounded-xl px-2 py-1"
                keyboardType="number-pad"
                onChangeText={text => {
                  setOTP2(text);
                  if (text.length === 1) otp3Ref.current.focus();
                }}
              />
              <TextInput
                placeholder=""
                value={otp3}
                ref={otp3Ref}
                maxLength={1}
                className="border border-neutral-300 text-center rounded-xl px-2 py-1"
                keyboardType="number-pad"
                onChangeText={text => {
                  setOTP3(text);
                  if (text.length === 1) otp4Ref.current.focus();
                }}
              />
              <TextInput
                placeholder=""
                value={otp4}
                ref={otp4Ref}
                maxLength={1}
                className="border border-neutral-300 text-center rounded-xl px-2 py-1"
                keyboardType="number-pad"
                onChangeText={text => {
                  setOTP4(text);
                  if (text.length === 1) otp5Ref.current.focus();
                }}
              />
              <TextInput
                placeholder=""
                value={otp5}
                ref={otp5Ref}
                maxLength={1}
                className="border border-neutral-300 text-center rounded-xl px-2 py-1"
                keyboardType="number-pad"
                onChangeText={text => {
                  setOTP5(text);
                  if (text.length === 1) otp6Ref.current.focus();
                }}
              />
              <TextInput
                placeholder=""
                value={otp6}
                ref={otp6Ref}
                maxLength={1}
                className="border border-neutral-300 text-center rounded-xl px-2 py-1"
                keyboardType="number-pad"
                onChangeText={text => setOTP6(text)}
              />
            </View>
            <View className="flex flex-row items-center">
              <Text>OTP is send to +91 {phone} . </Text>
              <Pressable className="" onPress={() => setOtpForm(false)}>
                <Text className="text-blue-500 font-bold capitalize">edit</Text>
              </Pressable>
            </View>
            <Pressable
              className="px-4 py-2 bg-blue-500 rounded-3xl"
              onPress={handleSubmitOTP}>
              <Text className="capitalize font-semibold text-white">
                submit
              </Text>
            </Pressable>
            {count >= 0 ? (
              <Text className="text-neutral-700 self-end">{count}s</Text>
            ) : (
              <Pressable className="self-end">
                <Text className="font-semibold text-neutral-600">
                  Resend OTP
                </Text>
              </Pressable>
            )}
            <Text className="text-slate-500 font-medium">
              OTP is valid for 5 minutes
            </Text>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default ClientSignup;

const styles = StyleSheet.create({});
