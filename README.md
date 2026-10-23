# SIS 2 — Playwright Test Automation

Automated browser regression checks for the Toolshop training application at <https://practicesoftwaretesting.com/>. The suite uses TypeScript and Playwright Test and follows the Week 5 and Week 6 lecture guidance: isolated tests, data generated per run, web-first assertions, stable `data-test` selectors, page objects, and fixtures.

## Requirements

- Node.js 20 or newer
- npm
- Playwright Chromium (`npx playwright install chromium`)

## Run

```bash
npm ci
npx playwright install chromium
npm test
```

Other useful commands: `npm run test:headed`, `npm run test:ui`, and `npm run report`.

The suite targets Chromium to keep the public demo environment and CI run predictable. Each test creates its own browser context. Registration and checkout tests generate a fresh account, so they can run repeatedly and in any order. The pre-seeded lecture account is no longer reliable on the current version of the public site; account-dependent cases use unique accounts created by the test instead.

## Project map

- `tests/`: one spec per assignment scenario
- `pages/`: page objects that own locators and business actions
- `fixtures/pages.fixture.ts`: shares page objects through Playwright fixtures
- `data/user.factory.ts`: produces unique registration data
- `Description.md`: test case list and design rationale
- `Prompt.md`: AI tool and prompt record
- `Review.md`: review notes, corrections, and run evidence
- `screenshots/`: screenshots captured by successful tests

The public demo is shared and can change without notice. A failing run should be triaged against the current page and its trace before attributing the failure to the product.
