import { Notification, NotificationType } from '../types/Notification';

const notificationTypes: NotificationType[] = ['transactional', 'marketing', 'alert', 'system'];
const titles = [
  'Payment Received',
  'Order Shipped',
  'New Feature Available',
  'Security Alert',
  'Welcome Bonus',
  'Account Verification',
  'Special Offer',
  'System Maintenance',
  'Password Changed',
  'Subscription Renewed',
  'New Message',
  'Friend Request',
  'Event Reminder',
  'Low Balance Alert',
  'Profile Updated',
  'Document Approved',
  'Review Request',
  'Promotion Started',
  'Backup Complete',
  'Login Detected',
];

const bodies = [
  'Your payment of $100 has been successfully processed.',
  'Your order #12345 has been shipped and will arrive soon.',
  'Check out our new feature that makes your life easier!',
  'We detected a login from a new device. If this was you, no action is needed.',
  'Congratulations! You have received a welcome bonus of $50.',
  'Please verify your email address to continue using our services.',
  'Get 50% off on all premium features this weekend only!',
  'We will be performing scheduled maintenance on Sunday at 2 AM.',
  'Your password has been successfully changed.',
  'Your subscription has been renewed for another month.',
  'You have received a new message from John Doe.',
  'Sarah Smith sent you a friend request.',
  'Don\'t forget: Your meeting starts in 30 minutes.',
  'Your account balance is below $10. Please top up soon.',
  'Your profile information has been updated successfully.',
  'Your submitted document has been approved.',
  'How was your experience? Please leave us a review.',
  'New promotion started! Check out our latest deals.',
  'Your data backup has been completed successfully.',
  'A new login was detected from San Francisco, CA.',
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomDate(): Date {
  const now = Date.now();
  const daysAgo = Math.floor(Math.random() * 30); // Random date within last 30 days
  const hoursAgo = Math.floor(Math.random() * 24);
  const minutesAgo = Math.floor(Math.random() * 60);
  const millisecondsAgo = (daysAgo * 24 * 60 * 60 * 1000) + 
                          (hoursAgo * 60 * 60 * 1000) + 
                          (minutesAgo * 60 * 1000);
  return new Date(now - millisecondsAgo);
}

export function generateMockNotifications(count: number): Notification[] {
  const notifications: Notification[] = [];
  
  for (let i = 0; i < count; i++) {
    notifications.push({
      id: `notif_${i + 1}`,
      type: getRandomElement(notificationTypes),
      title: getRandomElement(titles),
      body: getRandomElement(bodies),
      timestamp: getRandomDate(),
      isRead: Math.random() > 0.4, // 60% read, 40% unread
    });
  }
  
  // Sort by timestamp (newest first)
  return notifications.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

export function simulateNetworkDelay(ms: number = 300): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
