# Cloud Travel Journal – JAMstack on AWS

A modern JAMstack travel website built with **React**, **Vite**, **Contentful**, **Amazon S3**, and **AWS Amplify Hosting**.

---

# Project Overview

Cloud Travel Journal demonstrates how modern cloud-native websites separate **content management**, **media storage**, **application code**, and **hosting**.

Instead of hardcoding content inside React components, travel stories are managed in **Contentful**, while images are stored in **Amazon S3**. The frontend retrieves published content dynamically through the Contentful Delivery API and renders reusable travel cards.

The application is deployed using **AWS Amplify**, which automatically builds and hosts the website from GitHub.

---

# Architecture

```text
                Content Editor
                      │
                      ▼
             Contentful Headless CMS
                      │
             Content Delivery API
                      │
                      ▼
              React + Vite Frontend
                      │
          S3 Image URLs from Contentful
                      │
                      ▼
                 Amazon S3 Bucket
                      │
                      ▼
             AWS Amplify Hosting
                      │
                      ▼
              Public HTTPS Website
```

---

# Technologies Used

- React
- Vite
- JavaScript (ES6)
- CSS3
- Contentful Headless CMS
- Amazon S3
- AWS Amplify Hosting
- GitHub
- REST APIs

---

# Features

- Dynamic content managed through Contentful
- Travel images hosted in Amazon S3
- Responsive React frontend
- Loading, empty and error states
- Image fallback support
- Environment variable configuration
- Continuous deployment with AWS Amplify
- Secure HTTPS hosting

---

# Project Structure

```text
04-jamstack-site-with-aws
│
├── app
│   ├── public
│   ├── src
│   │   ├── services
│   │   │   └── contentful.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── screenshots
├── docs
├── diagrams
├── architecture.md
├── cleanup.md
├── cost-estimate.md
└── README.md
```

---

# Contentful Content Model

Content Type

```
Travel Story
```

Fields

| Field | Type |
|--------|------|
| Title | Short Text |
| Location | Short Text |
| Category | Short Text |
| Summary | Long Text |
| Image URL | Short Text |

---

# Amazon S3 Structure

```text
travel-images/
├── kyoto.jpeg
├── yosemite.jpeg
└── santorini.jpeg
```

The S3 bucket stores only static travel images.

Contentful stores the public S3 object URL for each story.

---

# Environment Variables

Create:

```text
app/.env
```

```env
VITE_CONTENTFUL_SPACE_ID=YOUR_SPACE_ID
VITE_CONTENTFUL_ACCESS_TOKEN=YOUR_CONTENT_DELIVERY_API_TOKEN
VITE_CONTENTFUL_ENVIRONMENT=master
```

The real `.env` file should **never** be committed to GitHub.

---

# Running Locally

Install dependencies

```bash
cd app
npm install
```

Run the development server

```bash
npm run dev
```

Open

```
http://localhost:5173
```

---

# Production Build

```bash
npm run build
```

Preview locally

```bash
npm run preview
```

---

# AWS Amplify Deployment

Application Root

```text
02-serverless-and-modern-web/04-jamstack-site-with-aws/app
```

Build Command

```bash
npm run build
```

Build Output

```text
dist
```

Environment Variables

- VITE_CONTENTFUL_SPACE_ID
- VITE_CONTENTFUL_ACCESS_TOKEN
- VITE_CONTENTFUL_ENVIRONMENT

---

# Data Flow

```text
Content Editor
      │
      ▼
Contentful CMS
      │
      ▼
React Application
      │
      ▼
Reads Image URL
      │
      ▼
Amazon S3
      │
      ▼
Browser Displays Image
```

---

# Security

- Contentful credentials are stored as environment variables.
- `.env` is excluded from Git.
- Amazon S3 allows public read access only for image objects.
- No AWS credentials are exposed in the frontend.
- Website is served over HTTPS using AWS Amplify.

---

# Screenshots

The project includes screenshots for:

- Local React application
- Contentful content model
- Published Contentful entries
- Amazon S3 bucket
- Uploaded travel images
- React loading Contentful content
- React loading S3 images
- Browser Network tab showing S3 requests
- AWS Amplify deployment
- Live production website

---

# Cost Estimate

| Service | Estimated Cost |
|----------|----------------|
| Contentful | Free |
| Amazon S3 | Less than $0.10 |
| AWS Amplify | $0–$1 |
| GitHub | Free |

Estimated total project cost:

**Approximately $0–$1**

---

# Cleanup

After completing the project:

- Delete the AWS Amplify application.
- Delete the Amazon S3 bucket.
- Delete the Contentful entries.
- Remove unused API keys.
- Delete the local `.env` file if no longer needed.

---

# Learning Outcomes

This project demonstrates:

- JAMstack architecture
- Headless CMS integration
- React API consumption
- Amazon S3 object hosting
- Environment variable management
- AWS Amplify CI/CD
- Modern cloud-native frontend deployment