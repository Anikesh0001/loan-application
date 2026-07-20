# TASKS

Tracks work that requires human action, plus general project task notes.

## Manual Tasks

- [ ] Create a GitHub (or other Git host) repository and add it as the `origin`
  remote if this project needs to be pushed/backed up remotely or reviewed via
  pull requests.
  - Why manual: repository creation and ownership require an authenticated
    account action I cannot perform.
  - Steps: create an empty repo on GitHub, then run
    `git remote add origin <repo-url>` and `git push -u origin main` locally.

- [ ] Run `npm run test:e2e` (or `test:e2e:open`) locally to verify the Cypress
  smoke spec (`cypress/e2e/smoke.cy.js`).
  - Why manual: the sandboxed shell this project was built in cannot launch
    Cypress's Electron-based binary — `cypress verify`/`cypress run` fail at
    the bootstrap "Verifying Cypress can run" step with `bad option:
    --no-sandbox` errors, for both the bundled Electron browser and
    `--browser chrome`, independent of the spec file. This reproduces with no
    project code involved, so it is an environment restriction, not a bug to
    fix in the repo.
  - Steps: on a normal machine/CI runner, run `npm install` then
    `npm run test:e2e` (headless) or `npm run test:e2e:open` (interactive).

## Phase Log

- Phase 0 (scaffold, tooling, folder structure): complete.
