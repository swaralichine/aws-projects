# Cleanup Guide

Delete the resources in reverse dependency order to prevent AWS “resource in use” errors and stop ongoing charges.

## Recommended Order

```text
1. Auto Scaling Group
2. EC2 instances and attached EBS volumes
3. Network Load Balancer
4. Target Group
5. Launch Template
6. Security Groups
7. Project-specific key pair or Elastic IPs
```

## 1. Delete the Auto Scaling Group

Navigate to:

```text
EC2 → Auto Scaling Groups
```

Select:

```text
project5-auto-scaling-group
```

Choose **Actions → Delete** and confirm.

Deleting the group first prevents it from launching replacement instances.

A controlled alternative is to edit the group, set minimum and desired capacity to `0`, wait for the instances to terminate, and then delete the group.

## 2. Verify EC2 and EBS Cleanup

Open:

```text
EC2 → Instances
```

Confirm the project instances are terminated and no replacements are launching.

Then check:

```text
EC2 → Elastic Block Store → Volumes
```

Root volumes should be removed automatically when **Delete on termination** is enabled. Delete only project-specific volumes that remain in the `Available` state.

## 3. Delete the Network Load Balancer

Open:

```text
EC2 → Load Balancers
```

Select:

```text
project5-network-load-balancer
```

Choose **Actions → Delete load balancer** and confirm.

Wait until it disappears from the console. Its network interfaces can take several minutes to be released.

## 4. Delete the Target Group

Open:

```text
EC2 → Target Groups
```

Select:

```text
project5-nlb-target-group
```

Choose **Actions → Delete**.

If AWS says it is still in use, wait for the NLB deletion to complete and retry.

## 5. Delete the Launch Template

Open:

```text
EC2 → Launch Templates
```

Select:

```text
project5-nlb-launch-template
```

Choose **Actions → Delete template**.

## 6. Delete the Security Groups

Open:

```text
EC2 → Security Groups
```

Delete:

```text
project5-web-server-sg
project5-nlb-sg
```

Delete the EC2 security group first, then the NLB security group.

If AWS says a group is in use, confirm that the load balancer and instances are gone, check **EC2 → Network Interfaces**, wait a few minutes, and retry.

Do not delete the default VPC security group.

## 7. Optional Resources

Delete the key pair only when it was created exclusively for this project.

Review:

```text
EC2 → Elastic IPs
```

Release only project-specific addresses that are no longer associated with resources.

## Final Verification

Confirm that the Region no longer contains:

- `project5-auto-scaling-group`
- Running `project5-web-server` instances
- Available project EBS volumes
- `project5-network-load-balancer`
- `project5-nlb-target-group`
- `project5-nlb-launch-template`
- `project5-web-server-sg`
- `project5-nlb-sg`
- Project-specific Elastic IP addresses

## Billing Verification

Open:

```text
AWS Billing and Cost Management → Bills
```

Review usage for EC2, Elastic Load Balancing, EBS, public IPv4 addresses, data transfer, and CloudWatch.

Billing data can appear after resources have already been deleted.

## Common Errors

### Instances reappear

The Auto Scaling Group is still maintaining desired capacity. Delete the group or set minimum and desired capacity to zero.

### Target group is in use

The NLB listener still references it. Delete the NLB first.

### Security group is in use

An instance or NLB network interface still references it. Wait for deletion to complete and retry.

### EBS volume remains

`Delete on termination` was disabled. Verify that the volume belongs to this project and is `Available` before deleting it.
