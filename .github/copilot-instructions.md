# AI Agent Instructions

These instructions define coding standards, architecture constraints,
and workflow expectations for AI agents contributing to this repository.

# AI Behavior

- prefer editing existing files
- avoid creating unnecessary files
- explain complex changes briefly
 - explain code and work as Senior Developer would do to junior developer
- sacrifice grammar for clarity
- keep solutions minimal
- answer implementation explanations in Polish
- check current stack before suggesting a new library
- prefer named exports unless a framework/tool requires default export
- use kebab-case for new file names

# Frontend Coding Standards

- Use TypeScript for interactive frontend logic
- Prefer `interface` for object shapes and `type` for unions/composition
- Do not ignore or suppress TypeScript errors
- Fix type errors immediately instead of working around them
- Never use `any` unless absolutely necessary and document why
- Avoid `unknown` unless required and narrowed immediately
- Use named exports
- Keep `main.ts` logic modular; extract focused helpers when complexity grows
- Prioritize clean, efficient, maintainable code
- If code may be confusing, add a short comment explaining why

## Styling and UI

- Use SCSS as source of truth for styling
- Never use inline styles
- Prefer semantic HTML and keyboard-accessible interactions
- Keep CSS architecture simple and maintainable (layout, components, utilities)

# Workflow and Verification

For each implementation request, structure the work like this:

1. Plan
2. Code
3. Short explanation with tradeoffs

## Expectations

- Keep plans hyper-concise: logic, affected files, build/deploy impact
- Write clean, minimal TypeScript focused on the task
- Prefer clarity over cleverness
- Respect project constraints: security, accessibility, predictability
- Suggest tests only when logic or UI behavior changes

## Testing

- For frontend changes, verify behavior manually in browser (menu, navigation, contact form states)
- For backend changes, verify with Firebase emulators when possible
- Run TypeScript checks for both root and `functions/` when those areas change
- Validate Firestore rules and contact flow after security-related changes

# Project Architecture

- Frontend stack: static HTML + SCSS + TypeScript DOM scripts
- Backend stack: Firebase Functions (TypeScript), Firestore, Firebase Hosting
- Keep source files separate from generated artifacts (`public/dist`, compiled CSS)

## State Boundaries

- Browser code should handle UI state and validated submission only
- Sensitive or privileged logic belongs in Cloud Functions
- Firestore write permissions must remain tightly constrained

## Errors and Security

- Show safe, user-friendly API error messages
- Never expose raw backend errors to the UI
- Never expose secrets in frontend code or committed files
- Validate/sanitize contact payloads on client and backend