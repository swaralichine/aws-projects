# Cleanup Guide

This document explains the recommended order for deleting all AWS resources created for the serverless static website project.

The deletion order matters because Lambda@Edge functions are replicated globally and CloudFront resources have dependencies that must be removed first.

---

# Recommended Deletion Order

## 1. Remove the Lambda@Edge Association

Go to:

```text
CloudFront
→ Distributions
→ Select the distribution
→ Behaviors
→ Default (*)
→ Edit
```

Under **Function associations**, remove the Lambda@Edge function from:

```text
Viewer response
```

Set it to:

```text
No association
```

Save the behavior and wait until the CloudFront distribution finishes deploying the change.

---

## 2. Disable the CloudFront Distribution

Go to:

```text
CloudFront
→ Distributions
```

Select the distribution and choose:

```text
Disable
```

Wait until the distribution is fully disabled and no longer shows `Deploying`.

---

## 3. Delete the CloudFront Distribution

After the distribution is disabled, select it and choose:

```text
Delete
```

CloudFront must be disabled before it can be deleted.

---

## 4. Delete the Lambda@Edge Function

Switch the AWS Region to:

```text
US East (N. Virginia)
us-east-1
```

Go to:

```text
Lambda
→ Functions
→ project1-lambda-edge-header
```

Choose:

```text
Actions
→ Delete function
```

Lambda@Edge functions may not delete immediately because AWS must first remove replicated copies from edge locations.

If deletion fails with a replicated-function error:

- Wait for AWS to finish removing the replicas.
- Retry after several minutes or a few hours.
- Do not attempt to manually delete Lambda@Edge replicas.

---

## 5. Delete the Lambda Execution Role

Only delete the IAM role after the Lambda function has been successfully removed.

Go to:

```text
IAM
→ Roles
```

Delete:

```text
project1-lambda-edge-header-role
```

Do not delete the role while the Lambda function or replicas still exist.

---

## 6. Delete CloudWatch Logs

Go to:

```text
CloudWatch
→ Log groups
```

Search for:

```text
project1-lambda-edge-header
```

Delete any related log group, such as:

```text
/aws/lambda/project1-lambda-edge-header
```

Lambda@Edge logs can be created in AWS Regions where the function executes, so additional regional log groups may exist.

---

## 7. Empty the S3 Bucket

Go to:

```text
S3
→ Buckets
→ swarali-serverless-edge-site-2026
```

Choose:

```text
Empty
```

Confirm the permanent deletion of all objects.

The bucket must be empty before it can be deleted.

---

## 8. Delete the S3 Bucket

Return to the S3 bucket list.

Select:

```text
swarali-serverless-edge-site-2026
```

Choose:

```text
Delete
```

Enter the full bucket name when prompted and confirm the deletion.

---

# Resources Not Used

The following services were not configured for this project and therefore do not require cleanup:

```text
Route 53
AWS Certificate Manager custom certificate
AWS WAF
CloudFront Functions
CloudFront access logging
Custom domain
```

---

# Final Verification

Confirm the following:

## CloudFront

```text
Distribution deleted
```

## Lambda in us-east-1

```text
project1-lambda-edge-header deleted
```

## IAM

```text
Lambda execution role deleted
```

## Amazon S3

```text
swarali-serverless-edge-site-2026 deleted
```

## CloudWatch

```text
Related Lambda log groups deleted
```

---

# Common Cleanup Issues

## Lambda Function Cannot Be Deleted

Error:

```text
Lambda was unable to delete the function because it is a replicated function.
```

Cause:

```text
Lambda@Edge replicas are still being removed from CloudFront edge locations.
```

Resolution:

```text
Wait and retry later.
```

There is no force-delete option for Lambda@Edge replicas.

---

## CloudFront Distribution Cannot Be Deleted

Verify that:

- The Lambda@Edge association has been removed.
- The latest CloudFront deployment has completed.
- The distribution is disabled.
- The disabled state has finished propagating.

---

## S3 Bucket Cannot Be Deleted

Verify that:

- All objects have been removed.
- All object versions have been removed if versioning was enabled.
- Any delete markers have been removed.

---

# Cleanup Summary

```text
1. Remove Lambda@Edge association
2. Wait for CloudFront deployment
3. Disable CloudFront distribution
4. Delete CloudFront distribution
5. Delete Lambda function after replica cleanup
6. Delete Lambda IAM role
7. Delete CloudWatch log groups
8. Empty the S3 bucket
9. Delete the S3 bucket
10. Verify no project resources remain
```

---

# Conclusion

Following this order prevents dependency errors and ensures that all billable resources are removed safely after testing.