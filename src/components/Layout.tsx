import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Brain, LogOut } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'AI Insights', href: '/ai-insights', icon: Brain },
    { name: 'Members', href: '/members', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg">
          <div className="flex h-16 items-center justify-center border-b">
            <h1 className="text-xl font-bold text-gray-900">Kuriftu Loyalty</h1>
          </div>
          <nav className="mt-6">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    flex items-center px-6 py-3 text-sm
                    ${location.pathname === item.href
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="absolute bottom-0 w-64 border-t">
            <button className="flex w-full items-center px-6 py-4 text-sm text-gray-600 hover:bg-gray-50">
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <main className="p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}