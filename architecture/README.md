# Task 2: System Architecture

## Overview
This task involves designing a high-level architecture for a notification system that serves both React Native (Mobile) and React (Web) clients, handles high volumes, supports real-time updates, and gracefully handles offline users.

## Files
- `architecture.md` - Complete architecture documentation with diagram, components, flow, and scalability considerations

## Key Architecture Decisions

### Non-blocking Notification Creation
- **Problem**: Sending notifications (Push/Email) is slow and unreliable
- **Solution**: API immediately returns after saving to DB and publishing to message queue. Actual delivery happens asynchronously via workers.

### Real-time Updates for Web
- **Problem**: Web client needs real-time notification updates
- **Solution**: WebSocket server subscribes to notification events and pushes updates to connected clients

### Mobile Push Notifications
- **Problem**: Mobile apps need notifications when app is closed
- **Solution**: Push workers send notifications via FCM/APNS, which are handled by the OS even when app is closed

### Scalability
- **Solution**: Stateless API servers, horizontal scaling of workers, message queue for buffering, read replicas for database

### Offline Support
- **Mobile**: Local storage + push notifications via OS
- **Web**: Service workers + WebSocket reconnection with queuing

## Architecture Highlights

1. **Message Queue Pattern**: Decouples notification creation from delivery
2. **Worker Pattern**: Separate workers for each channel (Push, Email, In-App)
3. **Event-Driven**: Status updates flow through events to WebSocket server
4. **Horizontal Scaling**: All components can scale independently
5. **Resilience**: Retry logic, dead letter queues, graceful degradation
