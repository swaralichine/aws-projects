# Architecture Deep Dive

## Overview

This project demonstrates a production-inspired multi-tier web application architecture on AWS. The design separates networking, compute, load balancing, and database components into independent layers to improve availability, security, and scalability.

The architecture consists of:

- Custom Amazon VPC
- Two public subnets
- Two private database subnets
- Internet Gateway
- Application Load Balancer
- Auto Scaling Group
- EC2 Web Servers
- Amazon RDS for MySQL

---

# Architecture Diagram

```
                              Internet
                                  |
                                  |
                         Internet Gateway
                                  |
                                  |
                  +-------------------------------+
                  | Application Load Balancer     |
                  +-------------------------------+
                                  |
                                  |
                        Target Group (HTTP)
                                  |
                 +----------------+----------------+
                 |                                 |
                 |                                 |
        +------------------+             +------------------+
        | EC2 Web Server 1 |             | EC2 Web Server 2 |
        | Apache + PHP     |             | Apache + PHP     |
        +------------------+             +------------------+
                 |                                 |
                 +---------------+-----------------+
                                 |
                                 |
                     Amazon RDS MySQL Database
                 (Private Subnets - No Public Access)
```

---

# Networking Layer

## Amazon VPC

The application is deployed inside a custom VPC.

```
CIDR Block

10.0.0.0/16
```

The VPC isolates all networking resources from other AWS customers and allows complete control over routing and security.

---

## Public Subnets

Two public subnets are deployed across two Availability Zones.

Purpose:

- Host the Application Load Balancer
- Host EC2 Web Servers
- Provide internet connectivity

Subnets

```
Public Subnet 1

10.0.1.0/24

Public Subnet 2

10.0.2.0/24
```

---

## Private Subnets

Two private subnets host Amazon RDS.

```
Private Subnet 1

10.0.3.0/24

Private Subnet 2

10.0.4.0/24
```

These subnets do not receive direct internet traffic.

---

## Internet Gateway

The Internet Gateway provides connectivity between the VPC and the public internet.

Only the public route table contains:

```
0.0.0.0/0
↓

Internet Gateway
```

---

## Route Tables

The public route table contains:

```
10.0.0.0/16 → local

0.0.0.0/0 → Internet Gateway
```

Only the public subnets are associated with this route table.

---

# Load Balancing Layer

## Application Load Balancer

The ALB receives HTTP requests from users.

Responsibilities:

- Internet-facing endpoint
- Distributes traffic
- Routes requests only to healthy instances
- Removes unhealthy EC2 instances automatically

Listener

```
HTTP
Port 80
```

---

## Target Group

The Target Group performs:

- Health checks
- EC2 registration
- Traffic routing

Health Check

```
Protocol

HTTP

Path

/
```

Only healthy EC2 instances receive traffic.

---

# Compute Layer

## Launch Template

The Launch Template stores:

- Amazon Linux 2023
- Instance Type
- Security Group
- User Data
- Storage
- Metadata settings

Every EC2 instance launched by Auto Scaling uses this template.

---

## Auto Scaling Group

Configuration

```
Minimum

2

Desired

2

Maximum

4
```

Scaling Policy

```
Target Tracking

Average CPU Utilization

50%
```

Benefits

- High availability
- Automatic recovery
- Elastic scaling

---

## EC2 Instances

Each EC2 instance automatically:

- Installs Apache
- Installs PHP
- Installs MySQL client libraries
- Creates the PHP web application
- Connects to Amazon RDS

Everything is configured through EC2 User Data.

---

# Database Layer

## Amazon RDS

Configuration

```
Engine

MySQL

Deployment

Single DB Instance

Public Access

Disabled

Encryption

Enabled
```

The database resides entirely inside private subnets.

No internet traffic can directly access it.

---

# Security Architecture

Three security groups isolate every layer.

## ALB Security Group

Inbound

```
HTTP 80

Source

0.0.0.0/0
```

---

## EC2 Security Group

Inbound

```
HTTP 80

Source

project6-alb-sg
```

SSH access is optional and restricted to the administrator's IP.

---

## RDS Security Group

Inbound

```
MySQL

3306

Source

project6-ec2-sg
```

The database accepts traffic only from the web servers.

---

# Application Flow

The complete request flow is:

```
User

↓

Application Load Balancer

↓

Target Group

↓

EC2 Instance

↓

PHP Application

↓

Amazon RDS MySQL

↓

Response Returned
```

---

# High Availability

High availability is achieved through:

- Two Availability Zones
- Two public subnets
- Auto Scaling Group
- Application Load Balancer
- Automatic health checks
- Automatic instance replacement

If one EC2 instance becomes unhealthy:

1. Target Group marks it unhealthy.
2. ALB stops routing traffic.
3. Auto Scaling launches a replacement instance.
4. The new instance is registered automatically.

---

# Scalability

Scaling is based on:

```
Average CPU Utilization

50%
```

If CPU utilization exceeds the threshold:

- Auto Scaling launches additional EC2 instances.

When demand decreases:

- Extra instances are terminated while maintaining the minimum capacity.

---

# Security Best Practices Used

- Custom VPC
- Separate public and private subnets
- Least-privilege security groups
- Private RDS deployment
- Encryption enabled for RDS
- IMDSv2 enabled
- Automated server provisioning using User Data
- Health checks for automatic recovery

---

# Conclusion

This architecture demonstrates how AWS networking, compute, storage, and load balancing services work together to build a secure, scalable, and highly available multi-tier web application.

The design follows common cloud architecture principles by separating application and database tiers, restricting access through security groups, and using managed AWS services to improve resilience and operational simplicity.