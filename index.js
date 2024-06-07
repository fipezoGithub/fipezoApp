/**
 * @format
 */

import 'react-native-url-polyfill/auto';
import {AppRegistry, Linking} from 'react-native';
import App from './App';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {name as appName} from './app.json';
import {AuthContextProvider} from './context/AuthContext';
import {useEffect} from 'react';
import PushNotification from 'react-native-push-notification';

export default function Main() {
  useEffect(() => {
    // Configure notification
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,
      requestPermissions: true,
    });

    return () => {
      PushNotification.unregister();
    };
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
