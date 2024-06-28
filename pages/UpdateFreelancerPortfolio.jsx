import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {SERVER_URL, BUCKET_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../context/AuthContext';
import {vw, vh} from 'react-native-viewport-units';
import DocumentPicker from 'react-native-document-picker';

const UpdateFreelancerPortfolio = ({navigation}) => {
  const [workImages, setWorkImages] = useState([]);

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

  const {authData} = useContext(AuthContext);

  const {userDetails} = authData;

  useEffect(() => {
    if (
      userDetails.profession === 'cinematographer' ||
      userDetails.profession === 'video_editor' ||
      userDetails.profession === 'dance_teacher' ||
      userDetails.profession === 'music_teacher' ||
      userDetails.profession === 'lyricist' ||
      userDetails.profession === 'musician' ||
      userDetails.profession === 'voice_over_artist' ||
      userDetails.profession === 'vocalist'
    ) {
      setWorkImages(userDetails.works);
    } else if (
      userDetails.profession === 'drone_operator' ||
      userDetails.profession === 'anchor' ||
      userDetails.profession === 'dj' ||
      userDetails.profession === 'dancer' ||
      userDetails.profession === 'influencer' ||
      userDetails.profession === 'actor' ||
      userDetails.profession === 'actress' ||
      userDetails.profession === 'interior_designer'
    ) {
      const oldWorks = [...userDetails.works];
      oldWorks.forEach((item, index) => {
        if (item.includes('https')) {
          setWorkImages(prev => [...prev, (prev[index] = item)]);
        }
      });
    }
  }, []);

  const updateWorks = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const data = new FormData();
      if (workImages.length > 0) {
        workImages.forEach(element => {
          data.append('works[]', element);
        });
        data.append('index', workIndex);
      }
      const response = await fetch(`${SERVER_URL}/profile/protfolio/update`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });
      const responseData = await response.json();
      if (responseData) {
        navigation.navigate('freelancer-profile', {uid: userDetails.uid});
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
          update your works
        </Text>
        <Text
          className="font-medium text-center text-black capitalize"
          style={{fontSize: 5 * vw, lineHeight: 6.5 * vw}}>
          It's very essential to update Portfolio frequently.
        </Text>
      </View>
      <View className="flex flex-col items-center gap-y-4">
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
            <ImageBackground
              source={{
                uri: workImages[0]
                  ? workImages[0].uri
                  : `${BUCKET_URL}${userDetails.works[0]}`,
              }}
              resizeMode="cover">
              <TouchableOpacity
                className="w-80 h-44 border border-dashed flex items-center justify-center"
                onPress={() => selectFile(0)}></TouchableOpacity>
            </ImageBackground>

            <ImageBackground
              source={{
                uri: workImages[1]
                  ? workImages[1].uri
                  : `${BUCKET_URL}${userDetails.works[1]}`,
              }}
              resizeMode="cover">
              <TouchableOpacity
                className="w-80 h-44 border border-dashed flex items-center justify-center"
                onPress={() => selectFile(1)}></TouchableOpacity>
            </ImageBackground>

            <ImageBackground
              source={{
                uri: workImages[2]
                  ? workImages[2].uri
                  : `${BUCKET_URL}${userDetails.works[2]}`,
              }}
              resizeMode="cover">
              <TouchableOpacity
                className="w-80 h-44 border border-dashed flex items-center justify-center"
                onPress={() => selectFile(2)}></TouchableOpacity>
            </ImageBackground>

            <ImageBackground
              source={{
                uri: workImages[3]
                  ? workImages[3].uri
                  : `${BUCKET_URL}${userDetails.works[3]}`,
              }}
              resizeMode="cover">
              <TouchableOpacity
                className="w-80 h-44 border border-dashed flex items-center justify-center"
                onPress={() => selectFile(3)}></TouchableOpacity>
            </ImageBackground>

            <ImageBackground
              source={{
                uri: workImages[4]
                  ? workImages[4].uri
                  : `${BUCKET_URL}${userDetails.works[4]}`,
              }}
              resizeMode="cover">
              <TouchableOpacity
                className="w-80 h-44 border border-dashed flex items-center justify-center"
                onPress={() => selectFile(4)}></TouchableOpacity>
            </ImageBackground>

            <ImageBackground
              source={{
                uri: workImages[5]
                  ? workImages[5].uri
                  : `${BUCKET_URL}${userDetails.works[5]}`,
              }}
              resizeMode="cover">
              <TouchableOpacity
                className="w-80 h-44 border border-dashed flex items-center justify-center"
                onPress={() => selectFile(5)}></TouchableOpacity>
            </ImageBackground>

            <ImageBackground
              source={{
                uri: workImages[6]
                  ? workImages[6].uri
                  : `${BUCKET_URL}${userDetails.works[6]}`,
              }}
              resizeMode="cover">
              <TouchableOpacity
                className="w-80 h-44 border border-dashed flex items-center justify-center"
                onPress={() => selectFile(6)}></TouchableOpacity>
            </ImageBackground>

            <ImageBackground
              source={{
                uri: workImages[7]
                  ? workImages[7].uri
                  : `${BUCKET_URL}${userDetails.works[7]}`,
              }}
              resizeMode="cover">
              <TouchableOpacity
                className="w-80 h-44 border border-dashed flex items-center justify-center"
                onPress={() => selectFile(7)}></TouchableOpacity>
            </ImageBackground>
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

            <ImageBackground
              source={{
                uri: workImages[4]
                  ? workImages[4].uri
                  : `${BUCKET_URL}${userDetails.works[4]}`,
              }}
              resizeMode="cover">
              <TouchableOpacity
                className="w-80 h-44 border border-dashed flex items-center justify-center"
                onPress={() => selectFile(4)}></TouchableOpacity>
            </ImageBackground>

            <ImageBackground
              source={{
                uri: workImages[5]
                  ? workImages[5].uri
                  : `${BUCKET_URL}${userDetails.works[5]}`,
              }}
              resizeMode="cover">
              <TouchableOpacity
                className="w-80 h-44 border border-dashed flex items-center justify-center"
                onPress={() => selectFile(5)}></TouchableOpacity>
            </ImageBackground>

            <ImageBackground
              source={{
                uri: workImages[6]
                  ? workImages[6].uri
                  : `${BUCKET_URL}${userDetails.works[6]}`,
              }}
              resizeMode="cover">
              <TouchableOpacity
                className="w-80 h-44 border border-dashed flex items-center justify-center"
                onPress={() => selectFile(6)}></TouchableOpacity>
            </ImageBackground>

            <ImageBackground
              source={{
                uri: workImages[7]
                  ? workImages[7].uri
                  : `${BUCKET_URL}${userDetails.works[7]}`,
              }}
              resizeMode="cover">
              <TouchableOpacity
                className="w-80 h-44 border border-dashed flex items-center justify-center"
                onPress={() => selectFile(7)}></TouchableOpacity>
            </ImageBackground>
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
          onPress={updateWorks}>
          <Text className="text-white capitalize font-semibold py-2 text-base">
            submit
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UpdateFreelancerPortfolio;

const styles = StyleSheet.create({});
