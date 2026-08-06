# Cost Estimate — Cloud Travel Journal

## Overview

Cloud Travel Journal is a small portfolio project designed to remain within free-tier allowances or incur only minimal cloud charges.

The project uses:

- Contentful
- Amazon S3
- AWS Amplify Hosting
- GitHub

Actual costs depend on account eligibility, AWS Region, website traffic, build frequency, file sizes, API usage, and data transfer.

## Estimated Cost Summary

| Service | Expected Cost |
|---|---:|
| Contentful | $0 |
| Amazon S3 | Less than $0.10 |
| AWS Amplify Hosting | $0–$1 |
| GitHub | $0 |
| **Estimated total** | **Approximately $0–$1** |

## Contentful

Contentful is used for:

- One space
- One content type
- Three published travel stories
- Content Delivery API requests

The project can operate within Contentful's free plan for development and portfolio use.

Estimated cost:

```text
$0
```

## Amazon S3

Amazon S3 stores three travel images:

```text
travel-images/
├── kyoto.jpeg
├── yosemite.jpeg
└── santorini.jpeg
```

Potential S3 charges include:

- Object storage
- GET requests
- Internet data transfer
- Additional requests made while testing

Because the project stores only three compressed images and receives limited portfolio traffic, the expected cost is very small.

Estimated development and testing cost:

```text
Less than $0.10
```

## AWS Amplify Hosting

AWS Amplify provides:

- GitHub integration
- Automated frontend builds
- Deployment artifact storage
- HTTPS hosting
- Website data transfer

Potential charges include:

- Build minutes
- Stored deployment artifacts
- Requests
- Data transfer

For a small React application with a limited number of builds and visitors, the expected cost should remain low and may fall within available free-tier allowances.

Estimated cost:

```text
$0–$1
```

## GitHub

GitHub stores the project source code and documentation.

The project uses a standard public repository.

Estimated cost:

```text
$0
```

## Cost-Control Measures

The following controls help keep the project inexpensive:

- Store only required images in S3.
- Compress images before uploading.
- Avoid unnecessary Amplify deployments.
- Test the production build locally before pushing.
- Delete unused Amplify branches and deployments.
- Remove old S3 objects.
- Delete cloud resources when the project is no longer needed.
- Review AWS Billing and Cost Management.
- Configure an AWS Budget alert when appropriate.

## Resources That May Generate AWS Charges

The following resources should be reviewed during cleanup:

```text
Amazon S3
└── swarali-cloud-travel-journal-images-2026

AWS Amplify
└── Cloud Travel Journal application
```

## Final Estimate

For normal development, testing, screenshots, and limited portfolio traffic:

```text
Approximately $0–$1 total
```

This estimate is not a billing guarantee. Actual costs depend on service usage and account-specific pricing eligibility.