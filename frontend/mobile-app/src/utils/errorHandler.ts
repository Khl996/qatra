import * as Updates from 'expo-updates';
import NetInfo from '@react-native-community/netinfo';
import { Alert } from 'react-native';
import Constants from 'expo-constants';

export const handleError = async (error: any) => {
  const netInfo = await NetInfo.fetch();
  
  if (!netInfo.isConnected) {
    Alert.alert(
      'خطأ في الاتصال',
      'يرجى التحقق من اتصال الإنترنت وإعادة المحاولة'
    );
    return;
  }

  // التحقق من وجود تحديثات للتطبيق
  if (Updates.channel) {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
        return;
      }
    } catch (updateError) {
      console.log('Error checking for updates:', updateError);
    }
  }

  // عرض رسالة الخطأ للمستخدم
  Alert.alert(
    'حدث خطأ',
    error?.message || 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى'
  );
};
