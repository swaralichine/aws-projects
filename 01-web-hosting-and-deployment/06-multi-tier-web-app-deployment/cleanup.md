# Cleanup Guide

This document describes the recommended order for deleting all AWS resources created for this project.

Deleting resources in the correct sequence prevents dependency errors and avoids unnecessary AWS charges.

---

# Recommended Deletion Order

## 1. Delete Auto Scaling Group

Go to:

```
EC2
→ Auto Scaling Groups
```

Delete:

```
project6-auto-scaling-group
```

Wait until both EC2 instances are terminated automatically.

---

## 2. Delete Application Load Balancer

Go to:

```
EC2
→ Load Balancers
```

Delete:

```
project6-alb
```

Wait until the load balancer is completely removed.

---

## 3. Delete Target Group

Go to:

```
EC2
→ Target Groups
```

Delete:

```
project6-target-group
```

---

## 4. Delete Launch Template

Go to:

```
EC2
→ Launch Templates
```

Delete:

```
project6-web-server-template
```

---

## 5. Delete Amazon RDS Database

Go to:

```
RDS
→ Databases
```

Delete:

```
project06-mysql-db
```

Use the following options:

- Disable final snapshot
- Disable retained automated backups
- Ensure deletion protection is disabled
- Confirm database deletion

Wait until the database is fully deleted.

---

## 6. Delete DB Subnet Group

Go to:

```
RDS
→ Subnet Groups
```

Delete:

```
project6-db-subnet-group
```

---

## 7. Delete Security Groups

Go to:

```
EC2
→ Security Groups
```

Delete the following security groups:

```
project6-rds-sg

project6-ec2-sg

project6-alb-sg
```

Do not delete the default security group.

---

## 8. Delete Route Table

Go to:

```
VPC
→ Route Tables
```

Delete:

```
project6-public-route-table
```

---

## 9. Delete Internet Gateway

Go to:

```
VPC
→ Internet Gateways
```

Detach:

```
project6-internet-gateway
```

Then delete it.

---

## 10. Delete Subnets

Go to:

```
VPC
→ Subnets
```

Delete:

```
public-subnet-1

public-subnet-2

private-subnet-1

private-subnet-2
```

---

## 11. Delete VPC

Go to:

```
VPC
→ Your VPCs
```

Delete:

```
project6-multi-tier-vpc
```

---

# Verify Cleanup

After deleting all resources, verify that the following services no longer contain project resources:

## EC2

- Auto Scaling Groups
- EC2 Instances
- Load Balancers
- Target Groups
- Launch Templates

## Amazon RDS

- Databases
- DB Subnet Groups
- Manual Snapshots
- Automated Backups

## VPC

- Internet Gateway
- Route Tables
- Subnets
- Security Groups
- VPC

---

# Cost Considerations

The primary billable resources for this project are:

- Amazon EC2 instances
- Amazon RDS
- Application Load Balancer
- Amazon EBS storage
- Public IPv4 addresses
- Data transfer

Deleting resources promptly after testing helps avoid unnecessary charges.

---

# Conclusion

Following this cleanup order ensures that all dependent AWS resources are removed safely and prevents common deletion errors caused by resource dependencies.