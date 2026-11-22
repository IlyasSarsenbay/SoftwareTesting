# Bug report: Cloudflare verification blocks Playwright CI tests

**Status:** Open / external dependency issue
**Severity:** Major for CI reliability; the affected test cannot complete in GitHub Actions
**Environment:** GitHub Actions (`ubuntu-latest`), Node.js 22, Playwright Test, Chromium, four-shard workflow
**Affected target:** `https://practicesoftwaretesting.com/` (public demo)

## Summary

The public demo site intermittently presents a Cloudflare human-verification page to requests from GitHub Actions. Playwright then cannot find the expected product, login, or registration controls, so tests in the affected shard fail. Retrying does not resolve the block consistently.

## Steps to reproduce

1. Trigger the repository's GitHub Actions Playwright workflow on a push or pull request.
2. Inspect the `Tests (shard 1/4)` job and its `Run Playwright tests` step.
3. Open the uploaded screenshot or `error-context.md` for the failed test.

## Expected result

The demo site serves its normal application pages and the Playwright suite can interact with the expected page elements.

## Actual result

The browser receives a Cloudflare human-verification/challenge page instead of the expected application page. Assertions for controls such as `data-test="login-submit"` or product cards fail. Other shards and the report merge have completed successfully in the same workflow run, while shard 1 fails. Retries may pass in some runs, indicating the block is intermittent.

## Impact

The workflow can report a failed run even when the test code and selectors are valid. The failure prevents a consistently green push/PR check and makes CI timing results noisy. Local runs have passed, but this does not guarantee the shared public demo will allow GitHub-hosted runner traffic.

## Evidence

- GitHub Actions logs show locator timeouts for expected application controls, including `getByTestId('login-submit')` and product-card selectors.
- The uploaded failed-test screenshot/error context shows the Cloudflare verification page.
- In the PR run shown during investigation, shards 2/4, 3/4, and 4/4 and `Merge reports` succeeded, while shard 1/4 failed. Push runs have also shown intermittent shard 1 failures.
- Relevant workflow: `.github/workflows/playwright.yml`; site under test is external and outside this repository's control.

## Suggested resolution

The demo-site maintainer should review Cloudflare's challenge/rate-limit policy for legitimate automated test traffic from GitHub-hosted runners, or provide a stable test environment intended for CI. Until then, treat these failures as an external test-environment limitation and attach the Actions run link and failed-test artifact when reporting to the instructor/site maintainer. Do not attempt to bypass the human-verification challenge in test code.

## Run links

Add the specific push and pull-request Actions run URLs here when submitting this report, so reviewers can open the corresponding logs and artifacts.
