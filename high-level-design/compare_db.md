Here’s a detailed comparison of **MySQL, MongoDB, Cassandra, and DynamoDB** across key dimensions for system design decisions:

---

### **1. Data Model**
| Database     | Model             | Schema | Example Use Case                     |
|--------------|-------------------|--------|---------------------------------------|
| **MySQL**    | Relational (Tables) | Rigid  | Banking transactions, user profiles   |
| **MongoDB**  | Document (JSON)   | Flexible | Product catalogs, CMS content        |
| **Cassandra**| Wide-column       | Flexible | Time-series data, IoT sensor logs    |
| **DynamoDB** | Key-value + Document | Flexible | Shopping carts, session storage      |

---

### **2. Scalability**
| Database     | Horizontal Scaling | Partitioning | Max Throughput       |
|--------------|--------------------|--------------|----------------------|
| **MySQL**    | Limited (sharding complex) | Manual sharding | ~10K writes/sec (with tuning) |
| **MongoDB**  | Good (auto-sharding) | Shard key-based | ~100K ops/sec (per cluster) |
| **Cassandra**| Excellent (linear) | Partition key-based | 1M+ writes/sec (per cluster) |
| **DynamoDB** | Fully managed | Automatic (hash/sort keys) | Unlimited (pay-per-request) |

---

### **3. Consistency & Availability**
| Database     | Default Consistency | CAP Theorem | Tunable?                     |
|--------------|---------------------|-------------|------------------------------|
| **MySQL**    | Strong (ACID)       | CA          | Read replicas for eventual   |
| **MongoDB**  | Eventual            | CP          | Strong consistency optional  |
| **Cassandra**| Eventual (Tunable)  | AP          | QUORUM for strong consistency|
| **DynamoDB** | Eventual (Tunable)  | AP/CP       | ACID transactions (limited)  |

---

### **4. Performance**
| Database     | Latency (P99) | Optimized For              | Weakness                  |
|--------------|---------------|----------------------------|---------------------------|
| **MySQL**    | <10ms (local) | Complex joins, OLTP        | High write contention     |
| **MongoDB**  | 5-50ms        | JSON CRUD, aggregations    | Ad-hoc queries on sharded data |
| **Cassandra**| 10-100ms      | High write throughput      | Scans are expensive       |
| **DynamoDB** | <10ms (SSD)  | Single-digit ms key lookups | Limited query patterns    |

---

### **5. Query Flexibility**
| Database     | Joins | Secondary Indexes | Full-Text Search |
|--------------|-------|--------------------|------------------|
| **MySQL**    | ✅     | ✅                  | ✅ (InnoDB)       |
| **MongoDB**  | ❌     | ✅                  | ✅ (Atlas)        |
| **Cassandra**| ❌     | ✅ (limited)        | ❌                |
| **DynamoDB** | ❌     | ✅ (GSI/LSI)        | ❌ (use OpenSearch) |

---

### **6. Operational Complexity**
| Database     | Managed Service | Self-Hosted Complexity | Backup/Restore |
|--------------|-----------------|------------------------|----------------|
| **MySQL**    | RDS/Aurora      | Moderate               | Easy           |
| **MongoDB**  | Atlas           | High (sharding)        | Moderate       |
| **Cassandra**| Astra DB        | Very high              | Complex        |
| **DynamoDB** | Fully managed   | N/A                    | Point-in-time  |

---

### **7. Cost**
| Database     | License       | Cloud Pricing Model        | Hidden Costs          |
|--------------|--------------|----------------------------|-----------------------|
| **MySQL**    | Open-source  | $0.10/GB/month (RDS)       | IOPS provisioning     |
| **MongoDB**  | SSPL         | $0.07/GB/month (Atlas)     | Data transfer         |
| **Cassandra**| Apache       | $0.15/GB/month (Astra)     | Cross-region replication |
| **DynamoDB** | Proprietary  | $0.25/GB/month + RCU/WCU   | Burst throttling      |

---

### **8. Best Use Cases**
| Database     | When to Choose                                      | Avoid When                     |
|--------------|----------------------------------------------------|--------------------------------|
| **MySQL**    | ACID compliance, complex queries (e-commerce)      | Scaling beyond 1TB+           |
| **MongoDB**  | Rapid prototyping, JSON documents (mobile apps)    | Multi-document transactions   |
| **Cassandra**| Time-series, high writes (IoT, metrics)           | Low-latency reads             |
| **DynamoDB** | Serverless apps, predictable access patterns (SaaS) | Complex analytics             |

---

### **9. Example Trade-Offs**
**Scenario**: Building a social media app  
- **Choose MongoDB** if:  
  - You need flexible schemas for user-generated content  
  - Prioritize developer velocity over transactions  

- **Choose DynamoDB** if:  
  - You want automatic scaling for viral posts  
  - Willing to denormalize data for key-based access  

- **Choose Cassandra** if:  
  - Handling millions of writes/day (comments, likes)  
  - Need multi-region writes  

- **Choose MySQL** if:  
  - You require complex queries (e.g., "friends of friends")  
  - Have strict referential integrity needs  

---

### **Key Takeaways**
1. **For OLTP**: MySQL (ACID) > DynamoDB (scale)  
2. **For JSON**: MongoDB > DynamoDB (if schema changes often)  
3. **For Time-Series**: Cassandra > MongoDB (write scalability)  
4. **For Serverless**: DynamoDB (integration with Lambda)  

Each database excels in specific scenarios—the choice depends on your access patterns, scale requirements, and operational constraints.