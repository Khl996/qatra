import { registerRootComponent } from 'expo';
import App from './App';

// أضف هذا الكود لحل مشكلة التوجيه
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // تجاهل التحذيرات غير المهمة

registerRootComponent(App);
