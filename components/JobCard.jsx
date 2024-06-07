import {
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {vw, vh} from 'react-native-viewport-units';
import Iconrupee from 'react-native-vector-icons/FontAwesome';
import Iconshare from 'react-native-vector-icons/Entypo';
import React from 'react';
import {BUCKET_URL} from '@env';
import {useNavigation} from '@react-navigation/native';
import {SERVER_URL} from '@env';

const JobCard = ({job, setJobs}) => {
  const navigation = useNavigation();

  const viewCount = async () => {
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

  const onShare = async (msg, uri) => {
    try {
      const result = await Share.share(
        {
          message: uri,
          url: 'https://fipezo.com',
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
    <TouchableOpacity
      onPress={viewCount}
      className="flex flex-row gap-x-4 items-start p-4 justify-evenly my-2 bg-white rounded-lg"
      style={{maxWidth: 100 * vw, elevation: 5}}>
      <View>
        <Image
          source={{uri: `${BUCKET_URL}${job.createdCompany.profilePicture}`}}
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
      </View>
      <View
        className="flex flex-col justify-between items-center"
        style={{height: 15 * vh}}>
        <TouchableOpacity
          onPress={() =>
            onShare(job.title, `https://fipezo.com/jobs/details/${job.uid}/`)
          }
          className="flex flex-row gap-x-2">
          <Iconshare name="share" size={25} />
        </TouchableOpacity>
        <Text className="text-neutral-700">{job.viewCount} views</Text>
      </View>
    </TouchableOpacity>
  );
};

export default JobCard;

const styles = StyleSheet.create({});
