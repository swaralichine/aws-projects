# Architecture

```
                Internet
                     │
                     ▼
            Static Public IP
                     │
                     ▼
        Amazon Lightsail Instance
     ┌────────────────────────────┐
     │ Ubuntu Linux               │
     │ Apache                     │
     │ PHP                        │
     │ MariaDB                    │
     │ WordPress                  │
     └────────────────────────────┘
                     │
                     ▼
             Lightsail Snapshot
```

## Components

### Amazon Lightsail

Provides a virtual server with a preconfigured WordPress environment.

### Ubuntu Linux

Operating system hosting the application stack.

### Apache

Receives incoming HTTP requests and serves web content.

### PHP

Executes the WordPress application logic.

### MariaDB

Stores WordPress content, users, settings, and metadata.

### Static IP

Provides a permanent public endpoint for accessing the application.

### Snapshot

Captures the complete server state for backup and recovery.