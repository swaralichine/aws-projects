# Cost Estimate

## Overview

This project was intentionally designed as a low-cost serverless architecture using AWS managed services.

All resources were created for learning purposes, tested, documented, and deleted after successful verification to minimize AWS charges.

---

# AWS Services Used

| Service | Purpose |
|----------|---------|
| Amazon S3 | Static website hosting |
| Amazon CloudFront | Global content delivery network (CDN) |
| AWS Lambda@Edge | Modify HTTP responses at edge locations |
| AWS IAM | Execution role for Lambda |

---

# Estimated Monthly Cost

| AWS Service | Free Tier | Estimated Cost |
|-------------|-----------|----------------|
| Amazon S3 | 5 GB storage | ~$0.01 |
| CloudFront | 1 TB outbound + 10M requests (Free Tier eligible for new accounts) | ~$0.00–$0.05 |
| Lambda@Edge | 1M requests and 400,000 GB-seconds (Free Tier eligible for new accounts) | <$0.01 |
| IAM | Always free | $0.00 |

---

# Estimated Project Cost

| Usage | Estimated Cost |
|-------|----------------|
| Building the project | ~$0.00 |
| Testing the website | <$0.05 |
| Short-term deployment | Less than $0.10 |

Because all resources were deleted after testing, the total cost for this project remained negligible.

---

# Cost Optimization Strategies

The following practices were used to minimize AWS costs:

- Used Amazon S3 instead of EC2 for website hosting
- Used a serverless architecture
- Selected the CloudFront **North America and Europe** price class
- Used the default CloudFront SSL certificate
- Did not purchase a custom domain
- Did not use Route 53
- Did not use AWS WAF
- Did not enable CloudFront access logging
- Deleted all resources immediately after testing

---

# Why This Architecture Is Cost Effective

Traditional web hosting typically requires:

- Virtual machines
- Load balancers
- Operating system maintenance
- Scaling infrastructure

This project eliminates those components by using fully managed AWS services.

Benefits include:

- No server management
- Automatic scaling
- Pay only for actual usage
- Low operational overhead
- High availability

---

# Production Cost Considerations

For a production deployment, additional services may increase overall cost, including:

- Route 53
- AWS Certificate Manager (custom domains)
- AWS WAF
- CloudFront access logs
- Monitoring and alerting with CloudWatch
- CI/CD pipelines

These services improve security, observability, and operational efficiency but were intentionally omitted to keep this learning project simple and cost-efficient.

---

# Resource Cleanup

To avoid ongoing charges, the following resources were deleted after project completion:

- Amazon S3 Bucket
- CloudFront Distribution
- Lambda@Edge Function
- IAM Execution Role
- CloudWatch Log Groups

---

# Key Takeaways

This project demonstrates that highly available and globally distributed websites can be deployed on AWS using a fully serverless architecture while keeping infrastructure costs extremely low.

The combination of Amazon S3, CloudFront, and Lambda@Edge provides:

- Global scalability
- HTTPS support
- Edge computing capabilities
- Minimal infrastructure management
- Cost-efficient deployment