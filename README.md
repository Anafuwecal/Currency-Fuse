# CurrencyFuse - Cross-Border Currency Exchange Platform

A modern, feature-rich React-based currency exchange application that enables real-time currency conversion and cross-border transactions between multiple currencies including Nigerian Naira (NGN), West African CFA (XOF), US Dollar (USD), Euro (EUR), British Pound (GBP), and more.

## 🌟 Features

### Core Functionality
- **Real-time Currency Exchange**: Convert between multiple currencies with live exchange rates
- **Multi-Currency Support**: Support for major world currencies and African currencies
- **Quick Conversion Tool**: Instant currency conversion calculator on the dashboard
- **Exchange Rate Tracking**: Monitor exchange rate trends and historical data
- **Transaction History**: Complete record of all currency exchanges

### Supported Currencies
- 🇺🇸 **USD** - US Dollar
- 🇪🇺 **EUR** - Euro
- 🇬🇧 **GBP** - British Pound
- 🇳🇬 **NGN** - Nigerian Naira
- 🇧🇯 **XOF** - West African CFA (Cotonou)
- 🇯🇵 **JPY** - Japanese Yen
- 🇨🇦 **CAD** - Canadian Dollar
- 🇦🇺 **AUD** - Australian Dollar

### Key Pages
- **Dashboard**: Overview with quick converter, live rates, and popular currency pairs
- **Currency Holdings**: Portfolio management for multiple currencies
- **Exchange**: Main currency exchange interface with real-time rates
- **Analytics**: Advanced market analysis and exchange rate trends
- **Profile**: User account management
- **Settings**: Application preferences and configuration

## 🚀 Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom color scheme
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **State Management**: React Context API

## 🎨 Design System

The application uses a sophisticated color palette:
- **Navy Blue**: Primary brand color for headers and accents
- **Dark Ash**: Secondary color for text and borders
- **White**: Clean backgrounds and contrast
- **Success/Warning/Danger**: Status indicators and alerts

## 📱 Responsive Design

- Mobile-first approach
- Responsive grid layouts
- Touch-friendly interface
- Optimized for all screen sizes

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CurrencyFuse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Build for Production
```bash
npm run build
npm run preview
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=your_api_endpoint
VITE_EXCHANGE_RATE_API_KEY=your_api_key
```

### Tailwind Configuration
The application uses a custom Tailwind configuration with:
- Extended color palette
- Custom animations and keyframes
- Responsive breakpoints
- Custom component classes

## 📊 Data Sources

Currently, the application uses mock data for demonstration purposes. In production, you would integrate with:

- **Exchange Rate APIs**: Fixer.io, ExchangeRate-API, or similar
- **Real-time Data**: WebSocket connections for live rate updates
- **Transaction APIs**: Payment gateways and banking APIs

## 🔐 Authentication

The application includes a complete authentication system:
- User registration and login
- Protected routes
- Session management
- User profile management

## 📈 Features in Detail

### Dashboard
- Quick currency converter
- Live exchange rate display
- Popular currency pairs
- Exchange rate trends chart
- Quick action buttons

### Exchange Interface
- Currency pair selection
- Real-time rate calculation
- Amount input and conversion
- Transaction processing
- Exchange rate history

### Portfolio Management
- Multi-currency holdings
- Value tracking in USD
- Performance analytics
- Allocation visualization
- Add/remove currencies

### Analytics
- Exchange rate trends
- Trading volume analysis
- Market sentiment
- Volatility metrics
- Risk assessment

## 🚧 Development Roadmap

### Phase 1 (Current)
- ✅ Basic currency exchange functionality
- ✅ User authentication
- ✅ Portfolio management
- ✅ Basic analytics

### Phase 2 (Planned)
- 🔄 Real-time API integration
- 🔄 Advanced charting tools
- 🔄 Mobile app development
- 🔄 Payment gateway integration

### Phase 3 (Future)
- 📋 Multi-language support
- 📋 Advanced trading features
- 📋 Institutional features
- 📋 API for third-party integrations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Recharts for the charting library
- Lucide for the beautiful icons

---

**CurrencyFuse** - Making cross-border currency exchange simple, secure, and efficient.


