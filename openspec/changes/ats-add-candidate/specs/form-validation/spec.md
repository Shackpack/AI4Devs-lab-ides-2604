## ADDED Requirements

### Requirement: Validate required fields
The system SHALL validate that all required fields are present before accepting candidate data submission.

#### Scenario: All required fields present
- **WHEN** a recruiter submits the form with all required fields filled
- **THEN** the system SHALL accept the submission
- **AND** the system SHALL proceed to process the candidate data

#### Scenario: Missing required field
- **WHEN** a recruiter submits the form with one or more required fields empty
- **THEN** the system SHALL reject the submission
- **AND** the system SHALL highlight the missing fields in red
- **AND** the system SHALL display error messages indicating which fields are required

### Requirement: Validate email format
The system SHALL validate that email addresses follow a valid email format pattern.

#### Scenario: Valid email format
- **WHEN** a recruiter enters a valid email address (e.g., user@example.com)
- **THEN** the system SHALL accept the email field
- **AND** the system SHALL remove any validation error for that field

#### Scenario: Invalid email format
- **WHEN** a recruiter enters an invalid email address (e.g., user@, @example.com, user)
- **THEN** the system SHALL reject the email field
- **AND** the system SHALL display a validation error message indicating the email format is invalid

#### Scenario: Email with special characters
- **WHEN** a recruiter enters an email with valid special characters (e.g., user.name+tag@example.com)
- **THEN** the system SHALL accept the email field if it follows RFC 5322 format

### Requirement: Validate phone number format
The system SHALL validate that phone numbers follow a valid format.

#### Scenario: Valid phone number
- **WHEN** a recruiter enters a valid phone number (e.g., +1 555-123-4567)
- **THEN** the system SHALL accept the phone field
- **AND** the system SHALL format the number consistently

#### Scenario: Invalid phone number
- **WHEN** a recruiter enters an invalid phone number (e.g., abc-123)
- **THEN** the system SHALL reject the phone field
- **AND** the system SHALL display a validation error message

### Requirement: Validate file type
The system SHALL validate that uploaded documents are of allowed file types (PDF, DOCX).

#### Scenario: Valid file type
- **WHEN** a recruiter uploads a PDF or DOCX file
- **THEN** the system SHALL accept the file
- **AND** the system SHALL proceed with the upload process

#### Scenario: Invalid file type
- **WHEN** a recruiter uploads a file with disallowed extension (e.g., .exe, .txt)
- **THEN** the system SHALL reject the file
- **AND** the system SHALL display an error message listing allowed file types

### Requirement: Validate file size
The system SHALL validate that uploaded documents do not exceed the maximum allowed size (10MB).

#### Scenario: File within size limit
- **WHEN** a recruiter uploads a file smaller than 10MB
- **THEN** the system SHALL accept the file
- **AND** the system SHALL proceed with the upload process

#### Scenario: File exceeds size limit
- **WHEN** a recruiter uploads a file larger than 10MB
- **THEN** the system SHALL reject the file
- **AND** the system SHALL display an error message indicating the size limit

### Requirement: Real-time validation feedback
The system SHALL provide real-time validation feedback as users fill in form fields.

#### Scenario: Field validation on blur
- **WHEN** a user leaves a field after entering data
- **THEN** the system SHALL validate the field immediately
- **AND** the system SHALL display validation errors if the field is invalid

#### Scenario: Clear validation on correction
- **WHEN** a user corrects an invalid field
- **THEN** the system SHALL re-validate the field
- **AND** the system SHALL remove the validation error if the field is now valid
