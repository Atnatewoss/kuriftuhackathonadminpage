import React from 'react';
import { mockMembers } from '../data/mockData';
import { BarChart3, Users, TrendingUp, AlertTriangle } from 'lucide-react';

export const Dashboard = () => {
  const stats = [
    {
      name: 'Total Members',
      value: mockMembers.length,
      icon: Users,
      change: '+12%',
    },
    {
      name: 'Active Members',
      value: mockMembers.filter(m => m.churnRisk < 0.3).length,
      icon: TrendingUp,
      change: '+8%',
    },
    {
      name: 'At Risk Members',
      value: mockMembers.filter(m => m.churnRisk > 0.7).length,
      icon: AlertTriangle,
      change: '-2%',
    },
    {
      name: 'Total Revenue',
      value: `$${mockMembers.reduce((acc, m) => acc + m.totalSpent, 0).toLocaleString()}`,
      icon: BarChart3,
      change: '+15%',
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white overflow-hidden rounded-lg shadow"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Icon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stat.value}
                        </div>
                        <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                          stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stat.change}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
          <div className="flow-root">
            <ul className="-mb-8">
              {mockMembers[0].visitHistory.slice(0, 5).map((visit, idx) => (
                <li key={visit.id}>
                  <div className="relative pb-8">
                    {idx !== 4 && (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    )}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                          <Users className="h-5 w-5 text-white" />
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                          <p className="text-sm text-gray-500">
                            {visit.type} visit at {visit.location}
                          </p>
                        </div>
                        <div className="whitespace-nowrap text-right text-sm text-gray-500">
                          ${visit.amount}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Member Distribution */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Member Distribution</h2>
          <div className="space-y-4">
            {['Platinum', 'Gold', 'Silver', 'Bronze'].map((tier) => {
              const count = mockMembers.filter(m => m.tier === tier).length;
              const percentage = (count / mockMembers.length) * 100;
              return (
                <div key={tier}>
                  <div className="flex items-center justify-between text-sm font-medium text-gray-900">
                    <span>{tier}</span>
                    <span>{percentage.toFixed(1)}%</span>
                  </div>
                  <div className="mt-1 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-blue-600"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};