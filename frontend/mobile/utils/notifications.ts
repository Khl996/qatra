import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled = 
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    const fcmToken = await messaging().getToken();
    await AsyncStorage.setItem('fcmToken', fcmToken);
  }
}

export async function notificationListener() {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('Background Notification:', remoteMessage.notification);
  });

  messaging().onMessage(async remoteMessage => {
    console.log('Foreground Notification:', remoteMessage.notification);
  });
}
