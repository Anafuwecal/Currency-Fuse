import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  DollarSign,
  PieChart,
  TrendingUp,
  BarChart3,
  User,
  Settings,
  Shield,
  Activity,
  LogOut,
  UserCircle,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/portfolio', icon: PieChart, label: 'Currency Holdings' },
    { path: '/trading', icon: RefreshCw, label: 'Exchange' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="w-64 bg-ash-900 border-r border-ash-800 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-ash-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-ash-600 to-ash-800 rounded-lg flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">CurrencyFuse</h1>
            <p className="text-sm text-ash-300">Currency Exchange Platform</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      {user && (
        <div className="p-4 border-b border-ash-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-ash-600 to-ash-800 rounded-full flex items-center justify-center">
              <UserCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user.name || user.email}
              </p>
              <p className="text-xs text-ash-300 truncate">{user.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                isActive
                  ? 'bg-ash-700 text-white border-r-2 border-ash-500'
                  : 'text-ash-300 hover:bg-ash-800 hover:text-white'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-ash-800 space-y-4">
        {/* Security Status */}
        <div className="bg-gradient-to-r from-success-50 to-ash-50 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <Shield className="w-5 h-5 text-success-600" />
            <span className="text-sm font-medium text-ash-900">Security Status</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success-500 rounded-full"></div>
            <span className="text-xs text-ash-600">All systems secure</span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-sm font-medium text-ash-300 hover:text-white hover:bg-ash-800 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;


