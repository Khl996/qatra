import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkAuth = async (): Promise<boolean> => {
  try {
    const token = await AsyncStorage.getItem('qatra_token');
    return !!token;
  } catch {
    return false;
  }
};

export const setToken = async (token: string): Promise<void> => {
  await AsyncStorage.setItem('qatra_token', token);
};

export const removeToken = async (): Promise<void> => {
  await AsyncStorage.removeItem('qatra_token');
};

export const getToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem('qatra_token');
};
