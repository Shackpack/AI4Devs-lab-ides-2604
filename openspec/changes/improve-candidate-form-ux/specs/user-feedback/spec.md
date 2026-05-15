## ADDED Requirements

### Requirement: System displays toast notifications for form submission success
The system SHALL display a toast notification when a candidate is successfully created, providing immediate feedback to the user.

#### Scenario: Success toast appears after successful submission
- **WHEN** user successfully submits the candidate form
- **THEN** a success toast notification appears
- **AND** toast displays message "Candidate created successfully"
- **AND** toast appears in the top-right corner of the screen
- **AND** toast automatically dismisses after 5 seconds
- **AND** toast has a close button for manual dismissal

### Requirement: System displays toast notifications for form submission errors
The system SHALL display a toast notification when form submission fails, providing clear error feedback to the user.

#### Scenario: Error toast appears after failed submission
- **WHEN** form submission fails due to an error
- **THEN** an error toast notification appears
- **AND** toast displays the error message
- **AND** toast appears in the top-right corner of the screen
- **AND** toast automatically dismisses after 8 seconds (longer than success toasts)
- **AND** toast has a close button for manual dismissal

### Requirement: System displays inline validation feedback
The system SHALL display inline validation feedback for form fields as the user types or when they leave a field.

#### Scenario: Validation error appears on invalid input
- **WHEN** user enters invalid data in a required field
- **THEN** validation error message appears below the field
- **AND** field border changes color to indicate error
- **AND** error message is specific to the validation rule (e.g., "Invalid email format")
- **AND** error clears when user corrects the input

### Requirement: System displays loading state during form submission
The system SHALL display a loading state on the submit button while the form is being submitted to indicate processing.

#### Scenario: Button shows loading state during submission
- **WHEN** user clicks the submit button
- **THEN** submit button shows a loading spinner
- **AND** button text changes to "Adding Candidate..."
- **AND** button is disabled during submission
- **AND** button returns to normal state after submission completes

### Requirement: Toast notifications support multiple toasts
The toast notification system SHALL support displaying multiple toast notifications simultaneously, stacking them vertically.

#### Scenario: Multiple toasts stack vertically
- **WHEN** multiple toast notifications are triggered
- **THEN** toasts stack vertically in the top-right corner
- **AND** newest toast appears at the top
- **AND** each toast can be dismissed independently

### Requirement: Toast notifications are accessible
The toast notification system SHALL be accessible to screen readers and keyboard users.

#### Scenario: Toast is announced to screen readers
- **WHEN** a toast notification appears
- **THEN** toast content is announced to screen readers using aria-live region
- **AND** toast can be dismissed using keyboard (Escape key)
- **AND** toast has appropriate ARIA attributes
