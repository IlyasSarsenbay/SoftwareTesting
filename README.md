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

## CI

[![Playwright Tests](https://github.com/IlyasSarsenbay/SoftwareTesting/actions/workflows/playwright.yml/badge.svg?branch=main)](https://github.com/IlyasSarsenbay/SoftwareTesting/actions/workflows/playwright.yml)

**CI system:** GitHub Actions. The repository is hosted on GitHub, so Actions provides push and pull request runs, artefacts, and matrix jobs without a separate CI server.

**Pipeline** (`.github/workflows/playwright.yml`):

- runs on every push and pull request, and supports manual `workflow_dispatch` runs;
- restores the npm cache, runs `npm ci`, and installs Chromium with Linux dependencies;
- runs the full Playwright suite in four parallel shards;
- merges the shard blob reports into one HTML report and one JUnit XML report;
- uploads shard results (traces, screenshots, videos, and per-shard JUnit) and merged reports; user-facing reports are retained for 14 days.

**CI settings** (`playwright.config.ts`, when `CI=true`): `forbidOnly: true`, `retries: 2`, two workers, `list`/`blob`/`junit` reporters, and `trace: 'on-first-retry'`. `merge.config.ts` creates the combined HTML and JUnit reports.

### Runtime

Actual GitHub Actions measurements are pending the first single-shard and four-shard runs. No run links or timings are available yet.

| Configuration | Total run time | Run tests step (slowest shard) | Run |
| --- | --- | --- | --- |
| 1 job, no sharding | Pending Actions run | Pending Actions run | Pending |
| 4 shards + merge | Pending Actions run | Pending Actions run | Pending |

After both variants have run, replace the pending cells with Actions timings and links. The four-shard run also includes parallel setup and a report-merge job, so the suite size and setup time affect the overall speedup.

### Running CI mode locally

```powershell
npm ci
npx playwright install --with-deps chromium
$env:CI = "true"; npx playwright test; Remove-Item Env:CI
```

To exercise the sharding and merge path, run each shard with `CI=true`, preserve each shard's blob zip in a separate directory, then run `npx playwright merge-reports --config merge.config.ts ./all-blob-reports`.