# Database Schema Documentation

## Overview

The ATS candidate management system uses PostgreSQL as the database, managed through Prisma ORM. The schema includes tables for candidates, their education, work experience, and uploaded documents.

## Tables

### Candidate

Stores the main candidate information with soft-delete support.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | Int | Primary Key, Auto Increment | Unique identifier for the candidate |
| firstName | String | Required | Candidate's first name |
| lastName | String | Required | Candidate's last name |
| email | String | Unique, Required | Candidate's email address |
| phone | String | Required | Candidate's phone number |
| address | String | Optional | Candidate's physical address |
| createdAt | DateTime | Auto-generated | Timestamp when the record was created |
| updatedAt | DateTime | Auto-generated | Timestamp when the record was last updated |
| deletedAt | DateTime? | Optional | Timestamp for soft-delete (null if active) |

**Indexes:**
- `email`: Unique index for email lookups

### CandidateEducation

Stores educational background for each candidate.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | Int | Primary Key, Auto Increment | Unique identifier for the education record |
| candidateId | Int | Foreign Key, Required | Reference to the candidate table |
| institution | String | Required | Name of the educational institution |
| degree | String | Required | Degree obtained |
| fieldOfStudy | String | Optional | Field of study or major |
| startDate | DateTime | Required | Start date of the education |
| endDate | DateTime? | Optional | End date of the education |

**Indexes:**
- `candidateId`: Index for querying education by candidate

**Relationships:**
- Belongs to: Candidate (many-to-one)

### CandidateExperience

Stores work experience for each candidate.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | Int | Primary Key, Auto Increment | Unique identifier for the experience record |
| candidateId | Int | Foreign Key, Required | Reference to the candidate table |
| company | String | Required | Name of the company |
| position | String | Required | Job position held |
| startDate | DateTime | Required | Start date of employment |
| endDate | DateTime? | Optional | End date of employment |
| description | String? | Optional | Job description and responsibilities |

**Indexes:**
- `candidateId`: Index for querying experience by candidate

**Relationships:**
- Belongs to: Candidate (many-to-one)

### CandidateDocument

Stores uploaded CV documents for candidates.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | Int | Primary Key, Auto Increment | Unique identifier for the document |
| candidateId | Int | Foreign Key, Required | Reference to the candidate table |
| fileName | String | Required | Original filename of the uploaded document |
| filePath | String | Required | Server-side file path |
| fileType | String | Required | MIME type of the file (e.g., application/pdf) |
| fileSize | Int | Required | File size in bytes |
| uploadedAt | DateTime | Auto-generated | Timestamp when the file was uploaded |

**Indexes:**
- `candidateId`: Index for querying documents by candidate

**Relationships:**
- Belongs to: Candidate (many-to-one)

## Relationships

```
Candidate (1) ----< (N) CandidateEducation
Candidate (1) ----< (N) CandidateExperience
Candidate (1) ----< (N) CandidateDocument
```

## Data Integrity

- **Foreign Keys:** All related tables have foreign key constraints to the Candidate table
- **Soft Deletes:** Candidates are soft-deleted using the `deletedAt` timestamp
- **Unique Constraints:** Email addresses must be unique across all candidates
- **Cascading Deletes:** When a candidate is deleted, related education, experience, and documents remain (for audit purposes)

## File Storage

Uploaded documents are stored in the following directory structure:
```
/uploads/candidates/{candidateId}/cv/{fileName}
```

This structure keeps files organized by candidate and outside the web root for security.

## Migration Notes

To apply database schema changes:
1. Modify `backend/prisma/schema.prisma`
2. Run `npx prisma migrate dev --name <migration_name>`
3. Run `npx prisma generate` to update the Prisma client

**Prerequisite:** PostgreSQL server must be running on `localhost:5433` with database `LTIdb`.
