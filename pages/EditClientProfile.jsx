import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
import Iconeye from 'react-native-vector-icons/Entypo';

const EditClientProfile = ({navigation}) => {
  const [proImg, setProImg] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [passwordInputFocus, setPasswordInputFocus] = useState(false);

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
      setProImg(res[0].uri);
    } catch (err) {
      setSingleFile(null);
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

  return (
    <ScrollView
      contentContainerStyle={{
        columnGap: 50,
        rowGap: 50,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#ffffff',
      }}>
      <View className="flex items-center justify-center gap-y-2 mx-4 mt-8">
        <Text className="text-4xl font-bold text-black">Edit Profile</Text>
      </View>
      <View className="relative flex flex-col items-center">
        <ImageBackground
          source={proImg == '' ? require('../assets/dp.png') : {uri: proImg}}
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
          <Text className="text-base font-semibold capitalize text-black">
            first name
          </Text>
          <TextInput
            placeholder="enter your first name"
            inputMode="text"
            className="border-b"
          />
        </View>
        <View className="flex flex-col items-stretch">
          <Text className="text-base font-semibold capitalize text-black">
            last name
          </Text>
          <TextInput
            placeholder="enter your last name"
            inputMode="text"
            className="border-b"
          />
        </View>
        <View className="flex flex-col items-stretch">
          <Text className="text-base font-semibold capitalize text-black">
            email
          </Text>
          <TextInput
            placeholder="enter email address"
            inputMode="email"
            className="border-b"
          />
        </View>
        <View className="flex flex-col items-stretch">
          <Text className="text-base font-semibold capitalize text-black">
            password
          </Text>
          <View className="border-b flex flex-row items-center">
            <TextInput
              placeholder="enter password"
              secureTextEntry={showPassword}
              inputMode="text"
              onFocus={() => setPasswordInputFocus(true)}
              onBlur={() => setPasswordInputFocus(false)}
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
        <TouchableOpacity
          className="self-center bg-blue-500 py-2 w-60 flex items-center justify-center rounded-3xl"
          onPress={() => navigation.navigate('TabNav')}>
          <Text className="text-white capitalize font-bold text-lg">
            submit
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditClientProfile;

const styles = StyleSheet.create({});
