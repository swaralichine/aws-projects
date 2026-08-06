# Architecture — Cloud Travel Journal

## Overview

Cloud Travel Journal uses a JAMstack architecture that separates content management, frontend presentation, media storage, source control, and hosting.

The main components are:

- **Contentful** for structured travel content
- **React and Vite** for the frontend
- **Amazon S3** for travel images
- **GitHub** for source control
- **AWS Amplify Hosting** for CI/CD and HTTPS hosting

## Architecture Diagram

```text
                 Content Editor
                       │
                       │ Creates and publishes stories
                       ▼
             ┌─────────────────────┐
             │   Contentful CMS    │
             │─────────────────────│
             │ Title               │
             │ Location            │
             │ Category            │
             │ Summary             │
             │ Amazon S3 Image URL │
             └──────────┬──────────┘
                        │
                        │ Content Delivery API
                        ▼
             ┌─────────────────────┐
             │ React + Vite App    │
             │─────────────────────│
             │ Fetch content       │
             │ Format entries      │
             │ Render story cards  │
             │ Handle UI states    │
             └──────────┬──────────┘
                        │
                        │ Browser requests image URLs
                        ▼
             ┌─────────────────────┐
             │     Amazon S3       │
             │─────────────────────│
             │ kyoto.jpeg          │
             │ yosemite.jpeg       │
             │ santorini.jpeg      │
             └─────────────────────┘


Developer
    │
    │ git push
    ▼
GitHub Repository
    │
    │ Automatic deployment
    ▼
AWS Amplify Hosting
    │
    ▼
Public HTTPS Website
```

## Component Responsibilities

### Contentful

Contentful acts as the project's headless CMS.

It stores the structured content for each travel story:

- Title
- Location
- Category
- Summary
- Amazon S3 image URL

Contentful does not control the website's visual layout. It exposes published content through its Content Delivery API.

This allows editors to update or publish travel stories without changing the React source code.

### React

React renders the website interface.

The application:

1. Requests published entries from Contentful.
2. Converts each Contentful entry into frontend data.
3. Displays the stories using reusable cards.
4. Loads the corresponding images from Amazon S3.
5. Displays loading, empty, and error states.
6. Uses fallback images when an image URL is missing or unavailable.

### Vite

Vite provides:

- The local development server
- Environment-variable support
- JavaScript and CSS bundling
- Production build generation
- The `dist` deployment directory

### Amazon S3

Amazon S3 stores the travel images.

```text
travel-images/
├── kyoto.jpeg
├── yosemite.jpeg
└── santorini.jpeg
```

Contentful stores the public S3 URL associated with each image.

Example:

```text
https://BUCKET-NAME.s3.us-west-2.amazonaws.com/travel-images/kyoto.jpeg
```

The browser downloads the image directly from Amazon S3 after React renders the story card.

### GitHub

GitHub stores:

- React source code
- Vite configuration
- Documentation
- Screenshots
- Package metadata
- Amplify deployment configuration

The real `.env` file is excluded from Git.

### AWS Amplify Hosting

AWS Amplify connects to the GitHub repository and provides continuous deployment.

When code is pushed to the `main` branch, Amplify:

1. Downloads the source code.
2. Uses the configured monorepo application root.
3. Installs Node.js dependencies.
4. Runs the Vite production build.
5. Publishes the generated `dist` directory.
6. Serves the website over HTTPS.

## Runtime Data Flow

```text
1. User opens the AWS Amplify website
2. Amplify returns the React application
3. React calls the Contentful Delivery API
4. Contentful returns published Travel Story entries
5. React renders the travel cards
6. React reads the Image URL stored in each entry
7. The browser requests each image from Amazon S3
8. Amazon S3 returns the image
9. The browser displays the complete card
```

## Contentful API Integration

The Contentful client is configured in:

```text
app/src/services/contentful.js
```

The service retrieves published entries using:

```javascript
export async function getTravelStories() {
  const response = await client.getEntries({
    content_type: 'travelStory',
    order: ['sys.createdAt'],
  })

  return response.items
}
```

The required environment variables are:

```env
VITE_CONTENTFUL_SPACE_ID=your_space_id
VITE_CONTENTFUL_ACCESS_TOKEN=your_content_delivery_api_token
VITE_CONTENTFUL_ENVIRONMENT=master
```

## Content Model

Content type:

```text
Travel Story
```

API identifier:

```text
travelStory
```

Fields:

| Field | Field ID | Type |
|---|---|---|
| Title | `title` | Short text |
| Location | `location` | Short text |
| Category | `category` | Short text |
| Summary | `summary` | Long text |
| Image URL | `imageUrl` | Short text |

## S3 Access Design

The S3 bucket uses a bucket policy that permits public read access only to objects inside:

```text
travel-images/*
```

The policy grants:

```text
s3:GetObject
```

It does not grant:

- `s3:PutObject`
- `s3:DeleteObject`
- `s3:ListBucket`
- Bucket administration permissions

The public can display the images but cannot upload, edit, delete, or list objects.

## Deployment Flow

```text
Developer changes project files
              │
              ▼
       Push to GitHub
              │
              ▼
Amplify detects the new commit
              │
              ▼
       Run npm ci
              │
              ▼
    Run npm run build
              │
              ▼
     Generate Vite dist
              │
              ▼
Amplify publishes the website
```

## Monorepo Application Root

The project is stored inside a larger AWS projects repository.

Amplify must use this application root:

```text
02-serverless-and-modern-web/04-jamstack-site-with-aws/app
```

## Amplify Build Configuration

```yaml
version: 1
applications:
  - frontend:
      phases:
        preBuild:
          commands:
            - npm ci --cache .npm --prefer-offline
        build:
          commands:
            - npm run build
      artifacts:
        baseDirectory: dist
        files:
          - '**/*'
      cache:
        paths:
          - .npm/**/*
    appRoot: 02-serverless-and-modern-web/04-jamstack-site-with-aws/app
```

## Security Considerations

- Contentful credentials are loaded through environment variables.
- The real `.env` file is excluded from GitHub.
- Production variables are configured securely in AWS Amplify.
- No AWS access keys are included in the frontend.
- S3 public access is limited to read-only image retrieval.
- The bucket policy applies only to the image prefix.
- AWS Amplify serves the application over HTTPS.