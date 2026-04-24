import bcrypt from 'bcryptjs';

const hash = bcrypt.hashSync('password123', 10);

const IMG = {
  rotem:  'https://lh3.googleusercontent.com/aida-public/AB6AXuCmyO1_OxHw4tGBjnmmTQuMf76XQEW2b3XXT26kdyS7qTS5lRngkYqjSV5aGbszpM48rqTB746kedSiTxu-XpjoAtL9dWtsPM2qMaTlqoCb16RxVtomOl_CtcajccNQ5fibRHNC29zmHyACFBcmE71UOc0OeUyE9T14R-hXv2CRLFl1VLdyy1LVeQ7i6RNQZi8hEwtqfmbWxVLd4jsOAdqZZgQf2ty7dkqF8i8Sa1-d2fG0ab2-VsH6yE0t1opt0By84_OsH3bKajU',
  gilad:  'https://lh3.googleusercontent.com/aida-public/AB6AXuACdIndeA92vM3CzD6GdHoFbZVushxl3HRweNJ6WqjXImZHQ8muq0Ag26BLkRqOksKH-tQJ8ka1xJRivNA2syMHJChYKqb7rqZ_8b_IAnd7H7Yeq1JbvC6YoANRRBkYMBZF-rlKjCtpXcM8BmIh3kjq0ymbOWZDhvknMCHD0rRP3NfZ1IHuOlTPJz0wg9ELMXxekhnvUzdJUZmXVHgFFRSvUxECnbo7SFfLerK3iuwyVsJWzGfV1CQM-wljqIOMD8bLyIHiWcfmllw',
  sarah:  'https://lh3.googleusercontent.com/aida-public/AB6AXuBpopsb79w7exjHcJkc0s7-8GaBY0hzQMJZZuwzQSlg92RFnq7iqea1USuG2odkjPIcNZ_r3Yh2n74Ucb0GOL7vakb-98e7psEtMc1B79DTkFXFpx_Ew9U53ZyBx9YtMfQzBLrY9If5P06EC8CWYg0RKknsf1jsmnjKdDa8ylm4VrWRFUTB0df2K38qjIRzzjV0lhtxfJvgqyFEncwdDwP7an6AHM4-6QNdO9M5Gwub6sgaW98BpYWb3rxdG3uG7SNReJC_UarsoaQ',
  marcus: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdayfAbA1nGcZ1g9mqBnNo4y7Q-rKObObg1ntgUvyUCZLJZfq6Bm3KnWiqnnZxYEmrWUglzdBWXAfJWOL0Wuw1cLFQh7zA05Sb3l6MSliCvwc62rhOCKDTdZnYgdZsRUw5_l5JxRuG-BWXNERDvKtBI_OZef8eFIG-0WOI7Eh0hYaGUEcZrfb-LkXMgvw18Sp3Z9js-SuLhNl0IUy4O0NSuydPmG095i6VMQcLx6as56ZZ5iS3-EWBwG0gWB3NFGHqRkboJTRPSqI',
  elena:  'https://lh3.googleusercontent.com/aida-public/AB6AXuCVUepBMmIv0mXKvw77_lVqzTK8-jXbrvwhV8jl5E4ivjZVjUdwXcXWsfyPWu9P2dMjjRkaiHWKahiF_LYV7mqyoWVFlnz5HzVtFQUWEUobw--WdONJeBPslxo0p964ZOs9cwXEznGUWXgBlPCZ6fxdBuJFFnIdtKHunC65jLpaD9wlyCwRAyAmfrSWWk2p88e5HhwnLiW14ic5yp-ZQCgS9dyvY217bxsmSBd0uGlSgFX2bwh5q6M1t27O305yGEu41x9rbuBY31Q',
  noa:    'https://lh3.googleusercontent.com/aida-public/AB6AXuAJd_B3jwJfQis-oXkCWTw8fKw-ZOf8GZiRTWA67SYV7zsj_ttTMWYdcIU2WropA1-ZLbPRX23uiIaihbIj6lz2uR60kQ1Ko9euKBfxO0qLLVFNDHgdsVult9eTk83K6OV6q7vLRFikjKPpdDuhJNz7cWMY4fdFZWDtR3IK67oDFCZiqg_Gytgpl40JiB1cO2_HYixVtUJpm6oaUF5fWxt1jByvXQeQ3tzffZvZtKvEIFbxSMkLyW-zzxmXrG0Y9agTY9WGMNXg6W0',
  yaron:  'https://lh3.googleusercontent.com/aida-public/AB6AXuC4dGph_EfDC-Vk44rBlzwl4XBOkbmhBUaET7mJzlYI8eMI7dXS2xVj4c8gOoZldyVTYTPksZPH2A_6s-CgY_NIaeeAioprEQShveoGwzPFLL59Cr6Q_MyaNaE-0jIZjhd6npYSrBNOgmcX07ab-GZLFAzuFCisbe2s63GBSh_UpH8A-lH_SsVJW3mdwLkAxFNeV4xBm7prmkm_3VVQKHy9FSeg5Fm5dkodvIUCn_OhVssqRgamPMTiFxJ5MxDkfP25q_H25fX23iM',
};

export const seed = {
  users: [
    { id: 'u1', name: 'Rotem Cohen', email: 'rotem@example.com', password: hash, avatar: IMG.rotem },
    { id: 'u2', name: 'Gilad Levi',  email: 'gilad@example.com',  password: hash, avatar: IMG.gilad },
  ],

  people: [
    { id: 'p1', userId: 'u1', name: 'Sarah',  birthdate: '1996-05-28', eventType: 'birthday',     avatar: IMG.sarah,  relation: 'Best Friend' },
    { id: 'p2', userId: 'u1', name: 'Marcus', birthdate: '2021-06-02', eventType: 'anniversary', eventLabel: 'Anniversary', avatar: IMG.marcus, relation: 'Friend' },
    { id: 'p3', userId: 'u1', name: 'Elena',  birthdate: '2000-07-04', eventType: 'custom',       eventLabel: 'Graduation',  avatar: IMG.elena,  relation: 'Colleague' },
    { id: 'p4', userId: 'u1', name: 'Noa',    birthdate: '1998-08-15', eventType: 'birthday',     avatar: IMG.noa,    relation: 'Sister' },
    { id: 'p5', userId: 'u1', name: 'Yaron',  birthdate: '1990-09-03', eventType: 'birthday',     avatar: IMG.yaron,  relation: 'Colleague' },
  ],

  gifts: [
    { id: 'g1',  name: 'Lush Spa Gift Set',       price: 65,  image: 'https://picsum.photos/seed/spa/400/300',      description: 'Luxurious bath bombs and body butter collection',        category: 'wellness',     vibeTag: "It's Giving Soft",    rating: 4.8 },
    { id: 'g2',  name: 'Kindle Paperwhite',        price: 140, image: 'https://picsum.photos/seed/kindle/400/300',  description: 'Waterproof e-reader with warm light, 8GB',               category: 'tech',         vibeTag: "It's Giving Iconic",  rating: 4.9 },
    { id: 'g3',  name: 'Coffee Lover Bundle',      price: 55,  image: 'https://picsum.photos/seed/coffee/400/300',  description: 'Specialty beans from 3 roasters + hand grinder',         category: 'food',         vibeTag: "It's Giving Cozy",    rating: 4.7 },
    { id: 'g4',  name: 'Personalized Jewelry Box', price: 85,  image: 'https://picsum.photos/seed/jewelry/400/300', description: 'Engraved wooden box with velvet lining',                 category: 'home',         vibeTag: "It's Giving Classic", rating: 4.6 },
    { id: 'g5',  name: 'Yoga Starter Kit',         price: 75,  image: 'https://picsum.photos/seed/yoga/400/300',    description: 'Non-slip mat, blocks, and strap set',                    category: 'fitness',      vibeTag: "It's Giving Healthy", rating: 4.5 },
    { id: 'g6',  name: 'Board Game Night Set',     price: 45,  image: 'https://picsum.photos/seed/games/400/300',   description: 'Catan + Ticket to Ride mini expansions',                 category: 'games',        vibeTag: "It's Giving Fun",     rating: 4.8 },
    { id: 'g7',  name: 'Leather Travel Wallet',    price: 90,  image: 'https://picsum.photos/seed/wallet/400/300',  description: 'Slim RFID-blocking full-grain leather',                  category: 'accessories',  vibeTag: "It's Giving Iconic",  rating: 4.7 },
    { id: 'g8',  name: 'Cooking Masterclass',      price: 120, image: 'https://picsum.photos/seed/cooking/400/300', description: '1-year subscription to 180+ chef-taught classes',        category: 'experiences',  vibeTag: "It's Giving Chef",    rating: 4.9 },
    { id: 'g9',  name: 'Scented Candle Set',       price: 35,  image: 'https://picsum.photos/seed/candles/400/300', description: 'Hand-poured soy wax in 3 seasonal scents',               category: 'home',         vibeTag: "It's Giving Cozy",    rating: 4.6 },
    { id: 'g10', name: 'Polaroid Camera',          price: 110, image: 'https://picsum.photos/seed/polaroid/400/300',description: 'Instant film camera with 20-shot film pack',             category: 'tech',         vibeTag: "It's Giving Vintage", rating: 4.7 },
  ],

  orders: [
    { id: 'o1', userId: 'u1', personId: 'p1', personName: 'Sarah',  personAvatar: IMG.sarah,  giftId: 'g1',  giftName: 'Lush Spa Gift Set',    giftImage: 'https://picsum.photos/seed/spa/400/300',    price: 65,  date: '2025-05-28', status: 'delivered' },
    { id: 'o2', userId: 'u1', personId: 'p2', personName: 'Marcus', personAvatar: IMG.marcus, giftId: 'g6',  giftName: 'Board Game Night Set', giftImage: 'https://picsum.photos/seed/games/400/300',  price: 45,  date: '2025-06-02', status: 'delivered' },
    { id: 'o3', userId: 'u1', personId: 'p5', personName: 'Yaron',  personAvatar: IMG.yaron,  giftId: 'g7',  giftName: 'Leather Travel Wallet', giftImage: 'https://picsum.photos/seed/wallet/400/300', price: 90,  date: '2025-09-03', status: 'delivered' },
  ],
};
