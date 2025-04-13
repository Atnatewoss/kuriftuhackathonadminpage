import React, { useState, useEffect } from 'react';
import { mockMembers } from '../data/mockData';
import { Brain, TrendingUp, UserCheck, AlertTriangle, LineChart, Award, Target } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const AIInsights = () => {
  const [selectedMember, setSelectedMember] = useState(mockMembers[0]);
  const [spendingTrend, setSpendingTrend] = useState<any[]>([]);
  const [pointsTrend, setPointsTrend] = useState<any[]>([]);

  useEffect(() => {
    // Calculate spending and points trends
    const trends = selectedMember.visitHistory
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map(visit => ({
        date: new Date(visit.date).toLocaleDateString(),
        amount: visit.amount,
        points: calculatePoints(visit)
      }));
    
    setSpendingTrend(trends);
    setPointsTrend(trends);
  }, [selectedMember]);

  const calculatePoints = (visit: any) => {
    const multipliers: Record<string, number> = {
      'Hotel': 2.0,
      'Restaurant': 1.5,
      'Spa': 1.8,
      'Adventure': 2.2
    };
    return Math.round(visit.amount * (multipliers[visit.type] || 1.0));
  };

  const insights = {
    currentPoints: selectedMember.points,
    recommendedTier: selectedMember.tier,
    tierBenefits: [
      'Priority check-in/check-out',
      'Room upgrades when available',
      'Bonus points on stays',
      'Exclusive member events'
    ],
    recommendations: [
      `Earn double points on your next ${selectedMember.preferences[0]} visit`,
      'Book a weekend stay to reach next tier faster',
      'Try our new adventure package with bonus points'
    ],
    nextTierProgress: {
      nextTier: 'Platinum',
      pointsNeeded: 5000,
      estimatedMonths: 3
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">AI Insights & Loyalty Analysis</h1>

      {/* Member Selector */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700">
          Select Member
        </label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={selectedMember.id}
          onChange={(e) => setSelectedMember(mockMembers.find(m => m.id === e.target.value)!)}
        >
          {mockMembers.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name} - {member.tier}
            </option>
          ))}
        </select>
      </div>

      {/* Points Overview */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex items-center mb-4">
          <Award className="h-6 w-6 text-purple-500 mr-2" />
          <h2 className="text-lg font-medium text-gray-900">
            Points & Tier Status
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="text-sm text-purple-600">Current Points</div>
            <div className="text-2xl font-bold text-purple-700">
              {insights.currentPoints.toLocaleString()}
            </div>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-sm text-blue-600">Current Tier</div>
            <div className="text-2xl font-bold text-blue-700">
              {insights.recommendedTier}
            </div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-sm text-green-600">Points to Next Tier</div>
            <div className="text-2xl font-bold text-green-700">
              {insights.nextTierProgress.pointsNeeded.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Points Trend Chart */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex items-center mb-4">
          <LineChart className="h-6 w-6 text-blue-500 mr-2" />
          <h2 className="text-lg font-medium text-gray-900">
            Points Earning Trend
          </h2>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart data={pointsTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="points" stroke="#8b5cf6" />
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Tier Benefits */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Award className="h-6 w-6 text-purple-500 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">
              Current Tier Benefits
            </h2>
          </div>
          <ul className="space-y-4">
            {insights.tierBenefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                  {idx + 1}
                </span>
                <span className="ml-3 text-sm text-gray-600">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Next Tier Progress */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Target className="h-6 w-6 text-green-500 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">
              Next Tier Progress
            </h2>
          </div>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">
                Progress to {insights.nextTierProgress.nextTier}
              </span>
              <span className="text-sm font-medium text-gray-700">
                {Math.round((insights.currentPoints / (insights.currentPoints + insights.nextTierProgress.pointsNeeded)) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: `${(insights.currentPoints / (insights.currentPoints + insights.nextTierProgress.pointsNeeded)) * 100}%` }}
              ></div>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Estimated {insights.nextTierProgress.estimatedMonths} months to reach next tier
            </p>
          </div>
        </div>

        {/* Personalized Recommendations */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Brain className="h-6 w-6 text-blue-500 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">
              Points Earning Opportunities
            </h2>
          </div>
          <ul className="space-y-4">
            {insights.recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  {idx + 1}
                </span>
                <span className="ml-3 text-sm text-gray-600">{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Spending Analysis */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <TrendingUp className="h-6 w-6 text-orange-500 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">
              Spending Analysis
            </h2>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={spendingTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#f97316" />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};