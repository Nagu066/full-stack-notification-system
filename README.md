# Fullstack React Native Developer 

## Overview
This repository contains the complete submission for the Fullstack React Native Developer technical assignment. The assignment demonstrates expertise in database design, system architecture, and React Native development.

## Project Structure

```
notification-assignment/
├── database/          # MongoDB schema design
├── architecture/      # System architecture design
├── mobile-app/        # React Native mobile application
├── admin-panel/       # React web admin panel
└── README.md                # This file
```

## Tasks Completed

### ✅ Task 1: Database Design
- MongoDB schema for multi-channel notification system
- Support for Push, Email, and In-App channels
- Independent delivery status tracking per channel
- Critical indexes with detailed reasoning
- **Location**: `database/`

### ✅ Task 2: System Architecture
- High-level architecture diagram (Mermaid)
- Non-blocking notification creation
- Real-time updates for web clients
- Push notification support for mobile
- Scalability and offline support considerations
- **Location**: `architecture/`

### ✅ Task 3: React Native Mobile App
- Complete Expo-based React Native application
- Notification list with color-coded type badges
- Search with 400ms debounce
- Infinite scroll pagination
- Detail modal view
- 85 mock notifications with 300ms network delay
- Optimized for performance with FlatList
- **Location**: `mobile-app/`
- **Run Instructions**: See `mobile-app/README.md`

### ✅ Task 4: React Admin Panel (Optional)
- React web application for notification management
- List view with table
- Resend functionality (mocked)
- Create notification form (mocked)
- **Location**: `admin-panel/`

## Quick Start

### Task 3: Mobile App
```bash
cd mobile-app
npm install
npm run android or npm run ios
```

### Task 4: Admin Panel
```bash
cd admin-panel
npm install
npm run dev
```

## Technical Decisions Summary

### Database (Task 1)
- **Embedded channels array**: Ensures atomic updates and better data locality
- **Status tracking**: Independent status per channel allows granular tracking
- **Indexes**: Optimized for user queries, status filtering, and analytics

### Architecture (Task 2)
- **Message Queue Pattern**: Decouples API from slow notification delivery
- **Worker Pattern**: Separate workers for each channel enable independent scaling
- **WebSocket**: Real-time updates for web clients
- **Horizontal Scaling**: All components designed to scale independently

### Mobile App (Task 3)
- **Expo**: Faster development and easier deployment
- **TypeScript**: Type safety and better developer experience
- **Infinite Scroll**: Better UX than "Load More" button
- **React Hooks**: Built-in state management sufficient for this scope

## Evaluation Criteria Coverage

✅ **System Design**: Logical reasoning in DB and Architecture choices
- Database schema addresses multi-channel requirements
- Architecture solves all specified constraints (non-blocking, real-time, push, scalability)

✅ **Functionality**: Search, pagination, and detail view work as expected
- Search with debounce implemented
- Infinite scroll pagination working
- Detail modal displays full notification information

✅ **Code Quality**: Clean and readable code
- TypeScript for type safety
- Component-based architecture
- Proper separation of concerns
- Well-documented code

## Notes

- All mock data is generated programmatically
- Network delays are simulated to mimic real API behavior
- The mobile app is ready to be connected to a real backend API
- Architecture is production-ready and can handle high volumes

## Contact

For questions or clarifications about this submission, please refer to the individual README files in each task directory.
