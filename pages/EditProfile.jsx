import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useMemo, useState} from 'react';
import {vw, vh} from 'react-native-viewport-units';
import Iconeye from 'react-native-vector-icons/Entypo';
import SelectDropdown from 'react-native-select-dropdown';
import Iconcamera from 'react-native-vector-icons/AntDesign';
import DocumentPicker from 'react-native-document-picker';
import {AuthContext} from '../context/AuthContext';
import {SERVER_URL, BUCKET_URL} from '@env';
import {Chip} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PopupWaiting from '../components/PopupWaiting';

const EditProfile = ({ navigation}) => {
  const [proImg, setProImg] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [passwordInputFocus, setPasswordInputFocus] = useState(false);
  const [profession, setProfession] = useState('');
  const [user, setUser] = useState({});
  const [coverImg, setCoverImg] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [fees, setFees] = useState('');
  const [freelancerServices, setFreelancerServices] = useState([]);
  const [bio, setBio] = useState('');
  const [eqiupments, setEquipments] = useState('');
  const [serviceQuery, setServiceQuery] = useState('');
  const [isWaiting, setIsWaiting] = useState(false);

  const {authData, dispatch} = useContext(AuthContext);

  const selectFile = async setFunc => {
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
      setFunc(res[0]);
    } catch (err) {
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

  const cities = [
    'Agra',
    'Ahmedabad',
    'Amritsar',
    'Aurangabad',
    'Bengaluru',
    'Bhopal',
    'Bhubaneswar',
    'Burdwan',
    'Chandigarh',
    'Chennai',
    'Coimbatore',
    'Dehradun',
    'Delhi',
    'Dhanbad',
    'Durgapur',
    'Faridabad',
    'Ghaziabad',
    'Guwahati',
    'Gwalior',
    'Hyderabad',
    'Indore',
    'Jaipur',
    'Jamshedpur',
    'Jodhpur',
    'Kanpur',
    'Kochi',
    'Kolkata',
    'Lucknow',
    'Ludhiana',
    'Madurai',
    'Mangaluru',
    'Meerut',
    'Mumbai',
    'Mysuru',
    'Nagpur',
    'Nashik',
    'New Delhi',
    'Navi Mumbai',
    'Patna',
    'Prayagraj',
    'Puducherry',
    'Pune',
    'Raipur',
    'Rajkot',
    'Ranchi',
    'Siliguri',
    'Surat',
    'Thane',
    'Thiruvananthapuram',
    'Udaipur',
    'Vadodara',
    'Varanasi',
    'Vijayawada',
    'Visakhapatnam',
    'Warangal',
  ];

  const services = [
    {
      profession: 'actor',
      service: [
        'photoshoot',
        'stageshow',
        'inauguration_ceremony',
        'social_promotion',
        'television_commercial_ads',
        'hoading_shoots',
        'brand_endorsement',
      ],
    },
    {
      profession: 'actress',
      service: [
        'photoshoot',
        'stageshow',
        'inauguration_ceremony',
        'social_promotion',
        'television_commercial_ads',
        'hoading_shoots',
        'brand_endorsement',
      ],
    },
    {
      profession: 'anchor',
      service: [
        'stageshow',
        'wedding_ceremony',
        'corporate_events',
        'personal_parties',
      ],
    },
    {
      profession: 'cinematographer',
      service: [
        'wedding_ceremony',
        'pre_wedding_ceremony',
        'corporate_events',
        'personal_parties',
        'fashion_portfolio',
        'food_industry',
        'automobile_industry',
        'architecture_shoot',
        'television_commercial_ads',
        'short_film',
        'music_video',
      ],
    },
    {
      profession: 'dancer',
      service: [
        'stageshow',
        'backleading_dancer',
        'wedding_party',
        'personal_parties',
        'music_video',
      ],
    },
    {
      profession: 'dance_teacher',
      service: [
        'modern_dance',
        'ballet',
        'swing',
        'tap_dance',
        'hip_hop',
        'folk_dance',
        'irish_dance',
        'bharatanatyam',
        'contemporary',
        'line_dancing',
        'samba',
        'tango',
        'ballroom',
        'bally_dance',
        'jazz',
        'jive',
        'break_dance',
        'capoeira',
        'cha_cha',
        'kathak',
        'mambo',
        'rumba',
        'salsa',
        'bolero',
      ],
    },
    {
      profession: 'dj',
      service: ['wedding_party', 'personal_parties', 'club_party'],
    },
    {
      profession: 'drawing_teacher',
      service: [
        'pencil_drawing',
        'ink_drawing',
        'pen_drawing',
        'chalk_drawing',
        'crayon_drawing',
        'charcoal_drawing',
      ],
    },
    {
      profession: 'drone_operator',
      service: [
        'wedding_ceremony',
        'pre_wedding_ceremony',
        'commercial_project',
        'industrial_project',
        'personal_parties',
        'political_rally',
        'television_commercial_ads',
      ],
    },
    {
      profession: 'fashion_designer',
      service: [
        'western',
        'athentic',
        'traditional',
        'wedding_ceremony',
        'pre_wedding_ceremony',
        'babyshoot',
        'maternity_shoot',
        'bridal_shoot',
        'television_commercial_ads',
        'television_serial',
        'fashion_show',
        'music_video',
        'film',
        'short_film',
      ],
    },
    {
      profession: 'graphics_designer',
      service: [
        'brochure_design',
        'magazine_design',
        'website_design',
        'logo_design',
        'poster_design',
        'hoarding_design',
      ],
    },
    {
      profession: 'influencer',
      service: ['reels', 'posts', 'stories', 'youtube_videoes'],
    },
    {
      profession: 'maid',
      service: ['cooking', 'moping', 'cloth_washing', 'dish_washing'],
    },
    {
      profession: 'makeup_artist',
      service: [
        'bridal_makeup',
        'fashion_shoot',
        'fashion_show',
        'party_makeup',
      ],
    },
    {
      profession: 'model',
      service: [
        'fashion_show',
        'bridal_shoot',
        'ramp_show',
        'music_video',
        'television_commercial_ads',
        'short_film',
        'hoarding_shoot',
        'bikini_shoot',
        'monokini_shoot',
        'semi_nude_shoot',
        'bold_shoot',
        'nude_shoot',
      ],
    },
    {
      profession: 'musician',
      service: [
        'pianist',
        'guitarist',
        'violinist',
        'cellist',
        'flutist',
        'trumpeter',
        'saxophonist',
        'drummer',
        'bassist',
        'harpist',
        'percussionist',
      ],
    },
    {
      profession: 'music_teacher',
      service: [
        'classical_music',
        'rock_music',
        'pop_music',
        'blues',
        'country_music',
        'folk_music',
        'world_music',
        'digital_music',
        'hip_hop',
        'rhythm_and_blues',
        'gospel',
        'reggae',
        'metal',
        'indie',
      ],
    },
    {
      profession: 'painter',
      service: ['portrait', 'wall_painting', 'family_portrait'],
    },
    {
      profession: 'photographer',
      service: [
        'wedding_ceremony',
        'pre_wedding_ceremony',
        'corporate_events',
        'personal_parties',
        'portfolio_shoot',
        'new_born_baby_shoot',
        'baby_shoot',
        'mundan',
        'upanayan',
        'rice_ceremony',
        'birthday_party',
      ],
    },
    {
      profession: 'private_tutor',
      service: ['arts', 'commerce', 'science'],
    },
    {
      profession: 'vocalist',
      service: [
        'soprano',
        'alto',
        'tenor',
        'bass',
        'baritone',
        'mezzo-soprano',
        'countertenor',
      ],
    },
    {
      profession: 'voice_over_artist',
      service: [
        'short_film',
        'audio_podcast',
        'film',
        'animation_film',
        'advertisement',
      ],
    },
    {
      profession: 'web_developer',
      service: [
        'wordpress',
        'wix',
        'squarespace',
        'weebly',
        'shopify',
        'webflow',
        'elementor',
        'jimdo',
        'mean',
        'mern',
        'mevn',
        'static',
      ],
    },
  ];

  const memoValue = useMemo(() => {
    return authData.userDetails;
  }, [authData.userDetails]);

  const updateProfile = async () => {
    if (bio.length > 500 || bio.length < 50) {
      return;
    }
    if (eqiupments.length > 200 || eqiupments.length < 50) {
      return;
    }
    setIsWaiting(true);
    try {
      const data = new FormData();
      if (typeof proImg !== 'string') {
        data.append('profilePicture', proImg);
      }
      if (typeof coverImg !== 'string') {
        data.append('coverPicture', coverImg);
      }
      data.append('location', location);
      data.append('email', email);
      if (password !== '') {
        data.append('password', password);
      }
      freelancerServices.forEach(element => {
        data.append('services[]', element);
      });
      data.append('rate', fees);
      data.append('bio', bio);
      data.append('equipments', eqiupments);
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${SERVER_URL}/edit/freelancer`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });
      const update = await res.json();
      if (update) {
        setIsWaiting(false);
        dispatch({
          type: 'login',
          payload: {userDetails: update, userType: 'freelancer'},
        });
        navigation.navigate('freelancer-profile', {
          uid: authData.userDetails.uid,
        });
      }
    } catch (error) {
      setIsWaiting(false);
      console.log(error);
    }
  };

  useEffect(() => {
    setUser(memoValue);
    setProfession(memoValue.profession);
    setEmail(memoValue.email);
    setLocation(memoValue.location);
    setFees(memoValue.rate.toString());
    setBio(memoValue.bio);
    setEquipments(memoValue.equipments);
    if (memoValue.services) setFreelancerServices(memoValue.services);
  }, [memoValue]);

  return (
    <ScrollView contentContainerStyle={{backgroundColor: '#fff'}}>
      <View className="pt-2 flex flex-col items-center gap-y-4">
        <Text
          style={{fontSize: 6 * vw}}
          className="font-semibold capitalize text-neutral-700">
          edit profile
        </Text>
        <View className="relative flex flex-col items-center h-64">
          <ImageBackground
            source={
              coverImg == ''
                ? {uri: `${BUCKET_URL}${user.coverPicture}`}
                : {uri: coverImg.uri}
            }
            resizeMode="cover"
            className="overflow-hidden">
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => selectFile(setCoverImg)}
              className="w-screen h-52 relative">
              <Iconcamera
                name="camera"
                color="#fff"
                size={7 * vw}
                style={{
                  position: 'absolute',
                  bottom: 1 * vh,
                  left: 2 * vw,
                  borderWidth: 1,
                  borderColor: 'rgba(163, 163, 163, 0.8)',
                  padding: 2 * vw,
                  borderRadius: 9999,
                }}
              />
            </TouchableOpacity>
          </ImageBackground>
          <ImageBackground
            source={
              proImg == ''
                ? {uri: `${BUCKET_URL}${user.profilePicture}`}
                : {uri: proImg.uri}
            }
            resizeMode="stretch"
            className="rounded-full overflow-hidden relative -top-16">
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => selectFile(setProImg)}
              className="w-32 h-32">
              <Text></Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <View className="flex flex-col items-stretch mx-4 w-[90%]">
          <Text className="text-base font-semibold capitalize text-black">
            email
          </Text>
          <TextInput
            placeholder="enter email address"
            inputMode="email"
            placeholderTextColor="#000"
            value={email}
            onChangeText={text => setEmail(text)}
            className="border-b text-black"
          />
        </View>
        <View className="flex flex-col items-stretch mx-4 w-[90%]">
          <Text className="text-base font-semibold capitalize text-black">
            password
          </Text>
          <View className="border-b flex flex-row items-center">
            <TextInput
              placeholder="enter password"
              secureTextEntry={showPassword}
              value={password}
              placeholderTextColor="#000"
              onChangeText={text => setPassword(text)}
              inputMode="text"
              onFocus={() => setPasswordInputFocus(true)}
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
        <View className="flex flex-col items-stretch">
          <Text className="text-base font-semibold capitalize text-black">
            location
          </Text>
          <SelectDropdown
            data={cities}
            buttonStyle={{
              width: '90%',
              backgroundColor: 'transparent',
              borderBottomWidth: 1,
              borderBottomColor: 'black',
            }}
            defaultValue={location}
            defaultButtonText={'select your city'}
            rowTextStyle={{textTransform: 'capitalize'}}
            buttonTextStyle={{
              fontSize: 15,
              color: '#000',
              textAlign: 'left',
            }}
            onSelect={(selectedItem, index) => {
              setLocation(selectedItem.split(' ').join('_'));
            }}
            search={true}
            searchPlaceHolder={'enter city name'}
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
        <View className="flex flex-col items-stretch w-[90%]">
          <Text className="text-base font-semibold capitalize text-black">
            fees per{' '}
            {(profession === 'actor' ||
              profession === 'actress' ||
              profession === 'model') &&
              'shoot'}
            {profession === 'influencer' && 'post'}
            {profession === 'fashion_designer' && 'Dress'}
            {(profession === 'babysitter' ||
              profession === 'maid' ||
              profession === 'dance_teacher' ||
              profession === 'drawing_teacher' ||
              profession === 'music_teacher' ||
              profession == 'private_tutor') &&
              'Month'}
            {(profession === 'dj' ||
              profession == 'musician' ||
              profession === 'drone_operator') &&
              'Hour'}
            {(profession === 'album_designer' ||
              profession === 'dancer' ||
              profession === 'graphics_designer' ||
              profession === 'interior_designer' ||
              profession === 'mehendi_artist' ||
              profession === 'painter' ||
              profession === 'photo_editor' ||
              profession === 'video_editor' ||
              profession === 'voice_over_artist' ||
              profession === 'anchor' ||
              profession === 'lyricist' ||
              profession === 'makeup_artist' ||
              profession === 'vocalist' ||
              profession === 'web_developer') &&
              'Project'}
            {(profession === 'cinematographer' ||
              profession === 'photographer' ||
              profession === '') &&
              'Day'}
          </Text>
          <TextInput
            inputMode="decimal"
            placeholder="enter the amount"
            className="border-b"
            placeholderTextColor="#000"
            value={fees}
            onChangeText={text => setFees(text)}
          />
        </View>
        {profession !== '' &&
          profession !== 'album_designer' &&
          profession !== 'babysitter' &&
          profession !== 'photo_editor' &&
          profession !== 'video_editor' &&
          profession !== 'interior_designer' &&
          profession !== 'lyricist' &&
          profession !== 'mehendi_artist' && (
            <View className="flex flex-col items-stretch gap-y-2 w-[90%]">
              <Text className="text-base font-semibold capitalize text-black">
                types of services you provide
              </Text>
              {freelancerServices.length > 0 && (
                <View className="flex flex-row flex-wrap gap-2">
                  {freelancerServices.map((item, index) => (
                    <Chip
                      key={index}
                      closeIcon="close"
                      onClose={() => {
                        const newService = [...freelancerServices];
                        if (newService.includes(item)) {
                          let index = newService.indexOf(item);
                          setFreelancerServices(prevState => [
                            ...prevState.slice(0, index),
                            ...prevState.slice(index + 1, prevState.length),
                          ]);
                        }
                      }}>
                      {item.split('_').join(' ')}
                    </Chip>
                  ))}
                </View>
              )}
              <View className="flex flex-col gap-y-2">
                <TextInput
                  placeholder="search for your services"
                  value={serviceQuery}
                  className="border-b"
                  onChangeText={text => setServiceQuery(text)}
                />
                {serviceQuery.length > 0 && (
                  <View className="flex flex-col gap-y-2">
                    {services.map(
                      item =>
                        item.profession === profession &&
                        item.service.map((s, i) => (
                          <TouchableOpacity
                            onPress={() =>
                              setFreelancerServices(prev => [...prev, s])
                            }
                            key={i}
                            className="border border-neutral-400 px-3 py-1">
                            <Text className="capitalize font-semibold text-black text-base">
                              {s.split('_').join(' ')}
                            </Text>
                          </TouchableOpacity>
                        )),
                    )}
                  </View>
                )}
              </View>
            </View>
          )}
        <View className="flex flex-col items-stretch gap-y-4 w-[90%]">
          <Text className="text-base font-semibold capitalize text-black">
            bio
          </Text>
          <TextInput
            inputMode="text"
            multiline
            placeholder="write about yourself"
            className="border h-32"
            placeholderTextColor="#000"
            value={bio}
            onChangeText={text => setBio(text)}
            style={{textAlignVertical: 'top'}}
          />
        </View>
        <View className="flex flex-col items-stretch gap-y-4 w-[90%]">
          {(profession === 'photographer' ||
            profession === 'drone_operator' ||
            profession === 'cinematographer' ||
            profession === 'musician' ||
            profession === '') && (
            <Text className="text-base font-semibold capitalize text-black">
              Equipments Available
            </Text>
          )}
          {(profession === 'makeup_artist' ||
            profession === 'mehendi_artist') && (
            <Text className="text-base font-semibold capitalize text-black">
              Products Use :
            </Text>
          )}
          {(profession === 'model' ||
            profession === 'anchor' ||
            profession === 'dj' ||
            profession === 'dancer' ||
            profession === 'influencer' ||
            profession === 'private_tutor' ||
            profession === 'dance_teacher' ||
            profession === 'music_teacher' ||
            profession === 'drawing_teacher' ||
            profession === 'painter' ||
            profession === 'lyricist' ||
            profession === 'voice_over_artist' ||
            profession === 'fashion_designer' ||
            profession === 'vocalist' ||
            profession === 'actor' ||
            profession === 'actress' ||
            profession === 'babysitter' ||
            profession === 'maid' ||
            profession === 'interior_designer') && (
            <Text className="text-base font-semibold capitalize text-black">
              Describe your work experience :
            </Text>
          )}
          {(profession === 'photo_editor' ||
            profession === 'video_editor' ||
            profession === 'album_designer' ||
            profession === 'graphics_designer') && (
            <Text className="text-base font-semibold capitalize text-black">
              Software Knowledge :
            </Text>
          )}
          {profession === 'web_developer' && (
            <Text className="text-base font-semibold capitalize text-black">
              Fimiliar Language :
            </Text>
          )}
          <TextInput
            inputMode="text"
            multiline
            value={eqiupments}
            onChangeText={text => setEquipments(text)}
            placeholder="write your equipments"
            placeholderTextColor="#000"
            className="border h-32"
            style={{textAlignVertical: 'top'}}
          />
        </View>
        <TouchableOpacity
          className="self-center bg-blue-500 py-2 w-28 flex items-center justify-center rounded-3xl"
          onPress={updateProfile}>
          <Text className="text-white capitalize font-bold text-lg">
            update
          </Text>
        </TouchableOpacity>
      </View>
      <PopupWaiting isWaiting={isWaiting} setIsWaiting={setIsWaiting} />
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({});
