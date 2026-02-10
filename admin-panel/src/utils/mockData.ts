import { Notification, NotificationType } from '../types/Notification';

const notificationTypes: NotificationType[] = ['transactional', 'marketing', 'alert', 'system'];
const userIds = ['user_001', 'user_002', 'user_003', 'user_004', 'user_005'];
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
];

const channels = ['push', 'email', 'in-app'] as const;
const statuses = ['pending', 'sent', 'delivered', 'failed'] as const;

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomDate(): Date {
  const now = Date.now();
  const daysAgo = Math.floor(Math.random() * 30);
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
    const notificationChannels = channels.map(channel => ({
      channel,
      status: getRandomElement(statuses) as typeof statuses[number],
    }));
    
    notifications.push({
      id: `notif_${i + 1}`,
      userId: getRandomElement(userIds),
      type: getRandomElement(notificationTypes),
      title: getRandomElement(titles),
      body: getRandomElement(bodies),
      createdAt: getRandomDate(),
      isRead: Math.random() > 0.4,
      channels: notificationChannels,
    });
  }
  
  return notifications.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export function simulateDelay(ms: number = 300): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
