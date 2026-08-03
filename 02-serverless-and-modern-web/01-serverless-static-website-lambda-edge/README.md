# Serverless Static Website with Amazon S3, CloudFront & Lambda@Edge

A production-inspired serverless static website deployed on AWS using Amazon S3 for hosting, Amazon CloudFront for global content delivery, and Lambda@Edge for edge-based response customization.

This project demonstrates how to build a globally distributed static website with HTTPS, CDN caching, and edge computing while keeping infrastructure simple and cost-effective.

---

# Architecture

```
                User
                  │
               HTTPS
                  │
                  ▼
          Amazon CloudFront
                  │
      Lambda@Edge (Viewer Response)
                  │
                  ▼
            Amazon S3 Bucket
      index.html / error.html
```

---

# AWS Services Used

- Amazon S3
- Amazon CloudFront
- AWS Lambda@Edge
- AWS IAM

---

# Project Features

- Static website hosting using Amazon S3
- Global content delivery using CloudFront
- HTTPS support with the default CloudFront certificate
- Automatic HTTP → HTTPS redirection
- CloudFront content caching
- Custom 404 error page
- Lambda@Edge viewer-response function
- Custom HTTP response header injection
- Public S3 bucket policy
- Cost-efficient serverless architecture

---

# Project Workflow

1. Created an Amazon S3 bucket.
2. Uploaded website files.
3. Enabled static website hosting.
4. Configured a public bucket policy.
5. Verified website accessibility.
6. Created a CloudFront distribution.
7. Configured HTTPS redirection.
8. Enabled optimized caching.
9. Developed a Lambda@Edge function.
10. Published Version 1 of the function.
11. Associated Lambda@Edge with CloudFront.
12. Verified edge execution using a custom response header.

---

# Folder Structure

```
06-serverless-static-website/
│
├── README.md
├── architecture.md
├── cleanup.md
├── cost-estimate.md
├── lambda/
│   └── index.mjs
├── src/
│   ├── index.html
│   └── error.html
├── screenshots/
└── README-assets/
```

---

# Screenshots

| Screenshot | Description |
|------------|-------------|
| 01 | S3 Bucket |
| 02 | Website Files |
| 03 | Static Website Hosting |
| 04 | Bucket Policy |
| 05 | Website via S3 |
| 06 | Custom Error Page |
| 07 | CloudFront Distribution |
| 08 | CloudFront Origin |
| 09 | Cache Behavior |
| 10 | Website via CloudFront |
| 11 | Lambda Function |
| 12 | Lambda Version |
| 13 | Lambda@Edge Association |
| 14 | Custom Response Header Verification |

---

# Lambda@Edge Example

The Lambda@Edge function executes at CloudFront edge locations and adds a custom HTTP response header before the response is sent to the client.

```javascript
export const handler = async (event) => {

    const response = event.Records[0].cf.response;

    response.headers['x-custom-header'] = [
        {
            key: 'X-Custom-Header',
            value: 'MyServerlessSite'
        }
    ];

    return response;
};
```

---

# Skills Demonstrated

- Amazon S3
- Amazon CloudFront
- Lambda@Edge
- IAM Roles
- Static Website Hosting
- CDN Configuration
- HTTPS Configuration
- Edge Computing
- HTTP Response Manipulation
- AWS Security
- Serverless Architecture

---

# Cost Optimization

This project was designed to minimize AWS costs by using:

- S3 Standard storage
- CloudFront Price Class (North America & Europe)
- Default CloudFront SSL certificate
- No Route 53
- No ACM custom certificate
- No AWS WAF
- No EC2 instances
- No RDS

Resources were deleted after successful testing.

---

# Learning Outcomes

Through this project I learned:

- How Amazon S3 hosts static websites
- How CloudFront accelerates global content delivery
- The difference between S3 website endpoints and S3 bucket origins
- How HTTPS is implemented using CloudFront
- How Lambda@Edge executes code at CloudFront edge locations
- Lambda versioning requirements for CloudFront
- IAM trust relationships required for Lambda@Edge
- Best practices for cleaning up AWS resources after deployment

---

# Future Improvements

- Add Route 53 custom domain
- Configure ACM SSL certificate
- Implement CloudFront Functions
- Add AWS WAF protection
- Introduce CI/CD with GitHub Actions
- Restrict S3 access using Origin Access Control (OAC)
- Deploy using AWS CDK or Terraform

---

# Author

**Swarali Chine**

Cloud | AWS | DevOps | AI Engineering
