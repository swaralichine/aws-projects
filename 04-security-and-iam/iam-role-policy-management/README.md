# AWS IAM Role & Policy Management

## Overview

This project demonstrates how to securely provide an Amazon EC2 instance with
read-only access to a specific Amazon S3 bucket using AWS Identity and Access
Management (IAM).

The project follows the principle of least privilege by granting only the
permissions required to list and retrieve objects from the designated S3 bucket.

No AWS access keys are stored on the EC2 instance. Instead, the instance
receives temporary credentials through an IAM role.

## Architecture

EC2 Instance
      |
      v
IAM Role
SwaraliEC2S3ReadOnlyRole
      |
      v
Custom IAM Policy
SwaraliS3ReadOnlyDemoPolicy
      |
      v
S3 Bucket
swarali-iam-readonly-demo-2026

## AWS Services Used

- AWS Identity and Access Management (IAM)
- Amazon EC2
- Amazon S3
- AWS Security Token Service (STS)

## IAM Permissions

The custom IAM policy allows:

- `s3:ListBucket`
- `s3:GetObject`

The policy intentionally does NOT allow:

- `s3:DeleteObject`
- `s3:PutObject`

This implements least-privilege access.

## IAM Trust Relationship

The IAM role trusts the EC2 service:

`ec2.amazonaws.com`

This allows the EC2 instance to assume the IAM role using AWS STS and receive
temporary AWS credentials.

## Testing

### Test 1 — Verify IAM Role

The EC2 instance was verified using:

`aws sts get-caller-identity`

The output confirmed that the instance was operating as the
`SwaraliEC2S3ReadOnlyRole`.

### Test 2 — List S3 Objects

`aws s3 ls s3://swarali-iam-readonly-demo-2026`

Result: SUCCESS

The EC2 instance successfully listed `yosemite.jpeg`.

### Test 3 — Download S3 Object

`aws s3 cp s3://swarali-iam-readonly-demo-2026/yosemite.jpeg .`

Result: SUCCESS

This confirmed that `s3:GetObject` permission was working.

### Test 4 — Attempt Unauthorized Delete

`aws s3 rm s3://swarali-iam-readonly-demo-2026/yosemite.jpeg`

Result: ACCESS DENIED

This was the expected result because the IAM policy does not grant
`s3:DeleteObject`.

## Security Concepts Demonstrated

- IAM roles
- IAM policies
- Trust policies
- Least-privilege access
- Resource-level S3 permissions
- Temporary AWS credentials
- AWS STS role assumption
- EC2 instance profiles
- Allowed vs denied IAM actions

## Cleanup

After completing the project, the EC2 instance, S3 bucket, IAM role, instance
profile, and custom IAM policy were removed to avoid unnecessary AWS resources.

## Key Takeaway

IAM permissions determine what an identity can do, while a role's trust policy
determines who or what can assume that role.

Using IAM roles for EC2 avoids storing long-term AWS credentials on instances
and provides a more secure mechanism for granting AWS resource access.