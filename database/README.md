# Task 1: Database Design

## Overview
This task involves designing a MongoDB schema for a multi-channel notification system that tracks delivery status across Push, Email, and In-App channels.

## Files
- `schema.md` - Complete schema design with field definitions, examples, and indexing strategy

## Key Design Decisions

### Embedded vs Separate Collection
- **Chosen**: Embedded `channels` array within notification documents
- **Reason**: Ensures atomic updates, reduces query complexity, and provides better data locality since channel statuses are tightly coupled with notifications

### Status Tracking
- Each channel maintains its own independent status and lifecycle timestamps
- This allows a push notification to fail while email succeeds for the same notification

### Indexing Strategy
1. **Primary User Query**: `userId + createdAt` for efficient notification list retrieval
2. **Status Filtering**: `userId + channels.status + createdAt` for filtering unread/read notifications
3. **Analytics**: `type + createdAt` for admin queries and reporting

## Schema Validation
The schema supports:
- ✅ Multiple notification types (transactional, marketing, alerts)
- ✅ Multi-channel delivery (Push, Email, In-App)
- ✅ Independent status tracking per channel
- ✅ Retry mechanism support
- ✅ Flexible metadata for different notification types
