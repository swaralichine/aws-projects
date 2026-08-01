# AWS Cost Estimate

This document provides an approximate cost estimate for running the infrastructure used in this project.

> **Note:** Costs vary based on AWS Region, pricing updates, usage duration, and account type. This estimate is intended for educational purposes only.

---

# Resources Used

| AWS Service | Purpose | Estimated Cost |
|-------------|---------|----------------|
| Amazon VPC | Networking | No additional charge |
| Public & Private Subnets | Network segmentation | No additional charge |
| Route Tables | Traffic routing | No additional charge |
| Internet Gateway | Internet connectivity | No additional charge |
| Security Groups | Firewall rules | No additional charge |
| Launch Template | EC2 configuration | No additional charge |
| Target Group | Load balancing target registration | No additional charge |
| Auto Scaling Group | EC2 instance management | No additional charge |
| Amazon EC2 (t2.micro / t3.micro) | Web servers | Pay only while instances are running |
| Amazon EBS | Root volume storage | Charged based on storage used |
| Application Load Balancer | Traffic distribution | Charged while running |
| Amazon RDS MySQL | Managed database | Charged while running |
| Public IPv4 Addresses | Internet connectivity | Charged while allocated |
| Data Transfer | Network traffic | Charges may apply |

---

# Resources That Generate Most Costs

The primary contributors to the AWS bill for this project are:

- Amazon EC2 instances
- Amazon RDS MySQL
- Application Load Balancer
- Amazon EBS storage
- Public IPv4 addresses
- Data transfer

---

# Estimated Lab Cost

For a short hands-on lab (approximately 1–2 hours), the estimated cost is generally only a few dollars, depending on your AWS Region and current pricing.

Deleting all resources immediately after testing helps minimize charges.

---

# Cost Optimization Tips

To keep costs low:

- Use the smallest supported EC2 instance type.
- Use a Single-AZ RDS deployment.
- Use the minimum required database storage.
- Delete the Application Load Balancer after testing.
- Delete the RDS database after validation.
- Delete EBS volumes that are no longer required.
- Remove unused snapshots and automated backups.
- Release any unused public IPv4 addresses.
- Delete the Auto Scaling Group before terminating EC2 instances.

---

# Billing Reminder

After completing the project:

- Delete all AWS resources.
- Verify that no EC2 instances remain running.
- Confirm that the Application Load Balancer has been removed.
- Delete the Amazon RDS instance.
- Remove any remaining snapshots or automated backups.
- Check the AWS Billing Dashboard for unexpected charges.

---

# Conclusion

This project demonstrates a production-style AWS architecture while keeping infrastructure relatively small for learning purposes. Proper cleanup after testing ensures that ongoing AWS costs remain minimal.