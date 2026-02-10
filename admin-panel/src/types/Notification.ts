export type NotificationType = 'transactional' | 'marketing' | 'alert' | 'system';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  createdAt: Date;
  isRead: boolean;
  channels: {
    channel: 'push' | 'email' | 'in-app';
    status: 'pending' | 'sent' | 'delivered' | 'failed';
  }[];
}
