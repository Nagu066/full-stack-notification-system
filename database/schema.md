# Task 1: Database Design

## MongoDB Schema Design for Notification System

### Schema Structure

#### 1. Notifications Collection

```javascript
{
  _id: ObjectId,
  userId: String,                    // Required - User identifier
  type: String,                      // Required - Enum: "transactional", "marketing", "alert"
  title: String,                     // Required - Notification title
  body: String,                      // Required - Notification body/content
  priority: String,                  // Optional - Enum: "low", "medium", "high"
  createdAt: Date,                   // Required - Notification creation timestamp
  updatedAt: Date,                   // Required - Last update timestamp
  metadata: Object,                  // Optional - Additional data (e.g., actionUrl, imageUrl)
  channels: Array                    // Required - Array of channel configurations
}
```

#### 2. Channel Delivery Status (Embedded Document)

Each notification contains a `channels` array with delivery status for each channel:

```javascript
channels: [
  {
    channel: String,                 // Required - Enum: "push", "email", "in-app"
    status: String,                  // Required - Enum: "pending", "sent", "delivered", "failed", "read"
    providerId: String,              // Optional - External provider message ID
    sentAt: Date,                    // Optional - When notification was sent
    deliveredAt: Date,               // Optional - When notification was delivered
    failedAt: Date,                  // Optional - When notification failed
    failureReason: String,           // Optional - Reason for failure
    readAt: Date,                    // Optional - When notification was read (in-app only)
    retryCount: Number,              // Optional - Number of retry attempts
    lastRetryAt: Date               // Optional - Last retry timestamp
  }
]
```

### Complete Schema Example

```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  userId: "user_12345",
  type: "transactional",
  title: "Payment Received",
  body: "Your payment of $100 has been successfully processed.",
  priority: "high",
  createdAt: ISODate("2024-01-15T10:30:00Z"),
  updatedAt: ISODate("2024-01-15T10:35:00Z"),
  metadata: {
    actionUrl: "/payments/12345",
    amount: 100,
    currency: "USD"
  },
  channels: [
    {
      channel: "push",
      status: "delivered",
      providerId: "fcm_token_abc123",
      sentAt: ISODate("2024-01-15T10:30:05Z"),
      deliveredAt: ISODate("2024-01-15T10:30:06Z"),
      retryCount: 0
    },
    {
      channel: "email",
      status: "sent",
      providerId: "ses_message_xyz789",
      sentAt: ISODate("2024-01-15T10:30:10Z"),
      retryCount: 0
    },
    {
      channel: "in-app",
      status: "delivered",
      sentAt: ISODate("2024-01-15T10:30:00Z"),
      deliveredAt: ISODate("2024-01-15T10:30:00Z"),
      readAt: ISODate("2024-01-15T10:35:00Z")
    }
  ]
}
```

### Schema Fields Explanation

#### Required Fields
- **userId**: Identifies the recipient user
- **type**: Categorizes notification (transactional, marketing, alert)
- **title**: Short notification title
- **body**: Full notification content
- **createdAt**: Timestamp for creation
- **updatedAt**: Timestamp for last update
- **channels**: Array containing at least one channel configuration

#### Optional Fields
- **priority**: Helps prioritize delivery
- **metadata**: Flexible object for additional data

#### Channel Object Fields
- **channel**: Type of delivery channel (push, email, in-app)
- **status**: Current delivery status
- **providerId**: External service message ID for tracking
- **sentAt/deliveredAt/failedAt/readAt**: Timestamps for lifecycle events
- **failureReason**: Error details for debugging
- **retryCount/lastRetryAt**: Retry mechanism tracking

### Design Decisions

1. **Embedded Channels Array**: Chosen over separate collection to ensure atomic updates and reduce query complexity. Since channel statuses are tightly coupled with notifications, embedding provides better data locality.

2. **Status Enum**: Standardized status values allow for consistent querying and filtering across all channels.

3. **Flexible Metadata**: Using an object type allows different notification types to store type-specific data without schema changes.

4. **Separate Timestamps**: Individual timestamps per channel enable precise tracking of delivery lifecycle for each channel independently.

---

## Critical Indexes

### 1. Compound Index: userId + createdAt (Descending)

```javascript
db.notifications.createIndex({ userId: 1, createdAt: -1 })
```

**Reasoning**: 
- **Primary Query Pattern**: Users typically fetch their notifications sorted by creation date (newest first)
- **Performance**: This index supports efficient queries like `find({ userId: "user_123" }).sort({ createdAt: -1 })`
- **Coverage**: Covers the most common access pattern for notification lists

### 2. Compound Index: userId + "channels.status" + createdAt (Descending)

```javascript
db.notifications.createIndex({ 
  userId: 1, 
  "channels.status": 1, 
  createdAt: -1 
})
```

**Reasoning**:
- **Filtering by Status**: Users often filter notifications by read/unread status (in-app channel)
- **Efficient Filtering**: Allows quick filtering of unread notifications without scanning all documents
- **Query Pattern**: Supports queries like `find({ userId: "user_123", "channels.status": "delivered" })`

### 3. Index: type + createdAt (Descending)

```javascript
db.notifications.createIndex({ type: 1, createdAt: -1 })
```

**Reasoning**:
- **Admin/Analytics Queries**: System administrators need to query notifications by type for analytics and reporting
- **Type-based Filtering**: Marketing teams may need to analyze marketing notification performance
- **Time-based Analysis**: Combined with createdAt, enables efficient time-range queries per notification type

### Additional Considerations

- **TTL Index (Optional)**: Consider adding a TTL index on `createdAt` for automatic cleanup of old notifications:
  ```javascript
  db.notifications.createIndex({ createdAt: 1 }, { expireAfterSeconds: 31536000 }) // 1 year
  ```

- **Partial Index for Failed Notifications**: For retry mechanisms, a partial index on failed notifications could be beneficial:
  ```javascript
  db.notifications.createIndex(
    { "channels.status": 1, "channels.failedAt": 1 },
    { partialFilterExpression: { "channels.status": "failed" } }
  )
  ```
