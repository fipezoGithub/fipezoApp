import {
  ImageBackground,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useRef, useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
import Icongoogle from 'react-native-vector-icons/AntDesign';
import Iconfacebook from 'react-native-vector-icons/FontAwesome';
import Iconeye from 'react-native-vector-icons/Entypo';
import Iconsearch from 'react-native-vector-icons/AntDesign';
import SelectDropdown from 'react-native-select-dropdown';
import {Chip, HelperText} from 'react-native-paper';
import {vw, vh} from 'react-native-viewport-units';
import {SERVER_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../context/AuthContext';
import { removeListener, startOtpListener, useOtpVerify } from 'react-native-otp-verify';

const FreelancerSignup = ({navigation, gooleSignin}) => {
  const [showPassword, setShowPassword] = useState(true);
  const [passwordInputFocus, setPasswordInputFocus] = useState(false);
  const [otpForm, setOtpForm] = useState(false);
  const [proImg, setProImg] = useState('');
  const [coverImg, setCoverImg] = useState('');
  const [profession, setProfession] = useState('actor');
  const [currentStage, setCurrentStage] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp1, setOTP1] = useState('');
  const [otp2, setOTP2] = useState('');
  const [otp3, setOTP3] = useState('');
  const [otp4, setOTP4] = useState('');
  const [otp5, setOTP5] = useState('');
  const [otp6, setOTP6] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('Agra');
  const [fees, setFees] = useState('');
  const [refferCode, setRefferCode] = useState('');
  const [bio, setBio] = useState('');
  const [equipment, setEquipment] = useState('');
  const [serviceQuery, setServiceQuery] = useState('');
  const [freelancerServices, setFreelancerServices] = useState([]);
  const [count, setCount] = useState(120);
  const [timerId, setTimerId] = useState(null);
  const [signupFailed, setSignupFailed] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [hasErrors, setHasErrors] = useState({
    firstNameError: false,
    lastNameError: false,
    phoneError: false,
    emailError: false,
    passwordError: false,
    feesError: false,
    bioError: false,
    equipmentError: false,
    otpError: false,
    profilePictureError: false,
    coverPictureError: false,
  });

  const otp1Ref = useRef(null);
  const otp2Ref = useRef(null);
  const otp3Ref = useRef(null);
  const otp4Ref = useRef(null);
  const otp5Ref = useRef(null);
  const otp6Ref = useRef(null);

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

  const categories = [
    'Actor',
    'Actress',
    'Album Designer',
    'Anchor',
    'Babysitter',
    'Cinematographer',
    'Dancer',
    'Dance Teacher',
    'DJ',
    'Drawing Teacher',
    'Drone Operator',
    'Fashion Designer',
    'Graphics Designer',
    'Influencer',
    'Interior Designer',
    'Lyricist',
    'Maid',
    'Makeup Artist',
    'Mehendi Artist',
    'Model',
    'Musician',
    'Music Teacher',
    'Painter',
    'Photographer',
    'Photo Editor',
    'Private Tutor',
    'Video Editor',
    'Vocalist',
    'Voice Over Artist',
    'Web Developer',
  ];

  const {dispatch} = useContext(AuthContext);

  async function handelCheckStage1() {
    if (firstName.length < 1) {
      setHasErrors(prev => ({...prev, firstNameError: true}));
      return;
    }
    if (lastName.length < 1) {
      setHasErrors(prev => ({...prev, lastNameError: true}));
      return;
    }
    if (phone.length !== 10) {
      setHasErrors(prev => ({...prev, phoneError: true}));
      return;
    }
    if (email.length < 1 || !email.includes('@') || (await checkEmail(email))) {
      setHasErrors(prev => ({...prev, emailError: true}));
      return;
    }
    if (password.length < 7) {
      setHasErrors(prev => ({...prev, passwordError: true}));
      return;
    }

    if (proImg === '') {
      setHasErrors(prev => ({...prev, profilePictureError: true}));
      return;
    }

    if (coverImg === '') {
      setHasErrors(prev => ({...prev, coverPictureError: true}));
      return;
    }

    setCurrentStage(1);
  }

  function handelCheckStage2() {
    if (fees.length < 3) {
      setHasErrors(prev => ({...prev, feesError: true}));
      return;
    }
    setCurrentStage(2);
  }

  function handelCheckStage3() {
    if (bio.length < 50 || bio.length > 300) {
      setHasErrors(prev => ({...prev, bioError: true}));
      return;
    }

    if (equipment.length < 50 || equipment.length > 200) {
      setHasErrors(prev => ({...prev, equipmentError: true}));
      return;
    }
    getOTP();
    setOtpForm(true);
  }

  async function checkEmail(val) {
    try {
      const res = await fetch(`${SERVER_URL}/verify/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: email}),
      });
      if (res.status !== 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handelOTP = async () => {
    try {
      setIsWaiting(true);
      const response = await fetch(`${SERVER_URL}/verify/freelancer/phone`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          otp: `${otp1}${otp2}${otp3}${otp4}${otp5}${otp6}`,
          phone: phone,
          type: 'freelancer',
        }),
      });
      if (response.status !== 200) {
        setHasErrors(prev => ({...prev, otpError: true}));
        return;
      } else {
        setIsWaiting(false);
        await createNewProfile();
      }
    } catch (error) {
      console.error(error);
      setIsWaiting(false);
    }
  };

  const getOTP = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: phone,
          type: 'freelancer',
        }),
      });
      if (res.status === 403) {
        setSignupFailed(true);
        return;
      } else {
        setSignupFailed(false);
        startCountdown();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createNewProfile = async () => {
    const token = null;
    try {
      const data = new FormData();
      data.append(
        'uid',
        firstName.split(' ').join('_').toLowerCase() +
          '.' +
          lastName.split(' ').join('_').toLowerCase() +
          '_' +
          parseInt(phone).toString(16),
      );
      data.append('firstname', firstName.toLowerCase());
      data.append('lastname', lastName.toLowerCase());
      data.append('phone', phone);
      data.append('location', location);
      data.append('profession', profession);
      freelancerServices.forEach(element => {
        data.append('services[]', element);
      });
      data.append('email', email);
      data.append('password', password);
      data.append('rate', fees);
      data.append('bio', bio);
      data.append('equipments', equipment);
      data.append('followers', null);
      data.append('following', null);
      data.append('profilePicture', proImg);
      data.append('coverPicture', coverImg);
      data.append(
        'pictureStyle',
        JSON.stringify({coverPicture: 'center', profilePicture: 'center'}),
      );
      data.append('usedReferalId', refferCode);
      data.append('verified', false);
      const response = await fetch(`${SERVER_URL}/register/freelancer`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });
      const responseData = await response.json();
      await AsyncStorage.setItem('token', responseData.token);
      dispatch({type: 'isLoggedIn'});
      navigation.navigate('Explore');
      setOtpForm(false);
    } catch (error) {
      console.error(error);
      setSignupFailed(true);
    }
  };

  const selectFile = async setFunc => {
    // Opening Document Picker to select one file
    setHasErrors(prev => ({...prev, profilePictureError: false}));
    setHasErrors(prev => ({...prev, coverPictureError: false}));
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
      } else {
        // For Unknown Error
        console.error('Unknown Error: ' + JSON.stringify(err));
      }
    }
  };

  const startCountdown = () => {
    setCount(120);
    setTimerId(
      setInterval(() => {
        setCount(prevCount => prevCount - 1);
      }, 1000),
    );
  };

  const getImageBlob = async imageUrl => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      return blob;
    } catch (error) {
      console.error('Error fetching image:', error);
      return null;
    }
  };

  const signIn = async () => {
    try {
      await gooleSignin.hasPlayServices();
      const userInfo = await gooleSignin.signIn();
      const {user} = userInfo;
      const photo = await getImageBlob(user.photo);
      const reader = new FileReader();
      reader.readAsDataURL(photo);
      reader.onloadend = () => {
        const base64data = reader.result;
        const imageData = {
          fileCopyUri: null,
          name: user.photo.substring(user.photo.lastIndexOf('/') + 1),
          size: photo.size,
          type: photo.type,
          uri: base64data,
        };
        setProImg(imageData);
      };
      setFirstName(user.givenName);
      setLastName(user.familyName);
      setEmail(user.email);
    } catch (error) {
      console.error(error);
    }
  };

  const {hash, otp, message, timeoutError, stopListener, startListener} =
    useOtpVerify({numberOfDigits: 6});

  useEffect(() => {
    // getHash()
    //   .then(hash => {
    //     console.log(hash);
    //   })
    //   .catch(console.log);

    startOtpListener(message => {
      // extract the otp using regex e.g. the below regex extracts 4 digit otp from message
      const otp = /(\d{6})/g.exec(message)[1];
      otp.split('').map((item, index) => {
        if (index === 0) {
          setOTP1(item);
        } else if (index === 1) {
          setOTP2(item);
        } else if (index === 2) {
          setOTP3(item);
        } else if (index === 3) {
          setOTP4(item);
        } else if (index === 4) {
          setOTP5(item);
        } else if (index === 5) {
          setOTP6(item);
        }
      });
    });

    return () => removeListener();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: 50,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#ffffff',
        position: 'relative',
        minHeight: '100%',
        paddingBottom: 10 * vw,
      }}>
      <View className="flex items-center justify-center gap-y-2 mx-4 mt-8">
        <Text className="text-5xl font-bold text-black">Welcome</Text>
        <Text className="text-lg text-black text-center">
          fill up the form below for a new freelancer account
        </Text>
      </View>
      <View className="flex gap-y-6 w-[360]">
        {currentStage === 0 && (
          <View className="flex flex-col items-stretch justify-center gap-y-4">
            <Text className="text-black text-2xl font-semibold my-4 text-center">
              Basic Information
            </Text>
            <View className="relative flex flex-col items-center h-64">
              <ImageBackground
                source={
                  coverImg == ''
                    ? require('../assets/signup-cover.png')
                    : {uri: coverImg.uri}
                }
                resizeMode="cover"
                className="overflow-hidden">
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => selectFile(setCoverImg)}
                  className="w-screen h-52">
                  {coverImg === '' && (
                    <Text className="text-center text-3xl font-bold my-4 text-black">
                      Add cover
                    </Text>
                  )}
                </TouchableOpacity>
              </ImageBackground>
              <ImageBackground
                source={
                  proImg == '' ? require('../assets/dp.png') : {uri: proImg.uri}
                }
                resizeMode="cover"
                className="rounded-full overflow-hidden relative -top-24">
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => selectFile(setProImg)}
                  className="w-40 h-40">
                  <Text></Text>
                </TouchableOpacity>
              </ImageBackground>
              <HelperText
                type="error"
                visible={
                  hasErrors.profilePictureError || hasErrors.coverPictureError
                }
                padding="none"
                style={{
                  fontSize: 3.7 * vw,
                  top: '-12%',
                  position: 'absolute',
                  right: 0,
                }}>
                {hasErrors.profilePictureError &&
                  'Profile picture is required and should be less than 10 mb'}
                {hasErrors.coverPictureError &&
                  'Cover picture is required and should be less than 10 mb'}
              </HelperText>
            </View>
            <View className="flex flex-col items-stretch mx-4">
              <Text className="text-xl font-semibold capitalize text-black">
                first name
              </Text>
              <TextInput
                inputMode="text"
                placeholder="enter your first name"
                placeholderTextColor="#a3a3a3"
                className="border-b text-neutral-800"
                value={firstName}
                onChangeText={text => {
                  setHasErrors(prev => ({...prev, firstNameError: false}));
                  setFirstName(text);
                }}
              />
              <HelperText
                type="error"
                visible={hasErrors.firstNameError}
                padding="none"
                style={{fontSize: 4 * vw}}>
                First name can't be empty!
              </HelperText>
            </View>
            <View className="flex flex-col items-stretch mx-4">
              <Text className="text-xl font-semibold capitalize text-black">
                last name
              </Text>
              <TextInput
                inputMode="text"
                placeholder="enter your last name"
                placeholderTextColor="#a3a3a3"
                className="border-b text-neutral-800"
                value={lastName}
                onChangeText={text => {
                  setHasErrors(prev => ({...prev, lastNameError: false}));
                  setLastName(text);
                }}
              />
              <HelperText
                type="error"
                visible={hasErrors.lastNameError}
                padding="none"
                style={{fontSize: 4 * vw}}>
                Last name can't be empty!
              </HelperText>
            </View>
            <View className="flex flex-col items-stretch mx-4">
              <Text className="text-xl font-semibold capitalize text-black">
                phone
              </Text>
              <View className="border-b flex flex-row items-center">
                <TextInput
                  placeholder="enter your number"
                  inputMode="numeric"
                  placeholderTextColor="#a3a3a3"
                  className="text-neutral-800"
                  value={phone}
                  onChangeText={text => {
                    setHasErrors(prev => ({...prev, phoneError: false}));
                    setPhone(text);
                  }}
                />
              </View>
              <HelperText
                type="error"
                visible={hasErrors.phoneError}
                padding="none"
                style={{fontSize: 4 * vw}}>
                Phone is not valid!
              </HelperText>
            </View>
            <View className="flex flex-col items-stretch mx-4">
              <Text className="text-xl font-semibold capitalize text-black">
                email
              </Text>
              <TextInput
                placeholder="enter email address"
                inputMode="email"
                placeholderTextColor="#a3a3a3"
                className="border-b text-neutral-800"
                value={email}
                onChangeText={text => {
                  setHasErrors(prev => ({...prev, emailError: false}));
                  setEmail(text);
                }}
              />
              <HelperText
                type="error"
                visible={hasErrors.emailError}
                padding="none"
                style={{fontSize: 4 * vw}}>
                Email is not valid!
              </HelperText>
            </View>
            <View className="flex flex-col items-stretch mx-4">
              <Text className="text-xl font-semibold capitalize text-black">
                password
              </Text>
              <View className="border-b flex flex-row items-center">
                <TextInput
                  placeholder="enter password"
                  secureTextEntry={showPassword}
                  inputMode="text"
                  placeholderTextColor="#a3a3a3"
                  className="text-neutral-800"
                  value={password}
                  onChangeText={text => {
                    setHasErrors(prev => ({...prev, passwordError: false}));
                    setPassword(text);
                  }}
                  onFocus={() => setPasswordInputFocus(true)}
                  onBlur={() => setPasswordInputFocus(false)}
                />
                {passwordInputFocus && (
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <Iconeye name="eye" size={20} color="#000000" />
                    ) : (
                      <Iconeye name="eye-with-line" size={20} color="#000000" />
                    )}
                  </TouchableOpacity>
                )}
              </View>
              <HelperText
                type="error"
                visible={hasErrors.passwordError}
                padding="none"
                style={{fontSize: 4 * vw}}>
                Password should be altleast 8 chracter!
              </HelperText>
            </View>
            <TouchableOpacity
              className="self-center bg-blue-500 py-2 w-60 flex items-center justify-center rounded-3xl"
              onPress={handelCheckStage1}>
              <Text className="text-white capitalize font-bold text-lg">
                next
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {currentStage === 1 && (
          <View className="flex flex-col items-stretch justify-center gap-y-4 mx-4">
            <Text className="text-black text-2xl font-semibold my-4 text-center">
              Freelance Information
            </Text>
            <View className="flex flex-col items-stretch">
              <Text className="text-base font-semibold capitalize text-black">
                location
              </Text>
              <SelectDropdown
                data={cities}
                buttonStyle={{
                  width: '100%',
                  backgroundColor: 'transparent',
                  borderBottomWidth: 1,
                  borderBottomColor: 'black',
                }}
                defaultButtonText={'select your city'}
                defaultValue={location}
                rowTextStyle={{textTransform: 'capitalize'}}
                buttonTextStyle={{
                  fontSize: 15,
                  color: 'rgb(115 115 115)',
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
            <View className="flex flex-col items-stretch">
              <Text className="text-base font-semibold capitalize text-black">
                profession
              </Text>
              <SelectDropdown
                data={categories}
                buttonStyle={{
                  width: '100%',
                  backgroundColor: 'transparent',
                  borderBottomWidth: 1,
                  borderBottomColor: 'black',
                }}
                defaultButtonText={'select your freelance category'}
                rowTextStyle={{textTransform: 'capitalize'}}
                buttonTextStyle={{
                  fontSize: 15,
                  color: 'rgb(115 115 115)',
                  textAlign: 'left',
                }}
                defaultValue={profession
                  .split('_')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
                onSelect={(selectedItem, index) => {
                  setProfession(
                    selectedItem.split(' ').join('_').toLowerCase(),
                  );
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
            <View className="flex flex-col items-stretch">
              <Text className="text-base font-semibold capitalize text-black">
                fee per{' '}
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
                placeholderTextColor="#a3a3a3"
                className="border-b text-neutral-800"
                value={fees}
                onChangeText={text => {
                  setHasErrors(prev => ({...prev, feesError: false}));
                  setFees(text);
                }}
              />
              <HelperText
                type="error"
                visible={hasErrors.feesError}
                padding="none"
                style={{fontSize: 4 * vw}}>
                Fees can't be blank
              </HelperText>
            </View>
            {profession !== '' &&
              profession !== 'album_designer' &&
              profession !== 'babysitter' &&
              profession !== 'photo_editor' &&
              profession !== 'video_editor' &&
              profession !== 'interior_designer' &&
              profession !== 'lyricist' &&
              profession !== 'mehendi_artist' && (
                <View className="flex flex-col items-stretch gap-y-2">
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
                      placeholder="search your services"
                      value={serviceQuery}
                      placeholderTextColor="#a3a3a3"
                      className="border-b text-neutral-800"
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
            <View className="flex flex-row justify-between">
              <TouchableOpacity
                className="self-center bg-slate-500 py-2 w-28 flex items-center justify-center rounded-3xl"
                onPress={() => setCurrentStage(0)}>
                <Text className="text-white capitalize font-bold text-lg">
                  back
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="self-center bg-blue-500 py-2 w-28 flex items-center justify-center rounded-3xl"
                onPress={handelCheckStage2}>
                <Text className="text-white capitalize font-bold text-lg">
                  next
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {currentStage === 2 && (
          <View className="flex flex-col items-stretch justify-center gap-y-4 mx-4">
            <Text className="text-black text-2xl font-semibold my-4 text-center">
              Additional Information
            </Text>
            <View className="flex flex-col items-stretch">
              <Text className="text-base font-semibold capitalize text-black">
                referal code {`(`}optional{`)`}
              </Text>
              <TextInput
                inputMode="text"
                value={refferCode}
                onChangeText={text => setRefferCode(text)}
                placeholder="eg:ANI354"
                placeholderTextColor="#a3a3a3"
                className="border-b text-neutral-800"
              />
            </View>
            <View className="flex flex-col items-stretch gap-y-4">
              <Text className="text-base font-semibold capitalize text-black">
                bio
              </Text>
              <TextInput
                inputMode="text"
                multiline
                value={bio}
                onChangeText={text => {
                  setHasErrors(prev => ({...prev, bioError: false}));
                  setBio(text);
                }}
                placeholder="write about yourself"
                className="border h-32 text-neutral-800"
                placeholderTextColor="#a3a3a3"
                style={{textAlignVertical: 'top'}}
              />
              <HelperText
                type="error"
                visible={hasErrors.bioError}
                padding="none"
                style={{fontSize: 4 * vw}}>
                Bio should be altleast 300 chracters
              </HelperText>
            </View>
            <View className="flex flex-col items-stretch gap-y-4">
              {(profession === 'photographer' ||
                profession === 'drone_operator' ||
                profession === 'cinematographer' ||
                profession === 'musician' ||
                profession === '') && (
                <Text className="text-xl font-semibold capitalize text-black">
                  Equipments Available
                </Text>
              )}
              {(profession === 'makeup_artist' ||
                profession === 'mehendi_artist') && (
                <Text className="text-xl font-semibold capitalize text-black">
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
                <Text className="text-xl font-semibold capitalize text-black">
                  Describe your work experience :
                </Text>
              )}
              {(profession === 'photo_editor' ||
                profession === 'video_editor' ||
                profession === 'album_designer' ||
                profession === 'graphics_designer') && (
                <Text className="text-xl font-semibold capitalize text-black">
                  Software Knowledge :
                </Text>
              )}
              {profession === 'web_developer' && (
                <Text className="text-xl font-semibold capitalize text-black">
                  Fimiliar Language :
                </Text>
              )}
              <TextInput
                inputMode="text"
                multiline
                value={equipment}
                onChangeText={text => setEquipment(text)}
                placeholder="write your equipments"
                className="border h-32 text-neutral-800"
                placeholderTextColor="#a3a3a3"
                style={{textAlignVertical: 'top'}}
              />
              <HelperText
                type="error"
                visible={hasErrors.equipmentError}
                padding="none"
                style={{fontSize: 4 * vw}}>
                {(profession === 'photographer' ||
                  profession === 'drone_operator' ||
                  profession === 'cinematographer' ||
                  profession === 'musician') &&
                  'Equipments Available'}
                {(profession === 'makeup_artist' ||
                  profession === 'mehendi_artist') &&
                  'Products Use'}
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
                  profession === 'interior_designer') &&
                  'Describe your work experience'}
                {(profession === 'photo_editor' ||
                  profession === 'video_editor' ||
                  profession === 'album_designer' ||
                  profession === 'graphics_designer') &&
                  'Software Knowledge'}
                {profession === 'web_developer' && 'Fimiliar Language'} should
                be altleast 300 chracters
              </HelperText>
            </View>
            <View className="flex flex-row justify-between">
              <TouchableOpacity
                className="self-center bg-slate-500 py-2 w-28 flex items-center justify-center rounded-3xl"
                onPress={() => setCurrentStage(1)}>
                <Text className="text-white capitalize font-bold text-lg">
                  back
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="self-center bg-blue-500 py-2 w-28 flex items-center justify-center rounded-3xl"
                onPress={handelCheckStage3}>
                <Text className="text-white capitalize font-bold text-lg">
                  submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={otpForm}
          onRequestClose={() => setOtpForm(false)}>
          <View
            className="flex-1 flex-row items-center justify-center"
            style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
            <View
              className="bg-white flex flex-col items-center gap-y-4 p-4 rounded-md"
              style={{elevation: 5, width: 70 * vw}}>
              <Text style={{fontSize: 6 * vw}} className="font-bold text-black">
                1 step remaining
              </Text>
              <View className="flex-row gap-2">
                <TextInput
                  placeholder=""
                  value={otp1}
                  ref={otp1Ref}
                  maxLength={1}
                  autoFocus
                  className="border border-neutral-300 rounded-xl px-2 py-1 text-neutral-800 text-center"
                  placeholderTextColor="#a3a3a3"
                  keyboardType="number-pad"
                  onChangeText={text => {
                    setOTP1(text);
                    if (text.length === 1) otp2Ref.current.focus();
                  }}
                />
                <TextInput
                  placeholder=""
                  value={otp2}
                  ref={otp2Ref}
                  maxLength={1}
                  className="border border-neutral-300 rounded-xl px-2 py-1 text-neutral-800 text-center"
                  placeholderTextColor="#a3a3a3"
                  keyboardType="number-pad"
                  onChangeText={text => {
                    setOTP2(text);
                    if (text.length === 1) otp3Ref.current.focus();
                  }}
                />
                <TextInput
                  placeholder=""
                  value={otp3}
                  ref={otp3Ref}
                  maxLength={1}
                  className="border border-neutral-300 rounded-xl px-2 py-1 text-neutral-800 text-center"
                  placeholderTextColor="#a3a3a3"
                  keyboardType="number-pad"
                  onChangeText={text => {
                    setOTP3(text);
                    if (text.length === 1) otp4Ref.current.focus();
                  }}
                />
                <TextInput
                  placeholder=""
                  value={otp4}
                  ref={otp4Ref}
                  maxLength={1}
                  className="border border-neutral-300 rounded-xl px-2 py-1 text-neutral-800 text-center"
                  placeholderTextColor="#a3a3a3"
                  keyboardType="number-pad"
                  onChangeText={text => {
                    setOTP4(text);
                    if (text.length === 1) otp5Ref.current.focus();
                  }}
                />
                <TextInput
                  placeholder=""
                  value={otp5}
                  ref={otp5Ref}
                  maxLength={1}
                  className="border border-neutral-300 rounded-xl px-2 py-1 text-neutral-800 text-center"
                  placeholderTextColor="#a3a3a3"
                  keyboardType="number-pad"
                  onChangeText={text => {
                    setOTP5(text);
                    if (text.length === 1) otp6Ref.current.focus();
                  }}
                />
                <TextInput
                  placeholder=""
                  value={otp6}
                  ref={otp6Ref}
                  maxLength={1}
                  className="border border-neutral-300 rounded-xl px-2 py-1 text-neutral-800 text-center"
                  placeholderTextColor="#a3a3a3"
                  keyboardType="number-pad"
                  onChangeText={text => setOTP6(text)}
                />
              </View>
              <View className="flex flex-row items-center">
                <Text>OTP is send to +91 {phone} . </Text>
                <Pressable className="" onPress={() => setOtpForm(false)}>
                  <Text className="text-blue-500 font-bold capitalize">
                    edit
                  </Text>
                </Pressable>
              </View>
              <Pressable
                className="px-4 py-2 bg-blue-500 rounded-3xl"
                onPress={handelOTP}>
                <Text className="capitalize font-semibold text-white">
                  submit
                </Text>
              </Pressable>
              {count >= 0 ? (
                <Text className="text-neutral-700 self-end">{count}s</Text>
              ) : (
                <Pressable className="self-end" onPress={handelOTP}>
                  <Text className="font-semibold text-neutral-600">
                    Resend OTP
                  </Text>
                </Pressable>
              )}
              <Text className="text-slate-500 font-medium">
                OTP is valid for 5 minutes
              </Text>
            </View>
          </View>
        </Modal>
      </View>
      <View className="flex items-center flex-row gap-x-4 self-end mr-4">
        <Text className="uppercase">or use</Text>
        <TouchableOpacity onPress={signIn}>
          <Icongoogle name="google" size={48} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Iconfacebook name="facebook" size={48} color="#000000" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default FreelancerSignup;

const styles = StyleSheet.create({});
