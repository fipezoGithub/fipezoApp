import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {vw, vh} from 'react-native-viewport-units';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SERVER_URL} from '@env';
import socket from '../utils/socket';

const MyRequest = () => {
  const [hireRequests, setHireRequests] = useState([]);

  async function getHireRequests() {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(
        `${SERVER_URL}/hire/premium/request-freelancers`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: 'no-store',
        },
      );
      const resData = await res.json();
      setHireRequests(resData);
    } catch (error) {
      console.log(error);
    }
  }

  const formatDate = dateStr => {
    if (dateStr === undefined) {
      return;
    }
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const deleteRequest = async req => {
    fetch(`${process.env.SERVER_URL}/hire/freelancer/action/${req._id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({freelancer_status: 'declined'}),
    })
      .then(res => res.json())
      .then(async data => {
        const oldRequest = [...hireRequests];
        oldRequest.forEach(elm => {
          if (elm._id === req._id) {
            elm.freelancer_status = 'declined';
          }
        });
        setHireRequests(oldRequest);
        if (data.success) {
          req.freelancer_status = 'declined';
          socket.emit('send-notification', {
            type: 'Hire Reject',
            headline: `Your hire request is rejected by ${req.hired_freelancer.firstname} ${req.hired_freelancer.lastname}`,
            acceptedUser: req.user,
            sentFreelancer: req.hired_freelancer,
            href: '/my_hires',
          });
          setShowDeleteBox(false);
          setReqId(null);
          setRequests([]);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const acceptRequest = async req => {
    const token = await AsyncStorage.getItem('token');
    fetch(`${process.env.SERVER_URL}/hire/freelancer/action/${req._id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({freelancer_status: 'accepted'}),
    })
      .then(res => res.json())
      .then(async data => {
        if (data.success) {
          const oldRequest = [...hireRequests];
          oldRequest.forEach(elm => {
            if (elm._id === req._id) {
              elm.freelancer_status = 'accepted';
            }
          });
          setHireRequests(oldRequest);
          socket.emit('send-notification', {
            type: 'Hire Accept',
            headline: `Your hire request is accepted by ${req.hired_freelancer.firstname} ${req.hired_freelancer.lastname}`,
            acceptedUser: req.user,
            sentFreelancer: req.hired_freelancer,
            href: '/my_hires',
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    getHireRequests();
  }, []);

  return (
    <ScrollView contentContainerStyle={{rowGap: 5 * vw, alignItems: 'center'}}>
      <View style={{paddingTop: 2 * vh}}>
        <Text
          className="text-black font-semibold capitalize"
          style={{fontSize: 8 * vw}}>
          my requests
        </Text>
      </View>
      <View className="flex flex-row flex-wrap items-center justify-center gap-4 mx-2">
        {hireRequests.length > 0 &&
          hireRequests.map((item, index) => (
            <View
              className="flex gap-y-3 mx-4 border border-neutral-400 px-4 py-2 rounded-md bg-white"
              key={index}
              style={{minWidth: 88 * vw, elevation: 5}}>
              <Text
                style={{fontSize: 5 * vw}}
                className="font-medium text-black">
                Name: {item.fullName}
              </Text>
              <Text
                style={{fontSize: 5 * vw}}
                className="font-medium text-black border border-neutral-400 px-2 py-1">
                Phone: {item.phone}
              </Text>
              <Text
                style={{fontSize: 5 * vw}}
                className="font-medium text-black border border-neutral-400 px-2 py-1">
                Description: {item.description}
              </Text>
              <Text
                style={{fontSize: 5 * vw}}
                className="font-medium text-black border border-neutral-400 px-2 py-1">
                Address: {item.address}
              </Text>
              <Text
                style={{fontSize: 5 * vw}}
                className="font-medium text-black border border-neutral-400 px-2 py-1">
                Date:{' '}
                {item.reuireDate
                  ? formatDate(item.reuireDate)
                  : 'Not Applicable'}
              </Text>
              <Text
                style={{fontSize: 5 * vw}}
                className="font-medium text-black border border-neutral-400 px-2 py-1">
                Time:{' '}
                {item.startTime !== '00:00'
                  ? item.startTime + ' - ' + item.endTime
                  : 'Not Applicable'}
              </Text>
              <Text
                style={{fontSize: 5 * vw}}
                className="font-medium text-black border border-neutral-400 px-2 py-1">
                Budget: {item.budget}
              </Text>
              {item.freelancer_status !== 'accepted' &&
                item.freelancer_status !== 'declined' && (
                  <View className="flex-row justify-evenly">
                    <TouchableOpacity
                      className="bg-orange-600 px-2 py-1 rounded-xl"
                      onPress={() => deleteRequest(item)}>
                      <Text
                        className="capitalize font-semibold text-neutral-100"
                        style={{fontSize: 4.5 * vw}}>
                        decline
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="bg-green-600 px-2 py-1 rounded-xl"
                      onPress={() => acceptRequest(item)}>
                      <Text
                        className="capitalize font-semibold text-neutral-100"
                        style={{fontSize: 4.5 * vw}}>
                        accept
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              {item.freelancer_status === 'accepted' && (
                <View className="bg-green-500 px-2 py-1 rounded-lg">
                  <Text
                    className="text-neutral-100 font-semibold text-center"
                    style={{fontSize: 4 * vw}}>
                    Accepted
                  </Text>
                </View>
              )}
              {item.freelancer_status === 'declined' && (
                <View className="bg-teal-800 px-2 py-1 rounded-lg">
                  <Text
                    className="text-neutral-100 font-semibold text-center"
                    style={{fontSize: 4 * vw}}>
                    Declined
                  </Text>
                </View>
              )}
            </View>
          ))}
      </View>
    </ScrollView>
  );
};

export default MyRequest;

const styles = StyleSheet.create({});
