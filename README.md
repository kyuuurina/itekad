# iTEKAD Journey - Mobile Banking App

A comprehensive mobile-first web application that guides users through the iTEKAD microcredit journey, from initial application to graduation.

## Features

### 🎯 Complete Journey Flow
- **Step 1: Identity & Basics** - e-KYC verification simulation
- **Step 2: Documents Upload** - OCR-enabled document verification
- **Step 3: Auto Vetting** - Real-time credit risk assessment
- **Step 4: Interview Prep** - AI chatbot and checklist
- **Step 5: Onboarding & e-Invoicing** - Business cashflow tracking
- **Step 6: Financial Profile** - Comprehensive risk assessment report
- **Step 7: Scam Checker** - Fraud protection system
- **Step 8: Graduation** - Performance evaluation for program completion

### 📱 Mobile-First Design
- Responsive design optimized for mobile devices
- Touch-friendly interfaces with proper spacing
- Horizontal scrolling navigation for steps
- Fixed bottom navigation for easy access
- Mobile-optimized form inputs and interactions

### 🔧 Technical Features
- Built with React 19 and TypeScript
- Styled with Tailwind CSS for rapid development
- Real-time state management across all steps
- Progressive web app capabilities
- Automated risk scoring algorithm
- Pattern-based scam detection

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

### Type Checking

```bash
npm run lint
```

## Project Structure

```
src/
├── App.tsx                 # Main application component
├── main.tsx               # React entry point
├── index.css              # Global styles and Tailwind imports
└── components/
    └── FinancialProfile.tsx # Risk assessment component
```

## Mobile Optimization

The app is specifically designed for mobile devices with:

- **Viewport Configuration**: Prevents zooming and ensures proper scaling
- **Touch Interactions**: Large touch targets and smooth animations
- **Scrolling**: Custom scrollbars and horizontal navigation
- **Navigation**: Fixed bottom navigation for easy thumb access
- **Forms**: Mobile-optimized inputs with proper keyboard types

## Key Components

### ItekadMobileApp (Main)
The primary component managing the entire user journey with step-by-step navigation.

### FinancialProfile
Generates a comprehensive risk assessment report based on user data across all steps.

### ChatbotMobile
Simple pattern-matching chatbot for interview preparation assistance.

### Mobile UI Components
- `MobileHeader`: Sticky header with progress tracking
- `MobileCard`: Consistent card layout for content
- `KPIMobile`: Key performance indicators display
- `EntriesListMobile`: Transaction history management

## Development Notes

### State Management
- Uses React hooks for local state management
- Real-time calculations using `useMemo` for performance
- Persistent state across navigation

### Styling Approach
- Tailwind CSS for utility-first styling
- Custom scrollbar hiding utilities
- Responsive grid layouts
- Color-coded status indicators

### Risk Assessment Algorithm
The app includes a sophisticated risk scoring system that evaluates:
- Identity verification status
- Document completeness
- Credit history (CCRIS/CTOS)
- Business tenure and age
- Financial performance metrics
- Bankruptcy/insolvency records

## Browser Support

Optimized for modern mobile browsers:
- iOS Safari
- Chrome Mobile
- Samsung Internet
- Edge Mobile

## License

Private project for iTEKAD microcredit system.
