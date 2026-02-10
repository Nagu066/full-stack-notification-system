'use client';

import { useState } from 'react';
import { Notification, NotificationType } from '../types/Notification';

interface CreateNotificationFormProps {
  onSubmit: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

export default function CreateNotificationForm({
  onSubmit,
  onCancel,
}: CreateNotificationFormProps) {
  const [formData, setFormData] = useState({
    userId: '',
    type: 'transactional' as NotificationType,
    title: '',
    body: '',
    channels: ['push', 'email', 'in-app'] as ('push' | 'email' | 'in-app')[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.userId || !formData.title || !formData.body) {
      alert('Please fill in all required fields');
      return;
    }

    const notification: Omit<Notification, 'id' | 'createdAt'> = {
      userId: formData.userId,
      type: formData.type,
      title: formData.title,
      body: formData.body,
      isRead: false,
      channels: formData.channels.map(channel => ({
        channel,
        status: 'pending' as const,
      })),
    };

    onSubmit(notification);
    
    // Reset form
    setFormData({
      userId: '',
      type: 'transactional',
      title: '',
      body: '',
      channels: ['push', 'email', 'in-app'],
    });
  };

  const toggleChannel = (channel: 'push' | 'email' | 'in-app') => {
    setFormData(prev => ({
      ...prev,
      channels: prev.channels.includes(channel)
        ? prev.channels.filter(c => c !== channel)
        : [...prev.channels, channel],
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-900">Create New Notification</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            User ID *
          </label>
          <input
            type="text"
            value={formData.userId}
            onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="user_001"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type *
          </label>
          <select
            value={formData.type}
            onChange={(e) =>
              setFormData({ ...formData, type: e.target.value as NotificationType })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="transactional">Transactional</option>
            <option value="marketing">Marketing</option>
            <option value="alert">Alert</option>
            <option value="system">System</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Notification title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Body *
          </label>
          <textarea
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Notification body content"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Channels *
          </label>
          <div className="flex gap-4">
            {(['push', 'email', 'in-app'] as const).map((channel) => (
              <label key={channel} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.channels.includes(channel)}
                  onChange={() => toggleChannel(channel)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700 capitalize">{channel}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Create Notification
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
