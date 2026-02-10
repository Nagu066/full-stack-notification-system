import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Notification, NotificationType } from '../types/Notification';
import { formatRelativeTime } from '../utils/formatTime';

interface NotificationItemProps {
  notification: Notification;
  onPress: () => void;
}

const getTypeColor = (type: NotificationType): string => {
  switch (type) {
    case 'transactional':
      return '#007AFF'; // Blue
    case 'marketing':
      return '#34C759'; // Green
    case 'alert':
      return '#FF3B30'; // Red
    case 'system':
      return '#AF52DE'; // Purple
    default:
      return '#8E8E93'; // Gray
  }
};

const truncateText = (text: string, maxLength: number = 100): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export default function NotificationItem({ notification, onPress }: NotificationItemProps) {
  const typeColor = getTypeColor(notification.type);
  
  return (
    <TouchableOpacity
      style={[styles.container, !notification.isRead && styles.unreadContainer]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={[styles.typeBadge, { backgroundColor: typeColor }]}>
            <Text style={styles.typeText}>{notification.type.toUpperCase()}{" "}</Text>
          </View>
          <Text style={styles.timestamp}>{formatRelativeTime(notification.timestamp)}</Text>
        </View>
        
        <Text style={[styles.title, !notification.isRead && styles.unreadTitle]}>
          {notification.title}
        </Text>
        
        <Text style={styles.body} numberOfLines={2}>
          {truncateText(notification.body)}
        </Text>
        
        {!notification.isRead && <View style={styles.unreadDot} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  unreadContainer: {
    backgroundColor: '#F9F9F9',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  typeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  timestamp: {
    fontSize: 12,
    color: '#8E8E93',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 4,
  },
  unreadTitle: {
    fontWeight: '700',
  },
  body: {
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 20,
  },
  unreadDot: {
    position: 'absolute',
    right: 0,
    top: 20,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#007AFF',
  },
});
