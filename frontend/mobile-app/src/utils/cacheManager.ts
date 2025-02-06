import AsyncStorage from '@react-native-async-storage/async-storage';

export const cacheManager = {
  async setCache(key: string, data: any, expiryMinutes: number = 30) {
    const item = {
      data,
      timestamp: Date.now(),
      expiryMinutes
    };
    await AsyncStorage.setItem(key, JSON.stringify(item));
  },

  async getCache(key: string) {
    const item = await AsyncStorage.getItem(key);
    if (!item) return null;

    const parsedItem = JSON.parse(item);
    const now = Date.now();
    const expiryMs = parsedItem.expiryMinutes * 60 * 1000;

    if (now - parsedItem.timestamp > expiryMs) {
      await AsyncStorage.removeItem(key);
      return null;
    }

    return parsedItem.data;
  }
};
