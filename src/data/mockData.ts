import { Member, Visit } from '../types';

const generateVisits = (count: number): Visit[] => {
  const types = ['Hotel', 'Restaurant', 'Spa', 'Adventure'] as const;
  const locations = ['Addis Ababa', 'Lake Tana', 'Bishoftu', 'Entoto'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `visit-${i}`,
    date: new Date(Date.now() - Math.random() * 31536000000).toISOString(),
    type: types[Math.floor(Math.random() * types.length)],
    amount: Math.floor(Math.random() * 1000) + 100,
    location: locations[Math.floor(Math.random() * locations.length)]
  }));
};

export const mockMembers: Member[] = [
  {
    id: 'mem-1',
    name: 'Abebe Kebede',
    email: 'abebe.k@example.com',
    tier: 'Gold',
    points: 15000,
    joinDate: '2023-01-15',
    lastVisit: '2024-02-20',
    totalSpent: 25000,
    preferences: ['Spa', 'Fine Dining', 'Lake View Rooms'],
    visitHistory: generateVisits(8),
    churnRisk: 0.2
  },
  {
    id: 'mem-2',
    name: 'Sara Mohammed',
    email: 'sara.m@example.com',
    tier: 'Platinum',
    points: 30000,
    joinDate: '2022-06-10',
    lastVisit: '2024-03-01',
    totalSpent: 45000,
    preferences: ['Adventure Tours', 'Luxury Suites', 'Wellness'],
    visitHistory: generateVisits(12),
    churnRisk: 0.1
  },
  // Add more mock members...
];