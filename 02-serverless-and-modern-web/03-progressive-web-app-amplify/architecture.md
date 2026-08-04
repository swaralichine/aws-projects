# Architecture

## High-Level Architecture

```
Developer
     │
     ▼
React + Vite
     │
     ▼
GitHub Repository
     │
     ▼
AWS Amplify
     │
 ┌───┴───────────────┐
 │                   │
Build Application    Deploy Website
 │                   │
 └─────────┬─────────┘
           ▼
HTTPS Hosted PWA
           │
           ▼
Users
```

---

## Runtime Architecture

```
User
   │
   ▼
Browser
   │
   ▼
Cloud Task Manager
   │
   ▼
Service Worker
   │
 ┌─┴─────────────┐
 │               │
Network      Local Cache
```

---

## Components

### React

Provides the user interface and application logic.

### Vite

Development server and production build tool.

### vite-plugin-pwa

Generates:

- Web App Manifest
- Service Worker
- Offline Caching

### GitHub

Stores source code and triggers automatic deployments.

### AWS Amplify

- Builds the application
- Deploys the application
- Hosts the application
- Provides HTTPS endpoint

### Service Worker

Caches application assets for:

- Faster loading
- Offline access
- Installable application