# Task 4: React Admin Panel (Optional)

## Overview
A React web application built with Next.js for managing notifications. This admin panel allows administrators to view, create, and resend notifications.

## Features

### ✅ Implemented Features

1. **List View**
   - Table view displaying all notifications
   - Shows ID, User ID, Type, Title, Created At, Channels, Status, and Actions
   - Color-coded type badges (Blue, Green, Red, Purple)
   - Channel status indicators for each notification
   - Read/Unread status display

2. **Resend Functionality**
   - "Resend" button for each notification
   - Mocked resend that updates failed channel statuses to pending
   - Visual feedback with alert notification

3. **Create Notification Form**
   - Form to create new notifications
   - Fields: User ID, Type, Title, Body, Channels
   - Channel selection (Push, Email, In-App)
   - Form validation
   - Adds new notification to the list

4. **Mock Data**
   - 50 mock notifications generated
   - Simulated 300ms network delay
   - Realistic notification data with varied types and statuses

## Technical Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Architecture**: Component-based with client-side state management

## Project Structure

```
admin-panel/
├── src/
│   ├── app/
│   │   ├── page.tsx           # Main page component
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── NotificationTable.tsx      # Table component
│   │   └── CreateNotificationForm.tsx # Create form component
│   ├── types/
│   │   └── Notification.ts    # TypeScript types
│   └── utils/
│       └── mockData.ts        # Mock data generator
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## How to Run Locally

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation Steps

1. **Navigate to the project directory:**
   ```bash
   cd admin-panel
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```

4. **Open your browser:**
   - Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Usage

### Viewing Notifications
- All notifications are displayed in a table format
- Scroll through the list to see all notifications
- Each row shows complete notification details

### Creating a Notification
1. Click the "+ Create Notification" button
2. Fill in the form:
   - User ID (required)
   - Type: Select from dropdown (Transactional, Marketing, Alert, System)
   - Title (required)
   - Body (required)
   - Channels: Select one or more channels (Push, Email, In-App)
3. Click "Create Notification"
4. The new notification will appear at the top of the list

### Resending a Notification
1. Find the notification in the table
2. Click the "Resend" button
3. If any channels have "failed" status, they will be reset to "pending"
4. A confirmation alert will appear

## Technical Decisions

### Next.js App Router
- **Choice**: Next.js 14 with App Router
- **Reason**: Modern React framework, server-side rendering, easy deployment, excellent developer experience

### Tailwind CSS
- **Choice**: Tailwind CSS for styling
- **Reason**: Utility-first CSS, rapid development, consistent design, responsive by default

### Client-Side State Management
- **Choice**: React hooks (useState, useEffect)
- **Reason**: Simple state management sufficient for admin panel, no need for complex state library

### Mock Data
- **Choice**: In-memory mock data with simulated delays
- **Reason**: No backend required for demo, realistic user experience, easy to replace with real API

## Future Enhancements (Not Required)

- Real backend API integration
- Authentication and authorization
- Pagination for large notification lists
- Filtering and sorting options
- Bulk operations (mark as read, delete multiple)
- Export functionality (CSV, JSON)
- Real-time updates via WebSocket
- Analytics dashboard
- Notification templates
- Scheduled notifications

## Notes

- All functionality is mocked for demonstration purposes
- The resend functionality simulates updating failed channels
- Create form adds notifications to the in-memory list
- In a production environment, these would connect to a real backend API
