export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Stores: undefined; // إضافة شاشة المتاجر
  Points: undefined;
  Offers: undefined;
  Profile: undefined;
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
