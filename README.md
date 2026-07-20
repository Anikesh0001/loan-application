# LendSwift

An 8-step loan application form built as a client-only React SPA. No backend —
form state is persisted locally between sessions.

## Stack

- Vite + React 18
- React Hook Form + Zod (via `@hookform/resolvers`)
- Tailwind CSS
- react-dropzone, react-signature-canvas, uuid
- Cypress + cypress-axe for e2e and accessibility testing
- ESLint (airbnb + react-hooks + jsx-a11y + import)

## Getting started

```bash
npm install
npm run dev
```

## Scripts

| Script                | Description                          |
| --------------------- | ------------------------------------- |
| `npm run dev`         | Start the Vite dev server             |
| `npm run build`       | Production build                      |
| `npm run preview`     | Preview the production build          |
| `npm run lint`        | Run ESLint                            |
| `npm run lint:fix`    | Run ESLint with automatic fixes       |
| `npm run test:e2e`    | Run Cypress e2e tests headlessly      |
| `npm run test:e2e:open` | Open the Cypress test runner        |

## Project structure

```
src/
  components/common/   Reusable form primitives (Input, Select, FileUpload, ...)
  components/wizard/   Wizard shell, progress bar, step navigation
  components/steps/    Step1LoanType ... Step8Review
  schemas/             Per-step Zod schemas + schemaFactory
  hooks/                useAutoSave, useFormPersistence, useVerification, ...
  utils/                Constants, formatters, validators, EMI calculator, ...
cypress/e2e/            End-to-end specs
cypress/fixtures/       Test fixtures
cypress/support/        Cypress support files (incl. cypress-axe)
```

## Status

This project is being built in graded phases. See [TASKS.md](./TASKS.md) for
outstanding manual tasks that require human action.
