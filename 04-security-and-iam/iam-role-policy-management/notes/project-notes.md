# Project Notes

## Goal
Demonstrate least-privilege access using an EC2 IAM role and a custom S3 read-only policy.

## What I Built
- Created an S3 bucket for testing
- Created a custom IAM policy with:
  - s3:ListBucket
  - s3:GetObject
- Created an EC2 IAM role
- Attached the role to an EC2 instance
- Verified EC2 could list and download objects from S3
- Verified EC2 could not delete objects from S3

## Key Concepts Learned
- IAM permissions policies
- IAM trust policies
- EC2 instance profiles
- AWS STS temporary credentials
- Least-privilege access
- Allowed vs denied IAM actions

## Cleanup
Deleted:
- EC2 instance
- S3 bucket
- IAM instance profile
- IAM role
- Custom IAM policy