# OneClickHire

Minimal job-aggregator in **TypeScript**.  
Pulls openings from reliable sources and returns a **unified JSON**.

**Sources (MVP)**
- Adzuna API (broad coverage)
- Jooble API (global coverage)
- Greenhouse Job Boards (per-company)
- Remotive (public API — temporarily tolerant to outages)

The pipeline is **resilient** (one source can fail and the app still returns results).

---

## Quick Start

### Prereqs
- Node.js 18+  
- Git

### Install
```bash
npm i
