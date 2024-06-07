import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {SERVER_URL, BUCKET_URL} from '@env';
import {useIsFocused} from '@react-navigation/native';
import {vw, vh} from 'react-native-viewport-units';
import Iconrupee from 'react-native-vector-icons/FontAwesome';
import Iconshare from 'react-native-vector-icons/Entypo';
import IconTrash from 'react-native-vector-icons/Ionicons';
import Iconmenu from 'react-native-vector-icons/SimpleLineIcons';
import Iconedit from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../context/AuthContext';

const FreelancerAppliedJobs = ({navigation}) => {
  const [appliedJob, setAppliedJob] = useState([]);

  const isFocused = useIsFocused();

  const {authData} = useContext(AuthContext);

  async function getApplied() {
    const token = await AsyncStorage.getItem('token');
    const res = await fetch(`${SERVER_URL}/freelancer/jobs`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const jobs = await res.json();
    setAppliedJob(jobs);
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
    getApplied();
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
        {appliedJob.length > 0 &&
          appliedJob.map((job, index) => (
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
                className="flex flex-col items-start gap-y-2"
                style={{width: 60 * vw}}>
                <Text className="text-neutral-500 text-lg capitalize font-semibold">
                  {job.createdCompany.companyname}
                </Text>
                <Text className="text-black text-lg capitalize font-bold">
                  {job.title}
                </Text>
                <Text className="bg-neutral-300 p-2 text-xs rounded text-neutral-700 capitalize">
                  <Iconrupee name="rupee" /> {job.budget} - {job.venue}
                </Text>
                {job.hiredFreelancers.includes(authData.userDetails._id) && (
                  <Text className="capitalize px-2 py-1 bg-green-500 text-white rounded-md">
                    hired
                  </Text>
                )}
                {job.rejectedFreelancers.includes(authData.userDetails._id) && (
                  <Text className="capitalize px-2 py-1 bg-red-500 text-white rounded-md">
                    rejected
                  </Text>
                )}
                {!job.hiredFreelancers.includes(authData.userDetails._id) &&
                  !job.rejectedFreelancers.includes(
                    authData.userDetails._id,
                  ) && (
                    <Text className="capitalize px-2 py-1 bg-blue-600 text-white rounded-md">
                      pending
                    </Text>
                  )}
              </View>
              <View
                className="flex flex-col justify-between items-center"
                style={{height: 15 * vh}}>
                <View className="flex flex-row gap-x-2"></View>
                <Text className="text-neutral-700">{job.viewCount} views</Text>
              </View>
            </TouchableOpacity>
          ))}
      </View>
    </ScrollView>
  );
};

export default FreelancerAppliedJobs;

const styles = StyleSheet.create({});
