# Architecture

## Solution Overview

This project demonstrates how to host a static website on an Amazon EC2 instance by installing and configuring the Apache HTTP Server on Amazon Linux 2023.

When a user enters the EC2 instance's public IPv4 address into a web browser, the request travels through the internet to the EC2 instance. The Security Group allows inbound HTTP traffic on port 80, Apache receives the request, retrieves the `index.html` file from the document root, and returns the web page to the user's browser.

---

## Architecture Diagram

```
                     User
                       │
                       ▼
                Web Browser
                       │
                  HTTP Request
                       │
                       ▼
                   Internet
                       │
                       ▼
              EC2 Security Group
         ┌───────────────────────────┐
         │ HTTP (80)                 │
         │ SSH (22 - My IP)          │
         └───────────────────────────┘
                       │
                       ▼
             Amazon EC2 Instance
         ┌───────────────────────────┐
         │ Amazon Linux 2023         │
         │                           │
         │ Apache HTTP Server        │
         │                           │
         │ /var/www/html/index.html  │
         └───────────────────────────┘
                       │
                       ▼
                Amazon EBS Volume
```

---

## Request Flow

### Step 1 – User Sends a Request

A user opens a browser and enters the EC2 instance's public IPv4 address.

Example:

```
http://<EC2-Public-IP>
```

The browser sends an HTTP request over the internet.

---

### Step 2 – Security Group Inspection

Before the request reaches the server, AWS evaluates the Security Group attached to the EC2 instance.

Configured inbound rules:

- HTTP (Port 80) → Anywhere
- SSH (Port 22) → My IP

Since the request is received on port 80, AWS allows it to reach the EC2 instance.

---

### Step 3 – EC2 Receives the Request

The EC2 instance is a virtual server running Amazon Linux 2023.

It receives the incoming HTTP request and passes it to the Apache HTTP Server.

---

### Step 4 – Apache Processes the Request

Apache looks for the requested file inside its configured DocumentRoot.

```
/var/www/html
```

In this project, the requested file is:

```
index.html
```

Apache reads the file and prepares an HTTP response.

---

### Step 5 – Response Returned to Browser

Apache sends the HTML content back through the internet.

The user's browser renders the page, displaying the custom website.

---

## AWS Components

### Amazon EC2

Amazon EC2 provides the virtual machine that hosts the web server and website.

Responsibilities:

- Compute
- Networking
- Operating system
- Application hosting

---

### Amazon Linux 2023

Amazon Linux provides the operating system for the EC2 instance.

Responsibilities:

- Process management
- Package management (`dnf`)
- File system
- User management

---

### Apache HTTP Server

Apache is responsible for serving web content.

Responsibilities:

- Listening on port 80
- Processing HTTP requests
- Serving HTML files
- Logging requests and errors

---

### Security Group

The Security Group acts as a virtual firewall.

Responsibilities:

- Allow HTTP traffic
- Restrict SSH access
- Protect the EC2 instance

---

### Amazon EBS

Amazon Elastic Block Store provides persistent storage attached to the EC2 instance.

Responsibilities:

- Store the operating system
- Store Apache configuration
- Store website files
- Persist data while the instance is running

---

## Why Apache?

Apache is one of the most widely used web servers because it is:

- Open source
- Reliable
- Highly configurable
- Cross-platform
- Suitable for hosting static and dynamic websites

Learning Apache also builds a strong foundation for understanding web server concepts before moving to modern reverse proxies such as NGINX.

---

## Security Considerations

The following security best practices were applied:

- Restricted SSH access to my IP address
- Enabled only required inbound ports
- Used `sudo` for administrative commands
- Terminated AWS resources after project completion to avoid unnecessary costs

---

## Key Takeaways

This project provided practical experience with:

- Amazon EC2
- Linux administration
- Apache installation and configuration
- AWS networking fundamentals
- Security Groups
- HTTP request flow
- Static website hosting
- Basic infrastructure management