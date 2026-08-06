# Testing Guide

## Overview

This guide verifies that the Cloud Travel Journal works correctly across React, Contentful, Amazon S3, and AWS Amplify.

## 1. Install Dependencies

From the project application folder:

```bash
cd app
npm install
```

Confirm the installation finishes without errors.

## 2. Start the Development Server

```bash
npm run dev
```

Open the Vite URL shown in Terminal, usually:

```text
http://localhost:5173
```

## 3. Test the User Interface

Confirm that the page displays:

- Cloud Travel Journal header
- Hero section
- Technology labels
- Three travel story cards
- Architecture section
- Footer

Check that the page remains readable at different browser widths.

## 4. Test Contentful Content

Confirm that the three published stories appear:

```text
A Quiet Morning Through Historic Kyoto
Finding Stillness in Yosemite Valley
Golden Hour Along the Aegean Sea
```

Verify that every card displays:

- Category
- Location
- Title
- Summary
- Read time
- Travel image

## 5. Test Dynamic CMS Updates

Open one story in Contentful.

Temporarily modify a safe text field, such as the summary.

Publish the changes.

Reload the React website.

Confirm that the updated text appears without modifying `App.jsx`.

After testing, restore the original value and publish it again if needed.

## 6. Test the Contentful API Failure State

Temporarily stop the development server.

Change one Contentful value in `app/.env` to an invalid placeholder.

Restart:

```bash
npm run dev
```

The application should display its Contentful configuration or loading error message.

Restore the correct value immediately afterward and restart Vite.

Never commit or share the real token.

## 7. Test Amazon S3 Object URLs

Copy each S3 object URL from Contentful and open it in a private browser window.

Test:

```text
kyoto.jpeg
yosemite.jpeg
santorini.jpeg
```

Each image should load without an AWS login.

## 8. Verify S3 Delivery in Chrome

Open the React site in Chrome.

Open:

```text
Chrome DevTools
→ Network
```

Select:

```text
Img
```

Make sure the network throttling dropdown says:

```text
No throttling
```

Reload the page.

Select an image request such as:

```text
kyoto.jpeg
```

Open:

```text
Headers
```

Verify that the Request URL points to the Amazon S3 bucket.

The response should normally show:

```text
200 OK
```

or:

```text
304 Not Modified
```

A `304` response means Chrome reused its cached copy.

## 9. Test the Image Fallback

Temporarily change one Contentful `Image URL` value to an invalid URL.

Publish the change and reload the website.

The corresponding card should use the configured fallback image rather than showing a permanently broken image.

Restore the correct S3 URL and publish the entry again.

## 10. Test the Production Build

From the `app` folder:

```bash
npm run build
```

Expected result:

```text
dist/
```

Vite should finish without build errors.

## 11. Preview the Production Build

Run:

```bash
npm run preview
```

Open the preview URL shown in Terminal.

Confirm that:

- Contentful stories load
- S3 images load
- Navigation links work
- Styling matches the development version
- Browser Console contains no unexpected errors

## 12. Test Navigation

Select:

```text
Stories
Architecture
About
```

Confirm that each link moves to the correct page section.

Also test:

```text
Explore stories
View architecture
```

## 13. Test Responsive Behavior

Use Chrome DevTools device mode.

Test at approximately:

```text
Mobile: 375px
Tablet: 768px
Desktop: 1440px
```

Verify:

- No horizontal scrolling
- Text remains readable
- Cards remain visible
- Images retain proper proportions
- Header navigation remains usable

## 14. Test the Amplify Deployment

After deploying, open the Amplify-generated HTTPS URL.

Verify:

- The site loads over HTTPS
- All three stories appear
- All S3 images appear
- No Contentful configuration error is shown
- The browser Console has no unexpected errors

## 15. Test Amplify Continuous Deployment

Make a small safe documentation or UI text change.

Commit and push it:

```bash
git add \
02-serverless-and-modern-web/04-jamstack-site-with-aws

git commit -m "Test JAMstack continuous deployment"

git pull --rebase origin main
git push origin main
```

Confirm that Amplify automatically starts a new build and publishes the change.

## 16. Final Test Checklist

- [ ] Local development server starts
- [ ] Three Contentful stories load
- [ ] Story data is not hardcoded in `App.jsx`
- [ ] S3 images load
- [ ] Network panel proves S3 delivery
- [ ] Loading state works
- [ ] Error state works
- [ ] Image fallback works
- [ ] Navigation links work
- [ ] Mobile layout works
- [ ] Tablet layout works
- [ ] Desktop layout works
- [ ] Production build succeeds
- [ ] Production preview succeeds
- [ ] Amplify deployment succeeds
- [ ] Live site uses HTTPS
- [ ] Amplify continuous deployment works
- [ ] No secret values are visible in GitHub or screenshots