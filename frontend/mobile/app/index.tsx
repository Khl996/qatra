import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>الصفحة الرئيسية</Text>
      <Link href="/stores">المتاجر</Link>
    </View>
  );
}