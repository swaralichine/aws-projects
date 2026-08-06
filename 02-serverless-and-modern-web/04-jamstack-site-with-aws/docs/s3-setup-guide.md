# Amazon S3 Setup Guide

## Overview

Amazon S3 stores the travel images used by the Cloud Travel Journal.

Contentful stores the public URL for each S3 object, and the React application uses those URLs when rendering the travel cards.

## Create the Bucket

Open:

```text
AWS Console
→ Amazon S3
→ Buckets
→ Create bucket
```

Use:

```text
Bucket type: General purpose
Bucket name: swarali-cloud-travel-journal-images-2026
AWS Region: US West (Oregon) — us-west-2
```

S3 bucket names must be globally unique. Add a numeric suffix when the suggested name is unavailable.

## Bucket Settings

Keep:

```text
Object Ownership:
ACLs disabled
Bucket owner enforced
```

Initially keep:

```text
Block all public access:
Enabled
```

Leave bucket versioning disabled for this small project.

Use the default server-side encryption:

```text
SSE-S3
```

Create the bucket.

## Create the Image Prefix

Open the bucket and choose:

```text
Create folder
```

Folder name:

```text
travel-images
```

The bucket structure should initially look like:

```text
swarali-cloud-travel-journal-images-2026/
└── travel-images/
```

## Upload the Images

Open:

```text
travel-images/
```

Choose:

```text
Upload
→ Add files
```

Upload:

```text
kyoto.jpeg
yosemite.jpeg
santorini.jpeg
```

Use the actual `.jpg` extension instead when your downloaded files use `.jpg`.

The final structure should resemble:

```text
swarali-cloud-travel-journal-images-2026/
└── travel-images/
    ├── kyoto.jpeg
    ├── yosemite.jpeg
    └── santorini.jpeg
```

## Configure Public Read Access

The browser must be able to retrieve the images without AWS authentication.

Open:

```text
Bucket
→ Permissions
→ Block public access
→ Edit
```

Disable:

```text
Block all public access
```

Acknowledge the warning and save the changes.

Disabling this setting does not automatically make every object public. It allows the restricted bucket policy added next to take effect.

## Add the Bucket Policy

Still under:

```text
Permissions
→ Bucket policy
→ Edit
```

Paste:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowPublicReadForTravelImages",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::swarali-cloud-travel-journal-images-2026/travel-images/*"
    }
  ]
}
```

Replace the bucket name when your actual bucket has a different name.

This policy grants only:

```text
s3:GetObject
```

for objects under:

```text
travel-images/*
```

It does not grant:

- Object uploads
- Object modifications
- Object deletion
- Bucket listing
- Bucket administration

## Test an Object URL

Open:

```text
Objects
→ travel-images
→ kyoto.jpeg
```

Copy the Object URL.

It should resemble:

```text
https://swarali-cloud-travel-journal-images-2026.s3.us-west-2.amazonaws.com/travel-images/kyoto.jpeg
```

Open the URL in a private or incognito browser window.

The image should load without requiring an AWS login.

Repeat the test for:

```text
yosemite.jpeg
santorini.jpeg
```

## Add the URLs to Contentful

Open the corresponding Contentful entry and paste the correct object URL into the `Image URL` field.

Use:

```text
Kyoto story
→ kyoto.jpeg URL

Yosemite story
→ yosemite.jpeg URL

Santorini story
→ santorini.jpeg URL
```

Publish the changes for all three entries.

## Verify the React Application

Start the application:

```bash
cd app
npm run dev
```

Open:

```text
http://localhost:5173
```

Confirm that all three S3 images appear.

## Verify Using Chrome DevTools

Open:

```text
Chrome DevTools
→ Network
→ Img
```

Reload the page.

Select an image request such as:

```text
kyoto.jpeg
```

Under `Headers`, confirm:

```text
Request URL:
https://YOUR-BUCKET-NAME.s3.us-west-2.amazonaws.com/travel-images/kyoto.jpeg
```

The status code may be:

```text
200 OK
```

or:

```text
304 Not Modified
```

A `304` response means the browser reused its cached copy.

## Security Notes

- Do not grant `s3:PutObject` publicly.
- Do not grant `s3:DeleteObject` publicly.
- Do not grant `s3:ListBucket` publicly.
- Keep ACLs disabled.
- Restrict public access to the required object prefix.
- Do not store AWS credentials in the React application.
- Remove the public bucket and objects during cleanup when they are no longer needed.

## Troubleshooting

### Access Denied

Check:

- Block Public Access is configured to allow the bucket policy.
- The bucket policy uses the correct bucket name.
- The resource ends with `travel-images/*`.
- The object exists under the correct prefix.
- The file extension in the URL matches the uploaded object.

### Image URL Returns 404

Check:

- The object name is correct.
- Capitalization matches exactly.
- The URL uses `.jpeg` or `.jpg` correctly.
- The object is inside `travel-images/`.

### React Still Shows an Unsplash Image

Check:

- The S3 URL was added to the Contentful `Image URL` field.
- The entry was published after editing.
- The field ID is `imageUrl`.
- Restart or reload the React application.
- Inspect the image request in Chrome DevTools.