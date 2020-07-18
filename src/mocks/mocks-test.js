export const offers = [
  {
    id: 1,
    isPremium: true,
    images: [
      `img/apartment-01.jpg`,
      `img/room.jpg`,
      `img/apartment-02.jpg`,
      `img/apartment-03.jpg`,
    ],
    price: 120,
    isBookmark: false,
    rating: 4.5,
    name: `Beautiful & luxurious apartment at great location`,
    type: `Apartment`,
    bedrooms: 3,
    maxAdults: 1,
    features: [
      'Heating',
      'Kitchen',
      'Cable TV',
      'Washing machine',
      'Coffee machine',
    ],
    hostName: `Dima`,
    hostAvatar: `img/avatar-angelina.jpg`,
    isHostPro: true,
    description:
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10,
      },
      name: 'Amsterdam',
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 8,
    },
  },
  {
    id: 2,
    isPremium: false,
    images: [`img/room.jpg`],
    price: 80,
    isBookmark: true,
    rating: 4,
    name: `Wood and stone place`,
    type: `Private room`,
    bedrooms: 2,
    maxAdults: 3,
    features: [
      'Heating',
      'Kitchen',
      'Cable TV',
      'Washing machine',
      'Coffee machine',
      'Dishwasher',
    ],
    hostName: `Alex`,
    hostAvatar: `img/avatar-angelina.jpg`,
    isHostPro: false,
    description:
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10,
      },
      name: 'Amsterdam',
    },
    location: {
      latitude: 52.369553943508,
      longitude: 4.85309666406198,
      zoom: 8,
    },
  },
  {
    id: 3,
    isPremium: false,
    images: [`img/apartment-02.jpg`],
    price: 132,
    isBookmark: false,
    rating: 4,
    name: `Canal View Prinsengracht`,
    type: `Apartment`,
    bedrooms: 5,
    maxAdults: 2,
    features: ['Heating', 'Cable TV', 'Coffee machine', 'Dishwasher'],
    hostName: `Pavel`,
    hostAvatar: `img/avatar-angelina.jpg`,
    isHostPro: false,
    description:
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10,
      },
      name: 'Amsterdam',
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 8,
    },
  },
];

export const incompletePlace = {
  id: 1,
  images: [
    `img/apartment-01.jpg`,
    `img/room.jpg`,
    `img/apartment-02.jpg`,
    `img/apartment-03.jpg`,
  ],
  price: 120,
  rating: 4.5,
  name: `Beautiful & luxurious apartment at great location`,
  type: `Apartment`,
  bedrooms: 3,
  maxAdults: 1,
  features: [
    'Heating',
    'Kitchen',
    'Cable TV',
    'Washing machine',
    'Coffee machine',
  ],
  hostName: `Dima`,
  hostAvatar: `img/avatar-angelina.jpg`,
  description:
    'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  city: {
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10,
    },
    name: 'Amsterdam',
  },
  location: {
    latitude: 52.3909553943508,
    longitude: 4.85309666406198,
    zoom: 8,
  },
};

export const reviews = [
  {
    comment:
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    date: new Date(2020, 5, 14),
    id: 1,
    rating: 4,
    userAvatar: 'img/avatar-max.jpg',
    userId: 4,
    isUserPro: false,
    userName: `Max`,
  },
  {
    comment:
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    date: new Date(2020, 7, 1),
    id: 2,
    rating: 3.5,
    userAvatar: `img/avatar-max.jpg`,
    userId: 3,
    isUserPro: true,
    userName: `Lex`,
  },
];
