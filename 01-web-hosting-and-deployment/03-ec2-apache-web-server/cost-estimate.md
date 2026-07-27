# Cost Estimate

## Overview

This project was designed to provide hands-on experience with Amazon EC2 and Apache while keeping AWS costs to a minimum. All resources were deleted immediately after the project was completed to avoid unnecessary charges.

---

## AWS Resources Used

| Resource | Configuration | Purpose |
|----------|---------------|---------|
| Amazon EC2 | t2.micro / t3.micro (Free Tier eligible, depending on account) | Hosted the Apache web server |
| Amazon EBS | 8 GiB gp3 | Root storage for the operating system and website files |
| Security Group | 1 | Controlled inbound SSH and HTTP traffic |
| Key Pair | 1 | Secure SSH authentication |
| Public IPv4 Address | Assigned during instance runtime | Public access to the web server |

---

## Estimated Cost

| Resource | Estimated Cost |
|----------|----------------|
| Amazon EC2 | Approximately $0.01–$0.02 per hour (if not covered by Free Tier) |
| Amazon EBS (8 GiB gp3) | Less than $0.01 for a short-lived project |
| Security Group | No additional cost |
| Key Pair | No additional cost |
| Data Transfer | Minimal for testing the website |

**Total project cost:** Approximately **$0.00–$1.00**, depending on your AWS account type, Free Tier eligibility, and how long the instance remained running.

---

## Cost Optimization Practices

To minimize AWS costs, the following best practices were followed:

- Used a micro EC2 instance suitable for learning.
- Used the default 8 GiB gp3 root volume.
- Avoided creating additional EBS volumes.
- Did not allocate an Elastic IP address.
- Used only the required Security Group rules.
- Deleted all AWS resources immediately after completing the project.

---

## Resource Cleanup

After verifying the website deployment, the following resources were removed:

- ✅ EC2 instance terminated
- ✅ Root EBS volume deleted automatically
- ✅ No Elastic IP addresses remained
- ✅ Custom Security Group deleted
- ✅ No snapshots were created

This ensured there were no ongoing AWS charges after the project was completed.

---

## Lessons Learned

One of the most important aspects of working in the cloud is managing costs. Even small resources can generate charges if they are left running.

This project reinforced the importance of:

- Selecting appropriately sized resources
- Monitoring cloud usage
- Cleaning up infrastructure after testing
- Following cost-conscious cloud engineering practices