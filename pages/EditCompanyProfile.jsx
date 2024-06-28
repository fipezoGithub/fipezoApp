import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useMemo, useState} from 'react';
import {vw, vh} from 'react-native-viewport-units';
import Iconeye from 'react-native-vector-icons/Entypo';
import Iconcamera from 'react-native-vector-icons/AntDesign';
import {AuthContext} from '../context/AuthContext';
import {SERVER_URL, BUCKET_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditCompanyProfile = ({ navigation}) => {
  const [proImg, setProImg] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [passwordInputFocus, setPasswordInputFocus] = useState(false);
  const [user, setUser] = useState({});
  const [coverImg, setCoverImg] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');

  const {authData, dispatch} = useContext(AuthContext);

  const selectFile = async setFunc => {
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
      setFunc(res[0]);
    } catch (err) {
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

  const memoValue = useMemo(() => {
    return authData.userDetails;
  }, [authData.userDetails]);

  const updateProfile = async () => {
    if (bio.length > 500 || bio.length < 50) {
      return;
    }
    try {
      const data = new FormData();
      if (typeof proImg !== 'string') {
        data.append('profilePicture', profilePicture);
      }
      if (typeof coverImg !== 'string') {
        data.append('coverPicture', coverPicture);
      }
      data.append('email', email);
      if (password !== undefined) {
        data.append('password', password);
      }
      data.append('bio', bio);
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${SERVER_URL}/profile/company/edit`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });
      const update = await res.json();
      if (update) {
        dispatch({
          type: 'login',
          payload: {userDetails: update, userType: 'company'},
        });
        // navigation.navigate('freelancer-profile', {
        //   uid: authData.userDetails.uid,
        // });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setUser(memoValue);
    setEmail(memoValue.companyemail);
    setBio(memoValue.bio);
  }, [memoValue]);

  return (
    <ScrollView contentContainerStyle={{backgroundColor: '#fff'}}>
      <View className="pt-2 flex flex-col items-center gap-y-4">
        <Text
          style={{fontSize: 6 * vw}}
          className="font-semibold capitalize text-neutral-700">
          edit profile
        </Text>
        <View className="relative flex flex-col items-center h-64">
          <ImageBackground
            source={
              coverImg == ''
                ? {uri: `${BUCKET_URL}${user.coverPicture}`}
                : {uri: coverImg.uri}
            }
            resizeMode="cover"
            className="overflow-hidden">
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => selectFile(setCoverImg)}
              className="w-screen h-52 relative">
              <Iconcamera
                name="camera"
                color="#fff"
                size={7 * vw}
                style={{
                  position: 'absolute',
                  bottom: 1 * vh,
                  left: 2 * vw,
                  borderWidth: 1,
                  borderColor: 'rgba(163, 163, 163, 0.8)',
                  padding: 2 * vw,
                  borderRadius: 9999,
                }}
              />
            </TouchableOpacity>
          </ImageBackground>
          <ImageBackground
            source={
              proImg == ''
                ? {uri: `${BUCKET_URL}${user.profilePicture}`}
                : {uri: proImg}
            }
            resizeMode="stretch"
            className="rounded-full overflow-hidden relative -top-16">
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => selectFile(setProImg)}
              className="w-32 h-32">
              <Text></Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <View className="flex flex-col items-stretch mx-4 w-[90%]">
          <Text className="text-base font-semibold capitalize text-black">
            email
          </Text>
          <TextInput
            placeholder="enter email address"
            inputMode="email"
            value={email}
            onChangeText={text => setEmail(text)}
            className="border-b"
          />
        </View>
        <View className="flex flex-col items-stretch mx-4 w-[90%]">
          <Text className="text-base font-semibold capitalize text-black">
            password
          </Text>
          <View className="border-b flex flex-row items-center">
            <TextInput
              placeholder="enter password"
              secureTextEntry={showPassword}
              value={password}
              onChangeText={text => setPassword(text)}
              inputMode="text"
              onFocus={() => setPasswordInputFocus(true)}
            />
            {passwordInputFocus && (
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <Iconeye name="eye" size={20} color="#000000" />
                ) : (
                  <Iconeye name="eye-with-line" size={20} color="#000000" />
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View className="flex flex-col items-stretch gap-y-4 w-[90%]">
          <Text className="text-base font-semibold capitalize text-black">
            bio
          </Text>
          <TextInput
            inputMode="text"
            multiline
            placeholder="write about yourself"
            className="border h-32"
            value={bio}
            onChangeText={text => setBio(text)}
            style={{textAlignVertical: 'top'}}
          />
        </View>
        <TouchableOpacity
          className="self-center bg-blue-500 py-2 w-28 flex items-center justify-center rounded-3xl"
          onPress={updateProfile}>
          <Text className="text-white capitalize font-bold text-lg">
            update
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditCompanyProfile;

const styles = StyleSheet.create({});
