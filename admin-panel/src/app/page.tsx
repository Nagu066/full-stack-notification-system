'use client';

import { useState, useEffect } from 'react';
import { generateMockNotifications, simulateDelay } from '../utils/mockData';
import CreateNotificationForm from '../components/CreateNotificationForm';
import NotificationTable from '../components/NotificationTable';

export default function Home() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    setLoading(true);
    await simulateDelay(300);
    const mockNotifications = generateMockNotifications(50);
    setNotifications(mockNotifications);
    setLoading(false);
  };

  const handleResend = async (notificationId: string) => {
    // Mock resend functionality
    await simulateDelay(500);
    setNotifications(prev =>
      prev.map(notif =>
        notif?.id === notificationId
          ? {
              ...notif,
              channels: notif?.channels.map(ch =>
                ch.status === 'failed'
                  ? { ...ch, status: 'pending' as const }
                  : ch
              ),
            }
          : notif
      )
    );
    alert(`Resend initiated for notification ${notificationId}`);
  };

  const handleCreate = async (notification: Omit<Notification, 'id' | 'createdAt'>) => {
    await simulateDelay(300);
    const newNotification: Notification = {
      ...notification,
      id: `notif_${Date.now()}`,
      createdAt: new Date(),
    };
    setNotifications(prev => [newNotification, ...prev]);
    setShowCreateForm(false);
    alert('Notification created successfully!');
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Notification Admin Panel</h1>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            + Create Notification
          </button>
        </div>

        {showCreateForm && (
          <CreateNotificationForm
            onSubmit={handleCreate}
            onCancel={() => setShowCreateForm(false)}
          />
        )}

        <NotificationTable
          notifications={notifications}
          loading={loading}
          onResend={handleResend}
        />
      </div>
    </main>
  );
}
