# Cleanup Guide

## Overview

To avoid unnecessary AWS charges, all resources created during this project were removed immediately after verifying the successful deployment of the Apache web server.

This guide documents the cleanup process and can be reused whenever deploying similar infrastructure.

---

# Resources Created

The following AWS resources were created during this project:

- Amazon EC2 Instance
- Amazon EBS Root Volume
- Security Group
- Key Pair
- Public IPv4 Address

---

# Step 1 – Terminate the EC2 Instance

Navigate to:

```
AWS Console
→ EC2
→ Instances
```

Select the EC2 instance.

Choose:

```
Instance State
→ Terminate Instance
```

Wait until the instance status changes to:

```
Terminated
```

---

# Step 2 – Verify the EBS Volume

Navigate to:

```
EC2
→ Elastic Block Store
→ Volumes
```

Verify that the root EBS volume has been deleted automatically.

If the volume still exists:

1. Select the volume.
2. Choose:

```
Actions
→ Delete Volume
```

---

# Step 3 – Verify Elastic IP Addresses

Navigate to:

```
EC2
→ Network & Security
→ Elastic IP Addresses
```

Confirm that no Elastic IP addresses remain allocated.

If one exists:

```
Actions
→ Release Elastic IP Address
```

---

# Step 4 – Delete the Security Group

Navigate to:

```
EC2
→ Security Groups
```

Select the custom Security Group created for this project.

Choose:

```
Actions
→ Delete Security Group
```

If AWS reports that the Security Group is still in use, wait until the EC2 instance has fully terminated before trying again.

---

# Step 5 – Verify Snapshots

Navigate to:

```
EC2
→ Snapshots
```

Ensure that no snapshots remain.

Delete any unnecessary snapshots if they were created during testing.

---

# Step 6 – Key Pair

The SSH key pair does not incur AWS charges.

For future EC2 projects, the same key pair can be reused.

For this project, the key pair was retained.

---

# Final Verification Checklist

| Resource | Status |
|----------|--------|
| EC2 Instance | ✅ Terminated |
| Root EBS Volume | ✅ Deleted |
| Elastic IP | ✅ None Allocated |
| Security Group | ✅ Deleted |
| Snapshots | ✅ None |
| Key Pair | ✅ Retained for future use |

---

# Result

All billable AWS resources were successfully removed after completing the project.

Cleaning up infrastructure after testing is an important cloud engineering best practice because it:

- Prevents unnecessary AWS charges
- Keeps the AWS environment organized
- Reduces security exposure
- Encourages responsible cloud resource management

Following a consistent cleanup process is a habit that scales well from personal projects to production cloud environments.