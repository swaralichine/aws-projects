# Deployment Guide

## Overview

This project is deployed using **AWS Amplify Hosting**.

AWS Amplify automatically builds and deploys the React application whenever changes are pushed to the GitHub repository.

---

# Prerequisites

Before deployment, ensure the following resources are available:

- GitHub repository
- AWS account
- AWS Amplify
- Contentful Space
- Amazon S3 bucket
- Published Contentful entries

---

# Step 1 — Push the Project to GitHub

Commit the latest changes.

```bash
git add .
git commit -m "Complete JAMstack project"
git push origin main
```

---

# Step 2 — Create an Amplify Application

Open:

```
AWS Console
→ AWS Amplify
→ New App
→ Host Web App
```

Choose:

```
GitHub
```

Authorize GitHub if prompted.

---

# Step 3 — Select Repository

Choose:

```
Repository:
aws-projects
```

Branch:

```
main
```

---

# Step 4 — Configure the Monorepo

Application Root

```
02-serverless-and-modern-web/04-jamstack-site-with-aws/app
```

This tells Amplify where the React application is located.

---

# Step 5 — Build Settings

Build command

```bash
npm run build
```

Output directory

```
dist
```

Amplify automatically generates the build specification for Vite.

---

# Step 6 — Configure Environment Variables

Add the following variables inside Amplify.

```
VITE_CONTENTFUL_SPACE_ID
```

```
VITE_CONTENTFUL_ACCESS_TOKEN
```

```
VITE_CONTENTFUL_ENVIRONMENT
```

Do **not** include quotation marks.

---

# Step 7 — Start Deployment

Choose

```
Save and Deploy
```

Amplify performs:

1. Downloads the repository
2. Installs dependencies
3. Builds the React application
4. Uploads the production files
5. Publishes the website

---

# Step 8 — Verify Deployment

After deployment finishes verify:

- Build status shows **Successful**
- Website loads correctly
- Travel stories appear
- Images load from Amazon S3
- HTTPS is enabled

---

# Step 9 — Verify Content Updates

Publish a new Travel Story inside Contentful.

Reload the website.

The new content should appear without changing the React source code.

---

# Step 10 — Continuous Deployment

Whenever changes are pushed to GitHub:

```bash
git add .
git commit -m "Update project"
git push origin main
```

Amplify automatically:

- Detects the commit
- Starts a new build
- Deploys the updated website

No manual upload is required.

---

# Deployment Checklist

- GitHub repository connected
- Correct monorepo app root configured
- Build succeeds
- Environment variables added
- Website loads successfully
- Content retrieved from Contentful
- Images loaded from Amazon S3
- HTTPS enabled
- Automatic deployments verified