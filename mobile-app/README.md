# Task 3: React Native Mobile App

## Overview
A React Native mobile application built with Expo that displays a notification list with search, pagination, and detail view functionality.

## Features

### ✅ Core Features Implemented

1. **Notifications List Screen**
   - Type badges with color coding:
     - 🔵 Blue: Transactional
     - 🟢 Green: Marketing
     - 🔴 Red: Alert
     - 🟣 Purple: System
   - Title, Body (truncated to 100 chars), Relative Timestamp, Read Status
   - Visual indicator for unread notifications

2. **Search Functionality**
   - Search input with 400ms debounce
   - Filters notifications by title or body content
   - Real-time filtering as you type

3. **Detail View**
   - Modal popup showing full notification details
   - Displays type, title, body, timestamp, and read status
   - Smooth fade animation

4. **Pagination**
   - Infinite scroll implementation
   - Automatically loads more notifications when scrolling near bottom
   - Loading indicator while fetching more data
   - 20 notifications per page

5. **Mock Data**
   - 85 mock notifications generated with varied content
   - Simulated 300ms network delay
   - Mix of read/unread notifications
   - Random timestamps within last 30 days

6. **Performance Optimizations**
   - FlatList for efficient rendering
   - `removeClippedSubviews` enabled
   - Optimized `maxToRenderPerBatch` and `windowSize`
   - Memoized callbacks to prevent unnecessary re-renders

7. **Pull to Refresh**
   - Swipe down to refresh notification list
   - Resets to first page

## Technical Decisions

### Framework: Expo
- **Choice**: Expo (Recommended in assignment)
- **Reason**: Faster development, easier setup, built-in tooling, and cross-platform support

### Language: TypeScript
- **Choice**: TypeScript
- **Reason**: Type safety, better IDE support, easier refactoring, and catches errors at compile time

### Navigation: React Navigation
- **Choice**: @react-navigation/native with native-stack
- **Reason**: Industry standard, excellent performance, native feel, and well-maintained

### Pagination: Infinite Scroll
- **Choice**: Infinite scroll over "Load More" button
- **Reason**: 
  - Better UX - no need to tap button
  - More native mobile feel
  - Seamless browsing experience
  - Standard pattern in modern mobile apps

### State Management
- **Choice**: React hooks (useState, useEffect, useCallback)
- **Reason**: 
  - Built-in React solution
  - No additional dependencies
  - Sufficient for this app's complexity
  - Easy to understand and maintain

### Mock Data Strategy
- **Choice**: In-memory storage with simulated network delay
- **Reason**: 
  - No backend required for demo
  - Realistic user experience
  - Easy to test and demonstrate
  - Can be easily replaced with real API

## Project Structure

```
mobile-app/
├── App.tsx                 # Root component with navigation
├── src/
│   ├── screens/
│   │   └── NotificationsListScreen.tsx  # Main list screen
│   ├── components/
│   │   ├── NotificationItem.tsx        # List item component
│   │   ├── NotificationDetailModal.tsx # Detail modal
│   │   └── SearchBar.tsx               # Search input component
│   ├── services/
│   │   └── notificationService.ts      # API service (mock)
│   ├── utils/
│   │   ├── mockData.ts                # Mock data generator
│   │   └── formatTime.ts              # Relative time formatter
│   └── types/
│       └── Notification.ts            # TypeScript types
├── package.json
├── tsconfig.json
├── app.json
└── README.md
```

## How to Run Locally

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (will be installed automatically)
- Expo Go app on your phone (for testing) OR iOS Simulator / Android Emulator

### Installation Steps

1. **Navigate to the project directory:**
   ```bash
   cd mobile-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Start the Expo development server:**
   ```bash
   npm run android
   or
   npm run ios
   ```

4. **Run on your device:**
   - **iOS**: Press `i` in the terminal or scan QR code with Camera app (iOS 11+)
   - **Android**: Press `a` in the terminal or scan QR code with Expo Go app
   - **Web**: Press `w` in the terminal (for testing, but mobile is recommended)

### Alternative: Using Expo Go App

1. Install Expo Go from App Store (iOS) or Play Store (Android)
2. Run `npm start` or `yarn start`
3. Scan the QR code displayed in terminal with:
   - **iOS**: Camera app
   - **Android**: Expo Go app

### Troubleshooting

- **Port already in use**: Change port with `expo start --port 8082`
- **Metro bundler issues**: Clear cache with `expo start -c`
- **Node modules issues**: Delete `node_modules` and run `npm install` again
- **TypeScript errors**: Ensure you have TypeScript installed globally or locally

## Testing the App

1. **Search**: Type in the search bar to filter notifications
2. **Scroll**: Scroll down to trigger infinite scroll and load more notifications
3. **Tap Notification**: Tap any notification to see detail modal
4. **Pull to Refresh**: Swipe down from top to refresh the list
5. **Read Status**: Notice unread notifications have a blue dot and bold title

## Future Enhancements (Not Required)

- Real backend API integration
- Push notification support
- Offline caching with AsyncStorage
- Notification filtering by type
- Mark all as read functionality
- Notification deletion
- Dark mode support
