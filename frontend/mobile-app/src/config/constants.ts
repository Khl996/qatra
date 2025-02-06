import { Platform } from 'react-native';
import Constants from 'expo-constants';

const ENV = {
  dev: {
    apiUrl: Platform.select({
      ios: 'http://localhost:5000/api',
      android: 'http://10.0.2.2:5000/api' // للمحاكي
      // android: 'http://172.20.10.4:5000/api' // للجهاز الحقيقي - استبدل X بـ IP جهازك
    }),
    enableLogging: true
  },
  prod: {
    apiUrl: 'https://api.qatra-app.com/api',
    enableLogging: false
  }
};

export default Constants.expoConfig?.extra?.releaseChannel
  ? ENV.prod
  : ENV.dev;
