import { Notification, NotificationResponse } from '../types/Notification';
import { generateMockNotifications, simulateNetworkDelay } from '../utils/mockData';

// In-memory storage to simulate server state
let allNotifications: Notification[] = [];
let isInitialized = false;

// Initialize with mock data
function initializeNotifications() {
  if (!isInitialized) {
    allNotifications = generateMockNotifications(85); // Generate 85 notifications
    isInitialized = true;
  }
}

const PAGE_SIZE = 20;

export async function fetchNotifications(
  page: number = 1,
  searchQuery?: string
): Promise<NotificationResponse> {
  await simulateNetworkDelay(300);
  
  initializeNotifications();
  
  let filteredNotifications = [...allNotifications];
  
  // Apply search filter if query exists
  if (searchQuery && searchQuery.trim()) {
    const query = searchQuery.toLowerCase().trim();
    filteredNotifications = filteredNotifications.filter(
      (notif) =>
        notif.title.toLowerCase().includes(query) ||
        notif.body.toLowerCase().includes(query)
    );
  }
  
  // Calculate pagination
  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedNotifications = filteredNotifications.slice(startIndex, endIndex);
  
  const hasMore = endIndex < filteredNotifications.length;
  
  return {
    notifications: paginatedNotifications,
    hasMore,
    nextPage: hasMore ? page + 1 : undefined,
  };
}

export async function markAsRead(notificationId: string): Promise<void> {
  await simulateNetworkDelay(100);
  
  const notification = allNotifications.find((n) => n.id === notificationId);
  if (notification) {
    notification.isRead = true;
  }
}
