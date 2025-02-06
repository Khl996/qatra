import NetInfo from '@react-native-community/netinfo';
import { Alert } from 'react-native';

export const checkNetworkConnection = async () => {
  const state = await NetInfo.fetch();
  if (!state.isConnected) {
    Alert.alert(
      'خطأ في الاتصال',
      'يرجى التحقق من اتصال الإنترنت الخاص بك'
    );
    return false;
  }
  return true;
};
