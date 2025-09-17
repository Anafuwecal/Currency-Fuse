import React, { useState, useEffect } from 'react';
import { ArrowRight, TrendingUp, TrendingDown, Clock, CheckCircle, AlertCircle, RefreshCw, Calculator, History } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock exchange rate data
interface ExchangeRate {
  rate: number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  lastUpdated: string;
}

const mockExchangeRates: Record<string, ExchangeRate> = {
  'USD/NGN': { rate: 1600.50, change: 2.5, trend: 'up', lastUpdated: '2 min ago' },
  'EUR/NGN': { rate: 1750.25, change: -1.2, trend: 'down', lastUpdated: '1 min ago' },
  'GBP/NGN': { rate: 2050.75, change: 3.1, trend: 'up', lastUpdated: '3 min ago' },
  'USD/XOF': { rate: 650.00, change: 0.8, trend: 'up', lastUpdated: '1 min ago' },
  'EUR/XOF': { rate: 710.50, change: -0.5, trend: 'down', lastUpdated: '2 min ago' },
  'GBP/XOF': { rate: 830.25, change: 1.2, trend: 'up', lastUpdated: '1 min ago' },
  'NGN/XOF': { rate: 0.406, change: 0.3, trend: 'up', lastUpdated: '2 min ago' },
};

const supportedCurrencies = [
  { code: 'USD', name: 'US Dollar', flag: '🇺🇸', type: 'Major' },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺', type: 'Major' },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧', type: 'Major' },
  { code: 'NGN', name: 'Nigerian Naira', flag: '🇳🇬', type: 'African' },
  { code: 'XOF', name: 'West African CFA', flag: '🇧🇯', type: 'African' },
  { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵', type: 'Major' },
  { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦', type: 'Major' },
  { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺', type: 'Major' },
];

const chartData = [
  { time: '00:00', USD: 1600, EUR: 1750, GBP: 2050 },
  { time: '04:00', USD: 1602, EUR: 1748, GBP: 2052 },
  { time: '08:00', USD: 1605, EUR: 1752, GBP: 2048 },
  { time: '12:00', USD: 1608, EUR: 1755, GBP: 2055 },
  { time: '16:00', USD: 1610, EUR: 1758, GBP: 2058 },
  { time: '20:00', USD: 1607, EUR: 1753, GBP: 2053 },
];

const recentTransactions = [
  { id: 1, from: 'USD', to: 'NGN', amount: 1000, rate: 1600.50, total: 1600500, status: 'completed', time: '2 min ago' },
  { id: 2, from: 'EUR', to: 'XOF', amount: 500, rate: 710.50, total: 355250, status: 'completed', time: '15 min ago' },
  { id: 3, from: 'GBP', to: 'NGN', amount: 200, rate: 2050.75, total: 410150, status: 'pending', time: '1 hour ago' },
  { id: 4, from: 'USD', to: 'XOF', amount: 750, rate: 650.00, total: 487500, status: 'completed', time: '2 hours ago' },
];

const Trading: React.FC = () => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('NGN');
  const [amount, setAmount] = useState('1000');
  const [exchangeRate, setExchangeRate] = useState(1600.50);
  const [convertedAmount, setConvertedAmount] = useState('1600500');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');

  useEffect(() => {
    const key = `${fromCurrency}/${toCurrency}`;
    const rate = mockExchangeRates[key]?.rate || 1;
    setExchangeRate(rate);
    const converted = (parseFloat(amount) * rate).toFixed(2);
    setConvertedAmount(converted);
  }, [fromCurrency, toCurrency, amount]);

  const handleCurrencySwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleExchange = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Exchange initiated:', {
        from: fromCurrency,
        to: toCurrency,
        amount: parseFloat(amount),
        rate: exchangeRate,
        total: convertedAmount
      });
      setIsLoading(false);
      // In a real app, you would redirect to confirmation or show success message
    }, 1000);
  };

  const getRateInfo = (from: string, to: string) => {
    const key = `${from}/${to}`;
    return mockExchangeRates[key] || { rate: 1, change: 0, trend: 'neutral', lastUpdated: 'N/A' };
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-success-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-warning-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-danger-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success-100 text-success-800';
      case 'pending':
        return 'bg-warning-100 text-warning-800';
      default:
        return 'bg-danger-100 text-danger-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-ash-900">Currency Exchange</h1>
          <p className="text-ash-600">Exchange currencies at real-time rates</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <RefreshCw className="w-4 h-4" />
          <span>Refresh Rates</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Exchange Form */}
        <div className="lg:col-span-1">
          <div className="card">
            <div className="flex items-center space-x-2 mb-4">
              <Calculator className="w-5 h-5 text-ash-600" />
              <h2 className="text-xl font-semibold text-ash-900">Exchange Currency</h2>
            </div>
            
            <div className="space-y-4">
              {/* From Currency */}
              <div>
                <label className="block text-sm font-medium text-ash-700 mb-2">From</label>
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="input-field"
                >
                  {supportedCurrencies.map(currency => (
                    <option key={currency.code} value={currency.code}>
                      {currency.flag} {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                            <button
              onClick={handleCurrencySwap}
              className="p-2 text-ash-600 hover:text-ash-700 hover:bg-ash-50 rounded-lg transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
              </div>

              {/* To Currency */}
              <div>
                <label className="block text-sm font-medium text-ash-700 mb-2">To</label>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="input-field"
                >
                  {supportedCurrencies.map(currency => (
                    <option key={currency.code} value={currency.code}>
                      {currency.flag} {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-ash-700 mb-2">Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="input-field"
                  placeholder="0.00"
                />
              </div>

              {/* Exchange Rate Display */}
              <div className="p-3 bg-ash-50 rounded-lg">
                <div className="text-center">
                  <p className="text-sm text-ash-600">Exchange Rate</p>
                  <p className="text-lg font-bold text-ash-700">
                    1 {fromCurrency} = {exchangeRate.toLocaleString()} {toCurrency}
                  </p>
                  <p className="text-xs text-ash-500">
                    Last updated: {getRateInfo(fromCurrency, toCurrency).lastUpdated}
                  </p>
                </div>
              </div>

              {/* Converted Amount */}
              <div className="p-3 bg-ash-50 rounded-lg">
                <div className="text-center">
                  <p className="text-sm text-ash-600">You'll Receive</p>
                  <p className="text-2xl font-bold text-ash-700">
                    {parseFloat(convertedAmount).toLocaleString()} {toCurrency}
                  </p>
                </div>
              </div>

              {/* Exchange Button */}
              <button
                onClick={handleExchange}
                disabled={isLoading || !amount || parseFloat(amount) <= 0}
                className="w-full btn-primary py-3 text-lg font-semibold"
              >
                {isLoading ? 'Processing...' : 'Exchange Now'}
              </button>
            </div>
          </div>
        </div>

        {/* Charts and Rates */}
        <div className="lg:col-span-2 space-y-6">
          {/* Exchange Rate Chart */}
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-ash-900">Exchange Rate Trends</h3>
              <div className="flex space-x-2">
                {['1h', '24h', '7d', '30d'].map((timeframe) => (
                  <button
                    key={timeframe}
                    onClick={() => setSelectedTimeframe(timeframe)}
                                         className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                       selectedTimeframe === timeframe
                         ? 'bg-ash-600 text-white'
                         : 'bg-ash-100 text-ash-700 hover:bg-ash-200'
                     }`}
                  >
                    {timeframe}
                  </button>
                ))}
              </div>
            </div>
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

          {/* Live Exchange Rates */}
          <div className="card">
            <h3 className="text-lg font-semibold text-ash-900 mb-4">Live Exchange Rates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(mockExchangeRates).slice(0, 6).map(([pair, data]) => (
                <div key={pair} className="flex items-center justify-between p-3 bg-ash-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                                       <div className="w-10 h-10 bg-gradient-to-br from-ash-600 to-ash-800 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                     {pair.split('/')[0]}
                   </div>
                    <div>
                      <p className="font-medium text-ash-900">{pair}</p>
                      <p className="text-sm text-ash-600">{data.lastUpdated}</p>
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
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
                     <h3 className="text-lg font-semibold text-ash-900 flex items-center">
             <History className="w-5 h-5 mr-2 text-ash-600" />
             Recent Transactions
           </h3>
                     <button className="text-ash-600 hover:text-ash-700 text-sm font-medium">
             View All
           </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ash-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-ash-500">From</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-ash-500">To</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-ash-500">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-ash-500">Rate</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-ash-500">Total</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-ash-500">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-ash-500">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-ash-100">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{supportedCurrencies.find(c => c.code === transaction.from)?.flag}</span>
                      <span className="font-medium text-ash-900">{transaction.from}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{supportedCurrencies.find(c => c.code === transaction.to)?.flag}</span>
                      <span className="font-medium text-ash-900">{transaction.to}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-ash-900">
                    {transaction.amount.toLocaleString()} {transaction.from}
                  </td>
                  <td className="py-3 px-4 text-sm text-ash-600">
                    {transaction.rate.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-ash-900">
                    {transaction.total.toLocaleString()} {transaction.to}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {getStatusIcon(transaction.status)}
                      <span className="ml-1">{transaction.status}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-ash-500">{transaction.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Trading;


