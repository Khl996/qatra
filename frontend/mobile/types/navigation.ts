export type RootStackParamList = {
  // ...existing types...
  OfferDetails: {
    id: string;
    title: string;
    description: string;
    discount: number;
    storeId: string;
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
