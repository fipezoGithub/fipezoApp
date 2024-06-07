import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../pages/HomeScreen';
import DrawerNav from './DrawerNav';
import Iconhelp from 'react-native-vector-icons/Entypo';
import Iconresource from 'react-native-vector-icons/FontAwesome5';
import Iconjobs from 'react-native-vector-icons/Entypo';
import Iconexplore from 'react-native-vector-icons/Entypo';
import Jobscreen from '../pages/Jobscreen';
import ResourcesScreen from '../pages/ResourcesScreen';
import HelpScreen from '../pages/HelpScreen';
import FreelancerCategoryScreen from '../pages/FreelancerCategoryScreen';
import FreelancerProfileScreen from '../pages/FreelancerProfileScreen';
import JobDetailsScreen from '../pages/JobDetailsScreen';
import ResourceDetailsScreen from '../pages/ResourceDetailsScreen';
import SubmitCityScreen from '../pages/SubmitCityScreen';
import TermsAndCondition from '../pages/TermsAndCondition';
import DataProtection from '../pages/DataProtection';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import CancellationAndRefund from '../pages/CancellationAndRefund';
import FAQScreen from '../pages/FAQScreen';
import AboutUsScreens from '../pages/AboutUsScreens';
import GuidesAndReviews from '../pages/GuidesAndReviews';
import ReferandEarnScreen from '../pages/ReferandEarnScreen';
import EditProfile from '../pages/EditProfile';
import MyReferal from '../pages/MyReferal';
import HireRequest from '../pages/HireRequest';
import EditClientProfile from '../pages/EditClientProfile';
import PremiumPlans from '../pages/PremiumPlans';
import NotificationScreen from '../pages/NotificationScreen';
import WishListScreen from '../pages/WishListScreen';
import CompleteFreelancerProfile from '../pages/CompleteFreelancerProfile';
import EditCompanyProfile from '../pages/EditCompanyProfile';
import CompanyProfileScreen from '../pages/CompanyProfileScreen';
import HireFreelancer from '../pages/HireFreelancer';
import UpdateFreelancerPortfolio from '../pages/UpdateFreelancerPortfolio';
import CreatedjobScreen from '../pages/CreatejobScreen';
import CompanyPostedJobsScreen from '../pages/CompanyPostedJobsScreen';
import EditjobScreens from '../pages/EditjobScreens';
import FreelancerAppliedJobs from '../pages/FreelancerAppliedJobs';
import ChatScreen from '../pages/ChatScreen';
import ChatListScreen from '../pages/ChatListScreen';

function MyTabBar({state, descriptors, navigation}) {
  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.slice(0, 4).map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            key={index}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              flexDirection: 'column',
              alignItems: 'center',
              marginHorizontal: 12,
              marginVertical: 8,
            }}>
            {label === 'Help' && (
              <Iconhelp
                name="help"
                size={15}
                color={isFocused ? '#FB923C' : '#475569'}
              />
            )}
            {label === 'Learn' && (
              <Iconresource
                name="book"
                size={15}
                color={isFocused ? '#FB923C' : '#475569'}
              />
            )}
            {label === 'Jobs' && (
              <Iconjobs
                name="briefcase"
                size={15}
                color={isFocused ? '#FB923C' : '#475569'}
              />
            )}
            {label === 'Explore' && (
              <Iconexplore
                name="globe"
                size={15}
                color={isFocused ? '#FB923C' : '#475569'}
              />
            )}
            <Text
              style={{
                color: isFocused ? '#FB923C' : '#475569',
                fontWeight: isFocused ? 500 : 400,
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Navbar = ({gooleSignin}) => {
  const Tab = createBottomTabNavigator();
  const [isScrollOnTop, setIsScrollOnTop] = useState(true);
  const [location, setLocation] = useState('Kolkata');
  return (
    <>
      <Tab.Navigator
        initialRouteName={'Explore'}
        screenOptions={{
          header: route => (
            <DrawerNav
              gooleSignin={gooleSignin}
              isScrollOnTop={isScrollOnTop}
              setIsScrollOnTop={setIsScrollOnTop}
              currentRouteName={route}
              location={location}
              setLocation={setLocation}
            />
          ),
        }}
        tabBar={props => <MyTabBar {...props} />}>
        <Tab.Screen name="Explore">
          {props => (
            <HomeScreen
              {...props}
              isScrollOnTop={isScrollOnTop}
              setIsScrollOnTop={setIsScrollOnTop}
              location={location}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Jobs">
          {props => (
            <Jobscreen
              {...props}
              isScrollOnTop={isScrollOnTop}
              setIsScrollOnTop={setIsScrollOnTop}
              location={location}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Learn">
          {props => (
            <ResourcesScreen
              {...props}
              isScrollOnTop={isScrollOnTop}
              setIsScrollOnTop={setIsScrollOnTop}
              location={location}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Help">
          {props => (
            <HelpScreen
              {...props}
              isScrollOnTop={isScrollOnTop}
              setIsScrollOnTop={setIsScrollOnTop}
              location={location}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="freelancer-category">
          {props => (
            <FreelancerCategoryScreen
              {...props}
              isScrollOnTop={isScrollOnTop}
              setIsScrollOnTop={setIsScrollOnTop}
              location={location}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="freelancer-profile">
          {props => (
            <FreelancerProfileScreen
              {...props}
              isScrollOnTop={isScrollOnTop}
              setIsScrollOnTop={setIsScrollOnTop}
              location={location}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="company-profile">
          {props => (
            <CompanyProfileScreen
              {...props}
              isScrollOnTop={isScrollOnTop}
              setIsScrollOnTop={setIsScrollOnTop}
              location={location}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="job-details">
          {props => (
            <JobDetailsScreen
              {...props}
              isScrollOnTop={isScrollOnTop}
              setIsScrollOnTop={setIsScrollOnTop}
              location={location}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="resource-details">
          {props => (
            <ResourceDetailsScreen
              {...props}
              isScrollOnTop={isScrollOnTop}
              setIsScrollOnTop={setIsScrollOnTop}
              location={location}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="submit-city">
          {props => (
            <SubmitCityScreen
              {...props}
              isScrollOnTop={isScrollOnTop}
              setIsScrollOnTop={setIsScrollOnTop}
              location={location}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="terms-and-condition">
          {props => (
            <TermsAndCondition
              {...props}
              isScrollOnTop={isScrollOnTop}
              setIsScrollOnTop={setIsScrollOnTop}
              location={location}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="data-protection">
          {props => (
            <DataProtection
              {...props}
              isScrollOnTop={isScrollOnTop}
              setIsScrollOnTop={setIsScrollOnTop}
              location={location}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="privacy-and-policy">
          {props => (
            <PrivacyPolicy
              {...props}
              isScrollOnTop={isScrollOnTop}
              setIsScrollOnTop={setIsScrollOnTop}
              location={location}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="cancellation-and-refund">
          {props => (
            <CancellationAndRefund
              {...props}
              isScrollOnTop={isScrollOnTop}
              setIsScrollOnTop={setIsScrollOnTop}
              location={location}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="faq">
          {props => (
            <FAQScreen
              {...props}
              isScrollOnTop={isScrollOnTop}
              setIsScrollOnTop={setIsScrollOnTop}
              location={location}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="about_us">
          {props => (
            <AboutUsScreens
              {...props}
              isScrollOnTop={isScrollOnTop}
              setIsScrollOnTop={setIsScrollOnTop}
              location={location}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="guides-and-reviews">
          {props => (
            <GuidesAndReviews
              {...props}
              isScrollOnTop={isScrollOnTop}
              setIsScrollOnTop={setIsScrollOnTop}
              location={location}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="refer-and-earn">
          {props => (
            <ReferandEarnScreen
              {...props}
              isScrollOnTop={isScrollOnTop}
              setIsScrollOnTop={setIsScrollOnTop}
              location={location}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="edit-profile">
          {props => (
            <EditProfile
              {...props}
              isScrollOnTop={isScrollOnTop}
              setIsScrollOnTop={setIsScrollOnTop}
              location={location}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="my-referral">
          {props => (
            <MyReferal
              {...props}
              isScrollOnTop={isScrollOnTop}
              setIsScrollOnTop={setIsScrollOnTop}
              location={location}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="my-hire-request">
          {props => (
            <HireRequest
              {...props}
              isScrollOnTop={isScrollOnTop}
              setIsScrollOnTop={setIsScrollOnTop}
              location={location}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="edit-client-profile">
          {props => (
            <EditClientProfile
              {...props}
              isScrollOnTop={isScrollOnTop}
              setIsScrollOnTop={setIsScrollOnTop}
              location={location}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="edit-company-profile">
          {props => (
            <EditCompanyProfile
              {...props}
              isScrollOnTop={isScrollOnTop}
              setIsScrollOnTop={setIsScrollOnTop}
              location={location}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="premium-plans" options={{headerShown: false}}>
          {props => (
            <PremiumPlans
              {...props}
              isScrollOnTop={isScrollOnTop}
              setIsScrollOnTop={setIsScrollOnTop}
              location={location}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="notifications">
          {props => (
            <NotificationScreen
              {...props}
              isScrollOnTop={isScrollOnTop}
              setIsScrollOnTop={setIsScrollOnTop}
              location={location}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="wishlist">
          {props => (
            <WishListScreen
              {...props}
              isScrollOnTop={isScrollOnTop}
              setIsScrollOnTop={setIsScrollOnTop}
              location={location}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="complete-freelancer-profile">
          {props => (
            <CompleteFreelancerProfile
              {...props}
              isScrollOnTop={isScrollOnTop}
              setIsScrollOnTop={setIsScrollOnTop}
              location={location}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="hire-freelancer">
          {props => (
            <HireFreelancer
              {...props}
              isScrollOnTop={isScrollOnTop}
              setIsScrollOnTop={setIsScrollOnTop}
              location={location}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="update-portfolio">
          {props => (
            <UpdateFreelancerPortfolio
              {...props}
              isScrollOnTop={isScrollOnTop}
              setIsScrollOnTop={setIsScrollOnTop}
              location={location}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="post-job">
          {props => (
            <CreatedjobScreen
              {...props}
              isScrollOnTop={isScrollOnTop}
              setIsScrollOnTop={setIsScrollOnTop}
              location={location}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="posted-jobs">
          {props => (
            <CompanyPostedJobsScreen
              {...props}
              isScrollOnTop={isScrollOnTop}
              setIsScrollOnTop={setIsScrollOnTop}
              location={location}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="edit-job">
          {props => (
            <EditjobScreens
              {...props}
              isScrollOnTop={isScrollOnTop}
              setIsScrollOnTop={setIsScrollOnTop}
              location={location}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="applied-jobs">
          {props => (
            <FreelancerAppliedJobs
              {...props}
              isScrollOnTop={isScrollOnTop}
              setIsScrollOnTop={setIsScrollOnTop}
              location={location}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="user-chat" options={{headerShown: false}}>
          {props => (
            <ChatScreen
              {...props}
              isScrollOnTop={isScrollOnTop}
              setIsScrollOnTop={setIsScrollOnTop}
              location={location}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="chats">
          {props => (
            <ChatListScreen
              {...props}
              isScrollOnTop={isScrollOnTop}
              setIsScrollOnTop={setIsScrollOnTop}
              location={location}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  mainNav: {
    marginHorizontal: 20,
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
