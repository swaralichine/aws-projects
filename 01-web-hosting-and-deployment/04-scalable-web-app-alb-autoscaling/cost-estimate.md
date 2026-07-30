# Cost Estimate

## Overview

This project was designed to demonstrate a scalable web application architecture while minimizing AWS costs.

All resources were deleted immediately after testing to avoid unnecessary charges.

---

# Resources Used

| AWS Service | Configuration | Estimated Usage |
|-------------|--------------|----------------|
| Amazon EC2 | 2 × t2.micro (or t3.micro) | Short duration |
| Application Load Balancer | 1 ALB | Short duration |
| Auto Scaling Group | 1 | No additional charge |
| Launch Template | 1 | No charge |
| Target Group | 1 | No charge |
| Security Groups | 2 | No charge |
| EBS Volumes | 2 × 8 GB gp3 | Short duration |

---

# Estimated Cost

| Resource | Approximate Cost |
|----------|------------------:|
| EC2 Instances | Minimal (or Free Tier eligible, if applicable) |
| Application Load Balancer | Minimal for testing duration |
| EBS Storage | Minimal |
| Data Transfer | Negligible |
| Other AWS Resources | No additional cost |

**Estimated total project cost:** Less than **$2** for a short lab session (actual cost depends on your AWS account, Region, Free Tier eligibility, and how long the resources remain running).

---

# Cost Optimization

The following practices were used to minimize costs:

- Deleted the Auto Scaling Group after testing.
- Terminated all EC2 instances.
- Deleted the Application Load Balancer.
- Deleted the Target Group.
- Deleted the Launch Template.
- Deleted project-specific Security Groups.
- Verified that no EBS volumes remained.
- Released any unused networking resources.

---

# Notes

- Auto Scaling Groups, Launch Templates, Target Groups, and Security Groups do not have standalone charges.
- The primary costs for this project come from:
  - EC2 instance runtime
  - Application Load Balancer runtime
  - EBS storage while attached to running instances
- Costs stop accruing for these resources once they are deleted (except for any resources intentionally retained).

---

# Final Result

The project successfully demonstrated a highly available web application architecture while keeping infrastructure costs low through careful cleanup and short-lived resource usage.