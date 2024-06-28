import {
  BackHandler,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CheckBox from '@react-native-community/checkbox';
import JobCard from '../components/JobCard';
import {SERVER_URL} from '@env';
import {useIsFocused} from '@react-navigation/native';
import Loader from '../components/Loader';
import FastImage from 'react-native-fast-image';
import {vw, vh} from 'react-native-viewport-units';
import {Button, Divider, Menu} from 'react-native-paper';
import BottomNavBar from '../components/BottomNavBar';

const Jobscreen = ({location}) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showOpenJob, setShowOpenJob] = useState(false);
  const [showClosedJob, setShowClosedJob] = useState(false);
  const [budgetSort, setBudgetSort] = useState(50000);
  const [visible, setVisible] = useState(false);
  const isFocused = useIsFocused();

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  async function getJobs(setFunc) {
    setLoading(true);
    try {
      const resp = await fetch(`${SERVER_URL}/job/location/${location}`);
      const res = await resp.json();
      res.reverse();
      setFunc(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        BackHandler.exitApp();
      },
    );

    return () => backHandler.remove();
  }, [BackHandler]);

  useEffect(() => {
    getJobs(setJobs);
    return () => {
      setJobs([]);
    };
  }, [isFocused, location]);

  const fstFilter = jobs.filter(job => {
    let one_day = 1000 * 60 * 60 * 24;
    let a = new Date(job.dueDate);
    let today = new Date();
    var Result = Math.round(a.getTime() - today.getTime()) / one_day;
    var Final_Result = Result.toFixed(0);
    if (showClosedJob) {
      return Final_Result < 0;
    } else if (showOpenJob) {
      return Final_Result > 0;
    }
    return job;
  });

  const filtered = fstFilter.filter(job => {
    if (job.budget <= budgetSort) {
      return true;
    }
    return false;
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={{
          backgroundColor: '#fff',
          minHeight: 90 * vh,
          paddingBottom: 6 * vh,
        }}>
        <StatusBar
          animated={true}
          backgroundColor="#973931"
          barStyle={'default'}
          showHideTransition={'fade'}
          hidden={false}
        />
        <View className="pt-4 flex flex-col gap-y-4 items-center justify-center">
          <Text className="text-2xl font-semibold capitalize text-black text-center">
            Browse and Apply for Freelance Projects at Your Fingertips!
          </Text>
        </View>
        <ScrollView
          contentContainerStyle={{
            alignItems: 'center',
            marginHorizontal: 15,
            position: 'relative',
          }}
          nestedScrollEnabled
          stickyHeaderIndices={[1]}
          scrollEventThrottle={16}>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <Button
                icon="filter"
                compact={true}
                color="#000"
                onPress={openMenu}>
                filter
              </Button>
            }>
            <View className="flex flex-col items-start gap-y-2 my-2">
              <Text className="text-black font-semibold mx-4 text-xl">
                Job status
              </Text>
              <View className="flex flex-row items-center mx-4">
                <CheckBox
                  value={showOpenJob}
                  onValueChange={newValue => setShowOpenJob(newValue)}
                />
                <Text className="text-lg text-black capitalize">open</Text>
              </View>
              <View className="flex flex-row items-center mx-4">
                <CheckBox
                  value={showClosedJob}
                  onValueChange={newValue => setShowClosedJob(newValue)}
                />
                <Text className="text-lg text-black capitalize">close</Text>
              </View>
            </View>
            <Divider />
            <View className="flex flex-col items-start mx-4 gap-y-2">
              <Text className="text-lg text-black font-semibold capitalize">
                budget range
              </Text>
              <TextInput
                placeholder="Enter amount"
                onChangeText={text =>
                  text !== ''
                    ? setBudgetSort(parseInt(text))
                    : setBudgetSort(50000)
                }
                className="border-b p-0 w-full"
              />
            </View>
            <Divider />
          </Menu>
          {filtered.length > 0 ? (
            filtered.map((item, index) => <JobCard key={index} job={item} />)
          ) : (
            <FastImage
              source={require('../assets/no-job-found.png')}
              resizeMode={FastImage.resizeMode.center}
              style={{width: 70 * vw, height: 70 * vw}}
              className="self-center"
            />
          )}
        </ScrollView>
      </ScrollView>
      <View style={styles.bottomNavBox}>
        <BottomNavBar currentIndex={1} />
      </View>
    </>
  );
};

export default Jobscreen;

const styles = StyleSheet.create({
  bottomNavBox: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginHorizontal: 2 * vh,
    marginVertical: 2 * vw,
  },
});
