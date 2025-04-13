export interface Member {
    id: string;
    name: string;
    email: string;
    tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
    points: number;
    joinDate: string;
    lastVisit: string;
    totalSpent: number;
    preferences: string[];
    visitHistory: Visit[];
    churnRisk: number;
  }
  
  export interface Visit {
    id: string;
    date: string;
    type: 'Hotel' | 'Restaurant' | 'Spa' | 'Adventure';
    amount: number;
    location: string;
  }
  
  export interface AIInsight {
    memberId: string;
    recommendations: string[];
    churnProbability: number;
    suggestedRewards: string[];
    nextBestAction: string;
    segmentInfo: {
      segment: string;
      description: string;
      traits: string[];
    };
  }