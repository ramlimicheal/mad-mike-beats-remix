import { Beat, Testimonial, License, FaqItem } from './types';

export const BEATS: Beat[] = [
  {
    id: 1,
    title: 'Neon Dreams',
    artist: 'Mad Mike',
    bpm: 140,
    key: 'C# Minor',
    genre: 'Trap',
    mood: 'Energetic',
    tags: ['synth', '808', 'dark'],
    artworkUrl: 'https://picsum.photos/seed/neon/500/500',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    soundCloudUrl: 'https://soundcloud.com/YOUR_ACCOUNT/neon-dreams',
    price: { basic: 30, premium: 80, exclusive: 300 },
  },
  {
    id: 2,
    title: 'Midnight Drive',
    artist: 'Mad Mike',
    bpm: 90,
    key: 'F Minor',
    genre: 'Lo-Fi',
    mood: 'Chill',
    tags: ['relax', 'study', 'vinyl'],
    artworkUrl: 'https://picsum.photos/seed/midnight/500/500',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    soundCloudUrl: 'https://soundcloud.com/YOUR_ACCOUNT/midnight-drive',
    price: { basic: 25, premium: 70, exclusive: 250 },
  },
  {
    id: 3,
    title: 'Sunrise',
    artist: 'Mad Mike',
    bpm: 120,
    key: 'G Major',
    genre: 'R&B',
    mood: 'Uplifting',
    tags: ['soulful', 'piano', 'smooth'],
    artworkUrl: 'https://picsum.photos/seed/sunrise/500/500',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    soundCloudUrl: 'https://soundcloud.com/YOUR_ACCOUNT/sunrise',
    price: { basic: 35, premium: 90, exclusive: 400 },
  },
  {
    id: 4,
    title: 'After Hours',
    artist: 'Mad Mike',
    bpm: 125,
    key: 'A Minor',
    genre: 'Drill',
    mood: 'Gritty',
    tags: ['uk', 'hard', 'bass'],
    artworkUrl: 'https://picsum.photos/seed/hours/500/500',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    soundCloudUrl: 'https://soundcloud.com/YOUR_ACCOUNT/after-hours',
    price: { basic: 30, premium: 80, exclusive: 350 },
  },
  {
    id: 5,
    title: 'Lost Tapes',
    artist: 'Mad Mike',
    bpm: 85,
    key: 'D Minor',
    genre: 'Boom Bap',
    mood: 'Nostalgic',
    tags: ['90s', 'classic', 'drums'],
    artworkUrl: 'https://picsum.photos/seed/tapes/500/500',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    soundCloudUrl: 'https://soundcloud.com/YOUR_ACCOUNT/lost-tapes',
    price: { basic: 25, premium: 70, exclusive: 250 },
  },
  {
    id: 6,
    title: 'Velocity',
    artist: 'Mad Mike',
    bpm: 150,
    key: 'E Minor',
    genre: 'Trap',
    mood: 'Intense',
    tags: ['aggressive', 'synth', 'fast'],
    artworkUrl: 'https://picsum.photos/seed/velocity/500/500',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    soundCloudUrl: 'https://soundcloud.com/YOUR_ACCOUNT/velocity',
    price: { basic: 40, premium: 100, exclusive: 500 },
  },
];

export const TESTIMONIALS: Testimonial[] = [
  { quote: "The production quality is top-notch. These beats helped me complete my EP. Exactly what Indian hip-hop needs.", name: 'Raftaar', role: 'Hip-Hop Artist, Mumbai' },
  { quote: "Clean, professional beats with instant delivery. The licensing was straightforward. Perfect for my tracks.", name: 'Seedhe Maut', role: 'Rap Duo, New Delhi' },
  { quote: "Found the perfect sound for my next release. The quality speaks for itself. Highly recommended for serious artists.", name: 'Divine', role: 'Rapper & Producer, Mumbai' },
  { quote: "Been using these beats for my YouTube content. Great variety and the files are crystal clear. Worth every rupee.", name: 'Priya Malik', role: 'Content Creator, Bangalore' },
  { quote: "As an independent artist, finding quality beats is crucial. This is my go-to source now. Authentic and professional.", name: 'MC Altaf', role: 'Underground Artist, Hyderabad' },
];

export const LICENSES: License[] = [
  {
    title: 'Standard',
    price: '$49',
    priceSubtitle: 'Per License',
    features: [
      { text: 'Untagged MP3 + WAV', included: true },
      { text: '10,000 distribution copies', included: true },
      { text: '100,000 audio/video streams', included: true },
      { text: '1 music video', included: true },
      { text: 'Royalties split 50/50', included: true },
      { text: 'Live (for profit) performances', included: true },
      { text: 'Studio quality track stems', included: false },
      { text: 'Radio airplay', included: false },
      { text: 'YouTube Monetization', included: false },
    ],
    bestFor: 'Demos & Mixtapes',
    isPopular: false,
    isDark: false,
    detailedInfo: {
      whoThisIsFor: "Artists creating demos and mixtapes for promotion",
      description: [
        "Perfect for testing your sound before committing to a full release.",
        "Includes essential features to get started with professional quality files.",
        "Great for building your fanbase and testing tracks with your audience."
      ]
    }
  },
  {
    title: 'Professional',
    price: '$99',
    priceSubtitle: 'Per License',
    features: [
      { text: 'Untagged MP3, WAV & Stems', included: true },
      { text: '10,000 distribution copies', included: true },
      { text: '1,000,000 audio/video streams', included: true },
      { text: '2 music videos', included: true },
      { text: 'Royalties split 50/50', included: true },
      { text: 'Live (for profit) performances', included: true },
      { text: 'Studio quality track stems', included: true },
      { text: 'Radio airplay', included: false },
      { text: 'YouTube Monetization', included: false },
    ],
    bestFor: 'Singles & EPs',
    isPopular: false,
    isDark: true,
    detailedInfo: {
      whoThisIsFor: "Serious artists releasing singles and EPs",
      description: [
        "Designed for artists ready to release professional tracks on all platforms.",
        "Includes track stems for complete creative control in mixing and mastering.",
        "Higher distribution and streaming limits to support your growing audience.",
        "Perfect for artists looking to establish a professional presence."
      ]
    }
  },
  {
    title: 'Unlimited',
    price: '$199',
    priceSubtitle: 'Per License',
    features: [
      { text: 'Untagged MP3, WAV & Stems', included: true },
      { text: 'Unlimited distribution copies', included: true },
      { text: 'Unlimited audio/video streams', included: true },
      { text: '2 music videos', included: true },
      { text: 'Royalties split 50/50', included: true },
      { text: 'Live (for profit) performances', included: true },
      { text: 'Studio quality track stems', included: true },
      { text: 'Radio airplay', included: true },
      { text: 'YouTube Monetization', included: true },
    ],
    bestFor: 'Albums & Pro Mixes',
    isPopular: true,
    isDark: false,
    detailedInfo: {
      whoThisIsFor: "Professional artists and labels releasing albums",
      description: [
        "No limits on distribution or streaming - perfect for viral hits.",
        "Full commercial rights including radio airplay and YouTube monetization.",
        "Complete creative control with professional track stems included.",
        "Ideal for established artists, labels, and serious commercial releases.",
        "The ultimate license for maximum reach and revenue potential."
      ]
    }
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is a beat license?",
    answer: "A beat license gives you the legal right to use a beat for your music. Different licenses offer different usage rights and distribution limits."
  },
  {
    question: "Can I use the beat for commercial purposes?",
    answer: "Yes! All our licenses allow commercial use. The Professional and Unlimited licenses offer more flexibility for commercial distribution."
  },
  {
    question: "What files do I receive?",
    answer: "You'll receive high-quality MP3 and WAV files. Premium and Unlimited licenses also include separated track stems for professional mixing."
  },
  {
    question: "How do I receive my files?",
    answer: "After purchase, you'll receive an instant download link via email. Files are also available in your account dashboard."
  },
  {
    question: "What if I need exclusive rights?",
    answer: "Contact us for exclusive rights pricing. Exclusive licenses remove the beat from our store and transfer all rights to you."
  }
];
