export const routes = {
  auth: {
    login: 'Login',
    signup: 'SignUp',
  },
  main: {
    home: 'Home',
    offers: 'Offers',
    profile: 'Profile',
  },
  store: {
    details: 'StoreDetails',
    offers: 'OfferDetails',
  },
  settings: {
    main: 'Settings',
    editProfile: 'EditProfile',
    help: 'Help',
    points: 'PointsHistory',
  },
} as const;

export type Routes = typeof routes;
