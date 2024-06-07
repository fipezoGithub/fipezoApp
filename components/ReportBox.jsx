import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import Iconsearch from 'react-native-vector-icons/AntDesign';
import Iconclose from 'react-native-vector-icons/AntDesign';
import {vw} from 'react-native-viewport-units';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SERVER_URL} from '@env';

const ReportBox = ({showReportBox, setShowReportBox, freelancer}) => {
  const [issue, setIssue] = useState('');
  const [description, setDescription] = useState('');

  const issues = [
    'pretending to be someone',
    'fake account',
    'fake portfolio',
    'innapproprite content',
    'harashment or bullying',
    'scam or food',
    'something else',
  ];

  const submitReport = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${SERVER_URL}/report?type=freelancer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          relatedType: 'freelancer report',
          reason: issue,
          description: description,
          status: 'pending',
          acceptedFreelancer: freelancer._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setDescription('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showReportBox}
      onRequestClose={() => {
        setShowReportBox(!showReportBox);
      }}>
      <View
        className="flex-1 items-center justify-center"
        style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
        <View className="bg-white px-4 py-2 flex gap-y-4 flex-col items-center mx-6 rounded-lg relative">
          <Pressable
            className="bg-red-600 self-end absolute -top-[4%] right-0"
            onPress={() => setShowReportBox(false)}>
            <Iconclose name="close" color="#fff" size={4.5 * vw} />
          </Pressable>
          <View>
            <Text
              className="text-black font-semibold text-center"
              style={{fontSize: 6 * vw}}>
              Inappropriate User Activity Must Be Reported
            </Text>
          </View>
          <View className="flex flex-col items-stretch">
            <Text className="text-base font-semibold text-black">
              Please select your problem
            </Text>
            <SelectDropdown
              data={issues}
              buttonStyle={{
                backgroundColor: 'transparent',
                borderBottomWidth: 1,
                borderBottomColor: 'black',
                width: '100%',
              }}
              defaultButtonText={'select your problem'}
              rowTextStyle={{textTransform: 'capitalize'}}
              buttonTextStyle={{
                fontSize: 15,
                color: 'rgb(115 115 115)',
                textAlign: 'left',
              }}
              onSelect={(selectedItem, index) => {
                setIssue(selectedItem.split(' ').join('_').toLowerCase());
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
          <View className="flex flex-col self-stretch gap-y-2">
            <Text className="text-black text-base font-semibold capitalize">
              brief description
            </Text>
            <TextInput
              placeholder="Enter description"
              multiline
              value={description}
              onChangeText={text => setDescription(text)}
              style={{textAlignVertical: 'top'}}
              className="h-20 border"
            />
          </View>
          <Pressable
            className="py-2 bg-red-600 w-60 rounded-md"
            onPress={submitReport}>
            <Text
              className="text-white capitalize text-center font-semibold"
              style={{fontSize: 4 * vw}}>
              report
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ReportBox;

const styles = StyleSheet.create({});
