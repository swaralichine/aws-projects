# Scalable Web Application with Application Load Balancer & Auto Scaling on AWS

## Project Overview

This project demonstrates how to build a highly available and scalable web application on AWS using Amazon EC2, Application Load Balancer (ALB), Auto Scaling Group (ASG), Launch Templates, Target Groups, and Security Groups.

Instead of relying on a single EC2 instance, the application runs across multiple Availability Zones behind an Application Load Balancer. An Auto Scaling Group ensures that the desired number of EC2 instances are always available, improving fault tolerance and availability.

---

## Architecture

```
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

## Problem Statement

A single EC2 instance creates a single point of failure.

If the server crashes, becomes unhealthy, or receives more traffic than it can handle, the entire application becomes unavailable.

This project solves that problem by:

- Deploying multiple EC2 instances
- Distributing traffic using an Application Load Balancer
- Automatically replacing unhealthy instances
- Deploying resources across multiple Availability Zones
- Maintaining high availability through Auto Scaling

---

# AWS Services Used

| Service | Purpose |
|----------|----------|
| Amazon EC2 | Hosts the web application |
| Application Load Balancer | Distributes incoming HTTP traffic |
| Auto Scaling Group | Automatically maintains desired EC2 capacity |
| Launch Template | Defines EC2 configuration |
| Target Group | Performs health checks and routes traffic |
| Security Groups | Controls inbound and outbound traffic |

---

# Project Workflow

1. Created Security Groups
2. Created Launch Template
3. Added EC2 User Data script
4. Created Target Group
5. Created Application Load Balancer
6. Connected ALB Listener to Target Group
7. Created Auto Scaling Group
8. Launched two EC2 instances
9. Verified Target Group health checks
10. Tested traffic distribution through the ALB

---

# Auto Scaling Configuration

| Setting | Value |
|---------|------|
| Desired Capacity | 2 |
| Minimum Capacity | 2 |
| Maximum Capacity | 4 |

---

# Load Balancer Configuration

| Setting | Value |
|---------|------|
| Type | Application Load Balancer |
| Scheme | Internet Facing |
| Listener | HTTP : 80 |
| Target Group | project4-web-target-group |

---

# Target Group Health Check

| Setting | Value |
|---------|------|
| Protocol | HTTP |
| Port | Traffic Port |
| Path | / |

Only healthy EC2 instances receive incoming requests.

---

# Security Configuration

## ALB Security Group

Inbound Rules

- HTTP (80) from Anywhere (0.0.0.0/0)

---

## EC2 Security Group

Inbound Rules

- HTTP (80) from ALB Security Group
- SSH (22) from My IP

This ensures users can only access the web application through the Application Load Balancer instead of directly accessing the EC2 instances.

---

# User Data Automation

A User Data script automatically performs the following tasks whenever a new EC2 instance is launched:

- Updates the operating system
- Installs Apache HTTP Server
- Starts Apache
- Enables Apache on boot
- Retrieves Instance Metadata (IMDSv2)
- Generates a dynamic HTML page displaying:
  - Instance ID
  - Availability Zone
  - Hostname

Because the Auto Scaling Group uses a Launch Template, every newly launched EC2 instance is configured automatically without any manual intervention.

---

# Testing

The following tests were performed successfully:

- Two EC2 instances launched successfully
- Both instances passed Target Group health checks
- Application Load Balancer became active
- Website accessible through ALB DNS
- Browser refresh displayed different EC2 Instance IDs
- Verified traffic distribution across multiple Availability Zones

---

# Project Structure

```
04-scalable-web-app-alb-autoscaling/
│
├── README.md
├── architecture.md
├── cleanup.md
├── cost-estimate.md
├── user-data.sh
└── screenshots/
```

---

# Screenshots

The project includes screenshots for:

- Launch Template
- Security Groups
- Target Group
- Application Load Balancer
- Auto Scaling Group
- Running EC2 Instances
- Healthy Target Group
- Website through ALB
- Traffic distribution across instances

---

# Key Learnings

- Amazon EC2
- Application Load Balancer
- Auto Scaling Groups
- Launch Templates
- Target Groups
- Health Checks
- EC2 User Data
- Multi-AZ Architecture
- High Availability
- Security Groups
- Infrastructure Scalability

---

# Conclusion

This project demonstrates how to deploy a fault-tolerant and highly available web application on AWS using industry-standard cloud architecture. By combining Application Load Balancers, Auto Scaling Groups, Launch Templates, and EC2 User Data, the infrastructure can automatically recover from instance failures and distribute incoming traffic across multiple servers, providing improved reliability, scalability, and availability.