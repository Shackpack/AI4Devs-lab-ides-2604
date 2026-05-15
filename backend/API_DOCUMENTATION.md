# API Documentation

## Candidate Management API

Base URL: `http://localhost:3010/api`

### Create Candidate

**Endpoint:** `POST /candidates`

**Description:** Creates a new candidate record with personal information, education, and work experience.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "address": "123 Main St, City, Country",
  "education": [
    {
      "institution": "University of Example",
      "degree": "Bachelor of Science",
      "fieldOfStudy": "Computer Science",
      "startDate": "2018-09-01",
      "endDate": "2022-05-30"
    }
  ],
  "experience": [
    {
      "company": "Tech Company Inc",
      "position": "Software Developer",
      "startDate": "2022-06-01",
      "endDate": null,
      "description": "Developed web applications using React and Node.js"
    }
  ]
}
```

**Response (201 Created):**
```json
{
  "message": "Candidate created successfully",
  "candidate": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "address": "123 Main St, City, Country",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z",
    "deletedAt": null
  }
}
```

**Validation Errors (400 Bad Request):**
```json
{
  "error": "Validation error",
  "details": [
    {
      "path": ["email"],
      "message": "Invalid email format"
    }
  ]
}
```

### Get Candidate

**Endpoint:** `GET /candidates/:id`

**Description:** Retrieves a candidate's details by ID, including education and experience.

**Response (200 OK):**
```json
{
  "candidate": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "address": "123 Main St, City, Country",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z",
    "deletedAt": null,
    "education": [
      {
        "id": 1,
        "candidateId": 1,
        "institution": "University of Example",
        "degree": "Bachelor of Science",
        "fieldOfStudy": "Computer Science",
        "startDate": "2018-09-01",
        "endDate": "2022-05-30"
      }
    ],
    "experience": [
      {
        "id": 1,
        "candidateId": 1,
        "company": "Tech Company Inc",
        "position": "Software Developer",
        "startDate": "2022-06-01",
        "endDate": null,
        "description": "Developed web applications using React and Node.js"
      }
    ]
  }
}
```

**Not Found (404):**
```json
{
  "error": "Candidate not found"
}
```

### Update Candidate

**Endpoint:** `PUT /candidates/:id`

**Description:** Updates an existing candidate's information.

**Request Body:** (same as create, but all fields are optional)

**Response (200 OK):**
```json
{
  "message": "Candidate updated successfully",
  "candidate": {
    "id": 1,
    "firstName": "John",
    "lastName": "Smith",
    "email": "john.smith@example.com",
    "phone": "+1234567890",
    "address": "456 New St, City, Country",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T11:00:00Z",
    "deletedAt": null
  }
}
```

### Delete Candidate

**Endpoint:** `DELETE /candidates/:id`

**Description:** Soft-deletes a candidate (sets deletedAt timestamp).

**Response (200 OK):**
```json
{
  "message": "Candidate deleted successfully",
  "candidate": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "address": "123 Main St, City, Country",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z",
    "deletedAt": "2024-01-15T12:00:00Z"
  }
}
```

## Document Upload API

### Upload Document

**Endpoint:** `POST /documents`

**Description:** Uploads a CV document (PDF or DOCX) for a candidate.

**Request:** `multipart/form-data`
- `file`: The document file (PDF or DOCX, max 10MB)
- `candidateId`: The ID of the candidate (as form field)

**Response (201 Created):**
```json
{
  "message": "Document uploaded successfully",
  "document": {
    "id": 1,
    "candidateId": 1,
    "fileName": "cv.pdf",
    "filePath": "/uploads/candidates/1/cv/cv.pdf",
    "fileType": "application/pdf",
    "fileSize": 1048576,
    "uploadedAt": "2024-01-15T12:30:00Z"
  }
}
```

**Validation Errors (400 Bad Request):**
```json
{
  "error": "File size exceeds 10MB limit"
}
```

```json
{
  "error": "Invalid file type. Only PDF and DOCX are allowed"
}
```

### Get Document

**Endpoint:** `GET /documents/:id`

**Description:** Downloads a document by ID.

**Response:** File download

### Delete Document

**Endpoint:** `DELETE /documents/:id`

**Description:** Deletes a document and removes the file from storage.

**Response (200 OK):**
```json
{
  "message": "Document deleted successfully"
}
```

## Authentication & Authorization

All endpoints are protected by:
- **Authentication:** JWT token (middleware structure created, needs full implementation for production)
- **Authorization:** Role-based access control (RBAC) - only recruiters can access candidate endpoints (middleware structure created, needs full implementation for production)

For MVP development, authentication and authorization are bypassed. For production, implement:
1. JWT token validation in the `authenticate` middleware
2. Role checking in the `authorize` middleware
3. Token generation and refresh endpoints
