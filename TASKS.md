# TASKS

Tracks work that requires human action, plus general project task notes.

## Manual Tasks

- [x] Create a GitHub (or other Git host) repository and add it as the `origin`
  remote, then push.
  - Done: pushed to `https://github.com/Anikesh0001/loan-application` on
    2026-07-20.

- [x] Run `npm run test:e2e` (or `test:e2e:open`) locally to verify the Cypress
  smoke spec (`cypress/e2e/smoke.cy.js`).
  - Confirmed on 2026-07-20: Cypress verifies and launches fine on a real
    machine — the earlier failure was specific to the sandboxed shell this
    project was scaffolded in, which cannot launch Cypress's Electron binary
    (`bad option: --no-sandbox` at the bootstrap step). Not a project bug.
  - `test:e2e`/`test:e2e:open` now use `start-server-and-test` to boot the Vite
    dev server and wait for `http://localhost:5173` before running Cypress, so
    no manual "start the dev server in another terminal" step is needed.

## Phase Log

- Phase 0 (scaffold, tooling, folder structure): complete.
