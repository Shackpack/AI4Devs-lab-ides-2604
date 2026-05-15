## ADDED Requirements

### Requirement: Form uses two-column grid layout on desktop
The candidate form SHALL use a CSS Grid layout with two columns on desktop screens (1024px and wider) to optimize screen space utilization.

#### Scenario: Desktop displays two-column layout
- **WHEN** user views the form on a desktop screen (1024px or wider)
- **THEN** form fields are arranged in a two-column grid
- **AND** related fields are grouped together (e.g., first name and last name in same row)

### Requirement: Form uses single-column layout on mobile
The candidate form SHALL use a single-column layout on mobile screens (less than 768px) to ensure readability and ease of use.

#### Scenario: Mobile displays single-column layout
- **WHEN** user views the form on a mobile screen (less than 768px)
- **THEN** form fields are arranged in a single column
- **AND** fields stack vertically for optimal mobile experience

### Requirement: Form sections have clear visual hierarchy
The candidate form SHALL have clear visual separation between sections (Personal Information, Education, Work Experience, CV Upload) using headings and spacing.

#### Scenario: Sections are visually distinct
- **WHEN** user views the form
- **THEN** each section has a clear heading
- **AND** sections are separated by adequate vertical spacing
- **AND** section backgrounds are subtly different to distinguish them

### Requirement: Form inputs have consistent styling
The candidate form SHALL have consistent styling across all input fields (text inputs, selects, textareas, date inputs) with proper padding, borders, and focus states.

#### Scenario: Inputs have consistent appearance
- **WHEN** user views any form input
- **THEN** input has consistent padding (12px horizontal, 8px vertical)
- **AND** input has a subtle border (1px solid #e2e8f0)
- **AND** input border color changes to a primary color on focus
- **AND** input has a subtle box shadow on focus

### Requirement: Form buttons have modern styling
The candidate form SHALL have modern button styling with proper hover states, disabled states, and loading indicators.

#### Scenario: Buttons have hover effects
- **WHEN** user hovers over a primary button
- **THEN** button background color darkens slightly
- **AND** cursor changes to pointer

#### Scenario: Buttons show loading state
- **WHEN** form is being submitted
- **THEN** submit button shows a loading spinner or text
- **AND** button is disabled during submission
