# Run evidence

Verified 2026-10-22 with `npm test` against `https://practicesoftwaretesting.com/`.

**Result: 7 passed (11.4s, parallel workers).** The five assignment scenarios are covered across seven positive and negative test cases. Parallel execution confirms that the cases do not rely on a shared signed-in session or execution order.

The PNG files in this folder were captured from the successful registration, account, checkout, product comparison, and password-reset flows. Playwright's failure screenshots, traces, and HTML report are generated locally under ignored `test-results/` and `playwright-report/` folders when tests are run.
