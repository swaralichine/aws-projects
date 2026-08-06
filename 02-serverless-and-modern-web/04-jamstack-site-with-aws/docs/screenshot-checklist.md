# Screenshot Checklist

Take the following screenshots before deleting any cloud resources.

---

# Local Development

## 01-local-react-app.png

Show:

- React application running locally
- Hero section
- Three travel story cards

Purpose:

Demonstrates the application running during development.

---

## 02-contentful-content-model.png

Show:

Contentful

```
Content model
→ Travel Story
```

Visible fields:

- Title
- Location
- Category
- Summary
- Image URL

Purpose:

Demonstrates creation of the headless CMS schema.

---

## 03-contentful-published-entry.png

Show one published entry.

Example:

```
A Quiet Morning Through Historic Kyoto
```

Visible:

- Title
- Summary
- Image URL
- Publish status

Purpose:

Shows that the CMS stores structured content.

---

# Amazon S3

## 04-s3-bucket.png

Show:

```
Amazon S3
```

Bucket:

```
swarali-cloud-travel-journal-images-2026
```

Purpose:

Shows the project storage bucket.

---

## 05-s3-images.png

Open:

```
travel-images/
```

Visible:

- kyoto.jpeg
- yosemite.jpeg
- santorini.jpeg

Purpose:

Shows the uploaded image objects.

---

# React Application

## 06-jamstack-site-s3-images.png

Show:

- Entire website
- Three travel stories
- Images loaded successfully

Purpose:

Shows the complete application using Contentful data and S3 images.

---

## 07-s3-image-network-request.png

Open Chrome DevTools.

```
Network
→ Img
```

Reload the page.

Click:

```
kyoto.jpeg
```

Visible:

- Request URL
- Status Code (200 or 304)
- Amazon S3 domain

Purpose:

Proves images are served directly from Amazon S3.

---

# AWS Amplify

## 08-amplify-build-success.png

Show:

```
AWS Amplify
```

Build status:

```
Successful
```

Purpose:

Demonstrates successful deployment.

---

## 09-live-jamstack-site.png

Open the Amplify URL.

Show:

- Hero section
- Story cards
- Images
- HTTPS lock icon

Purpose:

Shows the production deployment.

---

# GitHub

## 10-github-repository.png

Show:

Repository root.

Visible:

- README.md
- app/
- docs/
- screenshots/

Purpose:

Shows project organization.

---

# Recommended Folder Structure

```
screenshots/

01-local-react-app.png
02-contentful-content-model.png
03-contentful-published-entry.png
04-s3-bucket.png
05-s3-images.png
06-jamstack-site-s3-images.png
07-s3-image-network-request.png
08-amplify-build-success.png
09-live-jamstack-site.png
10-github-repository.png
```

---

# Final Checklist

- [ ] Local React application
- [ ] Contentful content model
- [ ] Published Contentful entry
- [ ] Amazon S3 bucket
- [ ] Amazon S3 images
- [ ] Website loading S3 images
- [ ] Network request showing S3
- [ ] Amplify successful build
- [ ] Live HTTPS website
- [ ] GitHub repository

**Important:** Before taking screenshots, verify that no secrets (Contentful API tokens, `.env` contents, AWS credentials, or personal information) are visible.