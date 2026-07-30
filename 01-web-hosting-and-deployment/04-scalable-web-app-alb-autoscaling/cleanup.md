# Cleanup Guide

## Overview

To avoid unnecessary AWS charges, delete all resources created for this project after testing is complete.

Delete the resources in the order below to avoid dependency errors.

---

# Cleanup Steps

## Step 1: Delete the Auto Scaling Group

Navigate to:

```
EC2 → Auto Scaling Groups
```

Select:

```
project4-web-asg
```

Choose:

```
Actions → Delete
```

Confirm the deletion.

The Auto Scaling Group will terminate all EC2 instances that it manages.

---

## Step 2: Verify EC2 Instances are Terminated

Navigate to:

```
EC2 → Instances
```

Wait until both instances display:

```
Terminated
```

---

## Step 3: Delete the Application Load Balancer

Navigate to:

```
EC2 → Load Balancers
```

Select:

```
project4-web-alb
```

Choose:

```
Actions → Delete
```

Wait until the load balancer is completely removed.

---

## Step 4: Delete the Target Group

Navigate to:

```
EC2 → Target Groups
```

Select:

```
project4-web-target-group
```

Choose:

```
Actions → Delete
```

If AWS reports that the target group is still in use, wait a few minutes until the Application Load Balancer has been fully deleted.

---

## Step 5: Delete the Launch Template

Navigate to:

```
EC2 → Launch Templates
```

Select:

```
project4-web-server-template
```

Choose:

```
Actions → Delete template
```

---

## Step 6: Delete Security Groups

Navigate to:

```
EC2 → Security Groups
```

Delete the following security groups:

- project4-web-server-sg
- project4-alb-sg

Delete the EC2 security group first, followed by the ALB security group.

Do not delete the default security group.

---

## Step 7: Verify EBS Volumes

Navigate to:

```
EC2 → Volumes
```

Ensure there are no remaining EBS volumes associated with this project.

Delete any unused project volumes if they still exist.

---

## Step 8: Verify Elastic IP Addresses

Navigate to:

```
EC2 → Elastic IP Addresses
```

Release any Elastic IP addresses created specifically for this project.

---

## Step 9: Verify Network Interfaces

Navigate to:

```
EC2 → Network Interfaces
```

Ensure AWS has automatically removed any interfaces associated with the deleted Application Load Balancer and EC2 instances.

---

# Final Verification Checklist

Confirm that all project resources have been deleted:

- Auto Scaling Group
- EC2 Instances
- Application Load Balancer
- Target Group
- Launch Template
- Security Groups
- EBS Volumes
- Elastic IP Addresses (if any)
- Network Interfaces

---

# Estimated AWS Cost

All project resources were deleted immediately after testing.

As a result, the total cost for this project remained within the AWS Free Tier (where applicable) or only incurred minimal usage charges.