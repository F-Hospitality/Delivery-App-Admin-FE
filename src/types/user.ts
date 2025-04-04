export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  defaultAddress: string;
  notifications: {
    orderUpdates: boolean;
    promotions: boolean;
    newsletter: boolean;
    itemAvailability: boolean;
  };
}

export interface UserSettings {
  profile: UserProfile;
  theme: string;
  language: string;
} 