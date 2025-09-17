import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Euro, Pound, BarChart3, Activity, Globe, Target, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// Mock analytics data
const exchangeRateTrends = [
  { date: 'Jan', USD: 1600, EUR: 1750, GBP: 2050, NGN: 1, XOF: 650 },
  { date: 'Feb', USD: 1620, EUR: 1740, GBP: 2070, NGN: 1, XOF: 648 },
  { date: 'Mar', USD: 1640, EUR: 1760, GBP: 2090, NGN: 1, XOF: 652 },
  { date: 'Apr', USD: 1660, EUR: 1770, GBP: 2110, NGN: 1, XOF: 655 },
  { date: 'May', USD: 1680, EUR: 1780, GBP: 2130, NGN: 1, XOF: 658 },
  { date: 'Jun', USD: 1700, EUR: 1790, GBP: 2150, NGN: 1, XOF: 660 },
];

const tradingVolume = [
  { currency: 'USD/NGN', volume: 1250000, change: 12.5, trend: 'up' },
  { currency: 'EUR/NGN', volume: 890000, change: -5.2, trend: 'down' },
  { currency: 'GBP/NGN', volume: 750000, change: 8.7, trend: 'up' },
  { currency: 'USD/XOF', volume: 680000, change: 15.3, trend: 'up' },
  { currency: 'EUR/XOF', volume: 520000, change: -2.1, trend: 'down' },
  { currency: 'NGN/XOF', volume: 450000, change: 6.8, trend: 'up' },
];

const marketSentiment = [
  { sentiment: 'Bullish', percentage: 65, color: '#10b981' },
  { sentiment: 'Neutral', percentage: 25, color: '#6b7280' },
  { sentiment: 'Bearish', percentage: 10, color: '#ef4444' },
];

const volatilityData = [
  { currency: 'USD/NGN', volatility: 2.5, risk: 'Low', color: '#10b981' },
  { currency: 'EUR/NGN', volatility: 3.2, risk: 'Medium', color: '#f59e0b' },
  { currency: 'GBP/NGN', volatility: 4.1, risk: 'Medium', color: '#f59e0b' },
  { currency: 'USD/XOF', volatility: 1.8, risk: 'Low', color: '#10b981' },
  { currency: 'EUR/XOF', volatility: 2.9, risk: 'Medium', color: '#f59e0b' },
  { currency: 'NGN/XOF', volatility: 5.2, risk: 'High', color: '#ef4444' },
];

const Analytics: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6M');
  const [selectedCurrency, setSelectedCurrency] = useState('USD/NGN');

  const timeframes = ['1M', '3M', '6M', '1Y', 'ALL'];
  const currencies = ['USD/NGN', 'EUR/NGN', 'GBP/NGN', 'USD/XOF', 'EUR/XOF', 'NGN/XOF'];

  const totalVolume = tradingVolume.reduce((sum, item) => sum + item.volume, 0);
  const averageVolatility = volatilityData.reduce((sum, item) => sum + item.volatility, 0) / volatilityData.length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-ash-900">Currency Analytics</h1>
          <p className="text-ash-600">Advanced analytics and market insights for currency exchange</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="input-field w-32"
          >
            {timeframes.map((timeframe) => (
              <option key={timeframe} value={timeframe}>{timeframe}</option>
            ))}
          </select>
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="input-field w-40"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-ash-600">Total Trading Volume</p>
              <p className="text-2xl font-bold text-ash-900">${(totalVolume / 1000000).toFixed(1)}M</p>
            </div>
                    <div className="p-3 bg-ash-100 rounded-lg">
          <BarChart3 className="w-6 h-6 text-ash-600" />
        </div>
          </div>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-success-500 mr-1" />
            <span className="text-sm text-success-600">+8.2% from last month</span>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-ash-600">Average Volatility</p>
              <p className="text-2xl font-bold text-ash-900">{averageVolatility.toFixed(1)}%</p>
            </div>
            <div className="p-3 bg-warning-100 rounded-lg">
              <Activity className="w-6 h-6 text-warning-600" />
            </div>
          </div>
          <p className="text-sm text-ash-600 mt-2">Market stability indicator</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-ash-600">Active Pairs</p>
              <p className="text-2xl font-bold text-ash-900">{currencies.length}</p>
            </div>
            <div className="p-3 bg-success-100 rounded-lg">
              <Globe className="w-6 h-6 text-success-600" />
            </div>
          </div>
          <p className="text-sm text-ash-600 mt-2">Currency pairs traded</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-ash-600">Market Sentiment</p>
              <p className="text-2xl font-bold text-ash-900">Bullish</p>
            </div>
            <div className="p-3 bg-success-100 rounded-lg">
              <Target className="w-6 h-6 text-success-600" />
            </div>
          </div>
          <p className="text-sm text-success-600 mt-2">65% positive outlook</p>
        </div>
      </div>

      {/* Exchange Rate Trends */}
      <div className="card">
        <h3 className="text-lg font-semibold text-ash-900 mb-4">Exchange Rate Trends</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={exchangeRateTrends}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
              }}
            />
            <Line type="monotone" dataKey="USD" stroke="#3b82f6" strokeWidth={2} name="USD/NGN" />
            <Line type="monotone" dataKey="EUR" stroke="#10b981" strokeWidth={2} name="EUR/NGN" />
            <Line type="monotone" dataKey="GBP" stroke="#f59e0b" strokeWidth={2} name="GBP/NGN" />
            <Line type="monotone" dataKey="XOF" stroke="#ef4444" strokeWidth={2} name="USD/XOF" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trading Volume Analysis */}
        <div className="card">
          <h3 className="text-lg font-semibold text-ash-900 mb-4">Trading Volume by Currency Pair</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tradingVolume} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" stroke="#64748b" />
              <YAxis dataKey="currency" type="category" stroke="#64748b" width={80} />
              <Tooltip
                formatter={(value: number) => [`$${(value / 1000).toFixed(0)}K`, 'Volume']}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="volume" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Market Sentiment */}
        <div className="card">
          <h3 className="text-lg font-semibold text-ash-900 mb-4">Market Sentiment Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={marketSentiment}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="percentage"
              >
                {marketSentiment.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`${value}%`, 'Sentiment']}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {marketSentiment.map((item) => (
              <div key={item.sentiment} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-ash-600">{item.sentiment}</span>
                </div>
                <span className="text-sm font-medium text-ash-900">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Volatility Analysis */}
      <div className="card">
        <h3 className="text-lg font-semibold text-ash-900 mb-4">Volatility & Risk Analysis</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ash-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-ash-500">Currency Pair</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-ash-500">Volatility</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-ash-500">Risk Level</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-ash-500">Trend</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-ash-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {volatilityData.map((item) => (
                <tr key={item.currency} className="border-b border-ash-100 hover:bg-ash-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                                         <div className="w-10 h-10 bg-gradient-to-br from-ash-600 to-ash-800 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                     {item.currency.split('/')[0]}
                   </div>
                      <div>
                        <p className="font-medium text-ash-900">{item.currency}</p>
                        <p className="text-sm text-ash-600">Exchange Pair</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-medium text-ash-900">{item.volatility}%</p>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      item.risk === 'Low' ? 'bg-success-100 text-success-800' :
                      item.risk === 'Medium' ? 'bg-warning-100 text-warning-800' :
                      'bg-danger-100 text-danger-800'
                    }`}>
                      {item.risk}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-1">
                      {item.volatility > 4 ? (
                        <TrendingUp className="w-4 h-4 text-danger-500" />
                      ) : item.volatility > 2 ? (
                        <TrendingUp className="w-4 h-4 text-warning-500" />
                      ) : (
                        <TrendingUp className="w-4 h-4 text-success-500" />
                      )}
                      <span className="text-sm text-ash-600">
                        {item.volatility > 4 ? 'High' : item.volatility > 2 ? 'Medium' : 'Low'}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                                       <button className="p-2 text-ash-600 hover:bg-ash-50 rounded-lg transition-colors">
                     <Zap className="w-4 h-4" />
                   </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Insights */}
      <div className="card">
        <h3 className="text-lg font-semibold text-ash-900 mb-4">Market Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-success-50 rounded-lg border border-success-200">
              <h4 className="font-medium text-success-900 mb-2">Strong Performance</h4>
              <p className="text-sm text-success-700">
                USD/NGN pair shows strong upward momentum with 12.5% volume increase this month.
              </p>
            </div>
            <div className="p-4 bg-warning-50 rounded-lg border border-warning-200">
              <h4 className="font-medium text-warning-900 mb-2">Volatility Alert</h4>
              <p className="text-sm text-warning-700">
                NGN/XOF pair experiencing increased volatility. Consider risk management strategies.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-ash-50 rounded-lg border border-ash-200">
              <h4 className="font-medium text-ash-900 mb-2">Market Opportunity</h4>
              <p className="text-sm text-ash-700">
                EUR/NGN showing potential reversal pattern. Monitor for entry opportunities.
              </p>
            </div>
            <div className="p-4 bg-info-50 rounded-lg border border-info-200">
              <h4 className="font-medium text-info-900 mb-2">Trend Analysis</h4>
              <p className="text-sm text-info-700">
                Overall market sentiment remains bullish with 65% positive outlook.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
