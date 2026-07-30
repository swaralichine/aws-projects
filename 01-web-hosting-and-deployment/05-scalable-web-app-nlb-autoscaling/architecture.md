# Architecture Deep Dive

## 1. Problem Statement

A single EC2 instance is a single point of failure, has limited capacity, and cannot automatically replace itself. This architecture improves availability by distributing traffic across multiple instances and allowing AWS to maintain and scale the fleet automatically.

## 2. Architecture Diagram

```text
                              Public users
                                   |
                              TCP port 80
                                   |
                                   v
                  +--------------------------------+
                  | Network Load Balancer          |
                  | Internet-facing                |
                  | Listener: TCP : 80             |
                  | Two Availability Zones         |
                  +---------------+----------------+
                                  |
                                  v
                  +--------------------------------+
                  | Target Group                   |
                  | Target type: Instance          |
                  | Protocol: TCP : 80             |
                  | Health check: HTTP GET /        |
                  +---------------+----------------+
                                  |
                    +-------------+-------------+
                    |                           |
                    v                           v
        +-------------------------+  +-------------------------+
        | EC2 Instance — AZ A     |  | EC2 Instance — AZ B     |
        | Amazon Linux 2023       |  | Amazon Linux 2023       |
        | Apache on port 80       |  | Apache on port 80       |
        +------------+------------+  +------------+------------+
                     ^                            ^
                     +-------------+--------------+
                                   |
                  +--------------------------------+
                  | Auto Scaling Group             |
                  | Minimum: 2                     |
                  | Desired: 2                     |
                  | Maximum: 4                     |
                  | ELB health checks enabled      |
                  | Grace period: 300 seconds      |
                  +---------------+----------------+
                                  |
                                  v
                  +--------------------------------+
                  | Launch Template                |
                  | AMI, type, storage, SG, key    |
                  | IMDSv2 and user data           |
                  +--------------------------------+
```

## 3. Component Relationships

### Launch Template → Auto Scaling Group

The Launch Template is the EC2 blueprint. It defines the AMI, instance type, security group, storage, key pair, metadata settings, and user-data script. It does not launch instances by itself.

The Auto Scaling Group references the template whenever it creates initial capacity, scales out, replaces a failed instance, or rebalances across Availability Zones.

### Auto Scaling Group → Target Group

The Auto Scaling Group is attached to the target group. Every instance it launches is registered automatically, and terminated instances are deregistered automatically.

### Target Group → Network Load Balancer

The NLB listener forwards TCP connections to the target group. The target group provides the NLB with the list of healthy EC2 destinations.

## 4. Request Flow

1. A user resolves the NLB DNS name.
2. The user opens a TCP connection to port 80.
3. The NLB listener accepts the connection.
4. The listener forwards it to the TCP target group.
5. The NLB selects a healthy EC2 target.
6. The EC2 security group confirms that the traffic came through the NLB.
7. Apache returns the generated HTML page.
8. The page displays instance-specific metadata, showing which backend served the request.

## 5. Why a Network Load Balancer?

A Network Load Balancer operates at Layer 4 and forwards connections using transport-level information.

```text
Listener protocol: TCP
Listener port:     80
Target protocol:   TCP
Target port:       80
```

Unlike an Application Load Balancer, it does not inspect URL paths or HTTP headers. NLBs are useful for high-throughput TCP or UDP workloads, low-latency forwarding, static IP requirements, source-IP preservation, and transport-layer routing.

## 6. Health Check Design

The target group forwards TCP traffic but uses HTTP health checks:

```text
Traffic protocol:      TCP
Health check protocol: HTTP
Health check path:     /
Health check port:     Traffic port
```

A TCP check confirms only that port 80 accepts connections. An HTTP check provides stronger application validation because Apache must return a valid response.

The 300-second health-check grace period gives a new instance time to boot, run cloud-init, install Apache, generate the page, and start serving requests.

## 7. High Availability and Recovery

The NLB and Auto Scaling Group use two subnets in different Availability Zones. Minimum and desired capacity are both two.

When an instance becomes unhealthy:

1. The target group marks it unhealthy.
2. The NLB stops forwarding traffic to it.
3. The Auto Scaling Group detects the failure through ELB health checks.
4. The group terminates and replaces the instance.
5. The replacement is created from the Launch Template.
6. User data configures Apache.
7. The new instance becomes eligible for traffic after passing health checks.

## 8. Dynamic Scaling

The target tracking policy uses:

```text
Metric:       Average CPU utilization
Target value: 50%
Minimum:      2
Maximum:      4
```

Sustained CPU above the target can trigger scale-out. Lower utilization can trigger scale-in, but the group never goes below two or above four instances.

AWS creates and manages the CloudWatch alarms needed by the target tracking policy.

## 9. Security Boundaries

### NLB security group

```text
Inbound: TCP 80 from 0.0.0.0/0
```

### EC2 security group

```text
Inbound: TCP 80 from the NLB security group
Optional: TCP 22 from a trusted administrator IP
```

Referencing the NLB security group prevents users from bypassing the load balancer and reaching the web application directly.

## 10. Bootstrapping and IMDSv2

User data runs on the first boot of every instance. It installs Apache and retrieves instance metadata using an IMDSv2 token.

The generated page includes:

- Instance ID
- Availability Zone
- Hostname

These values make load distribution and multi-AZ placement visible during testing.

## 11. Failure Scenarios

| Failure | System response |
|---|---|
| Apache stops responding | HTTP health check fails and the target is removed from traffic |
| EC2 instance fails | Auto Scaling replaces it using the Launch Template |
| CPU load increases | Target tracking can launch instances up to the maximum of four |
| CPU load decreases | Target tracking can remove excess instances, but not below two |
| One target is unhealthy | NLB continues routing to remaining healthy targets |
| One AZ is impaired | Capacity in the other AZ can continue serving traffic |

## 12. Design Trade-offs

### Public EC2 subnets

This learning deployment uses public subnets so instances can install packages directly. A stricter production design commonly places application instances in private subnets and provides controlled outbound access.

### Package installation during boot

Installing Apache in user data is simple but increases launch time and depends on external repositories. A production deployment can use a hardened prebuilt AMI.

### CPU-based scaling

Average CPU is easy to demonstrate, but production applications should scale on a metric that best represents actual workload pressure.

## 13. Interview Value

This project demonstrates:

- Layer 4 versus Layer 7 load balancing
- Launch Template and Auto Scaling integration
- Automatic target registration
- Health-based routing and replacement
- Multi-AZ availability
- Target tracking scaling
- Security-group referencing
- EC2 bootstrapping with IMDSv2
- Dependency-aware cleanup
