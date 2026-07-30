#!/bin/bash

dnf update -y
dnf install httpd -y

systemctl enable httpd
systemctl start httpd

TOKEN=$(curl -sS -X PUT \
  -H "X-aws-ec2-metadata-token-ttl-seconds: 21600" \
  http://169.254.169.254/latest/api/token)

INSTANCE_ID=$(curl -sS \
  -H "X-aws-ec2-metadata-token: $TOKEN" \
  http://169.254.169.254/latest/meta-data/instance-id)

AVAILABILITY_ZONE=$(curl -sS \
  -H "X-aws-ec2-metadata-token: $TOKEN" \
  http://169.254.169.254/latest/meta-data/placement/availability-zone)

HOSTNAME=$(hostname)

cat > /var/www/html/index.html <<EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Scalable AWS Web Application</title>

    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #0f172a, #1e3a8a);
            color: white;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .container {
            width: 80%;
            max-width: 800px;
            padding: 40px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            text-align: center;
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
        }

        .details {
            margin-top: 30px;
            text-align: left;
            background: rgba(0, 0, 0, 0.25);
            padding: 20px;
            border-radius: 10px;
        }

        .details p {
            margin: 10px 0;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>Scalable Web Application on AWS</h1>

        <p>
            This page is being served by an EC2 instance
            managed by an Auto Scaling group.
        </p>

        <div class="details">
            <p><strong>Instance ID:</strong> $INSTANCE_ID</p>
            <p><strong>Availability Zone:</strong> $AVAILABILITY_ZONE</p>
            <p><strong>Hostname:</strong> $HOSTNAME</p>
            <p><strong>Web Server:</strong> Apache HTTP Server</p>
        </div>
    </div>
</body>
</html>
EOF