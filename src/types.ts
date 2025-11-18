
export interface Beat {
  id: string | number;
  title: string;
  artist: string;
  bpm: number;
  key: string;
  genre: string;
  mood: string;
  tags: string[];
  artworkUrl: string;
  audioUrl: string;
  soundCloudUrl?: string;
  price: {
    basic: number;
    premium: number;
    exclusive: number;
  };
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface LicenseFeature {
  text: string;
  included: boolean;
}

export interface License {
  title: string;
  price: string;
  priceSubtitle?: string;
  features: LicenseFeature[];
  bestFor: string;
  isPopular?: boolean;
  isDark?: boolean;
  detailedInfo?: {
    whoThisIsFor: string;
    description: string[];
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface CartItem {
  beat: Beat;
  licenseType: 'basic' | 'premium' | 'exclusive';
}
