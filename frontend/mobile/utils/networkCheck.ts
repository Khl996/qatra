import NetInfo from '@react-native-community/netinfo';
import { showMessage } from 'react-native-flash-message';

export const checkInternet = async () => {
  const state = await NetInfo.fetch();
  
  if (!state.isConnected) {
    showMessage({
      message: "لا يوجد اتصال بالإنترنت",
      description: "يرجى التحقق من اتصالك بالإنترنت",
      type: "danger",
      duration: 3000,
      rtl: true
    });
  }
  
  return state.isConnected;
};
