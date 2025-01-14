export interface LoginRequest {
  phone: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirmation: string;
}

export interface AddPointsRequest {
  customerPhone: string;
  points: number;
  notes?: string;
}

export interface CreateOfferRequest {
  title: string;
  description: string;
  pointsRequired: number;
  validUntil: string;
  image?: File;
}

export interface UpdateStoreRequest {
  name?: string;
  description?: string;
  location?: {
    lat: number;
    lng: number;
  };
  logo?: File;
}
