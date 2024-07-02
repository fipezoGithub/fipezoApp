import {
  ImageBackground,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
import Icongoogle from 'react-native-vector-icons/AntDesign';
import Iconfacebook from 'react-native-vector-icons/FontAwesome';
import Iconeye from 'react-native-vector-icons/Entypo';
import Iconrequest from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconsearch from 'react-native-vector-icons/AntDesign';
import Iconplus from 'react-native-vector-icons/Feather';
import SelectDropdown from 'react-native-select-dropdown';
import {HelperText} from 'react-native-paper';
import {vw} from 'react-native-viewport-units';
import {SERVER_URL} from '@env';
import {AuthContext} from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PopupWaiting from '../components/PopupWaiting';
import {
  removeListener,
  startOtpListener,
  useOtpVerify,
} from 'react-native-otp-verify';
import Loader from '../components/Loader';

const CompanySignup = ({navigation, gooleSignin}) => {
  const [phoneInputFocus, setPhoneInputFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [proImg, setProImg] = useState('');
  const [coverImg, setCoverImg] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('');
  const [companyAddress, setCompanyAddress] = useState({
    address: '',
    city: 'Agra',
    state: 'Andhra Pradesh',
    pincode: '',
    landmark: '',
  });
  const [designation, setDesignation] = useState('');
  const [about, setAbout] = useState('');
  const [companyPanCard, setCompanyPanCard] = useState('');
  const [companyTradeLiecence, setCompanyTradeLiecence] = useState('');
  const [companyIncorporationCertificate, setCompanyIncorporationCertificate] =
    useState('');
  const [companyMsmeCertificate, setCompanyMsmeCertificate] = useState('');
  const [workImages, setWorkImages] = useState([]);
  const [otp1, setOTP1] = useState('');
  const [otp2, setOTP2] = useState('');
  const [otp3, setOTP3] = useState('');
  const [otp4, setOTP4] = useState('');
  const [otp5, setOTP5] = useState('');
  const [otp6, setOTP6] = useState('');
  const [currentStage, setCurrentStage] = useState(0);
  const [count, setCount] = useState(120);
  const [timerId, setTimerId] = useState(null);
  const [otpForm, setOtpForm] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [hasErrors, setHasErrors] = useState({
    companyNameError: false,
    companyPhoneError: false,
    companyEmailError: false,
    passwordError: false,
    companyTypeError: false,
    companyAddressError: false,
    companyPinCodeError: false,
    designationError: false,
    aboutError: false,
    documentError: false,
    otpError: false,
    workImagesError: false,
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

  const states = [
    'Andhra Pradesh',
    'Andaman and Nicobar Island',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chandigarh',
    'Chhattisgarh',
    'Dadra and Nagar Haveli and Daman and Diu',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jammu and Kashmir',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Ladakh',
    'Lakshadweep',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Puducherry',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
  ];

  const companyTypes = [
    'Photography',
    'eCommerce',
    'Production house',
    'Photography Institute',
    'Advertising Agency',
    'Other',
  ];

  const {dispatch} = useContext(AuthContext);

  const selectFile = async setFunc => {
    // Opening Document Picker to select one file
    if (hasErrors.documentError) {
      setHasErrors(prev => ({...prev, documentError: false}));
    }
    if (hasErrors.profilePictureError) {
      setHasErrors(prev => ({...prev, profilePictureError: false}));
    }
    if (hasErrors.coverPictureError) {
      setHasErrors(prev => ({...prev, coverPictureError: false}));
    }
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
      setCompanyName(user.givenName + ' ' + user.familyName);
      setCompanyEmail(user.email);
    } catch (error) {
      console.error(error);
    }
  };

  async function handelCheckStage1() {
    if (companyName.length < 1) {
      setHasErrors(prev => ({...prev, companyNameError: true}));
      return;
    }
    if (companyPhone.length !== 10) {
      setHasErrors(prev => ({...prev, companyPhoneError: true}));
      return;
    }
    if (
      companyEmail.length < 1 ||
      !companyEmail.includes('@') ||
      (await checkEmail(companyEmail))
    ) {
      setHasErrors(prev => ({...prev, companyEmailError: true}));
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
    if (type.length < 1) {
      setHasErrors(prev => ({...prev, companyTypeError: true}));
      return;
    }
    if (companyAddress.address.length < 1) {
      setHasErrors(prev => ({...prev, companyAddressError: true}));
      return;
    }
    if (companyAddress.pincode.length !== 6) {
      setHasErrors(prev => ({...prev, companyPinCodeError: true}));
      return;
    }

    setCurrentStage(2);
  }

  function handelCheckStage3() {
    if (designation.length < 1) {
      setHasErrors(prev => ({...prev, designationError: true}));
      return;
    }
    if (about.length < 200) {
      setHasErrors(prev => ({...prev, aboutError: true}));
      return;
    }
    if (
      companyPanCard === '' &&
      companyTradeLiecence === '' &&
      companyIncorporationCertificate === '' &&
      companyMsmeCertificate === ''
    ) {
      setHasErrors(prev => ({...prev, documentError: true}));
      return;
    }
    setCurrentStage(3);
  }

  async function checkEmail(val) {
    try {
      const res = await fetch(`${SERVER_URL}/verify/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({companyemail: companyEmail}),
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

  const selectWorkFile = async index => {
    // Opening Document Picker to select one file
    if (hasErrors.workImagesError) {
      setHasErrors(prev => ({...prev, workImagesError: false}));
    }
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
      const newImages = [...workImages];
      newImages[index] = res[0];
      setWorkImages(newImages);
    } catch (err) {
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        const newImages = [...workImages];
        newImages[index] = '';
        setWorkImages(newImages);
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
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
          phone: companyPhone,
          type: 'company',
        }),
      });
      if (res.status === 403) {
        return;
      } else {
        startCountdown();
        setOtpForm(true);
      }
    } catch (error) {
      console.error(error);
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

  const handelOTP = async () => {
    try {
      setIsWaiting(true);
      const response = await fetch(`${SERVER_URL}/verify/company/phone`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          otp: `${otp1}${otp2}${otp3}${otp4}${otp5}${otp6}`,
          phone: companyPhone,
          type: 'company',
        }),
      });
      if (response.status !== 200) {
        setHasErrors(prev => ({...prev, otpError: true}));
        return;
      } else {
        await createNewProfile();
        setIsWaiting(false);
      }
    } catch (error) {
      console.error(error);
      setIsWaiting(false);
    }
  };

  const createNewProfile = async () => {
    const token = null;
    try {
      const data = new FormData();
      data.append(
        'uid',
        companyName.toLowerCase().replace(' ', '.') +
          '_' +
          parseInt(companyPhone).toString(16),
      );
      data.append('companyname', companyName);
      data.append('companyphone', companyPhone);
      data.append('companyemail', companyEmail);
      data.append('password', password);
      data.append('companytype', type);
      data.append('companyaddress', JSON.stringify(companyAddress));
      data.append('position', designation);
      data.append('bio', about);
      data.append('profilePicture', proImg);
      data.append('coverPicture', coverImg);
      data.append('panCard', companyPanCard);
      data.append('incorporationCertificate', companyIncorporationCertificate);
      data.append('msmeCertificate', companyMsmeCertificate);
      data.append('tradeLiecence', companyTradeLiecence);
      data.append('links', JSON.stringify({}));
      workImages.forEach(element => {
        data.append('works[]', element);
      });
      data.append('termsAndConditions', true);
      data.append('verified', false);
      setIsWaiting(true);
      const response = await fetch(`${SERVER_URL}/register/company`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });
      const responseData = await response.json();
      await AsyncStorage.setItem('token', responseData.token);
      dispatch({type: 'isLoggedIn'});
      setIsWaiting(false);
      navigation.navigate('Explore');
    } catch (error) {
      console.error(error);
      setIsWaiting(false);
      setSignupFailed(true);
    }
  };

  const {hash, otp, message, timeoutError, stopListener, startListener} =
    useOtpVerify({numberOfDigits: 6});

  useEffect(() => {
    if (!otpForm) {
      return;
    }
    // getHash()
    //   .then(hash => {
    //     console.log(hash);
    //   })
    //   .catch(console.log);

    startOtpListener(message => {
      // extract the otp using regex e.g. the below regex extracts 4 digit otp from message
      if (!message) {
        return;
      }
      const match = /(\d{6})/g.exec(message);
      if (match) {
        const otp = match[1];

        // Set OTP values to state
        otp.split('').forEach((item, index) => {
          switch (index) {
            case 0:
              setOTP1(item);
              break;
            case 1:
              setOTP2(item);
              break;
            case 2:
              setOTP3(item);
              break;
            case 3:
              setOTP4(item);
              break;
            case 4:
              setOTP5(item);
              break;
            case 5:
              setOTP6(item);
              break;
            default:
              break;
          }
        });
      } else {
        // Handle case where no OTP is found
        console.error('No OTP found in message:', message);
      }
    });

    return () => removeListener();
  }, [otpForm]);

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
      }}>
      <View className="flex items-center justify-center gap-y-2 mx-4 mt-8">
        <Text className="text-5xl font-bold text-black">Welcome</Text>
        <Text className="text-lg text-black text-center">
          fill up the form below for a new company account
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
              <Text className="text-base font-semibold capitalize text-black">
                company name
              </Text>
              <TextInput
                inputMode="text"
                value={companyName}
                onChangeText={text => {
                  setHasErrors(prev => ({...prev, companyNameError: false}));
                  setCompanyName(text);
                }}
                placeholder="enter your company name"
                className="border-b"
              />
              <HelperText
                type="error"
                visible={hasErrors.companyNameError}
                padding="none"
                style={{fontSize: 4 * vw}}>
                Company name can't be empty!
              </HelperText>
            </View>
            <View className="flex flex-col items-stretch mx-4">
              <Text className="text-base font-semibold capitalize text-black">
                company phone
              </Text>
              <View className="border-b flex flex-row items-center">
                <TextInput
                  placeholder="enter your number"
                  inputMode="numeric"
                  value={companyPhone}
                  onChangeText={text => {
                    setHasErrors(prev => ({...prev, companyPhoneError: false}));
                    setCompanyPhone(text);
                  }}
                  onFocus={() => setPhoneInputFocus(true)}
                  onBlur={() => setPhoneInputFocus(false)}
                />
                {phoneInputFocus && (
                  <TouchableOpacity>
                    <Iconrequest
                      name="email-receive-outline"
                      size={20}
                      color="#000000"
                    />
                  </TouchableOpacity>
                )}
              </View>
              <HelperText
                type="error"
                visible={hasErrors.companyPhoneError}
                padding="none"
                style={{fontSize: 4 * vw}}>
                Company phone is not valid!
              </HelperText>
            </View>
            <View className="flex flex-col items-stretch mx-4">
              <Text className="text-base font-semibold capitalize text-black">
                email
              </Text>
              <TextInput
                placeholder="enter email address"
                inputMode="email"
                value={companyEmail}
                onChangeText={text => {
                  setHasErrors(prev => ({...prev, companyEmailError: false}));
                  setCompanyEmail(text);
                }}
                className="border-b"
              />
              <HelperText
                type="error"
                visible={hasErrors.companyEmailError}
                padding="none"
                style={{fontSize: 4 * vw}}>
                Email is not valid! or already exist
              </HelperText>
            </View>
            <View className="flex flex-col items-stretch mx-4">
              <Text className="text-base font-semibold capitalize text-black">
                password
              </Text>
              <View className="border-b flex flex-row items-center">
                <TextInput
                  placeholder="enter password"
                  secureTextEntry={showPassword}
                  inputMode="text"
                  value={password}
                  onChangeText={text => {
                    setHasErrors(prev => ({...prev, passwordError: false}));
                    setPassword(text);
                  }}
                />
                {password.length > 0 && (
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
              Company Information
            </Text>
            <View className="flex flex-col items-stretch">
              <Text className="text-base font-semibold capitalize text-black">
                company type
              </Text>
              <SelectDropdown
                data={companyTypes}
                buttonStyle={{
                  backgroundColor: 'transparent',
                  borderBottomWidth: 1,
                  borderBottomColor: 'black',
                  width: '100%',
                }}
                defaultButtonText={'select your freelance category'}
                rowTextStyle={{textTransform: 'capitalize'}}
                buttonTextStyle={{
                  fontSize: 15,
                  color: 'rgb(115 115 115)',
                  textAlign: 'left',
                }}
                onSelect={(selectedItem, index) => {
                  setHasErrors(prev => ({...prev, companyTypeError: false}));
                  setType(selectedItem.split(' ').join('_').toLowerCase());
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
              <HelperText
                type="error"
                visible={hasErrors.companyTypeError}
                padding="none"
                style={{fontSize: 4 * vw}}>
                Type can not be empty!
              </HelperText>
            </View>
            <View className="flex flex-col items-stretch">
              <Text className="text-base font-semibold capitalize text-black">
                company address
              </Text>
              <TextInput
                inputMode="text"
                value={companyAddress.address}
                onChangeText={text => {
                  setHasErrors(prev => ({...prev, companyAddressError: false}));
                  setCompanyAddress(prev => ({...prev, address: text}));
                }}
                placeholder="enter company address"
                className="border-b"
              />
              <HelperText
                type="error"
                visible={hasErrors.companyAddressError}
                padding="none"
                style={{fontSize: 4 * vw}}>
                Address can not be empty!
              </HelperText>
            </View>
            <View className="flex flex-col items-stretch">
              <Text className="text-base font-semibold capitalize text-black">
                city
              </Text>
              <SelectDropdown
                data={cities}
                buttonStyle={{
                  width: '100%',
                  backgroundColor: 'transparent',
                  borderBottomWidth: 1,
                  borderBottomColor: 'black',
                }}
                defaultValue={companyAddress.city}
                defaultButtonText={'select your city'}
                rowTextStyle={{textTransform: 'capitalize'}}
                buttonTextStyle={{
                  fontSize: 15,
                  color: 'rgb(115 115 115)',
                  textAlign: 'left',
                }}
                onSelect={(selectedItem, index) => {
                  setCompanyAddress(prev => ({
                    ...prev,
                    city: selectedItem.split(' ').join('_'),
                  }));
                }}
                search={true}
                searchPlaceHolder={'enter state name'}
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
                state
              </Text>
              <SelectDropdown
                data={states}
                buttonStyle={{
                  width: '100%',
                  backgroundColor: 'transparent',
                  borderBottomWidth: 1,
                  borderBottomColor: 'black',
                }}
                defaultValue={companyAddress.state}
                defaultButtonText={'select your city'}
                rowTextStyle={{textTransform: 'capitalize'}}
                buttonTextStyle={{
                  fontSize: 15,
                  color: 'rgb(115 115 115)',
                  textAlign: 'left',
                }}
                onSelect={(selectedItem, index) => {
                  setCompanyAddress(prev => ({
                    ...prev,
                    state: selectedItem.split(' ').join('_'),
                  }));
                }}
                search={true}
                searchPlaceHolder={'enter state name'}
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
                pincode
              </Text>
              <TextInput
                inputMode="text"
                value={companyAddress.pincode}
                onChangeText={text => {
                  setHasErrors(prev => ({...prev, companyPinCodeError: false}));
                  setCompanyAddress(prev => ({...prev, pincode: text}));
                }}
                placeholder="enter company pincode"
                className="border-b"
              />
              <HelperText
                type="error"
                visible={hasErrors.companyPinCodeError}
                padding="none"
                style={{fontSize: 4 * vw}}>
                Pincode should be 6 chracters!
              </HelperText>
            </View>
            <View className="flex flex-col items-stretch">
              <Text className="text-base font-semibold capitalize text-black">
                landmark
              </Text>
              <TextInput
                inputMode="text"
                value={companyAddress.landmark}
                onChangeText={text =>
                  setCompanyAddress(prev => ({...prev, landmark: text}))
                }
                placeholder="enter landmark"
                className="border-b"
              />
            </View>
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
            <View className="flex flex-col items-stretch gap-y-4">
              <Text className="text-base font-semibold capitalize text-black">
                designation
              </Text>
              <TextInput
                inputMode="text"
                value={designation}
                onChangeText={text => {
                  setHasErrors(prev => ({...prev, designationError: false}));
                  setDesignation(text);
                }}
                placeholder="enter your designation in the company"
                className="border-b"
              />
              <HelperText
                type="error"
                visible={hasErrors.designationError}
                padding="none"
                style={{fontSize: 4 * vw}}>
                Designation can't be empty
              </HelperText>
            </View>
            <View className="flex flex-col items-stretch gap-y-4">
              <Text className="text-base font-semibold capitalize text-black">
                about
              </Text>
              <TextInput
                inputMode="text"
                multiline
                value={about}
                onChangeText={text => {
                  setHasErrors(prev => ({...prev, aboutError: false}));
                  setAbout(text);
                }}
                placeholder="write about your company"
                className="border h-32"
                style={{textAlignVertical: 'top'}}
              />
              <HelperText
                type="error"
                visible={hasErrors.aboutError}
                padding="none"
                style={{fontSize: 4 * vw}}>
                Please provide some description of company
              </HelperText>
            </View>
            <View className="flex flex-row flex-wrap gap-2 items-center">
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => selectFile(setCompanyPanCard)}
                className="bg-black">
                <Text className="text-white text-base capitalize p-2 font-semibold">
                  {companyPanCard === '' ? (
                    <Iconplus name="plus" size={20} color="#FFF" />
                  ) : (
                    <Iconfacebook name="file" size={20} color="#FFF" />
                  )}{' '}
                  company pan card
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => selectFile(setCompanyTradeLiecence)}
                className="bg-black">
                <Text className="text-white text-base p-2 capitalize font-semibold">
                  {companyTradeLiecence === '' ? (
                    <Iconplus name="plus" size={20} color="#FFF" />
                  ) : (
                    <Iconfacebook name="file" size={20} color="#FFF" />
                  )}{' '}
                  trade liecence
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => selectFile(setCompanyIncorporationCertificate)}
                className="bg-black">
                <Text className="text-white text-base capitalize p-2 font-semibold">
                  {companyIncorporationCertificate === '' ? (
                    <Iconplus name="plus" size={20} color="#FFF" />
                  ) : (
                    <Iconfacebook name="file" size={20} color="#FFF" />
                  )}{' '}
                  incorporation certificate
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => selectFile(setCompanyMsmeCertificate)}
                className="bg-black">
                <Text className="text-white text-base p-2 font-semibold">
                  {companyMsmeCertificate === '' ? (
                    <Iconplus name="plus" size={20} color="#FFF" />
                  ) : (
                    <Iconfacebook name="file" size={20} color="#FFF" />
                  )}{' '}
                  MSME Certificate
                </Text>
              </TouchableOpacity>
              <HelperText
                type="error"
                visible={hasErrors.documentError}
                padding="none"
                style={{fontSize: 4 * vw}}>
                Please provide atleast 1 document
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
                  next
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {currentStage === 3 && (
          <View className="flex flex-col items-stretch justify-center gap-y-4">
            <Text className="text-black text-2xl font-semibold my-4 text-center">
              Profile Showcase
            </Text>
            <View className="flex flex-row items-center justify-evenly gap-4 flex-wrap">
              {workImages[0] ? (
                <ImageBackground
                  source={{uri: workImages[0].uri}}
                  resizeMode="cover">
                  <TouchableOpacity
                    className="w-80 h-44 border border-dashed flex items-center justify-center"
                    onPress={() => selectWorkFile(0)}></TouchableOpacity>
                </ImageBackground>
              ) : (
                <TouchableOpacity
                  className="w-80 h-44 border border-dashed flex items-center justify-center"
                  onPress={() => selectWorkFile(0)}>
                  <Iconplus name="plus" size={20} color="#000" />
                </TouchableOpacity>
              )}

              {workImages[1] ? (
                <ImageBackground
                  source={{uri: workImages[1].uri}}
                  resizeMode="cover">
                  <TouchableOpacity
                    className="w-80 h-44 border border-dashed flex items-center justify-center"
                    onPress={() => selectWorkFile(1)}></TouchableOpacity>
                </ImageBackground>
              ) : (
                <TouchableOpacity
                  className="w-80 h-44 border border-dashed flex items-center justify-center"
                  onPress={() => selectWorkFile(1)}>
                  <Iconplus name="plus" size={20} color="#000" />
                </TouchableOpacity>
              )}

              {workImages[2] ? (
                <ImageBackground
                  source={{uri: workImages[2].uri}}
                  resizeMode="cover">
                  <TouchableOpacity
                    className="w-80 h-44 border border-dashed flex items-center justify-center"
                    onPress={() => selectWorkFile(2)}></TouchableOpacity>
                </ImageBackground>
              ) : (
                <TouchableOpacity
                  className="w-80 h-44 border border-dashed flex items-center justify-center"
                  onPress={() => selectWorkFile(2)}>
                  <Iconplus name="plus" size={20} color="#000" />
                </TouchableOpacity>
              )}

              {workImages[3] ? (
                <ImageBackground
                  source={{uri: workImages[3].uri}}
                  resizeMode="cover">
                  <TouchableOpacity
                    className="w-80 h-44 border border-dashed flex items-center justify-center"
                    onPress={() => selectWorkFile(3)}></TouchableOpacity>
                </ImageBackground>
              ) : (
                <TouchableOpacity
                  className="w-80 h-44 border border-dashed flex items-center justify-center"
                  onPress={() => selectWorkFile(3)}>
                  <Iconplus name="plus" size={20} color="#000" />
                </TouchableOpacity>
              )}

              {workImages[4] ? (
                <ImageBackground
                  source={{uri: workImages[4].uri}}
                  resizeMode="cover">
                  <TouchableOpacity
                    className="w-80 h-44 border border-dashed flex items-center justify-center"
                    onPress={() => selectWorkFile(4)}></TouchableOpacity>
                </ImageBackground>
              ) : (
                <TouchableOpacity
                  className="w-80 h-44 border border-dashed flex items-center justify-center"
                  onPress={() => selectWorkFile(4)}>
                  <Iconplus name="plus" size={20} color="#000" />
                </TouchableOpacity>
              )}
              {workImages[5] ? (
                <ImageBackground
                  source={{uri: workImages[5].uri}}
                  resizeMode="cover">
                  <TouchableOpacity
                    className="w-80 h-44 border border-dashed flex items-center justify-center"
                    onPress={() => selectWorkFile(5)}></TouchableOpacity>
                </ImageBackground>
              ) : (
                <TouchableOpacity
                  className="w-80 h-44 border border-dashed flex items-center justify-center"
                  onPress={() => selectWorkFile(5)}>
                  <Iconplus name="plus" size={20} color="#000" />
                </TouchableOpacity>
              )}

              {workImages[6] ? (
                <ImageBackground
                  source={{uri: workImages[6].uri}}
                  resizeMode="cover">
                  <TouchableOpacity
                    className="w-80 h-44 border border-dashed flex items-center justify-center"
                    onPress={() => selectWorkFile(6)}></TouchableOpacity>
                </ImageBackground>
              ) : (
                <TouchableOpacity
                  className="w-80 h-44 border border-dashed flex items-center justify-center"
                  onPress={() => selectWorkFile(6)}>
                  <Iconplus name="plus" size={20} color="#000" />
                </TouchableOpacity>
              )}

              {workImages[7] ? (
                <ImageBackground
                  source={{uri: workImages[7].uri}}
                  resizeMode="cover">
                  <TouchableOpacity
                    className="w-80 h-44 border border-dashed flex items-center justify-center"
                    onPress={() => selectWorkFile(7)}></TouchableOpacity>
                </ImageBackground>
              ) : (
                <TouchableOpacity
                  className="w-80 h-44 border border-dashed flex items-center justify-center"
                  onPress={() => selectWorkFile(7)}>
                  <Iconplus name="plus" size={20} color="#000" />
                </TouchableOpacity>
              )}
            </View>
            <View className="flex flex-row justify-between mx-4">
              <TouchableOpacity
                className="self-center bg-slate-500 py-2 w-28 flex items-center justify-center rounded-3xl"
                onPress={() => setCurrentStage(2)}>
                <Text className="text-white capitalize font-bold text-lg">
                  back
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="self-center bg-blue-500 py-2 w-28 flex items-center justify-center rounded-3xl"
                onPress={getOTP}>
                <Text className="text-white capitalize font-bold text-lg">
                  submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={otpForm}
        onRequestClose={() => setOtpForm(false)}>
        {isWaiting ? (
          <Loader />
        ) : (
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
                  onKeyPress={({nativeEvent}) => {
                    if (nativeEvent.key === 'Backspace' && otp2.length === 0) {
                      otp1Ref.current.focus();
                    }
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
                  onKeyPress={({nativeEvent}) => {
                    if (nativeEvent.key === 'Backspace' && otp3.length === 0) {
                      otp2Ref.current.focus();
                    }
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
                  onKeyPress={({nativeEvent}) => {
                    if (nativeEvent.key === 'Backspace' && otp4.length === 0) {
                      otp3Ref.current.focus();
                    }
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
                  onKeyPress={({nativeEvent}) => {
                    if (nativeEvent.key === 'Backspace' && otp5.length === 0) {
                      otp4Ref.current.focus();
                    }
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
                  onKeyPress={({nativeEvent}) => {
                    if (nativeEvent.key === 'Backspace' && otp6.length === 0) {
                      otp5Ref.current.focus();
                    }
                  }}
                />
              </View>
              <View className="flex flex-row items-center">
                <Text>OTP is send to +91 {companyPhone} . </Text>
                <TouchableOpacity
                  className=""
                  onPress={() => setOtpForm(false)}>
                  <Text className="text-blue-500 font-bold capitalize">
                    edit
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                className="px-4 py-2 bg-blue-500 rounded-3xl"
                onPress={handelOTP}>
                <Text className="capitalize font-semibold text-white">
                  submit
                </Text>
              </TouchableOpacity>
              {count >= 0 ? (
                <Text className="text-neutral-700 self-end">{count}s</Text>
              ) : (
                <TouchableOpacity className="self-end" onPress={handelOTP}>
                  <Text className="font-semibold text-neutral-600">
                    Resend OTP
                  </Text>
                </TouchableOpacity>
              )}
              <Text className="text-slate-500 font-medium">
                OTP is valid for 5 minutes
              </Text>
            </View>
          </View>
        )}
      </Modal>
      <View className="flex items-center flex-row gap-x-4 self-end mr-4">
        <Text className="uppercase text-black">or use</Text>
        <TouchableOpacity onPress={signIn}>
          <Icongoogle name="google" size={48} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Iconfacebook name="facebook" size={48} color="#000000" />
        </TouchableOpacity>
      </View>
      <PopupWaiting isWaiting={isWaiting} setIsWaiting={setIsWaiting} />
    </ScrollView>
  );
};

export default CompanySignup;

const styles = StyleSheet.create({});
