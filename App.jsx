import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FirstScreen from './pages/FirstScreen';
import {createStackNavigator} from '@react-navigation/stack';
import GetStartedScreen from './pages/GetStartedScreen';
import LoginScreen from './pages/LoginScreen';
import SignupScreen from './pages/SignupScreen';
import ClientSignup from './pages/ClientSignup';
import FreelancerSignup from './pages/FreelancerSignup';
import CompanySignup from './pages/CompanySignup';
import Loader from './components/Loader';
import {AuthContext} from './context/AuthContext';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Alert, BackHandler, Linking, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import socket from './utils/socket';
import HomeScreen from './pages/HomeScreen';
import Jobscreen from './pages/Jobscreen';
import ResourcesScreen from './pages/ResourcesScreen';
import HelpScreen from './pages/HelpScreen';
import FreelancerCategoryScreen from './pages/FreelancerCategoryScreen';
import FreelancerProfileScreen from './pages/FreelancerProfileScreen';
import CompanyProfileScreen from './pages/CompanyProfileScreen';
import JobDetailsScreen from './pages/JobDetailsScreen';
import ResourceDetailsScreen from './pages/ResourceDetailsScreen';
import SubmitCityScreen from './pages/SubmitCityScreen';
import TermsAndCondition from './pages/TermsAndCondition';
import DataProtection from './pages/DataProtection';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CancellationAndRefund from './pages/CancellationAndRefund';
import FAQScreen from './pages/FAQScreen';
import AboutUsScreens from './pages/AboutUsScreens';
import GuidesAndReviews from './pages/GuidesAndReviews';
import ReferandEarnScreen from './pages/ReferandEarnScreen';
import EditProfile from './pages/EditProfile';
import MyReferal from './pages/MyReferal';
import HireRequest from './pages/HireRequest';
import EditClientProfile from './pages/EditClientProfile';
import EditCompanyProfile from './pages/EditCompanyProfile';
import PremiumPlans from './pages/PremiumPlans';
import NotificationScreen from './pages/NotificationScreen';
import WishListScreen from './pages/WishListScreen';
import CompleteFreelancerProfile from './pages/CompleteFreelancerProfile';
import HireFreelancer from './pages/HireFreelancer';
import UpdateFreelancerPortfolio from './pages/UpdateFreelancerPortfolio';
import CreatedjobScreen from './pages/CreatejobScreen';
import CompanyPostedJobsScreen from './pages/CompanyPostedJobsScreen';
import EditjobScreens from './pages/EditjobScreens';
import FreelancerAppliedJobs from './pages/FreelancerAppliedJobs';
import ChatScreen from './pages/ChatScreen';
import ChatListScreen from './pages/ChatListScreen';
import DrawerNav from './components/DrawerNav';
import {displayNotification} from './utils/notifee';
import MyRequest from './pages/MyRequest';

function App() {
  const [isNewUser, setIsNewUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [location, setLocation] = useState('Kolkata');

  const {authData, dispatch} = useContext(AuthContext);

  const navigation = useNavigation();

  const getPageState = async () => {
    try {
      const getData = await AsyncStorage.getItem('newUser');
      if (getData === 'true') {
        setIsNewUser(false);
        const getLoginData = await AsyncStorage.getItem('token');
        if (!getLoginData) {
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
          dispatch({type: 'isLoggedIn'});
        }
      } else {
        setIsNewUser(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getNotificationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      try {
        const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
        // Handling the result of the permit request
        if (result === RESULTS.GRANTED) {
          console.log('Permissions granted');
        } else {
          console.log('Permissions not granted');
        }
      } catch (error) {
        // Error handling during permission request
        console.error(error);
      }
    }
  };

  const sendNotification = () => {
    PushNotification.localNotification({
      title: 'Fipezo',
      channelId: 'fipezo719',
      message: 'You have a new Message',
    });
  };

  useEffect(() => {
    socket.on('messageResponse', data => {
      const message = JSON.parse(data.messages[data.messages.length - 1]);
      let thisSender = message.sender;
      let senderId;
      if (data.hasOwnProperty(thisSender)) {
        senderId = Object.getOwnPropertyDescriptor(data, thisSender);
      }
      if (senderId.value === authData.userDetails?._id) {
        // sendNotification();
      }
    });
    socket.on('notifications', data => {
      displayNotification(data);
    });
  }, [socket]);

  useEffect(() => {
    const backAction = () => {
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ]);
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    getPageState();
    getNotificationPermission();
  }, []);

  Linking.getInitialURL().then(url => {
    if (url) {
      Alert.alert('Initial URL', url);
    }
    return null;
  });

  useEffect(() => {
    Linking.addEventListener('url', ({url}) => {
      // Handle the URL here, e.g., navigate to a specific screen
      Alert.alert('URL Opened', url);
    });

    // Check if the app was opened from a URL

    // Remember to remove the listener when the component unmounts
    return () => {
      Linking.removeEventListener('url');
    };
  }, []);

  const Stack = createStackNavigator();

  GoogleSignin.configure({
    androidClientId:
      '534873725876-o3bugrtbidr3rh2l8leb83e0esp1ofqk.apps.googleusercontent.com',
    webClientId:
      '534873725876-r2377ko8osj60e1pqt2copbmtih0f8c0.apps.googleusercontent.com',
    offlineAccess: true,
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Stack.Navigator initialRouteName={isNewUser ? 'First' : 'Explore'}>
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name="First" component={FirstScreen} />
        <Stack.Screen name="GetStarted" component={GetStartedScreen} />
        <Stack.Screen name="Login">
          {props => <LoginScreen {...props} gooleSignin={GoogleSignin} />}
        </Stack.Screen>
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="ClientSignup">
          {props => <ClientSignup {...props} gooleSignin={GoogleSignin} />}
        </Stack.Screen>
        <Stack.Screen name="FreelancerSignup">
          {props => <FreelancerSignup {...props} gooleSignin={GoogleSignin} />}
        </Stack.Screen>
        <Stack.Screen name="CompanySignup">
          {props => <CompanySignup {...props} gooleSignin={GoogleSignin} />}
        </Stack.Screen>
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          header: route => (
            <DrawerNav
              gooleSignin={GoogleSignin}
              currentRouteName={route}
              location={location}
              setLocation={setLocation}
            />
          ),
        }}>
        <Stack.Screen name="Explore">
          {props => <HomeScreen {...props} location={location} />}
        </Stack.Screen>
        <Stack.Screen name="Jobs">
          {props => <Jobscreen {...props} location={location} />}
        </Stack.Screen>
        <Stack.Screen name="Learn">
          {props => <ResourcesScreen {...props} location={location} />}
        </Stack.Screen>
        <Stack.Screen name="Help">
          {props => <HelpScreen {...props} location={location} />}
        </Stack.Screen>
        <Stack.Screen name="freelancer-category">
          {props => <FreelancerCategoryScreen {...props} location={location} />}
        </Stack.Screen>
        <Stack.Screen name="freelancer-profile">
          {props => <FreelancerProfileScreen {...props} location={location} />}
        </Stack.Screen>
        <Stack.Screen name="company-profile">
          {props => <CompanyProfileScreen {...props} location={location} />}
        </Stack.Screen>
        <Stack.Screen name="job-details">
          {props => <JobDetailsScreen {...props} location={location} />}
        </Stack.Screen>
        <Stack.Screen name="resource-details">
          {props => <ResourceDetailsScreen {...props} location={location} />}
        </Stack.Screen>
        <Stack.Screen name="submit-city">
          {props => <SubmitCityScreen {...props} location={location} />}
        </Stack.Screen>
        <Stack.Screen name="terms-and-condition">
          {props => <TermsAndCondition {...props} location={location} />}
        </Stack.Screen>
        <Stack.Screen name="data-protection">
          {props => <DataProtection {...props} location={location} />}
        </Stack.Screen>
        <Stack.Screen name="privacy-and-policy">
          {props => <PrivacyPolicy {...props} location={location} />}
        </Stack.Screen>
        <Stack.Screen name="cancellation-and-refund">
          {props => <CancellationAndRefund {...props} location={location} />}
        </Stack.Screen>
        <Stack.Screen name="faq">
          {props => <FAQScreen {...props} location={location} />}
        </Stack.Screen>
        <Stack.Screen name="about_us">
          {props => <AboutUsScreens {...props} location={location} />}
        </Stack.Screen>
        <Stack.Screen name="guides-and-reviews">
          {props => <GuidesAndReviews {...props} location={location} />}
        </Stack.Screen>
        <Stack.Screen name="refer-and-earn">
          {props => <ReferandEarnScreen {...props} location={location} />}
        </Stack.Screen>
        <Stack.Screen name="edit-profile">
          {props => <EditProfile {...props} location={location} />}
        </Stack.Screen>
        <Stack.Screen name="my-referral">
          {props => <MyReferal {...props} location={location} />}
        </Stack.Screen>
        <Stack.Screen name="my-hire-request">
          {props => <HireRequest {...props} location={location} />}
        </Stack.Screen>
        <Stack.Screen name="edit-client-profile">
          {props => <EditClientProfile {...props} location={location} />}
        </Stack.Screen>
        <Stack.Screen name="edit-company-profile">
          {props => <EditCompanyProfile {...props} location={location} />}
        </Stack.Screen>
        <Stack.Screen name="premium-plans" options={{headerShown: false}}>
          {props => <PremiumPlans {...props} location={location} />}
        </Stack.Screen>
        <Stack.Screen name="notifications">
          {props => <NotificationScreen {...props} location={location} />}
        </Stack.Screen>
        <Stack.Screen name="wishlist">
          {props => <WishListScreen {...props} location={location} />}
        </Stack.Screen>
        <Stack.Screen name="complete-freelancer-profile">
          {props => (
            <CompleteFreelancerProfile {...props} location={location} />
          )}
        </Stack.Screen>
        <Stack.Screen name="hire-freelancer">
          {props => <HireFreelancer {...props} location={location} />}
        </Stack.Screen>
        <Stack.Screen name="my-got-hire-request">
          {props => <MyRequest {...props} location={location} />}
        </Stack.Screen>
        <Stack.Screen name="update-portfolio">
          {props => (
            <UpdateFreelancerPortfolio {...props} location={location} />
          )}
        </Stack.Screen>
        <Stack.Screen name="post-job">
          {props => <CreatedjobScreen {...props} location={location} />}
        </Stack.Screen>
        <Stack.Screen name="posted-jobs">
          {props => <CompanyPostedJobsScreen {...props} location={location} />}
        </Stack.Screen>
        <Stack.Screen name="edit-job">
          {props => <EditjobScreens {...props} location={location} />}
        </Stack.Screen>
        <Stack.Screen name="applied-jobs">
          {props => <FreelancerAppliedJobs {...props} location={location} />}
        </Stack.Screen>
        <Stack.Screen name="user-chat" options={{headerShown: false}}>
          {props => <ChatScreen {...props} location={location} />}
        </Stack.Screen>
        <Stack.Screen name="chats">
          {props => <ChatListScreen {...props} location={location} />}
        </Stack.Screen>
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default App;
