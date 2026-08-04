# Cloud Task Manager – Progressive Web App with AWS Amplify

A cloud-native Progressive Web Application (PWA) built with React and Vite and deployed using AWS Amplify Hosting. This project demonstrates modern frontend deployment, Continuous Integration/Continuous Deployment (CI/CD), and Progressive Web App capabilities including offline support and installability.

---

## Architecture

```
Developer
    │
    ▼
React + Vite Application
    │
    ▼
GitHub Repository
    │
    ▼
AWS Amplify CI/CD
    │
    ▼
AWS Amplify Hosting
    │
    ▼
Users
```

---

## Features

- Progressive Web App (PWA)
- Installable application
- Offline support using Service Worker
- Automatic deployments with GitHub
- Responsive UI
- HTTPS hosting
- React + Vite

---

## AWS Services

- AWS Amplify Hosting

---

## Technologies

- React
- Vite
- JavaScript
- HTML
- CSS
- vite-plugin-pwa
- Git
- GitHub

---

## Project Structure

```
03-progressive-web-app-amplify/
│
├── app/
├── screenshots/
├── diagrams/
├── docs/
├── README.md
├── architecture.md
├── cleanup.md
└── cost-estimate.md
```

---

## Local Development

```bash
cd app
npm install
npm run dev
```

Production Preview

```bash
npm run build
npm run preview
```

---

## Screenshots

- Local Application
- Production Preview
- PWA Manifest
- Service Worker
- Offline Mode
- AWS Amplify Deployment
- Live Website

---

## Learning Outcomes

- Build React applications
- Configure Progressive Web Apps
- Configure Service Workers
- Deploy applications with AWS Amplify
- Configure CI/CD with GitHub
- Host secure web applications on AWS

---

## Future Improvements

- Authentication with Amazon Cognito
- Backend API using AWS Lambda
- DynamoDB integration
- Push Notifications
- Custom Domain
- CloudFront Analytics