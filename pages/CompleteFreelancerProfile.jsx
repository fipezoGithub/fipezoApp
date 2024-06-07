import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {vw, vh} from 'react-native-viewport-units';
import Iconplus from 'react-native-vector-icons/Feather';
import DocumentPicker from 'react-native-document-picker';
import {AuthContext} from '../context/AuthContext';
import {TextInput} from 'react-native-paper';
import {SERVER_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CompleteFreelancerProfile = ({navigation}) => {
  const [workImages, setWorkImages] = useState([]);

  const {authData, dispatch} = useContext(AuthContext);

  const {userDetails} = authData;

  const selectFile = async index => {
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
      const newImages = [...workImages];
      newImages[index] = res[0];
      setWorkImages(newImages);
    } catch (err) {
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        const newImages = [...workImages];
        newImages[index] = '';
        setWorkImages(newImages);
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const verificationDetails = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const data = new FormData();
      workImages.forEach(element => {
        data.append('works[]', element);
      });
      data.append('termsAndConditions', true);
      const response = await fetch(`${SERVER_URL}/freelancer/verify`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });
      const responseData = await response.json();
      if (responseData) {
        dispatch({
          type: 'login',
          payload: {userDetails: responseData, userType: 'freelancer'},
        });
        navigation.navigate('freelancer-profile', {uid: responseData.uid});
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{alignItems: 'center', rowGap: 2.5 * vh}}>
      <View className="flex flex-col items-center py-4 gap-y-2">
        <Text
          className="font-bold text-black capitalize"
          style={{fontSize: 6 * vw}}>
          verification form
        </Text>
        <Text
          className="font-medium text-center text-black capitalize"
          style={{fontSize: 5 * vw, lineHeight: 6.5 * vw}}>
          You're almost there! Just a final step to complete your profile.
        </Text>
      </View>
      <View className="flex flex-col items-center gap-y-4">
        <Text
          className="font-medium text-center text-black capitalize"
          style={{fontSize: 5 * vw, lineHeight: 6.5 * vw}}>
          add your works
        </Text>
        {(userDetails.profession === 'photographer' ||
          userDetails.profession === 'photo_editor' ||
          userDetails.profession === 'model' ||
          userDetails.profession === 'makeup_artist' ||
          userDetails.profession === 'album_designer' ||
          userDetails.profession === 'web_developer' ||
          userDetails.profession === 'graphics_designer' ||
          userDetails.profession === 'mehendi_artist' ||
          userDetails.profession === 'private_tutor' ||
          userDetails.profession === 'drawing_teacher' ||
          userDetails.profession === 'painter' ||
          userDetails.profession === 'fashion_designer' ||
          userDetails.profession === 'babysitter' ||
          userDetails.profession === 'maid') && (
          <View className="flex flex-row items-center justify-evenly gap-4 flex-wrap">
            {workImages[0] ? (
              <ImageBackground
                source={{uri: workImages[0].uri}}
                resizeMode="cover">
                <TouchableOpacity
                  className="w-80 h-44 border border-dashed flex items-center justify-center"
                  onPress={() => selectFile(0)}></TouchableOpacity>
              </ImageBackground>
            ) : (
              <TouchableOpacity
                className="w-80 h-44 border border-dashed flex items-center justify-center"
                onPress={() => selectFile(0)}>
                <Iconplus name="plus" size={20} color="#000" />
              </TouchableOpacity>
            )}

            {workImages[1] ? (
              <ImageBackground
                source={{uri: workImages[1].uri}}
                resizeMode="cover">
                <TouchableOpacity
                  className="w-80 h-44 border border-dashed flex items-center justify-center"
                  onPress={() => selectFile(1)}></TouchableOpacity>
              </ImageBackground>
            ) : (
              <TouchableOpacity
                className="w-80 h-44 border border-dashed flex items-center justify-center"
                onPress={() => selectFile(1)}>
                <Iconplus name="plus" size={20} color="#000" />
              </TouchableOpacity>
            )}

            {workImages[2] ? (
              <ImageBackground
                source={{uri: workImages[2].uri}}
                resizeMode="cover">
                <TouchableOpacity
                  className="w-80 h-44 border border-dashed flex items-center justify-center"
                  onPress={() => selectFile(2)}></TouchableOpacity>
              </ImageBackground>
            ) : (
              <TouchableOpacity
                className="w-80 h-44 border border-dashed flex items-center justify-center"
                onPress={() => selectFile(2)}>
                <Iconplus name="plus" size={20} color="#000" />
              </TouchableOpacity>
            )}

            {workImages[3] ? (
              <ImageBackground
                source={{uri: workImages[3].uri}}
                resizeMode="cover">
                <TouchableOpacity
                  className="w-80 h-44 border border-dashed flex items-center justify-center"
                  onPress={() => selectFile(3)}></TouchableOpacity>
              </ImageBackground>
            ) : (
              <TouchableOpacity
                className="w-80 h-44 border border-dashed flex items-center justify-center"
                onPress={() => selectFile(3)}>
                <Iconplus name="plus" size={20} color="#000" />
              </TouchableOpacity>
            )}

            {workImages[4] ? (
              <ImageBackground
                source={{uri: workImages[4].uri}}
                resizeMode="cover">
                <TouchableOpacity
                  className="w-80 h-44 border border-dashed flex items-center justify-center"
                  onPress={() => selectFile(4)}></TouchableOpacity>
              </ImageBackground>
            ) : (
              <TouchableOpacity
                className="w-80 h-44 border border-dashed flex items-center justify-center"
                onPress={() => selectFile(4)}>
                <Iconplus name="plus" size={20} color="#000" />
              </TouchableOpacity>
            )}

            {workImages[5] ? (
              <ImageBackground
                source={{uri: workImages[5].uri}}
                resizeMode="cover">
                <TouchableOpacity
                  className="w-80 h-44 border border-dashed flex items-center justify-center"
                  onPress={() => selectFile(5)}></TouchableOpacity>
              </ImageBackground>
            ) : (
              <TouchableOpacity
                className="w-80 h-44 border border-dashed flex items-center justify-center"
                onPress={() => selectFile(5)}>
                <Iconplus name="plus" size={20} color="#000" />
              </TouchableOpacity>
            )}

            {workImages[6] ? (
              <ImageBackground
                source={{uri: workImages[6].uri}}
                resizeMode="cover">
                <TouchableOpacity
                  className="w-80 h-44 border border-dashed flex items-center justify-center"
                  onPress={() => selectFile(6)}></TouchableOpacity>
              </ImageBackground>
            ) : (
              <TouchableOpacity
                className="w-80 h-44 border border-dashed flex items-center justify-center"
                onPress={() => selectFile(6)}>
                <Iconplus name="plus" size={20} color="#000" />
              </TouchableOpacity>
            )}

            {workImages[7] ? (
              <ImageBackground
                source={{uri: workImages[7].uri}}
                resizeMode="cover">
                <TouchableOpacity
                  className="w-80 h-44 border border-dashed flex items-center justify-center"
                  onPress={() => selectFile(7)}></TouchableOpacity>
              </ImageBackground>
            ) : (
              <TouchableOpacity
                className="w-80 h-44 border border-dashed flex items-center justify-center"
                onPress={() => selectFile(7)}>
                <Iconplus name="plus" size={20} color="#000" />
              </TouchableOpacity>
            )}
          </View>
        )}
        {(userDetails.profession === 'drone_operator' ||
          userDetails.profession === 'anchor' ||
          userDetails.profession === 'dj' ||
          userDetails.profession === 'dancer' ||
          userDetails.profession === 'influencer' ||
          userDetails.profession === 'actor' ||
          userDetails.profession === 'actress' ||
          userDetails.profession === 'interior_designer') && (
          <View className="flex flex-row items-center justify-evenly gap-4 flex-wrap">
            <TextInput
              placeholder="https://www.youtube.com/example"
              className="w-80 text-black"
              value={workImages[0]}
              onChangeText={text =>
                setWorkImages(prev => [...prev, (prev[4] = text)])
              }
            />

            <TextInput
              placeholder="https://www.youtube.com/example"
              className="w-80 text-black"
              value={workImages[1]}
              onChangeText={text =>
                setWorkImages(prev => [...prev, (prev[5] = text)])
              }
            />

            <TextInput
              placeholder="https://www.youtube.com/example"
              className="w-80 text-black"
              value={workImages[2]}
              onChangeText={text =>
                setWorkImages(prev => [...prev, (prev[6] = text)])
              }
            />

            <TextInput
              placeholder="https://www.youtube.com/example"
              className="w-80 text-black"
              value={workImages[3]}
              onChangeText={text =>
                setWorkImages(prev => [...prev, (prev[7] = text)])
              }
            />

            {workImages[4] ? (
              <ImageBackground
                source={{uri: workImages[4].uri}}
                resizeMode="cover">
                <TouchableOpacity
                  className="w-80 h-44 border border-dashed flex items-center justify-center"
                  onPress={() => selectFile(4)}></TouchableOpacity>
              </ImageBackground>
            ) : (
              <TouchableOpacity
                className="w-80 h-44 border border-dashed flex items-center justify-center"
                onPress={() => selectFile(4)}>
                <Iconplus name="plus" size={20} color="#000" />
              </TouchableOpacity>
            )}

            {workImages[5] ? (
              <ImageBackground
                source={{uri: workImages[5].uri}}
                resizeMode="cover">
                <TouchableOpacity
                  className="w-80 h-44 border border-dashed flex items-center justify-center"
                  onPress={() => selectFile(5)}></TouchableOpacity>
              </ImageBackground>
            ) : (
              <TouchableOpacity
                className="w-80 h-44 border border-dashed flex items-center justify-center"
                onPress={() => selectFile(5)}>
                <Iconplus name="plus" size={20} color="#000" />
              </TouchableOpacity>
            )}

            {workImages[6] ? (
              <ImageBackground
                source={{uri: workImages[6].uri}}
                resizeMode="cover">
                <TouchableOpacity
                  className="w-80 h-44 border border-dashed flex items-center justify-center"
                  onPress={() => selectFile(6)}></TouchableOpacity>
              </ImageBackground>
            ) : (
              <TouchableOpacity
                className="w-80 h-44 border border-dashed flex items-center justify-center"
                onPress={() => selectFile(6)}>
                <Iconplus name="plus" size={20} color="#000" />
              </TouchableOpacity>
            )}

            {workImages[7] ? (
              <ImageBackground
                source={{uri: workImages[7].uri}}
                resizeMode="cover">
                <TouchableOpacity
                  className="w-80 h-44 border border-dashed flex items-center justify-center"
                  onPress={() => selectFile(7)}></TouchableOpacity>
              </ImageBackground>
            ) : (
              <TouchableOpacity
                className="w-80 h-44 border border-dashed flex items-center justify-center"
                onPress={() => selectFile(7)}>
                <Iconplus name="plus" size={20} color="#000" />
              </TouchableOpacity>
            )}
          </View>
        )}
        {(userDetails.profession === 'cinematographer' ||
          userDetails.profession === 'video_editor' ||
          userDetails.profession === 'dance_teacher' ||
          userDetails.profession === 'music_teacher' ||
          userDetails.profession === 'lyricist' ||
          userDetails.profession === 'musician' ||
          userDetails.profession === 'voice_over_artist' ||
          userDetails.profession === 'vocalist') && (
          <View className="flex flex-row items-center justify-evenly gap-4 flex-wrap">
            <TextInput
              placeholder="https://www.youtube.com/example"
              className="w-80 text-black"
              value={workImages[0]}
              onChangeText={text =>
                setWorkImages(prev => [...prev, (prev[0] = text)])
              }
            />

            <TextInput
              placeholder="https://www.youtube.com/example"
              className="w-80 text-black"
              value={workImages[1]}
              onChangeText={text =>
                setWorkImages(prev => [...prev, (prev[1] = text)])
              }
            />

            <TextInput
              placeholder="https://www.youtube.com/example"
              className="w-80 text-black"
              value={workImages[2]}
              onChangeText={text =>
                setWorkImages(prev => [...prev, (prev[2] = text)])
              }
            />

            <TextInput
              placeholder="https://www.youtube.com/example"
              className="w-80 text-black"
              value={workImages[3]}
              onChangeText={text =>
                setWorkImages(prev => [...prev, (prev[3] = text)])
              }
            />

            <TextInput
              placeholder="https://www.youtube.com/example"
              className="w-80 text-black"
              value={workImages[4]}
              onChangeText={text =>
                setWorkImages(prev => [...prev, (prev[4] = text)])
              }
            />

            <TextInput
              placeholder="https://www.youtube.com/example"
              className="w-80 text-black"
              value={workImages[5]}
              onChangeText={text =>
                setWorkImages(prev => [...prev, (prev[5] = text)])
              }
            />

            <TextInput
              placeholder="https://www.youtube.com/example"
              className="w-80 text-black"
              value={workImages[6]}
              onChangeText={text =>
                setWorkImages(prev => [...prev, (prev[6] = text)])
              }
            />

            <TextInput
              placeholder="https://www.youtube.com/example"
              className="w-80 text-black"
              value={workImages[7]}
              onChangeText={text =>
                setWorkImages(prev => [...prev, (prev[7] = text)])
              }
            />
          </View>
        )}
        <TouchableOpacity
          className="bg-blue-600 w-80 flex items-center justify-center rounded-xl"
          onPress={verificationDetails}>
          <Text className="text-white capitalize font-semibold py-2 text-base">
            submit
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CompleteFreelancerProfile;

const styles = StyleSheet.create({});
