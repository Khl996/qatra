import { Offer, Store } from './index';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  SignUp: undefined;
  Main: undefined;
  Offers: undefined;  // إضافة هذا السطر
  OfferDetails: {
    offer: Offer;
    userPoints: number;
    onRedeem: () => void;
  };
  StoreDetails: {
    storeId: string;
  };
  Settings: undefined;
  Help: undefined;
  NearbyStores: undefined;
};
