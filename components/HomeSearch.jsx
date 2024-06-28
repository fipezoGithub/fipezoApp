import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Iconsearch from 'react-native-vector-icons/AntDesign';
import Iconcategory from 'react-native-vector-icons/MaterialIcons';
import Iconperson from 'react-native-vector-icons/FontAwesome6';
import {vw, vh} from 'react-native-viewport-units';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';
import {SERVER_URL} from '@env';
import ProfileCard from './ProfileCard';

const HomeSearch = ({showModal, setShowModal}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCategory, setShowCategory] = useState(true);
  const [shownCategories, setShownCategories] = useState([]);
  const [freelancers, setFreelancers] = useState([]);
  const navigation = useNavigation();

  const categories = [
    'actor',
    'actress',
    'anchor',
    'album_designer',
    'babysitter',
    'cinematographer',
    'dancer',
    'dance_teacher',
    'drawing_teacher',
    'dj',
    'drone_operator',
    'fashion_designer',
    'graphics_designer',
    'influencer',
    'interior_designer',
    'lyricist',
    'maid',
    'makeup_artist',
    'mehendi_artist',
    'model',
    'musician',
    'music_teacher',
    'painter',
    'photographer',
    'photo_editor',
    'private_tutor',
    'video_editor',
    'vocalist',
    'voice_over_artist',
    'web_developer',
  ];

  const handelChange = query => {
    setSearchQuery(query);
    const matchValue = new RegExp(query, 'i');
    const matchedElements = categories.filter(element =>
      matchValue.test(element),
    );
    query.length > 0
      ? setShownCategories(matchedElements)
      : setShownCategories([]);

    handelFreelancerSearch(query);
  };

  const handelFreelancerSearch = async query => {
    try {
      const resp = await fetch(
        `${SERVER_URL}/freelancer/search?loc=Kolkata&page=1`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({query: query}),
        },
      );
      const respData = await resp.json();
      setFreelancers(respData.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      animationType="slide"
      isVisible={showModal}
      animationIn="slideInUp"
      animationInTiming={500}
      animationOut="slideOutUp"
      animationOutTiming={500}
      useNativeDriverForBackdrop={true}
      backdropTransitionOutTiming={500}
      backdropOpacity={1}
      style={{
        position: 'relative',
        margin: 0,
        width: '100%',
        backgroundColor: 'white',
      }}>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          rowGap: 16,
          marginVertical: 3 * vh,
          marginBottom: 12,
        }}>
        <View className="flex flex-row items-center border px-2 rounded-3xl w-[90%]">
          <TouchableOpacity onPress={() => setShowModal(false)}>
            <Iconsearch name="left" size={20} color="#9e3e33" />
          </TouchableOpacity>
          <TextInput
            placeholder="search for category or freelancer..."
            value={searchQuery}
            className="text-neutral-900"
            placeholderTextColor="rgba(115,115,115,1)"
            onChangeText={text => handelChange(text)}
            onEndEditing={handelFreelancerSearch}
          />
        </View>
        <View className="flex flex-row items-center">
          <TouchableOpacity onPress={() => setShowCategory(true)}>
            <View
              className={
                'flex flex-row items-center gap-x-2 px-4 py-2 border rounded-2xl border-r-0 rounded-r-none ' +
                (showCategory ? 'border-orange-500' : 'border-black')
              }>
              <Iconcategory
                name="category"
                size={20}
                color={showCategory ? '#f97316' : '#bebebe'}
              />
              <Text
                className={
                  'capitalize font-medium ' +
                  (showCategory ? 'text-orange-500' : 'text-black')
                }
                style={{fontSize: 4 * vw}}>
                category
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowCategory(false)}>
            <View
              className={
                'flex flex-row items-center gap-x-2 px-4 py-2 border rounded-2xl rounded-l-none ' +
                (!showCategory ? 'border-orange-500' : 'border-black')
              }>
              <Iconperson
                name="person"
                size={20}
                color={!showCategory ? '#f97316' : '#bebebe'}
              />
              <Text
                className={
                  'capitalize font-medium ' +
                  (!showCategory ? 'text-orange-500' : 'text-black')
                }
                style={{fontSize: 4 * vw}}>
                freelancer
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <Text
            className="capitalize font-semibold tracking-widest text-neutral-500"
            style={{fontSize: 5 * vw}}>
            search results
          </Text>
        </View>
        <View className="flex flex-col items-center gap-y-2 w-[90%]">
          {showCategory &&
            (shownCategories.length > 0 ? (
              shownCategories.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  className="border px-4 py-2 w-full"
                  onPress={() => {
                    navigation.navigate('freelancer-category', {
                      category: item,
                    });
                    setShowModal(false);
                  }}>
                  <Text
                    className="capitalize font-semibold text-black"
                    style={{fontSize: 4 * vw}}>
                    {item.split('_').join(' ')}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text
                className="text-black font-semibold"
                style={{fontSize: 5 * vw}}>
                Nothing to show. Try search something
              </Text>
            ))}
          {!showCategory &&
            (freelancers.length > 0 ? (
              freelancers.map((item, index) => (
                <ProfileCard key={index} item={item} navigation={navigation} />
              ))
            ) : (
              <Text
                className="text-black font-semibold"
                style={{fontSize: 5 * vw}}>
                Nothing to show. Try search something
              </Text>
            ))}
        </View>
      </ScrollView>
    </Modal>
  );
};

export default HomeSearch;

const styles = StyleSheet.create({});
