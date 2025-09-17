import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Euro, Pound, ArrowUpRight, ArrowDownRight, RefreshCw, Plus, Minus } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

// Mock currency holdings data
const currencyHoldings = [
  {
    currency: 'USD',
    name: 'US Dollar',
    flag: '🇺🇸',
    amount: 5000,
    valueInUSD: 5000,
    change24h: 0,
    changePercent: 0,
    color: '#3b82f6'
  },
  {
    currency: 'EUR',
    name: 'Euro',
    flag: '🇪🇺',
    amount: 3500,
    valueInUSD: 3850,
    change24h: 50,
    changePercent: 1.32,
    color: '#10b981'
  },
  {
    currency: 'GBP',
    name: 'British Pound',
    flag: '🇬🇧',
    amount: 2500,
    valueInUSD: 3125,
    change24h: -25,
    changePercent: -0.79,
    color: '#f59e0b'
  },
  {
    currency: 'NGN',
    name: 'Nigerian Naira',
    flag: '🇳🇬',
    amount: 8000000,
    valueInUSD: 5000,
    change24h: 125,
    changePercent: 2.56,
    color: '#8b5cf6'
  },
  {
    currency: 'XOF',
    name: 'West African CFA',
    flag: '🇧🇯',
    amount: 3250000,
    valueInUSD: 5000,
    change24h: -50,
    changePercent: -0.99,
    color: '#ef4444'
  },
  {
    currency: 'JPY',
    name: 'Japanese Yen',
    flag: '🇯🇵',
    amount: 750000,
    valueInUSD: 5000,
    change24h: 75,
    changePercent: 1.52,
    color: '#06b6d4'
  }
];

const portfolioHistory = [
  { date: 'Jan', value: 25000 },
  { date: 'Feb', value: 26500 },
  { date: 'Mar', value: 27800 },
  { date: 'Apr', value: 29200 },
  { date: 'May', value: 30100 },
  { date: 'Jun', value: 31500 },
];

const exchangeRateHistory = [
  { date: '00:00', USD: 1.00, EUR: 1.10, GBP: 1.25, NGN: 1600, XOF: 650 },
  { date: '04:00', USD: 1.00, EUR: 1.11, GBP: 1.26, NGN: 1602, XOF: 651 },
  { date: '08:00', USD: 1.00, EUR: 1.09, GBP: 1.24, NGN: 1605, XOF: 649 },
  { date: '12:00', USD: 1.00, EUR: 1.12, GBP: 1.27, NGN: 1608, XOF: 652 },
  { date: '16:00', USD: 1.00, EUR: 1.13, GBP: 1.28, NGN: 1610, XOF: 653 },
  { date: '20:00', USD: 1.00, EUR: 1.11, GBP: 1.26, NGN: 1607, XOF: 650 },
];

const Portfolio: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState('1M');

  const totalValue = currencyHoldings.reduce((sum, holding) => sum + holding.valueInUSD, 0);
  const totalChange24h = currencyHoldings.reduce((sum, holding) => sum + holding.change24h, 0);
  const totalChangePercent = (totalChange24h / totalValue) * 100;

  const pieChartData = currencyHoldings.map(holding => ({
    name: holding.currency,
    value: holding.valueInUSD,
    color: holding.color
  }));

  const handleAddCurrency = () => {
    console.log('Add currency functionality');
  };

  const handleExchangeCurrency = () => {
    console.log('Exchange currency functionality');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-ash-900">Currency Portfolio</h1>
          <p className="text-ash-600">Manage your multi-currency holdings and track performance</p>
        </div>
        <div className="flex space-x-3">
          <button onClick={handleAddCurrency} className="btn-secondary flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Currency</span>
          </button>
          <button onClick={handleExchangeCurrency} className="btn-primary flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Exchange</span>
          </button>
        </div>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-ash-600">Total Portfolio Value</p>
              <p className="text-2xl font-bold text-ash-900">${totalValue.toLocaleString()}</p>
            </div>
                    <div className="p-3 bg-ash-100 rounded-lg">
          <DollarSign className="w-6 h-6 text-ash-600" />
        </div>
          </div>
          <div className="flex items-center space-x-1 mt-2">
            {totalChange24h >= 0 ? (
              <ArrowUpRight className="w-4 h-4 text-success-500" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-danger-500" />
            )}
            <span className={`text-sm font-medium ${
              totalChange24h >= 0 ? 'text-success-600' : 'text-danger-600'
            }`}>
              {totalChange24h >= 0 ? '+' : ''}${totalChange24h.toLocaleString()}
            </span>
            <span className={`text-sm ${
              totalChange24h >= 0 ? 'text-success-600' : 'text-danger-600'
            }`}>
              ({totalChangePercent >= 0 ? '+' : ''}{totalChangePercent.toFixed(2)}%)
            </span>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-ash-600">Currencies Held</p>
              <p className="text-2xl font-bold text-ash-900">{currencyHoldings.length}</p>
            </div>
            <div className="p-3 bg-success-100 rounded-lg">
              <Euro className="w-6 h-6 text-success-600" />
            </div>
          </div>
          <p className="text-sm text-ash-600 mt-2">Multi-currency diversification</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-ash-600">Best Performer</p>
              <p className="text-2xl font-bold text-ash-900">NGN</p>
            </div>
            <div className="p-3 bg-warning-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-warning-600" />
            </div>
          </div>
          <p className="text-sm text-success-600 mt-2">+2.56% (24h)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Portfolio Distribution */}
        <div className="card">
          <h3 className="text-lg font-semibold text-ash-900 mb-4">Portfolio Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                onClick={(entry) => setSelectedCurrency(entry.name)}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {currencyHoldings.slice(0, 4).map((holding) => (
              <div key={holding.currency} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: holding.color }}></div>
                <span className="text-sm text-ash-600">{holding.currency}</span>
                <span className="text-sm font-medium text-ash-900">
                  {((holding.valueInUSD / totalValue) * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio Performance */}
        <div className="card">
          <h3 className="text-lg font-semibold text-ash-900 mb-4">Portfolio Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={portfolioHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Portfolio Value']}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
              />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Currency Holdings Table */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-ash-900">Currency Holdings</h3>
          <div className="flex space-x-2">
            {['1D', '1W', '1M', '3M'].map((period) => (
              <button
                key={period}
                onClick={() => setTimeframe(period)}
                                 className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                   timeframe === period
                     ? 'bg-ash-600 text-white'
                     : 'bg-ash-100 text-ash-700 hover:bg-ash-200'
                 }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ash-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-ash-500">Currency</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-ash-500">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-ash-500">Value (USD)</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-ash-500">24h Change</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-ash-500">Allocation</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-ash-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currencyHoldings.map((holding) => (
                <tr key={holding.currency} className="border-b border-ash-100 hover:bg-ash-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{holding.flag}</span>
                      <div>
                        <p className="font-medium text-ash-900">{holding.currency}</p>
                        <p className="text-sm text-ash-600">{holding.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-medium text-ash-900">
                      {holding.amount.toLocaleString()} {holding.currency}
                    </p>
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-medium text-ash-900">
                      ${holding.valueInUSD.toLocaleString()}
                    </p>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-1">
                      {holding.change24h >= 0 ? (
                        <ArrowUpRight className="w-4 h-4 text-success-500" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-danger-500" />
                      )}
                      <span className={`text-sm font-medium ${
                        holding.change24h >= 0 ? 'text-success-600' : 'text-danger-600'
                      }`}>
                        {holding.change24h >= 0 ? '+' : ''}${holding.change24h.toLocaleString()}
                      </span>
                      <span className={`text-sm ${
                        holding.change24h >= 0 ? 'text-success-600' : 'text-danger-600'
                      }`}>
                        ({holding.changePercent >= 0 ? '+' : ''}{holding.changePercent.toFixed(2)}%)
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-sm text-ash-600">
                      {((holding.valueInUSD / totalValue) * 100).toFixed(1)}%
                    </p>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="p-1 text-success-600 hover:bg-success-50 rounded">
                        <Plus className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-danger-600 hover:bg-danger-50 rounded">
                        <Minus className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Exchange Rate Trends */}
      <div className="card">
        <h3 className="text-lg font-semibold text-ash-900 mb-4">Exchange Rate Trends (24h)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={exchangeRateHistory}>
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
            <Line type="monotone" dataKey="USD" stroke="#3b82f6" strokeWidth={2} />
            <Line type="monotone" dataKey="EUR" stroke="#10b981" strokeWidth={2} />
            <Line type="monotone" dataKey="GBP" stroke="#f59e0b" strokeWidth={2} />
            <Line type="monotone" dataKey="NGN" stroke="#8b5cf6" strokeWidth={2} />
            <Line type="monotone" dataKey="XOF" stroke="#ef4444" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Portfolio;


