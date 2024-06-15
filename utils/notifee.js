import notifee, {AndroidImportance, EventType} from '@notifee/react-native';

notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;

  // Check the type of event
  if (type === EventType.ACTION_PRESS && pressAction.id === 'default') {
    // Handle the press action
    console.log('Notification action pressed', notification);
  }
});

export async function displayNotification(data) {
  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });

  if (!data[0]) {
    return;
  }

  // Display a notification
  await notifee.displayNotification({
    title: 'Fipezo',
    body: data[0]?.headline,
    android: {
      channelId,
      smallIcon: 'ic_launcher',
      pressAction: {
        id: 'default',
      },
    },
  });
}
