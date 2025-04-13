import { Member, Visit } from '../types';

const generateVisits = (count: number): Visit[] => {
  const types = ['Hotel', 'Restaurant', 'Spa', 'Adventure'] as const;
  const locations = ['Addis Ababa', 'Lake Tana', 'Bishoftu', 'Entoto'];

  return Array.from({ length: count }, (_, i) => ({
    id: `visit-${i}`,
    date: new Date(Date.now() - Math.random() * 31536000000).toISOString(),
    type: types[Math.floor(Math.random() * types.length)],
    amount: Math.floor(Math.random() * 1000) + 100,
    location: locations[Math.floor(Math.random() * locations.length)],
  }));
};

export const mockMembers: Member[] = [
  { id: 'mem-1', name: 'Abebe Kebede', email: 'abebe.k@example.com', tier: 'Gold', points: 15000, joinDate: '2023-01-15', lastVisit: '2024-02-20', totalSpent: 25000, preferences: ['Spa', 'Fine Dining', 'Lake View Rooms'], visitHistory: generateVisits(8), churnRisk: 0.2 },
  { id: 'mem-2', name: 'Sara Mohammed', email: 'sara.m@example.com', tier: 'Platinum', points: 30000, joinDate: '2022-06-10', lastVisit: '2024-03-01', totalSpent: 45000, preferences: ['Adventure Tours', 'Luxury Suites', 'Wellness'], visitHistory: generateVisits(12), churnRisk: 0.1 },
  { id: 'mem-3', name: 'Tigist Alemayehu', email: 'tigist.a@example.com', tier: 'Silver', points: 8000, joinDate: '2023-05-22', lastVisit: '2024-03-15', totalSpent: 12000, preferences: ['Restaurant', 'Local Cuisine', 'City Tours'], visitHistory: generateVisits(5), churnRisk: 0.4 },
  { id: 'mem-4', name: 'Bereket Tesfaye', email: 'bereket.t@example.com', tier: 'Bronze', points: 3000, joinDate: '2023-11-01', lastVisit: '2024-04-05', totalSpent: 5000, preferences: ['Hotel', 'Budget Rooms', 'Hiking'], visitHistory: generateVisits(3), churnRisk: 0.6 },
  { id: 'mem-5', name: 'Lidiya Getachew', email: 'lidiya.g@example.com', tier: 'Gold', points: 20000, joinDate: '2022-12-18', lastVisit: '2024-03-20', totalSpent: 32000, preferences: ['Spa', 'Relaxation', 'Cultural Events'], visitHistory: generateVisits(9), churnRisk: 0.15 },
  { id: 'mem-6', name: 'Dawit Solomon', email: 'dawit.s@example.com', tier: 'Platinum', points: 40000, joinDate: '2022-03-05', lastVisit: '2024-04-01', totalSpent: 60000, preferences: ['Adventure Tours', 'Exclusive Dining', 'Lake Cruises'], visitHistory: generateVisits(15), churnRisk: 0.05 },
  { id: 'mem-7', name: 'Rahel Assefa', email: 'rahel.a@example.com', tier: 'Silver', points: 11000, joinDate: '2023-08-10', lastVisit: '2024-04-10', totalSpent: 18000, preferences: ['Restaurant', 'Family Dining', 'Historical Sites'], visitHistory: generateVisits(6), churnRisk: 0.3 },
  { id: 'mem-8', name: 'Yonas Lemma', email: 'yonas.l@example.com', tier: 'Bronze', points: 5000, joinDate: '2024-01-01', lastVisit: '2024-04-12', totalSpent: 8000, preferences: ['Hotel', 'Quick Stays', 'Nature Walks'], visitHistory: generateVisits(4), churnRisk: 0.5 },
  { id: 'mem-9', name: 'Marta Haile', email: 'marta.h@example.com', tier: 'Gold', points: 25000, joinDate: '2022-09-25', lastVisit: '2024-03-25', totalSpent: 38000, preferences: ['Spa', 'Couples Retreat', 'Art Galleries'], visitHistory: generateVisits(10), churnRisk: 0.1 },
  { id: 'mem-10', name: 'Samuel Teshome', email: 'samuel.t@example.com', tier: 'Platinum', points: 55000, joinDate: '2022-01-10', lastVisit: '2024-04-15', totalSpent: 80000, preferences: ['Adventure Tours', 'VIP Services', 'Private Events'], visitHistory: generateVisits(20), churnRisk: 0.02 },
  { id: 'mem-11', name: 'Hana Getu', email: 'hana.g@example.com', tier: 'Silver', points: 13000, joinDate: '2023-07-01', lastVisit: '2024-04-18', totalSpent: 20000, preferences: ['Restaurant', 'Vegetarian', 'Cultural Shows'], visitHistory: generateVisits(7), churnRisk: 0.25 },
  { id: 'mem-12', name: 'Elias Kebede', email: 'elias.k@example.com', tier: 'Bronze', points: 7000, joinDate: '2024-02-15', lastVisit: '2024-04-20', totalSpent: 10000, preferences: ['Hotel', 'Family Rooms', 'Bird Watching'], visitHistory: generateVisits(5), churnRisk: 0.45 },
  { id: 'mem-13', name: 'Aster Tadesse', email: 'aster.t@example.com', tier: 'Gold', points: 30000, joinDate: '2022-11-05', lastVisit: '2024-03-28', totalSpent: 48000, preferences: ['Spa', 'Hot Stone Massage', 'Yoga Retreats'], visitHistory: generateVisits(11), churnRisk: 0.08 },
  { id: 'mem-14', name: 'Fitsum Lemma', email: 'fitsum.l@example.com', tier: 'Platinum', points: 70000, joinDate: '2021-12-01', lastVisit: '2024-04-22', totalSpent: 100000, preferences: ['Adventure Tours', 'Helicopter Rides', 'Wine Tasting'], visitHistory: generateVisits(25), churnRisk: 0.01 },
  { id: 'mem-15', name: 'Selamawit Girma', email: 'selamawit.g@example.com', tier: 'Silver', points: 16000, joinDate: '2023-06-15', lastVisit: '2024-04-25', totalSpent: 24000, preferences: ['Restaurant', 'Seafood', 'Live Music'], visitHistory: generateVisits(8), churnRisk: 0.22 },
  { id: 'mem-16', name: 'Yared Mekonnen', email: 'yared.m@example.com', tier: 'Bronze', points: 9000, joinDate: '2024-03-01', lastVisit: '2024-04-28', totalSpent: 13000, preferences: ['Hotel', 'Group Stays', 'Team Building'], visitHistory: generateVisits(6), churnRisk: 0.42 },
  { id: 'mem-17', name: 'Bethel Tesfaye', email: 'bethel.t@example.com', tier: 'Gold', points: 35000, joinDate: '2022-10-20', lastVisit: '2024-03-31', totalSpent: 55000, preferences: ['Spa', 'Aromatherapy', 'Meditation'], visitHistory: generateVisits(12), churnRisk: 0.07 },
  { id: 'mem-18', name: 'Kalkidan Assefa', email: 'kalkidan.a@example.com', tier: 'Platinum', points: 80000, joinDate: '2021-11-15', lastVisit: '2024-04-30', totalSpent: 120000, preferences: ['Adventure Tours', 'Private Tours', 'Art Workshops'], visitHistory: generateVisits(30), churnRisk: 0.005 },
  { id: 'mem-19', name: 'Henok Abebe', email: 'henok.a@example.com', tier: 'Silver', points: 19000, joinDate: '2023-05-30', lastVisit: '2024-05-02', totalSpent: 28000, preferences: ['Restaurant', 'Italian', 'Jazz Nights'], visitHistory: generateVisits(9), churnRisk: 0.2 },
  { id: 'mem-20', name: 'Ruth Solomon', email: 'ruth.s@example.com', tier: 'Bronze', points: 11000, joinDate: '2024-03-15', lastVisit: '2024-05-04', totalSpent: 16000, preferences: ['Hotel', 'Long Stays', 'Local Markets'], visitHistory: generateVisits(7), churnRisk: 0.4 },
];