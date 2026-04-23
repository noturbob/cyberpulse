# PHASE 1: FULL CODEBASE DISCOVERY - COMPLETE AUDIT

**Discovery Date**: April 23, 2026  
**Project**: MSME Cyber Shield Backend  
**Status**: Ready for Phase 2+

---

## BACKEND DIRECTORY STRUCTURE (Current)

```
/backend
├── .env (EXISTS - contains DB credentials)
├── .gitignore (EXISTS)
├── node_modules/ (EXISTS)
├── package-lock.json (EXISTS)
├── package.json (EXISTS - configured)
├── prisma.config.ts (EXISTS - configured)
├── prisma/
│   └── schema.prisma (EXISTS - fully defined)
└── src/
    ├── server.js (EXISTS - partial stub, 30 lines)
    ├── controllers/ (EXISTS - EMPTY - needs all files)
    ├── routes/ (EXISTS - EMPTY - needs all files)
    └── services/ (EXISTS - EMPTY - needs all files)
```

---

## FILE-BY-FILE ANALYSIS

### 1. **package.json** ✅ (Complete)

**Status**: READY TO USE

**Current Dependencies**:
```json
{
  "type": "commonjs",
  "dependencies": {
    "@prisma/client": "^6.19.3",
    "axios": "^1.15.1",
    "cors": "^2.8.6",
    "dotenv": "^17.4.2",
    "express": "^5.2.1",
    "mongodb": "^7.2.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.14",
    "prisma": "^6.19.3"
  }
}
```

**Observations**:
- Type is `"commonjs"` — **Must use `require()` and `module.exports`, NOT `import/export`**
- Express v5.2.1 (latest)
- Prisma v6.19.3 (CORRECT for MongoDB driver compatibility)
- Axios installed ✅
- CORS installed ✅
- Dotenv installed ✅
- Missing packages needed: `helmet`, `express-rate-limit`, `@clerk/express`

**Action**: Add missing packages in Phase 2

---

### 2. **prisma/schema.prisma** ✅ (Complete with Custom Fields)

**Status**: FULLY DEFINED - validated

**Current Models**:
1. **Organization**
   - `id` (ObjectId PK)
   - `sessionId` (String, @unique, optional)
   - `email` (String, @unique, optional)
   - `companyName` (String, optional)
   - `websites` (relation to Website[])
   - `createdAt`, `updatedAt`

2. **Website**
   - `id` (ObjectId PK)
   - `url` (String, @unique)
   - `organizationId` (ObjectId FK)
   - `organization` (relation)
   - `scans` (relation to Scan[])
   - `badges` (relation to TrustBadge[])
   - `createdAt`

3. **Scan**
   - `id` (ObjectId PK)
   - `websiteId` (ObjectId FK)
   - `website` (relation)
   - `safetyScore` (Int)
   - `sslStatus` (String)
   - `malwareFound` (Boolean)
   - `brokenLinks` (Int)
   - `rawReportData` (Json, optional)
   - `actionItems` (relation)
   - `scannedAt` (DateTime)

4. **ActionItem**
   - `id` (ObjectId PK)
   - `scanId` (ObjectId FK)
   - `scan` (relation)
   - `category` (String)
   - `severity` (String) — intentionally String, not Enum
   - `title` (String)
   - `remedy` (String)
   - `isFixed` (Boolean, @default(false))

5. **TrustBadge**
   - `id` (ObjectId PK)
   - `websiteId` (ObjectId FK)
   - `website` (relation)
   - `badgeHtml` (String)
   - `issuedAt` (DateTime)
   - `expiresAt` (DateTime)
   - `isActive` (Boolean, @default(true))

**Differences from Specification**:
- Spec expected: `riskLevel`, `sslScore`, `malwareScore`, `phishingScore`, `brokenLinksScore`, `findings`
- Actual schema: `safetyScore`, `sslStatus`, `malwareFound`, `brokenLinks`, `rawReportData`
- This is INTENTIONAL variation — schema is CUSTOM but functional
- **ACTION**: Controllers must use **actual field names** from schema, not spec names

**Prisma Client Path**:
- Server.js uses direct `new PrismaClient()` 
- This is fine but will create multiple instances
- **ACTION**: Create singleton in `src/lib/prisma.js` for best practice

---

### 3. **prisma.config.ts** ✅ (Configured)

**Status**: CORRECT

- Imports `dotenv/config` ✅
- References correct schema path ✅
- Has `DATABASE_URL` environment variable ✅

---

### 4. **.env** ✅ (Complete with Credentials)

**Status**: EXISTS WITH DB CREDENTIALS

```
DATABASE_URL="mongodb+srv://bobbyanthenrao_db_user:WPQ1wdTGupSy3z3U@cluster0.xbugjsr.mongodb.net/?appName=Cluster0"
```

**Observations**:
- MongoDB Atlas connection string is active ✅
- Credentials exposed in file (for dev only, expected for Ideathon)
- Missing: `CLERK_SECRET_KEY`, `GOOGLE_SAFE_BROWSING_API_KEY`, `PORT`, `NODE_ENV`, `FRONTEND_URL`, `CLERK_PUBLISHABLE_KEY`

**ACTION**: Add remaining variables in Phase 10

---

### 5. **src/server.js** ⚠️ (Partial Stub - 30 Lines)

**Status**: NEEDS MAJOR EXPANSION

**Current Content**:
```javascript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'MSME Cyber Shield Engine is Online.' });
});

// We will add the /api/scan route here next!

// Start Server
app.listen(PORT, () => {
  console.log(`🛡️ Cyber Shield Backend running on port ${PORT}`);
});
```

**CRITICAL ISSUES**:
1. **WRONG MODULE SYSTEM**: Uses `import/export` but `package.json` declares `"type": "commonjs"`
   - **FIX**: Must rewrite to use `require()` and `module.exports`
2. No route imports
3. No middleware setup (helmet, rate-limit)
4. No Clerk middleware
5. No error handler
6. Direct `PrismaClient` instance (should be singleton)
7. Comment "We will add the /api/scan route here next!" confirms this is a stub

**ACTION**: Complete rewrite in Phase 9 using CommonJS

---

### 6. **src/controllers/** ❌ (EMPTY)

**Status**: NEEDS ALL FILES

Missing:
- `scan.controller.js`
- `auth.controller.js`
- `dashboard.controller.js`

---

### 7. **src/routes/** ❌ (EMPTY)

**Status**: NEEDS ALL FILES

Missing:
- `scan.routes.js`
- `auth.routes.js`
- `dashboard.routes.js`

---

### 8. **src/services/** ❌ (EMPTY)

**Status**: NEEDS ALL FILES

Missing:
- `sslChecker.js` — Check SSL certificate validity + expiry
- `safeBrowsing.js` — Google Safe Browsing API v4 integration
- `linkChecker.js` — Fetch URLs, find broken links, detect exposed emails
- `scoreEngine.js` — Aggregate results into score, risk level, action items

---

### 9. **src/lib/** ❌ (MISSING DIRECTORY)

**Status**: NEEDS CREATION + FILES

Missing:
- `src/lib/prisma.js` — Singleton Prisma client
- `src/middleware/auth.js` — Clerk token verification

---

## SUMMARY: WHAT EXISTS vs. WHAT'S NEEDED

| Component | Status | Notes |
|-----------|--------|-------|
| package.json | ✅ Complete | CommonJS, all base deps, needs: helmet, @clerk/express, express-rate-limit |
| prisma/schema.prisma | ✅ Complete | 5 models defined (custom field names) |
| prisma.config.ts | ✅ Complete | Correct config |
| .env | ✅ Complete | DB credentials present, needs Clerk + API keys |
| src/server.js | ⚠️ Stub (30 lines) | WRONG MODULE SYSTEM (import/export in commonjs) — needs rewrite |
| src/controllers/ | ❌ Empty | Need 3 files: scan, auth, dashboard |
| src/routes/ | ❌ Empty | Need 3 files: scan, auth, dashboard |
| src/services/ | ❌ Empty | Need 4 files: sslChecker, safeBrowsing, linkChecker, scoreEngine |
| src/lib/ | ❌ Missing | Need prisma.js singleton |
| src/middleware/ | ❌ Missing | Need auth.js |

---

## CRITICAL FINDINGS

### 1. **Module System Mismatch** ⚠️ BLOCKING
- `package.json` says `"type": "commonjs"`
- `server.js` uses `import/export` syntax
- **MUST FIX**: Rewrite server.js and all files to use `require()` / `module.exports`

### 2. **Schema Field Names Differ from Spec** ⚠️ EXPECTED
- Specification describes: `riskLevel`, `sslScore`, `malwareScore`, `phishingScore`, `brokenLinksScore`, `findings`
- Actual schema uses: `safetyScore`, `sslStatus`, `malwareFound`, `brokenLinks`, `rawReportData`
- **SOLUTION**: Controllers must map results to actual schema fields

### 3. **No Clerk Integration Yet**
- `.env` missing `CLERK_SECRET_KEY`, `CLERK_PUBLISHABLE_KEY`
- No Clerk middleware in server.js
- Routes expect auth but none configured
- **FIX IN PHASE 9**: Add @clerk/express middleware

### 4. **No Singleton Prisma Client**
- server.js creates new `PrismaClient()` directly
- Best practice: move to `src/lib/prisma.js` singleton
- This prevents multiple instances from accumulating

### 5. **Services Not Implemented**
- All 4 services are 100% missing
- These are the heart of the scanning engine
- **PRIORITY**: Implement in Phase 5

---

## NEXT STEPS (Phase 2+)

### Phase 2: Prisma Singleton
- Create `src/lib/prisma.js` with singleton pattern

### Phase 3: Project Structure
- Confirm folder structure (mostly exists, needs lib/ and middleware/)

### Phase 4: Already Valid
- Singleton pattern template provided

### Phase 5: Services (HIGH PRIORITY)
1. `sslChecker.js` — TLS socket, certificate parsing
2. `safeBrowsing.js` — Google API integration
3. `linkChecker.js` — HTTP checks, email regex, broken links
4. `scoreEngine.js` — Score aggregation + action items

### Phase 6: Controllers
1. `scan.controller.js` — POST /api/scan (orchestrate services, create records)
2. `auth.controller.js` — POST /api/auth/merge (session → clerk linking)
3. `dashboard.controller.js` — GET routes (read-only, Clerk protected)

### Phase 7: Middleware
- Create `src/middleware/auth.js` with Clerk `requireAuth()`

### Phase 8: Routes
- 3 route files, mount in server.js

### Phase 9: Server Complete Rewrite
- **CRITICAL**: Convert from `import/export` to CommonJS `require/module.exports`
- Add helmet, rate limiting, Clerk middleware
- Mount all routes
- Add error handler

### Phase 10: Environment Variables
- `.env.example` with all keys

### Phase 11: Error Handling
- Establish patterns (already outlined in spec)

### Phase 12: Final Audit
- Security checks, Prisma validation, org ownership checks

---

## READY FOR PHASE 2 ✅

All discovery complete. No files modified. Proceeding to Prisma Singleton creation.
