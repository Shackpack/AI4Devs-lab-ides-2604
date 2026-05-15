## Context

The current CandidateForm component has basic functionality but lacks polish in terms of user experience, responsive design, and user feedback. The form was built with React Hook Form and Zod validation, but the visual presentation is minimal and doesn't follow modern UI/UX best practices. The form currently uses basic HTML elements with minimal styling, making it difficult to use on desktop and mobile devices.

## Goals / Non-Goals

**Goals:**
- Create a visually appealing, professional-looking candidate form
- Implement responsive design that works seamlessly on desktop, tablet, and mobile
- Add comprehensive user feedback through toast notifications
- Improve form layout with better visual hierarchy and organization
- Add smooth transitions and interactive elements
- Ensure accessibility (WCAG 2.1 AA) is maintained or improved

**Non-Goals:**
- Backend changes (this is purely a UI/UX improvement)
- Changes to the form validation logic or API integration
- New form fields or data capture capabilities

## Decisions

**CSS Framework:** Use TailwindCSS for styling
- Rationale: TailwindCSS provides utility-first CSS that speeds up development and ensures consistency
- Alternative: Custom CSS (rejected due to maintenance overhead and inconsistency)
- Alternative: Material-UI or similar component library (rejected to avoid adding heavy dependencies)

**Toast Notification System:** Create a custom Toast component using React Context
- Rationale: Lightweight, no additional dependencies, full control over behavior
- Alternative: react-toastify (rejected to avoid adding dependency)
- Alternative: Browser alerts (rejected - already in use and provides poor UX)

**Responsive Design:** Mobile-first approach with CSS Grid and Flexbox
- Rationale: Ensures mobile experience is prioritized, then enhanced for larger screens
- Alternative: Desktop-first (rejected - mobile experience suffers)

**Form Layout:** Two-column grid layout for desktop, single column for mobile
- Rationale: Two-column layout makes better use of desktop screen real estate while keeping related fields grouped
- Alternative: Single column for all (rejected - wastes desktop space)

## Risks / Trade-offs

**Risk:** Adding TailwindCSS may increase bundle size
- Mitigation: Use PurgeCSS or configure Tailwind to tree-shake unused styles

**Risk:** Custom toast component may not handle all edge cases
- Mitigation: Test thoroughly with various notification scenarios (success, error, multiple toasts)

**Trade-off:** More visual elements may increase cognitive load
- Mitigation: Use subtle animations and keep design clean/minimal

**Trade-off:** Responsive design requires more testing across devices
- Mitigation: Test on common viewport sizes (375px, 768px, 1024px, 1440px)
