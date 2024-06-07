import {
  Animated,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Iconstar from 'react-native-vector-icons/AntDesign';
import Iconclose from 'react-native-vector-icons/MaterialCommunityIcons';
import {vw, vh} from 'react-native-viewport-units';
import {SERVER_URL} from '@env';
import {HelperText} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReviewForm = ({
  showReviewForm,
  setShowReviewForm,
  freelancer,
  setReviews,
}) => {
  const [starRating, setStarRating] = useState(null);
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  const [reviewAlreadyExists, setReviewAlreadyExists] = useState(false);
  const [minErr1, setMinErr1] = useState(false);
  const [minErr2, setMinErr2] = useState(false);
  const starRatingOptions = [1, 2, 3, 4, 5];
  const animatedButtonScale = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1.5,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const animatedScaleStyle = {
    transform: [{scale: animatedButtonScale}],
  };

  async function postReview() {
    if (title.length < 3) {
      setMinErr1(true);
      return;
    }
    if (review.length < 50) {
      setMinErr2(true);
      return;
    }
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const response = await fetch(`${SERVER_URL}/add/review`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            freelancer: freelancer._id,
            title: title,
            review: review,
            stars: starRating,
          }),
        });
        const data = await response.json();
        if (data.message === 'Review already exists') {
          setReviewAlreadyExists(true);
          return;
        }
        setReviews(prev => [...prev, data]);
      }
      setShowReviewForm(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal
      animationType="slide"
      visible={showReviewForm}
      transparent={true}
      onRequestClose={() => {
        setShowReviewForm(false);
        setReviewAlreadyExists(false);
      }}>
      <View
        className="flex-1 items-center justify-center"
        style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
        <View className="bg-white rounded-xl px-4 py-2 flex flex-col items-start gap-y-4 relative">
          <Pressable
            className="absolute right-2"
            onPress={() => setShowReviewForm(false)}>
            <Iconclose name="close-thick" size={8 * vw} color="#000" />
          </Pressable>
          <View>
            <Text style={{fontSize: 6 * vw}} className="font-bold text-black">
              Give a Feedback
            </Text>
          </View>
          <HelperText
            type="error"
            visible={reviewAlreadyExists}
            padding="none"
            style={{
              fontSize: 4 * vw,
              position: 'absolute',
              top: '21%',
              left: '5%',
            }}>
            You already gave a review
          </HelperText>
          <View className="flex flex-row">
            {starRatingOptions.map(option => (
              <TouchableWithoutFeedback
                onPressIn={() => handlePressIn(option)}
                onPressOut={() => handlePressOut(option)}
                onPress={() => setStarRating(option)}
                key={option}>
                <Animated.View style={animatedScaleStyle}>
                  <Iconstar
                    name="star"
                    size={6 * vw}
                    color={starRating >= option ? '#fbbc04' : '#d0d0d0'}
                  />
                </Animated.View>
              </TouchableWithoutFeedback>
            ))}
          </View>
          <View className="self-stretch flex flex-col gap-y-2">
            <Text
              style={{fontSize: 4 * vw}}
              className="font-medium text-black capitalize">
              overview
            </Text>
            <View
              className="border border-neutral-300 relative"
              style={{width: 80 * vw}}>
              <TextInput
                className=""
                value={title}
                onChangeText={text => {
                  setMinErr1(false);
                  setTitle(text);
                }}
                style={{textAlignVertical: 'top'}}
              />
              <Text className="absolute bottom-0 right-1 text-neutral-700">
                {title.length}/26
              </Text>
            </View>
            <HelperText
              type="error"
              visible={minErr1}
              padding="none"
              style={{
                fontSize: 4 * vw,
              }}>
              Overview must be greater than 3 chracters
            </HelperText>
          </View>
          <View className="self-stretch flex flex-col gap-y-2">
            <Text
              style={{fontSize: 4 * vw}}
              className="font-medium text-black capitalize">
              describe in details
            </Text>
            <View
              className="border border-neutral-300 relative"
              style={{width: 80 * vw}}>
              <TextInput
                multiline
                value={review}
                onChangeText={text => {
                  setMinErr2(false);
                  setReview(text);
                }}
                style={{textAlignVertical: 'top'}}
                className="h-20"
              />
              <Text className="absolute bottom-0 right-1 text-neutral-700">
                50/200
              </Text>
            </View>
            <HelperText
              type="error"
              visible={minErr2}
              padding="none"
              style={{
                fontSize: 4 * vw,
              }}>
              Description must be greater than 50 chracters
            </HelperText>
          </View>
          <Pressable className="bg-black rounded-md" onPress={postReview}>
            <Text
              style={{fontSize: 4 * vw}}
              className="text-white font-bold capitalize px-4 py-1">
              submit
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ReviewForm;

const styles = StyleSheet.create({});
