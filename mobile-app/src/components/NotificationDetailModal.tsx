import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Notification, NotificationType } from '../types/Notification';
import { formatRelativeTime } from '../utils/formatTime';

interface NotificationDetailModalProps {
  visible: boolean;
  notification: Notification | null;
  onClose: () => void;
}

const getTypeColor = (type: NotificationType): string => {
  switch (type) {
    case 'transactional':
      return '#007AFF';
    case 'marketing':
      return '#34C759';
    case 'alert':
      return '#FF3B30';
    case 'system':
      return '#AF52DE';
    default:
      return '#8E8E93';
  }
};

export default function NotificationDetailModal({
  visible,
  notification,
  onClose,
}: NotificationDetailModalProps) {
  console.log('notification', notification);
  if (!notification) return null;

  const typeColor = getTypeColor(notification.type);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <View style={[styles.typeBadge, { backgroundColor: typeColor }]}>
              <Text style={styles.typeText}>{notification.type.toUpperCase()}{" "}</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* <ScrollView style={styles.content}> */}
            <Text style={styles.title}>{notification.title}</Text>
            <Text style={styles.timestamp}>
              {formatRelativeTime(notification.timestamp)}
            </Text>
            <Text style={styles.body}>{notification.body}</Text>
            <View style={styles.statusContainer}>
              <Text style={styles.statusLabel}>Status:</Text>
              <Text style={[styles.status, notification.isRead && styles.readStatus]}>
                {notification.isRead ? 'Read' : 'Unread'}
              </Text>
            </View>
          {/* </ScrollView> */}

          <TouchableOpacity style={styles.doneButton} onPress={onClose}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: '90%',
    maxHeight: '80%',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  typeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  closeButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#8E8E93',
    fontWeight: '300',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 16,
  },
  body: {
    fontSize: 16,
    color: '#000000',
    lineHeight: 24,
    marginBottom: 20,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  statusLabel: {
    fontSize: 14,
    color: '#8E8E93',
    marginRight: 8,
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  readStatus: {
    color: '#34C759',
  },
  doneButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  doneButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
