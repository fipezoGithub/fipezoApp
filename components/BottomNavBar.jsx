import {Text} from 'react-native';
import {BottomNavigation} from 'react-native-paper';
import {vmax, vmin} from 'react-native-viewport-units';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Iconhelp from 'react-native-vector-icons/Entypo';
import Iconresource from 'react-native-vector-icons/FontAwesome5';
import Iconjobs from 'react-native-vector-icons/Entypo';
import Iconexplore from 'react-native-vector-icons/Entypo';

const MusicRoute = () => <Text>Home</Text>;

const AlbumsRoute = () => <Text>Jobs</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

const NotificationsRoute = () => <Text>Notifications</Text>;

const BottomNavBar = ({currentIndex}) => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    {
      key: 'home',
      title: 'Explore',
    },
    {
      key: 'explore',
      title: 'Jobs',
    },
    {
      key: 'favourite',
      title: 'Learn',
    },
    {
      key: 'accounts',
      title: 'Help',
    },
  ]);

  const handleNavigation = newIndex => {
    // Perform navigation based on index
    switch (newIndex) {
      case 0:
        navigation.navigate('Explore');
        break;
      case 1:
        navigation.navigate('Jobs');
        break;
      case 2:
        navigation.navigate('Learn');
        break;
      case 3:
        navigation.navigate('Help');
        break;
      default:
        break;
    }
  };

  const renderScene = BottomNavigation.SceneMap({
    home: MusicRoute,
    explore: AlbumsRoute,
    favourite: RecentsRoute,
    accounts: NotificationsRoute,
  });

  useEffect(() => {
    setIndex(currentIndex);
  }, [currentIndex]);

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={handleNavigation}
      renderScene={renderScene}
      renderIcon={({route, focused, color}) => {
        switch (route.key) {
          case 'home':
            return (
              <Iconexplore
                name="globe"
                size={5 * vmin}
                color={focused ? '#FB923C' : '#475569'}
              />
            );

          case 'favourite':
            return (
              <Iconresource
                name="book"
                size={5 * vmin}
                color={focused ? '#FB923C' : '#475569'}
              />
            );

          case 'explore':
            return (
              <Iconjobs
                name="briefcase"
                size={5 * vmin}
                color={focused ? '#FB923C' : '#475569'}
              />
            );

          case 'accounts':
            return (
              <Iconhelp
                name="help"
                size={5 * vmin}
                color={focused ? '#FB923C' : '#475569'}
              />
            );

          default:
            break;
        }
      }}
      renderLabel={({route, focused, color}) => {
        return (
          <Text
            style={{
              textAlign: 'center',
              color: focused ? '#FB923C' : '#475569',
              fontWeight: focused ? '700' : '500',
              fontSize: 3.3 * vmin,
            }}>
            {route.title}
          </Text>
        );
      }}
      labeled={true}
      shifting={false}
      activeIndicatorStyle={{backgroundColor: '#623e32'}}
      activeColor="#FB923C"
      inactiveColor="#475569"
      barStyle={{backgroundColor: '#e5e5e5'}}
      style={{borderRadius: 2 * vmax, maxHeight: 15 * vmax, elevation: 4}}
    />
  );
};

export default BottomNavBar;
