## ADDED Requirements

### Requirement: Upload candidate CV
The system SHALL allow authenticated recruiters to upload candidate CV documents in PDF or DOCX format.

#### Scenario: Successful PDF upload
- **WHEN** a recruiter uploads a valid PDF file for a candidate
- **THEN** the system SHALL store the file in the candidate's document directory
- **AND** the system SHALL associate the file with the candidate record
- **AND** the system SHALL return a success confirmation with file metadata

#### Scenario: Successful DOCX upload
- **WHEN** a recruiter uploads a valid DOCX file for a candidate
- **THEN** the system SHALL store the file in the candidate's document directory
- **AND** the system SHALL associate the file with the candidate record
- **AND** the system SHALL return a success confirmation with file metadata

#### Scenario: Invalid file format
- **WHEN** a recruiter attempts to upload a file with unsupported format (e.g., .exe, .jpg)
- **THEN** the system SHALL reject the upload
- **AND** the system SHALL display an error message indicating supported formats

#### Scenario: File size exceeds limit
- **WHEN** a recruiter attempts to upload a file larger than 10MB
- **THEN** the system SHALL reject the upload
- **AND** the system SHALL display an error message indicating the size limit

#### Scenario: Malicious file upload
- **WHEN** a recruiter attempts to upload a file with malicious content
- **THEN** the system SHALL validate the file MIME type
- **AND** the system SHALL reject files with suspicious content
- **AND** the system SHALL log the security incident

### Requirement: Retrieve candidate document
The system SHALL allow authenticated recruiters to download candidate documents.

#### Scenario: Download existing document
- **WHEN** a recruiter requests to download a candidate's CV
- **THEN** the system SHALL return the file with appropriate headers
- **AND** the system SHALL log the download action for audit purposes

#### Scenario: Document not found
- **WHEN** a recruiter attempts to download a non-existent document
- **THEN** the system SHALL return a 404 error
- **AND** the system SHALL display an appropriate error message

### Requirement: Delete candidate document
The system SHALL allow authenticated recruiters to delete candidate documents.

#### Scenario: Successful document deletion
- **WHEN** a recruiter confirms deletion of a candidate's document
- **THEN** the system SHALL remove the file from storage
- **AND** the system SHALL update the candidate record to remove document association
- **AND** the system SHALL return a success confirmation message

#### Scenario: Delete non-existent document
- **WHEN** a recruiter attempts to delete a non-existent document
- **THEN** the system SHALL return a 404 error
- **AND** the system SHALL display an appropriate error message
