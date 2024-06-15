/**
 * @format
 */

import 'react-native-url-polyfill/auto';
import {AppRegistry} from 'react-native';
import App from './App';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {name as appName} from './app.json';
import {AuthContextProvider} from './context/AuthContext';
import {useEffect} from 'react';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  // Handle the background message
  await displayNotification(remoteMessage.data);
});

export default function Main() {
  useEffect(() => {
    // Configure notification
    // PushNotification.configure({
    //   onRegister: function (token) {
    //     console.log('TOKEN:', token);
    //   },

    //   onNotification: function (notification) {
    //     console.log('NOTIFICATION:', notification);
    //   },

    //   permissions: {
    //     alert: true,
    //     badge: true,
    //     sound: true,
    //   },

    //   popInitialNotification: true,
    //   requestPermissions: true,
    // });

    // return () => {
    //   PushNotification.unregister();
    // };
    requestUserPermission();
  }, []);

  return (
    <AuthContextProvider>
      <PaperProvider>
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </PaperProvider>
    </AuthContextProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
