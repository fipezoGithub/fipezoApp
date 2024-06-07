import {
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {vw, vh} from 'react-native-viewport-units';
import {SERVER_URL, BUCKET_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import Iconrupee from 'react-native-vector-icons/FontAwesome';
import Iconshare from 'react-native-vector-icons/Entypo';
import IconTrash from 'react-native-vector-icons/Ionicons';
import Iconmenu from 'react-native-vector-icons/SimpleLineIcons';
import Iconedit from 'react-native-vector-icons/Feather';
import {Button, Divider, Menu} from 'react-native-paper';

const Menuoption = ({job, setJobs, navigation}) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const deleteJob = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${SERVER_URL}/job/delete/${job._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setJobs(prev => prev.filter(job => job._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const markExpire = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${SERVER_URL}/job/edit/${job._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          dueDate: new Date().getDate() - 1,
        }),
      });
      const update = await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const onShare = async msg => {
    try {
      const result = await Share.share(
        {
          message: `https://fipezo.com/jobs/details/${job.uid}`,
          url: `https://fipezo.com/jobs/details/${job.uid}`,
        },
        {dialogTitle: msg},
      );
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <Button onPress={openMenu}>
          <Iconmenu name="options-vertical" size={4 * vw} />
        </Button>
      }>
      <Menu.Item
        onPress={deleteJob}
        title={
          <View className="flex flex-row items-center gap-x-1">
            <IconTrash name="trash-bin-sharp" size={4.5 * vw} color="#ef4444" />
            <Text
              className="capitalize font-medium text-black"
              style={{fontSize: 4 * vw}}>
              delete
            </Text>
          </View>
        }
      />
      <Divider />
      <Menu.Item
        onPress={() => onShare('Fipezo jobs you may eligible. Check it out')}
        title={
          <View className="flex flex-row items-center gap-x-1">
            <Iconshare name="share" size={4.5 * vw} />
            <Text
              className="capitalize font-medium text-black"
              style={{fontSize: 4 * vw}}>
              share
            </Text>
          </View>
        }
      />
      <Divider />
      <Menu.Item
        onPress={() => navigation.navigate('edit-job', {job: job})}
        title={
          <View className="flex flex-row items-center gap-x-1">
            <Iconedit name="edit" size={4.5 * vw} color="#338ef4" />
            <Text
              className="capitalize font-medium text-black"
              style={{fontSize: 4 * vw}}>
              edit
            </Text>
          </View>
        }
      />
      <Menu.Item
        onPress={markExpire}
        title={
          <View className="flex flex-row items-center gap-x-1">
            <Iconedit name="edit" size={4.5 * vw} color="#338ef4" />
            <Text
              className="capitalize font-medium text-black"
              style={{fontSize: 4 * vw}}>
              mark as expire
            </Text>
          </View>
        }
      />
    </Menu>
  );
};

const CompanyPostedJobsScreen = ({navigation, location}) => {
  const [jobs, setJobs] = useState([]);
  const isFocused = useIsFocused();

  async function fetchJob() {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${SERVER_URL}/job/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const job = await res.json();
      setJobs(job.reverse());
    } catch (error) {
      console.log(error);
    }
  }

  const viewCount = async job => {
    try {
      const res = await fetch(`${SERVER_URL}/job/view/${job._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      navigation.navigate('job-details', {uid: job.uid});
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJob();
    return () => {
      setJobs([]);
    };
  }, [isFocused]);

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: '#fff',
        minHeight: '100%',
        alignItems: 'center',
        rowGap: 3 * vh,
      }}>
      <View className="my-2">
        <Text
          style={{fontSize: 5 * vw}}
          className="font-bold text-black capitalize">
          my jobs
        </Text>
      </View>
      <View className="mx-4 flex flex-col items-center">
        {jobs.length > 0 &&
          jobs.map((job, index) => (
            <TouchableOpacity
              onPress={() => viewCount(job)}
              key={index}
              className="flex flex-row gap-x-4 items-start p-4 justify-evenly my-2 bg-white rounded-lg"
              style={{maxWidth: 100 * vw, elevation: 5}}>
              <View>
                <Image
                  source={{
                    uri: `${BUCKET_URL}${job.createdCompany.profilePicture}`,
                  }}
                  className="w-10 h-10 rounded-full"
                />
              </View>
              <View
                className="flex flex-col items-start gap-y-1"
                style={{width: 60 * vw}}>
                <Text className="text-neutral-500 text-lg capitalize font-semibold">
                  {job.createdCompany.companyname}
                </Text>
                <Text className="text-black text-xl capitalize font-bold">
                  {job.title}
                </Text>
                <Text className="bg-neutral-300 p-2 text-xs rounded text-neutral-700 capitalize">
                  <Iconrupee name="rupee" /> {job.budget} - {job.venue}
                </Text>
                <View></View>
              </View>
              <View
                className="flex flex-col justify-between items-center"
                style={{height: 15 * vh}}>
                <View className="flex flex-row gap-x-2">
                  <Menuoption
                    setJobs={setJobs}
                    job={job}
                    navigation={navigation}
                  />
                </View>
                <Text className="text-neutral-700">{job.viewCount} views</Text>
              </View>
            </TouchableOpacity>
          ))}
      </View>
    </ScrollView>
  );
};

export default CompanyPostedJobsScreen;

const styles = StyleSheet.create({});
