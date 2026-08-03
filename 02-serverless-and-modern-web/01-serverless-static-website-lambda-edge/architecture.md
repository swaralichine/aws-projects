# Architecture

## Solution Overview

This project demonstrates a serverless static website architecture using Amazon S3, Amazon CloudFront, and Lambda@Edge.

The website is hosted in Amazon S3 and distributed globally through Amazon CloudFront. Lambda@Edge executes code at CloudFront edge locations before the response reaches the user, enabling response customization without modifying the origin.

---

# Architecture Diagram

```
                    User
                      │
                 HTTPS Request
                      │
                      ▼
          Amazon CloudFront CDN
                      │
      Viewer Response Event
          (Lambda@Edge)
                      │
                      ▼
            Amazon S3 Bucket
        index.html / error.html
```

---

# Architecture Components

## Amazon S3

Amazon S3 acts as the origin for the website.

Responsibilities:

- Stores website assets
- Hosts HTML pages
- Stores images, CSS and JavaScript
- Provides static website content

Objects stored include:

- index.html
- error.html

---

## Amazon CloudFront

CloudFront serves as the global Content Delivery Network (CDN).

Responsibilities:

- Delivers content from the nearest edge location
- Provides HTTPS using the default CloudFront certificate
- Redirects HTTP requests to HTTPS
- Caches static content
- Reduces latency
- Improves user experience

Configuration used:

- Origin: Amazon S3 Bucket
- Viewer Protocol Policy: Redirect HTTP to HTTPS
- Cache Policy: CachingOptimized
- Allowed Methods: GET, HEAD

---

## Lambda@Edge

Lambda@Edge executes code at CloudFront edge locations.

In this project, the function executes during the **Viewer Response** event.

Responsibilities:

- Modifies HTTP responses
- Adds a custom response header
- Demonstrates edge computing

Example response header:

```
X-Custom-Header: MyServerlessSite
```

---

## IAM

IAM provides secure permissions for Lambda execution.

The execution role includes:

- Basic Lambda execution permissions
- Trust relationship for:
  - lambda.amazonaws.com
  - edgelambda.amazonaws.com

---

# Request Flow

## Step 1

The user opens the website.

```
https://xxxxxxxx.cloudfront.net
```

---

## Step 2

CloudFront receives the HTTPS request.

---

## Step 3

If the object is cached:

- CloudFront immediately returns the cached response.

Otherwise:

- CloudFront requests the object from Amazon S3.

---

## Step 4

Amazon S3 returns the requested object.

Example:

```
index.html
```

---

## Step 5

Before the response is returned to the browser, CloudFront invokes Lambda@Edge.

Lambda modifies the HTTP response by adding:

```
X-Custom-Header: MyServerlessSite
```

---

## Step 6

CloudFront returns the modified response to the browser over HTTPS.

---

# Security Considerations

The project uses:

- HTTPS through CloudFront
- IAM execution roles
- S3 bucket policy
- CloudFront caching

For simplicity and learning purposes, the S3 bucket is publicly accessible.

In production, Amazon S3 would typically remain private and CloudFront would access it using **Origin Access Control (OAC)**.

---

# Why Lambda@Edge?

Lambda@Edge allows custom code to execute closer to users.

Common production use cases include:

- URL rewriting
- Authentication
- Geo-based redirection
- Security headers
- A/B testing
- Dynamic content personalization

This project demonstrates Lambda@Edge by injecting a custom HTTP response header into every response.

---

# Benefits of This Architecture

- Fully serverless
- Highly scalable
- Global content delivery
- Low operational overhead
- HTTPS enabled
- Cost-efficient
- Demonstrates edge computing concepts

---

# Limitations

This implementation intentionally keeps the architecture simple.

Not included:

- Custom domain
- Route 53
- AWS WAF
- ACM custom certificate
- Origin Access Control
- CI/CD pipeline

These can be added as future enhancements.