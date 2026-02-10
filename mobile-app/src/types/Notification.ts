export type NotificationType = 'transactional' | 'marketing' | 'alert' | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  timestamp: Date;
  isRead: boolean;
}

export interface NotificationResponse {
  notifications: Notification[];
  hasMore: boolean;
  nextPage?: number;
}
