# Review of the AI-assisted implementation

## What the first draft contained

Codex generated a Playwright Test suite with five spec files for registration, login, purchase, comparison, and password reset. The draft also contained Page Objects, a shared fixture, generated customer data, Playwright configuration, and the assignment documentation.

## Corrections

- Replaced the installer example tests with the five scenarios named in the SIS 2 brief.
- Set `baseURL` and `testIdAttribute: 'data-test'` to match the live site.
- Used a data factory to make a new registration email for every run. The valid-login and checkout cases create their own user, so they do not depend on a shared test account.
- Kept locators and browser actions in Page Objects and supplied them through a Playwright fixture. The specs describe expected behavior and assert the results.
- Checked the live site's actual failure messages: invalid login displays `Invalid email or password`; an unknown reset email displays `The selected email is invalid.` The tests use those observed results rather than the older slide wording.
- Kept the suite free of fixed sleeps, CSS-class selectors, and positional XPath.

