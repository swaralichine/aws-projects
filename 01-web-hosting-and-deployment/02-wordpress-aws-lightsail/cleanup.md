# Cleanup

To prevent ongoing AWS charges, delete all resources after completing the project.

## Resources to Delete

### 1. Delete the Lightsail Instance

AWS Console

Lightsail → Instances → Delete

---

### 2. Release the Static IP

Lightsail → Networking → Static IPs → Release

---

### 3. Delete the Snapshot

Lightsail → Snapshots → Delete

---

## Verification

Confirm that no Lightsail resources remain:

- No running instances
- No allocated Static IPs
- No snapshots

This ensures the project no longer incurs charges.