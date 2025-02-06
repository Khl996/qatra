import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  StoreDetails: { id: string };
  OfferDetails: { 
    id: string;
    storeId: string; // Add storeId parameter
  };
  Profile: undefined;
  Notifications: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  OtpVerification: {
    phoneNumber: string;
    mode: 'register' | 'reset';
  };
};

export type MainTabParamList = {
  Home: undefined;
  Stores: undefined;
  Points: undefined;
  Offers: undefined;
  Profile: undefined;
};

// نوع التنقل للشاشة الرئيسية
export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList
>;
