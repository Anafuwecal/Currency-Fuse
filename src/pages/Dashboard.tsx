import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Euro, Pound, ArrowRight, RefreshCw, Calculator } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock exchange rate data - in a real app, this would come from an API
const mockExchangeRates = {
  'USD/NGN': { rate: 1600.50, change: 2.5, trend: 'up' },
  'EUR/NGN': { rate: 1750.25, change: -1.2, trend: 'down' },
  'GBP/NGN': { rate: 2050.75, change: 3.1, trend: 'up' },
  'USD/XOF': { rate: 650.00, change: 0.8, trend: 'up' },
  'EUR/XOF': { rate: 710.50, change: -0.5, trend: 'down' },
  'GBP/XOF': { rate: 830.25, change: 1.2, trend: 'up' },
};

const popularCurrencies = [
  { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
  { code: 'NGN', name: 'Nigerian Naira', flag: '🇳🇬' },
  { code: 'XOF', name: 'West African CFA', flag: '🇧🇯' },
  { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
];

const chartData = [
  { time: '00:00', USD: 1600, EUR: 1750, GBP: 2050 },
  { time: '04:00', USD: 1602, EUR: 1748, GBP: 2052 },
  { time: '08:00', USD: 1605, EUR: 1752, GBP: 2048 },
  { time: '12:00', USD: 1608, EUR: 1755, GBP: 2055 },
  { time: '16:00', USD: 1610, EUR: 1758, GBP: 2058 },
  { time: '20:00', USD: 1607, EUR: 1753, GBP: 2053 },
];

const Dashboard: React.FC = () => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('NGN');
  const [amount, setAmount] = useState('100');
  const [convertedAmount, setConvertedAmount] = useState('160050');
  const [isLoading, setIsLoading] = useState(false);

  const handleCurrencySwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleConvert = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const rate = mockExchangeRates[`${fromCurrency}/${toCurrency}`]?.rate || 1;
      const converted = (parseFloat(amount) * rate).toFixed(2);
      setConvertedAmount(converted);
      setIsLoading(false);
    }, 500);
  };

  const getRateInfo = (from: string, to: string) => {
    const key = `${from}/${to}`;
    return mockExchangeRates[key] || { rate: 1, change: 0, trend: 'neutral' };
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-ash-900">Currency Exchange Dashboard</h1>
          <p className="text-ash-600">Real-time exchange rates and quick currency conversion</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <RefreshCw className="w-4 h-4" />
          <span>Refresh Rates</span>
        </button>
      </div>

      {/* Quick Converter */}
      <div className="card">
                  <div className="flex items-center space-x-2 mb-4">
            <Calculator className="w-5 h-5 text-ash-600" />
            <h2 className="text-xl font-semibold text-ash-900">Quick Currency Converter</h2>
          </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-ash-700 mb-2">From</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="input-field"
            >
              {popularCurrencies.map(currency => (
                <option key={currency.code} value={currency.code}>
                  {currency.flag} {currency.code} - {currency.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleCurrencySwap}
              className="p-2 text-ash-600 hover:text-ash-700 hover:bg-ash-50 rounded-lg transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-ash-700 mb-2">To</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="input-field"
            >
              {popularCurrencies.map(currency => (
                <option key={currency.code} value={currency.code}>
                  {currency.flag} {currency.code} - {currency.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-ash-700 mb-2">Amount</label>
            <div className="flex space-x-2">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="input-field"
                placeholder="0.00"
              />
              <button
                onClick={handleConvert}
                disabled={isLoading}
                className="btn-primary px-6"
              >
                {isLoading ? 'Converting...' : 'Convert'}
              </button>
            </div>
          </div>
        </div>
        {convertedAmount && (
          <div className="mt-4 p-4 bg-ash-50 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-ash-600">Converted Amount</p>
              <p className="text-2xl font-bold text-ash-700">
                {convertedAmount} {toCurrency}
              </p>
              <p className="text-sm text-ash-500">
                Rate: 1 {fromCurrency} = {getRateInfo(fromCurrency, toCurrency).rate} {toCurrency}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Exchange Rate Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Currency Pairs */}
        <div className="card">
          <h3 className="text-lg font-semibold text-ash-900 mb-4">Popular Currency Pairs</h3>
          <div className="space-y-3">
            {Object.entries(mockExchangeRates).map(([pair, data]) => (
              <div key={pair} className="flex items-center justify-between p-3 bg-ash-50 rounded-lg">
                                 <div className="flex items-center space-x-3">
                   <div className="w-10 h-10 bg-gradient-to-br from-ash-600 to-ash-800 rounded-lg flex items-center justify-center text-white font-bold">
                     {pair.split('/')[0]}
                   </div>
                  <div>
                    <p className="font-medium text-ash-900">{pair}</p>
                    <p className="text-sm text-ash-600">Exchange Rate</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-ash-900">{data.rate.toLocaleString()}</p>
                  <div className={`flex items-center text-sm ${
                    data.trend === 'up' ? 'text-success-600' : 'text-danger-600'
                  }`}>
                    {data.trend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                    {data.change}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Exchange Rate Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-ash-900 mb-4">Exchange Rate Trends (24h)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="time" stroke="#64748b" />
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
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-ash-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center space-x-3 p-4 bg-ash-50 hover:bg-ash-100 rounded-lg transition-colors">
            <DollarSign className="w-6 h-6 text-ash-600" />
            <span className="font-medium text-ash-700">Start Exchange</span>
          </button>
          <button className="flex items-center justify-center space-x-3 p-4 bg-success-50 hover:bg-success-100 rounded-lg transition-colors">
            <TrendingUp className="w-6 h-6 text-success-600" />
            <span className="font-medium text-success-700">View Rates</span>
          </button>
          <button className="flex items-center justify-center space-x-3 p-4 bg-warning-50 hover:bg-warning-100 rounded-lg transition-colors">
            <Euro className="w-6 h-6 text-warning-600" />
            <span className="font-medium text-warning-700">Multi-Currency</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


