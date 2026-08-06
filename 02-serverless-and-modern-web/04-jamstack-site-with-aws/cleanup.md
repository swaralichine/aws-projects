# Cleanup Guide — Cloud Travel Journal

Use this guide after completing the project to remove cloud resources and avoid unnecessary charges.

## Before You Begin

Make sure you have saved:

- Final website screenshots
- Amplify deployment screenshots
- Contentful screenshots
- Amazon S3 screenshots
- GitHub repository files
- The live Amplify URL, if needed for documentation

Deleting the resources below may cause the deployed website and images to stop working.

---

# 1. Delete the AWS Amplify Application

Open the AWS Console and go to:

```text
AWS Amplify
→ All apps
→ Cloud Travel Journal
```

Open:

```text
App settings
→ General settings
```

Choose:

```text
Delete app
```

Enter the requested confirmation and delete the application.

This removes:

- Amplify deployments
- Hosted branches
- Build artifacts
- The Amplify-generated website URL

---

# 2. Delete the Amazon S3 Objects

Open:

```text
Amazon S3
→ Buckets
→ swarali-cloud-travel-journal-images-2026
→ travel-images
```

Select:

```text
kyoto.jpeg
yosemite.jpeg
santorini.jpeg
```

Click:

```text
Delete
```

Confirm the object deletion.

If your files use `.jpg` instead of `.jpeg`, select the actual filenames shown in the bucket.

---

# 3. Delete the S3 Folder Marker

After deleting the image objects, return to the bucket root.

If the following folder remains:

```text
travel-images/
```

select it and click:

```text
Delete
```

Amazon S3 does not use traditional folders. The folder may disappear automatically when all objects under the prefix are deleted.

---

# 4. Delete the Amazon S3 Bucket

Return to:

```text
Amazon S3
→ Buckets
```

Select:

```text
swarali-cloud-travel-journal-images-2026
```

Click:

```text
Delete
```

Enter the full bucket name when prompted and confirm.

The bucket must be empty before it can be deleted.

---

# 5. Remove Contentful Entries

Open Contentful and go to:

```text
Content
→ Travel Story
```

For each published entry:

1. Open the entry.
2. Choose **Unpublish**.
3. Choose **Delete**.

Remove:

```text
A Quiet Morning Through Historic Kyoto
Finding Stillness in Yosemite Valley
Golden Hour Along the Aegean Sea
```

Contentful may require entries to be unpublished before deletion.

---

# 6. Delete the Contentful Content Type

After deleting all Travel Story entries, go to:

```text
Content model
→ Travel Story
```

Open the content type options and choose:

```text
Delete
```

Confirm the deletion.

Contentful will not allow deletion while entries still use the content type.

---

# 7. Delete the Contentful API Key

Go to:

```text
Settings
→ API keys
```

Open the API key created for the project:

```text
Cloud Travel Journal
```

Choose:

```text
Delete
```

Confirm the deletion.

This invalidates the Content Delivery API token used by the React application.

---

# 8. Delete the Contentful Space

Deleting the entire Contentful space is optional.

Only do this when the space was created specifically for this project and contains nothing else.

Go to the space settings and select the option to delete the space.

Do not delete a shared Contentful space containing other projects.

---

# 9. Remove the Local Environment File

From the project folder, run:

```bash
rm app/.env
```

Keep:

```text
app/.env.example
```

The example file documents the required environment-variable names without containing real credentials.

Verify that the real file is gone:

```bash
ls -la app | grep .env
```

You should see `.env.example`, but not `.env`.

---

# 10. Confirm Secrets Were Not Committed

From the root of the `aws-projects` repository, run:

```bash
git status
```

Check whether `.env` is ignored:

```bash
git check-ignore -v \
02-serverless-and-modern-web/04-jamstack-site-with-aws/app/.env
```

Search tracked files for the real token only when you can do so safely without printing or sharing it.

Never include the Contentful access token in screenshots, documentation, or GitHub commits.

---

# 11. Keep or Remove the GitHub Project

The source code and documentation can remain in GitHub because GitHub storage does not create AWS charges.

Keep these files:

- React source code
- `.env.example`
- README
- Architecture documentation
- Cost estimate
- Cleanup guide
- Screenshots that do not expose secrets

Do not commit:

- `app/.env`
- Contentful access tokens
- AWS credentials
- Private configuration values

---

# 12. Review AWS Billing

Open:

```text
AWS Console
→ Billing and Cost Management
```

Review:

- Current month charges
- Amazon S3 usage
- AWS Amplify usage
- Data transfer
- Forecasted charges

Resource deletion does not always make existing charges disappear. It prevents future usage charges.

---

# 13. Optional Budget Alert

For future projects, create an AWS Budget alert.

Example:

```text
Budget type: Cost budget
Monthly amount: $5
Alert threshold: 80%
```

This provides an email notification when spending approaches the configured limit.

---

# Final Cleanup Checklist

- [ ] Final screenshots saved
- [ ] AWS Amplify application deleted
- [ ] S3 image objects deleted
- [ ] S3 bucket deleted
- [ ] Contentful entries unpublished and deleted
- [ ] Contentful content type deleted
- [ ] Contentful API key deleted
- [ ] Local `.env` deleted
- [ ] `.env.example` retained
- [ ] GitHub checked for exposed secrets
- [ ] AWS Billing reviewed