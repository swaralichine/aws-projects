# Architecture

## Solution Overview

This project implements a highly available web application using AWS compute, networking, and scaling services.

Instead of deploying a single EC2 instance, the application is deployed behind an Application Load Balancer with an Auto Scaling Group spanning multiple Availability Zones.

The Application Load Balancer distributes incoming traffic across healthy EC2 instances, while the Auto Scaling Group ensures the desired number of servers remain available even if an instance becomes unhealthy.

---

# Architecture Diagram

```text
                    Internet
                        │
                        ▼
          Application Load Balancer
                        │
                Target Group (HTTP)
                        │
          ┌─────────────┴─────────────┐
          ▼                           ▼
     EC2 Instance 1              EC2 Instance 2
 (Availability Zone A)      (Availability Zone B)
          │                           │
          └─────────────┬─────────────┘
                        │
              Auto Scaling Group
                        │
               Launch Template
```

---

# Components

## Internet

Users access the application through the public DNS name of the Application Load Balancer.

---

## Application Load Balancer (ALB)

The ALB serves as the public entry point for the application.

Responsibilities:

- Accept HTTP requests
- Perform health checks
- Route traffic only to healthy EC2 instances
- Distribute requests evenly across Availability Zones

---

## Target Group

The Target Group maintains a list of EC2 instances that can receive traffic.

Responsibilities:

- Register EC2 instances
- Perform HTTP health checks
- Remove unhealthy instances from rotation
- Forward requests only to healthy targets

Health Check Configuration

| Setting | Value |
|---------|------|
| Protocol | HTTP |
| Path | / |
| Port | Traffic Port |

---

## Auto Scaling Group

The Auto Scaling Group manages the EC2 fleet.

Configuration:

| Setting | Value |
|---------|------|
| Desired Capacity | 2 |
| Minimum Capacity | 2 |
| Maximum Capacity | 4 |

Responsibilities:

- Launch EC2 instances
- Replace unhealthy instances
- Maintain desired capacity
- Distribute instances across multiple Availability Zones

---

## Launch Template

The Launch Template standardizes every EC2 instance created by the Auto Scaling Group.

Configuration includes:

- Amazon Linux 2023 AMI
- Instance Type
- Security Group
- Storage
- User Data Script
- Key Pair

Using a Launch Template ensures every replacement instance is configured identically.

---

## EC2 Instances

Each EC2 instance hosts:

- Apache HTTP Server
- Static HTML webpage
- Dynamic instance metadata

The webpage displays:

- Instance ID
- Availability Zone
- Hostname

This allows verification that requests are being routed to different instances.

---

## Security Groups

### ALB Security Group

Inbound

- HTTP (80) from Anywhere

Outbound

- All traffic

---

### EC2 Security Group

Inbound

- HTTP (80) from ALB Security Group
- SSH (22) from My IP

Outbound

- All traffic

This prevents users from directly accessing the EC2 instances over HTTP.

---

# Request Flow

1. User enters the ALB DNS name.
2. The Application Load Balancer receives the request.
3. The ALB checks the Target Group.
4. The Target Group selects a healthy EC2 instance.
5. The request is forwarded to the selected EC2 instance.
6. Apache processes the request.
7. The webpage is returned to the user.

---

# High Availability

The application remains available because:

- Two EC2 instances run simultaneously.
- Instances are deployed across multiple Availability Zones.
- The Target Group continuously monitors instance health.
- The Auto Scaling Group automatically replaces failed instances.

---

# Scalability

The Auto Scaling Group can increase or decrease the number of EC2 instances based on demand (when scaling policies are configured).

This architecture supports horizontal scaling without modifying the application.

---

# Benefits

- High Availability
- Fault Tolerance
- Automatic Recovery
- Load Distribution
- Infrastructure Standardization
- Improved Reliability
- Easier Operations
- Better User Experience

---

# AWS Services Used

- Amazon EC2
- Application Load Balancer
- Auto Scaling Group
- Launch Template
- Target Group
- Security Groups