# Cost Estimate

This project was designed to demonstrate WordPress deployment on AWS while keeping costs as low as possible.

| Resource | Purpose | Estimated Cost |
|----------|---------|---------------:|
| Amazon Lightsail Instance | Hosts the WordPress application | ~$5/month (prorated while running) |
| Static IP | Permanent public endpoint | Included while attached |
| Lightsail Snapshot | Backup and disaster recovery | Small storage charge while retained |

## Cost Optimization

- Used the smallest available Lightsail instance.
- Did not purchase a custom domain.
- Did not configure HTTPS to avoid domain registration costs.
- Resources should be deleted after completing the project to prevent ongoing charges.

## Estimated Project Cost

Since the instance only ran for a short period during the project, the actual cost should be only a small fraction of the monthly price.