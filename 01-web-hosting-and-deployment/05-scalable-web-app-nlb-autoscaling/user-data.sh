#!/bin/bash

set -e

# Update installed packages
dnf update -y

# Install Apache
dnf install -y httpd

# Start Apache and enable it after reboot
systemctl start httpd
systemctl enable httpd

# Get an IMDSv2 token
TOKEN=$(curl -sS -X PUT \
  "http://169.254.169.254/latest/api/token" \
  -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")

# Retrieve EC2 instance metadata
INSTANCE_ID=$(curl -sS \
  -H "X-aws-ec2-metadata-token: $TOKEN" \
  http://169.254.169.254/latest/meta-data/instance-id)

AZ=$(curl -sS \
  -H "X-aws-ec2-metadata-token: $TOKEN" \
  http://169.254.169.254/latest/meta-data/placement/availability-zone)

HOSTNAME=$(hostname)

# Create the application webpage
cat > /var/www/html/index.html <<EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NLB Auto Scaling Web Application</title>
    <style>
        body {
            margin: 0;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #101828, #1d2939);
            color: #ffffff;
        }

        .container {
            width: 90%;
            max-width: 720px;
            padding: 40px;
            border-radius: 16px;
            background: rgba(255, 255, 255, 0.08);
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
            text-align: center;
        }

        h1 {
            margin-bottom: 12px;
            color: #ff9900;
        }

        .subtitle {
            margin-bottom: 30px;
            color: #d0d5dd;
        }

        .details {
            text-align: left;
            background: rgba(0, 0, 0, 0.2);
            padding: 24px;
            border-radius: 12px;
        }

        .details p {
            margin: 12px 0;
        }

        .label {
            font-weight: bold;
            color: #84caff;
        }

        .status {
            display: inline-block;
            margin-top: 25px;
            padding: 10px 18px;
            border-radius: 20px;
            background: #067647;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <main class="container">
        <h1>Scalable Web App with NLB</h1>

        <p class="subtitle">
            Traffic is being served through an AWS Network Load Balancer.
        </p>

        <section class="details">
            <p><span class="label">Instance ID:</span> $INSTANCE_ID</p>
            <p><span class="label">Availability Zone:</span> $AZ</p>
            <p><span class="label">Hostname:</span> $HOSTNAME</p>
        </section>

        <div class="status">Instance is healthy</div>
    </main>
</body>
</html>
EOF

# Set permissions
chown apache:apache /var/www/html/index.html
chmod 644 /var/www/html/index.html

# Restart Apache
systemctl restart httpd