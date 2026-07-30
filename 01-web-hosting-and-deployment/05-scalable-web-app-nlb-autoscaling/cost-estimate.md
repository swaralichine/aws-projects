# Cost Estimate

## Important Note

AWS prices vary by Region, account eligibility, resource configuration, and later pricing changes. This example uses common **US East (N. Virginia)** public rates and is not a billing guarantee.

Use the AWS Pricing Calculator and your Billing console for the final amount.

## Assumptions

```text
Region:                 US East (N. Virginia)
EC2 instance type:      t2.micro, Linux On-Demand
Instance count:         2
Root storage:           8 GiB gp3 per instance
Load balancer:          1 internet-facing NLB
Auto Scaling capacity:  Min 2, desired 2, max 4
Traffic:                Very low lab traffic
Example runtime:        2 hours
```

## Billable Components

| Resource | Pricing behavior |
|---|---|
| Auto Scaling Group | No additional Auto Scaling service fee |
| Target tracking policy | No separate policy charge |
| EC2 instances | Charged while running |
| EBS root volumes | Charged until deleted |
| Network Load Balancer | Hourly or partial-hour charge plus NLCU usage |
| Public IPv4 addresses | May be charged per address-hour |
| Data transfer | May be charged depending on direction and volume |
| CloudWatch | Basic metrics are generally included; additional usage can cost money |

## Example Rates

```text
t2.micro Linux On-Demand:  $0.0116 per instance-hour
NLB fixed hourly charge:   $0.0225 per NLB-hour
NLB capacity usage:        from $0.006 per NLCU-hour
gp3 storage example rate:  $0.08 per GiB-month
```

NLB charges include the fixed hourly charge and a usage component based on the highest applicable NLCU dimension.

## Two-Hour Lab Estimate

### EC2 compute

```text
2 × $0.0116 × 2 hours = $0.0464
```

### NLB fixed charge

```text
1 × $0.0225 × 2 hours = $0.0450
```

### NLB capacity usage

For a few browser requests, the variable NLCU charge should be small but is not necessarily zero.

```text
Illustrative allowance: approximately $0.00–$0.02
```

Actual usage depends on new connections, active connections, and processed bytes.

### EBS storage

```text
2 volumes × 8 GiB = 16 GiB
16 GiB × $0.08/GiB-month = $1.28 per full month
$1.28 × 2/720 ≈ $0.0036 for two hours
```

### Estimated subtotal

```text
EC2:                  $0.0464
NLB fixed charge:     $0.0450
NLB usage:            $0.00–$0.02
EBS:                  $0.0036
--------------------------------
Estimated subtotal:   about $0.10–$0.12
```

Add any applicable public IPv4 and data-transfer charges.

## Approximate Full-Month Baseline

For 720 hours:

```text
EC2:  2 × $0.0116 × 720 = $16.70
NLB:  $0.0225 × 720     = $16.20
EBS:  16 GiB × $0.08    = $1.28
----------------------------------
Baseline:                ≈ $34.18/month
```

This excludes NLCU usage, public IPv4 charges, data transfer, scale-out instances, extra EBS volumes, and taxes.

## Cost of Scaling to Four Instances

Two additional `t2.micro` instances add:

```text
2 × $0.0116 = $0.0232 per scale-out hour
```

Their EBS volumes, possible public IPv4 addresses, and data transfer are additional.

## Free Tier Considerations

Free Tier eligibility depends on the account and current AWS program. Do not assume that all resources are free.

Treat the following as potentially billable:

- Network Load Balancer
- Public IPv4 addresses
- EC2 usage beyond available credits or allowances
- EBS beyond available credits or allowances
- Additional instances created by scaling
- Internet data transfer

## Cost-Control Recommendations

1. Run the deployment only long enough to validate it and capture screenshots.
2. Keep desired capacity at two only while demonstrating high availability.
3. Avoid artificial CPU load unless testing scale-out.
4. Delete the Auto Scaling Group first so it cannot recreate instances.
5. Delete the NLB promptly because partial NLB hours are billable.
6. Verify root EBS volumes were deleted.
7. Review the Billing console after cleanup.
8. Create a small AWS Budget alert before future projects.

## Pricing References

- https://aws.amazon.com/ec2/pricing/on-demand/
- https://aws.amazon.com/ec2/instance-types/t2/
- https://aws.amazon.com/elasticloadbalancing/pricing/
- https://aws.amazon.com/ebs/pricing/
- https://aws.amazon.com/vpc/pricing/
- https://calculator.aws/
