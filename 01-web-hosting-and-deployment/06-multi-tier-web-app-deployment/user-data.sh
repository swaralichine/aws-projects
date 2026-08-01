#!/bin/bash

set -e

exec > >(tee /var/log/user-data.log | logger -t user-data -s 2>/dev/console) 2>&1

# Update packages and install Apache, PHP, and MySQL support
dnf update -y
dnf install -y httpd php php-mysqli

# Start and enable Apache
systemctl enable --now httpd

# Replace these values before pasting the script into the Launch Template
DB_HOST="YOUR_RDS_ENDPOINT"
DB_PORT="3306"
DB_NAME="YOUR_DATABASE_NAME"
DB_USER="YOUR_DATABASE_USERNAME"
DB_PASSWORD="YOUR_DATABASE_PASSWORD"

# Retrieve EC2 metadata using IMDSv2
TOKEN=$(curl --fail --silent --show-error \
  --request PUT \
  "http://169.254.169.254/latest/api/token" \
  --header "X-aws-ec2-metadata-token-ttl-seconds: 21600")

INSTANCE_ID=$(curl --fail --silent --show-error \
  --header "X-aws-ec2-metadata-token: $TOKEN" \
  "http://169.254.169.254/latest/meta-data/instance-id")

AZ=$(curl --fail --silent --show-error \
  --header "X-aws-ec2-metadata-token: $TOKEN" \
  "http://169.254.169.254/latest/meta-data/placement/availability-zone")

HOSTNAME=$(hostname)

cat > /var/www/html/index.php <<EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AWS Multi-Tier Web Application</title>
    <style>
        body {
            margin: 0;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #0f172a, #1e3a8a);
            color: white;
        }

        .container {
            width: 90%;
            max-width: 760px;
            padding: 40px;
            border-radius: 16px;
            background: rgba(255, 255, 255, 0.1);
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
        }

        h1 {
            text-align: center;
            color: #ff9900;
        }

        .details {
            margin-top: 24px;
            padding: 22px;
            border-radius: 12px;
            background: rgba(0, 0, 0, 0.25);
        }

        .status {
            margin-top: 20px;
            padding: 16px;
            border-radius: 10px;
            text-align: center;
            font-weight: bold;
        }

        .success {
            background: #067647;
        }

        .error {
            background: #b42318;
        }
    </style>
</head>
<body>
    <main class="container">
        <h1>AWS Multi-Tier Web Application</h1>

        <div class="details">
            <p><strong>Instance ID:</strong> $INSTANCE_ID</p>
            <p><strong>Availability Zone:</strong> $AZ</p>
            <p><strong>Hostname:</strong> $HOSTNAME</p>
            <p><strong>Database:</strong> Amazon RDS for MySQL</p>
        </div>

        <?php
        \$connection = new mysqli(
            "$DB_HOST",
            "$DB_USER",
            "$DB_PASSWORD",
            "$DB_NAME",
            $DB_PORT
        );

        if (\$connection->connect_error) {
            echo '<div class="status error">Database connection failed</div>';
        } else {
            echo '<div class="status success">Successfully connected to Amazon RDS</div>';
            \$connection->close();
        }
        ?>
    </main>
</body>
</html>
EOF

rm -f /var/www/html/index.html

chown apache:apache /var/www/html/index.php
chmod 640 /var/www/html/index.php

php -l /var/www/html/index.php
systemctl restart httpd